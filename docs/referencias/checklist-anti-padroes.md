# Checklist de Anti-Padrões

**Versão:** 1.0  
**Data:** 2025-12-12  
**Status:** ✅ Ativo

---

## 📋 Objetivo

Este checklist previne problemas comuns identificados em implementações anteriores, especialmente o caso de Gestão de Estoque. Use este checklist durante o desenvolvimento e code review para garantir que anti-padrões não sejam introduzidos no código.

**Quando usar:**
- Durante o desenvolvimento de novos testes
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

---

## 🚨 Anti-Padrões Críticos

### ❌ Anti-Padrão 1: Testes com Muitas Condicionais "Se Existir"

**Problema identificado:** Testes com muitos `cy.get('body').then(($body) => { if ($body.find(...).length > 0) })`

**Validação:**
- [ ] Testes não têm mais de 1-2 condicionais "se existir" por teste
- [ ] Condicionais são apenas para elementos realmente opcionais
- [ ] Elementos esperados não usam condicionais
- [ ] Testes validam comportamento esperado, não opcional

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - Muitas condicionais
it('teste', () => {
    cy.get('body').then(($body) => {
        if ($body.find('#btn-novo').length > 0) { /* ... */ }
        if ($body.find('#form-pesquisa').length > 0) { /* ... */ }
        if ($body.find('#tabela').length > 0) { /* ... */ }
    });
});

// ✅ CORRETO - Testes assertivos
it('Deve exibir a listagem', () => {
    ListagemPage.acessarListagem();
    ListagemPage.validarTabela();
    ListagemPage.validarColunas();
});
```

**Referência:** Lições aprendidas do caso Gestão de Estoque

---

### ❌ Anti-Padrão 2: Locators Não Validados no DOM

**Problema identificado:** Locators criados sem inspeção real do DOM

**Validação:**
- [ ] Todos os locators foram inspecionados no browser
- [ ] IDs foram copiados diretamente do DOM
- [ ] Locators foram testados no console do browser
- [ ] Documento temporário de descobertas foi criado

**Checklist de validação de locator:**
- [ ] Locator usa ID quando disponível?
- [ ] Locator foi testado em `document.querySelector('locator')`?
- [ ] Locator encontra apenas o elemento desejado?
- [ ] Locator tem contexto apropriado (modal, painel)?

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - Locator genérico, não validado
campoProduto: 'input[id^="auto_produto"]'  // Pode capturar elemento oculto

// ✅ CORRETO - ID específico validado no DOM
modalCampoProduto: '.modal #auto_produto_id'  // ID específico com contexto
```

**Referência:** 
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators
- [Locators Best Practices](../.cursor/rules/architeture.mdc#35-locators-best-practices)

---

### ❌ Anti-Padrão 3: Falta de Exploração Manual

**Problema identificado:** Implementação sem exploração manual adequada

**Validação:**
- [ ] Exploração autônoma pelo Cursor foi realizada antes da implementação
- [ ] Cursor usou ferramentas de browser (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_evaluate`) para explorar
- [ ] Documento temporário de descobertas foi criado
- [ ] Todos os locators foram coletados através de `browser_evaluate`
- [ ] Fluxo completo foi testado usando ferramentas de browser do Cursor

**Evidências obrigatórias:**
- [ ] Documento `docs/temp-[nome]-descobertas.md` ou similar criado
- [ ] Locators documentados com IDs reais do DOM coletados via `browser_evaluate`
- [ ] Estrutura da página documentada através de `browser_snapshot` e `browser_evaluate`
- [ ] Fluxo completo testado usando `browser_navigate`, `browser_click`, `browser_type`

**IMPORTANTE:** "Exploração manual" significa exploração autônoma do Cursor usando ferramentas de browser, não exploração humana manual.

**Referência:** 
- [Template de Plano](../referencias/template-plano-implementacao.md#fase-1-exploração-e-descoberta-obrigatória)
- [ADR-0016](../adr/0016-planning-before-implementation.md): Planning Before Implementation

---

### ❌ Anti-Padrão 4: Estrutura Assumida, Não Validada

**Problema identificado:** "Implementação flexível para diferentes estruturas"

**Validação:**
- [ ] Estrutura da tela foi validada antes de implementar
- [ ] Não há comentários como "flexível para diferentes estruturas"
- [ ] Locators refletem estrutura real do DOM
- [ ] Testes validam estrutura específica, não genérica

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - Estrutura assumida
// "Implementação flexível para diferentes estruturas possíveis"
cy.get('body').then(($body) => {
    if ($body.find('#tabela').length > 0) {
        // Validação genérica
    }
});

// ✅ CORRETO - Estrutura validada
// Locators específicos coletados via exploração autônoma
ListagemPage.validarTabela();  // Valida estrutura específica conhecida
```

**Referência:** Lições aprendidas do caso Gestão de Estoque

---

### ❌ Anti-Padrão 5: Testes Não Assertivos

**Problema identificado:** Testes que não validam comportamento esperado

**Validação:**
- [ ] Testes validam comportamento esperado
- [ ] Não há muitos "verifica se existe"
- [ ] Testes falham quando comportamento esperado não ocorre
- [ ] Testes são determinísticos e confiáveis

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - Teste não assertivo
it('teste', () => {
    cy.get('body').then(($body) => {
        if ($body.find('#tabela').length > 0) {
            cy.log('Tabela existe');
        }
    });
});

// ✅ CORRETO - Teste assertivo
it('Deve exibir tabela com dados', () => {
    ListagemPage.acessarListagem();
    ListagemPage.validarTabelaVisivel();
    ListagemPage.validarTabelaComDados();
});
```

**Referência:** Lições aprendidas do caso Gestão de Estoque

---

### ❌ Anti-Padrão 6: Seletor Retorna Múltiplos Elementos Sem Contexto

**Problema identificado:** Seletor genérico retorna múltiplos elementos, causando erro ao clicar

**Validação:**
- [ ] Seletor não retorna múltiplos elementos
- [ ] Quando necessário, usa contexto próximo a elemento único (título, seção)
- [ ] Não usa `.first()` genérico sem contexto

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - Múltiplos matches sem contexto
cy.get('a[href="#"]').click(); // Erro: 24 elementos encontrados

// ✅ CORRETO - Contexto próximo ao título
cy.contains('h5', 'Listagem de Devoluções').parent().within(() => {
  cy.get('a[href="#"]').first().click();
});
```

**Referência:**
- Lições aprendidas da implementação Devolução/Venda de Consignação
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md)

---

### ❌ Anti-Padrão 7: Usar `:has()` em Locators Estáticos

**Problema identificado:** Tentativa de usar `:has()` em locators (Cypress não suporta nativamente)

**Validação:**
- [ ] Locators não usam `:has()` (não é suportado pelo Cypress)
- [ ] Quando necessário buscar por contexto, usa `cy.contains().parent().next().within()` no Page Object
- [ ] Locators são seletores CSS válidos ou XPath

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - :has() não funciona no Cypress
campoProduto: 'form:has(h5:contains("Produtos")) input.autocompleter.typeahead'

// ✅ CORRETO - Usar cy.contains() no Page Object
cy.contains('h5', 'Produtos').parent().next().within(() => {
  cy.get('input.autocompleter.typeahead').first().clear().type(nomeProduto);
});
```

**Referência:**
- Lições aprendidas da implementação Devolução/Venda de Consignação
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md)

---

## ✅ Checklist de Validação Antes de Considerar Completo

Antes de considerar uma implementação completa, valide:

### Exploração
- [ ] Exploração autônoma pelo Cursor foi realizada (Fase 1 do template)
- [ ] Documento de descobertas foi criado
- [ ] Locators foram validados no DOM

### Implementação
- [ ] Testes são assertivos (sem condicionais excessivas)
- [ ] Estrutura foi validada, não assumida
- [ ] Locators usam IDs quando disponíveis
- [ ] Locators têm contexto apropriado

### Validação
- [ ] Testes executam e passam
- [ ] Documentação foi criada
- [ ] Checklist de anti-padrões foi validado
- [ ] Checklist de validação contínua foi validado

---

## 🔗 Referências

- [ADR-0013](../adr/0013-continuous-validation-checklist.md): Continuous Validation Checklist
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators
- [ADR-0016](../adr/0016-planning-before-implementation.md): Planning Before Implementation
- [Checklist de Validação Contínua](./checklist-validacao-continua.md)
- [Template de Plano](./template-plano-implementacao.md)
- [Guia de Decisões Rápidas](./guia-decisoes-rapidas.md)

---

**Última atualização:** 2025-12-12  
**Mantido por:** Equipe de Automação

