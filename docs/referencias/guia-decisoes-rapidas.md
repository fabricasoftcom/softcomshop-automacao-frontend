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

## 📅 Como validar Date Range Picker?

### ❓ Dúvida: "Como validar que o date picker foi preenchido corretamente?"

### ✅ Decisão Rápida:

**NUNCA valide desaparecimento do botão:**
```javascript
// ❌ ERRADO - Botão pode permanecer no DOM
cy.get(datePickerAplicar).should('not.exist');
```

**SEMPRE valide o resultado:**
```javascript
// ✅ CORRETO - Valida que campo foi preenchido
cy.get(campoPeriodo)
    .should('be.visible')
    .should('not.have.value', '');
```

**Padrão completo:**
```javascript
preencherPeriodo(dataInicio, dataFim) {
    const periodo = `${dataInicio} - ${dataFim}`;
    cy.get(campoPeriodo)
        .should('be.visible')
        .click();
    cy.get(campoPeriodo)
        .clear()
        .type(periodo);
    // Clica em Aplicar se visível
    cy.get('body').then(($body) => {
        if ($body.find(datePickerAplicar).length > 0) {
            cy.get(datePickerAplicar)
                .should('be.visible')
                .click();
            // Valida resultado, não desaparecimento do botão
            cy.get(campoPeriodo)
                .should('be.visible')
                .should('not.have.value', '');
        }
    });
}
```

**Lição:** "Valide o resultado da ação, não o estado intermediário do componente."

### 📚 Referência Completa:
- [Lições Aprendidas - Date Picker](../referencias/aprendizagens-e-licoes.md#1-validação-de-date-range-picker)

---

## 🪟 Como lidar com modais que têm display: none?

### ❓ Dúvida: "O modal aparece na tela mas os testes não encontram os elementos. O container tem `display: none`. Como validar?"

### ✅ Decisão Rápida:

**NUNCA valide o container do modal:**
```javascript
// ❌ ERRADO - Container pode ter display: none
cy.get('#content-plus.modal.in').should('be.visible');
```

**SEMPRE valide elementos funcionais:**
```javascript
// ✅ CORRETO - Valida elemento funcional (campo, botão)
cy.get(CategoriasLocators.campoDescricao, { timeout: 20000 })
  .should('be.visible')
  .and('not.be.disabled');
```

**Para validar título do modal:**
```javascript
// ❌ ERRADO - Container pode ter display: none
cy.get('#content-plus .modal-title').should('be.visible');

// ✅ CORRETO - Valida texto no body
cy.get('body', { timeout: 15000 })
  .should('contain.text', tipoCategoria);
```

**Para validar fechamento:**
```javascript
// ❌ ERRADO - Container pode persistir no DOM
cy.get('#content-plus.modal.in').should('not.exist');

// ✅ CORRETO - Elemento funcional desaparece ao fechar
cy.get(CategoriasLocators.campoDescricao, { timeout: 10000 })
  .should('not.exist');
```

**Padrão completo:**
```javascript
verificarModalVisivel() {
  // Aguarda o campo de descrição aparecer e ficar visível
  // O campo tem ID dinâmico, então usamos o placeholder como seletor
  // Não procuramos dentro do modalContent porque ele pode ter display: none
  cy.get(CategoriasLocators.campoDescricao, { timeout: 20000 })
    .should('be.visible')
    .and('not.be.disabled');
}
```

**Lição:** "Um elemento pode estar funcional mesmo com `display: none` no container. Valide elementos funcionais, não containers."

### 📚 Referência Completa:
- [Lições Aprendidas - Implementação de Categorias](../referencias/aprendizagens-e-licoes.md#-lições-aprendidas-implementação-de-categorias)
- [Checklist de Validação - Modais e Elementos Dinâmicos](../referencias/checklist-validacao-continua.md#validação-de-modais-e-elementos-dinâmicos)

---

## 🔢 Como lidar com IDs dinâmicos em elementos?

### ❓ Dúvida: "O elemento tem um ID que muda a cada execução (ex: `#1765308555654`). Como criar um locator estável?"

### ✅ Decisão Rápida:

**NUNCA use IDs dinâmicos diretamente:**
```javascript
// ❌ ERRADO - ID muda a cada execução
campoDescricao: '#1765308555654'
```

**SEMPRE use atributos estáveis:**
```javascript
// ✅ CORRETO - Placeholder é estável
campoDescricao: 'input[placeholder*="Ex."]:visible, input[placeholder*="Receita de Vendas"]:visible, input[placeholder*="Despesa"]:visible'
```

**Alternativas para IDs dinâmicos:**
1. **Placeholder:** `input[placeholder*="texto"]`
2. **Name:** `input[name="campo"]`
3. **Data attributes:** `[data-testid="campo"]`
4. **Classes estáveis:** `.classe-estavel`
5. **Combinação:** Combine múltiplos seletores para cobertura

**Sempre adicione `:visible` quando apropriado:**
```javascript
// ✅ CORRETO - Evita elementos ocultos
campoDescricao: 'input[placeholder*="Ex."]:visible'
```

**Processo de criação:**
1. Inspecione o DOM manualmente no browser
2. Identifique atributos estáveis (placeholder, name, data-*)
3. Teste o locator no console do browser
4. Combine múltiplos seletores se necessário
5. Adicione `:visible` para evitar elementos ocultos

**Exemplo completo:**
```javascript
// Locator com múltiplos seletores para cobertura
campoDescricao: 'input[placeholder*="Ex."]:visible, input[placeholder*="Receita de Vendas"]:visible, input[placeholder*="Despesa"]:visible'

// Uso no Page Object
preencherDescricao(descricao) {
  cy.get(CategoriasLocators.campoDescricao, { timeout: 15000 })
    .should('be.visible')
    .clear()
    .type(descricao);
}
```

**Lição:** "Quando IDs são dinâmicos, use atributos estáveis (placeholder, name, data-*) como alternativa. Sempre valide no browser antes de usar."

### 📚 Referência Completa:
- [Lições Aprendidas - Implementação de Categorias](../referencias/aprendizagens-e-licoes.md#-lições-aprendidas-implementação-de-categorias)
- [Checklist de Validação - Modais e Elementos Dinâmicos](../referencias/checklist-validacao-continua.md#validação-de-modais-e-elementos-dinâmicos)

---

## ⏱️ Como remover waits fixos?

### ❓ Dúvida: "Como substituir `cy.wait()` fixos por validações condicionais?"

### ✅ Decisão Rápida:

**Substitua waits fixos por validações:**
```javascript
// ❌ ANTES
cy.wait(2000); // Aguarda processamento

// ✅ DEPOIS
cy.get('#loading').should('not.exist'); // Valida que loading terminou
```

**Padrões comuns de substituição:**

| Wait Fixo | Validação Condicional |
|-----------|----------------------|
| `cy.wait(1000)` | `cy.get(elemento).should('be.visible')` |
| `cy.wait(2000)` | `cy.get('#loading').should('not.exist')` |
| `cy.wait(500)` | `cy.get(resultado).should('exist')` |
| `cy.wait(3000)` | `cy.get(toast).should('be.visible')` |

**Exemplos práticos:**
```javascript
// ❌ ANTES - Wait fixo após salvar
salvar() {
    cy.get(btnSalvar).click();
    cy.wait(2000); // Aguarda processamento
}

// ✅ DEPOIS - Validação condicional
salvar() {
    cy.get(btnSalvar).click();
    cy.get('#loading').should('not.exist'); // Valida que loading terminou
}

// ❌ ANTES - Wait fixo após selecionar tipo
selecionarTipoProduto(tipo) {
    cy.get(selectTipo).select(tipo);
    cy.wait(1000); // Aguarda campo aparecer
}

// ✅ DEPOIS - Validação condicional
selecionarTipoProduto(tipo) {
    cy.get(selectTipo).select(tipo);
    if (tipo === 'Produto') {
        cy.get(campoProduto, { timeout: 10000 }).should('be.visible');
    }
}
```

**Lição:** "Waits fixos são code smell. Use validações condicionais que se adaptam ao tempo real de execução."

### 📚 Referência Completa:
- [ADR-0013](../adr/0013-continuous-validation-checklist.md)
- [Lições Aprendidas - Waits Fixos](../referencias/aprendizagens-e-licoes.md#2-remoção-de-waits-fixos)

---

## 🛡️ Como tornar métodos resilientes?

### ❓ Dúvida: "Como lidar com falhas esperadas em ambiente compartilhado?"

### ✅ Decisão Rápida:

**Use verificações condicionais:**
```javascript
// ✅ Método resiliente
desativarPromocao() {
    cy.get('body').then(($body) => {
        const link = $body.find(linkDesativar);
        if (link.length > 0 && link.is(':visible')) {
            // Pode desativar
            cy.get(linkDesativar).click();
            cy.get('#loading').should('not.exist');
        } else {
            // Apenas loga - não falha o teste
            cy.log('⚠️ Link não encontrado - ação não aplicável');
            cy.log('ℹ️ Isso pode ocorrer se a ativação falhou devido a conflitos');
        }
    });
}
```

**Quando usar:**
- ✅ Ações que podem falhar em ambiente compartilhado
- ✅ Validações que dependem de estado externo
- ✅ Operações que podem ter conflitos esperados

**Quando NÃO usar:**
- ❌ Validações críticas que devem sempre funcionar
- ❌ Operações que são pré-requisito para o teste
- ❌ Falhas que indicam bug real

**Lição:** "Em ambientes compartilhados, métodos devem ser resilientes a falhas esperadas, logando sem quebrar o teste."

### 📚 Referência Completa:
- [Lições Aprendidas - Métodos Resilientes](../referencias/aprendizagens-e-licoes.md#3-tratamento-de-falhas-em-ambiente-compartilhado)

---

## 🔍 Como validar autocomplete com debounce?

### ❓ Dúvida: "Como aguardar resultados de autocomplete aparecerem?"

### ✅ Decisão Rápida:

**Valide que resultados apareceram:**
```javascript
// ✅ CORRETO - Valida que resultados apareceram
selecionarProduto(termo) {
    cy.get(campoProduto)
        .click()
        .clear()
        .type(termo);
    // Aguarda debounce - valida que resultados apareceram
    cy.get(campoProdutoResultado, { timeout: 10000 })
        .should('exist')
        .should('be.visible');
    // Seleciona primeiro resultado
    cy.get(campoProdutoResultado).first().click();
    // Valida que campos foram preenchidos
    cy.get(campoDesconto, { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled');
}
```

**NUNCA use wait fixo para debounce:**
```javascript
// ❌ ERRADO - Wait fixo não é confiável
cy.get(campoProduto).type(termo);
cy.wait(500); // Pode não ser suficiente
cy.get(resultado).click();
```

**Lição:** "Para componentes com debounce, valide que o resultado apareceu antes de interagir."

### 📚 Referência Completa:
- [Lições Aprendidas - Autocomplete](../referencias/aprendizagens-e-licoes.md#5-validação-de-autocomplete-com-debounce)

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

## 🎯 Como criar locators corretos?

### ❓ Dúvida: "Como criar locators que não vão quebrar?"

### ✅ Decisão Rápida:

**SEMPRE siga esta ordem:**

1. ✅ **Inspecione o DOM no browser:**
   - Abra o browser e navegue até a tela
   - Use DevTools para inspecionar elementos
   - Copie IDs e classes diretamente do DOM

2. ✅ **Priorize IDs sobre outros seletores:**
   - IDs são únicos e estáveis
   - IDs são mais rápidos que classes
   - Exemplo: `#valor_unitario_comercial` é melhor que `input[placeholder*="Preço"]`

3. ✅ **Use contexto quando necessário:**
   - Modais: `.modal #elemento`
   - Painéis: `.painel #elemento`
   - Seções: `.secao #elemento`

**Quando seletor retorna múltiplos elementos:**

**Problema**: Seletor genérico retorna múltiplos elementos (ex: `a[href="#"]` retorna 24 elementos)

**Solução**: Usar contexto próximo a um elemento único (título, seção)

**Exemplo**:
```javascript
// ❌ Incorreto - Múltiplos matches
cy.get('a[href="#"]').click(); // Erro: 24 elementos encontrados

// ✅ Correto - Contexto próximo ao título
cy.contains('h5', 'Listagem de Devoluções').parent().within(() => {
  cy.get('a[href="#"]').first().click();
});
```

**Cypress não suporta `:has()` nativamente:**

**IMPORTANTE**: Cypress não suporta o seletor `:has()` (é extensão jQuery, não CSS nativo)

**Solução**: Usar `cy.contains()` + `.parent().next().within()` no Page Object

**Exemplo**:
```javascript
// ❌ Incorreto - Não funciona no Cypress
campoProduto: 'form:has(h5:contains("Produtos")) input.autocompleter.typeahead'

// ✅ Correto - Usar cy.contains() no Page Object
cy.contains('h5', 'Produtos').parent().next().within(() => {
  cy.get('input.autocompleter.typeahead').first().clear().type(nomeProduto);
});
```

4. ✅ **Valide locators antes de usar:**
   - Teste no browser
   - Verifique se encontra o elemento correto
   - Verifique se não encontra elementos incorretos

### ❌ NÃO Faça:

- ❌ **Nunca** use seletores genéricos demais (`input[id^="auto"]`)
- ❌ **Nunca** assuma estrutura do DOM sem inspecionar
- ❌ **Nunca** use seletores por texto quando há IDs disponíveis
- ❌ **Nunca** crie locators sem validar no browser

### 📋 Checklist de Validação:

- [ ] Locator usa ID quando disponível?
- [ ] Locator tem contexto apropriado (modal, painel)?
- [ ] Locator foi validado no browser?
- [ ] Locator não captura elementos incorretos?
- [ ] Locator não é genérico demais?

### 📋 Exemplos:

**❌ Ruim:**
```javascript
// Genérico demais, pode capturar elemento oculto
campoProduto: 'input[id^="auto_produto"]'

// Não usa ID disponível
campoPreco: 'input[placeholder*="Preço"]'

// Sem contexto do modal
btnSalvar: '#btn-salvar'
```

**✅ Bom:**
```javascript
// ID específico com contexto do modal
modalCampoProduto: '.modal #auto_produto_id'

// ID único disponível
modalCampoPreco: '.modal #valor_unitario_comercial'

// Contexto do modal + ID específico
modalBtnAdicionar: '.modal #btn-adicionar'
```

### 📚 Referência Completa:
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators from Page Objects
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators
- `docs/referencias/aprendizagens-e-licoes.md` - Seção "Lições Aprendidas: Problemas com Locators"
- `docs/cases/architecture-cadastro-compra-manual.md` - Seção "Lições Aprendidas: Problemas com Locators"

---

## 🔍 Como abrir formulário de pesquisa corretamente?

### ❓ Dúvida: "Como implementar método para abrir formulário de pesquisa?"

### ✅ Decisão Rápida:

**SEMPRE verifique se o formulário já está visível antes de clicar no botão toggle**

**Padrão recomendado**:
```javascript
abrirFormularioPesquisa() {
  cy.get(locators.formPesquisa).then(($form) => {
    if ($form.is(':visible')) {
      return; // Já está aberto
    }
    cy.get(locators.btnPesquisaToggle).click();
  });
  cy.get(locators.formPesquisa).should('be.visible');
}
```

**Benefícios**:
- Previne cliques desnecessários
- Torna código mais robusto
- Segue padrão estabelecido em outras implementações (Vendas, Cliente, Produção)

**Referência**: Lições aprendidas da implementação Devolução/Venda de Consignação

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

### ❓ Problema: "Locator não encontra o elemento correto"

### ✅ Soluções Rápidas:

1. **Verificar se locator usa ID quando disponível:**
   - Inspecionar elemento no browser
   - Verificar se há ID único disponível
   - Atualizar locator para usar ID

2. **Verificar contexto do locator:**
   - Se elemento está em modal, usar `.modal #elemento`
   - Se elemento está em painel, usar `.painel #elemento`
   - Validar que contexto está correto

3. **Verificar se locator não é genérico demais:**
   - Locators genéricos podem capturar elementos incorretos
   - Preferir IDs específicos sobre seletores genéricos
   - Validar que locator encontra apenas o elemento desejado

4. **Validar locator no browser:**
   - Abrir console do browser
   - Executar `document.querySelector('seu-locator')`
   - Verificar se retorna o elemento correto

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

9. Criar locators?
   └─ SIM → Sempre! (OBRIGATÓRIO)
      ├─ Inspecionar DOM no browser
      ├─ Priorizar IDs sobre outros seletores
      ├─ Usar contexto quando necessário
      └─ Validar locator antes de usar
```

---

## 🤖 Como pedir para o Cursor criar testes automaticamente?

### ❓ Dúvida: "Como usar o Cursor para criar testes automaticamente?"

### ✅ Decisão Rápida:

**Para criar testes do zero automaticamente:**
- ✅ **Use:** O prompt completo do `guia-prompts-automacao.md`
- **Copie e cole:** O prompt completo substituindo `[INSERIR TELA AQUI]` pelo nome da tela
- **O Cursor fará:** Exploração → Mapeamento de Cenários → Criação de Locators → Page Objects → Specs

**Para explorar apenas uma tela:**
- ✅ **Use:** O prompt mestre de Discovery do `guia-prompts-automacao.md`
- **Referencie:** `@guia-prompts-automacao.md` seguido do nome da tela

**Para uma fase específica:**
- ✅ **Use:** Prompts específicos por fase (Locators, Page Object, Spec)
- **Vantagem:** Controle total sobre o que o Cursor faz

### 📋 Padrão:

```markdown
# Exemplo 1: Prompt Completo (Rotina Completa)
Gostaria de criar uma automação para a tela de Cadastro de Produtos seguindo a ADR-0016.
[resto do prompt...]

# Exemplo 2: Referência com @
Siga o protocolo de Discovery do @guia-prompts-automacao.md para a tela de Cadastro de Produtos

# Exemplo 3: Prompt Específico
Com base na exploração realizada, crie o arquivo de Locators...
```

### 📚 Referência Completa:
- `docs/referencias/guia-prompts-automacao.md` - Guia completo com todos os prompts
- `.cursor/rules/architeture.mdc` - Gatilho automático configurado

**Nota:** O Cursor automaticamente consulta o guia quando você usa frases como "criar uma automação para a tela de", "map a screen", "scan the app".

---

## 🔗 Referências Rápidas

### Documentos Essenciais

| Documento | Quando Consultar |
|-----------|------------------|
| `docs/referencias/guia-prompts-automacao.md` | Criar testes automaticamente com Cursor |
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
| Como criar locators corretos? | ADR-0015 |
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
- ✅ **Sempre** inspecione DOM antes de criar locators
- ✅ **Sempre** priorize IDs sobre outros seletores
- ✅ **Sempre** use contexto quando necessário (`.modal #elemento`)

### ❌ Não Faça

- ❌ **Nunca** use seletores CSS/XPath diretamente no spec
- ❌ **Nunca** pule a documentação
- ❌ **Nunca** esqueça de adicionar ao `specPattern`
- ❌ **Nunca** use `cy.login()` para funcionalidades não-fiscais
- ❌ **Nunca** use `cy.loginArmazenandoSessao()` para funcionalidades fiscais
- ❌ **Nunca** crie hierarquia sem necessidade
- ❌ **Nunca** use waits fixos quando pode aguardar elementos
- ❌ **Nunca** use seletores genéricos demais (`input[id^="auto"]`)
- ❌ **Nunca** assuma estrutura do DOM sem inspecionar
- ❌ **Nunca** crie locators sem validar no browser

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
5. **Crie testes automaticamente:** `docs/referencias/guia-prompts-automacao.md`

---

**Última atualização:** 2025-12-09  
**Status:** ✅ Ativo - Use como referência rápida

