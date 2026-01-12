# Arquitetura de Teste: Cadastro de Modelos

## 1. Objetivo
Validar a criação de modelos de contrato, utilizados para geração de documentos.

## 2. Estrutura de Arquivos
- **Spec:** `cypress/e2e/contratos/cadastro-modelos.spec.js`
- **Page Objects:**
  - `cypress/support/pages/Contrato/CadastroModelosListagemPage.js`
  - `cypress/support/pages/Contrato/CadastroModelosCadastroPage.js`
- **Locators:**
  - `cypress/support/locators/Contrato/CadastroModelosListagemLocators.js`
  - `cypress/support/locators/Contrato/CadastroModelosCadastroLocators.js`

## 3. Padrões Adotados
- **Page Object Pattern:** Encapsulamento da lógica de interação com CKEditor (futuro).
- **Tags:** `@contratos`, `@regressivo`.

## 4. Cenários Cobertos
1. **Cadastro de Modelo:** Criação de modelo com título.

## 5. Referências
- [ADR-0002](../adr/0002-use-page-object-pattern.md)

