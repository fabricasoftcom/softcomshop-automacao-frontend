# Arquitetura dos casos de teste: Listagem de Justificativas

## Objetivo

Validar a funcionalidade de listagem de justificativas, incluindo:
- Exibição da tabela com dados
- Pesquisa por descrição
- Navegação para cadastro e edição

**Funcionalidades cobertas:**
- Visualização da listagem de justificativas
- Formulário de pesquisa
- Navegação para novo cadastro
- Navegação para edição

**Cenários principais:**
- Validação de tabela carregada
- Abertura do formulário de pesquisa
- Pesquisa por descrição
- Navegação para novo cadastro
- Navegação para edição

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/justificativa-listagem.spec.js` - Testes de listagem de justificativas

### Page Objects
- `cypress/support/pages/Configuracoes/JustificativaListagemPage.js` - Métodos de interação com a listagem

### Locators
- `cypress/support/locators/Configuracoes/JustificativaListagemLocators.js` - Seletores da listagem

---

## Imports e dependências

### Page Objects
```javascript
import JustificativaListagemPage from '../../support/pages/Configuracoes/JustificativaListagemPage';
import JustificativaListagemLocators from '../../support/locators/Configuracoes/JustificativaListagemLocators';
```

### Locators
- `JustificativaListagemLocators` - Contém todos os seletores da listagem (tabela, botões, formulário de pesquisa)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

---

## Estrutura do teste

### Suite: Listagem de justificativas

**Tags:** `['@configuracoes', '@justificativa', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Executa `JustificativaListagemPage.acessarTelaListagem()`

#### `it('exibe a listagem e permite abrir o formulario de filtros')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela está visível e carregada
   - Valida que há linhas na tabela

2. **Abertura do formulário de pesquisa:**
   - Abre o formulário de pesquisa usando o toggle
   - Valida que o formulário está visível

#### `it('aplica filtro por descricao e valida resultado')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche o campo de pesquisa com uma descrição existente
   - Submete a pesquisa

2. **Validação:**
   - Valida que o resultado contém a descrição pesquisada

#### `it('navega para novo cadastro ao clicar no botao Novo Cadastro')`

**Fluxo completo:**
1. **Navegação:**
   - Clica no botão "Novo Cadastro"

2. **Validação:**
   - Valida que a URL contém `/configuracao/tipo-justificativa/novo`

#### `it('abre a edicao do primeiro registro da listagem')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela está carregada

2. **Navegação:**
   - Clica no link de edição da primeira linha

3. **Validação:**
   - Valida que a URL corresponde ao padrão de edição (`/configuracao/tipo-justificativa/{id}/editar`)

---

## Padrões e boas práticas

- **Page Object Pattern (ADR-0002):** Todos os métodos de interação estão encapsulados na classe `JustificativaListagemPage`
- **Separate Locators (ADR-0003):** Todos os seletores estão centralizados em `JustificativaListagemLocators`
- **Prioritize IDs and Context (ADR-0015):** Locators priorizam IDs quando disponíveis
- **No fixed waits:** Usa validações condicionais ao invés de `cy.wait()` fixo
- **Tags for filtering (ADR-0010):** Tags aplicadas para permitir execução seletiva

---

## Referências

### ADRs relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-justificativa-cadastro.md` - Cadastro de justificativa (listagem permite acesso ao cadastro)

