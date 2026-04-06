/**
 * Prompt específico para geração de cenários de teste (generate-scenarios.mjs).
 */
export function buildScenariosPrompt(regrasNegocio, contextoPadroes) {
  return `Com base nas REGRAS DE NEGÓCIO e nos PADRÕES DO PROJETO abaixo, gere cenários de teste E2E estruturados em JSON conforme o schema definido.

Requisitos:
1. Cobrir fluxo feliz, validações obrigatórias, erros esperados e edge cases relevantes.
2. Cada cenário deve ter: nome, tipo (positivo/negativo/edge/regressivo), objetivo, pré-condições, passos, resultado esperado, dados dinâmicos (quais campos usar Faker), prioridade.
3. Indicar loginCommand correto (cy.login, cy.loginArmazenandoSessao, cy.loginArmazenandoSessaoCobranca) conforme o módulo/funcionalidade.
4. Sugerir tags para @cypress/grep (ex: @financeiro, @conta-corrente, @regressivo).
5. Incluir objeto "acoesCursor" com ações acionáveis para criar: spec, Page Object, Locators, adicionar ao specPattern, documentação (architecture-*.md, testes.md). Para locators, incluir nota de que devem ser validados após exploração autônoma da tela (não assumir DOM).
6. Se a regra de negócio mencionar URL ou módulo, use para sugerir caminhos de arquivos (ex: cypress/e2e/financeiro/cadastro-conta-corrente.spec.js).

REGRAS DE NEGÓCIO:
${regrasNegocio}

PADRÕES DO PROJETO (architeture.mdc e exemplos):
${contextoPadroes}`;
}
