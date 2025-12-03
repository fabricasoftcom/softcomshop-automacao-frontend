# Arquitetura dos casos de teste: Nova Despesa

## Objetivo

Este documento descreve a arquitetura dos testes relacionados ao cadastro de **Nova Despesa**, que valida o processo completo de criação de despesas no módulo financeiro.

**Funcionalidades cobertas:**
- Abertura de modal de nova despesa
- Preenchimento de formulário de despesa
- Seleção de categoria, conta, forma de pagamento
- Preenchimento de datas e valores
- Seleção de fornecedor e tipo de documento
- Preenchimento de número de documento
- Salvamento de despesa

**Cenários principais:**
- Cadastro de despesa com diferentes formas de pagamento
- Validação de preenchimento completo do formulário
- Teste parametrizado para múltiplas formas de pagamento

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/novaDespesa.spec.js` - Teste de cadastro de nova despesa

### Page Objects
- `cypress/support/pages/Financeiro/NovaDespesaPage.js` - Métodos para interação com modal de nova despesa
- `cypress/support/pages/Financeiro/ListagemContasAPagarPage.js` - Navegação e abertura de modal

### Locators
- `cypress/support/locators/NovaDespesaLocators.js` - Seletores do modal de nova despesa

### Fixtures
- `cypress/fixtures/formasPagamento.json` - Lista de formas de pagamento disponíveis

---

## Imports e dependências

### Page Objects
```javascript
import novaDespesaPage from "../../support/pages/Financeiro/NovaDespesaPage";
import ListagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";
```

### Fixtures
```javascript
const formasPagamento = require('../../fixtures/formasPagamento.json').formasPagamento;
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/financeiro/contas-a-pagar')` - Navegação direta para listagem

---

## Estrutura do teste

### Suite: Cadastro de Nova Despesa

**Tags:** `['@nova-despesa', '@financeiro', '@regressivo']` (ADR-0010)

#### Teste Parametrizado

O teste utiliza `forEach` para iterar sobre todas as formas de pagamento disponíveis no fixture:

```javascript
formasPagamento.forEach((formaPagamento) => {
    it(`Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
        // Teste para cada forma de pagamento
    });
});
```

**Fluxo completo para cada forma de pagamento:**
1. **Navegação:**
   - Login e navegação para `/financeiro/contas-a-pagar`
   - Validação de título "Contas a Pagar"
   - Abertura de modal de novo cadastro

2. **Abertura do modal:**
   - Abre modal com categoria "Despesa"

3. **Preenchimento do formulário:**
   - Descrição: `Despesa Teste - ${timestamp} - ${categoria}/${formaPagamento}`
   - Categoria: "Despesa" (fixa)
   - Conta: Seleção automática
   - Forma de Pagamento: Valor do loop (parametrizado)
   - Data de Competência: Data atual
   - Data de Vencimento: Data atual
   - Valor: Valor aleatório entre 1 e 500 (formato brasileiro)
   - Fornecedor: Seleção via autocomplete (primeira opção)
   - Tipo de Documento: "PADRÃO"
   - Número de Documento: "98765" (fixo)

4. **Salvamento:**
   - Clica no botão salvar
   - Aguarda desaparecimento de `#loading`
   - Validação de retorno para listagem (título "Contas a Pagar")

---

## Padrões e boas práticas

### Teste Parametrizado
- Uso de `forEach` para testar múltiplas formas de pagamento
- Cada forma de pagamento gera um teste separado
- Descrição dinâmica inclui categoria e forma de pagamento

### Geração de Dados Dinâmicos
- **Descrição:** Inclui timestamp para garantir unicidade
- **Valor:** Gerado aleatoriamente usando `Math.random()` (ADR-0009 - poderia usar Faker)
- **Data:** Usa data atual do sistema

### Validações
- Validação de título da página antes de prosseguir
- Aguardo de `#loading` desaparecer após salvamento
- Validação de retorno para listagem após salvamento

### Navegação
- Navegação direta via URL em vez de menu lateral
- Uso de `ListagemContasAPagarPage` para abrir modal

### Tratamento de Autocomplete
- Uso de `{downarrow}{enter}` para seleção de fornecedor
- Filtro por texto para seleção de categoria e forma de pagamento

### Tags aplicadas
- `@nova-despesa` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### NovaDespesaPage

- `abrirModal(categoria)` - Abre modal com categoria especificada
- `preencherDescricao(descricao)` - Preenche campo descrição
- `selecionarCategoria(categoria)` - Seleciona categoria via autocomplete
- `selecionarConta()` - Seleciona conta
- `selecionarFormaPagamento(forma)` - Seleciona forma de pagamento via autocomplete
- `selecionarDataCompetencia(data)` - Preenche data de competência
- `selecionarDataVencimento(data)` - Preenche data de vencimento
- `preencherValor(valor)` - Preenche valor da despesa
- `selecionarFornecedor(keys)` - Seleciona fornecedor via autocomplete
- `selecionarTipoDocumento(tipo)` - Seleciona tipo de documento
- `preencherNumeroDocumento(numero)` - Preenche número do documento
- `clicarSalvar()` - Clica no botão salvar e valida retorno

### ListagemContasAPagarPage

- `abrirNovoCadastro()` - Abre modal de novo cadastro

---

## Locators utilizados

### NovaDespesaLocators

- `modalContent` - Conteúdo do modal
- `modalTitle` - Título do modal
- `descricaoInput` - Campo de descrição
- `categoriaAutocomplete` - Autocomplete de categoria
- `contaAutocomplete` - Autocomplete de conta
- `formaPagamentoAutocomplete` - Autocomplete de forma de pagamento
- `dataCompetenciaInput` - Campo de data de competência
- `dataVencimentoInput` - Campo de data de vencimento
- `valorInputDentroDiv` - Campo de valor (dentro de div específica)
- `fornecedorAutocomplete` - Autocomplete de fornecedor
- `tipoDocumentoAutocomplete` - Autocomplete de tipo de documento
- `numeroDocumentoInput` - Campo de número de documento
- `salvarButton` - Botão salvar

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Valor aleatório gerado (poderia usar Faker)
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-nova-receita.md` - Documentação similar de receitas
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste é parametrizado e cria múltiplos testes (um para cada forma de pagamento)
- Valor aleatório gerado usando `Math.random()` (poderia ser migrado para Faker)
- Descrição inclui timestamp para garantir unicidade
- Número de documento é fixo ("98765")
- Validação de retorno para listagem após salvamento

---

## Diferenças em relação a Nova Receita

1. **Categoria:** "Despesa" vs "RECEITA"
2. **Fornecedor vs Cliente:** Despesa usa fornecedor, receita usa cliente
3. **Número de Documento:** Despesa preenche número de documento
4. **Valor:** Despesa gera valores entre 1-500, receita entre 1-229

---

## Melhorias Sugeridas

1. **Migrar para Faker (ADR-0009):**
   - Substituir `Math.random()` por Faker para geração de valores
   - Usar Faker para geração de descrições mais realistas
   - Gerar número de documento dinamicamente

2. **Adicionar mais validações:**
   - Validar toast de sucesso
   - Validar criação na listagem
   - Adicionar cenários de erro

---

**Última atualização:** 2024-12-19

