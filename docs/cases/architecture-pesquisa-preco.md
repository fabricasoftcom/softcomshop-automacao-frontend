# Arquitetura de Teste: Pesquisa Preço

**Arquivo de Spec:** `cypress/e2e/produto/pesquisa-preco.spec.js`  
**Page Object:** `cypress/support/pages/Produto/PesquisaPrecoPage.js`  
**Locator:** `cypress/support/locators/Produto/PesquisaPrecoLocators.js`  

## 1. Objetivo
Validar a funcionalidade de "Pesquisa Preço", garantindo que o usuário consiga acessar a tela, realizar buscas por código, referência, código de barras ou descrição do produto, e visualizar os detalhes (preço, preço promoção, estoque) ao selecionar um produto da listagem.

## 2. Contexto e Dependências
- **Módulo**: Produtos
- **Funcionalidade**: Pesquisa rápida de produtos com exibição de preços
- **Dependências de Dados**:
  - Login com usuário não-fiscal (`cy.loginArmazenandoSessao()`)

## 3. Estrutura do Teste
O teste cobre os seguintes cenários:
1. **Validação de Acesso**: Verifica se a tela carrega corretamente com todos os elementos principais.
2. **Busca por Código**: Valida a funcionalidade de busca por código de produto.
3. **Exibição de Detalhes**: Valida que ao selecionar um produto, a seção de detalhes é exibida com preço e preço promoção.

## 4. Padrões e Boas Práticas (ADRs)
- **Page Object Pattern (ADR-0002)**: Lógica de interação encapsulada em `PesquisaPrecoPage`.
- **Locators Separados (ADR-0003)**: Seletores centralizados em `PesquisaPrecoLocators`.
- **Login Não-Fiscal (ADR-0004)**: Uso de `cy.loginArmazenandoSessao()` para autenticação.
- **Tags (ADR-0010)**: Uso de `@produto`, `@pesquisa-preco`, `@regressivo`.
- **Priorizar IDs (ADR-0015)**: Campo de busca usa ID `#produto`.

## 5. Relacionamentos
- **Documentações Relacionadas**:
  - [Listagem de Produtos](./architecture-listagem-produtos.md)
  - [Cadastro de Produto](./architecture-cadastro-produto.md)

## 6. Fluxos Críticos
- A busca é realizada em tempo real (debounce) ao digitar no campo.
- A tabela exibe produtos com colunas: Código, Descrição, Referência, Cód. Barras, Preço, Preço Promoção e Estoque.
- Ao clicar em uma linha da tabela, a seção de detalhes é exibida à direita com informações do produto selecionado.
- A seção de detalhes mostra: Referência, Estoque por empresa, Preço e Preço Promoção.

