# Arquitetura dos casos de teste: Listagem de Usuários

## Objetivo

Validar a funcionalidade de listagem de usuários, incluindo:
- Exibição da tabela com dados
- Abertura e uso do formulário de pesquisa/filtros
- Seleção de registros via checkboxes
- Funcionalidade de exclusão (com validações)

**Funcionalidades cobertas:**
- Listagem de usuários em tabela
- Formulário de pesquisa/filtros (Código, Nome, Email)
- Seleção múltipla de registros
- Exclusão de registros selecionados
- Validação de exclusão sem seleção

**Cenários principais:**
- Exibição da listagem e abertura do formulário de filtros
- Navegação para novo cadastro via URL direta
- Aplicação de filtro por nome e limpeza do campo
- Aplicação de filtro por código
- Abertura e fechamento do formulário de pesquisa
- Seleção e desmarcação de todos os checkboxes
- Alerta ao tentar excluir sem selecionar registros
- Abertura e cancelamento do modal de exclusão

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/usuario-listagem.spec.js` - Testes de listagem de usuários

### Page Objects
- `cypress/support/pages/Usuario/UsuarioListagemPage.js` - Métodos de interação com a listagem

### Locators
- `cypress/support/locators/Usuario/UsuarioListagemLocators.js` - Seletores da tela de listagem
- `cypress/support/locators/Usuario/UsuarioLocators.js` - Seletores genéricos (modais, etc)

---

## Imports e dependências

### Page Objects
```javascript
import UsuarioListagemPage from '../../support/pages/Usuario/UsuarioListagemPage';
import UsuarioListagemLocators from '../../support/locators/Usuario/UsuarioListagemLocators';
```

### Locators
- `UsuarioListagemLocators` - Contém todos os seletores da listagem (tabela, botões, formulário de pesquisa)
- `UsuarioLocators` - Contém seletores genéricos (modal de confirmação de exclusão)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralConfiguracoesPage.acessarListagemUsuarios()` - Navegação via menu Configurações > Autenticação > Usuários

---

## Estrutura do teste

### Suite: Listagem de usuários

**Tags:** `['@configuracoes', '@usuario', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Chama `UsuarioListagemPage.acessarTelaListagem()` para navegar até a listagem

#### `it('exibe a listagem e permite abrir o formulario de filtros')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada com dados

2. **Abertura do formulário:**
   - Abre o formulário de pesquisa (toggle)
   - Valida que o formulário está visível

#### `it('aplica filtro por nome e limpa o campo apos a pesquisa')`

**Fluxo completo:**
1. **Extração:**
   - Captura o nome do primeiro usuário da tabela

2. **Pesquisa:**
   - Preenche filtro por nome
   - Submete a pesquisa
   - Valida resultado

3. **Limpeza:**
   - Limpa o campo de filtro
   - Valida que o campo está vazio

#### `it('seleciona e limpa todos os checkboxes da tabela')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona todos os usuários via checkbox principal
   - Valida que todos os checkboxes estão marcados

2. **Desmarcação:**
   - Desmarca todos os usuários
   - Valida que todos os checkboxes estão desmarcados

#### `it('alerta quando tentar excluir sem selecionar registros')`

**Fluxo completo:**
1. **Tentativa de exclusão:**
   - Clica em "Excluir Selecionados" sem selecionar nenhum registro
   - Valida que aparece alerta de aviso

#### `it('abre o modal de exclusao ao selecionar registros e cancela a acao')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona o primeiro usuário

2. **Modal:**
   - Abre o modal de exclusão
   - Cancela a ação
   - Valida que o modal foi fechado

#### `it('navega para novo cadastro ao acessar URL direta')`

**Fluxo completo:**
1. **Navegação:**
   - Acessa URL direta `/autenticacao/usuario/novo`
   - Valida que a URL está correta

#### `it('abre e fecha o formulario de pesquisa corretamente')`

**Fluxo completo:**
1. **Toggle:**
   - Fecha o formulário se estiver aberto
   - Abre o formulário
   - Valida que está visível
   - Fecha o formulário
   - Valida que não está visível
   - Abre novamente para confirmar

#### `it('aplica filtro por codigo e valida resultado')`

**Fluxo completo:**
1. **Extração:**
   - Captura o código do primeiro usuário da tabela

2. **Pesquisa:**
   - Preenche filtro por código
   - Submete a pesquisa
   - Valida que resultados foram retornados

---

## Padrões e boas práticas

### ADR-0002: Page Object Pattern
- ✅ Todos os métodos de interação estão encapsulados em `UsuarioListagemPage`
- ✅ Specs não contêm seletores CSS/XPath diretamente

### ADR-0003: Separate Locators
- ✅ Todos os seletores estão centralizados em `UsuarioListagemLocators`
- ✅ Locators compartilhados (modais) estão em `UsuarioLocators`

### ADR-0004: Session Persistence
- ✅ Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)

### ADR-0007: Separate Specs
- ✅ Spec separado para listagem (`usuario-listagem.spec.js`)

### ADR-0010: Tags for Test Filtering
- ✅ Tags aplicadas: `['@configuracoes', '@usuario', '@listagem', '@regressivo']`

### ADR-0015: Prioritize IDs and Context
- ✅ Locators priorizam IDs quando disponíveis (ex: `#btn-excluir-selecionados`, `#id`, `#name`, `#email`)
- ✅ Locators usam contexto quando necessário (ex: `#694001aa31a79 tbody tr`)

---

## Observações importantes

1. **Formulário de pesquisa:** É um toggle - verificar se está visível antes de interagir
2. **Links de edição:** Todos os elementos da linha são clicáveis e levam à edição (`/autenticacao/usuario/{id}/editar`)
3. **Modal de exclusão:** Usa SweetAlert padrão do sistema
4. **URL de cadastro:** A URL direta para novo cadastro é `/autenticacao/usuario/novo` (não usar o botão "Cadastrar Funcionário" que redireciona para outra tela)
5. **Filtros disponíveis:** Código, Nome e Email

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-usuario-cadastro.md` - Cadastro de usuário (listagem permite acesso ao cadastro)

