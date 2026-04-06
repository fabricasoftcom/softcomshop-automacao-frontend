/**
 * Analisador de regras - AI Toolkit
 * Lê architeture.mdc, ADRs e guias; gera relatório com análise e ações Cursor-ready.
 */
import { generateText, Output } from 'ai';
import { z } from 'zod';
import { model, PATHS } from './config.mjs';
import { readFile, readFiles, listFiles, buildContext, writeReport, hasApiKey } from './utils.mjs';
import { SYSTEM_PROMPT } from './prompts/system-prompt.mjs';
import { buildRulesPrompt } from './prompts/rules-prompt.mjs';
import {
  formatAcoesCursorReady,
  redundanciasToAcoes,
  gapsToAcoes,
  conflitosToAcoes,
  melhoriasToAcoes,
} from './cursor-ready.mjs';

const acaoCursorRedundancia = z.object({
  tipo: z.literal('editar-arquivo'),
  arquivo: z.string(),
  descricao: z.string(),
});
const acaoCursorGap = z.object({
  tipo: z.enum(['editar-arquivo', 'criar-arquivo']),
  arquivo: z.string(),
  descricao: z.string(),
});
const acaoCursorMelhoria = z.object({
  tipo: z.enum(['editar-arquivo', 'criar-arquivo']),
  arquivo: z.string(),
  descricao: z.string(),
  codigoSugerido: z.string(),
});

const RulesAnalysisSchema = z.object({
  resumo: z.string(),
  redundancias: z.array(z.object({
    regra1: z.string(),
    regra2: z.string(),
    fonteRegra1: z.string(),
    fonteRegra2: z.string(),
    sugestao: z.string(),
    impacto: z.enum(['alto', 'medio', 'baixo']),
    acaoCursor: acaoCursorRedundancia,
  })),
  gaps: z.array(z.object({
    descricao: z.string(),
    sugestaoRegra: z.string(),
    impacto: z.enum(['alto', 'medio', 'baixo']),
    acaoCursor: acaoCursorGap,
  })),
  conflitos: z.array(z.object({
    regra1: z.string(),
    regra2: z.string(),
    descricaoConflito: z.string(),
    sugestaoResolucao: z.string(),
    acaoCursor: acaoCursorRedundancia,
  })),
  melhorias: z.array(z.object({
    regraAtual: z.string(),
    sugestaoMelhoria: z.string(),
    justificativa: z.string(),
    impacto: z.enum(['alto', 'medio', 'baixo']),
    acaoCursor: acaoCursorMelhoria,
  })),
});

async function main() {
  if (!hasApiKey()) {
    console.error('Erro: OPENAI_API_KEY não definida. Configure em .env (veja .env.example).');
    process.exit(1);
  }

  console.log('Carregando artefatos...');
  const rulesContent = readFile(PATHS.rules);
  const adrFiles = await listFiles('docs/adr/*.md');
  const adrContents = adrFiles
    .filter((f) => !f.endsWith('README.md'))
    .map((f) => ({ path: f, content: readFile(f) }))
    .filter((a) => a.content)
    .map((a) => `### ${a.path}\n\n${a.content}`)
    .join('\n\n---\n\n');

  const guias = [
    { title: 'Guia de Decisões Rápidas', path: 'docs/referencias/guia-decisoes-rapidas.md' },
    { title: 'Checklist Validação Contínua', path: 'docs/referencias/checklist-validacao-continua.md' },
    { title: 'Aprendizagens e Lições', path: 'docs/referencias/aprendizagens-e-licoes.md' },
  ].map((g) => ({ title: g.title, content: readFile(g.path) }));

  const contextoRegras = buildContext([
    { title: 'Regras principais (architeture.mdc)', content: rulesContent },
    { title: 'ADRs', content: adrContents },
    ...guias,
  ]);

  if (!contextoRegras || contextoRegras.length < 100) {
    console.error('Erro: Pouco conteúdo carregado. Verifique se os arquivos existem.');
    process.exit(1);
  }

  console.log('Chamando OpenAI (pode levar alguns segundos)...');
  const prompt = buildRulesPrompt(contextoRegras);

  const { output, error } = await generateText({
    model,
    system: SYSTEM_PROMPT,
    output: Output.object({
      schema: RulesAnalysisSchema,
      name: 'RulesAnalysis',
      description: 'Análise de regras do projeto de automação',
    }),
    prompt,
  }).catch((err) => ({ output: null, error: err }));

  if (error || !output) {
    console.error('Erro na geração:', error?.message || error);
    process.exit(1);
  }

  const analise = output;

  const parte1 = [
    '# Análise de Regras do Projeto',
    '',
    '## Resumo',
    '',
    analise.resumo,
    '',
    '## Redundâncias',
    '',
    analise.redundancias?.length
      ? analise.redundancias
          .map(
            (r) =>
              `- **${r.regra1?.slice(0, 60)}...** | **${r.regra2?.slice(0, 60)}...** | Impacto: ${r.impacto}\n  - ${r.sugestao}`
          )
          .join('\n\n')
      : '_Nenhuma redundância identificada._',
    '',
    '## Gaps',
    '',
    analise.gaps?.length
      ? analise.gaps
          .map((g) => `- ${g.descricao}\n  - Sugestão: ${g.sugestaoRegra} (Impacto: ${g.impacto})`)
          .join('\n\n')
      : '_Nenhum gap identificado._',
    '',
    '## Conflitos',
    '',
    analise.conflitos?.length
      ? analise.conflitos
          .map(
            (c) =>
              `- **Conflito:** ${c.descricaoConflito}\n  - **Resolução:** ${c.sugestaoResolucao}`
          )
          .join('\n\n')
      : '_Nenhum conflito identificado._',
    '',
    '## Melhorias',
    '',
    analise.melhorias?.length
      ? analise.melhorias
          .map(
            (m) =>
              `- **Regra atual:** ${m.regraAtual?.slice(0, 80)}...\n  - **Sugestão:** ${m.sugestaoMelhoria}\n  - **Justificativa:** ${m.justificativa} (Impacto: ${m.impacto})`
          )
          .join('\n\n')
      : '_Nenhuma melhoria sugerida._',
    '',
    '---',
    '',
  ].join('\n');

  const acoes = [
    ...redundanciasToAcoes(analise.redundancias),
    ...gapsToAcoes(analise.gaps),
    ...conflitosToAcoes(analise.conflitos),
    ...melhoriasToAcoes(analise.melhorias),
  ];
  const parte2 = formatAcoesCursorReady(acoes);

  const reportPath = `${PATHS.reports}/rules-analysis.md`;
  writeReport(reportPath, parte1 + '\n\n' + parte2);
  console.log('Relatório salvo em', reportPath);
}

main();
