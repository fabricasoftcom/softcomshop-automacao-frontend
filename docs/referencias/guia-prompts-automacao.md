# Guia de Prompts para Automação com Cursor

> **Context**: Este guia contém templates de prompts padronizados para utilizar as capacidades de navegação autônoma do Cursor em conformidade com as ADRs do projeto, especialmente a [ADR-0016](../adr/0016-planning-before-implementation.md).

---

## 🚀 Prompt Completo (Rotina Completa)

**Use este prompt quando quiser que o Cursor execute TODO o processo de criação de testes:**

```
Gostaria de criar uma automação para a tela de [INSERIR TELA AQUI] seguindo a ADR-0016.

Por favor, inicie a Fase 1 (Exploração):
1. Use o browser_navigate para acessar a aplicação.
2. Faça login (os dados estão em users.json).
3. Vá até a tela indicada.
4. Mapeie os campos e botões principais usando browser_evaluate para garantir que os seletores sejam válidos e únicos (preferência por ID).
5. Me apresente um resumo dos locators encontrados antes de prosseguirmos para a criação dos arquivos.
```

**Quando usar:** Para criar testes do zero, quando você quer que o Cursor faça tudo automaticamente desde a exploração até a criação dos arquivos.

**Substitua:** `[INSERIR TELA AQUI]` pelo nome da tela/funcionalidade que deseja automatizar.

---

## 📋 Fase 1: Exploração e Mapeamento (Discovery)

### Prompt Mestre de Discovery

**Use este prompt quando quiser apenas explorar uma tela:**

```
Siga o protocolo de Discovery do @guia-prompts-automacao.md para a tela de [NOME DA TELA].

Por favor, inicie a Fase 1 (Exploração):
1. Use o browser_navigate para acessar a aplicação
2. Faça login (os dados estão em users.json) - use cy.login() para funcionalidades fiscais ou cy.loginArmazenandoSessao() para outras
3. Vá até a tela indicada
4. Mapeie os campos e botões principais usando browser_evaluate para garantir que os seletores sejam válidos e únicos (preferência por ID)
5. Me apresente um resumo dos locators encontrados antes de prosseguirmos para a criação dos arquivos
```

**Quando usar:** Quando você quer apenas mapear a tela sem criar código ainda.

### Prompt para Listagem

```
Explore a tela de listagem de [MÓDULO] seguindo o @guia-prompts-automacao.md:
1. Navegue até a listagem
2. Identifique locators da tabela (colunas, linhas, ações)
3. Identifique botões principais (Novo, Pesquisar, Excluir)
4. Identifique formulário de pesquisa (se houver)
5. Documente todos os locators encontrados priorizando IDs
```

**Quando usar:** Para explorar especificamente telas de listagem.

### Prompt para Cadastro

```
Explore o formulário de cadastro de [MÓDULO] seguindo o @guia-prompts-automacao.md:
1. Navegue até o formulário de cadastro
2. Identifique todos os campos do formulário (obrigatórios e opcionais)
3. Execute o fluxo completo: preencher → salvar → validar
4. Identifique locators de botões (Salvar, Voltar, Cancelar)
5. Identifique locators de toasts/mensagens de sucesso
6. Documente todos os locators encontrados priorizando IDs e contextos (modais, painéis)
```

**Quando usar:** Para explorar especificamente formulários de cadastro.

### Prompt para Formulários Complexos

```
Explore o formulário complexo de [MÓDULO] seguindo o @guia-prompts-automacao.md:
1. Identifique seções do formulário (abas, painéis, modais)
2. Para cada seção, mapeie campos e botões
3. Identifique campos condicionais (que aparecem baseado em outros campos)
4. Execute fluxos alternativos
5. Documente locators com contexto apropriado (.modal #campo, .painel #botao)
```

**Quando usar:** Para formulários com múltiplas seções, abas ou lógica condicional.

---

## 📊 Mapeamento de Cenários

### Prompt para Mapear Cenários

```
Com base na exploração realizada da tela de [NOME DA TELA], mapeie todos os cenários de teste necessários para cobertura total:

1. **Cenários de Sucesso (Happy Path)**
   - Identifique o fluxo principal completo
   - Documente cada passo e resultado esperado

2. **Cenários de Validação**
   - Campos obrigatórios não preenchidos
   - Formatos inválidos
   - Validações de negócio

3. **Cenários de Erro**
   - Erros de API
   - Timeouts
   - Erros de permissão

4. **Cenários de Borda (Edge Cases)**
   - Valores limites
   - Campos vazios vs null
   - Estados especiais

5. **Fluxos Alternativos**
   - Caminhos diferentes no mesmo fluxo
   - Opções condicionais
   - Múltiplas formas de executar a mesma ação

6. **Cenários de Integração**
   - Interação entre componentes
   - Dependências entre telas
   - Fluxos end-to-end

Para cada cenário, documente:
- Descrição clara
- Pré-condições
- Passos detalhados
- Resultado esperado
- Criticidade (Alta/Média/Baixa)
- Prioridade (1-5)

Crie uma matriz de cenários organizada por tipo e prioridade.
```

**Quando usar:** Após a exploração, antes de criar os testes, para garantir cobertura completa.

### Estrutura de Documentação de Cenário

```markdown
## Cenário 1: Cadastro com sucesso
- **Descrição**: Cadastrar novo registro com todos os campos válidos
- **Pré-condições**: Usuário logado, permissões adequadas
- **Passos**: 
  1. Acessar tela de cadastro
  2. Preencher todos os campos obrigatórios
  3. Clicar em Salvar
- **Resultado Esperado**: Toast de sucesso, registro salvo, redirecionamento
- **Criticidade**: Alta
- **Prioridade**: 1
```

---

## 🏗️ Fase 2: Geração de Estrutura

### Prompt para Criar Locators

```
Com base na exploração realizada, crie o arquivo de Locators:
1. Crie em cypress/support/locators/[Modulo]/[Nome]Locators.js
2. Use PascalCase para o nome do objeto
3. Priorize IDs quando disponíveis
4. Use contextos quando necessário (.modal #elemento)
5. Adicione comentários descritivos
6. Siga a ADR-0015 (Priorizar IDs e Contexto)
```

**Quando usar:** Após a exploração e mapeamento de cenários, para criar os arquivos de locators.

### Prompt para Criar Page Object

```
Com base nos Locators criados, crie o Page Object:
1. Crie em cypress/support/pages/[Modulo]/[Nome]Page.js
2. Importe o arquivo de Locators
3. Crie métodos semânticos (preencherFormulario, clicarSalvar)
4. Não use cy.wait() fixo - use validações condicionais
5. Siga a ADR-0002 (Page Object Pattern)
6. Adicione JSDoc nos métodos
```

**Quando usar:** Após criar os Locators, para criar os Page Objects.

### Prompt para Criar Spec

```
Com base no Page Object criado, crie o spec de teste:
1. Crie em cypress/e2e/[modulo]/[nome].spec.js
2. Use o comando de login apropriado (fiscal vs geral)
3. Use Faker para dados dinâmicos (ADR-0009)
4. Aplique tags: ['@modulo', '@funcionalidade', '@regressivo']
5. Adicione ao specPattern no cypress.config.js
6. Siga a estrutura padrão do projeto
```

**Quando usar:** Após criar os Page Objects, para criar os arquivos de teste.

---

## ✅ Fase 3: Validação e Otimização

### Prompt para Validar Implementação

```
Valide a implementação criada seguindo o checklist:
1. Verifique conformidade com ADR-0002 (Page Objects)
2. Verifique conformidade com ADR-0003 (Locators separados)
3. Verifique conformidade com ADR-0015 (IDs priorizados)
4. Verifique que não há cy.wait() fixo
5. Verifique que não há seletores hardcoded no Page Object
6. Execute os testes e valide que passam
```

**Quando usar:** Após criar os testes, para validar que estão corretos e seguem as ADRs.

### Prompt para Otimizar Código Existente

```
Analise e otimize o código de teste em [ARQUIVO]:
1. Identifique duplicação de código
2. Identifique seletores hardcoded (mover para Locators)
3. Identifique cy.wait() fixos (substituir por validações condicionais)
4. Identifique métodos não utilizados
5. Identifique complexidade excessiva
6. Proponha refatorações seguindo as ADRs do projeto
```

**Quando usar:** Para melhorar código de testes existente que não segue as melhores práticas.

### Prompt para Adicionar Testes a Módulo Existente

```
Adicione testes para [FUNCIONALIDADE] no módulo [MÓDULO] existente:
1. Explore a nova funcionalidade seguindo o protocolo de Discovery
2. Reutilize Locators e Page Objects existentes quando possível
3. Estenda Page Objects existentes ao invés de criar novos
4. Mantenha consistência com testes existentes
5. Siga os mesmos padrões de nomenclatura e estrutura
```

**Quando usar:** Para adicionar novos testes a um módulo que já possui testes automatizados.

---

## 🎯 Como Usar Este Guia

### Método 1: Referência com @

```
Siga o protocolo de Discovery do @guia-prompts-automacao.md para a tela de Cadastro de Produtos
```

**Vantagem:** Rápido, o Cursor lê o guia automaticamente.

### Método 2: Copiar e Colar Prompt Completo

Copie o prompt completo da seção "🚀 Prompt Completo (Rotina Completa)" e substitua `[INSERIR TELA AQUI]` pelo nome da tela.

**Vantagem:** Controle total sobre o que o Cursor vai fazer.

### Método 3: Usar Prompt Específico

Copie o prompt específico da fase que você precisa (Discovery, Locators, Page Object, Spec) e adapte conforme necessário.

**Vantagem:** Flexibilidade para usar apenas a parte que precisa.

---

## ⚠️ Armadilhas Comuns

### 1. Usar URL Absoluta ao Invés de Relativa

**Problema:** Usar URLs absolutas hardcoded ao invés de usar o `baseUrl` configurado no `cypress.config.js`.

**❌ Errado:**
```
browser_navigate('https://stage-release.softcomshop.com.br/auth/login')
```

**✅ Correto:**
```
// Ler baseUrl do cypress.config.js e usar URL relativa
browser_navigate('/auth/login')
```

**Solução:** Sempre ler o `baseUrl` do `cypress.config.js` e usar URLs relativas nas chamadas de `browser_navigate`.

### 2. Não Executar Fluxo Completo (Apenas Inspecionar DOM)

**Problema:** Apenas inspecionar o DOM sem executar o fluxo completo pode levar a locators incorretos.

**❌ Errado:**
```javascript
// Apenas inspecionar DOM sem testar fluxo
browser_evaluate(() => {
  return document.querySelector('#campo-cliente');
});
```

**✅ Correto:**
```javascript
// Executar fluxo completo primeiro
browser_type('campo-cliente', 'SOFTCOM');
browser_click('resultado-cliente');
browser_click('btn-salvar');
// Depois coletar locators
browser_evaluate(() => {
  return document.querySelector('#campo-cliente');
});
```

**Solução:** Sempre executar o fluxo completo usando `browser_type`, `browser_click` antes de coletar locators com `browser_evaluate`.

### 3. Assumir Estrutura Baseada em Código Similar

**Problema:** Criar locators baseados em implementações similares sem explorar pode levar a locators incorretos.

**❌ Errado:**
```javascript
// Assumir que campo cliente tem mesmo ID que em outro módulo
const campoCliente = '#auto_cliente_nome'; // Pode estar errado!
```

**✅ Correto:**
```javascript
// Sempre explorar primeiro
browser_evaluate(() => {
  const campo = document.querySelector('input[placeholder*="Cliente"]');
  return campo ? campo.id : null;
});
// Depois comparar com implementações similares
```

**Solução:** Sempre explorar primeiro usando ferramentas de browser, depois comparar com implementações similares para validar padrões.

### 4. Não Documentar Descobertas Imediatamente

**Problema:** Explorar mas não documentar descobertas imediatamente pode levar a perda de informações importantes.

**Solução:** Criar documento temporário (`docs/temp-*.md`) durante exploração e documentar todas as descobertas imediatamente, incluindo locators, estrutura e comportamentos especiais.

### 5. Assumir que Módulos Similares São Idênticos

**Problema:** Assumir que módulos similares (ex: Requisição vs Devolução/Venda) têm estrutura idêntica.

**Solução:** Sempre explorar completamente antes de reutilizar código. Documentar diferenças encontradas.

### 6. Usar `:has()` em Locators (Não Suportado pelo Cypress)

**Problema:** Tentar usar `form:has(h5:contains("Produtos"))` em locators estáticos.

**❌ Errado:**
```javascript
campoProduto: 'form:has(h5:contains("Produtos")) input.autocompleter.typeahead'
```

**✅ Correto:**
```javascript
// Usar cy.contains() no Page Object
cy.contains('h5', 'Produtos').parent().next().within(() => {
  cy.get('input.autocompleter.typeahead').first().clear().type(nomeProduto);
});
```

**Solução:** Usar `cy.contains()` + `.parent().next().within()` no Page Object quando necessário buscar por contexto.

---

## 📚 Referências

- [ADR-0016: Planning Before Implementation](../adr/0016-planning-before-implementation.md)
- [ADR-0015: Prioritize IDs and Context in Locators](../adr/0015-prioritize-ids-and-context-in-locators.md)
- [ADR-0002: Page Object Pattern](../adr/0002-use-page-object-pattern.md)
- [ADR-0003: Separate Locators](../adr/0003-separate-locators-from-page-objects.md)
- [ADR-0009: Faker for Dynamic Data](../adr/0009-use-faker-for-dynamic-test-data.md)
- [Template de Plano de Implementação](./template-plano-implementacao.md)
- [Guia de Decisões Rápidas](./guia-decisoes-rapidas.md)

---

**Última atualização:** 2025-12-12  
**Versão:** 1.0

