import { generateText, Output } from 'ai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { model, PATHS } from './config.mjs';
import { writeReport, hasApiKey } from './utils.mjs';
import { SYSTEM_PROMPT } from './prompts/system-prompt.mjs';
import { buildIncidentsPrompt } from './prompts/incidents-prompt.mjs';
import { formatAcoesCursorReady } from './cursor-ready.mjs';

const acaoCursorSchema = z.object({
  tipo: z.enum(['editar-arquivo', 'criar-arquivo', 'explorar-tela']),
  arquivo: z.string(),
  descricao: z.string(),
  codigoAtual: z.string().nullable(),
  codigoSugerido: z.string().nullable(),
  url: z.string().nullable(),
});

const IncidentsAnalysisSchema = z.object({
  resumo: z.string(),
  cenariosRegressao: z.array(
    z.object({
      objetivo: z.string(),
      passos: z.array(z.string()),
      resultadoEsperado: z.string(),
    })
  ),
  acoesCursor: z.array(acaoCursorSchema),
});

function getIncidentFiles() {
  const dir = path.join(process.cwd(), 'ai-toolkit/inputs/incidents');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.json'));
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

  const dir = path.join(process.cwd(), 'ai-toolkit/inputs/incidents');
  const files = getIncidentFiles();

  if (files.length === 0) {
    console.log('Nenhum arquivo JSON encontrado em ai-toolkit/inputs/incidents/.');
    return;
  }

  console.log(`Lendo ${files.length} arquivo(s) de incidentes...`);
  
  // Extrai todos os incidentes de todos os arquivos, lidando com diferentes estruturas JSON
  let allIncidents = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const parsed = JSON.parse(content);
      
      // Se for um array direto
      if (Array.isArray(parsed)) {
        allIncidents.push(...parsed);
      } 
      // Se for um objeto com uma propriedade que é um array (ex: Planilha1)
      else if (typeof parsed === 'object' && parsed !== null) {
        for (const key in parsed) {
          if (Array.isArray(parsed[key])) {
            allIncidents.push(...parsed[key]);
          }
        }
      } else {
        allIncidents.push(parsed);
      }
    } catch (err) {
      console.error(`Erro ao ler ${f}:`, err.message);
    }
  }

  if (allIncidents.length === 0) {
    console.log('Nenhum incidente válido processado.');
    return;
  }

  // Define o tamanho do lote (batch) para não sobrecarregar a IA
  const BATCH_SIZE = 5;
  const batches = chunkArray(allIncidents, BATCH_SIZE);

  console.log(`Encontrados ${allIncidents.length} incidentes. Processando em ${batches.length} lote(s) de no máximo ${BATCH_SIZE}...`);

  let allResumos = [];
  let allCenarios = [];
  let todasAcoes = [];

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`\nProcessando lote ${i + 1} de ${batches.length} (${batch.length} incidentes)...`);

    const prompt = buildIncidentsPrompt(JSON.stringify(batch, null, 2));

    const { output, error } = await generateText({
      model,
      system: SYSTEM_PROMPT,
      output: Output.object({
        schema: IncidentsAnalysisSchema,
        name: 'IncidentsAnalysis',
        description: 'Análise de incidentes e geração de cenários de regressão',
      }),
      prompt,
    }).catch((err) => ({ output: null, error: err }));

    if (error || !output) {
      console.error(`Erro na geração do lote ${i + 1}:`, error?.message || error);
      continue;
    }

    allResumos.push(`**Lote ${i + 1}**: ${output.resumo}`);
    
    // Ajusta o índice dos cenários para ser contínuo ao longo dos lotes
    const startIndex = allCenarios.length;
    output.cenariosRegressao.forEach((c, index) => {
      allCenarios.push({
        numero: startIndex + index + 1,
        ...c
      });
    });

    // Ajusta o índice das ações e adiciona à lista global
    const startAcaoIndex = todasAcoes.length;
    output.acoesCursor.forEach((a, index) => {
      todasAcoes.push({
        titulo: `Ação ${startAcaoIndex + index + 1}: ${a.descricao}`,
        ...a
      });
    });
  }

  console.log('\nGerando relatório final...');

  const parte1 = [
    '# Análise de Incidentes e Cenários de Regressão',
    '',
    '## Resumo do Entendimento (Por Lotes)',
    allResumos.join('\n\n'),
    '',
    '## Cenários de Teste Gerados',
    '',
    allCenarios.map(c => [
      `### Cenário ${c.numero}: ${c.objetivo}`,
      '- **Passos:**',
      ...c.passos.map(p => `  - ${p}`),
      `- **Resultado Esperado:** ${c.resultadoEsperado}`
    ].join('\n')).join('\n\n'),
    '',
    '---',
    ''
  ].join('\n');

  const reportPath = `${PATHS.reports}/incidents-analysis.md`;
  const parte2 = todasAcoes.length > 0 ? formatAcoesCursorReady(todasAcoes, '', reportPath) : '## Ações Cursor-ready\n\nNenhuma ação sugerida.';

  writeReport(reportPath, parte1 + '\n\n' + parte2);
  console.log(`Relatório salvo em ${reportPath}`);
}

main();
