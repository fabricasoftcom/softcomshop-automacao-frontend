# 📚 Guia de Replicação: Estrutura de Documentação, Regras e ADRs

**Versão:** 2.2  
**Data:** 2025-01-30  
**Status:** ✅ Guia de Referência

---

## 📝 Changelog

### Versão 2.2 (2025-01-30)

**Melhorias e Adições:**

- ✅ **Biblioteca de Padrões de Código:** Adicionado passo para criar biblioteca pesquisável de padrões de código reutilizáveis
- ✅ **Mapeamento de Relacionamentos:** Adicionado passo para criar sistema de referências cruzadas inteligentes entre documentações
- ✅ **Template de Exploração Autônoma:** Adicionado passo para criar template interativo de exploração autônoma com checklist executável
- ✅ **Checklist de Anti-padrões:** Adicionado passo para criar checklist específico para prevenir problemas comuns
- ✅ **Guia de Execução Paralela:** Adicionado passo opcional para projetos com execução paralela de testes
- ✅ **Exemplo de Implementação:** Adicionado passo opcional para criar case study de implementação bem-sucedida
- ✅ **Seção de Referências Expandida:** Atualizada seção de referências com todos os novos documentos
- ✅ **Quick Navigation Atualizado:** Adicionadas referências aos novos recursos no template de regras do Cursor

### Versão 2.1 (2025-12-12)

**Melhorias e Adições:**

- ✅ **Suporte a Automação Autônoma:** Adicionado passo para criar Guia de Prompts para automação com Cursor
- ✅ **Template de Regras Atualizado:** Adicionada seção de Autonomous Automation and Prompts no template de regras do Cursor
- ✅ **Gatilhos Automáticos:** Documentado como configurar gatilhos para ativar guias automaticamente

### Versão 2.0 (2025-12-12)

**Melhorias e Adições:**

- ✅ **Passo 4 Expandido:** Template completo do `.cursor/rules/architeture.mdc` incluindo todas as seções avançadas
- ✅ **Passo 4.1 Adicionado:** Mode Selection Guide com Automatic Evaluation Criteria, Mode Selection Rules, Decision Flow e Quick Reference
- ✅ **Passo 4.2 Adicionado:** Automatic Test Execution com regras de execução automática, identificação de testes afetados e exceções
- ✅ **Seção Best Practices Detalhadas:** Locators Best Practices, Code Simplification Best Practices, Custom Commands Documentation, Page Object Hierarchy Guidelines
- ✅ **Seção Adaptação Expandida:** Exemplos de como adaptar Mode Selection Guide e Automatic Test Execution para diferentes tipos de projetos (Testes, Desenvolvimento, Infraestrutura)
- ✅ **Referências a Múltiplas ADRs:** Template agora referencia todas as 16 ADRs do projeto de referência (não apenas ADR-0001)

**Baseado em:**
- Projeto de referência: IAsoftcomshop-automacao-frontend
- ADRs implementadas: 16 ADRs documentadas
- Melhores práticas validadas em produção

### Versão 1.0 (2024-12-20)

- Versão inicial do guia
- Estrutura básica de diretórios
- Template básico para `.cursor/rules/architeture.mdc`
- Processo de criação de ADRs
- Guias de referência básicos

---

## 📋 Visão Geral

Este guia descreve como replicar a estrutura completa de documentação, regras e Architecture Decision Records (ADRs) deste projeto em outro projeto. A estrutura foi desenvolvida para garantir:

- ✅ Documentação consistente e padronizada
- ✅ Decisões arquiteturais registradas e rastreáveis
- ✅ Regras claras e acessíveis para desenvolvedores
- ✅ Processos de validação contínua
- ✅ Onboarding facilitado para novos membros

---

## 🎯 Objetivo

Criar uma estrutura de documentação que:
- Documente decisões arquiteturais importantes (ADRs)
- Forneça guias práticos para desenvolvimento
- Mantenha regras centralizadas e acessíveis
- Facilite a manutenção e evolução do projeto
- Seja adaptável a diferentes tipos de projetos

---

## 📂 Estrutura de Diretórios

### Estrutura Completa

```
projeto/
├── .cursor/
│   └── rules/
│       └── architeture.mdc          # Regras principais do projeto (Cursor AI)
│
└── docs/
    ├── README.md                     # Índice principal da documentação
    │
    ├── adr/                          # Architecture Decision Records
    │   ├── README.md                 # Índice de ADRs
    │   ├── 0001-record-architecture-decisions.md
    │   ├── 0002-[decisao].md
    │   └── ...
    │
    ├── cases/                        # Documentações arquiteturais de casos
    │   ├── README.md                 # Índice de documentações
    │   ├── architecture-[nome].md
    │   └── ...
    │
    └── referencias/                  # Guias e referências práticas
        ├── README.md                 # Índice de referências
        ├── guia-decisoes-rapidas.md
        ├── guia-prompts-automacao.md # Guia de prompts para automação autônoma
        ├── processo-documentacao.md
        ├── checklist-validacao-continua.md
        ├── checklist-anti-padroes.md # Checklist de anti-padrões
        ├── referencia-comandos-customizados.md
        ├── biblioteca-padroes-codigo.md # Biblioteca de padrões de código
        ├── mapeamento-relacionamentos.md # Mapeamento de relacionamentos
        ├── template-exploracao-autonoma.md # Template de exploração autônoma
        ├── template-plano-implementacao.md # Template de plano de implementação
        ├── exemplo-implementacao-[nome].md # Exemplo de implementação (opcional)
        ├── guia-execucao-paralela.md # Guia de execução paralela (opcional)
        ├── analise-[tema].md
        ├── aprendizagens-e-licoes.md
        └── guia-replicacao-estrutura-documentacao.md (este arquivo)
```

---

## 🚀 Passo a Passo: Criando a Estrutura

### Passo 1: Criar Estrutura de Diretórios

```bash
# Criar diretórios principais
mkdir -p .cursor/rules
mkdir -p docs/adr
mkdir -p docs/cases
mkdir -p docs/referencias
```

### Passo 2: Criar ADR Inicial (ADR-0001)

**Arquivo:** `docs/adr/0001-record-architecture-decisions.md`

```markdown
# ADR-0001: Record Architecture Decisions

## Status
Accepted

## Context

[Descreva o contexto do seu projeto: por que você precisa documentar decisões arquiteturais?]

## Decision

We will use **Architecture Decision Records (ADR)** as defined by Michael Nygard.

ADRs will be:
- Stored in `docs/adr/` directory
- Numbered sequentially (0001, 0002, 0003, etc.)
- Named with descriptive titles: `0001-record-architecture-decisions.md`
- Follow a consistent template with sections: Status, Context, Decision, Consequences

## Consequences

### Positive
- Clear documentation of architectural decisions
- Historical record of decision evolution
- Better onboarding for new team members
- Reference point for discussions

### Negative
- Requires discipline to create ADRs
- Additional documentation to maintain
- Time investment for complex decisions

### Risks
- ADRs might become outdated
- Team might forget to document decisions
- **Mitigation**: Include ADR creation in code review checklist
```

### Passo 3: Criar README dos ADRs

**Arquivo:** `docs/adr/README.md`

```markdown
# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADR) for this project.

## What are ADRs?

Architecture Decision Records are a way to capture important architectural decisions along with their context and consequences.

## ADR Format

Each ADR follows this structure:
- **Status**: Proposed | Accepted | Deprecated | Superseded
- **Context**: The issue motivating this decision
- **Decision**: The change that we're proposing or have agreed to implement
- **Consequences**: What becomes easier or more difficult to do and any risks introduced

## Index

### ADR-0001: Record Architecture Decisions
**Status**: Accepted  
**Date**: [Data]  
**Summary**: Decision to use ADRs to document architectural decisions in this project.

[View ADR-0001](./0001-record-architecture-decisions.md)

---

## How to Create a New ADR

1. Create a new file following the naming convention: `XXXX-descriptive-title.md`
2. Use the next sequential number (e.g., if the last ADR is 0005, create 0006)
3. Follow the template structure (Status, Context, Decision, Consequences)
4. Update this README with the new ADR entry
5. Reference the ADR in related code and documentation when relevant

## References

- [Michael Nygard's Article on ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
```

### Passo 4: Criar Arquivo de Regras do Cursor

**Arquivo:** `.cursor/rules/architeture.mdc`

> **Nota:** Este passo foi expandido na versão 2.0 do guia para incluir todas as seções avançadas implementadas no projeto de referência, incluindo Mode Selection Guide, Automatic Test Execution, Best Practices detalhadas e referências a múltiplas ADRs.

**Template Completo:**

```markdown
---
alwaysApply: true
---

## Table of Contents

- [Architecture Decision Records](#architecture-decision-records)
- [Mode Selection Guide](#mode-selection-guide)
  - [Automatic Test Execution After Implementation](#automatic-test-execution-after-implementation)
- [Directory Structure](#directory-structure)
- [Main Configuration](#main-configuration)
- [Execution Flows](#execution-flows)
- [Data Flow](#data-flow)
- [Implementation Patterns](#implementation-patterns)
- [Best Practices](#best-practices)
  - [Locators Best Practices](#locators-best-practices)
  - [Code Simplification Best Practices](#code-simplification-best-practices)
- [Documentation Process](#documentation-process)
- [Quick Decision Guide](#quick-decision-guide)
- [Validation and Quality](#validation-and-quality)
- [Custom Commands](#custom-commands)
- [Autonomous Automation and Prompts](#autonomous-automation-and-prompts)

---

## Architecture Decision Records

This project uses **Architecture Decision Records (ADRs)** to document architectural decisions. For context and rationale, see [docs/adr/README.md](../docs/adr/README.md).

**Key ADRs:**
- [ADR-0001](../docs/adr/0001-record-architecture-decisions.md): Record Architecture Decisions
- [ADR-0002](../docs/adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../docs/adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../docs/adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0005](../docs/adr/0005-use-allure-for-test-reporting.md): Allure Reporting
- [ADR-0006](../docs/adr/0006-mandatory-documentation-for-new-tests.md): Mandatory Documentation
- [ADR-0007](../docs/adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0008](../docs/adr/0008-use-page-object-hierarchy.md): Page Object Hierarchy
- [ADR-0009](../docs/adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../docs/adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0011](../docs/adr/0011-use-conditional-intercepts.md): Conditional Intercepts
- [ADR-0012](../docs/adr/0012-documentation-of-custom-commands.md): Documentation of Custom Commands
- [ADR-0013](../docs/adr/0013-continuous-validation-checklist.md): Continuous Validation Checklist
- [ADR-0014](../docs/adr/0014-standardized-architectural-documentation-process.md): Standardized Architectural Documentation Process
- [ADR-0015](../docs/adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators
- [ADR-0016](../docs/adr/0016-planning-before-implementation.md): Planning Before Implementation

---

## Mode Selection Guide

> **Context**: See [ADR-0016](../docs/adr/0016-planning-before-implementation.md) for complete decision

**When receiving a task, automatically evaluate and suggest the appropriate mode:**

### Automatic Evaluation Criteria:

1. **Complexity**: Count files to modify, assess logic complexity
2. **Clarity**: Are requirements clear? Any ambiguity?
3. **Dependencies**: Are there dependencies between tasks?
4. **Type**: Implementation, consultation, or execution?

### Mode Selection Rules:

**Use Plan Mode when:**
- ✅ 3+ files need modification
- ✅ Requirements are unclear or ambiguous
- ✅ Multiple dependencies between tasks
- ✅ New patterns or architectures
- ✅ Significant refactoring
- ✅ Features affecting multiple modules

**Use Agent Mode when:**
- ✅ Single file modification
- ✅ Clear, straightforward task
- ✅ Approved plan exists
- ✅ Simple bug fix or trivial change
- ✅ Following existing pattern
- ✅ Adding simple method to existing class

**Use Ask Mode when:**
- ✅ Question about existing code
- ✅ Understanding how something works
- ✅ Reviewing implementation
- ✅ Clarifying ADRs or patterns
- ✅ No code changes needed

### Decision Flow:

```
Task Received
    │
    ├─ Is it a question/consultation only?
    │   └─ YES → Suggest Ask Mode
    │
    ├─ Is there an approved plan?
    │   └─ YES → Suggest Agent Mode (execute plan)
    │
    ├─ Is it a simple task (1 file, clear fix)?
    │   └─ YES → Suggest Agent Mode
    │
    └─ Is it complex (3+ files, unclear, dependencies)?
        └─ YES → Suggest Plan Mode → After approval → Agent Mode
```

### Quick Reference:

| Situation | Suggested Mode | Next Step |
|-----------|----------------|-----------|
| Complex feature (3+ files) | Plan | Create plan, get approval |
| Unclear requirements | Plan | Ask questions, clarify |
| Multiple dependencies | Plan | Map dependencies |
| Simple bug fix (1 file) | Agent | Implement directly |
| Typo/formatting | Agent | Fix directly |
| Approved plan exists | Agent | Execute plan |
| Question only | Ask | Answer question |
| Review code | Ask | Provide review |

**Always reference ADR-0016 when suggesting mode selection.**

### Automatic Test Execution After Implementation

**After completing any implementation or fix in Agent Mode, ALWAYS:**

1. **Identify the affected test spec(s):**
   - If modifying a Page Object → find the spec that uses it
   - If modifying a spec → execute that spec directly
   - If modifying shared code (Locators, Commands) → execute related specs
   - If modifying config files → execute a representative test to validate

2. **Execute the test automatically:**
   - Use appropriate test command for your framework
   - Wait for completion and verify results

3. **Report results:**
   - ✅ If tests pass: Confirm implementation successful
   - ❌ If tests fail: Analyze errors, fix issues, and re-run tests before considering task complete

**Exceptions (when NOT to run tests):**
- Documentation-only changes (`.md` files)
- Comments or formatting-only changes
- Changes to non-test files that don't affect test behavior
- Changes to ADR files or documentation

**IMPORTANT:** Never consider an implementation complete until the affected tests pass successfully.

---

## Directory Structure

[Descreva a estrutura de diretórios do seu projeto, organizada por funcionalidade]

---

## Main Configuration

[Descreva configurações principais do projeto: frameworks, ferramentas, padrões]

---

## Execution Flows

[Descreva fluxos de execução: scripts npm, comandos principais, pipelines]

---

## Data Flow

[Descreva fluxo de dados: fixtures, factories, sessões, autenticação]

---

## Implementation Patterns

[Descreva padrões de implementação específicos do projeto]

---

## Best Practices

### Locators Best Practices

> **Context**: See [ADR-0003](../docs/adr/0003-separate-locators-from-page-objects.md) and [ADR-0015](../docs/adr/0015-prioritize-ids-and-context-in-locators.md)

**CRITICAL RULES for creating locators:**

1. **ALWAYS inspect DOM before creating locators**
2. **PRIORITIZE IDs over other selectors**
3. **USE context when necessary** (modals, panels, sections)
4. **VALIDATE locators before using**
5. **AVOID generic selectors**

**Validation checklist:**
- [ ] Locator uses ID when available?
- [ ] Locator has appropriate context?
- [ ] Locator was validated in browser?
- [ ] Locator doesn't capture incorrect elements?

### Code Simplification Best Practices

**CRITICAL RULES:**

1. **ELIMINATE code duplication**
2. **REMOVE unused code**
3. **CENTRALIZE selectors** (enforces ADR-0003)
4. **AVOID fixed waits** (use conditional validations)
5. **MANAGE complexity** (constants for magic numbers)

**Red Flags:**
- ❌ Duplicate methods with similar logic
- ❌ Multiple fixed waits in code
- ❌ Hardcoded selectors
- ❌ Very long methods (>50 lines)
- ❌ Unused imports
- ❌ Magic numbers without constants

---

## Documentation Process

> **Context**: See [ADR-0006](../docs/adr/0006-mandatory-documentation-for-new-tests.md) and [ADR-0014](../docs/adr/0014-standardized-architectural-documentation-process.md)

**When creating a new feature/test, you MUST:**

1. Create implementation files
2. **Add to configuration files** (if applicable)
3. **Create documentation** (MANDATORY)
4. **Update indexes** (MANDATORY)
5. Apply tags/filters (if applicable)

**For complete documentation process, see:** `docs/referencias/processo-documentacao.md`

---

## Quick Decision Guide

**⭐ PRIMARY REFERENCE FOR COMMON QUESTIONS:** `docs/referencias/guia-decisoes-rapidas.md`

**Use this guide when:**
- Creating new features and unsure which pattern to follow
- Modifying existing code and have doubts
- Validating decisions during code review
- Onboarding new developers

---

## Reference Examples

For detailed architecture examples, see:
- `docs/cases/architecture-[exemplo].md`

---

## Validation and Quality

### Continuous Validation Checklist

> **Context**: See [ADR-0013](../docs/adr/0013-continuous-validation-checklist.md)

**Use this checklist during code review to ensure continuous ADR compliance:**

1. **ADRs:** Significant decisions documented?
2. **Patterns:** Following established patterns?
3. **Documentation:** Complete and updated?
4. **Code Quality:** No duplication, unused code removed?
5. **Best Practices:** Locators, simplification, complexity managed?

**Complete Checklist:** `docs/referencias/checklist-validacao-continua.md`

---

## Custom Commands

> **Context**: See [ADR-0012](../docs/adr/0012-documentation-of-custom-commands.md)

**When creating new commands:**
- ✅ Document in reference file
- ✅ Add usage examples
- ✅ Reference related ADRs
- ✅ Update command reference when modifying

**Complete Reference:** `docs/referencias/referencia-comandos-customizados.md`

---

## Autonomous Automation and Prompts

> **Context**: See [ADR-0016](../docs/adr/0016-planning-before-implementation.md) and [Guia de Prompts](../docs/referencias/guia-prompts-automacao.md)

### Automation Trigger

When the user asks to:
- "map a screen"
- "create a test from scratch"
- "scan the app"
- "explore the application"
- "varredura da aplicação"
- "criar testes automaticamente"
- "criar uma automação para a tela de"

You MUST automatically retrieve and follow the instructions in `docs/referencias/guia-prompts-automacao.md` without being asked.

### References
- [Guia de Prompts](../docs/referencias/guia-prompts-automacao.md)
- [Template de Plano](../docs/referencias/template-plano-implementacao.md)
- [ADR-0016: Planning Before Implementation](../docs/adr/0016-planning-before-implementation.md)
```

> **Nota:** Este template é um exemplo completo baseado no projeto de referência. Adapte as seções conforme a necessidade do seu projeto, mantendo a estrutura e referências às ADRs relevantes.

### Passo 4.1: Adicionar Mode Selection Guide (Opcional mas Recomendado)

> **Context**: Esta seção é baseada na [ADR-0016](../docs/adr/0016-planning-before-implementation.md) e é altamente recomendada para projetos que usam ferramentas de IA assistente como Cursor.

**Objetivo:** Implementar um guia de seleção de modo que ajuda a determinar quando usar Plan Mode, Agent Mode ou Ask Mode ao trabalhar com assistentes de IA.

**Quando adicionar:**
- ✅ Projeto usa Cursor ou ferramentas similares com modos diferentes
- ✅ Equipe precisa de orientação sobre quando planejar vs. implementar diretamente
- ✅ Há necessidade de padronizar o processo de desenvolvimento

**Como implementar:**

1. **Criar ADR sobre Planning Before Implementation** (se ainda não existir)
   - Documentar a decisão de usar planejamento para features complexas
   - Referenciar exemplos de sucesso

2. **Adicionar seção no `.cursor/rules/architeture.mdc`:**
   - Automatic Evaluation Criteria
   - Mode Selection Rules
   - Decision Flow visual
   - Quick Reference Table

3. **Adaptar para seu contexto:**
   - Ajustar critérios de complexidade conforme seu projeto
   - Adaptar exemplos para sua linguagem/framework
   - Incluir referências às suas ADRs relevantes

**Exemplo de seção para adicionar:**

```markdown
## Mode Selection Guide

> **Context**: See [ADR-0016](../docs/adr/0016-planning-before-implementation.md) for complete decision

**When receiving a task, automatically evaluate and suggest the appropriate mode:**

### Automatic Evaluation Criteria:

1. **Complexity**: Count files to modify, assess logic complexity
2. **Clarity**: Are requirements clear? Any ambiguity?
3. **Dependencies**: Are there dependencies between tasks?
4. **Type**: Implementation, consultation, or execution?

### Mode Selection Rules:

**Use Plan Mode when:**
- ✅ 3+ files need modification
- ✅ Requirements are unclear or ambiguous
- ✅ Multiple dependencies between tasks
- ✅ New patterns or architectures
- ✅ Significant refactoring
- ✅ Features affecting multiple modules

**Use Agent Mode when:**
- ✅ Single file modification
- ✅ Clear, straightforward task
- ✅ Approved plan exists
- ✅ Simple bug fix or trivial change
- ✅ Following existing pattern
- ✅ Adding simple method to existing class

**Use Ask Mode when:**
- ✅ Question about existing code
- ✅ Understanding how something works
- ✅ Reviewing implementation
- ✅ Clarifying ADRs or patterns
- ✅ No code changes needed

### Decision Flow:

```
Task Received
    │
    ├─ Is it a question/consultation only?
    │   └─ YES → Suggest Ask Mode
    │
    ├─ Is there an approved plan?
    │   └─ YES → Suggest Agent Mode (execute plan)
    │
    ├─ Is it a simple task (1 file, clear fix)?
    │   └─ YES → Suggest Agent Mode
    │
    └─ Is it complex (3+ files, unclear, dependencies)?
        └─ YES → Suggest Plan Mode → After approval → Agent Mode
```

**Always reference ADR-0016 when suggesting mode selection.**
```

**Benefícios:**
- Reduz retrabalho e iterações
- Clarifica requisitos antes da implementação
- Acelera implementações complexas
- Padroniza processo de desenvolvimento

**Referências:**
- [ADR-0016](../docs/adr/0016-planning-before-implementation.md): Planning Before Implementation
- Seção Mode Selection Guide no template do Passo 4

---

### Passo 4.2: Adicionar Automatic Test Execution (Opcional mas Recomendado)

> **Context**: Esta seção garante que implementações sejam validadas automaticamente através de testes, reduzindo bugs e melhorando qualidade.

**Objetivo:** Implementar regra de execução automática de testes após implementações para garantir que mudanças não quebrem funcionalidades existentes.

**Quando adicionar:**
- ✅ Projeto tem testes automatizados
- ✅ Equipe precisa garantir que mudanças não quebrem testes existentes
- ✅ Há necessidade de validação automática após implementação

**Como implementar:**

1. **Adicionar seção no `.cursor/rules/architeture.mdc`:**
   - Regra de identificar testes afetados
   - Comandos para executar testes
   - Exceções (quando NÃO executar)
   - Regra: nunca considerar completo sem testes passando

2. **Adaptar para seu contexto:**
   - Ajustar comandos de teste conforme seu framework
   - Definir exceções específicas do seu projeto
   - Incluir exemplos de comandos de teste

**Exemplo de seção para adicionar:**

```markdown
### Automatic Test Execution After Implementation

**After completing any implementation or fix in Agent Mode, ALWAYS:**

1. **Identify the affected test spec(s):**
   - If modifying a Page Object → find the spec that uses it
   - If modifying a spec → execute that spec directly
   - If modifying shared code (Locators, Commands) → execute related specs
   - If modifying config files → execute a representative test to validate

2. **Execute the test automatically:**
   - Use appropriate test command for your framework
   - Examples:
     - JavaScript/Node: `npm test -- [spec-file]`
     - Python: `pytest [test-file]`
     - Java: `mvn test -Dtest=[TestClass]`
   - Wait for completion and verify results

3. **Report results:**
   - ✅ If tests pass: Confirm implementation successful
   - ❌ If tests fail: Analyze errors, fix issues, and re-run tests before considering task complete

**Exceptions (when NOT to run tests):**
- Documentation-only changes (`.md` files)
- Comments or formatting-only changes
- Changes to non-test files that don't affect test behavior
- Changes to ADR files or documentation

**IMPORTANT:** Never consider an implementation complete until the affected tests pass successfully.
```

**Benefícios:**
- Detecta bugs imediatamente após implementação
- Reduz tempo de debugging
- Garante qualidade do código
- Previne regressões

**Referências:**
- Seção Automatic Test Execution no template do Passo 4
- Boas práticas de Continuous Integration

---

### Passo 5: Criar Guia de Decisões Rápidas

**Arquivo:** `docs/referencias/guia-decisoes-rapidas.md`

```markdown
# 🎯 Guia de Decisões Rápidas - Referência para Dúvidas

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este guia fornece respostas rápidas e direcionamento para as dúvidas mais comuns ao desenvolver no projeto.

**Quando usar:**
- Ao criar uma nova feature e não souber qual padrão seguir
- Ao modificar código existente e tiver dúvidas
- Durante code review para validar decisões
- Para onboarding de novos desenvolvedores

---

## ❓ Dúvida 1: [Primeira dúvida comum do seu projeto]

### ✅ Decisão Rápida:

[Resposta direta e objetiva]

### 📚 Referência Completa:
- [ADR-XXXX](../adr/XXXX-[nome].md)
- `docs/referencias/[documento-relacionado].md`

---

## ❓ Dúvida 2: [Segunda dúvida comum]

### ✅ Decisão Rápida:

[Resposta direta e objetiva]

---

## 🔄 Árvore de Decisão

[Adicione uma árvore de decisão visual para casos comuns]

---

## 📊 Tabelas de Referência Rápida

### ADRs Principais

| ADR | Tópico | Quando Referenciar |
|-----|--------|-------------------|
| ADR-0001 | Record Architecture Decisions | Sempre que criar um novo ADR |

---

## 💡 Dicas Rápidas

### ✅ Faça:
- [Dica 1]
- [Dica 2]

### ❌ Não Faça:
- [Erro comum 1]
- [Erro comum 2]

---

**Última atualização:** [Data]  
**Mantido por:** [Equipe]
```

### Passo 6: Criar Processo de Documentação

**Arquivo:** `docs/referencias/processo-documentacao.md`

```markdown
# 📝 Processo de Criação de Documentações Arquiteturais

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Este documento descreve o processo padronizado para criar documentações arquiteturais no projeto.

**Quando usar:**
- Ao criar uma nova documentação arquitetural
- Ao atualizar uma documentação existente
- Ao revisar documentações

---

## 📐 Template Padronizado

### Estrutura Básica

```markdown
# Arquitetura: [Nome da Funcionalidade]

## Objetivo

[Descrição clara do que é documentado]

---

## Estrutura de arquivos

### Arquivos principais
- `[caminho]/[arquivo]` - [Descrição]

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Padrão 1** (ADR-XXXX)
- ✅ **Padrão 2** (ADR-XXXX)

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0001](../adr/0001-record-architecture-decisions.md): Record Architecture Decisions

---

## ✅ Checklist de Validação

- [ ] Título descritivo e claro
- [ ] Seção "Objetivo" completa
- [ ] Seção "Estrutura de arquivos" com todos os arquivos relevantes
- [ ] Seção "Padrões e boas práticas" com ADRs referenciadas
- [ ] Seção "Referências" com links corretos
```

---

## 🚀 Guia Passo a Passo

### 1. Preparação
1. Identifique o que precisa de documentação
2. Leia o código completo para entender
3. Identifique padrões e ADRs relacionadas

### 2. Criação
1. Crie o arquivo `docs/cases/architecture-[nome].md`
2. Use o template acima como base
3. Preencha cada seção cuidadosamente
4. Referencie ADRs relacionadas

### 3. Revisão
1. Use o checklist de validação
2. Verifique se todas as seções estão completas
3. Confirme que os links estão corretos

### 4. Finalização
1. Adicione ao índice (`docs/cases/README.md`)
2. Commit com mensagem descritiva
```

### Passo 7: Criar Checklist de Validação

**Arquivo:** `docs/referencias/checklist-validacao-continua.md`

```markdown
# ✅ Checklist de Validação Contínua

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 📋 Visão Geral

Use este checklist durante o code review para garantir conformidade contínua com todas as ADRs.

---

## 🔍 Checklist por ADR

### ADR-0001: Record Architecture Decisions

- [ ] Decisões arquiteturais significativas foram documentadas como ADRs?
- [ ] ADRs são referenciadas em código relacionado?
- [ ] ADRs estão atualizadas no README?

---

## 📝 Template para Pull Requests

### Validação de ADRs

- [ ] ADR-0001: ✅ Conforme
- [ ] ADR-0002: ✅ Conforme
- [ ] ADR-0003: ⚠️ Não aplicável

### Observações

[Observações sobre a revisão]

---

## 🔗 Referências

- [ADR-0001](../adr/0001-record-architecture-decisions.md)
- [ADR-0013](../adr/0013-continuous-validation-checklist.md) (se aplicável)
```

### Passo 8: Criar Guia de Prompts para Automação
**Arquivo:** `docs/referencias/guia-prompts-automacao.md`

```markdown
# Guia de Prompts para Automação com Cursor

> **Context**: Este guia contém templates de prompts padronizados para utilizar as capacidades de navegação autônoma do Cursor.

---

## 🚀 Prompt Completo (Rotina Completa)

**Use este prompt quando quiser que o Cursor execute TODO o processo de criação de testes:**

[Inserir prompt completo de automação aqui]

---

## 📋 Fase 1: Exploração e Mapeamento (Discovery)

[Inserir prompts de discovery aqui]

---

## 🏗️ Fase 2: Geração de Estrutura

[Inserir prompts de geração de estrutura aqui]

---

## 🎯 Como Usar Este Guia

### Método 1: Referência com @

Use `@guia-prompts-automacao.md` para carregar o contexto automaticamente.
```

---

### Passo 9: Criar Biblioteca de Padrões de Código (Recomendado)

**Arquivo:** `docs/referencias/biblioteca-padroes-codigo.md`

**Objetivo:** Criar biblioteca pesquisável de padrões de código reutilizáveis extraídos de lições aprendidas.

**Quando criar:**
- ✅ Projeto tem padrões de código recorrentes identificados
- ✅ Há necessidade de facilitar descoberta rápida de padrões durante implementação
- ✅ Padrões são complexos o suficiente para merecer documentação

**Estrutura sugerida:**

```markdown
# Biblioteca de Padrões de Código

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 🔍 Como Usar

Use `Ctrl+F` (ou `Cmd+F` no Mac) para buscar por padrão específico. Exemplos de buscas:
- "valor monetário" ou "monetário"
- "switch" ou "toggle"
- "autocomplete" ou "debounce"
- "date picker" ou "date range"

**Estrutura:**
- Cada padrão contém: problema, solução, exemplo de código e referência completa
- Exemplos são copiáveis e prontos para adaptação
- Links apontam para documentação completa

---

## 💰 Padrão 1: [Nome do Padrão]

### Problema

[Descreva o problema que este padrão resolve]

### Solução Padrão

```javascript
// ✅ PADRÃO: [Descrição]
[código exemplo]
```

### Exemplo de Uso

```javascript
// Exemplo prático de uso
```

### 📚 Referência Completa

- [Link para documentação completa ou ADR relacionada]
```

**Como preencher:**
1. Identifique padrões recorrentes no código
2. Extraia exemplos reais de implementação
3. Documente problema, solução e exemplo
4. Adicione links para documentação completa
5. Organize por categorias (ex: Manipulação de Dados, Validações, Interações)

**Referências:**
- `aprendizagens-e-licoes.md` (fonte de padrões)
- `guia-decisoes-rapidas.md` (referência cruzada)

---

### Passo 10: Criar Mapeamento de Relacionamentos (Recomendado)

**Arquivo:** `docs/referencias/mapeamento-relacionamentos.md`

**Objetivo:** Criar sistema de referências cruzadas inteligentes que mapeia todos os relacionamentos entre documentações arquiteturais.

**Quando criar:**
- ✅ Projeto tem múltiplas documentações arquiteturais relacionadas
- ✅ Há necessidade de manter referências bidirecionais sincronizadas
- ✅ Documentações têm relacionamentos complexos (ex: fluxos end-to-end)

**Estrutura sugerida:**

```markdown
# Mapeamento de Relacionamentos entre Documentações

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 📊 Como Usar Este Mapa

Este documento mapeia **TODOS** os relacionamentos entre documentações arquiteturais. Use-o para:

- **Descobrir documentações relacionadas** ao criar nova documentação
- **Manter referências bidirecionais sincronizadas** entre documentações
- **Identificar fluxos end-to-end** que conectam múltiplas funcionalidades
- **Garantir consistência** nas referências cruzadas

---

## 🔄 Relacionamentos por Módulo

### [Módulo 1]

```
Funcionalidade A
    ├─→ Funcionalidade B (relacionamento)
    └─→ Funcionalidade C (relacionamento)

Funcionalidade B
    ├─→ Funcionalidade A (relacionamento reverso)
    └─→ Funcionalidade D (relacionamento)
```

---

## ✅ Checklist para Uso ao Criar Nova Documentação

1. [ ] Consultar este mapa para identificar documentações relacionadas
2. [ ] Adicionar referências bidirecionais em todas as documentações relacionadas
3. [ ] Atualizar este mapa com novos relacionamentos identificados
4. [ ] Validar que todas as referências estão corretas
```

**Como preencher:**
1. Liste todos os módulos do projeto
2. Para cada módulo, identifique funcionalidades relacionadas
3. Documente relacionamentos usando diagramas de árvore
4. Crie checklist para uso ao criar nova documentação
5. Mantenha atualizado conforme novas documentações são criadas

**Referências:**
- `processo-documentacao.md` (passo 2: Criação)
- ADR-0014 (Standardized Architectural Documentation Process)

---

### Passo 11: Criar Template de Exploração Autônoma (Recomendado)

**Arquivo:** `docs/referencias/template-exploracao-autonoma.md`

**Objetivo:** Criar template interativo de exploração autônoma com checklist executável por ferramentas de IA.

**Quando criar:**
- ✅ Projeto usa ferramentas de IA assistente (Cursor, GitHub Copilot, etc.)
- ✅ Há necessidade de padronizar processo de exploração de telas
- ✅ Exploração autônoma é parte do processo de desenvolvimento

**Estrutura sugerida:**

```markdown
# Template de Exploração Autônoma

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 🎯 Objetivo da Exploração

**Módulo:** [Preencher com nome do módulo]  
**Funcionalidade:** [Preencher com nome da funcionalidade]  
**URL Relativa:** `/[caminho]` (ex: `/financeiro/contas-a-receber`)

---

## ✅ Checklist de Exploração (Seguir Ordem)

### Pré-requisitos

- [ ] **Ler `baseUrl` de `[config-file]`**
  - **Por quê:** Garante que URLs relativas serão usadas corretamente
  - **Como:** Ler arquivo de configuração e extrair valor de `baseUrl`
  - **Validação:** Confirmar que `baseUrl` foi lido e armazenado

- [ ] **Validar acessibilidade da aplicação**
  - **Por quê:** Garante que aplicação está acessível antes de explorar
  - **Como:** Usar `browser_navigate` com URL relativa
  - **Validação:** Confirmar que página carregou

### Exploração de Listagem (se aplicável)

- [ ] **Navegar até listagem usando `browser_navigate` com URL relativa**
  - **Por quê:** Evita usar URLs absolutas hardcoded
  - **Como:** Usar `browser_navigate` com URL relativa ao `baseUrl`
  - **Validação:** Confirmar que página de listagem carregou

- [ ] **Capturar snapshot inicial com `browser_snapshot`**
  - **Por quê:** Documenta estado inicial da página
  - **Como:** Usar `browser_snapshot` após navegação
  - **Validação:** Confirmar que snapshot foi capturado

[Adicionar mais checklists conforme necessário]
```

**Como preencher:**
1. Identifique etapas de exploração necessárias para seu projeto
2. Crie checklists detalhados para cada etapa
3. Inclua "Por quê", "Como" e "Validação" para cada item
4. Organize por tipo de funcionalidade (Listagem, Cadastro, etc.)
5. Adicione checklist de armadilhas comuns

**Referências:**
- `guia-prompts-automacao.md` (Fase 1: Exploração)
- ADR-0016 (Planning Before Implementation)

---

### Passo 12: Criar Checklist de Anti-padrões (Recomendado)

**Arquivo:** `docs/referencias/checklist-anti-padroes.md`

**Objetivo:** Criar checklist específico para prevenir problemas comuns identificados em implementações anteriores.

**Quando criar:**
- ✅ Projeto identificou anti-padrões recorrentes
- ✅ Há necessidade de prevenir problemas comuns durante code review
- ✅ Problemas específicos foram identificados em implementações anteriores

**Estrutura sugerida:**

```markdown
# Checklist de Anti-Padrões

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Ativo

---

## 📋 Objetivo

Este checklist previne problemas comuns identificados em implementações anteriores. Use este checklist durante o desenvolvimento e code review para garantir que anti-padrões não sejam introduzidos no código.

**Quando usar:**
- Durante o desenvolvimento de novos testes/features
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

---

## 🚨 Anti-Padrões Críticos

### ❌ Anti-Padrão 1: [Nome do Anti-padrão]

**Problema identificado:** [Descrição do problema]

**Validação:**
- [ ] [Critério de validação 1]
- [ ] [Critério de validação 2]

**Exemplos:**

```javascript
// ❌ ANTI-PADRÃO - [Descrição]
[código incorreto]

// ✅ CORRETO - [Descrição]
[código correto]
```

[Repetir para cada anti-padrão identificado]

---

## ✅ Checklist de Validação Final

Antes de considerar completo, valide:

- [ ] Nenhum anti-padrão foi introduzido
- [ ] Todos os critérios de validação foram atendidos
- [ ] Exemplos de código correto foram seguidos
- [ ] Referências a ADRs foram consultadas
```

**Como preencher:**
1. Identifique anti-padrões recorrentes no projeto
2. Documente problema, validação e exemplos para cada um
3. Adicione exemplos de código correto e incorreto
4. Crie checklist de validação final
5. Referencie ADRs relacionadas

**Referências:**
- `checklist-validacao-continua.md` (complementa este checklist)
- Lições aprendidas do projeto

---

### Passo 13: Criar Guia de Execução Paralela (Opcional)

**Arquivo:** `docs/referencias/guia-execucao-paralela.md`

**Objetivo:** Documentar processo de execução paralela de testes (se aplicável ao projeto).

**Quando criar:**
- ✅ Projeto tem suíte de testes grande que se beneficia de execução paralela
- ✅ Há scripts ou ferramentas para execução paralela
- ✅ Execução paralela é parte do processo de desenvolvimento

**Estrutura sugerida:**

```markdown
# Guia de Execução Paralela de Testes

> **Resumo**: Instruções para utilizar [ferramenta/script] de execução paralela, reduzindo drasticamente o tempo total de execução da suíte de testes.

## 1. Visão Geral

[Descreva a ferramenta/script e seus benefícios]

### Benefícios
- **Velocidade**: [Descrição]
- **Isolamento**: [Descrição]
- **Relatório Unificado**: [Descrição]

---

## 2. Como Utilizar

### Pré-requisitos
[Instruções de pré-requisitos]

### Comandos de Execução

#### 🚀 Execução Completa (Padrão)
[Comando e descrição]

#### 🔍 Execução Filtrada
[Comando e descrição]

---

## 3. Arquitetura dos Grupos

[Descreva como os testes são agrupados]

---

## 4. Troubleshooting

[Problemas comuns e soluções]
```

**Como preencher:**
1. Documente ferramenta/script usado para execução paralela
2. Descreva benefícios e arquitetura
3. Adicione comandos de execução com exemplos
4. Documente troubleshooting comum
5. Adicione referências a documentação relacionada

**Nota:** Este passo é opcional e só deve ser criado se o projeto usa execução paralela.

---

### Passo 14: Criar Exemplo de Implementação (Opcional mas Recomendado)

**Arquivo:** `docs/referencias/exemplo-implementacao-[nome].md`

**Objetivo:** Criar case study completo de implementação bem-sucedida que demonstra aplicação prática do template padronizado.

**Quando criar:**
- ✅ Há implementação bem-sucedida que pode servir de referência
- ✅ Implementação seguiu todos os padrões e ADRs
- ✅ Há valor educacional em documentar o processo completo

**Estrutura sugerida:**

```markdown
# Exemplo de Implementação: [Nome da Funcionalidade]

**Versão:** 1.0  
**Data:** [Data]  
**Status:** ✅ Exemplo Completo e Funcional

---

## 📊 Resumo Executivo

**Módulo:** [Nome do módulo]  
**Funcionalidade:** [Nome da funcionalidade]  
**Tempo de Implementação:** [Tempo]  
**Arquivos Criados:** [Número]  
**Conformidade com ADRs:** [Porcentagem]%

---

## 🚀 Processo Seguido

### Fase 1: Exploração e Descoberta
[Descrição do que foi feito]

### Fase 2: Estrutura Base
[Descrição do que foi feito]

### Fase 3: Implementação
[Descrição do que foi feito]

### Fase 4: Documentação
[Descrição do que foi feito]

### Fase 5: Validação
[Descrição do que foi feito]

---

## 📚 Lições Aprendidas

### O que funcionou bem
- [Lição 1]
- [Lição 2]

### Problemas encontrados e soluções
- [Problema 1]: [Solução]
- [Problema 2]: [Solução]

---

## 📁 Estrutura de Arquivos Criados

```
[caminho]/[arquivo] - [Descrição]
```

---

## 🔗 Referências

- [Template de Plano de Implementação](../referencias/template-plano-implementacao.md)
- [ADR-0016](../adr/0016-planning-before-implementation.md): Planning Before Implementation
```

**Como preencher:**
1. Escolha implementação bem-sucedida e completa
2. Documente processo completo seguido (todas as fases)
3. Capture lições aprendidas e problemas encontrados
4. Liste estrutura de arquivos criados
5. Adicione métricas e estatísticas
6. Referencie templates e ADRs usados

**Referências:**
- `template-plano-implementacao.md` (template usado)
- ADR-0016 (Planning Before Implementation)

---

### Passo 15: Criar README de Referências

**Arquivo:** `docs/referencias/README.md`

**Atualização necessária:** O README deve incluir descrições de todos os novos documentos criados nos passos anteriores.

```markdown
# 📚 Referências e Guias do Projeto

Esta pasta contém todos os documentos de referência rápida, guias práticos e ferramentas de apoio para desenvolvimento e manutenção.

---

## 🚀 Guias de Referência Rápida

### ⭐ `guia-decisoes-rapidas.md`

**Guia de decisões rápidas para dúvidas comuns durante o desenvolvimento.**

Este é o documento principal para consulta rápida quando você tem dúvidas sobre padrões arquiteturais ou decisões de implementação.

**Quando usar:**
- Ao criar uma nova feature e não souber qual padrão seguir
- Ao modificar código existente e tiver dúvidas
- Durante code review para validar decisões
- Para onboarding de novos desenvolvedores

---

### 🤖 `guia-prompts-automacao.md`

**Guia de prompts padronizados para automação autônoma com Cursor.**

Este guia contém templates de prompts prontos para uso que permitem ao Cursor explorar telas, mapear locators e criar testes automaticamente seguindo as ADRs do projeto.

**Quando usar:**
- Ao criar testes do zero e querer que o Cursor faça tudo automaticamente
- Ao explorar uma nova tela e mapear locators
- Para padronizar a criação de testes com o Cursor

---

### 💻 `biblioteca-padroes-codigo.md`

**Biblioteca pesquisável de padrões de código reutilizáveis.**

Snippets prontos para copiar e adaptar para padrões comuns identificados nas lições aprendidas, facilitando descoberta rápida durante implementação.

**Conteúdo:**
- Manipulação de valores monetários
- Validação de estado antes e depois de operações
- Autocomplete com debounce
- Date Range Picker
- Métodos resilientes em ambiente compartilhado

**Quando usar:**
- Ao precisar de padrão de código específico
- Para descobrir como implementar padrões comuns
- Para copiar e adaptar snippets prontos

**Referenciado em:**
- `guia-decisoes-rapidas.md` (seção "Preciso de um padrão de código?")
- `aprendizagens-e-licoes.md` (fonte de padrões)

---

### 🔗 `mapeamento-relacionamentos.md`

**Sistema de referências cruzadas inteligentes com mapa de relacionamentos.**

Mapa centralizado que documenta todos os relacionamentos entre documentações arquiteturais, facilitando descoberta de documentações relacionadas e manutenção de referências bidirecionais.

**Conteúdo:**
- Relacionamentos por módulo
- Diagramas de relacionamento
- Checklist para uso ao criar nova documentação
- Busca rápida por tipo de relacionamento

**Quando usar:**
- Ao criar nova documentação arquitetural
- Para identificar documentações relacionadas
- Para manter referências bidirecionais sincronizadas
- Para entender fluxos end-to-end

**Referenciado em:**
- `processo-documentacao.md` (passo 2: Criação)
- ADR-0006 (Mandatory Documentation)
- ADR-0014 (Standardized Architectural Documentation Process)

---

## ✅ Ferramentas de Validação e Processo

### 📋 `checklist-validacao-continua.md`

**Checklist de validação contínua para code review.**

Use este checklist durante o code review para garantir conformidade contínua com todas as ADRs.

**Quando usar:**
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

---

### 🚨 `checklist-anti-padroes.md`

**Checklist específico para prevenir problemas comuns identificados em implementações anteriores.**

Este checklist previne anti-padrões críticos como testes com muitas condicionais, locators não validados, falta de exploração manual, estrutura assumida e testes não assertivos.

**Quando usar:**
- Durante o desenvolvimento de novos testes
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

**Referenciado em:**
- `checklist-validacao-continua.md`
- `.cursor/rules/architeture.mdc`

---

### 📝 `processo-documentacao.md`

**Processo padronizado para criar documentações arquiteturais.**

Template e processo obrigatório para criar documentações de novos testes, garantindo consistência e qualidade.

**Quando usar:**
- Ao criar documentação de um novo teste (OBRIGATÓRIO)
- Para atualizar documentação existente
- Para entender o padrão de documentação do projeto

---

### 📋 `template-plano-implementacao.md`

**Template padronizado para criar planos de implementação.**

Template completo e estruturado baseado nos padrões identificados, garantindo coerência e acertividade em futuras implementações.

**Conteúdo:**
- Estrutura completa de fases (Exploração, Estrutura, Implementação, Documentação, Validação)
- Padrões de nomenclatura de TODOs
- Dependências entre tarefas
- Checklist de qualidade do plano

**Quando usar:**
- Ao criar plano para nova funcionalidade (3+ arquivos)
- Ao implementar novo módulo de testes
- Ao criar fluxo completo (listagem + cadastro)

**Referenciado em:**
- ADR-0016 (Planning Before Implementation)
- `.cursor/rules/architeture.mdc`

---

### 🔍 `template-exploracao-autonoma.md`

**Template interativo de exploração autônoma com checklist executável.**

Template estruturado que fornece um checklist passo a passo detalhado para exploração autônoma de telas, garantindo que todas as etapas sejam seguidas corretamente.

**Conteúdo:**
- Checklist detalhado de pré-requisitos
- Checklist para exploração de listagens
- Checklist para exploração de cadastros
- Checklist para funcionalidades específicas
- Checklist para documentação de descobertas
- Checklist de validação final

**Quando usar:**
- Durante exploração autônoma de novas telas
- Para garantir que todas as etapas de exploração sejam seguidas
- Para documentar descobertas de forma padronizada
- Para validar que exploração foi completa antes de prosseguir

**Referenciado em:**
- `guia-prompts-automacao.md` (Fase 1: Exploração)
- ADR-0016 (Planning Before Implementation)

---

### 📖 `exemplo-implementacao-[nome].md` (Opcional)

**Case study completo da implementação bem-sucedida de [funcionalidade].**

Documento detalhado que demonstra a aplicação prática do template padronizado de plano de implementação, servindo como referência e exemplo para futuras implementações.

**Conteúdo:**
- Resumo executivo e métricas
- Processo completo seguido (5 fases)
- Lições aprendidas específicas
- Problemas encontrados e soluções
- Conformidade com ADRs
- Estrutura de arquivos criados

**Quando usar:**
- Como referência ao criar novo plano de implementação
- Para entender como aplicar o template corretamente
- Para ver exemplo prático de implementação completa
- Para onboarding de novos desenvolvedores

**Referenciado em:**
- Template de Plano de Implementação
- ADR-0016 (Planning Before Implementation)

---

### 🔄 `guia-execucao-paralela.md` (Opcional)

**Guia de execução paralela de testes.**

Instruções para utilizar [ferramenta/script] de execução paralela, reduzindo drasticamente o tempo total de execução da suíte de testes.

**Quando usar:**
- Para executar suíte completa de testes em paralelo
- Para reduzir tempo de execução de testes
- Para executar testes filtrados em paralelo

**Nota:** Apenas se o projeto usa execução paralela de testes.

---

### 📖 `referencia-comandos-customizados.md`

**Referência completa de todos os comandos customizados do projeto.**

Documentação detalhada de cada comando customizado, incluindo quando usar, parâmetros, exemplos e ADRs relacionadas.

**Quando usar:**
- Para entender qual comando usar em cada situação
- Para aprender sobre comandos disponíveis
- Para documentar novos comandos customizados

**Referenciado em:**
- ADR-0012 (Documentation of Custom Commands)
- `.cursor/rules/architeture.mdc`

---

## 🔗 Referências Externas

### Documentos Relacionados

- **ADRs:** `docs/adr/README.md` - Todas as decisões arquiteturais
- **Regras do Cursor:** `.cursor/rules/architeture.mdc` - Regras ativas do projeto
- **Documentações:** `docs/cases/README.md` - Índice de documentações
- **Lista de Testes:** `docs/testes.md` - Lista completa de testes (se aplicável)

---

**Última atualização:** [Data]  
**Status:** ✅ Documentos Ativos e Mantidos
```

### Passo 16: Criar README de Cases

**Arquivo:** `docs/cases/README.md`

```markdown
# 📚 Índice de Documentações Arquiteturais

Este diretório contém a documentação arquitetural detalhada do projeto.

**Última atualização:** [Data]  
**Total de documentações:** [Número]

---

## 📋 Organização

As documentações estão organizadas por módulo/funcionalidade e seguem o padrão de nomenclatura:
- `architecture-<nome>.md`

Cada documentação contém:
- **Objetivo** - Descrição clara do que é documentado
- **Estrutura de arquivos** - Arquivos principais
- **Padrões e boas práticas** - Técnicas e padrões aplicados
- **Referências** - ADRs relacionadas e documentação adicional

---

## 📂 Documentações por Módulo

### [Módulo 1]

- `architecture-[nome].md` - [Descrição]

---

## 🔗 Referências

### ADRs Relacionadas

Todas as documentações referenciam as seguintes ADRs quando aplicável:

- **ADR-0001:** Record Architecture Decisions

### Documentação Relacionada

- `docs/testes.md` - [Descrição] (se aplicável)
- `docs/adr/` - Architecture Decision Records
- `docs/referencias/` - Referências e guias do projeto

---

## 📝 Como Usar

### Para Desenvolvedores
1. Consulte a documentação antes de modificar código existente
2. Use como referência ao criar novos recursos
3. Siga os padrões e boas práticas documentados

### Para Revisores
1. Valide que novos recursos seguem os padrões documentados
2. Verifique referências a ADRs
3. Confirme que a estrutura está completa

---

**Última atualização:** [Data]  
**Mantido por:** [Equipe]
```

### Passo 17: Criar README Principal

**Arquivo:** `docs/README.md`

```markdown
# 📚 Documentação do Projeto

Este diretório contém toda a documentação arquitetural, decisões e guias do projeto.

---

## 📂 Estrutura

### 📋 ADRs (Architecture Decision Records)
- `adr/` - Decisões arquiteturais importantes do projeto
- [Ver índice completo](./adr/README.md)

### 📝 Documentações de Casos
- `cases/` - Documentações arquiteturais detalhadas
- [Ver índice completo](./cases/README.md)

### 📖 Referências e Guias
- `referencias/` - Guias práticos e ferramentas de apoio
- [Ver índice completo](./referencias/README.md)

---

## 🚀 Início Rápido

### Para Desenvolvedores
1. Leia [Guia de Decisões Rápidas](./referencias/guia-decisoes-rapidas.md)
2. Consulte [ADRs](./adr/README.md) para entender decisões arquiteturais
3. Siga [Processo de Documentação](./referencias/processo-documentacao.md) ao criar novos recursos

### Para Revisores
1. Use [Checklist de Validação](./referencias/checklist-validacao-continua.md) durante code review
2. Valide conformidade com ADRs
3. Verifique documentação quando aplicável

---

## 🔗 Links Importantes

- [ADRs](./adr/README.md) - Todas as decisões arquiteturais
- [Documentações](./cases/README.md) - Documentações detalhadas
- [Referências](./referencias/README.md) - Guias e ferramentas

---

**Última atualização:** [Data]  
**Mantido por:** [Equipe]
```

---

## 📝 Template de ADR

Use este template ao criar novos ADRs:

```markdown
# ADR-XXXX: [Título Descritivo]

## Status
Proposed | Accepted | Deprecated | Superseded

## Context

[Descreva o problema ou situação que motivou esta decisão]

## Decision

[Descreva a decisão tomada de forma clara e objetiva]

## Consequences

### Positive
- [Benefício 1]
- [Benefício 2]

### Negative
- [Desvantagem 1]
- [Desvantagem 2]

### Risks
- [Risco 1]
- **Mitigation**: [Como mitigar]

### Notes
- [Observações adicionais]

### Related ADRs
- [ADR-XXXX](./XXXX-[nome].md): [Descrição]
```

---

## 📚 Best Practices Detalhadas

Esta seção descreve práticas avançadas que podem ser implementadas no projeto para melhorar qualidade, manutenibilidade e consistência do código.

### Locators Best Practices

> **Context**: Baseado em [ADR-0003](../docs/adr/0003-separate-locators-from-page-objects.md) e [ADR-0015](../docs/adr/0015-prioritize-ids-and-context-in-locators.md)

**Quando aplicar:**
- ✅ Projetos com testes automatizados (E2E, integração)
- ✅ Projetos que interagem com interfaces (web, mobile)
- ✅ Necessidade de manter seletores estáveis e manuteníveis

**Práticas principais:**

1. **SEMPRE inspecionar DOM antes de criar locators**
   - Abrir navegador e navegar até a tela
   - Usar DevTools para inspecionar elementos
   - Copiar IDs e classes diretamente do DOM
   - Nunca assumir estrutura DOM sem inspeção

2. **PRIORIZAR IDs sobre outros seletores**
   - IDs são únicos e estáveis
   - IDs são mais rápidos que classes
   - Sempre usar IDs quando disponíveis

3. **USAR contexto quando necessário**
   - Modais: `.modal #elemento`
   - Painéis: `.painel #elemento`
   - Seções: `.secao #elemento`
   - Previne capturar elementos errados

4. **VALIDAR locators antes de usar**
   - Testar no console do navegador: `document.querySelector('seu-locator')`
   - Verificar que encontra o elemento correto
   - Verificar que não encontra elementos incorretos

5. **EVITAR seletores genéricos**
   - ❌ Não usar: `input[id^="auto"]` (muito genérico)
   - ❌ Não usar: `input[placeholder*="Preço"]` (frágil, depende de texto)
   - ✅ Usar: `.modal #auto_produto_id` (ID específico com contexto)

**Checklist de validação:**
- [ ] Locator usa ID quando disponível?
- [ ] Locator tem contexto apropriado (modal, painel)?
- [ ] Locator foi validado no navegador?
- [ ] Locator não captura elementos incorretos?
- [ ] Locator não é muito genérico?

**Referências:**
- [ADR-0003](../docs/adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0015](../docs/adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context

### Code Simplification Best Practices

**Quando aplicar:**
- ✅ Qualquer projeto de desenvolvimento
- ✅ Código com duplicação ou complexidade excessiva
- ✅ Necessidade de melhorar manutenibilidade

**Práticas principais:**

1. **ELIMINAR duplicação de código**
   - Consolidar métodos similares em um único
   - Extrair lógica comum para métodos reutilizáveis
   - Usar constantes para números mágicos
   - Evitar validações redundantes

2. **REMOVER código não utilizado**
   - Remover métodos não utilizados após verificação
   - Remover imports não utilizados
   - Limpar código morto regularmente
   - Código morto é ruído que reduz legibilidade

3. **CENTRALIZAR seletores** (aplica ADR-0003)
   - Nunca hardcodear seletores no código
   - Todos os seletores devem estar em arquivos de Locators
   - Seletores longos/complexos devem ser movidos para locators
   - Seletores hardcoded são bombas-relógio - centralize-os

4. **EVITAR waits fixos**
   - Não usar `cy.wait(2000)` ou similar no código
   - Usar validações condicionais (`.should('be.visible')`)
   - Aproveitar mecanismo de retry automático
   - Waits fixos são code smell - use waits condicionais

5. **GERENCIAR complexidade**
   - Métodos não devem ser excessivamente longos (>50 linhas merece revisão)
   - Usar constantes para números mágicos
   - Código deve ser legível e fácil de entender
   - Métodos devem ter responsabilidade única

**Red Flags:**
- ❌ Métodos duplicados com lógica similar
- ❌ Múltiplos waits fixos no código
- ❌ Seletores hardcoded
- ❌ Métodos muito longos (>50 linhas)
- ❌ Imports não utilizados
- ❌ Números mágicos sem constantes

**Referências:**
- Lições aprendidas de simplificação de código
- [ADR-0003](../docs/adr/0003-separate-locators-from-page-objects.md): Separate Locators

### Code Pattern Library

> **Context**: Reusable code patterns extracted from lessons learned

**Quando aplicar:**
- ✅ Projetos com padrões de código recorrentes
- ✅ Necessidade de facilitar descoberta rápida de padrões
- ✅ Padrões são complexos o suficiente para merecer documentação

**Práticas:**
- ✅ Criar biblioteca pesquisável com `Ctrl+F`
- ✅ Incluir problema, solução e exemplo para cada padrão
- ✅ Manter exemplos copiáveis e prontos para adaptação
- ✅ Referenciar documentação completa

**Referências:**
- `docs/referencias/biblioteca-padroes-codigo.md`
- `docs/referencias/aprendizagens-e-licoes.md` (fonte de padrões)

### Relationship Mapping

> **Context**: Supports ADR-0014 (Standardized Architectural Documentation Process) and ADR-0006 (Mandatory Documentation)

**Quando aplicar:**
- ✅ Projeto tem múltiplas documentações arquiteturais relacionadas
- ✅ Há necessidade de manter referências bidirecionais sincronizadas
- ✅ Documentações têm relacionamentos complexos

**Práticas:**
- ✅ Mapear relacionamentos por módulo
- ✅ Usar diagramas de árvore para visualização
- ✅ Criar checklist para uso ao criar nova documentação
- ✅ Manter atualizado conforme novas documentações são criadas

**Referências:**
- `docs/referencias/mapeamento-relacionamentos.md`
- `docs/referencias/processo-documentacao.md` (passo 2: Criação)

### Autonomous Exploration Template

> **Context**: Implements ADR-0016 (Planning Before Implementation) - Phase 1: Exploration

**Quando aplicar:**
- ✅ Projeto usa ferramentas de IA assistente
- ✅ Há necessidade de padronizar processo de exploração
- ✅ Exploração autônoma é parte do processo

**Práticas:**
- ✅ Criar checklist detalhado para cada etapa
- ✅ Incluir "Por quê", "Como" e "Validação" para cada item
- ✅ Organizar por tipo de funcionalidade
- ✅ Adicionar checklist de armadilhas comuns

**Referências:**
- `docs/referencias/template-exploracao-autonoma.md`
- `docs/referencias/guia-prompts-automacao.md` (Fase 1: Exploração)

### Anti-Patterns Checklist

> **Context**: Prevents common problems identified in previous implementations

**Quando aplicar:**
- ✅ Projeto identificou anti-padrões recorrentes
- ✅ Há necessidade de prevenir problemas comuns
- ✅ Problemas específicos foram identificados

**Práticas:**
- ✅ Documentar problema, validação e exemplos para cada anti-padrão
- ✅ Adicionar exemplos de código correto e incorreto
- ✅ Criar checklist de validação final
- ✅ Referenciar ADRs relacionadas

**Referências:**
- `docs/referencias/checklist-anti-padroes.md`
- `docs/referencias/checklist-validacao-continua.md` (complementa)

### Custom Commands Documentation

> **Context**: Baseado em [ADR-0012](../docs/adr/0012-documentation-of-custom-commands.md)

**Quando aplicar:**
- ✅ Projetos com comandos/funções customizadas
- ✅ Necessidade de documentar utilitários reutilizáveis
- ✅ Múltiplos desenvolvedores usando os mesmos comandos

**Práticas:**
- ✅ Documentar todos os comandos customizados
- ✅ Adicionar exemplos de uso
- ✅ Referenciar ADRs relacionadas
- ✅ Atualizar referência quando modificar

**Referências:**
- [ADR-0012](../docs/adr/0012-documentation-of-custom-commands.md): Documentation of Custom Commands

### Page Object Hierarchy Guidelines

> **Context**: Baseado em [ADR-0008](../docs/adr/0008-use-page-object-hierarchy.md)

**Quando usar hierarquia:**
- ✅ Módulo tem 3+ variantes com funcionalidade comum significativa
- ✅ Métodos comuns representam >30% dos métodos totais
- ✅ Variantes compartilham workflows complexos
- ✅ Manutenção de código comum é difícil sem hierarquia

**Quando NÃO usar hierarquia:**
- ❌ Apenas 1-2 variantes existem
- ❌ Variantes são muito diferentes
- ❌ Métodos comuns são mínimos (<30% dos métodos totais)
- ❌ Hierarquia adiciona mais complexidade que valor

**Referências:**
- [ADR-0008](../docs/adr/0008-use-page-object-hierarchy.md): Use Page Object Hierarchy

---

## 🎯 Adaptação para Diferentes Tipos de Projetos

### Para Projetos de Testes Automatizados

- **ADRs comuns:** Page Object Pattern, Locators, Session Management, Reporting
- **Documentações:** Arquitetura de cada spec/teste
- **Referências:** Comandos customizados, padrões de teste, guias de locators

**Adaptação de Mode Selection Guide:**
- **Plan Mode:** Para criar novos módulos de teste, refatorar Page Objects, adicionar múltiplos specs
- **Agent Mode:** Para adicionar um novo teste em spec existente, corrigir locator, atualizar fixture
- **Ask Mode:** Para entender padrão de Page Object, consultar ADR sobre locators

**Adaptação de Automatic Test Execution:**
- Executar spec específico após modificar Page Object
- Executar suite de testes relacionada após modificar comando customizado
- Exemplo: `npm test -- --spec "cypress/e2e/modulo/spec.spec.js"`

### Para Projetos de Desenvolvimento

- **ADRs comuns:** Framework escolhido, Padrões de código, Estrutura de pastas, Gerenciamento de estado
- **Documentações:** Arquitetura de features/módulos
- **Referências:** Padrões de código, guias de componentes, boas práticas

**Adaptação de Mode Selection Guide:**
- **Plan Mode:** Para criar nova feature com múltiplos componentes, refatorar arquitetura, adicionar novo módulo
- **Agent Mode:** Para adicionar método em componente existente, corrigir bug simples, atualizar estilo
- **Ask Mode:** Para entender padrão de componente, consultar ADR sobre estrutura

**Adaptação de Automatic Test Execution:**
- Executar testes unitários do componente modificado
- Executar testes de integração após modificar serviço compartilhado
- Exemplo: `npm test -- ComponentName.test.js` ou `pytest tests/test_service.py`

### Para Projetos de Infraestrutura

- **ADRs comuns:** Tecnologias de deploy, Estrutura de ambientes, Monitoramento
- **Documentações:** Arquitetura de infraestrutura, processos de deploy
- **Referências:** Guias de operação, troubleshooting, manutenção

**Adaptação de Mode Selection Guide:**
- **Plan Mode:** Para criar nova infraestrutura, modificar pipeline de CI/CD, adicionar novo ambiente
- **Agent Mode:** Para atualizar configuração simples, corrigir script de deploy, ajustar variável de ambiente
- **Ask Mode:** Para entender processo de deploy, consultar ADR sobre infraestrutura

**Adaptação de Automatic Test Execution:**
- Validar configuração após modificar arquivo de infraestrutura
- Executar testes de validação após modificar pipeline
- Exemplo: `terraform validate` ou `ansible-playbook --check`

---

## ✅ Checklist de Implementação

Use este checklist ao replicar a estrutura:

### Estrutura Básica
- [ ] Criar diretórios principais (`docs/adr`, `docs/cases`, `docs/referencias`)
- [ ] Criar `.cursor/rules/architeture.mdc` (se usar Cursor)
- [ ] Criar ADR-0001 (Record Architecture Decisions)
- [ ] Criar README dos ADRs

### Documentação Inicial
- [ ] Criar Guia de Decisões Rápidas
- [ ] Criar Guia de Prompts para Automação
- [ ] Criar Processo de Documentação
- [ ] Criar Checklist de Validação
- [ ] Criar Checklist de Anti-padrões (Recomendado)
- [ ] Criar README de Referências
- [ ] Criar README de Cases
- [ ] Criar README Principal

### Documentação Avançada (Recomendado)
- [ ] Criar Biblioteca de Padrões de Código
- [ ] Criar Mapeamento de Relacionamentos
- [ ] Criar Template de Exploração Autônoma
- [ ] Criar Template de Plano de Implementação
- [ ] Criar Exemplo de Implementação (Opcional mas Recomendado)

### Documentação Opcional
- [ ] Criar Guia de Execução Paralela (se aplicável)

### Primeiras Decisões
- [ ] Documentar 2-3 decisões arquiteturais importantes como ADRs
- [ ] Criar 1-2 documentações de exemplo
- [ ] Atualizar regras do Cursor com ADRs principais

### Manutenção
- [ ] Estabelecer processo de revisão de ADRs
- [ ] Definir responsável pela manutenção da documentação
- [ ] Criar processo de onboarding que inclui leitura da documentação

---

## 🔄 Processo de Manutenção

### Atualização de ADRs

1. **Quando atualizar:**
   - Decisão mudou → Atualizar status para "Deprecated" ou "Superseded"
   - Nova informação relevante → Adicionar na seção "Notes"
   - Contexto mudou → Atualizar seção "Context"

2. **Como atualizar:**
   - Editar o arquivo do ADR
   - Atualizar status se necessário
   - Adicionar referência ao novo ADR se houver supersedência
   - Atualizar README dos ADRs

### Criação de Novos ADRs

1. **Quando criar:**
   - Decisão arquitetural significativa
   - Escolha de tecnologia importante
   - Padrão que afeta múltiplas partes do projeto
   - Decisão que pode ser questionada no futuro

2. **Processo:**
   - Criar arquivo seguindo nomenclatura: `XXXX-descriptive-title.md`
   - Usar próximo número sequencial
   - Seguir template padrão
   - Atualizar README dos ADRs
   - Referenciar em código/documentação relacionada

### Atualização de Documentações

1. **Quando atualizar:**
   - Código relacionado mudou significativamente
   - Novos padrões foram aplicados
   - ADRs relacionadas mudaram

2. **Processo:**
   - Identificar o que mudou
   - Atualizar seções relevantes
   - Manter histórico se necessário
   - Revisar referências a ADRs

---

## 📊 Métricas e Indicadores

### Indicadores de Qualidade

- **Cobertura de ADRs:** % de decisões arquiteturais documentadas
- **Atualização:** Data da última atualização de cada ADR
- **Referências:** Número de referências a ADRs no código
- **Documentações:** Número de documentações criadas vs. número de features/módulos

### Revisão Periódica

- **Mensal:** Revisar ADRs antigas (>6 meses sem atualização)
- **Trimestral:** Revisar estrutura de documentação
- **Semestral:** Avaliar necessidade de novos guias/referências

---

## 🎓 Onboarding

### Para Novos Desenvolvedores

1. **Leitura obrigatória:**
   - `docs/README.md` - Visão geral
   - `docs/referencias/guia-decisoes-rapidas.md` - Guia principal
   - `docs/adr/README.md` - Decisões arquiteturais

2. **Leitura recomendada:**
   - ADRs principais relacionadas ao trabalho
   - Documentações dos módulos que vai trabalhar
   - Processo de documentação

3. **Prática:**
   - Criar primeiro ADR (com supervisão)
   - Criar primeira documentação (seguindo template)
   - Participar de code review usando checklist

---

## 🔗 Referências Externas

### Sobre ADRs

- [Michael Nygard's Article on ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
- [ADR Tools](https://github.com/npryce/adr-tools)

### Sobre Documentação

- [Documentation Best Practices](https://www.writethedocs.org/guide/)
- [Technical Writing Guidelines](https://developers.google.com/tech-writing)

---

## 📝 Notas Finais

### Princípios Importantes

1. **Documentação é viva:** Deve ser atualizada conforme o projeto evolui
2. **Qualidade sobre quantidade:** Melhor ter poucas ADRs bem escritas que muitas superficiais
3. **Acessibilidade:** Documentação deve ser fácil de encontrar e entender
4. **Referências cruzadas:** ADRs e documentações devem se referenciar
5. **Processo claro:** Todos devem saber quando e como criar/atualizar documentação

### Dicas

- Comece simples: Crie estrutura básica e vá adicionando conforme necessário
- Use exemplos: Referências a código real ajudam muito
- Mantenha atualizado: Revisão periódica evita documentação obsoleta
- Seja consistente: Siga templates e padrões estabelecidos
- Colabore: Documentação é esforço coletivo

---

**Última atualização:** 2025-01-30  
**Versão:** 2.2  
**Mantido por:** Equipe de Documentação

