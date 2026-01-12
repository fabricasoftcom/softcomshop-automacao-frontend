# Arquitetura de Teste: Vínculos Fiscais de Serviço

## 1. Objetivo
Validar o cadastro de vínculos fiscais para serviços, essencial para a tributação correta.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/servicos/vinculo-fiscal-servico.spec.js`
- **Page Objects:**
  - `cypress/support/pages/Servico/VinculoFiscalServicoListagemPage.js`
  - `cypress/support/pages/Servico/VinculoFiscalServicoCadastroPage.js`
- **Locators:**
  - `cypress/support/locators/Servico/VinculoFiscalServicoListagemLocators.js`
  - `cypress/support/locators/Servico/VinculoFiscalServicoCadastroLocators.js`

## 3. Padrões Adotados
- **Login Fiscal:** Utiliza `cy.login()` para acesso a funcionalidades fiscais.
- **Faker:** Dados dinâmicos para descrição.
- **Tags:** `@servicos`, `@fiscal`, `@regressivo`.

## 4. Cenários Cobertos
1. **Cadastro de Vínculo:** Criação de um novo vínculo fiscal com descrição.

## 5. Referências
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md)

