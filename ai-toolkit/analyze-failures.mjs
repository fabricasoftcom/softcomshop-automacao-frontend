import { generateText, Output } from 'ai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { model, PATHS } from './config.mjs';
import { readFile, writeReport, hasApiKey } from './utils.mjs';
import { SYSTEM_PROMPT } from './prompts/system-prompt.mjs';
import { buildFailuresPrompt } from './prompts/failures-prompt.mjs';
import { formatAcoesCursorReady } from './cursor-ready.mjs';

const acaoCursorSchema = z.object({
  tipo: z.enum(['editar-arquivo', 'criar-arquivo']),
  arquivo: z.string(),
  descricao: z.string(),
  codigoAtual: z.string(),
  codigoSugerido: z.string(),
});

const FailuresAnalysisSchema = z.object({
  resumo: z.string(),
  analiseFalhas: z.array(
    z.object({
      teste: z.string(),
      spec: z.string(),
      classificacao: z.enum(['Bug na Aplicação', 'Erro no Teste']),
      motivo: z.string(),
      acaoCursor: acaoCursorSchema.nullable(),
    })
  )
});

function getFailedTests() {
  const dir = path.join(process.cwd(), PATHS.allureResults);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('-result.json'));
  const failed = [];
  
  for (const f of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8'));
      const status = (content.status || '').toLowerCase();
      if (status === 'failed' || status === 'broken') {
        const errorMessage = content.statusDetails?.message || 'Sem mensagem de erro';
        // Tenta extrair o nome do arquivo spec das labels do allure
        const suiteLabel = content.labels?.find(l => l.name === 'suite' || l.name === 'parentSuite');
        const specName = suiteLabel ? suiteLabel.value : 'Spec desconhecido';
        
        failed.push({
          name: content.name || content.title,
          spec: specName,
          error: errorMessage.substring(0, 500) // Limita o tamanho do erro
        });
      }
    } catch (_) {}
  }
  return failed;
}

function chunkArray(array, size) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

async function main() {
  if (!hasApiKey()) {
    console.error('Erro: OPENAI_API_KEY não definida.');
    process.exit(1);
  }

  console.log('Lendo falhas do Allure Results...');
  const failures = getFailedTests();

  if (failures.length === 0) {
    console.log('Nenhuma falha encontrada no allure-results!');
    return;
  }

  const BATCH_SIZE = 10;
  const batches = chunkArray(failures, BATCH_SIZE);

  console.log(`Encontradas ${failures.length} falhas. Processando em ${batches.length} lote(s)...`);

  const specFiles = fs.readdirSync(path.join(process.cwd(), 'cypress/e2e'), { recursive: true })
                      .filter(f => f.endsWith('.spec.js'));

  let allResumos = [];
  let allAnalises = [];
  let todasAcoes = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\nProcessando lote ${i + 1} de ${batches.length} (${batch.length} falhas)...`);

    const falhasResumo = batch.map(f => `- Teste: ${f.name}\n  Spec: ${f.spec}\n  Erro: ${f.error}`).join('\n\n');
    
    let codigoSpecs = '';
    for (const f of batch) {
      const matchedFile = specFiles.find(specPath => specPath.includes(f.spec) || f.spec.includes(specPath.replace('.spec.js', '')));
      if (matchedFile) {
        const fullPath = path.join('cypress/e2e', matchedFile);
        const content = readFile(fullPath);
        if (content && !codigoSpecs.includes(fullPath)) {
          codigoSpecs += `\n### ${fullPath}\n\`\`\`javascript\n${content.slice(0, 3000)}\n\`\`\`\n`;
        }
      }
    }

    const prompt = buildFailuresPrompt(falhasResumo, codigoSpecs || '(código dos specs não encontrado)');

    const { output, error } = await generateText({
      model,
      system: SYSTEM_PROMPT,
      output: Output.object({
        schema: FailuresAnalysisSchema,
        name: 'FailuresAnalysis',
        description: 'Classificação de falhas entre Bug e Erro de Teste',
      }),
      prompt,
    }).catch((err) => ({ output: null, error: err }));

    if (error || !output) {
      console.error(`Erro na geração do lote ${i + 1}:`, error?.message || error);
      continue;
    }

    allResumos.push(`**Lote ${i + 1}**: ${output.resumo}`);
    allAnalises.push(...output.analiseFalhas);

    output.analiseFalhas.forEach((f) => {
      if (f.acaoCursor) {
        todasAcoes.push({ titulo: `Corrigir Teste: ${f.teste}`, ...f.acaoCursor });
      }
    });
  }

  const parte1 = [
    '# Análise de Falhas da Última Execução',
    '',
    '## Resumo Geral',
    allResumos.join('\n\n'),
    '',
    '## Classificação das Falhas',
    '',
    allAnalises.map(f => 
      `- **${f.teste}**\n  - **Classificação:** ${f.classificacao === 'Bug na Aplicação' ? '🐛' : '🔧'} ${f.classificacao}\n  - **Motivo:** ${f.motivo}`
    ).join('\n\n'),
    '',
    '---',
    ''
  ].join('\n');

  const reportPath = `${PATHS.reports}/failures-analysis.md`;
  const parte2 = todasAcoes.length > 0 ? formatAcoesCursorReady(todasAcoes, '', reportPath) : '## Ações Cursor-ready\n\nNenhuma ação sugerida (todas as falhas foram classificadas como Bug na Aplicação ou não exigem alteração de código).';

  writeReport(reportPath, parte1 + '\n\n' + parte2);
  console.log(`\nRelatório final salvo em ${reportPath}`);
}

main();
