# Arquitetura dos casos de teste: Edição de Conta Corrente

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Edição de Conta Corrente**, que valida o processo de edição e ativação/desativação de contas correntes.

**Funcionalidades cobertas:**
- Desativação de conta ativa
- Ativação de conta inativa
- Validação de campos preenchidos (comentado)
- Alteração de último número da remessa (comentado)
- Validação de status após operações

**Cenários principais:**
- Desativar conta ativa e validar status
- Ativar conta inativa e validar status

**Nota:** Alguns testes estão comentados no spec atual, indicando que podem estar em desenvolvimento ou desativados temporariamente.

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/edicao-conta-corrente.spec.js` - Teste de edição de conta corrente

### Page Objects
- `cypress/support/pages/Financeiro/ContaCorrenteEdicaoPage.js` - Métodos para edição de conta corrente
- `cypress/support/pages/Financeiro/ListagemContasPage.js` - Navegação e seleção de contas

### Locators
- `cypress/support/locators/ContaCorrenteCadastroLocator.js` - Seletores (reutilizados do cadastro)

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";
import ContaCorrenteEdicaoPage from "../../support/pages/Financeiro/ContaCorrenteEdicaoPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import ContaCorrenteCadastroLocator from "../../locators/ContaCorrenteCadastroLocator";
```

### Commands
- `cy.loginArmazenandoSessaoCobranca()` - Login com usuário de cobrança bancária
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes de Edição de Conta Corrente

**Tags:** `['@edicao-conta-corrente', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve desativar uma conta ativa')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona primeira conta ativa com "Banco" no nome
   - Aguarda `#loading` desaparecer

2. **Desativação:**
   - Aguarda 5000ms
   - Desativa conta (clica no switch se estiver ativo)
   - Salva alterações

3. **Validações:**
   - Valida toast de sucesso
   - Verifica que switch mudou para aparência de "desativado"
   - Valida que estilo não inclui `left: 20px` (inativo)

---

#### `it('Deve ativar uma conta inativa')`

**Fluxo completo:**
1. **Seleção:**
   - Seleciona primeira conta inativa com "Banco" no nome
   - Aguarda `#loading` desaparecer

2. **Ativação:**
   - Aguarda 5000ms
   - Ativa conta (clica no switch se estiver inativo)
   - Salva alterações

3. **Validações:**
   - Valida toast de sucesso
   - Verifica que switch mudou para aparência de "ativado"
   - Valida que estilo inclui `border-color: rgb(255, 192, 103)`

---

## Testes Comentados (Potenciais)

### Validação de Campos Preenchidos
```javascript
// it('Deve acessar uma conta ativa com nome "Banco" e validar os campos preenchidos', () => {
//   ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
//   cy.get('#loading').should('not.exist');
//   ContaCorrenteEdicaoPage.validarCamposPreenchidos();
// });
```

### Alteração de Último Número da Remessa
```javascript
// it('Deve alterar o último número da remessa, salvar e validar a alteração', () => {
//   ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
//   cy.get('#loading').should('not.exist');
//   const novoNumeroRemessa = '9999';
//   ContaCorrenteEdicaoPage.alterarUltimoNumeroRemessa(novoNumeroRemessa);
//   ContaCorrenteEdicaoPage.salvar();
//   ContaCorrenteEdicaoPage.validarSucesso();
//   ContaCorrenteEdicaoPage.validarUltimoNumeroRemessa(novoNumeroRemessa);
// });
```

---

## Padrões e boas práticas

### Seleção Inteligente de Contas
- Busca por nome contendo "banco" (case-insensitive)
- Filtro por status (Ativa/Inativa)
- Seleção da primeira conta que atende aos critérios

### Validação de Estado do Switch
- Verificação de estado atual antes de alterar
- Clica apenas se estado atual for diferente do desejado
- Validação de estilo visual após alteração

### Aguardos Estratégicos
- Aguardo de `#loading` desaparecer antes de interagir
- Aguardo de 5000ms antes de alterar switch (pode ser necessário para carregamento completo)

### Validações de Sucesso
- Validação de toast de sucesso
- Validação de estado visual do switch
- Validação de estilo CSS para confirmar estado

### Tags aplicadas
- `@edicao-conta-corrente` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ContaCorrenteEdicaoPage

**Validações:**
- `validarCamposPreenchidos()` - Valida que campos estão preenchidos (comentado)
- `validarCampo(campo)` - Valida um campo específico

**Ativação/Desativação:**
- `desativarConta()` - Desativa conta (verifica estado antes)
- `ativarConta()` - Ativa conta (verifica estado antes)

**Salvamento:**
- `salvar()` - Salva alterações
- `validarSucesso()` - Valida toast de sucesso

**Alteração de campos (comentado):**
- `alterarUltimoNumeroRemessa(novoNumero)` - Altera último número da remessa
- `validarUltimoNumeroRemessa(numeroEsperado)` - Valida último número da remessa

---

### ListagemContasPage

**Seleção de contas:**
- `selecionarPrimeiraContaBancoAtiva()` - Seleciona primeira conta ativa com "Banco" no nome
- `selecionarPrimeiraContaBancoInativa()` - Seleciona primeira conta inativa com "Banco" no nome

---

## Locators utilizados

### ContaCorrenteCadastroLocator (reutilizado)

**Campos:**
- `descricao` - Campo descrição
- `agencia` - Campo agência
- `agenciaDV` - Campo agência DV
- `contaCorrente` - Campo conta corrente
- `contaDV` - Campo conta DV
- `saldoInicial` - Campo saldo inicial
- `dataSaldoInicial` - Campo data saldo inicial
- `limiteCredito` - Campo limite de crédito
- `recipientCode` - Convênio
- `lastOurNumber` - Último nosso número
- `lastDispatch` - Último número remessa
- `walletVariation` - Variação da carteira
- `companyCode` - Código transmissão
- `posto` - Posto

**Switch:**
- `#div_active .switchery` - Switch de ativação/desativação
- `#div_active .switchery small` - Elemento interno do switch

**Botões:**
- `.btn:contains("Salvar")` - Botão salvar

**Notificações:**
- `.Toastify__toast--success` - Toast de sucesso

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-cadastro-conta-corrente.md` - Documentação de cadastro de conta corrente
- `docs/cases/architecture-listagem-conta.md` - Documentação de listagem de contas
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste usa `cy.loginArmazenandoSessaoCobranca()` para usuário com permissões de cobrança bancária
- Seleção de contas busca por nome contendo "banco" e status específico
- Validação de estado do switch antes de alterar evita cliques desnecessários
- Aguardo de 5000ms pode ser necessário para carregamento completo da página
- Validação de estilo CSS garante que estado visual está correto
- Testes comentados indicam funcionalidades que podem ser ativadas no futuro

---

## Validação de Estado do Switch

### Switch Ativo
```javascript
cy.get('#div_active .switchery small')
  .invoke('attr', 'style')
  .should('include', 'left: 20px'); // Ativo (ligado)
```

### Switch Inativo
```javascript
cy.get('#div_active .switchery small')
  .invoke('attr', 'style')
  .should('not.include', 'left: 20px'); // Inativo (desligado)
```

### Switch Ativado (Visual)
```javascript
cy.get('#div_active > .switchery')
  .should('have.attr', 'style')
  .and('include', 'border-color: rgb(255, 192, 103)');
```

---

**Última atualização:** 2024-12-19

