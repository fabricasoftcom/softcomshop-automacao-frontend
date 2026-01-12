# Arquitetura dos casos de teste: Baixar Despesa

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Baixar Despesa**, que valida o processo completo de baixa de despesas no módulo financeiro, incluindo baixa completa, parcial e desfazer baixa.

**Funcionalidades cobertas:**
- Baixa completa de despesa (status "Pago")
- Baixa parcial de despesa (status "Parcial")
- Desfazer baixa de despesa
- Validação de campos e valores
- Validação de status após operações

**Cenários principais:**
- Realizar baixa completa e verificar status "Pago"
- Realizar baixa parcial (50%) e verificar status "Parcial"
- Desfazer baixa e verificar restauração de status
- Validar campos desabilitados e valores calculados
- Validar tabela de detalhes de pagamento

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/baixar-despesa.spec.js` - Teste de baixa de despesas

### Page Objects
- `cypress/support/pages/Financeiro/BaixarDespesasPage.js` - Métodos para baixa de despesas
- `cypress/support/pages/Financeiro/ListagemContasAPagarPage.js` - Navegação e acesso a despesas

### Locators
- `cypress/support/locators/BaixarDespesaLocators.js` - Seletores do modal de baixa

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import BaixarDespesasPage from "../../support/pages/Financeiro/BaixarDespesasPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import BaixarDespesasLocators from "../../locators/BaixarDespesaLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes de Baixa de Despesas

**Tags:** `['@baixar-despesa', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve realizar baixa completa e verificar status "Pago"')`

**Fluxo completo:**
1. **Acesso:**
   - Clica na primeira linha com status "Baixar"
   - Abre modal de recebimento/pagamento

2. **Preenchimento:**
   - Preenche conta (ex: "CAIXA")
   - Preenche forma de pagamento (ex: "ESPÉCIE")
   - Verifica campos "Valor Pago" e "Valor Pendente" desabilitados
   - Verifica campo "Valor Final" desabilitado

3. **Baixa:**
   - Obtém valor final calculado
   - Preenche data de recebimento com data atual
   - Preenche valor recebido com valor final
   - Clica em salvar

4. **Validações:**
   - Verifica toast de sucesso
   - Verifica status alterado para "Pago"

---

#### `it('Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"')`

**Fluxo:**
1. Acessa primeira linha com status "Pago"
2. Clica em "Desfazer baixa"
3. Confirma desfazer baixa
4. Fecha modal
5. Verifica toast de sucesso
6. Verifica status restaurado para "Baixar"

---

#### `it('Deve realizar baixa parcial (50%) e verificar status "Parcial"')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Preenche conta e forma de pagamento
3. Obtém valor final
4. Calcula 50% do valor final
5. Preenche data e valor recebido (50%)
6. Salva
7. Verifica toast de sucesso
8. Verifica status "Parcial"

---

#### `it('Deve localizar e clicar no botão "PARCIAL" da primeira linha com status PARCIAL')`

**Fluxo:**
1. Localiza e clica no botão "PARCIAL" da primeira linha com status "Parcial"
2. Preenche conta e forma de pagamento
3. Verifica campos desabilitados
4. Obtém valor final e preenche valor recebido
5. Salva e verifica toast de sucesso

---

#### `it('Deve desfazer baixa e verificar valor pendente restaurado')`

**Fluxo:**
1. Acessa primeira linha com status "Pago"
2. Captura valor pendente antes de desfazer
3. Clica em desfazer baixa
4. Confirma desfazer baixa
5. Verifica que valor pendente foi restaurado

---

#### `it('Deve expandir os detalhes de pagamento e verificar tabela vazia')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Expande detalhes de pagamento
3. Verifica que tabela de detalhes está vazia

---

## Padrões e boas práticas

### Manipulação de Valores
- Uso de `obterValorFinal()` para capturar valor calculado
- Cálculo de valores parciais usando `parseFloat()` e formatação brasileira
- Conversão de valores: remoção de "R$", substituição de vírgula por ponto

### Validações de Campos
- Verificação de campos desabilitados (`should('be.disabled')`)
- Validação de campos calculados automaticamente
- Verificação de valores antes e depois de operações

### Interação com Modal
- Validação de título do modal antes de prosseguir
- Fechamento de modal após operações
- Aguardo de `#loading` desaparecer quando necessário

### Status e Validações
- Validação de status após cada operação
- Verificação de toast de sucesso
- Validação de valores restaurados após desfazer baixa

### Tags aplicadas
- `@baixar-despesa` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### BaixarDespesasPage

**Navegação:**
- `visit()` - Acessa listagem de contas a pagar

**Acesso a linhas:**
- `clicarPrimeiraLinhaComStatusBaixar()` - Acessa primeira linha com status "Baixar"
- `clicarPrimeiraLinhaComStatusParcial()` - Acessa primeira linha com status "Parcial"
- `clicarPrimeiraLinhaComStatusPago()` - Acessa primeira linha com status "Pago"

**Validações:**
- `verificarTituloModal()` - Valida título do modal
- `verificarCamposPagoEPendente()` - Valida campos desabilitados
- `verificarCampoValorFinal()` - Valida campo valor final desabilitado

**Preenchimento:**
- `preencherConta()` - Preenche conta (ex: "CAIXA")
- `preencherFormaPagamento()` - Preenche forma de pagamento (ex: "ESPÉCIE")
- `preencherJurosMulta(jurosMulta)` - Preenche juros/multa
- `preencherDesconto(desconto)` - Preenche desconto
- `preencherDataRecebimentoComDataAtual()` - Preenche data atual
- `preencherValorRecebido(valor)` - Preenche valor recebido

**Operações:**
- `obterValorFinal()` - Obtém valor final calculado
- `clicarSalvar()` - Salva baixa
- `fecharModal()` - Fecha modal
- `clicarDesfazerBaixa()` - Clica em desfazer baixa
- `confirmarDesfazerBaixa()` - Confirma desfazer baixa

**Validações de resultado:**
- `verificarToastSucesso()` - Valida toast de sucesso
- `verificarStatusRegistroPago()` - Valida status "Pago"
- `verificarStatusRegistroParcial()` - Valida status "Parcial"
- `verificarStatusRegistroAPagar()` - Valida status "Baixar"
- `verificarValorPendenteAposDesfazerBaixa(valor)` - Valida valor restaurado
- `verificarTabelaDetalhesPagamentoVazia()` - Valida tabela vazia

**Utilitários:**
- `obterDataAtualFormatada()` - Formata data atual (dd/mm/yyyy)
- `capturarValorAntesDeDesfazerBaixa()` - Captura valor antes de desfazer
- `capturarValorPagoDaLinha()` - Captura valor pago da linha da tabela

---

## Locators utilizados

### BaixarDespesaLocators

**Modal:**
- `tituloModalPagamento` - Título do modal

**Campos de seleção:**
- `campoConta` - Campo de conta
- `resultadoAutocompleteConta` - Resultado do autocomplete de conta
- `campoFormaPagamento` - Campo de forma de pagamento
- `resultadoAutocompleteFormaPagamento` - Resultado do autocomplete

**Campos de valores:**
- `valorPagoinput1` - Campo valor pago
- `valorPendenteInput` - Campo valor pendente
- `JurosMulta` - Campo juros/multa
- `Desconto` - Campo desconto
- `ValorFinal` - Campo valor final (desabilitado)
- `ValorRecebido` - Campo valor recebido

**Data:**
- `dataRecebimentoInput` - Campo data de recebimento

**Botões:**
- `botaoSalvarPagamento` - Botão salvar
- `botaoVoltar` - Botão voltar
- `botaoDesfazerBaixa` - Botão desfazer baixa

**Modal de confirmação:**
- `confirmacaoTitulo` - Título da confirmação
- `botaoConfirmarDesfazer` - Botão confirmar
- `botaoCancelarDesfazer` - Botão cancelar

**Notificações:**
- `toastSucesso` - Toast de sucesso

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-nova-despesa.md` - Cadastro de nova despesa (despesas criadas podem ser baixadas)
- `docs/cases/architecture-listagem-contas-a-pagar.md` - Listagem de contas a pagar (abre modal de baixa)
- `docs/cases/architecture-editar-despesa.md` - Edição de despesas (despesas editadas podem ser baixadas)
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existem despesas com diferentes status no sistema
- Valores são calculados dinamicamente (50% para baixa parcial)
- Formatação brasileira de valores (vírgula como separador decimal)
- Validação de valores antes e depois de operações para garantir consistência
- Uso de `then()` para trabalhar com valores assíncronos

---

## Cálculos e Formatação

### Cálculo de Baixa Parcial (50%)
```javascript
const valorParcial = (parseFloat(valorFinal.replace('R$', '').replace(',', '.')) * 0.5)
  .toFixed(2)
  .replace('.', ',');
```

### Formatação de Data
```javascript
const dataAtual = new Date();
const dataFormatada = `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;
```

---

**Última atualização:** 2024-12-19

