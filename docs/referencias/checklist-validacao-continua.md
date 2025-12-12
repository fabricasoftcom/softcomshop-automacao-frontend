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

### ADR-0015: Prioritize IDs and Context in Locators

- [ ] **Locators seguem boas práticas?**
  - [ ] Locators usam IDs quando disponíveis (não seletores genéricos)
  - [ ] Locators têm contexto apropriado quando necessário (`.modal #elemento`)
  - [ ] Locators não são genéricos demais (`input[id^="auto"]` é ruim)
  - [ ] Locators foram validados no browser antes de usar

- [ ] **Processo de criação foi seguido?**
  - [ ] DOM foi inspecionado antes de criar locators
  - [ ] IDs e classes foram copiados diretamente do DOM
  - [ ] Locator foi testado no browser console
  - [ ] Locator não captura elementos incorretos

- [ ] **Seletor não retorna múltiplos elementos?**
  - [ ] Quando seletor genérico retorna múltiplos, usa contexto próximo a elemento único
  - [ ] Não usa `.first()` genérico sem contexto apropriado
  - [ ] Exemplo: `cy.contains('h5', 'Título').parent().within(() => { cy.get('a[href="#"]').first().click(); })`

- [ ] **Locators não usam `:has()`?**
  - [ ] Locators são seletores CSS válidos (Cypress não suporta `:has()` nativamente)
  - [ ] Quando necessário buscar por contexto, usa `cy.contains().parent().next().within()` no Page Object
  - [ ] Exemplo: `cy.contains('h5', 'Seção').parent().next().within(() => { cy.get('input').type('valor'); })`

**Exemplo de conformidade:**
```javascript
// ✅ Correto - ID com contexto
modalCampoProduto: '.modal #auto_produto_id'
modalCampoPreco: '.modal #valor_unitario_comercial'
modalBtnAdicionar: '.modal #btn-adicionar'

// ❌ Incorreto - Genérico demais
campoProduto: 'input[id^="auto_produto"]'  // Pode capturar elemento oculto

// ❌ Incorreto - Não usa ID disponível
campoPreco: 'input[placeholder*="Preço"]'  // Frágil, depende de texto

// ❌ Incorreto - Sem contexto
btnSalvar: '#btn-salvar'  // Pode capturar botão errado
```

**Referência:** [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md)

---

### Validação de Modais e Elementos Dinâmicos

- [ ] **Modais com `display: none` no container?**
  - [ ] Valida elementos funcionais (campos, botões) em vez do container do modal
  - [ ] Não depende de `display: none` para determinar se modal está ativo
  - [ ] Usa elementos visíveis e funcionais para validação

- [ ] **IDs dinâmicos tratados corretamente?**
  - [ ] Usa seletores alternativos quando IDs são dinâmicos (placeholder, name, data-*)
  - [ ] Combina múltiplos seletores para cobertura quando necessário
  - [ ] Adiciona `:visible` para evitar elementos ocultos
  - [ ] Valida no browser antes de usar

- [ ] **Validação de título em escopo apropriado?**
  - [ ] Quando container tem `display: none`, valida texto no `body` ou escopo maior
  - [ ] Usa `.should('contain.text', texto)` para verificar presença
  - [ ] Não depende de visibilidade do container

- [ ] **Elementos opcionais tratados corretamente?**
  - [ ] Verifica existência antes de interagir com elementos opcionais
  - [ ] Usa `.then()` e `.find()` para verificação condicional
  - [ ] Não falha teste se elemento opcional não existir
  - [ ] Métodos são resilientes a ausência de elementos

- [ ] **Validação de fechamento de modal?**
  - [ ] Valida ausência de elementos funcionais, não do container
  - [ ] Usa `.should('not.exist')` para elementos que desaparecem
  - [ ] Não depende de container que pode persistir no DOM

- [ ] **Validação manual no browser realizada?**
  - [ ] DOM foi inspecionado manualmente antes de criar locators
  - [ ] IDs e classes foram copiados diretamente do DOM
  - [ ] Locators foram testados no console do browser
  - [ ] Estrutura do DOM não foi assumida sem validação

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Valida elemento funcional, não container
verificarModalVisivel() {
  cy.get(CategoriasLocators.campoDescricao, { timeout: 20000 })
    .should('be.visible')
    .and('not.be.disabled');
}

// ✅ Correto - ID dinâmico, usa placeholder
campoDescricao: 'input[placeholder*="Ex."]:visible, input[placeholder*="Receita de Vendas"]:visible'

// ✅ Correto - Valida texto no body quando container tem display: none
verificarTituloModal(tipoCategoria) {
  cy.get('body', { timeout: 15000 })
    .should('contain.text', tipoCategoria);
}

// ✅ Correto - Verifica existência antes de interagir
marcarNaoExibirDRE() {
  cy.get('body').then(($body) => {
    const checkbox = $body.find('input[type="checkbox"]');
    if (checkbox.length > 0) {
      cy.wrap(checkbox).check({ force: true });
    }
  });
}

// ✅ Correto - Valida ausência de elemento funcional
cy.get(CategoriasLocators.campoDescricao, { timeout: 10000 })
  .should('not.exist');
```

**Exemplo de não conformidade:**
```javascript
// ❌ Incorreto - Valida container que pode ter display: none
cy.get('#content-plus.modal.in').should('be.visible');

// ❌ Incorreto - ID dinâmico, não funciona
campoDescricao: '#1765308555654'

// ❌ Incorreto - Falha se elemento não existir
cy.get('input[type="checkbox"]').check({ force: true });

// ❌ Incorreto - Valida container que pode persistir
cy.get('#content-plus.modal.in').should('not.exist');
```

**Referência:** [Lições Aprendidas - Implementação de Categorias](../referencias/aprendizagens-e-licoes.md#-lições-aprendidas-implementação-de-categorias)

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
  - [ ] Waits fixos foram substituídos por validações condicionais (ADR-0013)

### Boas Práticas

- [ ] **Tratamento de erros?**
  - [ ] `cy.verificarErro500Visual()` usado quando apropriado
  - [ ] Tratamento de modais/alerts quando necessário
  - [ ] Tratamento de SweetAlert quando necessário

- [ ] **Dados de teste?**
  - [ ] Fixtures usadas para dados estáticos
  - [ ] Faker usado para dados dinâmicos
  - [ ] Dados de teste são realistas

### Simplificação e Manutenibilidade

> **Context**: Based on lessons learned from code simplification. See [Lições Aprendidas - Simplificação](../referencias/aprendizagens-e-licoes.md#-lições-aprendidas-simplificação-de-código-complexo)

- [ ] **Código duplicado eliminado?**
  - [ ] Métodos similares foram consolidados
  - [ ] Lógica repetida foi extraída para métodos reutilizáveis
  - [ ] Não há validações redundantes sendo executadas múltiplas vezes
  - [ ] Constantes usadas para números mágicos (ex: colunas de tabela)

- [ ] **Código não utilizado removido?**
  - [ ] Métodos não utilizados foram removidos
  - [ ] Imports não utilizados foram removidos
  - [ ] Código morto foi limpo
  - [ ] Verificação feita antes de remover (grep/análise de uso)

- [ ] **Selectores centralizados?**
  - [ ] Nenhum seletor hardcoded no código dos Page Objects
  - [ ] Todos os selectores estão em arquivos de Locators
  - [ ] Locators seguem ADR-0003 e ADR-0015
  - [ ] Selectores longos/complexos foram movidos para locators

- [ ] **Waits fixos evitados?**
  - [ ] Nenhum `cy.wait()` fixo no código (ex: `cy.wait(2000)`)
  - [ ] Validações condicionais usadas quando necessário (`.should('be.visible')`)
  - [ ] Retry automático do Cypress aproveitado
  - [ ] Aguardos baseados em condições, não em tempo fixo

- [ ] **Complexidade gerenciada?**
  - [ ] Métodos não são excessivamente longos (>50 linhas merecem revisão)
  - [ ] Constantes usadas para números mágicos
  - [ ] Código é legível e fácil de entender
  - [ ] Métodos têm responsabilidade única

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Método consolidado, constante para número mágico
encontrarLinhaNaoImportada() {
    const COLUNA_STATUS = 9;
    return cy.get(Locators.linhasTabela).then(($linhas) => {
        // Lógica única, sem duplicação
    });
}

// ❌ Incorreto - Código duplicado
verificarStatusNaoImportada() { /* ... lógica ... */ }
encontrarPrimeiraLinhaNaoImportada() { /* mesma lógica ... */ }

// ✅ Correto - Validação condicional
cy.get(Locators.loading).should('not.exist');

// ❌ Incorreto - Wait fixo
cy.wait(2000);
```

**Referência:** [Lições Aprendidas - Simplificação](../referencias/aprendizagens-e-licoes.md#-lições-aprendidas-simplificação-de-código-complexo)

---

## 🔍 Validações Específicas de Componentes

### Date Range Picker

- [ ] **Validação correta?**
  - [ ] Validação verifica resultado (campo preenchido), não desaparecimento de botão
  - [ ] Não há `cy.wait()` fixos após interação com date picker
  - [ ] Validação usa `.should('not.have.value', '')` ou similar
  - [ ] Não tenta validar que botão "Aplicar" desapareceu

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Valida resultado
cy.get(campoPeriodo)
    .should('be.visible')
    .should('not.have.value', '');

// ❌ Incorreto - Valida estado intermediário
cy.get(datePickerAplicar).should('not.exist');
```

**Referência:** [Lições Aprendidas - Date Picker](../referencias/aprendizagens-e-licoes.md#1-validação-de-date-range-picker)

---

### Autocomplete com Debounce

- [ ] **Validação de debounce correta?**
  - [ ] Valida que resultados apareceram antes de interagir
  - [ ] Aguarda debounce com validação condicional (não wait fixo)
  - [ ] Usa `.should('exist')` e `.should('be.visible')` para resultados
  - [ ] Não há `cy.wait()` fixos para debounce

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Valida que resultados apareceram
cy.get(campoProduto).type(termo);
cy.get(campoProdutoResultado, { timeout: 10000 })
    .should('exist')
    .should('be.visible');

// ❌ Incorreto - Wait fixo para debounce
cy.get(campoProduto).type(termo);
cy.wait(500); // Não é confiável
```

**Referência:** [Lições Aprendidas - Autocomplete](../referencias/aprendizagens-e-licoes.md#5-validação-de-autocomplete-com-debounce)

---

### Campos Habilitados

- [ ] **Validação de estado antes de interagir?**
  - [ ] Valida que campo está habilitado antes de preencher
  - [ ] Usa `.should('not.be.disabled')` quando necessário
  - [ ] Valida que campo está visível antes de interagir
  - [ ] Não tenta preencher campo desabilitado

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Valida estado antes de interagir
cy.get(campoDesconto, { timeout: 10000 })
    .should('be.visible')
    .should('not.be.disabled')
    .clear()
    .type(valor);

// ❌ Incorreto - Não valida estado
cy.get(campoDesconto).type(valor); // Pode estar desabilitado
```

**Referência:** [Lições Aprendidas - Campos Habilitados](../referencias/aprendizagens-e-licoes.md#6-validação-de-campos-habilitados-após-seleção)

---

### Métodos Resilientes em Ambiente Compartilhado

- [ ] **Métodos lidam com falhas esperadas?**
  - [ ] Métodos que podem falhar usam verificações condicionais
  - [ ] Falhas esperadas são logadas, não quebram o teste
  - [ ] Validações críticas sempre falham o teste quando necessário
  - [ ] Logs informativos para debugging

**Exemplo de conformidade:**
```javascript
// ✅ Correto - Método resiliente
desativarPromocao() {
    cy.get('body').then(($body) => {
        const link = $body.find(linkDesativar);
        if (link.length > 0 && link.is(':visible')) {
            cy.get(linkDesativar).click();
        } else {
            cy.log('⚠️ Link não encontrado - ação não aplicável');
        }
    });
}

// ❌ Incorreto - Falha o teste em falha esperada
desativarPromocao() {
    cy.get(linkDesativar).click(); // Pode não existir
}
```

**Referência:** [Lições Aprendidas - Métodos Resilientes](../referencias/aprendizagens-e-licoes.md#3-tratamento-de-falhas-em-ambiente-compartilhado)

---

## Validação de Anti-Padrões

### Exploração Manual (Autônoma pelo Cursor)

- [ ] **Exploração autônoma pelo Cursor foi realizada antes da implementação**
  - [ ] Cursor usou ferramentas de browser (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_evaluate`)
  - [ ] Documento de descobertas foi criado
  - [ ] Locators foram coletados via `browser_evaluate` e validados no DOM

- [ ] **Testes são assertivos (sem condicionais excessivas)**
  - [ ] Testes não têm mais de 1-2 condicionais "se existir" por teste
  - [ ] Condicionais são apenas para elementos realmente opcionais
  - [ ] Elementos esperados não usam condicionais
  - [ ] Testes validam comportamento esperado, não opcional

- [ ] **Estrutura foi validada, não assumida**
  - [ ] Estrutura da tela foi validada antes de implementar
  - [ ] Não há comentários como "flexível para diferentes estruturas"
  - [ ] Locators refletem estrutura real do DOM
  - [ ] Testes validam estrutura específica, não genérica

**IMPORTANTE:** "Exploração manual" refere-se à exploração autônoma do Cursor usando ferramentas de browser, não exploração humana manual.

**Referência completa:** `docs/referencias/checklist-anti-padroes.md`

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
- ⚠️ **Código duplicado sem justificativa** - Atenção
- ⚠️ **Métodos não utilizados no código** - Atenção
- ⚠️ **Selectores hardcoded em Page Objects** - Atenção (viola ADR-0003)

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
- [ ] Simplificação e manutenibilidade validadas

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

**Última atualização:** 2025-12-09  
**Mantido por:** Equipe de Automação

