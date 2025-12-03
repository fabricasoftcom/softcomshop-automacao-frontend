# Arquitetura dos casos de teste: Login

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Login**, que valida o processo de autenticação no sistema.

**Funcionalidades cobertas:**
- Login com credenciais válidas
- Validação de redirecionamento após login bem-sucedido
- Login com credenciais inválidas (teste comentado)

**Cenários principais:**
- Realizar login com credenciais válidas e validar redirecionamento para `/home`

**Nota:** O teste de login com credenciais inválidas está comentado, indicando que pode estar em desenvolvimento.

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/login/login.spec.js` - Teste de login

### Page Objects
- `cypress/support/pages/Login/LoginPage.js` - Métodos para login

### Locators
- `cypress/support/locators/LoginLocators.js` - Seletores da página de login

### Fixtures
- `cypress/fixtures/users.json` - Credenciais de usuários (usuário válido)

---

## Imports e dependências

### Page Objects
```javascript
import LoginPage from "../../support/pages/Login/LoginPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import LoginLocators from "../../locators/LoginLocators";
```

### Fixtures
```javascript
cy.fixture('users').then((user) => {
  // user.valid.username
  // user.valid.password
});
```

### Commands
- Não usa `cy.loginArmazenandoSessao()` pois este teste valida o próprio login

---

## Estrutura do teste

### Suite: Login com credenciais válidas

**Tags:** `['@login', '@regressivo']` (ADR-0010)

#### `it.only('Login deve ser realizado com sucesso usando credenciais validas')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de login via `LoginPage.visit()` (visita `/auth/logout`)

2. **Preenchimento:**
   - Carrega fixture `users.json`
   - Preenche credenciais (username e password) do usuário válido
   - Captura snapshot com Percy

3. **Login:**
   - Clica em botão de login

4. **Validação:**
   - Valida que URL inclui `/home`
   - Comentário indica possível seleção de empresa (comentado)

---

### Suite: Login com credenciais inválidas (Comentado)

**Tags:** Não aplicadas (suite comentada)

#### `it('Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas')`

**Status:** Teste vazio/comentado - não implementado

---

## Padrões e boas práticas

### Uso de Fixtures
- Credenciais armazenadas em `cypress/fixtures/users.json`
- Separação de dados de teste do código
- Estrutura: `user.valid.username` e `user.valid.password`

### Validação de Redirecionamento
- Validação de URL após login bem-sucedido
- Uso de `cy.url().should('include', '/home')`

### Captura de Snapshot
- Uso de `cy.percySnapshot()` para captura visual
- Integração com Percy para testes visuais

### Teste Isolado
- Uso de `it.only` para executar apenas este teste
- Não usa `cy.loginArmazenandoSessao()` pois testa o próprio login

### Tags aplicadas
- `@login` - Identifica funcionalidade específica
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### LoginPage

**Navegação:**
- `visit()` - Acessa página de login (visita `/auth/logout`)

**Preenchimento:**
- `preencherCredenciais(username, password)` - Preenche username e password
  - Captura snapshot com Percy
  - Limpa campos antes de preencher

**Ações:**
- `clicarLogin()` - Clica no botão de login

**Validações:**
- `mensagemErro()` - Retorna elemento de mensagem de erro (não usado no teste atual)

---

## Locators utilizados

### LoginLocators

**Campos:**
- `usernameInput` - Campo username (#login-email)
- `passwordInput` - Campo password (#login-senha)

**Botões:**
- `loginButton` - Botão de login (#login-acessar)

**Mensagens:**
- `errorMessage` - Mensagem de erro (#login-erro)

---

## Estrutura de Fixture

### users.json

```json
{
  "valid": {
    "username": "usuario@exemplo.com",
    "password": "senha123"
  },
  "invalid": {
    "username": "usuario_invalido@exemplo.com",
    "password": "senha_errada"
  }
}
```

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

- O teste usa `it.only` para executar apenas este teste
- Não usa `cy.loginArmazenandoSessao()` pois testa o próprio processo de login
- Teste de credenciais inválidas está comentado/vazio
- Captura snapshot com Percy para testes visuais
- Comentário indica possível seleção de empresa após login (não implementado)

---

## Fluxo de Login

```
Acessar /auth/logout
    ↓
Preencher credenciais (fixture)
    ↓
Clicar em Login
    ↓
Validar redirecionamento para /home
    ↓
(Comentado) Selecionar empresa
```

---

**Última atualização:** 2024-12-19

