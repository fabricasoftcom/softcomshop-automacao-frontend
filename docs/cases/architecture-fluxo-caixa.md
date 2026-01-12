# Arquitetura do caso de teste: `financeiro/fluxo-caixa.spec.js`

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Fluxo de Caixa**, que valida a exibição do fluxo financeiro, cards de resumo, tabela de períodos e funcionalidade de pesquisa por período.

**Funcionalidades cobertas:**
- Exibição da tela de Fluxo de Caixa
- Validação de cards de resumo (Saldo anterior, A receber, A pagar, Saldo projetado)
- Validação da tabela principal com detalhamento por período
- Pesquisa por período específico
- Botão de gerar PDF

**Cenários principais:**
- Validar carregamento completo da tela com todos os elementos
- Pesquisar por período e validar resultados
- Validar presença e funcionalidade do botão Gerar PDF

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/fluxo-caixa.spec.js` - Teste de Fluxo de Caixa

### Page Objects
- `cypress/support/pages/Financeiro/FluxoCaixaPage.js` - Métodos para interação com a tela de Fluxo de Caixa

### Locators
- `cypress/support/locators/Financeiro/FluxoCaixaLocators.js` - Seletores da tela de Fluxo de Caixa

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Método `acessarFluxo()` já existente

---

## Imports e dependências

### Page Objects
```javascript
import FluxoCaixaPage from "../../support/pages/Financeiro/FluxoCaixaPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import FluxoCaixaLocators from "../../locators/Financeiro/FluxoCaixaLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004: funcionalidades não-fiscais)
- `cy.visit('/')` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Financeiro > Fluxo de Caixa

**Tags:** `['@financeiro', '@fluxo-caixa', '@regressivo']` (ADR-0010)

#### `it('Deve exibir a tela de Fluxo de Caixa com todos os elementos principais')`

**Fluxo completo:**
1. **Acesso:**
   - Login via `cy.loginArmazenandoSessao()` (ADR-0004)
   - Visita a raiz da aplicação
   - Acessa via menu: `FluxoCaixaPage.acessarViaMenu()`

2. **Validações:**
   - Valida carregamento da página (loading desaparece, título visível)
   - Valida presença dos 4 cards de resumo (Saldo anterior, A receber, A pagar, Saldo projetado)
   - Valida tabela principal visível
   - Valida URL correta (`/financeiro/fluxo`)

#### `it('Deve pesquisar por um período específico e exibir resultados')`

**Fluxo completo:**
1. **Acesso:**
   - Mesmo fluxo do teste anterior

2. **Preparação:**
   - Calcula primeiro e último dia do mês atual
   - Formata datas no padrão brasileiro (dd/mm/yyyy)
   - Monta string de período no formato "dd/mm/yyyy - dd/mm/yyyy"

3. **Pesquisa:**
   - Preenche campo período com a data calculada
   - Clica em Pesquisar
   - Aguarda carregamento (loading desaparece)

4. **Validação:**
   - Valida que tabela está visível após pesquisa

#### `it('Deve exibir o botão Gerar PDF')`

**Fluxo completo:**
1. **Acesso:**
   - Mesmo fluxo dos testes anteriores

2. **Validação:**
   - Valida que botão Gerar PDF está visível
   - Valida que o link contém `/financeiro/fluxo/pdf`

---

## Padrões e boas práticas

### Padrões Aplicados
- ✅ **Page Object Pattern** (ADR-0002): Todas as interações encapsuladas em `FluxoCaixaPage`
- ✅ **Separate Locators** (ADR-0003): Todos os seletores centralizados em `FluxoCaixaLocators`
- ✅ **Session Persistence** (ADR-0004): Usa `cy.loginArmazenandoSessao()` para funcionalidades não-fiscais
- ✅ **Tags for Filtering** (ADR-0010): Tags `@financeiro`, `@fluxo-caixa`, `@regressivo` aplicadas
- ✅ **Prioritize IDs and Context** (ADR-0015): Todos os locators usam IDs quando disponíveis

### Boas Práticas
- Cálculo dinâmico de período usando JavaScript nativo (primeiro e último dia do mês)
- Aguarda carregamento da página antes de validar elementos
- Validação de URL para confirmar navegação correta
- Métodos auxiliares para obter valores dos cards (preparado para futuras validações)

### Observações
- Tela é principalmente de visualização/relatório (não há cadastro)
- Cards de resumo exibem valores calculados automaticamente
- Tabela principal mostra detalhamento por período
- Botão Gerar PDF gera download de PDF (não testado diretamente, apenas valida presença)
- Menu lateral já possui método `acessarFluxo()` implementado

---

## 🔗 Referências

### ADRs Relacionadas
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Documentação Relacionada
- [Processo de Documentação](../referencias/processo-documentacao.md)
- [Architecture Listagem Contas a Receber](./architecture-listagem-contas-a-receber.md)

---

## Integração com a arquitetura global
- Registrado em `specPattern` do `cypress.config.js` na seção `// financeiro`
- Hooks globais em `support/e2e.js` continuam checando erros 500
- Relatórios Allure e evidências seguem o mesmo pipeline
- Menu lateral financeiro já possui método de acesso implementado

