# Arquitetura dos casos de teste: Listagem de Vínculo Fiscal

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Vínculo Fiscal**, que valida a navegação, ações de cadastro, edição e exclusão na listagem de vínculos fiscais.

**Funcionalidades cobertas:**
- Acesso à listagem de vínculos fiscais
- Navegação para novo cadastro
- Exclusão de vínculos selecionados
- Edição de vínculo fiscal

**Cenários principais:**
- Realizar cadastro de novo vínculo fiscal
- Excluir todos os itens selecionados
- Editar o primeiro vínculo fiscal da tabela

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/vinculo-fiscal/vinculo-fiscal-listagem.spec.js` - Teste de listagem de vínculo fiscal

### Page Objects
- `cypress/support/pages/VinculoFiscal/VinculoFiscalListagemPage.js` - Métodos para listagem

### Locators
- `cypress/support/locators/VinculoFiscalListagemLocators.js` - Seletores da listagem

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralProdutoPage.js` - Navegação para módulo

---

## Imports e dependências

### Page Objects
```javascript
import VinculoFiscalListagemPage from "../../support/pages/VinculoFiscal/VinculoFiscalListagemPage";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes de Listagem de Vínculo Fiscal

**Tags:** `['@listagem-vinculo-fiscal', '@regressivo']` (ADR-0010)

#### `it('Deve realizar cadastro de novo vínculo fiscal')`

**Fluxo:**
1. Acessa listagem de vínculos fiscais
2. Clica em "Novo Cadastro"
3. Valida redirecionamento para `/novo`
4. Valida título contém "Vínculo Fiscal"

---

#### `it('Deve excluir todos os itens selecionados')`

**Fluxo:**
1. Seleciona todos os registros da tabela
2. Clica em excluir selecionados
3. Aguarda 10 segundos
4. Confirma exclusão
5. Aguarda 20 segundos

**Nota:** Teste com waits longos para garantir processamento

---

#### `it('Deve editar o primeiro vínculo fiscal da tabela')`

**Fluxo:**
1. Edita primeira linha da tabela (índice 0)
2. Valida redirecionamento para `/editar`

---

## Padrões e boas práticas

### Navegação e Redirecionamento
- Validação de URL após navegação
- Validação de elementos visíveis (título)

### Seleção em Massa
- Seleção de todos os registros via checkbox
- Exclusão em lote

### Waits Explícitos
- Uso de `cy.wait()` com valores altos (10s, 20s)
- Necessário para processamento de exclusão em massa

### Edição por Índice
- Edição de linha específica por índice
- Flexibilidade para editar qualquer linha

### Tags aplicadas
- `@listagem-vinculo-fiscal` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### VinculoFiscalListagemPage

**Navegação:**
- `visit()` - Acessa listagem via menu lateral e valida título "Listagem"

**Ações:**
- `novoCadastro()` - Clica em botão "Novo Cadastro"
- `selecionarTodosRegistros()` - Marca checkbox "selecionar todos"
- `excluirSelecionados()` - Clica em botão excluir selecionados
- `confirmarExclusao()` - Confirma exclusão no modal
- `editarLinha(index)` - Edita linha específica por índice

**Métodos adicionais disponíveis (não usados no teste atual):**
- `pesquisar(codigo, descricao)` - Realiza pesquisa com filtros
- `verificarModalVisivel()` - Verifica modal de confirmação
- `tabelaVisivel()` - Verifica tabela visível
- `tabelaContemLinhas(qtd)` - Valida quantidade de linhas
- `validarAlerta()` - Valida toast de alerta
- `verificarTabelaVazia()` - Verifica tabela vazia
- `verificarQuantidadeLinhasTabela(qtd)` - Verifica quantidade de linhas
- `verificarLinhaContemTexto(index, texto)` - Verifica conteúdo da linha

---

## Locators utilizados

### VinculoFiscalListagemLocators

**Botões:**
- `btnNovoCadastro` - Botão novo cadastro
- `btnExcluirSelecionados` - Botão excluir selecionados
- `botaoConfirmarExclusao` - Botão confirmar exclusão
- `botaoEditar` - Botão editar

**Campos (não usados no teste atual):**
- `campoCodigo` - Campo código
- `campoDescricao` - Campo descrição
- `btnPesquisar` - Botão pesquisar

**Elementos:**
- `checkboxTodos` - Checkbox selecionar todos
- `modalConfirmacao` - Modal de confirmação
- `tabelaVinculos` - Tabela de vínculos
- `linhasTabela` - Linhas da tabela
- `toastAlert` - Toast de alerta

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-novocadastrovinculofiscal.md` - Documentação de cadastro
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste de exclusão usa waits longos (pode indicar necessidade de otimização)
- Validação de redirecionamento para edição
- Seleção em massa para exclusão
- Page Object possui métodos adicionais para funcionalidades futuras

---

**Última atualização:** 2024-12-19

