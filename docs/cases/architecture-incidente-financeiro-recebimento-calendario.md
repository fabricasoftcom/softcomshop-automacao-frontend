# Arquitetura: Incidente — Calendário no modal de Recebimento

## Objetivo

Regressão do bug em que o calendário (datepicker) da data de recebimento abria atrás do modal.

**Spec:** `cypress/e2e/incidentes/FinanceiroRecebimentoModal.spec.js`  
**Origem:** `ai-reports/incidents-analysis.md`

## Estrutura de arquivos

- **Page Object:** `cypress/support/pages/Financeiro/RecebimentoPage.js` — `abrirCalendarioCampoDataPagamento`, `validarDatepickerDataPagamentoAcimaDoModal`
- **Locators:** `cypress/support/locators/Financeiro/RecebimentoLocators.js` — `disparadorCalendarioDataPagamento`, `datepickerDropdownVisivel`

## Dependências

- `cy.loginArmazenandoSessao()`, `RecebimentoPage.visit()`
- `ListagemContasAReceberPage.verificarSeHaLinhasComStatusBaixar()` — sem dados, o teste faz `skip`

## Relacionamentos

- `architecture-recebimento.md`
- `architecture-listagem-contas-a-receber.md`

## ADRs

- ADR-0002, ADR-0003, ADR-0004, ADR-0006, ADR-0010
