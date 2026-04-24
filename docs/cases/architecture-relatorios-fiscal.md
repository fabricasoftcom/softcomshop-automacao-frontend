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

### Fiscal Saída Analítico (detalhe)

- **Acesso E2E:** `cy.visit('/relatorio-v2/fiscal-saida-analitico')` (mesmo padrão do Fiscal Entrada Analítico), sem fluxo hub/modal do catálogo.
- **Locators:** formulário escopado em `#filter-drawer-body` (drawer de filtros).
- **Manutenção / exploração autônoma (ADR-0016):** o Cypress não executa o MCP do Cursor. Antes de alterar locators ou rota, usar o servidor **cursor-ide-browser** no Cursor (`browser_navigate`, `browser_snapshot`, sessão no mesmo `baseUrl`) ou `docs/referencias/template-exploracao-autonoma.md`. O cabeçalho de `relatorio-fiscal-saida-analitico.spec.js` documenta esse vínculo.

### Fiscal Saída Sintético (detalhe)

- **Acesso E2E:** `cy.visit('/relatorio-v2/relatorio-fiscal-sintetico')`, alinhado ao Fiscal Entrada Sintético e ao spec de Saída Analítico (sem menu catálogo no fluxo principal).
- **Locators:** `#filter-drawer-body` + `form#form-relatorio-nota-fiscal`.
- **Pós-pesquisa:** `validarTabelaComDados()` valida grid visível, presença de coluna **CFOP** na tabela e linhas em `tbody` (mesma estratégia do Saída Analítico; ajustar texto de cabeçalho se o DOM sintético divergir).
- **Manutenção (ADR-0016):** cabeçalho JSDoc em `relatorio-fiscal-saida-sintetico.spec.js` (MCP + template de exploração).

### NFSe (detalhe)

- **Acesso E2E:** menu Relatórios → expandir nicho **Notas Fiscais** → barra `RelatoriosGeraisLocators.campoBuscaPagina` com texto `NFSe` → localizar `.catalogo-relatorio-item` cujo `data-href` contenha `relatorio-nfse` (preferir card **visível**; se só existir cópia em `catalogo-nicho-items-hidden`, usa o `href` e `cy.visit` sem clique).
- **Pós-pesquisa no relatório:** `pesquisar()` valida `table` visível (sem intercept fixo de URL).

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
- **ADR-0016:** Planning Before Implementation (exploração autônoma antes de mudar DOM/locators)

---

**Última atualização:** 2026-04-13

