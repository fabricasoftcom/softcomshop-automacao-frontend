/**
 * Gerador de cenários de teste - AI Toolkit
 * Recebe regras de negócio (arquivo) e gera cenários + ações Cursor-ready.
 */
import { generateText, Output } from 'ai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { model, PATHS } from './config.mjs';
import { readFile, writeReport, hasApiKey } from './utils.mjs';
import { SYSTEM_PROMPT } from './prompts/system-prompt.mjs';
import { buildScenariosPrompt } from './prompts/scenarios-prompt.mjs';
import { formatAcoesCursorReady, formatAcao } from './cursor-ready.mjs';

const CenarioSchema = z.object({
  nome: z.string(),
  tipo: z.enum(['positivo', 'negativo', 'edge', 'regressivo']),
  objetivo: z.string(),
  preCondicoes: z.array(z.string()),
  passos: z.array(z.string()),
  resultadoEsperado: z.string(),
  dadosDinamicos: z.array(z.string()),
  prioridade: z.enum(['alta', 'media', 'baixa']),
});

const AcaoCursorSchema = z.object({
  titulo: z.string(),
  tipo: z.enum(['explorar-tela', 'criar-arquivo', 'editar-arquivo']),
  arquivo: z.string(),
  url: z.string(),
  descricao: z.string(),
  contexto: z.string(),
  estruturaSugerida: z.string(),
});

const ScenariosSchema = z.object({
  funcionalidade: z.string(),
  modulo: z.string(),
  loginCommand: z.string(),
  tags: z.array(z.string()),
  cenarios: z.array(CenarioSchema),
  observacoes: z.array(z.string()),
  acoes: z.array(AcaoCursorSchema),
});

function getInputPath() {
  const idx = process.argv.indexOf('--input');
  if (idx === -1 || !process.argv[idx + 1]) return null;
  return process.argv[idx + 1];
}

function getRefPath() {
  const idx = process.argv.indexOf('--ref');
  if (idx === -1 || !process.argv[idx + 1]) return null;
  return process.argv[idx + 1];
}

async function main() {
  if (!hasApiKey()) {
    console.error('Erro: OPENAI_API_KEY não definida. Configure em .env (veja .env.example).');
    process.exit(1);
  }

  const inputPath = getInputPath();
  if (!inputPath) {
    console.error('Uso: npm run ai:scenarios -- --input ai-toolkit/inputs/regras-<funcionalidade>.md [--ref cypress/e2e/.../spec.spec.js]');
    process.exit(1);
  }

  const fullInputPath = path.isAbsolute(inputPath) ? inputPath : path.join(process.cwd(), inputPath);
  if (!fs.existsSync(fullInputPath)) {
    console.error('Arquivo não encontrado:', fullInputPath);
    process.exit(1);
  }

  const regrasNegocio = fs.readFileSync(fullInputPath, 'utf-8');
  const refPath = getRefPath();
  let contextoPadroes = readFile(PATHS.rules).slice(0, 25000);
  if (refPath) {
    const refFull = path.isAbsolute(refPath) ? refPath : path.join(process.cwd(), refPath);
    if (fs.existsSync(refFull)) {
      contextoPadroes += '\n\n---\n\n## Spec de referência (estilo)\n\n```javascript\n' + fs.readFileSync(refFull, 'utf-8').slice(0, 4000) + '\n```';
    }
  }

  console.log('Gerando cenários...');
  const prompt = buildScenariosPrompt(regrasNegocio, contextoPadroes);

  const { output, error } = await generateText({
    model,
    system: SYSTEM_PROMPT,
    output: Output.object({
      schema: ScenariosSchema,
      name: 'Scenarios',
      description: 'Cenários de teste E2E e ações Cursor-ready',
    }),
    prompt,
  }).catch((err) => ({ output: null, error: err }));

  if (error || !output) {
    console.error('Erro na geração:', error?.message || error);
    process.exit(1);
  }

  const slug = path.basename(inputPath, path.extname(inputPath)).replace(/^regras-/, '') || 'funcionalidade';
  const parte1 = [
    `# Cenários de Teste: ${output.funcionalidade}`,
    '',
    `- **Módulo:** ${output.modulo}`,
    `- **Login:** ${output.loginCommand}`,
    `- **Tags:** ${(output.tags || []).join(', ')}`,
    '',
    '## Cenários',
    '',
    ...(output.cenarios || []).map(
      (c, i) =>
        `### ${i + 1}. ${c.nome} (${c.tipo}, prioridade ${c.prioridade})\n\n- **Objetivo:** ${c.objetivo}\n- **Pré-condições:** ${(c.preCondicoes || []).join('; ') || '-'}\n- **Passos:** ${(c.passos || []).join(' → ')}\n- **Resultado esperado:** ${c.resultadoEsperado}\n- **Dados dinâmicos:** ${(c.dadosDinamicos || []).join(', ') || '-'}\n`
    ),
    output.observacoes?.length ? '\n## Observações\n\n' + output.observacoes.map((o) => `- ${o}`).join('\n') : '',
    '',
    '---',
    '',
  ].join('\n');

  const introAcoes =
    '> IMPORTANTE: A ação de explorar tela (explorar-tela) deve ser executada ANTES das demais, pois os locators dependem do DOM real.\n\n';
  const reportPath = `${PATHS.reports}/scenarios-${slug}.md`;
  const parte2 = formatAcoesCursorReady(output.acoes || [], introAcoes, reportPath);

  writeReport(reportPath, parte1 + '\n\n' + parte2);
  console.log('Relatório salvo em', reportPath);
}

main();
