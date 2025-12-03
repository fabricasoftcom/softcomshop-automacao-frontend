# Arquitetura dos casos de teste: Listagem de Orçamento

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Orçamento**, que valida a navegação e ações básicas na listagem de orçamentos.

**Funcionalidades cobertas:**
- Acesso à listagem de orçamentos
- Navegação para novo cadastro
- Validação de redirecionamento

**Cenários principais:**
- Realizar cadastro de novo orçamento a partir da listagem

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/orcamento/orcamento-listagem.spec.js` - Teste de listagem de orçamento

### Page Objects
- `cypress/support/pages/Orcamento/OrcamentoListagemPage.js` - Métodos para listagem de orçamento

### Locators
- `cypress/support/locators/OrcamentoListagemLocators.js` - Seletores da listagem de orçamento

---

## Imports e dependências

### Page Objects
```javascript
import OrcamentoListagemPage from "../../support/pages/Orcamento/OrcamentoListagemPage";
```

### Locators
Os locators são importados internamente no Page Object.

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial (não usado diretamente)

---

## Estrutura do teste

### Suite: Testes de Listagem de Orçamento

**Tags:** `['@orcamento', '@listagem-orcamento', '@regressivo']` (ADR-0010)

#### `it('Deve realizar cadastro de novo orçamento')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de listagem de orçamentos via `OrcamentoListagemPage.visit()`

2. **Navegação:**
   - Clica em "Novo Cadastro" via `OrcamentoListagemPage.novoCadastro()`

3. **Validação:**
   - Valida que URL inclui `/orcamento/novo`

---

## Padrões e boas práticas

### Navegação e Redirecionamento
- Validação de URL após navegação
- Uso de `cy.url().should('include', '/orcamento/novo')`

### Page Object Pattern
- Encapsulamento de ações em `OrcamentoListagemPage`
- Separação de locators em arquivo dedicado

### Tags aplicadas
- `@orcamento` - Identifica módulo
- `@listagem-orcamento` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### OrcamentoListagemPage

**Navegação:**
- `visit()` - Acessa página de listagem via URL direta (`/orcamento`) e valida título "Listagem"

**Ações:**
- `novoCadastro()` - Clica em botão "Novo Cadastro"

**Métodos adicionais disponíveis (não usados no teste atual):**
- `pesquisar(codigo, cliente, status)` - Realiza pesquisa com filtros
- `selecionarTodosRegistros()` - Seleciona todos os registros
- `cancelarSelecionados()` - Cancela orçamentos selecionados
- `confirmarCancelamento()` - Confirma cancelamento
- `verificarTabelaVazia()` - Verifica se tabela está vazia
- `validarMensagemCancelamento()` - Valida mensagem de cancelamento
- `verificarQuantidadeLinhasTabela(qtd)` - Verifica quantidade de linhas
- `verificarLinhaContemTexto(index, texto)` - Verifica conteúdo da linha

---

## Locators utilizados

### OrcamentoListagemLocators

**Botões:**
- `btnNovoCadastro` - Botão novo cadastro

**Campos (não usados no teste atual):**
- `campoCodigo` - Campo código
- `campoCliente` - Campo cliente
- `campoStatus` - Campo status
- `btnPesquisar` - Botão pesquisar
- `checkboxTodos` - Checkbox selecionar todos
- `btnCancelarSelecionados` - Botão cancelar selecionados
- `modalConfirmacao` - Modal de confirmação
- `botaoConfirmarExclusao` - Botão confirmar exclusão
- `toastAlerta` - Toast de alerta
- `linhasTabela` - Linhas da tabela

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-orcamento-cadastro.md` - Documentação de cadastro de orçamento
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste simples focado em navegação
- Validação de redirecionamento para página de cadastro
- Page Object possui métodos adicionais para funcionalidades futuras (pesquisa, cancelamento, etc.)
- Teste mínimo necessário para validar acesso à funcionalidade

---

**Última atualização:** 2024-12-19

