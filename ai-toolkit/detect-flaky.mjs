/**
 * Detector de flaky e gargalos - AI Toolkit
 * Analisa allure-results + código dos specs; gera correções Cursor-ready.
 */
import { generateText, Output } from 'ai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { model, PATHS } from './config.mjs';
import { readFile, listFiles, writeReport, hasApiKey } from './utils.mjs';
import { SYSTEM_PROMPT } from './prompts/system-prompt.mjs';
import { buildFlakyPrompt } from './prompts/flaky-prompt.mjs';
import { formatAcoesCursorReady } from './cursor-ready.mjs';

const acaoCursorSchema = z.object({
  tipo: z.enum(['editar-arquivo', 'criar-arquivo']),
  arquivo: z.string(),
  descricao: z.string(),
  codigoAtual: z.string(),
  codigoSugerido: z.string(),
});

const antiPadraoAcaoSchema = z.object({
  tipo: z.literal('editar-arquivo'),
  descricao: z.string(),
  arquivo: z.string(),
});

const FlakyAnalysisSchema = z.object({
  resumo: z.string(),
  candidatosFlaky: z.array(
    z.object({
      teste: z.string(),
      spec: z.string(),
      taxaFalha: z.string(),
      causaProvavel: z.string(),
      evidencia: z.string(),
      acaoCursor: acaoCursorSchema,
    })
  ),
  gargalos: z.array(
    z.object({
      spec: z.string(),
      problema: z.string(),
      impacto: z.string(),
      acaoCursor: acaoCursorSchema,
    })
  ),
  antiPadroes: z.array(
    z.object({
      padrao: z.string(),
      ocorrencias: z.number(),
      arquivosAfetados: z.array(z.string()),
      acaoCursor: antiPadraoAcaoSchema,
    })
  ),
});

function loadAllureResults() {
  const dir = path.join(process.cwd(), PATHS.allureResults);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('-result.json'));
  const results = [];
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      results.push(JSON.parse(content));
    } catch (_) {
      // ignore parse errors
    }
  }
  return results;
}

function aggregateByTest(results) {
  const byName = {};
  for (const r of results) {
    const name = r.name || r.fullName || r.title || 'unknown';
    if (!byName[name]) byName[name] = { passed: 0, failed: 0, broken: 0, total: 0 };
    const status = (r.status || '').toLowerCase();
    if (status === 'passed') byName[name].passed++;
    else if (status === 'failed') byName[name].failed++;
    else if (status === 'broken') byName[name].broken++;
    byName[name].total++;
  }
  return byName;
}

function findFlakyCandidates(byTest, minRate = 0.2, maxRate = 0.8) {
  const candidates = [];
  for (const [name, stats] of Object.entries(byTest)) {
    if (stats.total < 2) continue;
    const failRate = (stats.failed + stats.broken) / stats.total;
    if (failRate >= minRate && failRate <= maxRate) {
      candidates.push({
        name,
        total: stats.total,
        passed: stats.passed,
        failed: stats.failed,
        broken: stats.broken,
        taxaFalha: `${Math.round(failRate * 100)}%`,
      });
    }
  }
  return candidates;
}

function grepAntiPatterns(specPaths) {
  const anti = [];
  for (const specPath of specPaths) {
    const content = readFile(specPath);
    if (content.includes('cy.wait(')) {
      const matches = content.match(/cy\.wait\s*\(\s*\d+/g);
      if (matches) anti.push({ padrao: 'cy.wait(número)', arquivo: specPath, ocorrencias: matches.length });
    }
  }
  return anti;
}

async function main() {
  if (!hasApiKey()) {
    console.error('Erro: OPENAI_API_KEY não definida. Configure em .env (veja .env.example).');
    process.exit(1);
  }

  console.log('Carregando resultados Allure...');
  const results = loadAllureResults();
  const byTest = aggregateByTest(results);
  const candidates = findFlakyCandidates(byTest);

  let codigoSpecs = '';
  let candidatosResumo = '';
  const specPaths = new Set();

  if (candidates.length > 0) {
    candidatosResumo = candidates
      .slice(0, 30)
      .map((c) => `- ${c.name} | total: ${c.total} | falhas: ${c.failed + c.broken} | taxa: ${c.taxaFalha}`)
      .join('\n');
    const specFiles = await listFiles('cypress/e2e/**/*.spec.js');
    for (const specPath of specFiles.slice(0, 15)) {
      const content = readFile(specPath);
      if (content) {
        specPaths.add(specPath);
        codigoSpecs += `\n### ${specPath}\n\`\`\`javascript\n${content.slice(0, 3000)}\n\`\`\`\n`;
      }
    }
  } else {
    candidatosResumo = 'Nenhum candidato a flaky detectado (taxa de falha entre 20-80% em múltiplas execuções).';
    const specFiles = await listFiles('cypress/e2e/**/*.spec.js');
    for (const specPath of specFiles.slice(0, 5)) {
      codigoSpecs += `\n### ${specPath}\n\`\`\`javascript\n${readFile(specPath).slice(0, 2000)}\n\`\`\`\n`;
    }
  }

  const antiPadroesEncontrados = grepAntiPatterns([...specPaths]);
  const antiPadroesTexto =
    antiPadroesEncontrados.length > 0
      ? antiPadroesEncontrados.map((a) => `- ${a.padrao} em ${a.arquivo} (${a.ocorrencias}x)`).join('\n')
      : 'Nenhum anti-padrão óbvio (cy.wait) encontrado nos specs amostrados.';

  console.log('Chamando OpenAI...');
  const prompt = buildFlakyPrompt(candidatosResumo, codigoSpecs || '(sem código)', antiPadroesTexto);

  const { output, error } = await generateText({
    model,
    system: SYSTEM_PROMPT,
    output: Output.object({
      schema: FlakyAnalysisSchema,
      name: 'FlakyAnalysis',
      description: 'Análise de testes flaky e gargalos',
    }),
    prompt,
  }).catch((err) => ({ output: null, error: err }));

  if (error || !output) {
    console.error('Erro na geração:', error?.message || error);
    process.exit(1);
  }

  const parte1 = [
    '# Análise de Flaky e Gargalos',
    '',
    '## Resumo',
    '',
    output.resumo,
    '',
    '## Candidatos a flaky',
    '',
    output.candidatosFlaky?.length
      ? output.candidatosFlaky
          .map(
            (c) =>
              `- **${c.teste}** (${c.spec}) - Taxa: ${c.taxaFalha}\n  - Causa provável: ${c.causaProvavel}\n  - Evidência: ${c.evidencia}`
          )
          .join('\n\n')
      : '_Nenhum._',
    '',
    '## Gargalos',
    '',
    output.gargalos?.length
      ? output.gargalos.map((g) => `- **${g.spec}**: ${g.problema} (Impacto: ${g.impacto})`).join('\n')
      : '_Nenhum._',
    '',
    '## Anti-padrões',
    '',
    output.antiPadroes?.length
      ? output.antiPadroes
          .map((a) => `- ${a.padrao} - ${a.ocorrencias} ocorrência(s) em ${(a.arquivosAfetados || []).join(', ')}`)
          .join('\n')
      : '_Nenhum._',
    '',
    '---',
    '',
  ].join('\n');

  const acoes = [];
  (output.candidatosFlaky || []).forEach((c) => {
    if (c.acaoCursor) acoes.push({ titulo: `Corrigir flaky: ${c.teste}`, ...c.acaoCursor });
  });
  (output.gargalos || []).forEach((g) => {
    if (g.acaoCursor) acoes.push({ titulo: `Gargalo: ${g.spec}`, ...g.acaoCursor });
  });
  (output.antiPadroes || []).forEach((a) => {
    if (a.acaoCursor)
      acoes.push({
        titulo: `Anti-padrão: ${a.padrao}`,
        tipo: 'editar-arquivo',
        arquivo: (a.arquivosAfetados && a.arquivosAfetados[0]) || '',
        descricao: a.acaoCursor.descricao,
        codigoAtual: undefined,
        codigoSugerido: undefined,
      });
  });

  const parte2 = formatAcoesCursorReady(acoes);

  const reportPath = `${PATHS.reports}/flaky-analysis.md`;
  writeReport(reportPath, parte1 + '\n\n' + parte2);
  console.log('Relatório salvo em', reportPath);
}

main();
