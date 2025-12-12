# Arquitetura dos casos de teste: Relatórios Fiscais

## Objetivo

Este documento descreve a arquitetura dos testes relacionados aos **Relatórios Fiscais**, que validam a geração e visualização de 6 relatórios do módulo fiscal.

**Relatórios cobertos:**
- Fiscal Saída Analítico
- Fiscal Saída Sintético
- Fiscal Entrada Analítico
- Fiscal Entrada Sintético
- Pis/Cofins
- NFSe

**Funcionalidades cobertas:**
- Acesso aos relatórios fiscais
- Validação de elementos básicos (filtros, botões)
- Pesquisa com período diário
- Validação de resultados e erros 500

**Observação importante:** Relatórios fiscais utilizam `cy.login()` ao invés de `cy.loginArmazenandoSessao()` (ADR-0004)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/relatorio/relatorio-fiscal-saida-analitico.spec.js`
- `cypress/e2e/relatorio/relatorio-fiscal-saida-sintetico.spec.js`
- `cypress/e2e/relatorio/relatorio-fiscal-entrada-analitico.spec.js`
- `cypress/e2e/relatorio/relatorio-fiscal-entrada-sintetico.spec.js`
- `cypress/e2e/relatorio/relatorio-fiscal-pis-cofins.spec.js`
- `cypress/e2e/relatorio/relatorio-nfse.spec.js`

### Page Objects
- `cypress/support/pages/relatorios/RelatorioFiscalSaidaAnaliticoPage.js`
- `cypress/support/pages/relatorios/RelatorioFiscalSaidaSinteticoPage.js`
- `cypress/support/pages/relatorios/RelatorioFiscalEntradaAnaliticoPage.js`
- `cypress/support/pages/relatorios/RelatorioFiscalEntradaSinteticoPage.js`
- `cypress/support/pages/relatorios/RelatorioFiscalPisCofinsPage.js`
- `cypress/support/pages/relatorios/RelatorioNfsePage.js`

### Locators
- `cypress/support/locators/Relatorios/RelatorioFiscalSaidaAnaliticoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFiscalSaidaSinteticoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFiscalEntradaAnaliticoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFiscalEntradaSinteticoLocators.js`
- `cypress/support/locators/Relatorios/RelatorioFiscalPisCofinsLocators.js`
- `cypress/support/locators/Relatorios/RelatorioNfseLocators.js`

---

## Imports e dependências

### Commands
- `cy.login()` - Login com usuário fiscal (ADR-0004) - **DIFERENÇA IMPORTANTE**
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Padrão comum

**Tags:** `['@relatorios', '@fiscal', '@[nome-relatorio]', '@regressivo']` (ADR-0010)

#### `beforeEach`
1. Login com `cy.login()` - **Usuário fiscal**
2. Visita página inicial
3. Acessa relatório específico
4. Garante filtros visíveis

#### Testes
- Validação de elementos básicos
- Pesquisa com período diário

---

## Padrões e boas práticas

### Formatação de Data
- Função auxiliar `formatDate()` para formatar data
- Formato: `DD/MM/YYYY` (sem hora para relatórios fiscais)

### Login Fiscal
- **IMPORTANTE:** Usar `cy.login()` ao invés de `cy.loginArmazenandoSessao()`
- Relatórios fiscais requerem usuário com permissões fiscais

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern
- **ADR-0003:** Separate Locators from Page Objects
- **ADR-0004:** Use cy.session for Login Persistence - **Usa `cy.login()` para fiscal**
- **ADR-0010:** Use Tags for Test Filtering
- **ADR-0011:** Use Conditional Intercepts

---

**Última atualização:** 2025-01-XX

