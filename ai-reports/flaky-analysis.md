# Análise de Flaky e Gargalos

## Resumo

Análise de testes flaky e gargalos no projeto Softcomshop, com sugestões de melhorias para cada caso.

## Candidatos a flaky

- **Deve validar os relatorios** (cypress/e2e/compras/cadastro-compra-manual.spec.js) - Taxa: 78%
  - Causa provável: Timing; dependência no carregamento assincrônico dos dados.
  - Evidência: Uso de .should('have.length.at.least', 1) sem verificação prévia de carregamento dos dados.

## Gargalos

- **cypress/e2e/compras/cadastro-compra-manual.spec.js**: Spec contendo muitas operações e verificações diretas. (Impacto: Dificuldade de manutenção e maior chance de flakiness.)

## Anti-padrões

- cy.wait(número) - 1 ocorrência(s) em cypress/e2e/configuracoes/cartao-cadastro.spec.js

---


## Ações Cursor-ready

> Instruções para o Cursor Agent mode. Copie esta seção inteira
> e cole no chat do Cursor com: "Implemente as ações aprovadas abaixo."
> Remova ou altere [APROVADO] para [REJEITADO] nas ações que NÃO deseja executar.

### [APROVADO] Ação 1: Corrigir flaky: Deve validar os relatorios
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/compras/cadastro-compra-manual.spec.js
- **O que fazer**: Substituir a validação de itens sem verificação prévia de carregamento.
- **Código atual**: `cy.get(CadastroCompraLocators.itensSalvos).should('have.length.at.least', 1);`
- **Código sugerido**:
  ```javascript
  cy.get(CadastroCompraLocators.itensSalvos).should('be.visible').and('have.length.at.least', 1);
  ```

### [APROVADO] Ação 2: Gargalo: cypress/e2e/compras/cadastro-compra-manual.spec.js
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/compras/cadastro-compra-manual.spec.js
- **O que fazer**: Refatorar test cases para dividir operações distintas em specs separadas, aumentando a legibilidade e manutenção.

### [APROVADO] Ação 3: Anti-padrão: cy.wait(número)
- **Tipo**: editar-arquivo
- **Arquivo(s)**: cypress/e2e/configuracoes/cartao-cadastro.spec.js
- **O que fazer**: Substituir cy.wait() por validação assertiva de carregamento.