# 📝 Processo de Criação de Documentações Arquiteturais

**Versão:** 1.0  
**Data:** 2024-12-19  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este documento descreve o processo padronizado para criar documentações arquiteturais de casos de teste no projeto. Seguir este processo garante consistência, qualidade e facilita a manutenção.

**Quando usar:**
- Ao criar uma nova documentação arquitetural
- Ao atualizar uma documentação existente
- Ao revisar documentações

---

## 🎯 Objetivo

Criar documentações que:
- ✅ Descrevam claramente a arquitetura de cada teste
- ✅ Facilitem a compreensão e manutenção
- ✅ Referenciem ADRs relacionadas
- ✅ Sigam um template padronizado
- ✅ Sejam úteis para desenvolvedores, revisores e novos membros

---

## 📐 Template Padronizado

### Estrutura Básica

```markdown
# Arquitetura dos casos de teste: [Nome da Funcionalidade]

## Objetivo

[Descrição clara do que o teste valida]

**Funcionalidades cobertas:**
- Funcionalidade 1
- Funcionalidade 2

**Cenários principais:**
- Cenário 1
- Cenário 2

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/[caminho]/[arquivo].spec.js` - [Descrição]

### Page Objects
- `cypress/support/pages/[caminho]/[Page].js` - [Descrição]

### Locators
- `cypress/support/locators/[Locator].js` - [Descrição]

### Factory (se aplicável)
- `cypress/support/factory/[factory].js` - [Descrição]

---

## Imports e dependências

### Page Objects
```javascript
import [Page] from "[caminho]";
```

### Locators
[Descrição de como os locators são importados]

### Commands
- `cy.[comando]()` - [Descrição] (ADR-XXXX)

---

## Estrutura do teste

### Suite: [Nome da Suite]

**Tags:** `['@tag1', '@tag2', '@regressivo']` (ADR-0010)

#### `it('[Descrição do teste]')`

**Fluxo completo:**
1. **Acesso:**
   - [Passo 1]
   - [Passo 2]

2. **Preenchimento:**
   - [Passo 1]
   - [Passo 2]

3. **Validação:**
   - [Validação 1]
   - [Validação 2]

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002)
- ✅ **Separate Locators** (ADR-0003)
- ✅ **Session Persistence** (ADR-0004)
- ✅ **Faker for Dynamic Data** (ADR-0009)
- ✅ **Tags for Filtering** (ADR-0010)
- ✅ **Conditional Intercepts** (ADR-0011)

### Boas Práticas
- [Prática 1]
- [Prática 2]

### Observações
- [Observação importante]

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering

### Documentação Relacionada
- [Link para documentação relacionada]
```

---

## ✅ Checklist de Validação

Antes de considerar uma documentação completa, verifique:

### Estrutura
- [ ] Título descritivo e claro
- [ ] Seção "Objetivo" completa
- [ ] Seção "Estrutura de arquivos" com todos os arquivos relevantes
- [ ] Seção "Imports e dependências" detalhada
- [ ] Seção "Estrutura do teste" com todos os `it` documentados
- [ ] Seção "Padrões e boas práticas" com ADRs referenciadas
- [ ] Seção "Referências" com links corretos

### Conteúdo
- [ ] Objetivo descreve claramente o que é testado
- [ ] Funcionalidades cobertas listadas
- [ ] Cenários principais descritos
- [ ] Todos os arquivos relevantes listados
- [ ] Imports documentados corretamente
- [ ] Fluxo de cada teste detalhado passo a passo
- [ ] Padrões aplicados identificados
- [ ] ADRs relacionadas referenciadas

### Qualidade
- [ ] Linguagem clara e objetiva
- [ ] Exemplos de código quando necessário
- [ ] Links funcionando
- [ ] Formatação consistente
- [ ] Sem erros de ortografia ou gramática

---

## 🚀 Guia Passo a Passo

### 1. Preparação
1. Identifique o spec que precisa de documentação
2. Leia o spec completo para entender o que ele testa
3. Identifique Page Objects, Locators e Factories usados
4. Identifique ADRs relacionadas

### 2. Criação
1. Crie o arquivo `docs/cases/architecture-[nome].md`
2. Use o template acima como base
3. Preencha cada seção cuidadosamente
4. Adicione exemplos de código quando útil
5. Referencie ADRs relacionadas

### 3. Revisão
1. Use o checklist de validação
2. Verifique se todas as seções estão completas
3. Confirme que os links estão corretos
4. Revise a linguagem e clareza

### 4. Finalização
1. Adicione ao índice (`docs/cases/README.md`)
2. Atualize `docs/testes.md` se necessário
3. Adicione ao `specPattern` em `cypress.config.js` (se novo spec)
4. Commit com mensagem descritiva

---

## 📚 Boas Práticas

### Objetivo
- ✅ Seja específico sobre o que o teste valida
- ✅ Liste funcionalidades cobertas
- ✅ Descreva cenários principais
- ❌ Evite descrições genéricas

### Estrutura de Arquivos
- ✅ Liste todos os arquivos relevantes
- ✅ Organize por tipo (specs, Page Objects, Locators, Factories)
- ✅ Use caminhos relativos corretos
- ❌ Não omita arquivos importantes

### Imports e Dependências
- ✅ Documente todos os imports
- ✅ Explique como os locators são importados
- ✅ Liste comandos customizados usados
- ✅ Referencie ADRs quando aplicável
- ❌ Não deixe imports importantes de fora

### Estrutura do Teste
- ✅ Documente cada `it` individualmente
- ✅ Descreva o fluxo passo a passo
- ✅ Organize por etapas (Acesso, Preenchimento, Validação)
- ✅ Inclua tags usadas
- ❌ Não seja vago sobre os passos

### Padrões e Boas Práticas
- ✅ Identifique padrões aplicados
- ✅ Liste ADRs relacionadas
- ✅ Documente boas práticas específicas
- ✅ Adicione observações importantes
- ❌ Não omita padrões relevantes

---

## 🔗 Referências a ADRs

### Como Referenciar

**No texto:**
```markdown
- **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para login persistente
```

**Na seção de Referências:**
```markdown
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
```

### ADRs Principais

| ADR | Tópico | Quando Referenciar |
|-----|--------|-------------------|
| ADR-0002 | Page Object Pattern | Sempre que usar Page Objects |
| ADR-0003 | Separate Locators | Sempre que usar Locators separados |
| ADR-0004 | Session Persistence | Sempre que usar `cy.login()` ou `cy.loginArmazenandoSessao()` |
| ADR-0009 | Faker for Dynamic Data | Sempre que usar Faker para gerar dados |
| ADR-0010 | Tags for Filtering | Sempre que usar tags no `describe` |
| ADR-0011 | Conditional Intercepts | Sempre que usar intercepts condicionais |

---

## 📝 Exemplos

### Exemplo 1: Teste Simples

```markdown
## Estrutura do teste

### Suite: Cadastro de Novo Orçamento

**Tags:** `['@orcamento', '@cadastro-orcamento', '@regressivo']` (ADR-0010)

#### `it('Deve preencher e salvar um novo orçamento com sucesso')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa página de cadastro via URL direta (`/orcamento/novo`)

2. **Geração de Dados:**
   - Gera dados aleatórios usando `generateRandomDadosOrcamento()` (ADR-0009)

3. **Preenchimento:**
   - Preenche dados básicos do orçamento
   - Adiciona produto ao orçamento
   - Seleciona condição de pagamento

4. **Validação:**
   - Salva o orçamento
   - Valida toast de sucesso
```

### Exemplo 2: Teste Iterativo

```markdown
## Estrutura do teste

### Suite: Relatório de Caixa

**Tags:** `['@relatorios', '@caixa', '@regressivo']` (ADR-0010)

#### `it('Deve permitir pesquisar o relatório de Caixa com período diário')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa relatório de caixa via menu

2. **Iteração:**
   - Itera sobre turnos 1-6 usando `Cypress._.range(1, 7)`

3. **Para cada turno:**
   - Seleciona tipo 'analitico'
   - Preenche período (hoje 00:00:00 - 23:59:59)
   - Preenche turno
   - Pesquisa e valida URL

4. **Validação:**
   - Verifica erro 500 visual após cada pesquisa (ADR-0011)
```

---

## 🔄 Manutenção

### Atualização de Documentações Existentes
1. Identifique o que mudou no teste
2. Atualize as seções relevantes
3. Mantenha histórico de mudanças se necessário
4. Revise referências a ADRs

### Remoção de Documentações
- Não remova documentações sem justificativa
- Se um spec for removido, considere manter a documentação por histórico
- Atualize o índice se necessário

---

## 📊 Métricas de Qualidade

### Indicadores
- **Completude:** Todas as seções preenchidas
- **Clareza:** Linguagem clara e objetiva
- **Referências:** ADRs relevantes referenciadas
- **Exemplos:** Código exemplificado quando útil

### Revisão
- Revisar documentações periodicamente
- Atualizar quando padrões mudarem
- Manter índice atualizado

---

**Última atualização:** 2024-12-19  
**Mantido por:** Equipe de Automação

