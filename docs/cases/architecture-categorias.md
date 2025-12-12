# Arquitetura dos casos de teste: Categorias Financeiro

## Objetivo

Validar o fluxo completo de gerenciamento de categorias financeiras (Receita e Despesa), incluindo:
- Listagem de categorias com filtros (Todas, Ativas, Inativas)
- Cadastro de novas categorias de receita e despesa
- Validação de formulário de cadastro com campos obrigatórios e opcionais
- Ações em massa (Ativar/Desativar) por tipo de categoria

**Funcionalidades cobertas:**
- Listagem de categorias de receita e despesa
- Filtros de status (Todas, Ativas, Inativas)
- Cadastro de categoria de receita
- Cadastro de categoria de despesa
- Validação de mensagens de sucesso

**Cenários principais:**
- Visualização da página de listagem
- Abertura de modais de cadastro
- Cadastro com descrição apenas
- Cadastro com todos os campos
- Cancelamento de cadastro

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/listagem-categorias.spec.js` - Testes de listagem, filtros e navegação
- `cypress/e2e/financeiro/cadastro-categoria.spec.js` - Testes de cadastro de categorias (receita e despesa)

### Page Objects
- `cypress/support/pages/Financeiro/ListagemCategoriasPage.js` - Métodos de listagem, filtros e ações em massa
- `cypress/support/pages/Financeiro/CadastroCategoriaPage.js` - Métodos de preenchimento e submissão do formulário

### Locators
- `cypress/support/locators/CategoriasLocators.js` - Seletores da página de listagem, modal e formulário

---

## Imports e dependências

### Page Objects
```javascript
import ListagemCategoriasPage from "../../support/pages/Financeiro/ListagemCategoriasPage";
import CadastroCategoriaPage from "../../support/pages/Financeiro/CadastroCategoriaPage";
```

### Locators
```javascript
import CategoriasLocators from "../../locators/CategoriasLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login para funcionalidades não-fiscais (ADR-0004)
- `cy.visit("/")` - Navegação inicial

### Menu Lateral
- `MenulateralFinanceiroPage.acessarCategorias()` - Navegação até a página de categorias via menu Financeiro

---

## Estrutura do teste

### Suite: Testes de Listagem de Categorias

**Tags:** `['@listagem-categorias', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a página de listagem de categorias corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - `cy.loginArmazenandoSessao()` e `cy.visit("/")`
   - `ListagemCategoriasPage.visit()` navega até a página via menu

2. **Validação:**
   - `ListagemCategoriasPage.verificarCarregamentoDaPagina()` valida título da página
   - `ListagemCategoriasPage.verificarSecaoReceitaVisivel()` valida seção de receita
   - `ListagemCategoriasPage.verificarSecaoDespesaVisivel()` valida seção de despesa
   - `ListagemCategoriasPage.verificarBotaoNovaCategoriaReceitaVisivel()` valida botão de nova receita
   - `ListagemCategoriasPage.verificarBotaoNovaCategoriaDespesaVisivel()` valida botão de nova despesa

#### `it('Deve abrir modal de nova categoria de receita')`

**Fluxo:**
1. `ListagemCategoriasPage.abrirModalNovaCategoriaReceita()` clica no botão e valida modal visível

#### `it('Deve filtrar categorias de receita por "Todas/Ativas/Inativas"')`

**Fluxo:**
1. `ListagemCategoriasPage.filtrarReceitaTodas()` / `filtrarReceitaAtivas()` / `filtrarReceitaInativas()` aplica filtro

### Suite: Cadastro de Categorias

**Tags:** `['@cadastro-categoria', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve cadastrar uma nova categoria de receita com descrição apenas')`

**Fluxo completo:**
1. **Acesso:**
   - `cy.loginArmazenandoSessao()` e `cy.visit("/")`
   - `ListagemCategoriasPage.visit()` navega até a página

2. **Abertura do Modal:**
   - `ListagemCategoriasPage.abrirModalNovaCategoriaReceita()` abre modal
   - `CadastroCategoriaPage.verificarModalVisivel()` valida modal
   - `CadastroCategoriaPage.verificarTituloModal('Nova categoria de Receita')` valida título

3. **Preenchimento:**
   - Gera descrição única com timestamp
   - `CadastroCategoriaPage.preencherDescricao(descricao)` preenche campo obrigatório

4. **Submissão:**
   - `CadastroCategoriaPage.clicarSalvar()` submete formulário
   - Aguarda `#loading` desaparecer

5. **Validação:**
   - `CadastroCategoriaPage.verificarMensagemSucesso()` valida mensagem de sucesso
   - `ListagemCategoriasPage.verificarCarregamentoDaPagina()` valida retorno à listagem

#### `it('Deve cadastrar uma nova categoria de despesa com descrição apenas')`

**Fluxo:** Similar ao anterior, mas usando `abrirModalNovaCategoriaDespesa()` e validando título "Nova categoria de Despesa"

#### `it('Deve cadastrar uma nova categoria de receita com todos os campos')`

**Fluxo:**
1. Abre modal de receita
2. Usa `CadastroCategoriaPage.preencherFormulario(dados)` com objeto contendo:
   - `descricao`: obrigatório
   - `mostrarDentroDe`: opcional (categoria pai)
   - `contaDRE`: opcional
   - `naoExibirDRE`: boolean opcional
3. Submete e valida sucesso

#### `it('Deve cadastrar uma nova categoria de despesa com checkbox "Não Exibir DRE" marcado')`

**Fluxo:** Similar ao anterior, mas com `naoExibirDRE: true` no objeto de dados

#### `it('Deve cancelar o cadastro clicando em Voltar')`

**Fluxo:**
1. Abre modal
2. `CadastroCategoriaPage.clicarVoltar()` cancela
3. Valida que modal foi fechado e listagem está visível

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os seletores estão centralizados em `CategoriasLocators.js`
- Interações com UI encapsuladas em Page Objects
- Métodos com nomes descritivos e verbos de ação

### Locators (ADR-0003, ADR-0015)
- Priorização de IDs quando disponíveis (`#button-revenue-todas`, `#autocomplete_category`)
- Uso de contexto para modais (`.modal.in`)
- Seletores específicos e validados durante exploração

### Login (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não-fiscais
- Session persistence via `cy.session()` (gerenciado pelo comando customizado)

### Tags (ADR-0010)
- Tags aplicadas em `describe` para filtragem
- Padrão: `['@funcionalidade', '@modulo', '@regressivo']`

### Validações
- Aguardo de `#loading` desaparecer após ações
- Validação de mensagens de sucesso com timeout adequado
- Validação de elementos visíveis antes de interagir

### Autocompletes
- Aguardo de opções aparecerem antes de selecionar
- Uso de `.first().click()` para selecionar primeira opção quando aplicável
- Suporte a diferentes estruturas de autocomplete (`.soft-select__option`, `.typeahead-result`)

---

## Observações importantes

1. **IDs Dinâmicos**: O campo Descrição tem ID dinâmico baseado em timestamp. O locator usa seletor genérico (`.modal input.form-control[type="text"]:first`)

2. **Estrutura Hierárquica**: As categorias são exibidas em árvore, mas os testes atuais focam em cadastro e listagem básica

3. **Separação por Tipo**: A página tem duas seções distintas (Receita e Despesa), cada uma com seus próprios filtros e botões

4. **Formulário Compartilhado**: O formulário de cadastro é o mesmo para Receita e Despesa, apenas o título do modal muda

5. **Campos Opcionais**: Os campos "Mostrar dentro de" e "Conta do DRE" são opcionais e podem ser preenchidos via autocomplete

---

## Referências

- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

