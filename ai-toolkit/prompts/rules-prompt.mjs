/**
 * Prompt específico para análise de regras (analyze-rules.mjs).
 */
export function buildRulesPrompt(contextoRegras) {
  return `Analise o conteúdo abaixo (regras do projeto de automação Cypress: architeture.mdc, ADRs e guias de referência).

Objetivo: identificar redundâncias, gaps, conflitos e melhorias nas regras, e produzir uma análise estruturada em JSON conforme o schema definido.

Para cada item identificado, inclua um objeto "acaoCursor" com:
- tipo: "editar-arquivo" ou "criar-arquivo"
- arquivo: caminho do arquivo a editar/criar (ex: .cursor/rules/architeture.mdc, docs/adr/0017-novo.md)
- descricao: instrução clara e acionável para um desenvolvedor (ou Cursor Agent) implementar a mudança
- codigoSugerido: (opcional) trecho de texto/markdown sugerido quando fizer sentido

Seja objetivo: priorize as mudanças de maior impacto (redundâncias que causam confusão, gaps que geram inconsistência, conflitos entre documentos).
Classifique impacto como "alto", "medio" ou "baixo".

Conteúdo a analisar:

${contextoRegras}`;
}
