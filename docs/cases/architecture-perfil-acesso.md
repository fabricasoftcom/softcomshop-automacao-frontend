# Arquitetura dos casos de teste: Listagem de Perfis de Acesso

## Objetivo

Validar a funcionalidade de listagem de perfis de acesso, incluindo:
- Exibição da tabela com dados
- Abertura e uso do formulário de pesquisa/filtros
- Seleção de registros via checkboxes
- Funcionalidade de exclusão (com validações)
- Navegação para edição, permissões e clonagem

**Funcionalidades cobertas:**
- Listagem de perfis de acesso em tabela
- Formulário de pesquisa/filtros (Nome)
- Seleção múltipla de registros
- Exclusão de registros selecionados
- Validação de exclusão sem seleção
- Navegação para edição de perfil
- Navegação para configuração de permissões
- Navegação para clonagem de perfil
- Navegação para novo cadastro

**Cenários principais:**
- Exibição da listagem e validação de elementos
- Abertura e fechamento do formulário de pesquisa
- Aplicação de filtro por nome e limpeza do campo
- Seleção e desmarcação de todos os checkboxes
- Alerta ao tentar excluir sem selecionar registros
- Abertura da edição de perfil existente
- Navegação para novo cadastro

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracoes/perfil-acesso.spec.js` - Testes de listagem de perfis de acesso

### Page Objects
- `cypress/support/pages/Configuracoes/PerfilAcessoPage.js` - Métodos de interação com a listagem

### Locators
- `cypress/support/locators/Configuracoes/PerfilAcessoLocators.js` - Seletores da tela de listagem

### Menu Navigation
- `cypress/support/pages/menulateral/menulateralconfiguracoespage.js` - Navegação via menu Configurações > Autenticação > Perfis de Acesso

---

## Imports e dependências

### Page Objects
```javascript
import PerfilAcessoPage from '../../support/pages/Configuracoes/PerfilAcessoPage';
import PerfilAcessoLocators from '../../support/locators/Configuracoes/PerfilAcessoLocators';
```

### Locators
- `PerfilAcessoLocators` - Contém todos os seletores da listagem (tabela, botões, formulário de pesquisa, checkboxes, links de ação)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

### Menu Navigation
- `MenulateralConfiguracoesPage.acessarListagemPerfisAcesso()` - Navegação via menu Configurações > Autenticação > Perfis de Acesso

---

## Estrutura do teste

### Suite: Listagem de Perfis de Acesso

**Tags:** `['@configuracoes', '@perfil-acesso', '@listagem', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir a tela de listagem corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Chama `PerfilAcessoPage.acessarTelaListagem()` para navegar até a listagem
   - Valida que a URL contém `/autenticacao/perfil/inicio`
   - Valida que a tela foi carregada corretamente

2. **Validações:**
   - Valida que o botão "Perfil" está visível e habilitado
   - Valida que o botão "Excluir Selecionados" está visível
   - Valida que a tabela foi carregada com dados

#### `it('deve abrir e fechar o formulário de pesquisa corretamente')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de listagem

2. **Fechamento inicial:**
   - Fecha o formulário se estiver aberto

3. **Abertura:**
   - Abre o formulário de pesquisa
   - Valida que o formulário está visível

4. **Fechamento:**
   - Fecha o formulário de pesquisa
   - Valida que o formulário não está visível

5. **Reabertura:**
   - Abre novamente o formulário
   - Valida que funciona corretamente

#### `it('deve aplicar filtro por nome e limpar o campo após a pesquisa')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de listagem

2. **Captura de dados:**
   - Captura o nome do primeiro perfil da tabela (coluna índice 3)

3. **Pesquisa:**
   - Preenche o filtro de nome
   - Submete a pesquisa
   - Valida que pelo menos uma linha foi retornada

4. **Limpeza:**
   - Limpa o campo de filtro
   - Valida que o campo está vazio

#### `it('deve selecionar e limpar todos os checkboxes da tabela')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona todos os perfis usando o checkbox principal
   - Valida que todos os checkboxes estão marcados

2. **Desmarcação:**
   - Desmarca todos os perfis
   - Valida que todos os checkboxes estão desmarcados

#### `it('deve alertar quando tentar excluir sem selecionar registros')`

**Fluxo completo:**
1. **Tentativa de exclusão:**
   - Clica no botão "Excluir Selecionados" sem selecionar nenhum registro
   - Valida que aparece um alerta de aviso
   - Confirma o alerta

#### `it('deve validar que existe link de edição na primeira linha da tabela')`

**Fluxo completo:**
1. **Validação:**
   - Valida que a tabela foi carregada com dados

2. **Validação de links:**
   - Valida que existe link de edição na primeira linha com href correto (`/editar/\d+`)
   - Valida que existe link de permissões na primeira linha com href correto (`/permissoes/`)
   - Valida que existe link de clonar na primeira linha com href correto (`/clonar/`)

#### `it('deve navegar para novo cadastro ao clicar no botão Perfil')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa a tela de listagem

2. **Navegação:**
   - Clica no botão "Perfil"
   - Aguarda redirecionamento ou abertura de modal
   - Valida que algo aconteceu (pode ser modal ou nova página)

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `PerfilAcessoPage`
- O spec apenas chama os métodos do Page Object, sem seletores diretos
- Métodos de validação separados por responsabilidade

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `PerfilAcessoLocators`
- Uso de IDs quando disponíveis (ADR-0015)
- Seletores com contexto apropriado (tabela, formulário)
- IDs únicos encontrados: `#btn-perfil`, `#btn-excluir-selecionados`, `#btn-pesquisa`, `#form-search-perfil`, `#role_title`, `#pesquisar`, `#table-form-body`

### Session Persistence (ADR-0004)
- Uso de `cy.loginArmazenandoSessao()` para funcionalidades não fiscais
- Sessão é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@configuracoes`, `@perfil-acesso`, `@listagem`, `@regressivo`
- Permite execução seletiva: `npm run e2e -- --grep "@perfil-acesso"`

### Validações Condicionais
- Verificação de visibilidade do formulário antes de tentar abrir
- Uso de `.then()` para verificar estado antes de interagir
- Uso de intercepts para aguardar requisições de pesquisa

---

## Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- `docs/cases/architecture-perfil-acesso-cadastro.md` - Cadastro de perfil de acesso (listagem permite acesso ao cadastro)

---

## Observações

- A tabela possui ID dinâmico (`#6953beb8b17a9`), por isso os seletores usam `#content-layout table` ou `#table-form-body` como contexto
- O tbody da tabela possui ID único: `#table-form-body`
- Os links de ação (editar, permissões, clonar) não possuem IDs, usando seletores por href com contexto da linha
- O checkbox principal usa `name="simplecheck[]"` com contexto do thead
- O formulário de pesquisa pode estar oculto inicialmente e é exibido ao clicar no link `#btn-pesquisa`
- A tabela permite ordenação por Código e Nome (links crescente/decrescente)
- Os links de ação estão presentes em todas as linhas (editar, permissões, clonar)
- O checkbox principal (`simplecheck[]`) seleciona/deseleciona todos os registros da página atual

