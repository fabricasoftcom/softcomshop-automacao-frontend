# Arquitetura dos casos de teste: Listagem de Empresas

## Objetivo

Validar a funcionalidade de listagem de empresas, incluindo:
- Exibição da tabela com dados
- Abertura e uso do formulário de pesquisa/filtros
- Seleção de registros via checkboxes
- Funcionalidade de exclusão (com validações)

**Funcionalidades cobertas:**
- Listagem de empresas em tabela
- Formulário de pesquisa/filtros (CPF/CNPJ, Unidade, Fantasia, Razão Social)
- Seleção múltipla de registros
- Exclusão de registros selecionados
- Validação de exclusão sem seleção

**Cenários principais:**
- Exibição da listagem e abertura do formulário de filtros
- Validação de paginação inicial
- Navegação para novo cadastro
- Aplicação de filtro por nome e limpeza do campo
- Aplicação de filtros por CNPJ, Fantasia e Razão Social
- Abertura e fechamento do formulário de pesquisa
- Limpeza de todos os campos do formulário de pesquisa
- Seleção e desmarcação de todos os checkboxes
- Alerta ao tentar excluir sem selecionar registros
- Abertura e cancelamento do modal de exclusão
- Abertura da edição de empresa existente

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/empresa-listagem.spec.js` - Testes de listagem de empresas

### Page Objects
- `cypress/support/pages/Empresa/EmpresaListagemPage.js` - Métodos de interação com a listagem

### Locators
- `cypress/support/locators/Empresa/EmpresaListagemLocators.js` - Seletores da tela de listagem
- `cypress/support/locators/Empresa/EmpresaLocators.js` - Seletores genéricos (modais, etc)

---

## Imports e dependências

### Page Objects
```javascript
import EmpresaListagemPage from '../../support/pages/Empresa/EmpresaListagemPage';
import EmpresaListagemLocators from '../../support/locators/Empresa/EmpresaListagemLocators';
```

### Locators
- `EmpresaListagemLocators` - Contém todos os seletores da listagem (tabela, botões, formulário de pesquisa)
- `EmpresaLocators` - Contém seletores genéricos (modal de confirmação de exclusão)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralConfiguracoesPage.acessarListagemEmpresas()` - Navegação via menu Configurações > Empresa

---

## Estrutura do teste

### Suite: Listagem de empresas

**Tags:** `['@configuracoes', '@empresa', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Chama `EmpresaListagemPage.acessarTelaListagem()` para navegar até a listagem

#### `it('exibe a listagem e permite abrir o formulario de filtros')`

**Fluxo completo:**
1. **Validação da tabela:**
   - Valida que a tabela foi carregada com dados
   - Valida paginação inicial (página 1)
   - Abre o formulário de pesquisa

2. **Validação do formulário:**
   - Verifica que o formulário de pesquisa está visível

#### `it('valida paginacao inicial da listagem')`

**Fluxo completo:**
1. **Validação:**
   - Valida que a tabela foi carregada com dados
   - Valida que a paginação está na página 1

#### `it('navega para novo cadastro ao clicar no botao Novo Cadastro')`

**Fluxo completo:**
1. **Navegação:**
   - Clica no botão "Novo Cadastro"
   - Valida que a URL contém `/cadastro/empresa/novo`

#### `it('aplica filtro por nome e limpa o campo apos a pesquisa')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche o filtro de nome com "SOFTCOM"
   - Submete a pesquisa
   - Valida que o resultado contém o nome pesquisado

2. **Limpeza:**
   - Limpa o campo de filtro
   - Valida que o campo está vazio

#### `it('seleciona e limpa todos os checkboxes da tabela')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona todas as empresas usando o checkbox principal
   - Valida que todos os checkboxes estão marcados

2. **Desmarcação:**
   - Desmarca todas as empresas
   - Valida que todos os checkboxes estão desmarcados

#### `it('alerta quando tentar excluir sem selecionar registros')`

**Fluxo completo:**
1. **Tentativa de exclusão:**
   - Clica no botão "Excluir Selecionados" sem selecionar nenhum registro
   - Valida que aparece um alerta de aviso
   - Confirma o alerta

#### `it('abre o modal de exclusao ao selecionar registros e cancela a acao')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona a primeira empresa da tabela

2. **Modal de exclusão:**
   - Abre o modal de exclusão
   - Cancela a ação
   - Valida que o modal foi fechado

#### `it('abre e fecha o formulario de pesquisa corretamente')`

**Fluxo completo:**
1. **Abertura:**
   - Abre o formulário de pesquisa
   - Valida que o formulário está visível

2. **Fechamento:**
   - Fecha o formulário de pesquisa
   - Valida que o formulário não está visível

3. **Reabertura:**
   - Abre novamente o formulário
   - Valida que funciona corretamente

#### `it('aplica filtro por CNPJ e valida resultado')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche o filtro de CNPJ
   - Submete a pesquisa
   - Valida que o resultado contém o CNPJ pesquisado

#### `it('aplica filtro por Fantasia e valida resultado')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche o filtro de Fantasia
   - Submete a pesquisa
   - Valida que o resultado contém a Fantasia pesquisada

#### `it('aplica filtro por Razao Social e valida resultado')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche o filtro de Razão Social
   - Submete a pesquisa
   - Valida que o resultado contém a Razão Social pesquisada

#### `it('limpa todos os campos do formulario de pesquisa')`

**Fluxo completo:**
1. **Preenchimento:**
   - Preenche alguns filtros (Nome, CNPJ)

2. **Limpeza:**
   - Limpa todos os campos do formulário
   - Valida que todos os campos estão vazios

#### `it('abre a edicao do primeiro registro da listagem')`

**Fluxo completo:**
1. **Validação:**
   - Valida que a tabela foi carregada com dados

2. **Edição:**
   - Clica no link de edição da primeira empresa
   - Valida que a URL corresponde ao padrão de edição (`/cadastro/empresa/\d+/editar`)

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `EmpresaListagemPage`
- O spec apenas chama os métodos do Page Object, sem seletores diretos

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `EmpresaListagemLocators`
- Uso de IDs quando disponíveis (ADR-0015)
- Seletores com contexto apropriado (formulário, tabela)

### Session Persistence (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não fiscais
- Sessão é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@configuracoes`, `@empresa`, `@listagem`, `@regressivo`
- Permite execução seletiva: `npm run e2e -- --grep "@empresa"`

### Validações Condicionais
- Verificação de visibilidade do formulário antes de tentar abrir
- Uso de `.then()` para verificar estado antes de interagir

---

## Referências

### ADRs relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-empresa-cadastro.md` - Cadastro de empresa (listagem permite acesso ao cadastro)

---

## Observações

- O formulário de pesquisa é inicialmente oculto e é exibido ao clicar no ícone de pesquisa
- A tabela permite ordenação por todas as colunas (crescente/decrescente)
- Os links de edição estão presentes em todas as células da linha (não apenas no ícone de lápis)
- O checkbox principal (`check_all`) seleciona/deseleciona todos os registros da página atual

