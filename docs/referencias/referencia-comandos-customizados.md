# 📚 Referência de Comandos Customizados do Cypress

**Versão:** 1.0  
**Data:** 2024-12-19  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este documento lista todos os comandos customizados disponíveis no projeto, suas funcionalidades, quando usar e exemplos de uso.

**Localização:** `cypress/support/commands.js`

**Total de comandos:** 12 comandos customizados

---

## 🔐 Comandos de Autenticação (4 comandos)

### `cy.login()`

**Descrição:** Realiza login com usuário fiscal e armazena a sessão usando `cy.session()`.

**Quando usar:**
- ✅ **Funcionalidades fiscais** (NFe, NFCe, SPED, Sintegra)
- ✅ Requer usuário com permissões fiscais

**Usuário utilizado:** `user.validFiscal` (do fixture `users.json`)

**ADR relacionada:** [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md)

**Exemplo:**
```javascript
describe('Cadastro NFe', () => {
  beforeEach(() => {
    cy.login(); // ✅ Correto para funcionalidades fiscais
    cy.visit('/');
  });
});
```

**Implementação:**
- Usa `cy.session('user_session', ...)` para cache de sessão
- Valida login com presença de "Início" na página
- Reutiliza sessão quando válida

---

### `cy.loginArmazenandoSessao()`

**Descrição:** Realiza login com usuário padrão e armazena a sessão usando `cy.session()`.

**Quando usar:**
- ✅ **Maioria das funcionalidades** (exceto fiscais)
- ✅ Funcionalidades gerais do sistema

**Usuário utilizado:** `user.valid` (do fixture `users.json`)

**ADR relacionada:** [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md)

**Exemplo:**
```javascript
describe('Cadastro de Cliente', () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ✅ Correto para funcionalidades não-fiscais
    cy.visit('/');
  });
});
```

**Implementação:**
- Usa `cy.session('user_session', ...)` para cache de sessão
- Valida login com presença de "Início" na página
- Reutiliza sessão quando válida

---

### `cy.loginRestoreSession()`

**Descrição:** Realiza login com usuário padrão, armazena a sessão e trata SweetAlert se presente.

**Quando usar:**
- ✅ **Testes iterativos** que precisam restaurar sessão a cada iteração
- ✅ Quando há SweetAlert que pode aparecer após login
- ✅ Usado em loops (`cy.wrap().each()`) onde a sessão pode expirar

**Usuário utilizado:** `user.valid` (do fixture `users.json`)

**Diferença para `loginArmazenandoSessao()`:**
- Trata SweetAlert automaticamente após login
- Útil em testes iterativos onde a sessão pode precisar ser restaurada

**Exemplo:**
```javascript
describe('Menu Lateral', () => {
  it('Deve validar os menus', () => {
    cy.wrap(menuOptions).each((option) => {
      cy.loginRestoreSession(); // Restaura sessão a cada iteração
      cy.visit('/');
      // ... ações do teste
    });
  });
});
```

**Uso atual:** Usado em `menuLateralTeste.spec.js` para restaurar sessão em cada iteração do loop.

---

### `cy.loginArmazenandoSessaoCobranca()`

**Descrição:** Realiza login com usuário de API de Cobrança e armazena a sessão.

**Quando usar:**
- ✅ **Funcionalidades de cobrança** que requerem usuário específico
- ✅ Testes que precisam de permissões de API de Cobrança

**Usuário utilizado:** `user.validApiCobranca` (do fixture `users.json`)

**Exemplo:**
```javascript
describe('Testes de Cobrança', () => {
  beforeEach(() => {
    cy.loginArmazenandoSessaoCobranca(); // Usuário específico para cobrança
    cy.visit('/');
  });
});
```

---

## ✅ Comandos de Validação (1 comando)

### `cy.verificarErro500Visual()`

**Descrição:** Verifica visualmente se ocorreu um erro 500 na interface, procurando por imagem de erro e mensagem específica.

**Quando usar:**
- ✅ Após requisições que podem retornar erro 500
- ✅ Em testes iterativos (ex: `cy.wrap().each()`)
- ✅ Quando não é possível interceptar o erro 500

**O que verifica:**
- Presença de `img.error-image`
- Mensagem "Oops! Parece que algo deu errado" no elemento `.error-message h1`

**Comportamento:**
- Lança exceção se erro 500 for detectado
- Não faz nada se não houver erro

**Exemplo:**
```javascript
describe('Relatórios', () => {
  it('Deve validar os relatórios', () => {
    cy.wrap(relatoriosList).each((option) => {
      // ... ações do teste
      cy.verificarErro500Visual(); // Verifica erro após cada iteração
    });
  });
});
```

**Uso comum:**
- Testes iterativos com `cy.wrap().each()`
- Validações após navegação
- Quando intercepts não capturam erros visuais

---

## 🧭 Comandos de Navegação de Menu (3 comandos)

### `cy.clicarMenu(opcaoClick)`

**Descrição:** Clica em uma opção do menu lateral pelo texto.

**Quando usar:**
- ✅ Navegação simples para menus de primeiro nível
- ✅ Quando não há submenus

**Parâmetros:**
- `opcaoClick` (string): Texto da opção do menu a ser clicada

**Exemplo:**
```javascript
cy.clicarMenu('Clientes');
cy.clicarMenu('Produtos');
```

**Implementação:**
- Usa `cy.get('span').contains(opcaoClick).click({ force: true })`

---

### `cy.expandirClicarMenuUmNivel(menu, opcaoClick)`

**Descrição:** Expande um menu e clica em uma opção de submenu (um nível).

**Quando usar:**
- ✅ Navegação para menus com submenus
- ✅ Quando há apenas um nível de submenu

**Parâmetros:**
- `menu` (string): Texto do menu principal
- `opcaoClick` (string): Seletor CSS da opção de submenu

**Exemplo:**
```javascript
cy.expandirClicarMenuUmNivel('Configurações', '#módulos');
cy.expandirClicarMenuUmNivel('Financeiro', '#contas-a-pagar');
```

**Implementação:**
1. Clica no menu principal (`a[href="#"]` contendo o texto)
2. Clica na opção de submenu (usando seletor CSS)

---

### `cy.expandirClicarMenuDoisNiveis(menu, submenu1, opcaoClick)`

**Descrição:** Expande um menu, expande um submenu e clica em uma opção do segundo nível.

**Quando usar:**
- ✅ Navegação para menus com dois níveis de submenus
- ✅ Quando há hierarquia de menu → submenu → opção

**Parâmetros:**
- `menu` (string): Texto do menu principal
- `submenu1` (string): Seletor CSS do primeiro submenu
- `opcaoClick` (string): Seletor CSS da opção final

**Exemplo:**
```javascript
cy.expandirClicarMenuDoisNiveis('Financeiro', '#submenu-contas', '#contas-corrente');
```

**Status:** ⚠️ **Não está sendo usado** - Nenhum spec utiliza este comando atualmente. Considerar remover se não for necessário.

---

## 💾 Comandos de Cadastro (1 comando)

### `cy.salvarRegistroCadsatro()`

**Descrição:** Clica no botão "Salvar" e valida mensagem de sucesso no toast.

**Quando usar:**
- ⚠️ **Não está sendo usado** - Nenhum spec utiliza este comando atualmente

**O que faz:**
1. Clica no botão `#btn-salvar`
2. Valida presença de "Sucesso" no `#toast-container`

**Exemplo:**
```javascript
cy.salvarRegistroCadsatro(); // Salva e valida toast
```

**Nota:** 
- ⚠️ **Status:** Não está sendo usado em nenhum spec
- Há um typo no nome: "Cadsatro" deveria ser "Cadastro"
- **Recomendação:** Considerar remover ou substituir por métodos de Page Objects específicos

---

## ⚙️ Comandos de Setup do Sistema (2 comandos)

### `cy.setupSistemaPadrao()`

**Descrição:** Configura o sistema com módulos padrão (PADRÃO) e ativa/desativa módulos específicos.

**Quando usar:**
- ✅ No `before()` ou `beforeAll()` de suites que precisam de configuração específica
- ✅ Testes que requerem módulos específicos ativados

**O que configura:**
- Segmento: PADRÃO
- Módulos ativados: Venda, NFe, SPED, Compra, Nuvem Fiscal, Movimentação, Orçamento, Sintegra, Cobrança, NFSe, Notificação
- Módulos desativados: MDfe, Consignação, Integração Marketplace, Tanomenu, Formação de Preço

**Fluxo:**
1. Realiza login
2. Visita página inicial
3. Trata SweetAlert se presente
4. Navega para Configurações → Módulos
5. Seleciona segmento PADRÃO
6. Ativa/desativa módulos conforme necessário
7. Salva configurações
8. Faz logout

**Exemplo:**
```javascript
describe('Testes que precisam de módulos específicos', () => {
  before(() => {
    cy.setupSistemaPadrao(); // Configura sistema antes dos testes
  });
  
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });
});
```

**Nota:** Este comando faz logout ao final. Garantir que testes subsequentes façam login novamente.

---

### `cy.setupSistemaPetshop()`

**Descrição:** Configura o sistema com segmento PETSHOP.

**Quando usar:**
- ✅ No `before()` ou `beforeAll()` de suites relacionadas a petshop
- ✅ Testes do Painel de Atendimento

**O que configura:**
- Segmento: PETSHOP

**Fluxo:**
1. Realiza login
2. Visita página inicial
3. Trata SweetAlert se presente
4. Navega para Configurações → Módulos
5. Seleciona segmento PETSHOP
6. Salva configurações

**Exemplo:**
```javascript
describe('Painel de Atendimento', () => {
  before(() => {
    cy.setupSistemaPetshop(); // Configura sistema para petshop
  });
  
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    PainelAtendimentoPage.visit();
  });
});
```

---

## 📊 Resumo por Categoria

| Categoria | Comandos | Total |
|-----------|----------|-------|
| Autenticação | `login`, `loginArmazenandoSessao`, `loginRestoreSession`, `loginArmazenandoSessaoCobranca` | 4 |
| Validação | `verificarErro500Visual` | 1 |
| Navegação | `clicarMenu`, `expandirClicarMenuUmNivel`, `expandirClicarMenuDoisNiveis` | 3 |
| Cadastro | `salvarRegistroCadsatro` | 1 |
| Setup | `setupSistemaPadrao`, `setupSistemaPetshop` | 2 |
| **Total** | | **12** |

---

## 🔍 Análise de Uso

### Comandos Mais Utilizados

1. **`cy.loginArmazenandoSessao()`** - Usado em ~50 specs (maioria das funcionalidades)
2. **`cy.login()`** - Usado em ~15 specs (funcionalidades fiscais)
3. **`cy.verificarErro500Visual()`** - Usado em ~10 specs (validações iterativas)
4. **`cy.setupSistemaPadrao()`** - Usado em 1 spec (setup inicial)
5. **`cy.setupSistemaPetshop()`** - Usado em 1 spec (painel de atendimento)

### Comandos com Uso Limitado ou Não Utilizados

- **`cy.loginRestoreSession()`** - ✅ Usado em `menuLateralTeste.spec.js` (testes iterativos)
- **`cy.salvarRegistroCadsatro()`** - ⚠️ **Não está sendo usado** - Considerar remover
- **`cy.expandirClicarMenuDoisNiveis()`** - ⚠️ **Não está sendo usado** - Considerar remover

---

## ⚠️ Observações e Melhorias Sugeridas

### Problemas Identificados

1. **Typo no nome:**
   - `salvarRegistroCadsatro` → deveria ser `salvarRegistroCadastro`

2. **Comandos possivelmente não utilizados:**
   - `cy.loginRestoreSession()` - Verificar uso
   - `cy.salvarRegistroCadsatro()` - Verificar uso
   - `cy.expandirClicarMenuDoisNiveis()` - Verificar uso

3. **Duplicação potencial:**
   - `loginRestoreSession()` e `loginArmazenandoSessao()` são muito similares
   - Considerar consolidar se `loginRestoreSession()` não for mais necessário

### Melhorias Sugeridas

1. **Remover comandos não utilizados:**
   - ⚠️ `salvarRegistroCadsatro()` - Não está sendo usado
   - ⚠️ `expandirClicarMenuDoisNiveis()` - Não está sendo usado

2. **Renomear comando (se mantido):**
   - `salvarRegistroCadsatro` → `salvarRegistroCadastro` (corrigir typo)

3. **Documentar melhor:**
   - Adicionar JSDoc aos comandos
   - Especificar tipos de parâmetros
   - Documentar quando usar cada comando de login

4. **Criar comandos adicionais (se necessário):**
   - Comando para tratar SweetAlert de forma genérica
   - Comando para aguardar loading desaparecer

---

## 📝 Guia de Uso Rápido

### Para Funcionalidades Fiscais
```javascript
cy.login(); // Usuário fiscal
```

### Para Funcionalidades Gerais
```javascript
cy.loginArmazenandoSessao(); // Usuário padrão
```

### Para Funcionalidades de Cobrança
```javascript
cy.loginArmazenandoSessaoCobranca(); // Usuário API Cobrança
```

### Para Validação de Erro 500
```javascript
cy.verificarErro500Visual(); // Após ações que podem falhar
```

### Para Navegação de Menu
```javascript
cy.clicarMenu('Clientes'); // Menu simples
cy.expandirClicarMenuUmNivel('Configurações', '#módulos'); // Menu com submenu
```

### Para Setup do Sistema
```javascript
cy.setupSistemaPadrao(); // Antes de testes que precisam de módulos específicos
cy.setupSistemaPetshop(); // Antes de testes de petshop
```

---

## 🔗 Referências

- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [Cypress Custom Commands](https://on.cypress.io/custom-commands)
- `cypress/support/commands.js` - Implementação dos comandos
- `cypress/fixtures/users.json` - Usuários disponíveis

---

**Última atualização:** 2024-12-19  
**Mantido por:** Equipe de Automação

