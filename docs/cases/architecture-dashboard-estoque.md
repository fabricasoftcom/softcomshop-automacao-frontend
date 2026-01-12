# Arquitetura de Teste: Dashboard Estoque

## 1. Objetivo
Validar a visualização dos indicadores de desempenho (KPIs) do estoque.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/estoque/dashboard-estoque.spec.js`
- **Page Objects:** `cypress/support/pages/Estoque/DashboardEstoquePage.js`
- **Locators:** `cypress/support/locators/Estoque/DashboardEstoqueLocators.js`

## 3. Padrões Adotados
- **Validação Visual:** Verificação de visibilidade de elementos gráficos/cards.
- **Tags:** `@estoque`, `@dashboard`, `@regressivo`.

## 4. Cenários Cobertos
1. **Carregamento de Cards:** Validação de que os principais cards de KPI são exibidos.

## 5. Referências
- [ADR-0002](../adr/0002-use-page-object-pattern.md)

