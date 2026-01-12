# Arquitetura de Teste: Atualizar Dados Fiscais

## 1. Objetivo
Validar o fluxo completo de atualização em massa de dados fiscais de produtos e serviços, cobrindo as três abas principais: Vínculos Fiscais, Produto e Serviço. O teste inclui filtragem, edição de dados e validação de sucesso.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/produtos/atualizar-dados-fiscais.spec.js`
- **Page Objects:** `cypress/support/pages/Produtos/AtualizarDadosFiscaisPage.js`
- **Locators:** `cypress/support/locators/Produtos/AtualizarDadosFiscaisLocators.js`

## 3. Padrões Adotados
- **Login Fiscal:** Uso de `cy.login()` para acesso a funcionalidades fiscais.
- **Filtros por Contexto:** Abstração da lógica de seleção de abas e preenchimento de filtros específicos para cada contexto (Vínculos, Produto, Serviço).
- **Interação Forçada:** Uso de `{ force: true }` e remoção de atributos `disabled` via `invoke` para lidar com comportamentos complexos de formulário e elementos sobrepostos/desabilitados pelo front-end antes da interação.
- **Faker:** Geração de dados aleatórios para atualização (NCM, Código Tributação) garantindo variabilidade nos testes.
- **Tags:** `@produtos`, `@fiscal`, `@regressivo`.

## 4. Cenários Cobertos
1. **Filtro por Vínculos Fiscais:** Validação da aba padrão, filtrando por origem e documentos.
2. **Atualização de Produto:** 
   - Seleção da aba Produto.
   - Filtro por tipo de item.
   - Edição em massa de NCM/CEST.
   - Submissão da atualização.
3. **Atualização de Serviço:** 
   - Seleção da aba Serviço.
   - Filtro por descrição.
   - Edição em massa de Código de Tributação.
   - Submissão da atualização.

## 5. Referências
- [ADR-0011](../adr/0011-use-conditional-intercepts.md)
