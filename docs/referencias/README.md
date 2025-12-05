# 📚 Referências e Guias do Projeto

Esta pasta contém todos os documentos de referência rápida, guias práticos e ferramentas de apoio para desenvolvimento e manutenção dos testes automatizados.

---

## 🚀 Guias de Referência Rápida

### ⭐ `guia-decisoes-rapidas.md`

**Guia de decisões rápidas para dúvidas comuns durante o desenvolvimento.**

Este é o documento principal para consulta rápida quando você tem dúvidas sobre padrões arquiteturais ou decisões de implementação.

**Conteúdo:**
- 8 seções de dúvidas frequentes com respostas diretas
- Árvore de decisão visual para criar novos testes
- Problemas comuns e soluções práticas
- Tabelas de referência rápida (ADRs, documentos)
- Dicas rápidas (Faça/Não Faça)
- Resumo de decisões críticas

**Quando usar:**
- Ao criar um novo teste e não souber qual padrão seguir
- Ao modificar um teste existente e tiver dúvidas
- Durante code review para validar decisões
- Para onboarding de novos desenvolvedores

**Referenciado em:**
- `.cursor/rules/architeture.mdc` (regras do Cursor)
- ADRs relacionadas

---

### 📖 `referencia-comandos-customizados.md`

**Referência completa de todos os comandos Cypress customizados do projeto.**

Documentação detalhada de cada comando customizado, incluindo quando usar, parâmetros, exemplos e ADRs relacionadas.

**Conteúdo:**
- 12 comandos customizados documentados
- Categorias: Autenticação, Navegação, Validação, Configuração
- Exemplos práticos de uso
- Referências às ADRs relacionadas
- Status de uso (comandos ativos vs. não utilizados)

**Quando usar:**
- Para entender qual comando usar em cada situação
- Para aprender sobre comandos disponíveis
- Para documentar novos comandos customizados

**Referenciado em:**
- ADR-0012 (Documentation of Custom Commands)
- `.cursor/rules/architeture.mdc`
- `GUIA_DECISOES_RAPIDAS.md`

---

## ✅ Ferramentas de Validação e Processo

### 📋 `checklist-validacao-continua.md`

**Checklist de validação contínua para code review.**

Use este checklist durante o code review de novos testes ou modificações para garantir conformidade contínua com todas as ADRs.

**Conteúdo:**
- Checklist detalhado por ADR
- Exemplos de conformidade e não-conformidade
- Template para revisões de Pull Requests
- Critérios objetivos de validação

**Quando usar:**
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

**Referenciado em:**
- ADR-0013 (Continuous Validation Checklist)
- `.cursor/rules/architeture.mdc`
- `GUIA_DECISOES_RAPIDAS.md`

---

### 📝 `processo-documentacao.md`

**Processo padronizado para criar documentações arquiteturais.**

Template e processo obrigatório para criar documentações de novos testes, garantindo consistência e qualidade.

**Conteúdo:**
- Passo a passo completo para criar documentação
- Template padronizado com seções obrigatórias
- Checklist de boas práticas
- Exemplos de referência
- Integração com o índice central (`docs/cases/README.md`)

**Quando usar:**
- Ao criar documentação de um novo teste (OBRIGATÓRIO)
- Para atualizar documentação existente
- Para entender o padrão de documentação do projeto

**Referenciado em:**
- ADR-0006 (Mandatory Documentation for New Tests)
- ADR-0014 (Standardized Architectural Documentation Process)
- `.cursor/rules/architeture.mdc`
- `GUIA_DECISOES_RAPIDAS.md`

---

## 📊 Análises e Aprendizados

### 🔍 `analise-page-objects-hierarquicos.md`

**Análise completa de Page Objects hierárquicos.**

Análise detalhada sobre quando usar hierarquia de Page Objects, critérios de decisão e padrões identificados no projeto.

**Conteúdo:**
- Critérios para usar/não usar hierarquia
- Análise do módulo NFe (caso de estudo)
- Padrões identificados
- Recomendações e boas práticas
- Estrutura recomendada

**Quando usar:**
- Ao decidir se um módulo precisa de hierarquia
- Para entender os padrões de hierarquia do projeto
- Para validar decisões arquiteturais

**Referenciado em:**
- ADR-0008 (Use Page Object Hierarchy)
- `.cursor/rules/architeture.mdc`
- `GUIA_DECISOES_RAPIDAS.md`

---

### 📚 `aprendizagens-e-licoes.md`

**Aprendizagens e lições do plano de ação de estruturação do projeto.**

Documento reflexivo que captura os principais aprendizados, insights e lições aprendidas durante todo o processo de padronização e organização.

**Conteúdo:**
- 6 aprendizagens principais
- Impacto de cada aprendizagem
- Lições para futuros projetos
- Estatísticas e métricas
- Recomendações

**Quando usar:**
- Para entender o contexto histórico do projeto
- Para onboarding de novos desenvolvedores
- Para referência em futuros projetos
- Para entender as decisões arquiteturais

**Status:** Documento histórico e educacional

---

### 🔄 `guia-replicacao-estrutura-documentacao.md`

**Guia completo para replicar a estrutura de documentação, regras e ADRs em outros projetos.**

Este guia fornece instruções passo a passo para criar a mesma estrutura de documentação organizada, incluindo ADRs, documentações arquiteturais, guias de referência e regras do Cursor.

**Conteúdo:**
- Estrutura completa de diretórios
- Passo a passo detalhado para criação
- Templates de ADRs e documentações
- Processo de manutenção
- Adaptação para diferentes tipos de projetos
- Checklist de implementação
- Guia de onboarding

**Quando usar:**
- Ao iniciar um novo projeto e querer replicar esta estrutura
- Para entender como a estrutura foi criada
- Para adaptar a estrutura para outro tipo de projeto
- Para onboarding de novos projetos

**Status:** Guia de referência para replicação

---

## 🔗 Fluxo de Uso Recomendado

### Criando um Novo Teste

1. **Consulte:** `guia-decisoes-rapidas.md`
   - Qual comando de login usar?
   - Preciso criar Page Object?
   - Quais tags usar?

2. **Siga:** `processo-documentacao.md`
   - Crie a documentação obrigatória
   - Use o template padronizado

3. **Valide:** `checklist-validacao-continua.md`
   - Antes de submeter o PR
   - Garanta conformidade com ADRs

### Modificando um Teste Existente

1. **Consulte:** `guia-decisoes-rapidas.md`
   - Para dúvidas sobre padrões
   - Para problemas comuns

2. **Valide:** `checklist-validacao-continua.md`
   - Garanta que modificações estão conformes

### Code Review

1. **Use:** `checklist-validacao-continua.md`
   - Valide conformidade com todas as ADRs
   - Verifique documentação quando aplicável

2. **Consulte:** `referencia-comandos-customizados.md`
   - Valide uso correto dos comandos

### Decisões Arquiteturais

1. **Consulte:** `analise-page-objects-hierarquicos.md`
   - Para decisões sobre hierarquia de Page Objects

2. **Consulte:** `aprendizagens-e-licoes.md`
   - Para entender contexto e lições aprendidas

---

## 📂 Estrutura de Arquivos

```
docs/referencias/
├── README.md                              # Este arquivo (índice)
├── guia-decisoes-rapidas.md              # ⭐ Guia principal de referência
├── referencia-comandos-customizados.md   # Referência de comandos
├── checklist-validacao-continua.md       # Checklist de validação
├── processo-documentacao.md               # Processo de documentação
├── analise-page-objects-hierarquicos.md # Análise de hierarquia
├── aprendizagens-e-licoes.md             # Aprendizados históricos
└── guia-replicacao-estrutura-documentacao.md # Guia de replicação
```

---

## 🔗 Referências Externas

### Documentos Relacionados

- **ADRs:** `docs/adr/README.md` - Todas as decisões arquiteturais
- **Regras do Cursor:** `.cursor/rules/architeture.mdc` - Regras ativas do projeto
- **Documentações de Specs:** `docs/cases/README.md` - Índice de documentações
- **Lista de Testes:** `docs/testes.md` - Lista completa de testes

### ADRs Relacionadas

- **ADR-0004:** Use cy.session for Login Persistence
- **ADR-0006:** Mandatory Documentation for New Tests
- **ADR-0008:** Use Page Object Hierarchy
- **ADR-0012:** Documentation of Custom Commands
- **ADR-0013:** Continuous Validation Checklist
- **ADR-0014:** Standardized Architectural Documentation Process

---

## 📝 Manutenção

### Atualizar Documentos

- **guia-decisoes-rapidas.md:** Atualizar quando novas dúvidas comuns surgirem
- **referencia-comandos-customizados.md:** Atualizar quando novos comandos forem criados
- **checklist-validacao-continua.md:** Atualizar quando novas ADRs forem criadas
- **processo-documentacao.md:** Atualizar quando o processo mudar

### Adicionar Novos Documentos

1. Adicione o arquivo nesta pasta
2. Atualize este README.md com a descrição
3. Adicione referências nos documentos relacionados
4. Atualize `.cursor/rules/architeture.mdc` se necessário

---

**Última atualização:** 2024-12-20  
**Status:** ✅ Documentos Ativos e Mantidos
