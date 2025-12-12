# Arquitetura dos casos de teste: Relatórios de Produtos

## Objetivo

Este documento descreve a arquitetura dos testes relacionados aos **Relatórios de Produtos**, que validam a geração e visualização de 6 relatórios do módulo de produtos.

**Relatórios cobertos:**
- Exibir Estoque
- Tabela de Preço
- Ficha Estoque
- Inventário
- NCM
- Movimentação de Estoque

**Funcionalidades cobertas:**
- Acesso aos relatórios de produtos
- Validação de elementos básicos (filtros, botões)
- Pesquisa e geração de relatórios
- Validação de resultados e erros 500

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorio-exibir-estoque.spec.js`
- `cypress/e2e/relatorio/relatorio-tabela-preco.spec.js`
- `cypress/e2e/relatorio/relatorio-ficha-estoque.spec.js`
- `cypress/e2e/relatorio/relatorio-inventario.spec.js`
- `cypress/e2e/relatorio/relatorio-ncm.spec.js`
- `cypress/e2e/relatorio/relatorio-movimentacao-estoque.spec.js`

### Page Objects
- `cypress/support/pages/relatorios/RelatorioExibirEstoquePage.js`
- `cypress/support/pages/relatorios/RelatorioTabelaPrecoPage.js`
- `cypress/support/pages/relatorios/RelatorioFichaEstoquePage.js`
- `cypress/support/pages/relatorios/RelatorioInventarioPage.js`
- `cypress/support/pages/relatorios/RelatorioNcmPage.js`
- `cypress/support/pages/relatorios/RelatorioMovimentacaoEstoquePage.js`

### Locators
- `cypress/support/locators/Relatorios/RelatorioExibirEstoqueLocators.js`
- `cypress/support/locators/Relatorios/RelatorioTabelaPrecoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFichaEstoqueLocators.js`
- `cypress/support/locators/Relatorios/RelatorioInventarioLocators.js`
- `cypress/support/locators/Relatorios/RelatorioNcmLocators.js`
- `cypress/support/locators/Relatorios/RelatorioMovimentacaoEstoqueLocators.js`

---

## Imports e dependências

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Padrão comum

**Tags:** `['@relatorios', '@produtos', '@[nome-relatorio]', '@regressivo']` (ADR-0010)

#### `beforeEach`
1. Login com `cy.loginArmazenandoSessao()`
2. Visita página inicial
3. Acessa relatório específico
4. Garante filtros visíveis

#### Testes
- Validação de elementos básicos
- Pesquisa ou geração de relatório

**Observação:** Relatório de Inventário usa método `gerarInventario()` ao invés de `pesquisar()`

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern
- **ADR-0003:** Separate Locators from Page Objects
- **ADR-0004:** Use cy.session for Login Persistence
- **ADR-0010:** Use Tags for Test Filtering
- **ADR-0011:** Use Conditional Intercepts

---

**Última atualização:** 2025-01-XX

