# Arquitetura dos casos de teste: Cadastro de Contas

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Cadastro de Contas**, que valida a seleção de tipo de conta e navegação para páginas de cadastro específicas.

**Funcionalidades cobertas:**
- Seleção de tipo de conta (Conta Corrente, Caixinha)
- Navegação para páginas de cadastro específicas
- Retorno à listagem de contas

**Cenários principais:**
- Selecionar "Conta Corrente" e validar redirecionamento
- Selecionar "Caixinha" e validar redirecionamento
- Clicar em "Voltar" e retornar à listagem

**Tipos de conta disponíveis:**
- Conta Corrente
- Caixinha
- Cartão de Crédito
- Administradora de Cartões
- Conta Poupança
- Conta Empréstimo
- Softcompay
- Carteira Virtual
- Crediário Carne

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/cadastro-conta.spec.js` - Teste de seleção de tipo de conta

### Page Objects
- `cypress/support/pages/Financeiro/ContaCadastroPage.js` - Métodos para seleção de tipo de conta
- `cypress/support/pages/Financeiro/ListagemContasPage.js` - Navegação para listagem de contas

### Locators
- `cypress/support/locators/ContaCadastroLocator.js` - Seletores da seleção de tipo de conta

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import contaCadastroPage from "../../support/pages/Financeiro/ContaCadastroPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import contaCadastroLocator from '../../locators/ContaCadastroLocator';
```

### Commands
- `cy.loginArmazenandoSessaoCobranca()` - Login com usuário de cobrança bancária
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Cadastro de Contas

**Tags:** `['@cadastro-conta', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve selecionar a Conta Corrente')`

**Fluxo:**
1. Acessa página de cadastro de contas
2. Seleciona tipo "Conta Corrente"
3. Valida que URL inclui `/conta-corrente`

---

#### `it('Deve selecionar a Caixinha')`

**Fluxo:**
1. Acessa página de cadastro de contas
2. Seleciona tipo "Caixinha"
3. Valida que URL inclui `/caixinha`

---

#### `it('Deve retornar à listagem ao clicar em Voltar')`

**Fluxo:**
1. Acessa página de cadastro de contas
2. Clica em "Voltar"
3. Valida que URL inclui `/integracao-bancaria/conta`

---

## Padrões e boas práticas

### Validação de Navegação
- Validação de URL após seleção de tipo de conta
- Validação de URL após retorno à listagem
- Uso de `cy.url().should('include', '...')` para validar redirecionamento

### Reutilização de Métodos
- Método `selecionarTipoConta()` genérico para todos os tipos
- Switch case para diferentes tipos de conta
- Tratamento de erro para tipo não reconhecido

### Navegação Hierárquica
- Page Object de listagem usado para acessar cadastro
- Page Object de cadastro usado para seleção de tipo
- Hierarquia clara de navegação

### Tags aplicadas
- `@cadastro-conta` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ContaCadastroPage

**Navegação:**
- `visit()` - Acessa listagem e clica em novo cadastro, valida título da página

**Seleção de tipo:**
- `selecionarTipoConta(tipoConta)` - Seleciona tipo de conta (switch case)
  - Tipos suportados: Conta Corrente, Caixinha, Cartão de Crédito, Administradora de Cartões, Conta Poupança, Conta Empréstimo, Softcompay, Carteira Virtual, Crediário Carne

**Navegação:**
- `voltarParaListagem()` - Clica em botão "Voltar" e retorna à listagem

---

## Locators utilizados

### ContaCadastroLocator

**Título:**
- `tituloPagina` - Título da página de cadastro

**Botões de tipo de conta:**
- `btnContaCorrente` - Botão Conta Corrente
- `btnCaixinha` - Botão Caixinha
- `btnCartaoCredito` - Botão Cartão de Crédito
- `btnAdministradoraCartoes` - Botão Administradora de Cartões
- `btnContaPoupanca` - Botão Conta Poupança
- `btnContaEmprestimo` - Botão Conta Empréstimo
- `btnSoftcompay` - Botão Softcompay
- `btnCarteiraVirtual` - Botão Carteira Virtual
- `btnCrediarioCarne` - Botão Crediário Carne

**Navegação:**
- `btnVoltar` - Botão voltar

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-cadastro-conta-corrente.md` - Documentação de cadastro de conta corrente
- `docs/cases/architecture-listagem-conta.md` - Documentação de listagem de contas
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessaoCobranca()` para usuário com permissões de cobrança bancária
- Testes focam em navegação e redirecionamento
- Validação de URL garante que redirecionamento está correto
- Método genérico permite fácil adição de novos tipos de conta
- Tratamento de erro para tipo não reconhecido

---

## Tipos de Conta e URLs

| Tipo de Conta | URL |
|---------------|-----|
| Conta Corrente | `/integracao-bancaria/conta/novo/conta-corrente` |
| Caixinha | `/integracao-bancaria/conta/novo/caixinha` |
| Cartão de Crédito | `/integracao-bancaria/conta/novo/cartao-credito` |
| Administradora de Cartões | `/integracao-bancaria/conta/novo/administradora-cartoes` |
| Conta Poupança | `/integracao-bancaria/conta/novo/conta-poupanca` |
| Conta Empréstimo | `/integracao-bancaria/conta/novo/conta-emprestimo` |
| Softcompay | `/integracao-bancaria/conta/novo/softcompay` |
| Carteira Virtual | `/integracao-bancaria/conta/novo/carteira-virtual` |
| Crediário Carne | `/integracao-bancaria/conta/novo/crediario-carne` |

---

**Última atualização:** 2024-12-19

