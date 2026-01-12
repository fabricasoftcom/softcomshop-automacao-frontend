# Arquitetura dos casos de teste: Editar Receita

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Editar Receita**, que valida o processo completo de edição de receitas no módulo financeiro.

**Funcionalidades cobertas:**
- Edição completa de receita
- Preenchimento de todos os campos do formulário
- Validação de salvamento com sucesso
- Cancelamento de edição (voltar sem salvar)
- Seleção de valores diferentes dos atuais

**Cenários principais:**
- Editar todos os campos de uma receita e salvar
- Cancelar edição clicando em "Voltar"

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/editarReceita.spec.js` - Teste de edição de receitas

### Page Objects
- `cypress/support/pages/Financeiro/EditarReceitaPage.js` - Métodos para edição de receitas
- `cypress/support/pages/Financeiro/ListagemContasAReceberPage.js` - Navegação e acesso a receitas

### Locators
- `cypress/support/locators/EditarReceitaLocators.js` - Seletores do modal de edição

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import EditarReceitaPage from "../../support/pages/Financeiro/EditarReceitaPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import EditarReceitaLocators from "../../locators/EditarReceitaLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Edição Completa de Receita

**Tags:** `['@editar-receita', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve realizar uma edição completa e salvar a receita')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem de contas a receber
   - Abre dropdown da primeira linha
   - Seleciona opção "Editar"
   - Abre modal de edição

2. **Preenchimento completo:**
   - Preenche descrição com timestamp único
   - Seleciona categoria (valor diferente do atual)
   - Seleciona conta (valor diferente do atual)
   - Seleciona forma de pagamento (valor diferente do atual)
   - Preenche data de vencimento (baseada na data de competência)
   - Preenche valor aleatório (diferente do atual)
   - Seleciona cliente (valor diferente do atual)
   - Seleciona tipo de documento (valor diferente do atual)

3. **Salvamento:**
   - Clica em salvar
   - Verifica toast de sucesso

---

#### `it('Deve cancelar a edição clicando no botão "Voltar"')`

**Fluxo:**
1. Acessa modal de edição
2. Preenche descrição com timestamp
3. Clica em "Voltar"
4. Verifica que modal foi fechado

---

## Padrões e boas práticas

### Dados Dinâmicos
- Uso de timestamp na descrição para garantir unicidade: `Receita Teste - ${new Date().toLocaleString()}`
- Geração de valor aleatório diferente do atual (entre 10 e 800)
- Cálculo de data de vencimento baseado na data de competência

### Seleção de Valores Diferentes
- Método `selecionarValorDiferenteAtual()` garante que um valor diferente do atual seja selecionado
- Evita erros de validação quando o valor não muda
- Funciona com todos os campos de autocomplete

### Cálculo de Data de Vencimento
- Data de vencimento é calculada baseada na data de competência
- Adiciona 1 dia à data de competência para garantir diferença

### Validações
- Verificação de toast de sucesso após salvamento
- Verificação de fechamento do modal ao cancelar
- Uso de `{ force: true }` para garantir cliques em elementos que podem estar parcialmente visíveis

### Interação com Modal
- Aguardo de 499ms após abrir modal para garantir carregamento completo
- Uso de `clear()` antes de `type()` para garantir limpeza do campo
- Uso de `within()` para garantir que ações sejam feitas dentro do modal

---

## Métodos do Page Object

### EditarReceitaPage

**Navegação:**
- `visit()` - Acessa listagem e abre modal de edição
- `abrirModal()` - Abre dropdown e seleciona opção "Editar"

**Ações no modal:**
- `fecharModal()` - Fecha modal
- `clicarSalvar()` - Salva alterações
- `clicarVoltar()` - Volta sem salvar

**Preenchimento de campos:**
- `preencherDescricao(descricao)` - Preenche descrição
- `selecionarCategoria()` - Seleciona categoria (valor diferente)
- `selecionarConta()` - Seleciona conta (valor diferente)
- `selecionarFormaPagamento()` - Seleciona forma de pagamento (valor diferente)
- `preencherDataVencimento()` - Preenche data de vencimento (calculada)
- `preencherValorAleatorio()` - Preenche valor aleatório (diferente do atual)
- `selecionarCliente()` - Seleciona cliente (valor diferente)
- `selecionarTipoDocumento()` - Seleciona tipo de documento (valor diferente)

**Utilitários:**
- `selecionarValorDiferenteAtual(locator)` - Seleciona valor diferente do atual em autocomplete

---

## Locators utilizados

### EditarReceitaLocators

**Modal:**
- `modalContent` - Conteúdo do modal
- `closeButton` - Botão fechar

**Campos principais:**
- `descricaoInput` - Campo descrição (#historico)
- `categoriaAutocomplete` - Autocomplete de categoria
- `categoriaResults` - Resultados do autocomplete de categoria

**Conta e Forma de Pagamento:**
- `contaAutocomplete` - Autocomplete de conta
- `contaResults` - Resultados do autocomplete de conta
- `formaPagamentoAutocomplete` - Autocomplete de forma de pagamento
- `formaPagamentoResults` - Resultados do autocomplete de forma de pagamento

**Datas:**
- `dataCompetenciaInput` - Campo data de competência
- `dataVencimentoInput` - Campo data de vencimento

**Valor:**
- `valorInput` - Campo valor (#valor_parcela)

**Cliente e Documento:**
- `clienteAutocomplete` - Autocomplete de cliente
- `clienteResults` - Resultados do autocomplete de cliente
- `tipoDocumentoAutocomplete` - Autocomplete de tipo de documento
- `tipoDocumentoResults` - Resultados do autocomplete de tipo de documento
- `numeroDocumentoInput` - Campo número do documento

**Botões:**
- `voltarButton` - Botão voltar
- `salvarButton` - Botão salvar

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-nova-receita.md` - Cadastro de nova receita (receitas criadas podem ser editadas)
- `docs/cases/architecture-listagem-contas-a-receber.md` - Listagem de contas a receber (acessa edição a partir desta listagem)
- `docs/cases/architecture-recebimento.md` - Modal de recebimento (receitas editadas podem ser recebidas)
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existe pelo menos uma receita na listagem
- Todos os campos são preenchidos no teste de edição completa
- Valores são gerados aleatoriamente para evitar conflitos
- Data de vencimento é calculada baseada na data de competência (adiciona 1 dia)
- Uso de `force: true` para garantir interação com elementos que podem estar parcialmente visíveis
- Aguardo de 499ms após abrir modal para garantir carregamento completo
- Uso de `within()` para garantir que ações sejam feitas dentro do modal

---

## Geração de Dados

### Descrição com Timestamp
```javascript
const descricaoTeste = `Receita Teste - ${new Date().toLocaleString()}`;
```

### Valor Aleatório
```javascript
let novoValor;
do {
    novoValor = faker.number.float({ min: 10, max: 801, precision: 0.01 }).toFixed(2).replace('.', ',');
} while (novoValor === valorAtual);
```

### Cálculo de Data de Vencimento
```javascript
const [dia, mes, ano] = dataCompetencia.split('/');
const dataVencimento = new Date(ano, mes - 1, Number(dia) + 1);
const dataVencimentoFormatada = dataVencimento.toLocaleDateString('pt-BR');
```

---

**Última atualização:** 2024-12-19

