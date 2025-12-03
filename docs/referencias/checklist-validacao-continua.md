# ✅ Checklist de Validação Contínua

**Versão:** 1.0  
**Data:** 2024-12-19  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este checklist deve ser usado durante o **code review** de novos testes ou modificações em testes existentes para garantir conformidade contínua com as Architecture Decision Records (ADRs) do projeto.

**Quando usar:**
- Ao revisar Pull Requests com novos testes
- Ao revisar modificações em testes existentes
- Durante desenvolvimento para auto-validação
- Em revisões periódicas do código

---

## 🎯 Checklist por ADR

### ADR-0002: Page Object Pattern

- [ ] **Teste usa Page Objects?**
  - [ ] Não há seletores CSS/XPath diretamente no spec
  - [ ] Interações com a UI estão encapsuladas em métodos de Page Objects
  - [ ] Page Objects estão em `cypress/support/pages/`

- [ ] **Page Objects seguem padrão?**
  - [ ] Nome da classe em PascalCase
  - [ ] Métodos com nomes descritivos (verbos)
  - [ ] Métodos retornam `this` ou são `void` quando apropriado

**Exemplo de conformidade:**
```javascript
// ✅ Correto
import ClientePage from '../../support/pages/Cliente/ClientePage';
ClientePage.preencherCamposCliente(dados);

// ❌ Incorreto
cy.get('#nome').type('João');
cy.get('#email').type('joao@email.com');
```

---

### ADR-0003: Separate Locators

- [ ] **Locators estão separados?**
  - [ ] Seletores não estão hardcoded no Page Object
  - [ ] Locators estão em arquivos separados em `cypress/support/locators/`
  - [ ] Locators são importados no Page Object

- [ ] **Locators seguem padrão?**
  - [ ] Nome do arquivo em PascalCase (ex: `ClienteLocators.js`)
  - [ ] Exportação como objeto ou constante
  - [ ] Seletores organizados logicamente

**Exemplo de conformidade:**
```javascript
// ✅ Correto
import ClienteLocators from '../../locators/Cliente/CadastroClienteLocators';
cy.get(ClienteLocators.inputNome).type('João');

// ❌ Incorreto
cy.get('#nome').type('João');
```

---

### ADR-0004: Session Persistence

- [ ] **Comando de login correto?**
  - [ ] **Funcionalidades fiscais** (NFe, NFCe, SPED, Sintegra): usa `cy.login()`
  - [ ] **Outras funcionalidades**: usa `cy.loginArmazenandoSessao()`
  - [ ] Não usa `cy.login()` para funcionalidades não-fiscais
  - [ ] Não usa `cy.loginArmazenandoSessao()` para funcionalidades fiscais

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Funcionalidade fiscal
describe('Cadastro NFe', () => {
  beforeEach(() => {
    cy.login(); // ✅ Correto para NFe
    cy.visit('/');
  });
});

// ✅ Correto - Funcionalidade não-fiscal
describe('Cadastro Cliente', () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ✅ Correto para cliente
    cy.visit('/');
  });
});
```

**Funcionalidades fiscais que devem usar `cy.login()`:**
- NFe (cadastro, cancelamento, carta de correção)
- NFCe
- SPED
- Sintegra

---

### ADR-0005: Allure Reporting

- [ ] **Allure configurado?**
  - [ ] Teste usa `cy.allure()` quando apropriado para anotações
  - [ ] Descrições de testes são claras (aparecem no relatório)
  - [ ] Screenshots são capturados automaticamente em falhas

**Nota:** O Allure é configurado globalmente, mas pode ser usado para anotações específicas quando necessário.

---

### ADR-0006: Mandatory Documentation

- [ ] **Documentação criada?**
  - [ ] Arquivo `docs/cases/architecture-<nome>.md` criado
  - [ ] Documentação segue o template em `processo-documentacao.md`
  - [ ] Todas as seções obrigatórias preenchidas:
    - [ ] Objetivo
    - [ ] Estrutura de arquivos
    - [ ] Imports e dependências
    - [ ] Estrutura do teste
    - [ ] Padrões e boas práticas
    - [ ] Referências (ADRs)

- [ ] **Documentação atualizada?**
  - [ ] `docs/cases/README.md` atualizado
  - [ ] `docs/testes.md` atualizado (se necessário)
  - [ ] `cypress.config.js` atualizado (se novo spec)

**Exceções:**
- Specs que são variações claras de outros já documentados podem compartilhar documentação
- Specs muito simples podem ter documentação simplificada (mas ainda devem ter)

---

### ADR-0007: Separate Specs by Functionality and Type

- [ ] **Specs organizados corretamente?**
  - [ ] Spec está no diretório correto por módulo/funcionalidade
  - [ ] Nome do arquivo segue padrão: `[funcionalidade].spec.js`
  - [ ] Spec está registrado no `specPattern` de `cypress.config.js`
  - [ ] Spec está na posição correta no `specPattern` (ordem lógica)

**Estrutura esperada:**
```
cypress/e2e/
├── financeiro/
│   ├── novaDespesa.spec.js
│   └── baixar-despesa.spec.js
├── venda-nfcenfe/
│   ├── cadastro-nfe-normal.spec.js
│   └── cancelamento-nfe-normal.spec.js
```

---

### ADR-0008: Page Object Hierarchy

- [ ] **Hierarquia aplicada quando necessário?**
  - [ ] Módulos com múltiplas variações usam hierarquia?
  - [ ] Classe base contém métodos comuns
  - [ ] Classes específicas estendem ou usam classe base
  - [ ] Facade pattern usado quando apropriado (ex: `index.js`)

**Quando usar:**
- Módulos com múltiplas variações (ex: NFe Normal com tipos Avulsa, Venda, NFCe, Movimentação)
- Quando há muita duplicação de código entre Page Objects similares

**Exemplo:**
```javascript
// ✅ Correto - Hierarquia
cypress/support/pages/Venda/NFe/Normal/
├── CadastroNfeNormalBasePage.js
├── CadastroNfeNormalAvulsaPage.js
├── CadastroNfeNormalVendaPage.js
└── index.js (facade)
```

---

### ADR-0009: Faker for Dynamic Data

- [ ] **Faker usado para dados dinâmicos?**
  - [ ] Dados aleatórios são gerados usando Faker
  - [ ] Funções de geração estão em `cypress/support/factory/`
  - [ ] Não há dados hardcoded que deveriam ser aleatórios
  - [ ] Funções locais de geração de dados são evitadas (preferir Faker)

**Exemplo de conformidade:**
```javascript
// ✅ Correto
import { generateRandomCustomer } from '../../support/factory/generateRandomData';
const cliente = generateRandomCustomer();
ClientePage.preencherCamposCliente(cliente);

// ⚠️ Aceitável (mas preferir Faker)
function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * 1000);
}

// ❌ Evitar
const nome = 'Cliente Teste ' + Date.now();
```

**Nota:** Funções locais simples são aceitáveis, mas Faker é preferido para consistência.

---

### ADR-0010: Tags for Test Filtering

- [ ] **Tags presentes?**
  - [ ] `describe` tem objeto `{ tags: [...] }` como segundo parâmetro
  - [ ] Tags seguem padrão: `['@modulo', '@tipo', '@regressivo']`
  - [ ] Pelo menos uma tag de módulo presente
  - [ ] Tag `@regressivo` presente para testes de regressão

- [ ] **Tags corretas?**
  - [ ] Tag de módulo corresponde ao módulo testado
  - [ ] Tags são consistentes com outros specs do mesmo módulo
  - [ ] Tags específicas adicionadas quando apropriado

**Exemplo de conformidade:**
```javascript
// ✅ Correto
describe('Cadastro de Cliente', { tags: ['@clientes', '@cadastro-cliente', '@regressivo'] }, () => {
  // ...
});

// ❌ Incorreto
describe('Cadastro de Cliente', () => {
  // Sem tags
});
```

**Padrão de tags:**
- `@modulo`: módulo principal (ex: `@financeiro`, `@vendas`, `@clientes`)
- `@tipo`: tipo de teste (ex: `@cadastro-cliente`, `@listagem-produtos`)
- `@regressivo`: para testes de regressão
- Tags específicas quando necessário (ex: `@nfe-normal`, `@dropdown-acoes`)

---

### ADR-0011: Conditional Intercepts

- [ ] **Intercepts condicionais quando necessário?**
  - [ ] Intercepts que podem não ocorrer usam lógica condicional
  - [ ] Flags ou middleware usados para controlar intercepts
  - [ ] Não há timeouts desnecessários por intercepts não ocorridos

**Quando usar:**
- Requisições que podem ou não ocorrer dependendo do fluxo
- Requisições que podem já ter sido feitas antes do intercept ser configurado
- Requisições que podem ser feitas múltiplas vezes

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Intercept condicional
cy.intercept('POST', '**/nfe2/**/itens/salvar', (req) => {
  if (req.body && !req.body.processado) {
    req.reply({ fixture: 'item-salvo.json' });
  }
}).as('salvarItem');

// ⚠️ Aceitável - Intercept simples (se sempre ocorre)
cy.intercept('GET', '**/clientes**').as('buscarClientes');
cy.wait('@buscarClientes');
```

---

## 📝 Checklist Geral

### Estrutura do Teste

- [ ] **Hooks corretos?**
  - [ ] `beforeEach` usado para login e navegação inicial
  - [ ] `cy.visit('/')` presente após login
  - [ ] `before` usado apenas quando necessário (setup compartilhado)
  - [ ] `afterEach` usado apenas quando necessário (limpeza)

- [ ] **Organização do código?**
  - [ ] Imports organizados (Page Objects, Locators, Factories, Commands)
  - [ ] Testes seguem padrão: navegação → preenchimento → validação
  - [ ] Código está limpo e legível

### Validações

- [ ] **Assertions adequadas?**
  - [ ] Validações de toasts/mensagens de sucesso
  - [ ] Validações de estados do DOM quando necessário
  - [ ] Validações de URL quando apropriado
  - [ ] Validações de dados quando necessário

- [ ] **Aguardos corretos?**
  - [ ] `cy.wait()` usado apenas quando necessário
  - [ ] Aguardos de loading (`#loading`) quando apropriado
  - [ ] Aguardos de intercepts quando necessário
  - [ ] Não há `cy.wait()` com valores fixos altos desnecessários

### Boas Práticas

- [ ] **Tratamento de erros?**
  - [ ] `cy.verificarErro500Visual()` usado quando apropriado
  - [ ] Tratamento de modais/alerts quando necessário
  - [ ] Tratamento de SweetAlert quando necessário

- [ ] **Dados de teste?**
  - [ ] Fixtures usadas para dados estáticos
  - [ ] Faker usado para dados dinâmicos
  - [ ] Dados de teste são realistas

---

## 🔍 Checklist de Code Review

### Antes de Aprovar

- [ ] Todas as ADRs relevantes validadas
- [ ] Teste executa com sucesso localmente
- [ ] Teste não introduz flakiness
- [ ] Documentação criada/atualizada (se novo teste)
- [ ] `specPattern` atualizado (se novo teste)
- [ ] Tags presentes e corretas
- [ ] Comando de login correto para o tipo de funcionalidade
- [ ] Page Objects e Locators seguem padrões
- [ ] Código está limpo e legível

### Red Flags (Requer Atenção)

- ⚠️ **Sem tags** - Bloqueador
- ⚠️ **Comando de login incorreto** - Bloqueador
- ⚠️ **Seletores hardcoded no spec** - Bloqueador
- ⚠️ **Sem documentação para novo teste** - Bloqueador
- ⚠️ **Teste não registrado no specPattern** - Bloqueador
- ⚠️ **Dados hardcoded que deveriam ser dinâmicos** - Atenção
- ⚠️ **Intercepts sem lógica condicional quando necessário** - Atenção
- ⚠️ **Waits fixos altos desnecessários** - Atenção

---

## 📊 Template de Revisão

### Para Pull Requests

```markdown
## ✅ Checklist de Validação

### ADRs
- [ ] ADR-0002: Page Object Pattern
- [ ] ADR-0003: Separate Locators
- [ ] ADR-0004: Session Persistence
- [ ] ADR-0005: Allure Reporting
- [ ] ADR-0006: Mandatory Documentation
- [ ] ADR-0007: Separate Specs
- [ ] ADR-0008: Page Object Hierarchy (se aplicável)
- [ ] ADR-0009: Faker for Dynamic Data
- [ ] ADR-0010: Tags for Filtering
- [ ] ADR-0011: Conditional Intercepts

### Geral
- [ ] Estrutura do teste correta
- [ ] Validações adequadas
- [ ] Boas práticas seguidas

### Observações
[Adicionar observações específicas aqui]
```

---

## 🔗 Referências

- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0005](../adr/0005-use-allure-for-test-reporting.md): Allure Reporting
- [ADR-0006](../adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0008](../adr/0008-use-page-object-hierarchy.md): Page Object Hierarchy
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../adr/0011-use-conditional-intercepts.md): Conditional Intercepts

---

**Última atualização:** 2024-12-19  
**Mantido por:** Equipe de Automação

