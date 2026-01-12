# Arquitetura dos casos de teste: Nova Receita

## Objetivo

Este documento descreve a arquitetura dos testes relacionados ao cadastro de **Nova Receita**, que valida o processo completo de criação de receitas no módulo financeiro.

**Funcionalidades cobertas:**
- Abertura de modal de nova receita
- Preenchimento de formulário de receita
- Seleção de categoria, conta, forma de pagamento
- Preenchimento de datas e valores
- Seleção de cliente e tipo de documento
- Salvamento de receita

**Cenários principais:**
- Cadastro de receita com diferentes formas de pagamento
- Validação de preenchimento completo do formulário
- Teste parametrizado para múltiplas formas de pagamento

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/novaReceita.spec.js` - Teste de cadastro de nova receita

### Page Objects
- `cypress/support/pages/Financeiro/NovaReceitaPage.js` - Métodos para interação com modal de nova receita
- `cypress/support/pages/Financeiro/ListagemContasAReceberPage.js` - Navegação e abertura de modal

### Locators
- `cypress/support/locators/NovaReceitaLocators.js` - Seletores do modal de nova receita

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

### Fixtures
- `cypress/fixtures/formasPagamento.json` - Lista de formas de pagamento disponíveis

---

## Imports e dependências

### Page Objects
```javascript
import NovaReceitaPage from "../../support/pages/Financeiro/NovaReceitaPage";
import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";
```

### Fixtures
```javascript
const formasPagamento = require('../../fixtures/formasPagamento.json').formasPagamento;
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit('/financeiro/contas-a-receber')` - Navegação direta para listagem

---

## Estrutura do teste

### Suite: Cadastro de Nova Receita

**Tags:** `['@nova-receita', '@financeiro', '@regressivo']` (ADR-0010)

#### Teste Parametrizado

O teste utiliza `forEach` para iterar sobre todas as formas de pagamento disponíveis no fixture:

```javascript
formasPagamento.forEach((formaPagamento) => {
    it(`Deve preencher o formulário de Nova Receita com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
        // Teste para cada forma de pagamento
    });
});
```

**Fluxo completo para cada forma de pagamento:**
1. **Navegação:**
   - Login e navegação para `/financeiro/contas-a-receber`
   - Validação de título "Contas a Receber"
   - Abertura de modal de novo cadastro

2. **Preenchimento do formulário:**
   - Descrição: `Receita Teste - ${timestamp} - ${categoria}/${formaPagamento}`
   - Categoria: "RECEITA" (fixa)
   - Conta: Seleção automática de "CAIXA"
   - Forma de Pagamento: Valor do loop (parametrizado)
   - Data de Competência: Data atual
   - Data de Vencimento: Data atual
   - Valor: Valor aleatório entre 1 e 229 (formato brasileiro)
   - Cliente: Seleção via autocomplete (primeira opção)
   - Tipo de Documento: "Padrão"

3. **Salvamento:**
   - Clica no botão salvar
   - Aguarda desaparecimento de `#loading`
   - Validação de sucesso (comentada no código)

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
- Validação de sucesso comentada (pode ser reativada)

### Navegação
- Navegação direta via URL em vez de menu lateral
- Uso de `ListagemContasAReceberPage` para abrir modal

### Tratamento de Autocomplete
- Uso de `{downarrow}{enter}` para seleção de cliente
- Filtro por texto para seleção de categoria e forma de pagamento

### Tags aplicadas
- `@nova-receita` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### NovaReceitaPage

- `preencherDescricao(descricao)` - Preenche campo descrição
- `selecionarCategoria(categoria)` - Seleciona categoria via autocomplete
- `selecionarConta()` - Seleciona conta "CAIXA"
- `selecionarFormaPagamento(forma)` - Seleciona forma de pagamento via autocomplete
- `selecionarDataCompetencia(data)` - Preenche data de competência
- `selecionarDataVencimento(data)` - Preenche data de vencimento
- `preencherValor(valor)` - Preenche valor da receita
- `selecionarCliente(keys)` - Seleciona cliente via autocomplete
- `selecionarTipoDocumento(tipo)` - Seleciona tipo de documento
- `clicarSalvar()` - Clica no botão salvar

### ListagemContasAReceberPage

- `abrirNovoCadastro()` - Abre modal de novo cadastro

---

## Locators utilizados

### NovaReceitaLocators

- `modalContent` - Conteúdo do modal
- `descricaoInput` - Campo de descrição
- `categoriaAutocomplete` - Autocomplete de categoria
- `contaAutocomplete` - Autocomplete de conta
- `formaPagamentoAutocomplete` - Autocomplete de forma de pagamento
- `dataCompetenciaInput` - Campo de data de competência
- `dataVencimentoInput` - Campo de data de vencimento
- `valorInput` - Campo de valor
- `clienteAutocomplete` - Autocomplete de cliente
- `tipoDocumentoAutocomplete` - Autocomplete de tipo de documento
- `salvarButton` - Botão salvar

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0009:** Use Faker for Dynamic Test Data - Faker usado para geração de valores monetários
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-listagem-contas-a-receber.md` - Listagem de contas a receber (abre modal de nova receita)
- `docs/cases/architecture-recebimento.md` - Modal de recebimento (receitas criadas podem ser recebidas)
- `docs/cases/architecture-editar-receita.md` - Edição de receitas (receitas criadas podem ser editadas)
- `docs/adr/` - Architecture Decision Records

---

## Observações

- O teste é parametrizado e cria múltiplos testes (um para cada forma de pagamento)
- Valor aleatório gerado usando Faker (`faker.number.float()`) - Migrado conforme ADR-0009
- Descrição inclui timestamp para garantir unicidade
- Validação de sucesso está comentada no código
- Teste comentado para validação de erro com "Duplicata" e "Consumidor"

---

## Melhorias Sugeridas

1. ~~**Migrar para Faker (ADR-0009):**~~ ✅ **CONCLUÍDO**
   - ✅ Substituído `Math.random()` por Faker para geração de valores monetários
   - ⏳ Usar Faker para geração de descrições mais realistas (opcional)

2. **Reativar validação de sucesso:**
   - Descomentar validação de toast de sucesso
   - Adicionar validação de redirecionamento

3. **Adicionar teste de erro:**
   - Reativar teste comentado de validação de erro
   - Adicionar mais cenários de validação

---

**Última atualização:** 2024-12-19
