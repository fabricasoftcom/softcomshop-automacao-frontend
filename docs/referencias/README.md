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

### 🤖 `guia-prompts-automacao.md`

**Guia de prompts padronizados para automação autônoma com Cursor.**

Este guia contém templates de prompts prontos para uso que permitem ao Cursor explorar telas, mapear locators e criar testes automaticamente seguindo as ADRs do projeto.

**Conteúdo:**
- Prompt completo para rotina completa de criação de testes
- Prompts específicos por fase (Exploração, Geração de Estrutura, Validação)
- Prompts para mapeamento de cenários de teste
- Prompts para casos específicos (Listagem, Cadastro, Formulários Complexos)
- Prompts de otimização e validação
- Seção "Como Usar" com 3 métodos diferentes
- Armadilhas comuns e como evitá-las

**Quando usar:**
- Ao criar testes do zero e querer que o Cursor faça tudo automaticamente
- Ao explorar uma nova tela e mapear locators
- Ao mapear cenários de teste para cobertura total
- Ao otimizar código de testes existente
- Para padronizar a criação de testes com o Cursor

**Referenciado em:**
- `.cursor/rules/architeture.mdc` (regras do Cursor - gatilho automático)
- `template-plano-implementacao.md` (Fase 1: Exploração)
- ADR-0016 (Planning Before Implementation)

---

### 🔧 `guia-configuracoes-multi-segmento.md`

**Guia completo para criar e usar configurações específicas por segmento no Cypress.**

Este guia documenta o padrão para isolar testes de diferentes segmentos (petshop, e-commerce, etc.) com URLs e configurações diferentes, permitindo execução isolada de testes por segmento.

**Conteúdo:**
- Template completo de configuração multi-segmento
- Explicação detalhada de cada propriedade
- Exemplo real baseado no petshop
- Scripts npm recomendados
- Como executar em modo interativo e headless
- Boas práticas (o que fazer e não fazer)
- Troubleshooting de problemas comuns
- Processo passo a passo para criar novo segmento
- Checklist de validação

**Quando usar:**
- Ao criar configuração para novo segmento
- Ao precisar isolar testes de um segmento específico
- Ao ter dúvidas sobre configurações multi-segmento
- Para entender como funciona a configuração do petshop

**Referenciado em:**
- `README.MD` (seção de execução de testes)
- `docs/architecture.md` (seção de configurações)

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
- Seção de validação de anti-padrões

**Quando usar:**
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

**Referenciado em:**
- ADR-0013 (Continuous Validation Checklist)
- `.cursor/rules/architeture.mdc`
- `GUIA_DECISOES_RAPIDAS.md`

---

### 🚨 `checklist-anti-padroes.md`

**Checklist específico para prevenir problemas comuns identificados em implementações anteriores.**

Este checklist previne anti-padrões críticos como testes com muitas condicionais, locators não validados, falta de exploração manual, estrutura assumida e testes não assertivos.

**Conteúdo:**
- 5 anti-padrões críticos com validações específicas
- Exemplos de código correto e incorreto para cada anti-padrão
- Checklist de validação antes de considerar completo
- Referências a ADRs e lições aprendidas

**Quando usar:**
- Durante o desenvolvimento de novos testes
- Durante code review de Pull Requests
- Para auto-validação antes de submeter código
- Em revisões periódicas do código

**Referenciado em:**
- `checklist-validacao-continua.md`
- `.cursor/rules/architeture.mdc`
- Lições aprendidas do caso Gestão de Estoque

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

### 📋 `template-plano-implementacao.md`

**Template padronizado para criar planos de implementação.**

Template completo e estruturado baseado nos padrões identificados nas implementações de Gestor de Promoções e Gestor de Preços, garantindo coerência e acertividade em futuras implementações.

**Conteúdo:**
- Estrutura completa de fases (Exploração, Estrutura, Implementação, Documentação, Validação)
- Padrões de nomenclatura de TODOs
- Dependências entre tarefas
- Checklist de qualidade do plano
- Exemplo completo de uso
- Lições aprendidas

**Quando usar:**
- Ao criar plano para nova funcionalidade (3+ arquivos)
- Ao implementar novo módulo de testes
- Ao criar fluxo completo (listagem + cadastro)
- Para garantir consistência em planos futuros

**Referenciado em:**
- ADR-0016 (Planning Before Implementation)
- `.cursor/rules/architeture.mdc`

---

### 🔍 `template-exploracao-autonoma.md`

**Template interativo de exploração autônoma com checklist executável pelo Cursor.**

Template estruturado que fornece um checklist passo a passo detalhado para exploração autônoma de telas, garantindo que todas as etapas sejam seguidas corretamente.

**Conteúdo:**
- Checklist detalhado de pré-requisitos
- Checklist para exploração de listagens
- Checklist para exploração de cadastros
- Checklist para funcionalidades específicas
- Checklist para documentação de descobertas
- Checklist de validação final
- Template de documento de descobertas
- Checklist de armadilhas comuns

**Quando usar:**
- Durante exploração autônoma de novas telas
- Para garantir que todas as etapas de exploração sejam seguidas
- Para documentar descobertas de forma padronizada
- Para validar que exploração foi completa antes de prosseguir

**Referenciado em:**
- `guia-prompts-automacao.md` (Fase 1: Exploração)
- ADR-0016 (Planning Before Implementation)
- `.cursor/rules/architeture.mdc`

---

### 💻 `biblioteca-padroes-codigo.md`

**Biblioteca pesquisável de padrões de código reutilizáveis.**

Snippets prontos para copiar e adaptar para padrões comuns identificados nas lições aprendidas, facilitando descoberta rápida durante implementação.

**Conteúdo:**
- Manipulação de valores monetários brasileiros
- Validação de estado antes e depois de operações
- Autocomplete com debounce
- Date Range Picker
- Métodos resilientes em ambiente compartilhado
- Substituição de waits fixos
- Links para documentação completa

**Quando usar:**
- Ao precisar de padrão de código específico
- Para descobrir como implementar padrões comuns
- Para copiar e adaptar snippets prontos
- Para entender padrões estabelecidos no projeto

**Referenciado em:**
- `guia-decisoes-rapidas.md` (seção "Preciso de um padrão de código?")
- `aprendizagens-e-licoes.md` (fonte de padrões)
- `.cursor/rules/architeture.mdc`

---

### 🤖 `ecossistema-ai-toolkit-melhoria-continua.md`

**Documento completo do ecossistema de melhoria contínua com AI Toolkit e Cursor.**

Explica como as partes se integram (regras, ADRs, AI Toolkit, relatórios, Cursor Agent), o fluxo já realizado de implementação e como utilizar na prática: quando usar cada script (ai:rules, ai:scenarios, ai:flaky), exemplos de input e resultado de cada um, e o fluxo completo em 12 passos (da execução da IA até a validação do que o Cursor implementou).

**Conteúdo:**
- Visão geral do ecossistema e diagramas (fluxo de uso, integração)
- Componentes (regras, AI Toolkit, Cursor Agent, relatórios Cursor-ready)
- Fluxo já realizado (5 fases de implementação)
- Quando usar cada script e como utilizar (resumo)
- Exemplos reais dos três usos da IA (ai:rules, ai:scenarios, ai:flaky)
- Fluxo completo: uso da IA e uso no Cursor-ready (12 passos detalhados)
- Referências cruzadas (ADR-0017, ai-toolkit/README, architeture.mdc)

**Quando usar:**
- Para entender todo o ecossistema de melhoria contínua
- Antes de rodar ai:rules, ai:scenarios ou ai:flaky
- Para seguir o passo a passo completo (IA → revisão → Cursor Agent → validação)

**Referenciado em:**
- ADR-0017 (Use AI SDK for Continuous Improvement)
- `.cursor/rules/architeture.mdc` (seção AI Toolkit)
- `ai-toolkit/README.md`
- `mapeamento-relacionamentos.md`

---

### 🔗 `mapeamento-relacionamentos.md`

**Sistema de referências cruzadas inteligentes com mapa de relacionamentos.**

Mapa centralizado que documenta todos os relacionamentos entre documentações arquiteturais, facilitando descoberta de documentações relacionadas e manutenção de referências bidirecionais.

**Conteúdo:**
- Relacionamentos por módulo (Financeiro, Produtos, etc.)
- Diagramas de relacionamento
- Checklist para uso ao criar nova documentação
- Busca rápida por tipo de relacionamento
- Exemplo de uso prático

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
- Case study: Implementação do módulo Funcionários

**Quando usar:**
- Para entender o contexto histórico do projeto
- Para onboarding de novos desenvolvedores
- Para referência em futuros projetos
- Para entender as decisões arquiteturais

**Status:** Documento histórico e educacional

---

### 📖 `exemplo-implementacao-funcionarios.md`

**Case study completo da implementação bem-sucedida do módulo de Funcionários.**

Documento detalhado que demonstra a aplicação prática do template padronizado de plano de implementação, servindo como referência e exemplo para futuras implementações.

**Conteúdo:**
- Resumo executivo e métricas
- Processo completo seguido (5 fases)
- Lições aprendidas específicas
- Problemas encontrados e soluções
- Conformidade com ADRs (100%)
- Estrutura de arquivos criados
- Referências e documentações relacionadas

**Quando usar:**
- Como referência ao criar novo plano de implementação
- Para entender como aplicar o template corretamente
- Para ver exemplo prático de implementação completa
- Para onboarding de novos desenvolvedores
- Para validar se implementação está seguindo padrões

**Referenciado em:**
- Template de Plano de Implementação
- ADR-0016 (Planning Before Implementation)
- Aprendizagens e Lições
- `.cursor/rules/architeture.mdc`

**Status:** ✅ Exemplo completo e funcional

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

1. **Automatize:** `guia-prompts-automacao.md` (Opcional, mas recomendado)
   - Use o prompt completo para criar testes automaticamente
   - Ou use prompts específicos por fase (Exploração, Locators, Page Object, Spec)
   - O Cursor seguirá automaticamente o protocolo quando você usar os prompts
   - **Para exploração completa:** Use `template-exploracao-autonoma.md` que fornece checklist detalhado

2. **Planeje:** `template-plano-implementacao.md`
   - Crie plano estruturado (se 3+ arquivos)
   - Siga fases: Exploração → Mapeamento de Cenários → Estrutura → Implementação → Documentação → Validação
   - Use nomenclatura padronizada
   - Use o guia de prompts na Fase 1 (Exploração)
   - **Use o template de exploração autônoma** para garantir exploração completa

3. **Consulte:** `guia-decisoes-rapidas.md`
   - Qual comando de login usar?
   - Preciso criar Page Object?
   - Quais tags usar?
   - Preciso de um padrão de código? → `biblioteca-padroes-codigo.md`

4. **Siga:** `processo-documentacao.md`
   - Crie a documentação obrigatória
   - Use o template padronizado
   - **Consulte `mapeamento-relacionamentos.md`** para identificar documentações relacionadas
   - **Adicione referências bidirecionais** em todas as documentações relacionadas

4. **Valide:** `checklist-validacao-continua.md` e `checklist-anti-padroes.md`
   - Antes de submeter o PR
   - Garanta conformidade com ADRs
   - Prevenha anti-padrões comuns

### Modificando um Teste Existente

1. **Consulte:** `guia-decisoes-rapidas.md`
   - Para dúvidas sobre padrões
   - Para problemas comuns

2. **Valide:** `checklist-validacao-continua.md`
   - Garanta que modificações estão conformes

### Code Review

1. **Use:** `checklist-validacao-continua.md` e `checklist-anti-padroes.md`
   - Valide conformidade com todas as ADRs
   - Prevenha anti-padrões comuns
   - Verifique documentação quando aplicável

2. **Consulte:** `referencia-comandos-customizados.md`
   - Valide uso correto dos comandos

### Decisões Arquiteturais

1. **Consulte:** `analise-page-objects-hierarquicos.md`
   - Para decisões sobre hierarquia de Page Objects

2. **Consulte:** `aprendizagens-e-licoes.md`
   - Para entender contexto e lições aprendidas

### Ecossistema de Melhoria Contínua (AI Toolkit + Cursor)

1. **Entenda:** `ecossistema-ai-toolkit-melhoria-continua.md`
   - Visão geral, quando usar cada script, exemplos e fluxo completo em 12 passos

2. **Execute:** Scripts `npm run ai:rules`, `ai:scenarios` ou `ai:flaky`
   - Relatórios em `ai-reports/`; revise e marque [APROVADO]/[REJEITADO]

3. **Implemente:** Copie a seção Cursor-ready para o Cursor em modo Agent
   - Instrução: "Implemente as ações aprovadas abaixo."

---

## 📂 Estrutura de Arquivos

```
docs/referencias/
├── README.md                              # Este arquivo (índice)
├── guia-decisoes-rapidas.md              # ⭐ Guia principal de referência
├── guia-prompts-automacao.md             # 🤖 Guia de prompts para automação
├── guia-configuracoes-multi-segmento.md  # 🔧 Guia de configurações multi-segmento
├── referencia-comandos-customizados.md   # Referência de comandos
├── checklist-validacao-continua.md       # Checklist de validação
├── checklist-anti-padroes.md              # 🚨 Checklist de anti-padrões
├── processo-documentacao.md               # Processo de documentação
├── template-plano-implementacao.md        # 📋 Template de plano
├── template-exploracao-autonoma.md        # 🔍 Template de exploração autônoma
├── biblioteca-padroes-codigo.md           # 💻 Biblioteca de padrões de código
├── ecossistema-ai-toolkit-melhoria-continua.md # 🤖 Ecossistema AI Toolkit + Cursor
├── mapeamento-relacionamentos.md          # 🔗 Mapa de relacionamentos
├── exemplo-implementacao-funcionarios.md # 📖 Exemplo real de implementação
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
- **ADR-0016:** Planning Before Implementation

---

## 📝 Manutenção

### Atualizar Documentos

- **guia-decisoes-rapidas.md:** Atualizar quando novas dúvidas comuns surgirem
- **referencia-comandos-customizados.md:** Atualizar quando novos comandos forem criados
- **checklist-validacao-continua.md:** Atualizar quando novas ADRs forem criadas
- **checklist-anti-padroes.md:** Atualizar quando novos anti-padrões forem identificados
- **processo-documentacao.md:** Atualizar quando o processo mudar
- **template-plano-implementacao.md:** Atualizar quando novos padrões de plano forem identificados

### Adicionar Novos Documentos

1. Adicione o arquivo nesta pasta
2. Atualize este README.md com a descrição
3. Adicione referências nos documentos relacionados
4. Atualize `.cursor/rules/architeture.mdc` se necessário

---

**Última atualização:** 2025-12-12  
**Status:** ✅ Documentos Ativos e Mantidos
