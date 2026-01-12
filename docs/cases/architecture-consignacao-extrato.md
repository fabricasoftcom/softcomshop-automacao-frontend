# Arquitetura de Teste: Consignação - Extrato

**Arquivo de Spec:** `cypress/e2e/consignacao/consignacao-extrato.spec.js`  
**Page Object:** `cypress/support/pages/Consignacao/ConsignacaoExtratoPage.js`  
**Locator:** `cypress/support/locators/Consignacao/ConsignacaoExtratoLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Extrato de Consignação", garantindo que o usuário consiga acessar a tela, preencher o formulário de pesquisa e visualizar os totalizadores de requisições, devoluções, vendas e saldo.

## 2. Contexto e Dependências
- **Módulo**: Vendas e NF-e / Consignação
- **Funcionalidade**: Extrato e consulta de movimentações de consignação
- **Dependências de Dados**:
  - Login com usuário não-fiscal (`cy.loginArmazenandoSessao()`)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente com formulário e totalizadores.
2. **Preenchimento de Formulário**: Valida o preenchimento dos campos de período, cliente, produto e status.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `ConsignacaoExtratoPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `ConsignacaoExtratoLocators`.
- **Login Não-Fiscal (ADR-0004)**: Uso de `cy.loginArmazenandoSessao()` para autenticação.
- **Tags (ADR-0010)**: Uso de `@consignacao`, `@extrato`, `@regressivo`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [Consignação - Requisição](./architecture-consignacao-requisicao.md)
  - [Consignação - Devolução/Venda](./architecture-consignacao-devolucao.md)

## 6. Fluxos Críticos
- O formulário possui campos com autocomplete (cliente e produto) que requerem tratamento especial.
- O campo de período usa date range picker que pode cobrir outros elementos - requer fechamento antes de interagir com select.
- Os totalizadores exibem valores de requisições, devoluções, vendas e saldo.
- O campo status possui valores em minúsculo (`todos`, `com_saldo`, `sem_saldo`).

