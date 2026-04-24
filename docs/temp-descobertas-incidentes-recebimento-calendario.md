# Descobertas: Incidentes - Modal Recebimento (calendário)

**Data:** 2026-04-20  
**Explorado por:** Evidência indireta (código existente + execução planejada)

---

## Referência existente

- Spec: `cypress/e2e/financeiro/recebimento.spec.js`
- Page: `cypress/support/pages/Financeiro/RecebimentoPage.js`
- Locators: `cypress/support/locators/Financeiro/RecebimentoLocators.js`

---

## Elementos já identificados no código

- **Input data recebimento**: `#data_pagamento` (em `RecebimentoLocators.dataRecebimentoInput`)
- **Modal**: `.modal-content` (contexto principal)

---

## Hipótese do incidente

O datepicker/calendário abre, mas fica **atrás** do modal (stacking context / z-index).\n\nPara regressão, validar:\n- Ao focar/clicar no input de data ou no ícone de calendário (se existir), o container do datepicker fica visível.\n- O datepicker fica com z-index maior que o backdrop/modal (ou ao menos é clicável/visível sem sobreposição).\n+
---

## Locators a confirmar na execução

- Container do datepicker (ex.: `.datepicker-dropdown`, `.datepicker`, `.daterangepicker`) a depender do componente.\n+
