# Template Padronizado: Plano de Implementação

> **Context**: Este template segue os padrões identificados nas implementações de Gestor de Promoções e Gestor de Preços, baseado na [ADR-0016](../adr/0016-planning-before-implementation.md): Planning Before Implementation

## 📋 Quando Usar Este Template

Use este template quando:
- ✅ Implementar nova funcionalidade de teste (3+ arquivos)
- ✅ Criar novo módulo de testes
- ✅ Implementar fluxo completo (listagem + cadastro)
- ✅ Refatorar estrutura existente
- ✅ Adicionar múltiplos specs relacionados

**Não use para:**
- ❌ Correções simples (1 arquivo)
- ❌ Mudanças triviais (typos, formatação)
- ❌ Tarefas muito diretas

---

## 🎯 Estrutura do Plano

### 1. Cabeçalho e Objetivo

```markdown
# Plano: [Nome da Funcionalidade]

## Objetivo
[Descrição clara e concisa do que será implementado]
- O que será testado?
- Quais funcionalidades serão cobertas?
- Qual o escopo da implementação?

## Contexto
- Módulo: [ex: Produtos, Financeiro, Compras]
- Rota base: [ex: /produto/gestor-preco]
- Referência similar: [ex: Gestor de Promoções]
```

### 2. Referências e ADRs

```markdown
## Referências
- **Implementação similar**: [Nome da implementação de referência]
- **ADRs relevantes**:
  - [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
  - [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
  - [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
  - [ADR-0006](../adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
  - [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
  - [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
  - [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
  - [ADR-0016](../adr/0016-planning-before-implementation.md): Planning Before Implementation
```

### 3. Fases do Plano

#### Fase 1: Exploração e Descoberta (OBRIGATÓRIA)

**Por que é obrigatória:**
- Evita suposições sobre estrutura do DOM
- Identifica IDs e classes reais dos elementos
- Valida fluxo completo antes de implementar
- Reduz retrabalho significativamente

**IMPORTANTE:** A exploração manual deve ser realizada pelo Cursor usando as ferramentas de browser autônomas (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_evaluate`), não pelo desenvolvedor manualmente.

```markdown
## Fase 1: Exploração e Descoberta

### explorar-listagem-manual
**Objetivo**: Usar ferramentas de browser do Cursor para navegar até a listagem, inspecionar DOM e coletar todos os locators
- [ ] **IMPORTANTE**: Ler `baseUrl` do `cypress.config.js` e usar URLs relativas (ex: `/consignacao/requisicao`) ao invés de URLs absolutas
- [ ] Usar `browser_navigate` com URL relativa ao `baseUrl` configurado para fazer login e navegar até a listagem via menu ou URL direta
- [ ] Usar `browser_snapshot` para capturar estado inicial da página
- [ ] Usar `browser_evaluate` para inspecionar DOM da tabela (IDs, classes, estrutura)
- [ ] Coletar locators de botões principais (Novo, Pesquisa, Excluir) usando `browser_evaluate`
- [ ] Coletar locators de colunas da tabela usando `browser_evaluate`
- [ ] Coletar locators de ações (Editar, Excluir linha) usando `browser_evaluate`
- [ ] Validar estrutura completa da página usando `browser_snapshot` e `browser_evaluate`

### explorar-cadastro-manual
**Objetivo**: Usar ferramentas de browser do Cursor para acessar formulário de cadastro, preencher e salvar
- [ ] **IMPORTANTE**: Ler `baseUrl` do `cypress.config.js` e usar URLs relativas (ex: `/consignacao/requisicao/novo`) ao invés de URLs absolutas
- [ ] Usar `browser_click` para clicar em "Novo Cadastro" ou usar `browser_navigate` com URL relativa ao `baseUrl` para URL direta
- [ ] Usar `browser_evaluate` para inspecionar formulário completo (todos os campos)
- [ ] Identificar campos obrigatórios vs opcionais através de inspeção do DOM
- [ ] Usar `browser_type` e `browser_click` para preencher formulário completo (executar fluxo completo, não apenas inspecionar)
- [ ] Usar `browser_click` para salvar e validar fluxo de sucesso
- [ ] Usar `browser_evaluate` para coletar locators de todos os campos
- [ ] Usar `browser_evaluate` para coletar locators de botões (Salvar, Voltar)
- [ ] Usar `browser_snapshot` para identificar toasts/mensagens de sucesso

### explorar-funcionalidades-especificas-manual
**Objetivo**: Usar ferramentas de browser do Cursor para explorar funcionalidades específicas do módulo
- [ ] **IMPORTANTE**: Ler `baseUrl` do `cypress.config.js` e usar URLs relativas ao invés de URLs absolutas
- [ ] [Funcionalidade 1]: Usar `browser_click`, `browser_type`, `browser_evaluate` para testar e coletar locators
- [ ] [Funcionalidade 2]: Usar `browser_click`, `browser_type`, `browser_evaluate` para testar e coletar locators
- [ ] Validar fluxos alternativos usando ferramentas de browser
- [ ] Identificar edge cases através de exploração com browser

### documentar-descobertas
**Objetivo**: Documentar todos os locators e observações coletadas pela exploração autônoma do Cursor
- [ ] Criar documento temporário com todos os locators coletados via `browser_evaluate`
- [ ] Documentar estrutura do formulário identificada pela exploração
- [ ] Documentar fluxo completo passo a passo realizado pelo Cursor
- [ ] Documentar diferenças com implementação de referência
- [ ] Documentar comportamentos especiais (campos condicionais, validações) identificados
- [ ] Documentar mensagens de sucesso/erro capturadas via `browser_snapshot`

### validar-exploracao-executada
**Objetivo**: Validar que a exploração autônoma foi executada antes de prosseguir para Fase 2
- [ ] Verificar que documento temporário de descobertas foi criado
- [ ] Validar que locators principais foram identificados (IDs, classes)
- [ ] Validar que fluxo completo foi testado (não apenas estrutura inspecionada)
- [ ] **IMPORTANTE**: Não prosseguir para Fase 2 sem completar validação acima
```

#### Fase 2: Estrutura Base

```markdown
## Fase 2: Estrutura Base

### criar-estrutura-diretorios
**Objetivo**: Criar estrutura de diretórios necessária
- [ ] Criar `cypress/support/locators/[Modulo]/`
- [ ] Criar `cypress/support/pages/[Modulo]/`
- [ ] Validar estrutura criada

### criar-locators-listagem
**Objetivo**: Criar arquivo de locators da listagem
- [ ] Criar `[Modulo]ListagemLocators.js`
- [ ] Adicionar locators de botões principais
- [ ] Adicionar locators da tabela
- [ ] Adicionar locators de colunas
- [ ] Adicionar locators de ações
- [ ] Seguir padrão de nomenclatura
- [ ] Adicionar comentários descritivos

### criar-locators-cadastro
**Objetivo**: Criar arquivo de locators do cadastro
- [ ] Criar `[Modulo]CadastroLocators.js`
- [ ] Adicionar locators de campos do formulário
- [ ] Adicionar locators de botões
- [ ] Adicionar locators de seções
- [ ] Adicionar locators de toasts/mensagens
- [ ] Seguir padrão de nomenclatura
- [ ] Adicionar comentários descritivos

### criar-page-listagem
**Objetivo**: Criar Page Object da listagem
- [ ] Criar `[Modulo]ListagemPage.js`
- [ ] Implementar método `acessarListagem()`
- [ ] Implementar métodos de validação
- [ ] Implementar métodos de interação
- [ ] Seguir padrão Page Object (ADR-0002)
- [ ] Usar locators centralizados (ADR-0003)
- [ ] Adicionar JSDoc nos métodos

### criar-page-cadastro
**Objetivo**: Criar Page Object do cadastro
- [ ] Criar `[Modulo]CadastroPage.js`
- [ ] Implementar método `visit()`
- [ ] Implementar métodos de preenchimento
- [ ] Implementar métodos de validação
- [ ] Implementar métodos de interação
- [ ] Seguir padrão Page Object (ADR-0002)
- [ ] Usar locators centralizados (ADR-0003)
- [ ] Adicionar JSDoc nos métodos
- [ ] Implementar métodos encadeáveis (return this)
```

#### Fase 3: Implementação de Testes

```markdown
## Fase 3: Implementação de Testes

### criar-spec-listagem
**Objetivo**: Criar spec de testes da listagem
- [ ] Criar `cypress/e2e/[modulo]/[nome]-listagem.spec.js`
- [ ] Implementar `beforeEach` com login apropriado
- [ ] Implementar testes de listagem
- [ ] Aplicar tags (ADR-0010): `['@modulo', '@funcionalidade', '@regressivo']`
- [ ] Usar Page Objects (ADR-0002)
- [ ] Validar estrutura do teste

### criar-spec-cadastro
**Objetivo**: Criar spec de testes do cadastro
- [ ] Criar `cypress/e2e/[modulo]/[nome].spec.js`
- [ ] Implementar `beforeEach` com login apropriado
- [ ] Implementar testes de cadastro
- [ ] Usar Faker para dados dinâmicos (ADR-0009)
- [ ] Aplicar tags (ADR-0010)
- [ ] Usar Page Objects (ADR-0002)
- [ ] Validar estrutura do teste

### adicionar-specs-config
**Objetivo**: Adicionar specs ao specPattern
- [ ] Abrir `cypress.config.js`
- [ ] Localizar bloco apropriado (ex: `// produto`)
- [ ] Adicionar spec de listagem
- [ ] Adicionar spec de cadastro
- [ ] Manter ordem lógica
- [ ] Validar sintaxe
```

#### Fase 4: Documentação (OBRIGATÓRIA)

```markdown
## Fase 4: Documentação

### criar-documentacao
**Objetivo**: Criar documentação arquitetural completa
- [ ] Criar `docs/cases/architecture-[nome].md`
- [ ] Criar `docs/cases/architecture-[nome]-listagem.md` (se aplicável)
- [ ] Seguir template de documentação
- [ ] Incluir seção Objetivo
- [ ] Incluir seção Estrutura de arquivos
- [ ] Incluir seção Imports e dependências
- [ ] Incluir seção Estrutura do teste (todos os `it`)
- [ ] Incluir seção Padrões e boas práticas
- [ ] Incluir seção Referências (ADRs)
- [ ] Validar documentação completa

### atualizar-testes-md
**Objetivo**: Atualizar índice de testes
- [ ] Abrir `docs/testes.md`
- [ ] Localizar seção apropriada (ex: `## ??? produtos`)
- [ ] Adicionar seção do novo spec
- [ ] Incluir título do arquivo
- [ ] Incluir nome da suite
- [ ] Listar todos os testes (`it`)
- [ ] Manter ordem alfabética ou lógica

### atualizar-readme-cases
**Objetivo**: Atualizar índice de documentações
- [ ] Abrir `docs/cases/README.md`
- [ ] Localizar seção apropriada
- [ ] Adicionar nova documentação
- [ ] Manter ordem organizada
- [ ] Validar links
```

#### Fase 5: Validação e Limpeza

```markdown
## Fase 5: Validação e Limpeza

### executar-testes
**Objetivo**: Executar testes e validar implementação
- [ ] Executar spec de listagem
- [ ] Validar que todos os testes passam
- [ ] Executar spec de cadastro
- [ ] Validar que todos os testes passam
- [ ] Corrigir erros se necessário
- [ ] Re-executar até todos passarem

### limpar-arquivos-temporarios
**Objetivo**: Remover arquivos temporários de exploração
- [ ] Remover `docs/temp-*.md` (se criados)
- [ ] Validar que não há arquivos temporários

### validar-checklist-final
**Objetivo**: Validar checklist completo
- [ ] Spec criado em `cypress/e2e/...`
- [ ] Page Objects e Locators criados
- [ ] Spec adicionado ao `specPattern`
- [ ] Documentação criada
- [ ] `docs/testes.md` atualizado
- [ ] `docs/cases/README.md` atualizado
- [ ] Tags aplicadas
- [ ] Testes executados e passando
```

---

## ⚠️ Armadilhas Comuns na Exploração

Esta seção documenta erros comuns que podem ocorrer durante a exploração autônoma e como evitá-los.

### 1. Usar URL Absoluta ao Invés de Relativa

**Problema:** Usar URLs absolutas hardcoded ao invés de usar o `baseUrl` configurado no `cypress.config.js` pode levar a:
- Navegação para ambiente incorreto
- Inconsistência entre exploração e testes
- Dificuldade de manutenção quando `baseUrl` muda

**❌ Errado:**
```javascript
browser_navigate('https://stage-release.softcomshop.com.br/auth/login')
```

**✅ Correto:**
```javascript
// Ler baseUrl do cypress.config.js e usar URL relativa
browser_navigate('/auth/login')
```

**Solução:** Sempre ler o `baseUrl` do `cypress.config.js` e usar URLs relativas nas chamadas de `browser_navigate`.

---

### 2. Não Executar Fluxo Completo (Apenas Inspecionar DOM)

**Problema:** Apenas inspecionar o DOM sem executar o fluxo completo pode levar a:
- Locators incorretos (elementos podem mudar após interações)
- Falta de conhecimento sobre comportamentos dinâmicos
- Descoberta tardia de problemas no fluxo

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

---

### 3. Assumir Estrutura Baseada em Código Similar

**Problema:** Criar locators baseados em implementações similares sem explorar pode levar a:
- Locators incorretos (estrutura pode ser diferente)
- Retrabalho quando testes falham
- Suposições incorretas sobre comportamento

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

---

### 4. Não Documentar Descobertas Imediatamente

**Problema:** Explorar mas não documentar descobertas imediatamente pode levar a:
- Perda de informações importantes
- Necessidade de re-explorar
- Locators esquecidos ou incorretos

**❌ Errado:**
```javascript
// Explorar mas não documentar
browser_evaluate(() => {
  // Encontrou locators mas não salvou
});
// Continuar exploração sem documentar
```

**✅ Correto:**
```javascript
// Criar documento temporário durante exploração
// docs/temp-descobertas.md
// Documentar cada descoberta imediatamente:
// - Campo Cliente: #auto_cliente_id
// - Botão Salvar: #btn-salvar
// - Tabela: .table.table-itens
```

**Solução:** Criar documento temporário (`docs/temp-*.md`) durante exploração e documentar todas as descobertas imediatamente, incluindo locators, estrutura e comportamentos especiais.

---

### 5. Assumir que Módulos Similares São Idênticos

**Problema:** Assumir que módulos similares (ex: Requisição vs Devolução/Venda) têm estrutura idêntica

**Exemplo:**
- Requisição: Campos "Quantidade" e "Preço" na seção de produtos
- Devolução/Venda: Campos "Devolução" e "Venda" (quantidades)

**Solução:** Sempre explorar completamente antes de reutilizar código. Documentar diferenças encontradas.

---

### 6. Usar `:has()` em Locators (Não Suportado pelo Cypress)

**Problema:** Tentar usar `form:has(h5:contains("Produtos"))` em locators estáticos

**Exemplo:**
```javascript
// ❌ Não funciona - Cypress não suporta :has()
campoProduto: 'form:has(h5:contains("Produtos")) input.autocompleter.typeahead'

// ✅ Correto - Usar cy.contains() no Page Object
cy.contains('h5', 'Produtos').parent().next().within(() => {
  cy.get('input.autocompleter.typeahead').first().clear().type(nomeProduto);
});
```

**Solução:** Usar `cy.contains()` + `.parent().next().within()` no Page Object quando necessário buscar por contexto.

---

## 📝 Padrões de Nomenclatura

### TODOs

**Formato**: `[acao]-[objeto]-[contexto]`

**Ações comuns:**
- `explorar-*`: Exploração autônoma pelo Cursor usando ferramentas de browser
- `criar-*`: Criação de arquivos/estrutura
- `adicionar-*`: Adição a arquivos existentes
- `atualizar-*`: Atualização de arquivos existentes
- `documentar-*`: Documentação
- `executar-*`: Execução de testes/comandos
- `validar-*`: Validação

**Exemplos:**
- ✅ `explorar-listagem-manual`
- ✅ `criar-locators-cadastro`
- ✅ `criar-page-listagem`
- ✅ `adicionar-specs-config`
- ✅ `atualizar-testes-md`
- ❌ `fazer-locators` (muito genérico)
- ❌ `criar-tudo` (não específico)

### Arquivos

**Locators:**
- `[Modulo]ListagemLocators.js`
- `[Modulo]CadastroLocators.js`

**Page Objects:**
- `[Modulo]ListagemPage.js`
- `[Modulo]CadastroPage.js`

**Specs:**
- `[nome]-listagem.spec.js`
- `[nome].spec.js`

**Documentação:**
- `architecture-[nome].md`
- `architecture-[nome]-listagem.md`

---

## 🔗 Dependências Entre Fases

**IMPORTANTE:** A Fase 1 (Exploração) é **OBRIGATÓRIA** e deve ser completada antes de iniciar qualquer outra fase. Não inicie a Fase 2 sem completar a Fase 1 e validar que a exploração foi executada.

```
Fase 1 (Exploração) - OBRIGATÓRIA ANTES DE QUALQUER IMPLEMENTAÇÃO
    ├─ explorar-*-manual (deve ser executado primeiro)
    ├─ documentar-descobertas (deve ser executado após exploração)
    └─ validar-exploracao-executada (deve validar antes de prosseguir)
    ↓
Fase 2 (Estrutura Base) - SÓ INICIAR APÓS FASE 1 COMPLETA
    ├─ criar-estrutura-diretorios
    ├─ criar-locators-* (depende de: validar-exploracao-executada e documentar-descobertas)
    └─ criar-page-* (depende de: criar-locators-*)
    ↓
Fase 3 (Implementação)
    ├─ criar-spec-* (depende de: criar-page-*)
    └─ adicionar-specs-config (depende de: criar-spec-*)
    ↓
Fase 4 (Documentação)
    ├─ criar-documentacao (depende de: criar-spec-*)
    ├─ atualizar-testes-md (depende de: criar-spec-*)
    └─ atualizar-readme-cases (depende de: criar-documentacao)
    ↓
Fase 5 (Validação)
    └─ executar-testes (depende de: todas as fases anteriores)
```

---

## ✅ Checklist de Qualidade do Plano

Antes de considerar o plano completo, valide:

### Estrutura
- [ ] Cabeçalho com objetivo claro
- [ ] Referências a implementações similares
- [ ] ADRs relevantes listados
- [ ] Fases bem definidas

### Exploração
- [ ] Exploração autônoma pelo Cursor incluída (OBRIGATÓRIA) - usando ferramentas de browser
- [ ] Instrução sobre uso do baseUrl do cypress.config.js incluída em todos os TODOs de exploração
- [ ] Validação de exploração executada incluída (validar-exploracao-executada)
- [ ] Documentação de descobertas incluída
- [ ] Todos os contextos explorados (listagem, cadastro, etc)
- [ ] Fluxo completo executado durante exploração (não apenas inspeção de DOM)

### Implementação
- [ ] Estrutura de diretórios definida
- [ ] Locators antes de Page Objects
- [ ] Page Objects antes de Specs
- [ ] Specs antes de documentação

### Documentação
- [ ] Documentação arquitetural incluída
- [ ] Atualização de índices incluída
- [ ] Referências a ADRs incluídas

### Validação
- [ ] Execução de testes incluída
- [ ] Limpeza de arquivos temporários incluída
- [ ] Checklist final incluído

---

## 🎯 Exemplo Completo

```markdown
# Plano: Gestor de Preços

## Objetivo
Implementar testes automatizados para o módulo Gestor de Preços, cobrindo:
- Listagem de preços
- Cadastro de reajuste de preço
- Validação de tabela de itens afetados

## Contexto
- Módulo: Produtos
- Rota base: /produto/gestor-preco
- Referência similar: Gestor de Promoções

## Referências
- **Implementação similar**: Gestor de Promoções
- **ADRs relevantes**: [listar ADRs]

## Fase 1: Exploração e Descoberta
- [ ] explorar-listagem-manual
- [ ] explorar-cadastro-manual
- [ ] documentar-descobertas

## Fase 2: Estrutura Base
- [ ] criar-estrutura-diretorios
- [ ] criar-locators-listagem
- [ ] criar-locators-cadastro
- [ ] criar-page-listagem
- [ ] criar-page-cadastro

## Fase 3: Implementação
- [ ] criar-spec-listagem
- [ ] criar-spec-cadastro
- [ ] adicionar-specs-config

## Fase 4: Documentação
- [ ] criar-documentacao
- [ ] atualizar-testes-md
- [ ] atualizar-readme-cases

## Fase 5: Validação
- [ ] executar-testes
- [ ] limpar-arquivos-temporarios
- [ ] validar-checklist-final
```

---

## 🎯 Exemplo Real de Implementação

**Para ver este template aplicado na prática, consulte:**

📖 **[Exemplo de Implementação: Módulo Funcionários](./exemplo-implementacao-funcionarios.md)**

Este case study completo demonstra:
- ✅ Aplicação prática de todas as 5 fases do template
- ✅ Métricas e resultados reais (18 testes, 88.9% de sucesso)
- ✅ Lições aprendidas específicas da implementação
- ✅ Problemas encontrados e soluções aplicadas
- ✅ 100% de conformidade com ADRs

**Use este exemplo como referência ao criar seu próprio plano de implementação.**

---

## 📚 Referências

- [ADR-0016: Planning Before Implementation](../adr/0016-planning-before-implementation.md)
- [ADR-0006: Mandatory Documentation](../adr/0006-mandatory-documentation-for-new-tests.md)
- [Processo de Documentação](./processo-documentacao.md)
- [Guia de Decisões Rápidas](./guia-decisoes-rapidas.md)
- [Exemplo Real: Módulo Funcionários](./exemplo-implementacao-funcionarios.md)

---

## 💡 Lições Aprendidas

1. **Exploração autônoma pelo Cursor primeiro**: Usar ferramentas de browser (`browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_evaluate`) evita retrabalho e garante locators corretos
2. **Sempre usar baseUrl do cypress.config.js**: Ler o `baseUrl` configurado e usar URLs relativas garante consistência entre exploração e testes, evitando navegação para ambiente incorreto
3. **Executar fluxo completo durante exploração**: Não apenas inspecionar DOM, mas executar fluxo completo (preencher, salvar, validar) revela comportamentos dinâmicos e locators corretos
4. **Validar que exploração foi executada**: Adicionar validação antes de prosseguir para Fase 2 garante que exploração não foi pulada acidentalmente
5. **Documentar descobertas imediatamente**: Criar documento temporário durante exploração e documentar tudo encontrado evita perda de informações importantes
6. **Seguir ordem de dependências**: Evita erros e retrabalho
7. **Validar após cada fase**: Detecta problemas cedo
8. **Referenciar implementações existentes**: Mantém consistência, mas sempre explorar primeiro antes de comparar
9. **Sempre verificar visibilidade do formulário de pesquisa**: Verificar se formulário já está visível antes de clicar no botão toggle previne cliques desnecessários e torna código mais robusto
10. **Módulos similares podem ter diferenças sutis**: Sempre explorar completamente antes de assumir que módulos similares são idênticos - pequenas diferenças podem quebrar testes

---

**Última atualização**: 2025-01-XX  
**Versão**: 1.0

