# Arquitetura de Teste: Serviço

## 1. Objetivo
Validar o fluxo de cadastro e listagem de serviços no sistema, garantindo que novos serviços possam ser criados e consultados corretamente.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/servicos/servico.spec.js`
- **Page Objects:**
  - `cypress/support/pages/Servico/ServicoListagemPage.js`
  - `cypress/support/pages/Servico/ServicoCadastroPage.js`
- **Locators:**
  - `cypress/support/locators/Servico/ServicoListagemLocators.js`
  - `cypress/support/locators/Servico/ServicoCadastroLocators.js`

## 3. Padrões Adotados
- **Page Object Pattern:** Separação entre lógica de teste e interação com a página.
- **Locators Separados:** Seletores CSS centralizados em arquivos específicos.
- **Faker:** Geração de dados dinâmicos para descrição e valores.
- **Tags:** `@servicos`, `@servico`, `@regressivo`.

## 4. Cenários Cobertos
1. **Cadastro com Sucesso:** Preenchimento de campos obrigatórios (descrição, grupo, preço) e salvamento.

## 5. Referências
- [ADR-0002](../adr/0002-use-page-object-pattern.md)
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md)

