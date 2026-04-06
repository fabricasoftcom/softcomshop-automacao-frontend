# Arquitetura dos casos de teste: Cadastro de Mensagens (Venda Mais)

## Objetivo

Validar a funcionalidade de cadastro de mensagens do menu Venda Mais (Configuração), incluindo:
- Exibição do layout básico do formulário
- Preenchimento e salvamento com assunto, título e mensagem
- Validação de campos obrigatórios
- Navegação e botão Voltar

**Funcionalidades cobertas:**
- Cadastro de nova mensagem (campos Assunto, Título, Mensagem; Canal e Tipo como select)
- Validação de campos obrigatórios
- Navegação para listagem e botão Voltar

**Cenários principais:**
- Validação de layout básico (botões e campos)
- Cadastro com assunto, título e mensagem
- Validação de campos obrigatórios
- Teste de botão Voltar

**Observação sobre locators:** Os seletores em `MensagemCadastroLocator.js` foram definidos com IDs/contexto plausíveis (assunto, titulo, mensagem, canal, tipo, btn-salvar). Devem ser **validados no DOM real** em `/configuracao/mensagem` e `/configuracao/mensagem/novo` conforme ADR-0015 (explorar tela antes de implementação).

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/configuracao/cadastro-mensagem.spec.js` - Testes de cadastro de mensagem (Venda Mais)

### Page Objects
- `cypress/support/pages/MensagemCadastroPage.js` - Métodos de interação com o formulário de cadastro e navegação

### Locators
- `cypress/support/locators/MensagemCadastroLocator.js` - Seletores do formulário de cadastro (validar no DOM após exploração)

---

## Imports e dependências

### Page Objects
```javascript
import MensagemCadastroPage from '../../support/pages/MensagemCadastroPage';
```

### Locators
- `MensagemCadastroLocator` - Contém todos os seletores do formulário (campos Assunto, Título, Mensagem, Canal, Tipo, botões, toasts)

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação inicial

---

## Estrutura do teste

### Suite: Cadastro de Mensagens

**Tags:** `['@venda-mais', '@mensagem', '@configuracao', '@regressivo']` (ADR-0010)

**beforeEach:**
- Executa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Executa `cy.visit('/')`

#### `it('deve exibir os elementos principais do formulário de cadastro')`

**Fluxo:**
1. Acesso: `MensagemCadastroPage.visit()` (visita `/configuracao/mensagem/novo`)
2. Validação de layout: título, botões Voltar e Salvar, campos Assunto e Título visíveis

#### `it('deve realizar cadastro de mensagem com assunto, título e mensagem')`

**Fluxo:**
1. Acesso: `MensagemCadastroPage.visit()`
2. Preenchimento: assunto, titulo e mensagem com dados dinâmicos (timestamp)
3. Salvamento: `MensagemCadastroPage.salvar()`
4. Validação: toast de sucesso

#### `it('deve exibir erro ao tentar salvar sem preencher campos obrigatórios')`

**Fluxo:**
1. Acesso: `MensagemCadastroPage.visit()`
2. Tentativa de salvamento sem preencher campos
3. Validação: toast de erro exibido

#### `it('deve retornar para listagem ao clicar em Voltar')`

**Fluxo:**
1. Acesso: `MensagemCadastroPage.visit()`
2. Clique em Voltar
3. Validação: URL inclui `/configuracao/mensagem` e não inclui `/novo`

---

## Padrões e boas práticas

- **Page Object Pattern (ADR-0002):** Interações encapsuladas em `MensagemCadastroPage`
- **Separate Locators (ADR-0003):** Seletores em `MensagemCadastroLocator.js`
- **Prioritize IDs and Context (ADR-0015):** Locators com IDs quando disponíveis; validar no DOM após exploração da tela
- **No fixed waits:** Uso de validações condicionais (`.should('be.visible')`)
- **Tags for filtering (ADR-0010):** Tags `@venda-mais`, `@mensagem`, `@configuracao`, `@regressivo`

---

## Referências

### ADRs relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação relacionada
- Cenários gerados pelo AI Toolkit: `ai-reports/scenarios-venda-mais-mensagem.md`
- Regras de negócio: `ai-toolkit/inputs/regras-venda-mais-mensagem.md`
