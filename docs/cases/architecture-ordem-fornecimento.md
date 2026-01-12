# Arquitetura de Teste: Ordem de Fornecimento

## 1. Objetivo
Validar o processo de criação de ordens de fornecimento para abastecimento de estoque.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/compras/ordem-fornecimento.spec.js`
- **Page Objects:**
  - `cypress/support/pages/Compra/OrdemFornecimentoListagemPage.js`
  - `cypress/support/pages/Compra/OrdemFornecimentoCadastroPage.js`
- **Locators:**
  - `cypress/support/locators/Compra/OrdemFornecimentoListagemLocators.js`
  - `cypress/support/locators/Compra/OrdemFornecimentoCadastroLocators.js`

## 3. Padrões Adotados
- **Itens Dinâmicos:** Tratamento de tabela de itens com inputs dinâmicos.
- **Typeahead:** Interação com campos de busca automática (fornecedor/produto).
- **Tags:** `@compras`, `@regressivo`.

## 4. Cenários Cobertos
1. **Cadastro Básico:** Preenchimento de dados do fornecedor e detalhes da ordem.

## 5. Referências
- [ADR-0002](../adr/0002-use-page-object-pattern.md)

