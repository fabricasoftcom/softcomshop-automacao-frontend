# Arquitetura dos casos de teste: Relatórios Financeiros

## Objetivo

Este documento descreve a arquitetura dos testes relacionados aos **Relatórios Financeiros**, que validam a geração e visualização de 3 relatórios do módulo financeiro.

**Relatórios cobertos:**
- Contas a Receber
- Contas a Pagar
- Projeção de Cartões

**Funcionalidades cobertas:**
- Acesso aos relatórios financeiros
- Validação de elementos básicos (filtros, botões)
- Pesquisa com período diário
- Validação de resultados e erros 500

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorio-contas-receber.spec.js`
- `cypress/e2e/relatorio/relatorio-contas-pagar.spec.js`
- `cypress/e2e/relatorio/relatorio-projecao-cartoes.spec.js`

### Page Objects
- `cypress/support/pages/relatorios/RelatorioContasReceberPage.js`
- `cypress/support/pages/relatorios/RelatorioContasPagarPage.js`
- `cypress/support/pages/relatorios/RelatorioProjecaoCartoesPage.js`

### Locators
- `cypress/support/locators/Relatorios/RelatorioContasReceberLocators.js`
- `cypress/support/locators/Relatorios/RelatorioContasPagarLocators.js`
- `cypress/support/locators/Relatorios/RelatorioProjecaoCartoesLocators.js`

---

## Imports e dependências

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Padrão comum

**Tags:** `['@relatorios', '@financeiro', '@[nome-relatorio]', '@regressivo']` (ADR-0010)

#### `beforeEach`
1. Login com `cy.loginArmazenandoSessao()`
2. Visita página inicial
3. Acessa relatório específico
4. Garante filtros visíveis

#### Testes
- Validação de elementos básicos
- Pesquisa com período diário

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

