/**
 * Prompt específico para detecção de flaky e gargalos (detect-flaky.mjs).
 */
export function buildFlakyPrompt(candidatosResumo, codigoSpecs, antiPadroesEncontrados) {
  return `Analise os testes candidatos a flaky e o código dos specs abaixo.
Objetivo: identificar causas prováveis de flakiness, gargalos de performance e anti-padrões, e produzir ações Cursor-ready (editar-arquivo com descricao, codigoAtual e codigoSugerido quando aplicável).

Para cada candidato flaky:
- Indique causa provável (timing, estado compartilhado, dependência de ordem, dado externo, etc.) e evidência no código.
- Gere acaoCursor com: tipo "editar-arquivo", arquivo (caminho do spec ou locator), descricao clara, codigoAtual (trecho problemático), codigoSugerido (substituição sugerida).

Para gargalos: specs muito longos, muitos steps, operações lentas.
Para anti-padrões: cy.wait(número), selectors hardcoded, locators sem contexto (.modal), etc.

Seja específico: cite linha ou trecho do código quando possível.

RESUMO DOS CANDIDATOS (teste, spec, taxa de falha):
${candidatosResumo}

CÓDIGO DOS SPECS CANDIDATOS:
${codigoSpecs}

ANTI-PADRÕES JÁ DETECTADOS (grep/local):
${antiPadroesEncontrados}`;
}
