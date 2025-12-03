# 🎯 Guia de Decisões Rápidas - Referência para Dúvidas

**Versão:** 1.0  
**Data:** 2024-12-19  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este guia fornece respostas rápidas e direcionamento para as dúvidas mais comuns ao desenvolver ou modificar testes no projeto. Use-o como referência rápida quando precisar tomar decisões arquiteturais.

**Quando usar:**
- Ao criar um novo teste e não souber qual padrão seguir
- Ao modificar um teste existente e tiver dúvidas
- Durante code review para validar decisões
- Para onboarding de novos desenvolvedores

---

## 🔐 Qual comando de login usar?

### ❓ Dúvida: "Qual comando de login devo usar no meu teste?"

### ✅ Decisão Rápida:

**É funcionalidade FISCAL?** (NFe, NFCe, SPED, Sintegra)
- ✅ **Use:** `cy.login()`
- **Usuário:** `user.validFiscal`
- **Exemplo:** `cypress/e2e/venda-nfcenfe/cadastro-nfe-normal.spec.js`

**É funcionalidade GERAL?** (Vendas, Compras, Financeiro, Clientes, Produtos, etc.)
- ✅ **Use:** `cy.loginArmazenandoSessao()`
- **Usuário:** `user.valid`
- **Exemplo:** `cypress/e2e/cadastro-clientes/cadastro-cliente.spec.js`

**É teste ITERATIVO?** (loops com `cy.wrap().each()`)
- ✅ **Use:** `cy.loginRestoreSession()`
- **Usuário:** `user.valid`
- **Trata SweetAlert automaticamente**
- **Exemplo:** `cypress/e2e/menulateral/menuLateralTeste.spec.js`

**É funcionalidade de COBRANÇA?**
- ✅ **Use:** `cy.loginArmazenandoSessaoCobranca()`
- **Usuário:** `user.validApiCobranca`

### 📚 Referência Completa:
- `docs/referencias/referencia-comandos-customizados.md` - Seção "Comandos de Autenticação"
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md)

---

## 📝 Preciso criar documentação?

### ❓ Dúvida: "Preciso criar documentação para este teste?"

### ✅ Decisão Rápida:

**SIM, sempre!** Documentação é **OBRIGATÓRIA** para novos testes.

### 📋 Checklist Obrigatório:

1. ✅ **Criar spec** em `cypress/e2e/...`
2. ✅ **Criar Page Objects/Locators** (se necessário)
3. ✅ **Adicionar ao `specPattern`** em `cypress.config.js` (OBRIGATÓRIO)
4. ✅ **Criar `docs/cases/architecture-<nome>.md`** (OBRIGATÓRIO)
   - Seguir template: `docs/referencias/processo-documentacao.md`
5. ✅ **Atualizar `docs/testes.md`** (OBRIGATÓRIO)
6. ✅ **Atualizar `docs/cases/README.md`** (OBRIGATÓRIO)
7. ✅ **Aplicar tags** no `describe` (ADR-0010)

### 📚 Referência Completa:
- `docs/referencias/processo-documentacao.md` - Processo completo
- [ADR-0006](../adr/0006-mandatory-documentation-for-new-tests.md)
- [ADR-0014](../adr/0014-standardized-architectural-documentation-process.md)

---

## 🏗️ Preciso criar Page Object?

### ❓ Dúvida: "Preciso criar um Page Object para esta página?"

### ✅ Decisão Rápida:

**SIM, se:**
- ✅ A página tem múltiplas interações (preenchimento, cliques, validações)
- ✅ A página será usada em mais de um teste
- ✅ A página tem lógica complexa de interação

**NÃO, se:**
- ❌ A página é usada apenas uma vez e tem interações muito simples
- ❌ A página é apenas uma validação simples

### 📋 Padrão ao Criar:

```javascript
// ✅ Correto
class MinhaPage {
  preencherCampo(valor) {
    cy.get(MinhaLocators.campo).type(valor);
  }
  
  clicarSalvar() {
    cy.get(MinhaLocators.botaoSalvar).click();
  }
}

export default new MinhaPage();
```

**Regras:**
- ✅ Nome em **PascalCase**: `MinhaPage.js`
- ✅ Métodos com **verbos**: `preencherCampo`, `clicarSalvar`
- ✅ **Locators separados**: `cypress/support/locators/`
- ✅ **Não usar seletores** diretamente no Page Object

### 📚 Referência Completa:
- [ADR-0002](../adr/0002-use-page-object-pattern.md)
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md)

---

## 🔄 Preciso usar hierarquia de Page Objects?

### ❓ Dúvida: "Este módulo precisa de hierarquia de Page Objects?"

### ✅ Decisão Rápida:

**SIM, use hierarquia se:**
- ✅ Módulo tem **3+ variantes** com funcionalidade comum significativa
- ✅ Métodos comuns representam **>30%** do código total
- ✅ Variantes compartilham **workflows complexos** (ex: itens, pagamentos, emissão)

**NÃO, não use hierarquia se:**
- ❌ Apenas **1-2 variantes** existem
- ❌ Variantes são **muito diferentes**
- ❌ Métodos comuns são **mínimos** (<30% do código)
- ❌ Hierarquia adiciona mais complexidade que valor

### 📋 Estrutura Recomendada:

```
Module/
├── ModuleBasePage.js           # Base class (métodos comuns)
├── ModuleVariant1Page.js      # Herda de Base
└── ModuleVariant2Page.js      # Herda de Base
```

**Máximo:** 2 níveis de herança (Base → Specific)

### 📚 Referência Completa:
- `docs/referencias/analise-page-objects-hierarquicos.md` - Análise completa
- [ADR-0008](../adr/0008-use-page-object-hierarchy.md)

---

## 🏷️ Quais tags usar?

### ❓ Dúvida: "Quais tags devo usar no meu teste?"

### ✅ Decisão Rápida:

**Padrão mínimo:**
```javascript
describe('Nome do Teste', { tags: ['@modulo', '@regressivo'] }, () => {
  // ...
});
```

**Tags por tipo:**
- **Módulo:** `@financeiro`, `@vendas`, `@compras`, `@produtos`, etc.
- **Tipo:** `@regressivo`, `@smoke`, `@critical`
- **Específico:** `@nfe-normal`, `@listagem-movimentacoes`, etc.

**Exemplos:**
```javascript
// Teste de NFe
{ tags: ['@nfe', '@vendas', '@regressivo'] }

// Teste de listagem
{ tags: ['@financeiro', '@listagem', '@regressivo'] }

// Teste de cadastro
{ tags: ['@produtos', '@cadastro', '@regressivo'] }
```

### 📚 Referência Completa:
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md)

---

## 🎲 Preciso usar Faker para dados?

### ❓ Dúvida: "Devo usar Faker para gerar dados dinâmicos?"

### ✅ Decisão Rápida:

**SIM, sempre que:**
- ✅ Dados precisam ser **únicos** (evitar conflitos)
- ✅ Teste será executado em **paralelo**
- ✅ Dados precisam ser **realistas** mas variáveis

**NÃO, se:**
- ❌ Dados são **estáticos** e não mudam
- ❌ Dados são **específicos** para validação (ex: CPF específico)

### 📋 Padrão:

```javascript
// ✅ Correto - Usar factory com Faker
import { generateRandomCustomer } from '../../support/factory/generateRandomData';

const cliente = generateRandomCustomer();
ClientePage.preencherCamposCliente(cliente);
```

### 📚 Referência Completa:
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md)

---

## 🔀 Preciso usar intercept condicional?

### ❓ Dúvida: "Preciso usar intercept condicional nesta requisição?"

### ✅ Decisão Rápida:

**SIM, use intercept condicional se:**
- ✅ Requisição **pode ou não ocorrer** dependendo do estado
- ✅ Campo **pode já estar preenchido** (não dispara requisição)
- ✅ Fluxo tem **caminhos condicionais**

**NÃO, se:**
- ❌ Requisição **sempre ocorre**
- ❌ Fluxo é **determinístico**

### 📋 Padrão:

```javascript
// ✅ Correto - Intercept condicional
let destinatarioRequestInterceptada = false;

cy.intercept(
  { method: 'POST', url: /.*\/nfe2\/salvar.*/, middleware: true },
  (req) => {
    destinatarioRequestInterceptada = true;
    req.continue();
  },
).as('salvarDestinatario');

// ... ação que pode ou não disparar requisição

if (destinatarioRequestInterceptada) {
  cy.wait('@salvarDestinatario');
} else {
  cy.log('Requisição não foi disparada');
}
```

### 📚 Referência Completa:
- [ADR-0011](../adr/0011-use-conditional-intercepts.md)

---

## 📂 Onde colocar o novo spec?

### ❓ Dúvida: "Onde devo criar o arquivo do novo teste?"

### ✅ Decisão Rápida:

**Estrutura por módulo:**
```
cypress/e2e/
├── financeiro/
│   ├── nova-receita.spec.js
│   └── listagem-contas-a-receber.spec.js
├── vendas/
│   ├── cadastro-venda.spec.js
│   └── listagem-vendas.spec.js
└── produtos/
    ├── cadastro-produto.spec.js
    └── listagem-produtos.spec.js
```

**Regras:**
- ✅ Organizar por **módulo/funcionalidade**
- ✅ Separar **cadastro** de **listagem** quando aplicável
- ✅ Usar **kebab-case** para nomes de arquivos
- ✅ Adicionar ao `specPattern` em `cypress.config.js`

### 📚 Referência Completa:
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md)

---

## 🧪 Preciso criar um novo comando customizado?

### ❓ Dúvida: "Devo criar um novo comando customizado?"

### ✅ Decisão Rápida:

**SIM, crie comando se:**
- ✅ Funcionalidade será **reutilizada** em múltiplos testes
- ✅ Funcionalidade é **complexa** e se beneficia de encapsulamento
- ✅ Funcionalidade **melhora legibilidade** dos testes

**NÃO, não crie se:**
- ❌ Funcionalidade é **usada apenas uma vez**
- ❌ Page Object é mais apropriado
- ❌ Funcionalidade é **muito simples**

### 📋 Ao Criar:

1. ✅ **Documentar** em `docs/referencias/referencia-comandos-customizados.md`
2. ✅ **Adicionar exemplos** de uso
3. ✅ **Referenciar ADRs** relacionadas
4. ✅ **Atualizar** quando modificar

### 📚 Referência Completa:
- `docs/referencias/referencia-comandos-customizados.md`
- [ADR-0012](../adr/0012-documentation-of-custom-commands.md)

---

## ✅ Como validar meu código?

### ❓ Dúvida: "Como valido se meu código está conforme os padrões?"

### ✅ Decisão Rápida:

**Use o Checklist de Validação Contínua:**

1. ✅ **ADR-0002 (Page Objects):**
   - [ ] Não há seletores CSS/XPath diretamente no spec
   - [ ] Interações encapsuladas em Page Objects

2. ✅ **ADR-0003 (Locators):**
   - [ ] Locators em arquivos separados
   - [ ] Nome do arquivo em PascalCase

3. ✅ **ADR-0004 (Login):**
   - [ ] Comando de login correto (fiscal vs não-fiscal)
   - [ ] Usa `cy.session()` para cache

4. ✅ **ADR-0010 (Tags):**
   - [ ] Tags aplicadas no `describe`
   - [ ] Tags seguem padrão: `['@modulo', '@tipo', '@regressivo']`

5. ✅ **ADR-0006 (Documentação):**
   - [ ] Architecture documentation criada
   - [ ] `docs/testes.md` atualizado
   - [ ] `docs/cases/README.md` atualizado

### 📚 Referência Completa:
- `docs/referencias/checklist-validacao-continua.md` - Checklist completo
- [ADR-0013](../adr/0013-continuous-validation-checklist.md)

---

## 🚨 Problemas Comuns e Soluções

### ❓ Problema: "Teste está falhando com timeout"

### ✅ Soluções Rápidas:

1. **Verificar intercepts condicionais:**
   - Se requisição pode não ocorrer, use intercept condicional
   - Verificar se flag está sendo resetada

2. **Aguardar elementos visíveis:**
   ```javascript
   cy.get('#elemento').should('be.visible');
   ```

3. **Aguardar loading desaparecer:**
   ```javascript
   cy.get('#loading').should('not.exist');
   ```

4. **Usar timeouts apropriados:**
   ```javascript
   cy.get('#elemento', { timeout: 10000 }).should('be.visible');
   ```

---

### ❓ Problema: "Não sei qual Page Object usar"

### ✅ Solução Rápida:

1. **Verificar estrutura existente:**
   - `cypress/support/pages/` organizado por módulo
   - Verificar se já existe Page Object para a página

2. **Verificar documentação:**
   - `docs/cases/README.md` - Índice de documentações
   - `docs/cases/architecture-*.md` - Exemplos de uso

3. **Criar novo se necessário:**
   - Seguir padrão PascalCase
   - Separar locators
   - Documentar métodos

---

### ❓ Problema: "Teste está lento"

### ✅ Soluções Rápidas:

1. **Usar `cy.session()` para login:**
   - ✅ Já implementado nos comandos customizados
   - ✅ Reutiliza sessão entre testes

2. **Evitar waits desnecessários:**
   - ✅ Usar intercepts condicionais quando apropriado
   - ✅ Aguardar elementos visíveis em vez de waits fixos

3. **Otimizar intercepts:**
   - ✅ Usar `middleware: true` quando necessário
   - ✅ Evitar intercepts desnecessários

---

## 📊 Árvore de Decisão Rápida

### Criando um Novo Teste

```
1. É funcionalidade FISCAL?
   ├─ SIM → Use cy.login()
   └─ NÃO → Use cy.loginArmazenandoSessao()

2. Precisa de Page Object?
   ├─ SIM → Crie em cypress/support/pages/
   │        └─ Separe locators em cypress/support/locators/
   └─ NÃO → Use Page Objects existentes

3. Precisa de dados dinâmicos?
   ├─ SIM → Use Faker via factories
   └─ NÃO → Use fixtures estáticos

4. Requisição pode não ocorrer?
   ├─ SIM → Use intercept condicional
   └─ NÃO → Use intercept normal

5. Módulo tem 3+ variantes com código comum?
   ├─ SIM → Considere hierarquia de Page Objects
   └─ NÃO → Use Page Objects simples

6. Adicionar ao specPattern?
   └─ SIM → Sempre! (OBRIGATÓRIO)

7. Criar documentação?
   └─ SIM → Sempre! (OBRIGATÓRIO)
      ├─ docs/cases/architecture-<nome>.md
      ├─ Atualizar docs/testes.md
      └─ Atualizar docs/cases/README.md

8. Aplicar tags?
   └─ SIM → Sempre! (OBRIGATÓRIO)
      └─ Padrão: ['@modulo', '@tipo', '@regressivo']
```

---

## 🔗 Referências Rápidas

### Documentos Essenciais

| Documento | Quando Consultar |
|-----------|------------------|
| `docs/referencias/referencia-comandos-customizados.md` | Dúvidas sobre comandos customizados |
| `docs/referencias/checklist-validacao-continua.md` | Validação de código |
| `docs/referencias/processo-documentacao.md` | Criando documentação |
| `docs/cases/README.md` | Encontrar documentações existentes |
| `docs/adr/README.md` | Entender decisões arquiteturais |

### ADRs por Dúvida Comum

| Dúvida | ADR |
|--------|-----|
| Qual comando de login usar? | ADR-0004 |
| Preciso criar Page Object? | ADR-0002 |
| Locators separados? | ADR-0003 |
| Preciso documentar? | ADR-0006, ADR-0014 |
| Quais tags usar? | ADR-0010 |
| Usar Faker? | ADR-0009 |
| Intercept condicional? | ADR-0011 |
| Hierarquia de Page Objects? | ADR-0008 |
| Separar specs? | ADR-0007 |

---

## 💡 Dicas Rápidas

### ✅ Faça

- ✅ **Sempre** use Page Objects para interações com UI
- ✅ **Sempre** separe locators dos Page Objects
- ✅ **Sempre** documente novos testes
- ✅ **Sempre** adicione ao `specPattern`
- ✅ **Sempre** aplique tags
- ✅ **Sempre** use `cy.session()` para login
- ✅ **Sempre** valide com checklist antes de PR

### ❌ Não Faça

- ❌ **Nunca** use seletores CSS/XPath diretamente no spec
- ❌ **Nunca** pule a documentação
- ❌ **Nunca** esqueça de adicionar ao `specPattern`
- ❌ **Nunca** use `cy.login()` para funcionalidades não-fiscais
- ❌ **Nunca** use `cy.loginArmazenandoSessao()` para funcionalidades fiscais
- ❌ **Nunca** crie hierarquia sem necessidade
- ❌ **Nunca** use waits fixos quando pode aguardar elementos

---

## 🎯 Resumo de Decisões Críticas

### 1. Login
- **Fiscal** → `cy.login()`
- **Geral** → `cy.loginArmazenandoSessao()`
- **Iterativo** → `cy.loginRestoreSession()`

### 2. Documentação
- **Sempre obrigatória** para novos testes
- **3 arquivos** devem ser atualizados
   - **Template** em `docs/referencias/processo-documentacao.md`

### 3. Page Objects
- **Sempre** use para interações com UI
- **Sempre** separe locators
- **Hierarquia** apenas se 3+ variantes com código comum

### 4. Validação
- **Sempre** valide com checklist antes de PR
- **Sempre** verifique conformidade com ADRs

---

## 📞 Quando Precisar de Mais Ajuda

1. **Consulte ADRs:** `docs/adr/README.md`
2. **Consulte exemplos:** `docs/cases/architecture-*.md`
3. **Consulte checklist:** `docs/referencias/checklist-validacao-continua.md`
4. **Consulte referências:** `docs/referencias/referencia-comandos-customizados.md`

---

**Última atualização:** 2024-12-19  
**Status:** ✅ Ativo - Use como referência rápida

