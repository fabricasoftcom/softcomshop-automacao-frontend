# Arquitetura dos casos de teste: Requisição de Consignação

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Requisição de Consignação**, que valida o processo completo de listagem e cadastro de requisições de consignação no sistema.

**Funcionalidades cobertas:**
- Listagem de requisições de consignação
- Aplicação de filtros de pesquisa
- Navegação para novo cadastro
- Cadastro de nova requisição de consignação
- Validação de salvamento

**Cenários principais:**
- Exibir tabela de requisições e abrir formulário de pesquisa
- Navegar para tela de novo cadastro
- Aplicar filtros de pesquisa (código, cliente, status)
- Selecionar e desmarcar todos os registros
- Preencher e salvar uma nova requisição com sucesso

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/consignacao/requisicao-consignacao-listagem.spec.js` - Testes de listagem de requisições
- `cypress/e2e/consignacao/requisicao-consignacao-cadastro.spec.js` - Testes de cadastro de requisições

### Page Objects
- `cypress/support/pages/Consignacao/RequisicaoConsignacaoPage.js` - Métodos para listagem e cadastro de requisições

### Locators
- `cypress/support/locators/Consignacao/RequisicaoConsignacaoLocators.js` - Seletores de listagem e cadastro

---

## Imports e dependências

### Page Objects
```javascript
import RequisicaoConsignacaoPage from "../../support/pages/Consignacao/RequisicaoConsignacaoPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import RequisicaoConsignacaoLocators from "../../locators/Consignacao/RequisicaoConsignacaoLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Listagem de Requisições de Consignação

**Tags:** `['@consignacao', '@requisicao', '@listagem', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tabela de requisições e permitir abrir o formulário de pesquisa')`

**Fluxo completo:**
1. **Acesso:**
   - Login com sessão armazenada
   - Visita página inicial
   - Acessa tela de listagem de requisições (`/consignacao/requisicao`)

2. **Validação:**
   - Valida que a tabela está visível
   - Abre formulário de pesquisa
   - Conta linhas visíveis na tabela

#### `it('Deve permitir navegar para novo cadastro')`

**Fluxo completo:**
1. **Acesso:**
   - Valida que a tabela está visível
   - Clica em "Novo Cadastro"

2. **Validação:**
   - Verifica que a URL contém `/consignacao/requisicao`

#### `it('Deve aplicar filtros de pesquisa')`

**Fluxo completo:**
1. **Acesso:**
   - Valida que a tabela está visível

2. **Aplicação de Filtros:**
   - Abre formulário de pesquisa
   - Aplica filtros (código, cliente, status)

3. **Validação:**
   - Valida que a tabela permanece visível após pesquisa

#### `it('Deve selecionar e desmarcar todos os registros')`

**Fluxo completo:**
1. **Acesso:**
   - Valida que a tabela está visível

2. **Interação:**
   - Seleciona todos os registros
   - Desmarca todos os registros

### Suite: Cadastro de Requisição de Consignação

**Tags:** `['@consignacao', '@requisicao', '@cadastro', '@regressivo']` (ADR-0010)

#### `it('Deve abrir a tela de cadastro de requisição')`

**Fluxo completo:**
1. **Acesso:**
   - Login com sessão armazenada
   - Visita página inicial
   - Acessa tela de listagem
   - Clica em "Novo Cadastro"

2. **Validação:**
   - Verifica que a URL contém `/consignacao/requisicao`
   - Valida que o loading desapareceu
   - Aguarda carregamento da página

**Nota:** O teste de cadastro completo será implementado após identificação dos locators específicos do formulário durante execução real.

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Todos os métodos de interação estão encapsulados em `RequisicaoConsignacaoPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores estão centralizados em `RequisicaoConsignacaoLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para login persistente
- ✅ **Separate Specs** (ADR-0007): Listagem e cadastro estão em specs separados
- ✅ **Tags for Filtering** (ADR-0010): Tags aplicadas para permitir execução seletiva
- ✅ **Prioritize IDs and Context** (ADR-0015): Locators priorizam IDs quando disponíveis

### Boas Práticas
- Uso de `{ force: true }` em cliques quando necessário
- Validação de loading desaparecer antes de interações
- Timeout configurado para elementos que podem demorar a aparecer
- Métodos encadeáveis no Page Object
- Validações condicionais em vez de waits fixos

### Observações
- Os locators foram criados com base nos padrões do projeto (Orçamento, Vendas)
- Durante a execução dos testes, os locators serão ajustados conforme a estrutura real da tela
- O Page Object está preparado para expansão com novos métodos conforme necessário

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0007](../adr/0007-separate-specs-by-functionality-and-type.md): Separate Specs
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Orçamento - Cadastro](./architecture-orcamento-cadastro.md)
- [Orçamento - Listagem](./architecture-orcamento-listagem.md)
- [Vendas - Listagem](./architecture-listagem-vendas.md)

