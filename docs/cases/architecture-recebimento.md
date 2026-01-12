# Arquitetura dos casos de teste: Recebimento

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Recebimento**, que valida o processo completo de recebimento de contas a receber no módulo financeiro, incluindo recebimento completo, parcial e desfazer baixa.

**Funcionalidades cobertas:**
- Recebimento completo de conta a receber (status "Pago")
- Recebimento parcial de conta a receber (status "Parcial")
- Desfazer baixa de recebimento
- Validação de campos e valores
- Validação de status após operações
- Cancelamento de recebimento (voltar sem salvar)

**Cenários principais:**
- Verificar dados principais do modal
- Preencher informações e salvar (recebimento completo)
- Preencher informações e voltar (cancelamento)
- Realizar recebimento parcial (20%)
- Desfazer baixa e verificar status restaurado
- Validar tabela de detalhes de pagamento vazia

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/recebimento.spec.js` - Teste de recebimento de contas a receber

### Page Objects
- `cypress/support/pages/Financeiro/RecebimentoPage.js` - Métodos para recebimento
- `cypress/support/pages/Financeiro/ListagemContasAReceberPage.js` - Navegação e acesso a receitas

### Locators
- `cypress/support/locators/RecebimentoLocators.js` - Seletores do modal de recebimento

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import RecebimentoPage from "../../support/pages/Financeiro/RecebimentoPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import RecebimentoLocators from "../../locators/RecebimentoLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes do Modal de Recebimento

**Tags:** `['@recebimento', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve verificar os dados principais do modal')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Aguarda `#loading` desaparecer
3. Verifica dados principais: Parcela, Valor, Vencimento

---

#### `it('Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece "Baixar"')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Preenche conta (ex: "CAIXA")
3. Preenche forma de pagamento (ex: "ESPÉCIE")
4. Verifica campos "Valor Pago" e "Valor Pendente" desabilitados
5. Preenche juros/multa e desconto
6. Verifica campo "Valor Final" desabilitado
7. Obtém valor final e preenche valor recebido
8. Preenche data de recebimento
9. Clica em "Voltar" (sem salvar)
10. Verifica que modal foi fechado
11. Verifica que status permanece "Baixar"

---

#### `it('Deve preencher as informações de pagamento e salvar')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Preenche conta e forma de pagamento
3. Verifica campos desabilitados
4. Preenche juros/multa e desconto
5. Obtém valor final e preenche valor recebido
6. Preenche data de recebimento
7. Salva
8. Aguarda `#loading` desaparecer
9. Verifica toast de sucesso

---

#### `it('Deve preencher as informações de pagamento com baixa parcial de 20% e salvar')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Preenche conta e forma de pagamento
3. Verifica campos desabilitados
4. Preenche juros/multa e desconto
5. Obtém valor final
6. Calcula 20% do valor final
7. Preenche data de recebimento
8. Preenche valor recebido (20%)
9. Salva
10. Aguarda `#loading` desaparecer
11. Verifica toast de sucesso

---

#### `it('Deve localizar e clicar no botão "PARCIAL" da primeira linha com status PARCIAL')`

**Fluxo:**
1. Localiza e clica no botão "PARCIAL" da primeira linha com status "Parcial"
2. Abre modal de recebimento

---

#### `it('Deve expandir os detalhes de pagamento e verificar tabela vazia')`

**Fluxo:**
1. Acessa primeira linha com status "Baixar"
2. Expande detalhes de pagamento
3. Verifica que tabela de detalhes está vazia

---

#### `it('Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"')`

**Fluxo:**
1. Acessa primeira linha com status "Parcial"
2. Clica em "Desfazer baixa"
3. Verifica título da confirmação
4. Confirma desfazer baixa
5. Fecha modal
6. Verifica que status foi atualizado para "Baixar"

---

## Padrões e boas práticas

### Manipulação de Valores
- Uso de `obterValorFinal()` para capturar valor calculado
- Cálculo de valores parciais usando `parseFloat()` e formatação brasileira
- Conversão de valores: remoção de "R$", substituição de vírgula por ponto, trim()

### Validações de Campos
- Verificação de campos desabilitados (`should('be.disabled')`)
- Validação de campos calculados automaticamente
- Verificação de dados principais do modal (Parcela, Valor, Vencimento)

### Interação com Modal
- Aguardo de `#loading` desaparecer antes de validar
- Validação de título do modal antes de prosseguir
- Fechamento de modal após operações
- Verificação de fechamento do modal ao cancelar

### Status e Validações
- Validação de status após cada operação
- Verificação de toast de sucesso
- Validação de status restaurado após desfazer baixa
- Verificação de que status não muda ao cancelar (voltar)

### Cálculo de Baixa Parcial
- Cálculo de 20% do valor final
- Formatação brasileira de valores (vírgula como separador decimal)

### Tags aplicadas
- `@recebimento` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### RecebimentoPage

**Navegação:**
- `visit()` - Acessa listagem de contas a receber

**Acesso a linhas:**
- `clicarPrimeiraLinhaComStatusBaixar()` - Acessa primeira linha com status "Baixar"
- `clicarPrimeiraLinhaComStatusParcial()` - Acessa primeira linha com status "Parcial"

**Validações:**
- `verificarTituloModal()` - Valida título do modal
- `verificarDadosPrincipais()` - Valida dados principais (Parcela, Valor, Vencimento)
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
- `clicarSalvar()` - Salva recebimento
- `clicarVoltar()` - Volta sem salvar
- `fecharModal()` - Fecha modal
- `desfazerBaixa()` - Clica em desfazer baixa
- `confirmarDesfazerBaixa()` - Confirma desfazer baixa
- `verificarTituloConfirmacaoDesfazerBaixa()` - Valida título da confirmação

**Validações de resultado:**
- `verificarToastSucesso()` - Valida toast de sucesso
- `verificarStatusRegistroPago()` - Valida status "Pago"
- `verificarStatusRegistroParcial()` - Valida status "Parcial"
- `verificarStatusRegistroBaixar()` - Valida status "Baixar"

**Detalhes de pagamento:**
- `expandirDetalhesPagamento()` - Expande accordion de detalhes
- `verificarTabelaDetalhesPagamentoVazia()` - Valida tabela vazia

**Utilitários:**
- `obterDataAtualFormatada()` - Formata data atual (dd/mm/yyyy)

---

## Locators utilizados

### RecebimentoLocators

**Modal:**
- `modalTitulo` - Título do modal
- `modalContent` - Conteúdo do modal

**Dados principais:**
- `parcelaInfo` - Informação de parcela
- `valorInfo` - Informação de valor
- `vencimentoInfo` - Informação de vencimento

**Campos de formulário:**
- `contaInput` - Campo de conta
- `formaPagamentoInput` - Campo de forma de pagamento
- `valorPagoInput` - Campo valor pago (desabilitado)
- `valorPendenteInput` - Campo valor pendente (desabilitado)
- `jurosMultaInput` - Campo juros/multa
- `descontoInput` - Campo desconto
- `valorFinalInput` - Campo valor final (desabilitado)
- `dataRecebimentoInput` - Campo data de recebimento
- `valorRecebidoInput` - Campo valor recebido

**Autocomplete:**
- `listaAutocompleteConta` - Lista de resultados de conta
- `primeiroResultadoAutocomplete` - Primeiro resultado do autocomplete
- `listaAutocompleteFormaPagamento` - Lista de resultados de forma de pagamento
- `primeiroResultadoAutocompleteFormaPagamento` - Primeiro resultado de forma de pagamento

**Detalhes de pagamento:**
- `detalhesPagamentoAccordion` - Accordion de detalhes
- `detalhesPagamentoTable` - Tabela de detalhes

**Botões:**
- `voltarBtn` - Botão voltar
- `salvarBtn` - Botão salvar
- `botaoFecharModal` - Botão fechar modal
- `detalhesPagamentoBotaoDesfazerBaixa` - Botão desfazer baixa

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
- `docs/cases/architecture-nova-receita.md` - Cadastro de nova receita (receitas criadas podem ser recebidas)
- `docs/cases/architecture-listagem-contas-a-receber.md` - Listagem de contas a receber (abre modal de recebimento)
- `docs/cases/architecture-editar-receita.md` - Edição de receitas (receitas editadas podem ser recebidas)
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existem receitas com diferentes status no sistema
- Valores são calculados dinamicamente (20% para baixa parcial)
- Formatação brasileira de valores (vírgula como separador decimal)
- Validação de que status não muda ao cancelar (voltar sem salvar)
- Uso de `then()` para trabalhar com valores assíncronos
- Aguardo de `#loading` desaparecer antes de validar

---

## Cálculos e Formatação

### Cálculo de Baixa Parcial (20%)
```javascript
const valorVintePorcento = (parseFloat(valorFinal.replace('R$', '').replace(',', '.').trim()) * 0.20)
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

