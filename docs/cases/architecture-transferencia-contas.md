# Arquitetura dos casos de teste: Transferência Entre Contas

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à **Transferência Entre Contas**, que valida o processo completo de transferência de valores entre contas no módulo financeiro.

**Funcionalidades cobertas:**
- Acesso à tela de transferência entre contas
- Seleção de conta origem e conta destino
- Preenchimento de descrição, valor e data
- Salvamento de transferência
- Validação de mensagens de sucesso

**Cenários principais:**
- Realização de transferência completa entre contas
- Validação de modal visível ao acessar a página
- Validação de campos obrigatórios
- Validação de regra de negócio (conta origem ≠ conta destino)
- Validação de valor inválido (zero)
- Cancelamento de operação (botão Voltar)

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/transferencia-contas.spec.js` - Teste de transferência entre contas

### Page Objects
- `cypress/support/pages/Financeiro/TransferenciaContasPage.js` - Métodos para interação com formulário de transferência

### Locators
- `cypress/support/locators/Financeiro/TransferenciaContasLocators.js` - Seletores do formulário de transferência

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro (método `acessarTransferenciaContas()`)

---

## Imports e dependências

### Page Objects
```javascript
import TransferenciaContasPage from '../../support/pages/Financeiro/TransferenciaContasPage';
```

### Commands
- `cy.loginArmazenandoSessaoCobranca()` - Login com usuário de cobrança (requer permissões específicas) (ADR-0004)
- `cy.visit('/')` - Navegação para home após login

---

## Estrutura do teste

### Suite: Testes de Transferência Entre Contas

**Tags:** `['@transferencia-contas', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve realizar transferência completa entre contas')`

**Fluxo completo:**
1. **Acesso:**
   - Login com `cy.loginArmazenandoSessao()`
   - Navegação para home
   - Acesso à tela de transferência via `TransferenciaContasPage.visit()`
   - Modal de transferência abre automaticamente

2. **Preenchimento:**
   - Seleção de conta origem (ex: 'CAIXA')
   - Seleção de conta destino (ex: 'COFRE')
   - Preenchimento de descrição
   - Preenchimento de valor (formato brasileiro: '100,00')
   - Data já vem preenchida com data atual

3. **Salvamento:**
   - Clique no botão "Salvar"
   - Aguarda loading desaparecer

4. **Validação:**
   - Valida mensagem de sucesso no toast
   - Toast contém texto: "Transferência entre contas realizada com sucesso"

#### `it('Deve validar que o modal está visível ao acessar a página')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de transferência

2. **Validação:**
   - Valida que o modal está visível

#### `it('Deve exibir erro ao tentar salvar sem preencher campos obrigatórios')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de transferência

2. **Ação:**
   - Tenta salvar sem preencher campos obrigatórios (conta origem, conta destino, valor)

3. **Validação:**
   - Valida mensagem de erro (toast ou modal permanece aberto)
   - Modal permanece aberto (transferência não foi salva)

#### `it('Deve exibir erro ao tentar transferir de uma conta para ela mesma')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de transferência

2. **Preenchimento:**
   - Seleciona mesma conta para origem e destino (ex: CAIXA → CAIXA)
   - Preenche outros campos obrigatórios (descrição, valor)

3. **Ação:**
   - Clica em Salvar

4. **Validação:**
   - Valida mensagem de erro (toast ou modal permanece aberto)
   - Modal permanece aberto (transferência não foi salva)

#### `it('Deve cancelar a operação ao clicar no botão Voltar')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de transferência

2. **Preenchimento:**
   - Preenche todos os campos do formulário

3. **Ação:**
   - Clica no botão Voltar

4. **Validação:**
   - Valida que modal foi fechado (campo de input não existe mais)
   - Valida que não há toast de sucesso

#### `it('Deve exibir erro ao tentar transferir valor zero')`

**Fluxo:**
1. **Acesso:**
   - Login e navegação para tela de transferência

2. **Preenchimento:**
   - Seleciona conta origem e destino
   - Preenche descrição
   - Preenche valor zero (0,00)

3. **Ação:**
   - Clica em Salvar

4. **Validação:**
   - Valida mensagem de erro (toast ou modal permanece aberto)
   - Modal permanece aberto (transferência não foi salva)

---

## Padrões e boas práticas

### Page Object Pattern (ADR-0002)
- Todos os métodos de interação estão encapsulados em `TransferenciaContasPage`
- Métodos seguem nomenclatura descritiva (ex: `selecionarContaOrigem`, `preencherValor`)

### Locators Centralizados (ADR-0003)
- Todos os seletores estão em `TransferenciaContasLocators.js`
- Locators priorizam IDs quando disponíveis (ADR-0015)
- Uso de contexto (dialog) quando necessário

### Session Persistence (ADR-0004)
- Usa `cy.loginArmazenandoSessao()` (não é funcionalidade fiscal)
- Session é reutilizada entre testes

### Tags para Filtragem (ADR-0010)
- Tags aplicadas: `@transferencia-contas`, `@financeiro`, `@regressivo`
- Permite execução seletiva de testes

### Validações Condicionais
- Uso de `.should('be.visible')` ao invés de waits fixos
- Validação de loading desaparecer antes de continuar
- Validações de erro seguem padrão flexível: valida toast se existir, senão valida que modal permanece aberto

### Autocomplete de Contas
- Usa biblioteca `SoftcomAutocomplete` (padrão do sistema)
- IDs específicos: `#autocomplete_bankAccountOrigin` e `#autocomplete_bankAccountDestination`
- Classes específicas para listas: `ul.bankAccountOrigin_results` e `ul.bankAccountDestination_results`
- Seleção via `li.bankAccountOrigin_result` e `li.bankAccountDestination_result` após digitar no campo
- Aguarda lista aparecer antes de clicar

### Métodos de Validação no Page Object
- `validarErroCamposObrigatorios()` - Valida erro quando campos obrigatórios não são preenchidos
- `validarModalFechado()` - Valida que modal foi fechado (valida elemento funcional desapareceu)
- `validarErroContaOrigemIgualDestino()` - Valida erro quando conta origem = conta destino
- `validarErroValorInvalido()` - Valida erro quando valor é inválido (zero ou negativo)

---

## Referências

### ADRs
- [ADR-0002](../adr/0002-use-page-object-pattern.md): Page Object Pattern
- [ADR-0003](../adr/0003-separate-locators-from-page-objects.md): Separate Locators
- [ADR-0004](../adr/0004-use-cy-session-for-login-persistence.md): Session Persistence
- [ADR-0010](../adr/0010-use-tags-for-test-filtering.md): Tags for Test Filtering
- [ADR-0015](../adr/0015-prioritize-ids-and-context-in-locators.md): Prioritize IDs and Context in Locators

### Implementações Similares
- `NovaReceitaPage.js` - Padrão de autocomplete e modal
- `NovaDespesaPage.js` - Padrão de formulário financeiro

---

## Observações Técnicas

### Estrutura do Modal
- Modal usa tag HTML5 `dialog`
- Abre automaticamente ao acessar a rota `/financeiro/transferencia-contas`
- Não fecha automaticamente após salvar

### Campos do Formulário
- **Conta Origem/Destino**: Autocomplete com biblioteca `soft-select`
- **Descrição**: Campo opcional com placeholder "Ex. Ajuste de Saldo"
- **Valor**: Campo obrigatório com formato brasileiro (vírgula como separador decimal)
- **Data**: Campo obrigatório com seletor de data, preenchido automaticamente com data atual

### Mensagens de Sucesso e Erro
- Toast de sucesso usa Toastify (`.Toastify__toast--success`)
- Mensagem de sucesso: "Transferência entre contas realizada com sucesso"
- Toast de erro/warning usa (`.Toastify__toast--error, .Toastify__toast--warning`)
- Validações de erro são flexíveis: se toast não aparecer, valida que modal permanece aberto

### Comportamento Após Salvar
- Formulário é limpo automaticamente
- Modal permanece aberto
- Toast de sucesso aparece
- Indicador de loading aparece durante o processo

---

**Última atualização:** 2025-01-27  
**Versão:** 2.0

