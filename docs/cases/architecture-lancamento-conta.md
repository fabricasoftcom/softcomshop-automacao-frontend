# Arquitetura dos casos de teste: Lançamento Conta

## Objetivo

Este documento descreve a arquitetura dos testes relacionados ao **Lançamento Conta**, que valida o processo completo de criação de lançamentos contábeis no módulo financeiro.

**Funcionalidades cobertas:**
- Acesso à tela de lançamento conta
- Abertura de modal de novo lançamento
- Seleção de operação (DÉBITO/CRÉDITO)
- Seleção de categoria, conta e forma de pagamento via autocomplete
- Preenchimento de descrição, data e valor
- Salvamento de lançamento
- Validação de mensagens de sucesso

**Cenários principais:**
- Realização de lançamento conta completo (DÉBITO, VENCIMENTO)
- Validação de modal visível ao acessar a página
- Realização de lançamento conta com operação CRÉDITO
- Realização de lançamento conta com tipo de data LANÇAMENTO
- Cancelamento de lançamento clicando em Voltar
- Validação de campos obrigatórios (erro ao salvar sem preencher)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/lancamento-conta.spec.js` - Teste de lançamento conta

### Page Objects
- `cypress/support/pages/Financeiro/LancamentoContaPage.js` - Métodos para interação com formulário de lançamento conta

### Locators
- `cypress/support/locators/LancamentoContaLocators.js` - Seletores do formulário de lançamento conta

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro (método `acessarLancamentoConta()`)

---

## Imports e dependências

### Page Objects
```javascript
import LancamentoContaPage from '../../support/pages/Financeiro/LancamentoContaPage';
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (não é funcionalidade fiscal) (ADR-0004)
- `cy.visit('/')` - Navegação para home após login

---

## Estrutura do teste

### Suite: Testes de Lançamento Conta

**Tags:** `['@lancamento-conta', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve realizar lançamento conta completo')`

**Fluxo completo:**
1. **Acesso:**
   - Login com `cy.loginArmazenandoSessao()`
   - Navegação para home
   - Acesso à tela de lançamento conta via `LancamentoContaPage.visit()`
   - Clica em "Novo cadastro" para abrir o modal
   - Valida que o modal está visível

2. **Preenchimento:**
   - Seleção de operação: DÉBITO (padrão)
   - Seleção de categoria via autocomplete (ex: 'DESPESA')
   - Preenchimento de descrição (com timestamp para unicidade)
   - Seleção de conta via autocomplete (ex: 'CAIXA')
   - Seleção de forma de pagamento via autocomplete (ex: 'ESPÉCIE')
   - Tipo data: VENCIMENTO (padrão)
   - Preenchimento de data (data atual no formato DD/MM/YYYY)
   - Preenchimento de valor (valor aleatório no formato brasileiro: '100,00')

3. **Salvamento:**
   - Clique no botão "Salvar"
   - Aguarda loading desaparecer

4. **Validação:**
   - Valida mensagem de sucesso no toast
   - Toast contém texto: "Lançamento de Conta salvo com sucesso"
   - Modal fecha automaticamente após salvamento
   - Registro aparece na tabela

#### `it('Deve validar que a tela está visível ao acessar')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de lançamento conta
   - Abertura do modal via `LancamentoContaPage.visit()`

2. **Validação:**
   - Valida que o modal está visível
   - Valida que contém o título "Novo Lançamento"

#### `it('Deve realizar lançamento conta com operação CRÉDITO')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação para tela de lançamento conta
   - Abertura do modal via `LancamentoContaPage.visit()`
   - Valida que o modal está visível

2. **Preenchimento:**
   - Seleção de operação: CRÉDITO (altera o padrão DÉBITO)
   - Aguarda loading desaparecer após mudança de operação
   - Seleção de categoria via autocomplete (ex: 'RECEITA' - adequada para CRÉDITO)
   - Preenchimento de descrição (com timestamp para unicidade)
   - Seleção de conta via autocomplete (ex: 'CAIXA')
   - Seleção de forma de pagamento via autocomplete (ex: 'ESPÉCIE')
   - Tipo data: VENCIMENTO (padrão)
   - Preenchimento de data (data atual no formato DD/MM/YYYY)
   - Preenchimento de valor (valor aleatório no formato brasileiro)

3. **Salvamento:**
   - Clique no botão "Salvar"
   - Aguarda loading desaparecer

4. **Validação:**
   - Valida mensagem de sucesso no toast
   - Toast contém texto: "Lançamento de Conta salvo com sucesso"

#### `it('Deve realizar lançamento conta com tipo de data LANÇAMENTO')`

**Fluxo completo:**
1. **Acesso:**
   - Login e navegação para tela de lançamento conta
   - Abertura do modal via `LancamentoContaPage.visit()`
   - Valida que o modal está visível

2. **Preenchimento:**
   - Seleção de operação: DÉBITO (padrão)
   - Seleção de categoria via autocomplete (ex: 'DESPESA')
   - Preenchimento de descrição (com timestamp para unicidade)
   - Seleção de conta via autocomplete (ex: 'CAIXA')
   - Seleção de forma de pagamento via autocomplete (ex: 'ESPÉCIE')
   - Seleção de tipo de data: LANÇAMENTO (altera o padrão VENCIMENTO)
   - Preenchimento de data (data atual no formato DD/MM/YYYY)
   - Preenchimento de valor (valor aleatório no formato brasileiro)

3. **Salvamento:**
   - Clique no botão "Salvar"
   - Aguarda loading desaparecer

4. **Validação:**
   - Valida mensagem de sucesso no toast
   - Toast contém texto: "Lançamento de Conta salvo com sucesso"

#### `it('Deve cancelar lançamento clicando em Voltar')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de lançamento conta
   - Abertura do modal via `LancamentoContaPage.visit()`
   - Valida que o modal está visível

2. **Preenchimento parcial (opcional):**
   - Preenche alguns campos para simular preenchimento (ex: descrição, valor)

3. **Cancelamento:**
   - Clique no botão "Voltar"
   - Aguarda modal fechar

4. **Validação:**
   - Valida que o modal foi fechado usando `validarModalFechado()`
   - Valida que elemento funcional (ex: `categoriaAutocomplete`) não existe mais

#### `it('Deve exibir erro ao tentar salvar sem preencher campos obrigatórios')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de lançamento conta
   - Abertura do modal via `LancamentoContaPage.visit()`
   - Valida que o modal está visível

2. **Tentativa de salvamento:**
   - Não preenche campos obrigatórios (categoria, conta, forma pagamento, descrição, valor)
   - Clique no botão "Salvar"

3. **Validação:**
   - Valida mensagem de erro usando `validarErroCamposObrigatorios()`
   - Se toast de erro existe, valida que está visível
   - Se toast de erro não existe, valida que o modal ainda está aberto (indicando que a validação impediu o salvamento)

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `LancamentoContaPage`
- Métodos seguem nomenclatura descritiva (ex: `selecionarCategoria`, `preencherValor`)
- Métodos retornam `this` para encadeamento (quando aplicável)

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `LancamentoContaLocators.js`
- Locators priorizam IDs quando disponíveis (ADR-0015)
- Uso de contexto (`.modal-content`, `dialog`) quando necessário
- Botão fechar usa ID específico: `#btn-modal-plus-close`

### Session Persistence (ADR-0004)
- Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Session é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@lancamento-conta`, `@financeiro`, `@regressivo`
- Permite execução seletiva de testes

### Validações Condicionais
- Uso de `.should('be.visible')` ao invés de waits fixos
- Validação de loading desaparecer antes de continuar
- Aguarda opções de autocomplete aparecerem antes de selecionar

### Autocompletes
- Usa biblioteca `soft-select` (padrão do sistema)
- Seleção via `.soft-select__option` após digitar no campo
- Filtragem por texto exato ou parcial usando `.filter()`
- Uso de `force: true` quando necessário para cliques

### Dados Dinâmicos
- Descrição inclui timestamp para garantir unicidade
- Valor gerado aleatoriamente para evitar conflitos
- Data usa formato brasileiro (DD/MM/YYYY)

---

## Referências

### ADRs
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0009](../adr/0009-use-faker-for-dynamic-test-data.md): Faker for Dynamic Data
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Implementações Similares
- `TransferenciaContasPage.js` - Padrão de modal e autocompletes
- `NovaReceitaPage.js` - Padrão de formulário financeiro com autocompletes
- `NovaDespesaPage.js` - Padrão de seleção de conta e categoria

---

## Observações Técnicas

### Estrutura do Modal
- Modal usa tag HTML5 `dialog` ou classe `.modal-content`
- Abre ao clicar em "Novo cadastro" na listagem
- Fecha automaticamente após salvamento bem-sucedido
- Título: "Novo Lançamento"

### Campos do Formulário

#### Operação
- **Tipo**: Select/Combobox
- **Valores**: DÉBITO (padrão), CRÉDITO
- **Obrigatório**: Não (tem valor padrão)

#### Categoria
- **Tipo**: Autocomplete (input com dropdown)
- **Placeholder**: "Selecione uma categoria"
- **Obrigatório**: Sim (marcado com *)
- **Opções**: DESPESA, RECEITA, ENERGIA, salario, etc.
- **Seleção**: Digitar texto e selecionar da lista `.soft-select__option`

#### Descrição
- **Tipo**: Input texto
- **Placeholder**: "Ex. Fatura de energia da Empresa"
- **Obrigatório**: Sim (marcado com *)

#### Conta
- **Tipo**: Autocomplete (input com dropdown)
- **Placeholder**: "Ex. CAIXINHA"
- **Obrigatório**: Sim (marcado com *)
- **Seleção**: Digitar texto e selecionar da lista `.soft-select__option`

#### Forma de Pagamento
- **Tipo**: Autocomplete (input com dropdown)
- **Placeholder**: "Ex. Boleto"
- **Obrigatório**: Sim (marcado com *)
- **Opções**: ESPÉCIE, BOLETO, PIX, CARTÃO DE CRÉDITO, etc.
- **Seleção**: Digitar texto e selecionar da lista `.soft-select__option`

#### Tipo Data
- **Tipo**: Select/Combobox
- **Valores**: VENCIMENTO (padrão), LANÇAMENTO
- **Obrigatório**: Não (tem valor padrão)

#### Data
- **Tipo**: Input data
- **Valor padrão**: Data atual (formato DD/MM/YYYY)
- **Formato**: DD/MM/YYYY

#### Valor
- **Tipo**: Input numérico
- **Valor padrão**: "0,00"
- **Obrigatório**: Sim (marcado com *)
- **Formato**: Brasileiro (vírgula como separador decimal)

### Mensagens de Sucesso
- Toast usa Toastify (`.Toastify__toast--success`)
- Mensagem: "Lançamento de Conta salvo com sucesso"
- Desaparece automaticamente após alguns segundos

### Mensagens de Erro
- Toast de erro usa Toastify (`.Toastify__toast--error`)
- Validação de campos obrigatórios pode exibir toast de erro ou manter modal aberto
- Método `validarErroCamposObrigatorios()` trata ambos os casos

### Comportamento Após Salvar
- Modal fecha automaticamente
- Toast de sucesso aparece
- Tabela atualiza automaticamente mostrando o novo registro
- Indicador de loading aparece durante o processo

### Locators Específicos
- **Botão Fechar**: `#btn-modal-plus-close` (único ID específico identificado)
- **Outros campos**: Usam seletores por contexto (placeholder, label) dentro do modal
- **Autocompletes**: Todos usam padrão `.soft-select__option` para opções

---

**Última atualização:** 2025-01-XX  
**Versão:** 2.0


