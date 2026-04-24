# Descobertas: Incidentes - Nuvem Fiscal (consulta)

**Data:** 2026-04-20  
**Explorado por:** Evidência indireta (código existente + execução planejada)

---

## Base de referência existente

- **Spec existente (importação)**: `cypress/e2e/compras/importacao-compra-nuvem-fiscal.spec.js`
- **Docs**: `docs/cases/architecture-nuvem-fiscal.md`
- **Pages/Locators**:
  - `cypress/support/pages/NuvemFiscal/NuvemFiscalListagemPage.js`
  - `cypress/support/locators/NuvemFiscal/NuvemFiscalListagemLocators.js`

---

## Hipóteses de fluxo para o incidente (a validar em execução)

- A rota de acesso direto sugerida pelo incidente: `/compras/estoque/nuvemFiscal`
- O fluxo mínimo de regressão para “erro de host”:\n  - Acessar a listagem\n  - Disparar a consulta/pesquisa (ou um filtro já implementado)\n  - Validar que a UI **não** apresenta mensagem/estado de erro de host\n+
---

## Locators/ações reutilizáveis

Como o módulo já tem Pages/Locators, a automação de incidente deve **reutilizar** os métodos existentes (ex.: filtrar/pesquisar e validar linhas na tabela), e adicionar apenas o assert negativo do erro de host na spec.

