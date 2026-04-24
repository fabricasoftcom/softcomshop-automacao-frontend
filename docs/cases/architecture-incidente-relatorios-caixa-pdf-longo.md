# Arquitetura: Incidente — Relatório de Caixa, PDF com período longo

## Objetivo

Regressão de timeout/504 ou 500 ao gerar PDF do relatório de caixa com período maior (≈15 dias).

**Spec:** `cypress/e2e/incidentes/RelatoriosCaixa.spec.js`  
**Origem:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Object:** `cypress/support/pages/relatorios/RelatorioCaixaPage.js` — `preencherPesquisarEGerarPdfPeriodoLongo`, `periodoLongoParaRegressaoPdf`
- **Locators:** `cypress/support/locators/Relatorios/RelatorioCaixaLocators.js`

## Dependências

- `cy.loginArmazenandoSessao()`, `RelatorioCaixaPage.acessarRelatorioCaixa()`
- `defaultCommandTimeout` elevado no `it` (120s)
- `cy.verificarErro500Visual()` após pesquisa e após clique em Gerar PDF

## Relacionamentos

- `architecture-relatorio-caixa.md`
- Spec principal: `cypress/e2e/relatorio/relatorio-caixa.spec.js`

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
