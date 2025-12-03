# Arquitetura dos casos de teste: Listagem de Contas a Receber

## Objetivo

Este documento descreve a arquitetura dos testes relacionados à funcionalidade de **Listagem de Contas a Receber**, que valida a exibição, filtragem, ações e validação de dados na listagem de receitas do módulo financeiro.

**Funcionalidades cobertas:**
- Ações de cadastro (abrir modal de nova receita)
- Ações de baixa (baixar selecionados, confirmação, cancelamento)
- Validações de campos e totalizadores
- Ações de dropdown (Editar, Detalhes, Cancelar, Excluir)
- Exclusão e confirmações
- Cancelamento de parcelas
- Filtragem por período

**Cenários principais:**
- Abrir modal de novo cadastro
- Baixar parcelas selecionadas
- Validar totalizadores e campos
- Executar ações do dropdown
- Excluir e cancelar parcelas
- Filtrar por período e validar valores

---

## Estrutura de arquivos

### Arquivos de teste (specs)
- `cypress/e2e/financeiro/listagem-contas-a-receber.spec.js` - Teste de listagem de contas a receber

### Page Objects
- `cypress/support/pages/Financeiro/ListagemContasAReceberPage.js` - Métodos para listagem de contas a receber

### Locators
- `cypress/support/locators/ListagemContasAReceberLocators.js` - Seletores da listagem

### Menu Lateral
- `cypress/support/pages/menulateral/MenulateralFinanceiroPage.js` - Navegação para módulo financeiro

---

## Imports e dependências

### Page Objects
```javascript
import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";
```

### Locators
Os locators são importados internamente no Page Object:
```javascript
import ListagemContasAReceberLocators from "../../locators/ListagemContasAReceberLocators";
```

### Commands
- `cy.loginArmazenandoSessao()` - Login com usuário padrão (ADR-0004)
- `cy.visit("/")` - Navegação para página inicial

---

## Estrutura do teste

### Suite: Testes da Listagem de Contas a Receber

**Tags:** `['@listagem-contas-a-receber', '@financeiro', '@regressivo']` (ADR-0010)

#### `describe('Ações de Cadastro')`

**it('Deve abrir o modal de novo cadastro ao clicar no botão "Novo Cadastro"')**
- Clica no botão "Novo Cadastro"
- Verifica que modal de "Nova Receita" foi aberto

---

#### `describe('Ações de Baixa e Confirmações')`

**it('Deve exibir erro ao tentar baixar sem selecionar parcelas')**
- Aguarda 1.5s
- Clica em "Baixar selecionados" sem selecionar nada
- Verifica modal de erro

**it('Deve marcar o checkbox da primeira parcela, realizar a baixa e confirmar')**
- Marca checkbox da primeira linha
- Clica em "Baixar selecionados"
- Valida título do popup de baixa
- Seleciona conta para baixa (ex: "CAIXA")
- Confirma baixa
- Valida modal de sucesso

**it('Deve exibir o popup de confirmação e cancelar a ação de baixa')**
- Marca checkbox da primeira linha
- Clica em "Baixar selecionados"
- Valida título do popup
- Cancela ação
- Verifica que modal foi fechado

---

#### `describe('Validações de Campos e Totalizadores')`

**it('Deve validar os totalizadores de valores e rótulos')**
- Verifica que totalizadores estão visíveis

**it('Deve verificar que os campos estão visíveis na primeira linha')**
- Verifica campos: Data Vencimento, Descrição, Cliente, Categoria, Valor Parcela, Valor Pago, Valor Pendente, Status

---

#### `describe('Ações de Dropdown')`

**it('Deve abrir o dropdown de ações e verificar que as opções estão visíveis')**
- Abre dropdown da primeira linha

**it('Deve validar as opções do dropdown de ações')**
- Valida opções: Editar, Detalhes do título, Cancelar, Excluir

**it('Deve clicar na opção "Editar" do dropdown e verificar o modal')**
- Seleciona opção "Editar"
- Verifica que modal de edição foi aberto

**it('Deve clicar na opção "Detalhes do título" do dropdown e verificar o modal')**
- Seleciona opção "Detalhes do título"
- Verifica que modal de "Recebimento" foi aberto

**it('Deve clicar na opção "Cancelar" do dropdown e verificar o modal de cancelamento')**
- Seleciona opção "Cancelar"
- Valida título do modal de cancelamento

**it('Deve clicar na opção "Excluir" do dropdown e verificar o modal de exclusão')**
- Seleciona opção "Excluir"
- Valida título do modal de exclusão

---

#### `describe('Exclusão e Confirmações')`

**it('Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu')**
- Obtém número inicial de linhas
- Seleciona opção "Excluir"
- Confirma exclusão
- Verifica notificação de sucesso
- Valida que número de linhas diminuiu

**it('Deve cancelar a exclusão e verificar que a parcela permanece na tabela')**
- Seleciona opção "Excluir"
- Cancela exclusão
- Verifica que modal foi fechado
- Verifica que linha permanece na tabela

---

#### `describe('Cancelamento de Parcelas')`

**it('Deve preencher o motivo, confirmar o cancelamento e verificar o status atualizado')**
- Seleciona opção "Cancelar"
- Preenche motivo do cancelamento
- Confirma cancelamento
- Verifica notificação de sucesso
- Verifica que status foi atualizado para "Cancelado"

**it('Deve preencher o motivo e cancelar a ação de cancelamento')**
- Seleciona opção "Cancelar"
- Preenche motivo
- Cancela ação
- Verifica que modal foi fechado

---

#### `it('Deve selecionar o período "Este Mês" e validar que os valores da coluna "Valor Parcela" são diferentes de 0,00')`
- Seleciona período "Este Mês"
- Aguarda `#loading` desaparecer
- Valida que todos os valores na coluna "Valor Parcela" são diferentes de 0,00

---

## Padrões e boas práticas

### Organização por Describes
- Testes organizados em describes por funcionalidade
- Facilita manutenção e compreensão

### Validações de Estado
- Validação de número de linhas antes e depois de exclusão
- Validação de status após operações
- Validação de fechamento de modais

### Interação com Modais
- Validação de títulos de modais antes de prosseguir
- Preenchimento de campos obrigatórios (ex: motivo de cancelamento)
- Confirmação e cancelamento de ações

### Filtragem
- Uso de filtros por período
- Validação de dados após filtragem

### Tags aplicadas
- `@listagem-contas-a-receber` - Identifica funcionalidade específica
- `@financeiro` - Identifica módulo
- `@regressivo` - Tipo de teste

---

## Métodos do Page Object

### ListagemContasAReceberPage

**Navegação:**
- `visit()` - Acessa listagem de contas a receber
- `verificarCarregamentoDaPagina()` - Verifica carregamento da página

**Cadastro:**
- `abrirNovoCadastro()` - Abre modal de novo cadastro

**Totalizadores:**
- `verificarTotalizadores()` - Verifica totalizadores visíveis

**Seleção de linhas:**
- `selecionarTodasLinhas()` - Seleciona todas as linhas
- `desmarcarTodasLinhas()` - Desmarca todas as linhas
- `marcarCheckboxPrimeiraLinha()` - Marca checkbox da primeira linha

**Validações de campos:**
- `verificarCamposVisiveisPrimeiraLinha()` - Verifica campos visíveis na primeira linha

**Ações de baixa:**
- `clicarBaixarSelecionados()` - Clica em "Baixar selecionados"
- `validarTituloPopupBaixa()` - Valida título do popup de baixa
- `selecionarContaParaBaixa(conta)` - Seleciona conta para baixa
- `confirmarBaixa()` - Confirma baixa
- `cancelarAcao()` - Cancela ação
- `validarModalSucesso()` - Valida modal de sucesso
- `verificarModalErroBaixar()` - Verifica modal de erro

**Dropdown:**
- `abrirDropdownAcaoPrimeiraLinha()` - Abre dropdown da primeira linha
- `validarOpcoesDropdown()` - Valida opções do dropdown
- `selecionarOpcaoEditar()` - Seleciona opção "Editar"
- `selecionarOpcaoDetalhes()` - Seleciona opção "Detalhes do título"
- `selecionarOpcaoCancelar()` - Seleciona opção "Cancelar"
- `selecionarOpcaoExcluir()` - Seleciona opção "Excluir"

**Exclusão:**
- `obterNumeroLinhasTabela()` - Obtém número de linhas da tabela
- `confirmarExclusao()` - Confirma exclusão
- `cancelarExclusao()` - Cancela exclusão
- `verificarNotificacaoSucesso()` - Verifica notificação de sucesso
- `verificarLinhaPresente()` - Verifica que linha está presente

**Cancelamento:**
- `validarTituloModalCancelar()` - Valida título do modal de cancelamento
- `preencherMotivoCancelar(motivo)` - Preenche motivo do cancelamento
- `confirmarCancelamento()` - Confirma cancelamento
- `verificarStatusCancelado()` - Verifica status cancelado

**Filtros:**
- `selecionarPeriodoEsteMes()` - Seleciona período "Este Mês"
- `validarValoresNaColunaValorParcela()` - Valida valores na coluna "Valor Parcela"

**Utilitários:**
- `verificarModalFechado()` - Verifica que modal foi fechado

---

## Locators utilizados

### ListagemContasAReceberLocators

**Filtros:**
- `periodoSelect` - Select de período
- `tipoDataSelect` - Select de tipo de data
- `statusSelect` - Select de status
- `pesquisarBtn` - Botão pesquisar

**Totalizadores:**
- `totalizadoresRotulos` - Rótulos dos totalizadores
- `totalizadoresValores` - Valores dos totalizadores

**Botões:**
- `novoCadastroBtn` - Botão novo cadastro
- `baixarSelecionadosBtn` - Botão baixar selecionados

**Tabela:**
- `tabelaCompleta` - Tabela completa
- `linhaTabela` - Linha da tabela

**Células:**
- `celulaDataVencimento` - Célula data de vencimento
- `celulaDescricao` - Célula descrição
- `celulaCliente` - Célula cliente
- `celulaCategoria` - Célula categoria
- `celulaValorParcela` - Célula valor parcela
- `celulaValorPago` - Célula valor pago
- `celulaValorPendente` - Célula valor pendente
- `celulaStatus` - Célula status

**Checkbox:**
- `checkboxPrimeiraLinha` - Checkbox primeira linha
- `checkboxLinha` - Checkbox de linha
- `checkboxSelecionarTodos` - Checkbox selecionar todos

**Dropdown:**
- `dropdownAcao` - Dropdown de ações
- `opcaoEditar` - Opção editar
- `opcaoDetalhes` - Opção detalhes
- `opcaoCancelar` - Opção cancelar
- `opcaoExcluir` - Opção excluir

**Status e botões:**
- `linhaStatusParcial` - Linha com status parcial
- `botaoParcialNaLinha` - Botão parcial na linha
- `linhaStatusBaixar` - Linha com status baixar
- `botaoBaixarNaLinha` - Botão baixar na linha

**Modais:**
- `modalErroBaixar` - Modal de erro ao baixar
- `modalTituloErroBaixar` - Título do modal de erro
- `modalTituloCancelar` - Título do modal de cancelamento
- `modalCampoMotivo` - Campo motivo
- `modalBotaoConfirmar` - Botão confirmar
- `modalBotaoCancelar` - Botão cancelar
- `modalTituloExcluir` - Título do modal de exclusão
- `modalTituloBaixar` - Título do popup de baixa
- `dropdownContaBaixa` - Dropdown de conta para baixa
- `botaoConfirmarBaixa` - Botão confirmar baixa
- `botaoCancelarBaixa` - Botão cancelar baixa
- `modalTituloSucesso` - Título do modal de sucesso

**Notificações:**
- `notificacaoSucesso` - Notificação de sucesso

---

## Referências

### ADRs relacionadas
- **ADR-0002:** Use Page Object Pattern - Page Objects utilizados
- **ADR-0003:** Separate Locators from Page Objects - Locators separados
- **ADR-0004:** Use cy.session for Login Persistence - `cy.loginArmazenandoSessao()` usado
- **ADR-0010:** Use Tags for Test Filtering - Tags aplicadas

### Documentação relacionada
- `docs/testes.md` - Inventário de testes
- `docs/cases/architecture-nova-receita.md` - Documentação de cadastro de receita
- `docs/cases/architecture-recebimento.md` - Documentação de recebimento
- `docs/adr/` - Architecture Decision Records

---

## Observações

- Testes organizados em describes por funcionalidade
- Validação de estado antes e depois de operações
- Uso de `cy.wait(1500)` em alguns casos para aguardar carregamento
- Validação de número de linhas para confirmar exclusão
- Validação de status após cancelamento
- Filtragem por período e validação de valores

---

## Validação de Valores

### Validação de Coluna "Valor Parcela"
```javascript
validarValoresNaColunaValorParcela() {
  // Valida que todos os valores na coluna são diferentes de 0,00
  cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
    cy.wrap($linha)
      .find(ListagemContasAReceberLocators.celulaValorParcela)
      .invoke('text')
      .should('not.contain', '0,00');
  });
}
```

---

**Última atualização:** 2024-12-19

