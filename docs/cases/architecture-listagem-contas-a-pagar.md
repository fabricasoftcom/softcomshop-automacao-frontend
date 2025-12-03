# Arquitetura dos casos de teste: Listagem de Contas a Pagar

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas a Pagar**, que valida a exibição, filtragem e validação de dados na listagem de despesas do módulo financeiro.

**Funcionalidades cobertas:**
- Validação de filtros por período
- Validação de valores na coluna "Valor Parcela"
- Navegação e acesso à listagem
- Validação de dados exibidos

**Cenários principais:**
- Selecionar período "Este Mês" e validar valores diferentes de 0,00

**Nota:** Muitos testes estão comentados no spec atual, indicando que podem estar em desenvolvimento ou desativados temporariamente.

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/listagem-contas-a-pagar.spec.js` - Teste de listagem de contas a pagar

### Page Objects
- `cypress/support/pages/Financeiro/ListagemContasAPagarPage.js` - Métodos para listagem de contas a pagar

### Locators
- `cypress/support/locators/ListagemContasAPagarLocators.js` - Seletores da listagem

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import listagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import ListagemContasAPagarLocators from "../../locators/ListagemContasAPagarLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes de Listagem de Contas a Pagar

**Tags:** `['@listagem-contas-a-pagar', '@financeiro', '@regressivo']` (ADR-0010)

#### `it('Deve selecionar o período "Este Mês" e validar que os valores da coluna "Valor Parcela" são diferentes de 0,00')`

**Fluxo completo:**
1. **Filtragem:**
   - Seleciona período "Este Mês"
   - Clica em pesquisar

2. **Validação:**
   - Valida que todos os valores na coluna "Valor Parcela" são diferentes de 0,00

---

## Testes Comentados (Potenciais)

O spec contém vários testes comentados que podem ser ativados no futuro:

### Validação da Tabela
- Validação da exibição da tabela e linhas

### Totalizadores
- Validação da exibição dos totalizadores

### Filtros
- Filtrar despesas por período e tipo de data

### Ações de Pagamento
- Efetuar pagamento da primeira despesa com status "Baixar"

### Cadastro
- Abrir página de novo cadastro de despesa

### Seleção de Linhas
- Selecionar todas as linhas da tabela

### Dropdown de Ações
- Abrir dropdown e validar opções
- Selecionar opções: Editar, Detalhes do título, Cancelar, Excluir

### Testes Negativos
- Não cancelar/excluir se confirmação for cancelada

### Validação de Status
- Validar opções do dropdown em linhas com status "Pago"
- Tentar excluir despesa com status "Pago" e esperar erro

---

## Padrões e boas práticas

### Filtragem
- Uso de seletores específicos para filtros de período
- Validação de filtros aplicados antes de prosseguir

### Validação de Dados
- Validação de valores em colunas específicas
- Verificação de que valores não são zero

### Navegação
- Uso de Page Object para navegação
- Verificação de carregamento da página

### Tags aplicadas
- `@listagem-contas-a-pagar` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ListagemContasAPagarPage

**Navegação:**
- `visit()` - Acessa listagem de contas a pagar
- `verificarCarregamentoDaPagina()` - Verifica carregamento da página

**Filtros:**
- `filtrarPorPeriodo(periodo, tipoData)` - Filtra por período e tipo de data
- `validarFiltroAplicado(periodo, tipoData)` - Valida filtro aplicado
- `selecionarPeriodoEsteMes()` - Seleciona período "Este Mês"
- `clicarPesquisar()` - Clica em pesquisar

**Ações na tabela:**
- `selecionarTodasLinhas()` - Seleciona todas as linhas
- `selecionarPrimeiraLinhaComStatusBaixar()` - Seleciona primeira linha com status "Baixar"
- `abrirDropdownPrimeiraLinhaComStatusBaixar()` - Abre dropdown da primeira linha
- `abrirDropdownPrimeiraLinhaComStatusPago()` - Abre dropdown da primeira linha com status "Pago"

**Validações:**
- `validarOpcoesDropdown()` - Valida opções do dropdown
- `validarOpcoesDropdownPago()` - Valida opções do dropdown para status "Pago"
- `validarValoresNaColunaValorParcela()` - Valida valores na coluna "Valor Parcela"

**Ações de dropdown:**
- `selecionarOpcaoDropdown(opcao)` - Seleciona opção do dropdown

**Cadastro:**
- `abrirNovoCadastro()` - Abre modal de novo cadastro

**Ações de baixa:**
- `clicarBaixarSelecionados()` - Clica em baixar selecionados
- `confirmarPagamentoComConta(conta)` - Confirma pagamento com conta
- `verificarModalSucessoPagamento()` - Verifica modal de sucesso

**Botões na linha:**
- `clicarBotaoBaixarNaPrimeiraLinha()` - Clica no botão "Baixar" da primeira linha
- `clicarBotaoParcialNaPrimeiraLinha()` - Clica no botão "Parcial" da primeira linha
- `clicarBotaoPagoNaPrimeiraLinha()` - Clica no botão "Pago" da primeira linha

**Validações de status:**
- `verificarStatusBaixar()` - Verifica status "Baixar"
- `verificarStatusParcial()` - Verifica status "Parcial"
- `verificarStatusPago()` - Verifica status "Pago"
- `verificarNotificacaoSucesso()` - Verifica notificação de sucesso

---

## Locators utilizados

### ListagemContasAPagarLocators

**Botões principais:**
- `novoCadastroButton` - Botão novo cadastro
- `baixarSelecionadosButton` - Botão baixar selecionados
- `botaoPesquisar` - Botão pesquisar

**Filtros:**
- `periodoSelectListagem` - Select de período
- `tipoDataSelectListagem` - Select de tipo de data
- `contaBancariaAutocomplete` - Autocomplete de conta bancária

**Tabela:**
- `tabela` - Tabela completa
- `linhaTabela` - Linha da tabela
- `checkboxTodos` - Checkbox selecionar todos
- `checkboxLinha` - Checkbox de linha

**Colunas:**
- `colunaDataVencimento` - Coluna data de vencimento
- `colunaDescricao` - Coluna descrição
- `colunaFornecedor` - Coluna fornecedor
- `colunaCategoria` - Coluna categoria
- `colunaStatus` - Coluna status

**Ações:**
- `dropdownAcoes` - Dropdown de ações
- `opcoesDropdown` - Opções do dropdown
- `botaoBaixar` - Botão baixar
- `botaoParcial` - Botão parcial
- `botaoPago` - Botão pago

**Totalizadores:**
- `totalizadores` - Totalizadores

**Modais:**
- `modalConfirmacao` - Modal de confirmação
- `modalTitulo` - Título do modal
- `botaoConfirmarBaixa` - Botão confirmar baixa
- `modalSucessoPagamento` - Modal de sucesso
- `inputMotivoCancelamento` - Input motivo cancelamento

**Notificações:**
- `notificacaoSucesso` - Notificação de sucesso
- `notificacaoErro` - Notificação de erro

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
- `docs/cases/architecture-baixar-despesa.md` - Documentação de baixa de despesa
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Muitos testes estão comentados no spec atual
- O teste ativo valida apenas filtro por período e valores na coluna
- Testes comentados indicam funcionalidades que podem ser ativadas no futuro
- A listagem é acessada através do menu lateral financeiro
- Validação de valores diferentes de 0,00 garante que há dados válidos na listagem

---

## Validação de Valores

### Validação de Coluna "Valor Parcela"
```javascript
validarValoresNaColunaValorParcela() {
  // Valida que todos os valores na coluna são diferentes de 0,00
  cy.get(ListagemContasAPagarLocators.linhaTabela).each(($linha) => {
    cy.wrap($linha)
      .find(ListagemContasAPagarLocators.colunaValorParcela)
      .invoke('text')
      .should('not.contain', '0,00');
  });
}
```

---

**Última atualização:** 2024-12-19

