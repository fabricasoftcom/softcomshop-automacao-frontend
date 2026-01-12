# Template de Exploração Autônoma

**Versão:** 1.0  
**Data:** 2025-01-30  
**Status:** ✅ Ativo

---

## 🎯 Objetivo da Exploração

**Módulo:** [Preencher com nome do módulo]  
**Funcionalidade:** [Preencher com nome da funcionalidade]  
**URL Relativa:** `/[caminho]` (ex: `/financeiro/contas-a-receber`)

---

## ✅ Checklist de Exploração (Seguir Ordem)

### Pré-requisitos

- [ ] **Ler `baseUrl` de `cypress.config.js`**
  - **Por quê:** Garante que URLs relativas serão usadas corretamente
  - **Como:** Ler arquivo `cypress.config.js` e extrair valor de `baseUrl`
  - **Validação:** Confirmar que `baseUrl` foi lido e armazenado

- [ ] **Validar acessibilidade da aplicação**
  - **Por quê:** Garante que aplicação está acessível antes de explorar
  - **Como:** Usar `browser_navigate` com URL relativa `/` ou `/auth/login`
  - **Validação:** Confirmar que página carregou (usar `browser_snapshot`)

- [ ] **Identificar comando de login apropriado (fiscal vs geral)**
  - **Por quê:** Garante uso do comando correto (ADR-0004)
  - **Como:** 
    - Se funcionalidade FISCAL (NFe, NFCe, SPED, Sintegra): usar `cy.login()`
    - Se funcionalidade GERAL: usar `cy.loginArmazenandoSessao()`
  - **Validação:** Confirmar comando identificado e credenciais disponíveis em `cypress/fixtures/users.json`

---

### Exploração de Listagem (se aplicável)

- [ ] **Navegar até listagem usando `browser_navigate` com URL relativa**
  - **Por quê:** Evita usar URLs absolutas hardcoded
  - **Como:** 
    - Usar `browser_navigate` com URL relativa ao `baseUrl` (ex: `/financeiro/contas-a-receber`)
    - Ou navegar via menu usando `browser_click` após login
  - **Validação:** Confirmar que página de listagem carregou

- [ ] **Capturar snapshot inicial com `browser_snapshot`**
  - **Por quê:** Documenta estado inicial da página
  - **Como:** Executar `browser_snapshot` após navegação
  - **Validação:** Confirmar que snapshot foi capturado

- [ ] **Coletar locators de tabela usando `browser_evaluate`:**
  - [ ] **ID da tabela** (priorizar ID sobre classe)
  - [ ] **Classes das linhas** (ex: `tbody tr` ou classe específica)
  - [ ] **IDs/classes das colunas principais** (identificar pelo menos 3-5 colunas principais)
  - **Por quê:** IDs são mais estáveis que classes (ADR-0015)
  - **Como:** Usar `browser_evaluate` para inspecionar DOM da tabela
  - **Validação:** Confirmar que locators foram coletados e documentados

- [ ] **Coletar locators de botões principais:**
  - [ ] **Botão "Novo"** (ID ou classe, priorizar ID)
  - [ ] **Botão "Pesquisar"** (se houver, ID ou classe)
  - [ ] **Botões de ação** (Editar, Excluir linha - IDs ou classes)
  - **Por quê:** Botões principais são essenciais para interação
  - **Como:** Usar `browser_evaluate` para inspecionar botões
  - **Validação:** Confirmar que locators foram coletados

- [ ] **Coletar locators de formulário de pesquisa (se houver):**
  - [ ] **Campos de pesquisa** (IDs ou classes)
  - [ ] **Botão de pesquisa** (ID ou classe)
  - [ ] **Botão toggle de pesquisa** (se houver, ID ou classe)
  - **Por quê:** Formulário de pesquisa pode ser necessário para testes
  - **Como:** Usar `browser_evaluate` para inspecionar formulário
  - **Validação:** Confirmar que locators foram coletados

- [ ] **Validar estrutura completa com `browser_snapshot`**
  - **Por quê:** Garante que estrutura completa foi capturada
  - **Como:** Executar `browser_snapshot` após coletar todos os locators
  - **Validação:** Confirmar que snapshot final foi capturado

---

### Exploração de Cadastro (se aplicável)

- [ ] **Clicar em "Novo" ou navegar diretamente usando `browser_click` ou `browser_navigate`**
  - **Por quê:** Acessa formulário de cadastro
  - **Como:** 
    - Se botão "Novo" existe: usar `browser_click` no locator coletado
    - Se não: usar `browser_navigate` com URL relativa (ex: `/financeiro/contas-a-receber/novo`)
  - **Validação:** Confirmar que formulário de cadastro foi aberto

- [ ] **Capturar snapshot do formulário com `browser_snapshot`**
  - **Por quê:** Documenta estado inicial do formulário
  - **Como:** Executar `browser_snapshot` após abrir formulário
  - **Validação:** Confirmar que snapshot foi capturado

- [ ] **Coletar locators de TODOS os campos usando `browser_evaluate`:**
  - [ ] **Campos obrigatórios** (identificar por atributo `required` ou validação visual)
  - [ ] **Campos opcionais** (campos sem `required`)
  - [ ] **IDs de cada campo** (priorizar IDs sobre classes - ADR-0015)
  - [ ] **Campos condicionais** (campos que aparecem baseado em outros campos)
  - **Por quê:** Todos os campos precisam ser mapeados para testes completos
  - **Como:** Usar `browser_evaluate` para inspecionar todos os inputs, selects, textareas
  - **Validação:** Confirmar que todos os campos foram coletados e categorizados

- [ ] **Coletar locators de botões:**
  - [ ] **Botão "Salvar"** (ID ou classe, priorizar ID)
  - [ ] **Botão "Voltar"** (ID ou classe, se houver)
  - [ ] **Botão "Cancelar"** (ID ou classe, se houver)
  - **Por quê:** Botões são essenciais para interação
  - **Como:** Usar `browser_evaluate` para inspecionar botões
  - **Validação:** Confirmar que locators foram coletados

- [ ] **Executar fluxo completo usando `browser_type` e `browser_click`:**
  - [ ] **Preencher campos obrigatórios** (usar `browser_type` para preencher)
  - [ ] **Clicar em Salvar** (usar `browser_click` no botão Salvar)
  - [ ] **Validar toast/mensagem de sucesso** (usar `browser_snapshot` para capturar)
  - **Por quê:** Executar fluxo completo revela comportamentos dinâmicos e locators corretos
  - **Como:** Usar `browser_type` para preencher campos e `browser_click` para interagir
  - **Validação:** Confirmar que fluxo foi executado e toast foi capturado

- [ ] **Coletar locator de toast/mensagem de sucesso com `browser_evaluate`**
  - [ ] **ID ou classe do toast** (priorizar ID)
  - [ ] **Texto da mensagem de sucesso** (para validação)
  - **Por quê:** Toast de sucesso precisa ser validado nos testes
  - **Como:** Usar `browser_evaluate` para inspecionar elemento de toast
  - **Validação:** Confirmar que locator foi coletado

---

### Exploração de Funcionalidades Específicas

- [ ] **[Funcionalidade 1]: Explorar e coletar locators**
  - **Descrição:** [Descrever funcionalidade específica]
  - **Locators coletados:** [Listar locators encontrados]
  - **Comportamento identificado:** [Descrever comportamento especial]

- [ ] **[Funcionalidade 2]: Explorar e coletar locators**
  - **Descrição:** [Descrever funcionalidade específica]
  - **Locators coletados:** [Listar locators encontrados]
  - **Comportamento identificado:** [Descrever comportamento especial]

**Nota:** Adicionar mais funcionalidades conforme necessário. Cada funcionalidade deve ter descrição, locators coletados e comportamentos identificados.

---

### Documentação de Descobertas

- [ ] **Criar documento temporário `docs/temp-descobertas-[modulo].md`**
  - **Por quê:** Centraliza todas as descobertas em um único lugar
  - **Como:** Criar arquivo markdown com nome descritivo
  - **Validação:** Confirmar que arquivo foi criado

- [ ] **Documentar TODOS os locators encontrados (IDs priorizados)**
  - **Por quê:** Locators são essenciais para criação de Page Objects e Locators
  - **Como:** Listar todos os locators coletados, priorizando IDs
  - **Formato:** Usar template abaixo na seção "Template de Documento de Descobertas"
  - **Validação:** Confirmar que todos os locators foram documentados

- [ ] **Documentar estrutura do formulário**
  - **Por quê:** Estrutura ajuda a entender organização dos campos
  - **Como:** Descrever seções, abas, painéis do formulário
  - **Validação:** Confirmar que estrutura foi documentada

- [ ] **Documentar fluxo completo passo a passo**
  - **Por quê:** Fluxo documentado facilita criação de testes
  - **Como:** Listar cada passo executado durante exploração
  - **Validação:** Confirmar que fluxo foi documentado

- [ ] **Documentar comportamentos especiais (campos condicionais, validações)**
  - **Por quê:** Comportamentos especiais precisam ser tratados nos testes
  - **Como:** Descrever campos que aparecem condicionalmente, validações especiais
  - **Validação:** Confirmar que comportamentos foram documentados

- [ ] **Documentar mensagens de sucesso/erro**
  - **Por quê:** Mensagens precisam ser validadas nos testes
  - **Como:** Capturar texto das mensagens e locators
  - **Validação:** Confirmar que mensagens foram documentadas

---

### Validação Final

- [ ] **Verificar que documento de descobertas foi criado**
  - **Por quê:** Garante que descobertas foram documentadas
  - **Como:** Verificar existência de `docs/temp-descobertas-[modulo].md`
  - **Validação:** Confirmar que arquivo existe e tem conteúdo

- [ ] **Validar que locators principais foram identificados**
  - **Por quê:** Locators principais são essenciais para implementação
  - **Como:** Verificar que pelo menos 80% dos locators principais foram identificados
  - **Validação:** Confirmar que locators principais estão documentados

- [ ] **Validar que fluxo completo foi testado (não apenas inspeção)**
  - **Por quê:** Fluxo completo revela comportamentos dinâmicos
  - **Como:** Verificar que fluxo foi executado (preencher, salvar, validar)
  - **Validação:** Confirmar que fluxo foi executado e documentado

- [ ] **NÃO PROSSEGUIR sem completar validação acima**
  - **Por quê:** Validação garante qualidade da exploração
  - **Como:** Não iniciar Fase 2 (Estrutura Base) sem completar validação
  - **Validação:** Confirmar que todas as validações foram completadas

---

## 📝 Template de Documento de Descobertas

Criar arquivo `docs/temp-descobertas-[modulo].md` com o seguinte conteúdo:

```markdown
# Descobertas: [Módulo] - [Funcionalidade]

**Data:** [Data da exploração]  
**Explorado por:** Cursor (exploração autônoma)

---

## Locators Coletados

### Listagem

- **Tabela:** `#id-tabela` ou `.classe-tabela`
- **Linhas:** `tbody tr` ou `.linha-tabela`
- **Colunas:**
  - Coluna 1: `td:nth-child(1)` ou `#id-coluna-1`
  - Coluna 2: `td:nth-child(2)` ou `#id-coluna-2`
  - [Adicionar mais colunas conforme necessário]
- **Botão Novo:** `#btn-novo` ou `.btn-novo`
- **Botão Pesquisar:** `#btn-pesquisar` ou `.btn-pesquisar` (se houver)
- **Botões de Ação:**
  - Editar: `#btn-editar` ou `.btn-editar`
  - Excluir: `#btn-excluir` ou `.btn-excluir`

### Cadastro

- **Campos Obrigatórios:**
  - Campo [Nome]: `#id-campo-nome` (ID priorizado)
  - Campo [Email]: `#id-campo-email`
  - [Adicionar mais campos conforme necessário]
- **Campos Opcionais:**
  - Campo [Telefone]: `#id-campo-telefone`
  - [Adicionar mais campos conforme necessário]
- **Botões:**
  - Salvar: `#btn-salvar` ou `.btn-salvar`
  - Voltar: `#btn-voltar` ou `.btn-voltar` (se houver)
  - Cancelar: `#btn-cancelar` ou `.btn-cancelar` (se houver)
- **Toast Sucesso:** `.Toastify__toast--success` ou `#toast-sucesso`

### Funcionalidades Específicas

- **[Funcionalidade 1]:**
  - Locator 1: `#id-locator-1`
  - Locator 2: `#id-locator-2`
  - [Adicionar mais locators conforme necessário]

---

## Estrutura Identificada

### Listagem
[Descrição da estrutura da listagem: tabela, botões, formulário de pesquisa]

### Cadastro
[Descrição da estrutura do formulário: seções, abas, painéis]

---

## Fluxo Completo

1. **[Passo 1]:** [Descrição do passo]
2. **[Passo 2]:** [Descrição do passo]
3. **[Passo 3]:** [Descrição do passo]
[Adicionar mais passos conforme necessário]

---

## Comportamentos Especiais

- **[Comportamento 1]:** [Descrição do comportamento especial]
- **[Comportamento 2]:** [Descrição do comportamento especial]
[Adicionar mais comportamentos conforme necessário]

---

## Mensagens de Sucesso/Erro

- **Mensagem de Sucesso:** "Registro salvo com sucesso!" (locator: `.Toastify__toast--success`)
- **Mensagem de Erro:** [Se houver, descrever]
[Adicionar mais mensagens conforme necessário]

---

## Observações

[Adicionar observações adicionais relevantes]
```

---

## ⚠️ Armadilhas Comuns (Verificar)

- [ ] **URL relativa usada (não absoluta)?**
  - **Por quê:** URLs absolutas hardcoded quebram quando `baseUrl` muda
  - **Como verificar:** Confirmar que `browser_navigate` usa URL relativa (ex: `/financeiro/contas-a-receber`)
  - **Solução:** Sempre ler `baseUrl` de `cypress.config.js` e usar URLs relativas

- [ ] **Fluxo completo executado (não apenas inspeção)?**
  - **Por quê:** Apenas inspecionar DOM não revela comportamentos dinâmicos
  - **Como verificar:** Confirmar que fluxo foi executado (preencher, salvar, validar)
  - **Solução:** Sempre executar fluxo completo usando `browser_type` e `browser_click`

- [ ] **IDs priorizados sobre classes genéricas?**
  - **Por quê:** IDs são mais estáveis que classes (ADR-0015)
  - **Como verificar:** Confirmar que locators coletados priorizam IDs
  - **Solução:** Sempre buscar IDs primeiro, usar classes apenas se ID não existir

- [ ] **Contexto usado quando necessário (`.modal #elemento`)?**
  - **Por quê:** Contexto previne capturar elementos incorretos
  - **Como verificar:** Confirmar que locators em modais/painéis usam contexto
  - **Solução:** Sempre adicionar contexto quando elemento está em modal/painel

- [ ] **Locators validados no browser console?**
  - **Por quê:** Validação garante que locators funcionam corretamente
  - **Como verificar:** Confirmar que locators foram testados no console
  - **Solução:** Usar `browser_evaluate` para testar locators antes de documentar

---

## 📚 Referências

- [ADR-0016: Planning Before Implementation](../adr/0016-planning-before-implementation.md)
- [ADR-0015: Prioritize IDs and Context in Locators](../adr/0015-prioritize-ids-and-context-in-locators.md)
- [Guia de Prompts para Automação](./guia-prompts-automacao.md)
- [Template de Plano de Implementação](./template-plano-implementacao.md)

---

**Última atualização:** 2025-01-30  
**Mantido por:** Equipe de Automação

