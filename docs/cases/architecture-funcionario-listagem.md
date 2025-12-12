# Arquitetura dos casos de teste: Listagem de Funcionários

## Objetivo

Validar a funcionalidade de listagem de funcionários, incluindo:
- Exibição da tabela com dados
- Abertura e uso do formulário de pesquisa/filtros
- Seleção de registros via checkboxes
- Funcionalidade de exclusão (com validações)

**Funcionalidades cobertas:**
- Listagem de funcionários em tabela
- Formulário de pesquisa/filtros (Código, Nome)
- Seleção múltipla de registros
- Exclusão de registros selecionados
- Validação de exclusão sem seleção

**Cenários principais:**
- Exibição da listagem e abertura do formulário de filtros
- Validação de paginação inicial
- Navegação para novo cadastro
- Aplicação de filtro por nome e limpeza do campo
- Aplicação de filtro por código
- Abertura e fechamento do formulário de pesquisa
- Seleção e desmarcação de todos os checkboxes
- Alerta ao tentar excluir sem selecionar registros
- Abertura e cancelamento do modal de exclusão

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/funcionario-listagem.spec.js` - Testes de listagem de funcionários

### Page Objects
- `cypress/support/pages/Funcionario/FuncionarioListagemPage.js` - Métodos de interação com a listagem

### Locators
- `cypress/support/locators/Funcionario/FuncionarioListagemLocators.js` - Seletores da tela de listagem
- `cypress/support/locators/Funcionario/FuncionarioLocators.js` - Seletores genéricos (modais, etc)

---

## Imports e dependências

### Page Objects
```javascript
import FuncionarioListagemPage from '../../support/pages/Funcionario/FuncionarioListagemPage';
import FuncionarioListagemLocators from '../../support/locators/Funcionario/FuncionarioListagemLocators';
```

### Locators
- `FuncionarioListagemLocators` - Contém todos os seletores da listagem (tabela, botões, formulário de pesquisa)
- `FuncionarioLocators` - Contém seletores genéricos (modal de confirmação de exclusão)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralConfiguracoesPage.acessarListagemFuncionarios()` - Navegação via menu Configurações > Funcionários

---

## Estrutura do teste

### Suite: Listagem de funcionários

**Tags:** `['@configuracoes', '@funcionario', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`
- Chama `FuncionarioListagemPage.acessarTelaListagem()` para navegar até a listagem

#### `it('exibe a listagem e permite abrir o formulario de filtros')`

**Fluxo completo:**
1. **Validação de tabela:**
   - Valida que a tabela foi carregada com dados
   - Valida paginação inicial (página 1)

2. **Abertura do formulário:**
   - Abre o formulário de pesquisa (toggle)
   - Valida que o formulário está visível

#### `it('aplica filtro por nome e limpa o campo apos a pesquisa')`

**Fluxo completo:**
1. **Pesquisa:**
   - Preenche filtro por nome
   - Submete a pesquisa
   - Valida resultado

2. **Limpeza:**
   - Limpa o campo de filtro
   - Valida que o campo está vazio

#### `it('seleciona e limpa todos os checkboxes da tabela')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona todos os funcionários via checkbox principal
   - Valida que todos os checkboxes estão marcados

2. **Desmarcação:**
   - Desmarca todos os funcionários
   - Valida que todos os checkboxes estão desmarcados

#### `it('alerta quando tentar excluir sem selecionar registros')`

**Fluxo completo:**
1. **Tentativa de exclusão:**
   - Clica em "Excluir Selecionados" sem selecionar nenhum registro
   - Valida que aparece alerta de aviso

#### `it('abre o modal de exclusao ao selecionar registros e cancela a acao')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona o primeiro funcionário

2. **Modal:**
   - Abre o modal de exclusão
   - Cancela a ação
   - Valida que o modal foi fechado

#### `it('valida paginacao inicial da listagem')`

**Fluxo completo:**
1. **Validação:**
   - Valida que a tabela foi carregada
   - Valida que a paginação inicial está na página 1

#### `it('navega para novo cadastro ao clicar no botao Novo Cadastro')`

**Fluxo completo:**
1. **Navegação:**
   - Clica no botão "Novo Cadastro"
   - Valida que a URL inclui `/cadastro/funcionario/novo`

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
   - Captura o código do primeiro funcionário da tabela

2. **Pesquisa:**
   - Preenche filtro por código
   - Submete a pesquisa
   - Valida que resultados foram retornados

---

## Padrões e boas práticas

### ADR-0002: Page Object Pattern
- ✅ Todos os métodos de interação estão encapsulados em `FuncionarioListagemPage`
- ✅ Specs não contêm seletores CSS/XPath diretamente

### ADR-0003: Separate Locators
- ✅ Todos os seletores estão centralizados em `FuncionarioListagemLocators`
- ✅ Locators compartilhados (modais) estão em `FuncionarioLocators`

### ADR-0004: Session Persistence
- ✅ Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)

### ADR-0007: Separate Specs
- ✅ Spec separado para listagem (`funcionario-listagem.spec.js`)

### ADR-0010: Tags for Test Filtering
- ✅ Tags aplicadas: `['@configuracoes', '@funcionario', '@listagem', '@regressivo']`

### ADR-0015: Prioritize IDs and Context
- ✅ Locators priorizam IDs quando disponíveis
- ✅ Locators usam contexto quando necessário (ex: `.modal #elemento`)

---

## Observações importantes

1. **Formulário de pesquisa:** É um toggle - verificar se está visível antes de interagir
2. **Links de edição:** Todos os elementos da linha são clicáveis e levam à edição
3. **Modal de exclusão:** Usa SweetAlert padrão do sistema
4. **Paginação:** Pode não aparecer se houver poucos registros

