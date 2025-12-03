# Arquitetura dos casos de teste: Menu Lateral

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Menu Lateral**, que valida a navegação e acessibilidade de todos os menus e submenus do sistema.

**Funcionalidades cobertas:**
- Validação de menus principais
- Validação de submenus
- Validação de submenus aninhados (childMenu)
- Validação de rotas após navegação
- Validação de erros 500 visuais

**Cenários principais:**
- Validar todos os menus, submenus e submenus aninhados definidos no fixture
- Validar rotas após cada navegação
- Verificar erros 500 visuais após cada navegação

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/menulateral/menuLateralTeste.spec.js` - Teste de validação do menu lateral

### Page Objects
- `cypress/support/pages/Menu/MenuPage.js` - Métodos para interação com menu

### Fixtures
- `cypress/fixtures/menuOptions.json` - Lista de menus, submenus e rotas para validação

### Commands
- `cypress/support/commands.js` - Comandos customizados (`cy.loginRestoreSession()`, `cy.verificarErro500Visual()`)

---

## Imports e dependências

### Page Objects
```javascript
import MenuPage from '../../support/pages/Menu/MenuPage';
```

### Fixtures
```javascript
cy.fixture('menuOptions').then((data) => {
  menuOptions = data;
});
```

### Commands
- `cy.loginRestoreSession()` - Restaura sessão de login
- `cy.visit('/')` - Navegação para página inicial
- `cy.verificarErro500Visual()` - Verifica erros 500 visuais

---

## Estrutura do teste

### Suite: Validação do Menu Lateral do Softcomshop

**Tags:** `['@menu-lateral', '@regressivo']` (ADR-0010)

#### Hook Before

**Fluxo:**
1. Carrega fixture `menuOptions.json`
2. Visita página inicial (`/`)

#### `it('Deve validar os menus e submenus')`

**Fluxo iterativo:**
- Itera sobre cada opção do fixture `menuOptions`
- Para cada opção, determina o tipo de navegação:
  - **Menu com childMenu:** Menu > SubMenu > ChildMenu
  - **Menu com subMenu:** Menu > SubMenu
  - **Menu simples:** Menu

**Para cada tipo:**

1. **Menu com childMenu:**
   - Log: `Acessando menu: ${mainMenu} > ${subMenu} > ${childMenu}`
   - Clica em menu aninhado: `MenuPage.clickNestedSubMenu()`
   - Valida rota: `MenuPage.validateRoute()`
   - Verifica erro 500: `cy.verificarErro500Visual()`

2. **Menu com subMenu:**
   - Log: `Acessando menu: ${mainMenu} > ${subMenu}`
   - Restaura sessão: `cy.loginRestoreSession()`
   - Visita página inicial: `cy.visit('/')`
   - Clica em menu principal: `MenuPage.clickMainMenu()`
   - Clica em submenu: `MenuPage.clickSubMenu()`
   - Valida rota: `MenuPage.validateRoute()`
   - Verifica erro 500: `cy.verificarErro500Visual()`

3. **Menu simples:**
   - Log: `Acessando menu: ${mainMenu}`
   - Restaura sessão: `cy.loginRestoreSession()`
   - Visita página inicial: `cy.visit('/')`
   - Clica em menu principal: `MenuPage.clickMainMenu()`
   - Valida rota: `MenuPage.validateRoute()`
   - Verifica erro 500: `cy.verificarErro500Visual()`

---

## Padrões e boas práticas

### Teste Iterativo Dinâmico
- Uso de `cy.wrap().each()` para iterar sobre opções do fixture
- Teste único que valida múltiplos cenários
- Logs informativos para cada iteração

### Uso de Fixtures
- Lista de menus centralizada em `menuOptions.json`
- Fácil manutenção e adição de novos menus
- Estrutura flexível (menu, subMenu, childMenu, route)

### Restauração de Sessão
- Uso de `cy.loginRestoreSession()` antes de cada navegação
- Garante que usuário está logado
- Visita página inicial antes de cada navegação

### Validação de Rotas
- Validação de URL após cada navegação
- Garante que rota correta foi acessada

### Validação de Erros
- Verificação de erros 500 visuais após cada navegação
- Garante que página carregou sem erros críticos

### Seletores Flexíveis
- Suporte a ID, texto ou XPath para seletores
- Flexibilidade para diferentes tipos de elementos

### Tags aplicadas
- `@menu-lateral` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### MenuPage

**Utilitários:**
- `waitForAppReady()` - Aguarda aplicação estar pronta (verifica `#loading-indicator`)

**Clicar em menus:**
- `clickMenu(menu)` - Clica em qualquer menu (suporta ID, texto ou XPath)
- `clickMainMenu(menu)` - Clica em menu principal
- `clickSubMenu(menu)` - Clica em submenu
- `clickNestedSubMenu(menu, subMenu, childMenu)` - Clica em menu aninhado
  - Aguarda app estar pronto
  - Clica em menu principal
  - Clica em submenu
  - Clica em childMenu (se fornecido)

**Validações:**
- `validateRoute(expectedUrl)` - Valida que URL contém rota esperada

---

## Estrutura de Fixture

### menuOptions.json

```json
[
  {
    "mainMenu": {
      "text": "Tá em ordem"
    },
    "route": "/ta-em-ordem"
  },
  {
    "mainMenu": {
      "text": "Compras e Estoque"
    },
    "subMenu": {
      "id": "fornecedor"
    },
    "route": "/cadastro/fornecedor"
  },
  {
    "mainMenu": {
      "text": "Compras e Estoque"
    },
    "subMenu": {
      "id": "produtos"
    },
    "childMenu": {
      "id": "atributos"
    },
    "route": "/produto/atributo"
  }
]
```

**Estrutura:**
- `mainMenu` - Menu principal (obrigatório)
  - `id` - ID do elemento
  - `text` - Texto do elemento
  - `xpath` - XPath do elemento
- `subMenu` - Submenu (opcional)
  - `id`, `text` ou `xpath`
- `childMenu` - Submenu aninhado (opcional)
  - `id`, `text` ou `xpath`
- `route` - Rota esperada após navegação (obrigatório)

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Teste iterativo que valida todos os menus do fixture
- Restaura sessão antes de cada navegação para garantir login
- Validação de rotas garante navegação correta
- Verificação de erros 500 garante que páginas carregaram sem erros
- Suporte a seletores flexíveis (ID, texto, XPath)
- Fixture centralizado facilita manutenção

---

## Fluxo de Validação

```
Carregar fixture menuOptions
    ↓
Para cada opção:
    ↓
Determinar tipo (menu simples, com subMenu, com childMenu)
    ↓
Restaurar sessão (se necessário)
    ↓
Clicar em menus conforme tipo
    ↓
Validar rota
    ↓
Verificar erro 500
```

---

**Última atualização:** 2024-12-19

