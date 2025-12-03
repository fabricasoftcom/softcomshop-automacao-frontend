# Arquitetura dos casos de teste: Editar Despesa

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Editar Despesa**, que valida o processo completo de edição de despesas no módulo financeiro.

**Funcionalidades cobertas:**
- Edição completa de despesa
- Preenchimento de campos obrigatórios e opcionais
- Validação de salvamento com sucesso
- Seleção de valores diferentes dos atuais

**Cenários principais:**
- Editar descrição, categoria, data de vencimento e valor
- Salvar alterações e verificar sucesso

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/editarDespesa.spec.js` - Teste de edição de despesas

### Page Objects
- `cypress/support/pages/Financeiro/EditarDespesaPage.js` - Métodos para edição de despesas
- `cypress/support/pages/Financeiro/ListagemContasAPagarPage.js` - Navegação e acesso a despesas

### Locators
- `cypress/support/locators/EditarDespesaLocators.js` - Seletores do modal de edição

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import EditarDespesaPage from "../../support/pages/Financeiro/EditarDespesaPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import EditarDespesaLocators from "../../locators/EditarDespesaLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Edição Completa de Despesa

**Tags:** `['@editar-despesa', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve editar completamente uma despesa e salvar')`

**Fluxo completo:**
1. **Acesso:**
   - Acessa listagem de contas a pagar
   - Abre dropdown da primeira linha com status "Baixar"
   - Seleciona opção "Editar"
   - Abre modal de edição

2. **Preenchimento:**
   - Preenche descrição com timestamp único
   - Seleciona categoria (valor diferente do atual)
   - Preenche data de vencimento com data atual
   - Preenche valor aleatório (diferente do atual)

3. **Salvamento:**
   - Clica em salvar
   - Verifica toast de sucesso

**Nota:** Campos de conta e forma de pagamento estão comentados no teste atual.

---

## Padrões e boas práticas

### Dados Dinâmicos
- Uso de timestamp na descrição para garantir unicidade: `Despesa Editada - ${new Date().toLocaleString()}`
- Geração de valor aleatório diferente do atual para evitar conflitos

### Seleção de Valores Diferentes
- Método `selecionarValorDiferenteAtual()` garante que um valor diferente do atual seja selecionado
- Evita erros de validação quando o valor não muda

### Validações
- Verificação de toast de sucesso após salvamento
- Uso de `{ force: true }` para garantir cliques em elementos que podem estar parcialmente visíveis

### Interação com Modal
- Aguardo de 500ms após abrir modal para garantir carregamento completo
- Uso de `clear()` antes de `type()` para garantir limpeza do campo

---

## Métodos do Page Object

### EditarDespesaPage

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
- `preencherDataVencimento()` - Preenche data de vencimento (data atual)
- `preencherValorAleatorio()` - Preenche valor aleatório (diferente do atual)

**Utilitários:**
- `selecionarValorDiferenteAtual(locator)` - Seleciona valor diferente do atual em autocomplete

---

## Locators utilizados

### EditarDespesaLocators

**Modal:**
- `modalContent` - Conteúdo do modal
- `modalTitle` - Título do modal
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

**Fornecedor e Documento:**
- `fornecedorAutocomplete` - Autocomplete de fornecedor
- `fornecedorResults` - Resultados do autocomplete de fornecedor
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
- `docs/cases/architecture-nova-despesa.md` - Documentação de cadastro de despesa
- `docs/cases/architecture-listagem-contas-a-pagar.md` - Documentação de listagem
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste assume que existe pelo menos uma despesa com status "Baixar" na listagem
- Campos de conta e forma de pagamento estão comentados no teste atual
- Valores são gerados aleatoriamente para evitar conflitos
- Uso de `force: true` para garantir interação com elementos que podem estar parcialmente visíveis
- Aguardo de 500ms após abrir modal para garantir carregamento completo

---

## Geração de Dados

### Descrição com Timestamp
```javascript
const descricaoTeste = `Despesa Editada - ${new Date().toLocaleString()}`;
```

### Valor Aleatório
```javascript
let novoValor;
do {
    novoValor = (Math.floor(Math.random() * 9000) + 1000).toFixed(2).replace('.', ',');
} while (novoValor === valorAtual);
```

### Data Atual
```javascript
const dataAtual = new Date().toLocaleDateString('pt-BR');
```

---

**Última atualização:** 2024-12-19

