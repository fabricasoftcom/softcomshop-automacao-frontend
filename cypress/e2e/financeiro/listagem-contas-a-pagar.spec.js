import listagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";

describe('Testes de Listagem de Contas a Pagar', { tags: ['@listagem-contas-a-pagar', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    listagemContasAPagarPage.visit();
  });

  // // Validação da tabela e seus elementos
  // it('Deve validar a exibição da tabela de contas a pagar e linhas da tabela', () => {
  //   listagemContasAPagarPage.validarTabelaVisivel();
  // });

//   // Validação dos totalizadores
//   it('Deve validar a exibição dos totalizadores corretamente', () => {
//     listagemContasAPagarPage.validarTotalizadores();
//   });

  // // Filtrar despesas por período e tipo de data
  // it('Deve filtrar despesas por período e tipo de data', () => {
  //   listagemContasAPagarPage.filtrarPorPeriodo('MONTH', 'PAGAMENTO');
  // });

  // // Realizar pagamento de uma despesa
  // it('Deve efetuar pagamento da primeira despesa com status "Baixar"', () => {
  //   listagemContasAPagarPage.selecionarPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.clicarBaixarSelecionados();
  //   listagemContasAPagarPage.confirmarPagamentoComConta('CAIXA');
  //   listagemContasAPagarPage.verificarModalSucessoPagamento();
  // });

//   // Acessar página de novo cadastro de despesa
//   it('Deve abrir a página de novo cadastro de despesa', () => {
//     listagemContasAPagarPage.abrirNovoCadastro();
//   });

  // // Selecionar todas as linhas da tabela
  // it('Deve selecionar todas as linhas da tabela', () => {
  //   listagemContasAPagarPage.selecionarTodasLinhas();
  //   cy.get('#check-all-contas-a-pagar').should('be.checked');
  // });

  // // Validar opções do dropdown em linhas com status "Baixar"
  // it('Deve abrir o dropdown da primeira linha com status "Baixar" e validar as opções', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.validarOpcoesDropdown();
  // });

//   // Ações no dropdown
//   it('Deve abrir o dropdown e selecionar a opção "Editar"', () => {
//     listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
//     listagemContasAPagarPage.selecionarOpcaoDropdown('Editar');
//     cy.get('.modal-title').should('contain.text', 'Editar Despesa');
//   });

  // it('Deve abrir o dropdown e selecionar a opção "Detalhes do título"', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Detalhes do título');
  //   cy.get('.modal-title').should('contain.text', 'Recebimento');
  // });

  // it('Deve abrir o dropdown e selecionar a opção "Cancelar"', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Cancelar');
  //   listagemContasAPagarPage.validarModalConfirmacaoCancelamento();
  //   listagemContasAPagarPage.preencherMotivoCancelamento('Motivo de teste para cancelamento');
  //   listagemContasAPagarPage.confirmarCancelamento();
  // });

  // it('Deve abrir o dropdown e selecionar a opção "Excluir"', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');
  //   listagemContasAPagarPage.validarModalConfirmacaoExclusao();
  //   listagemContasAPagarPage.confirmarExclusao();
  // });

//   // Testes negativos para cancelamento
//   it('Não deve cancelar a despesa se a confirmação for cancelada', () => {
//     listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
//     listagemContasAPagarPage.selecionarOpcaoDropdown('Cancelar');
//     listagemContasAPagarPage.validarModalConfirmacaoCancelamento();
//     listagemContasAPagarPage.cancelarOperacao();
//     listagemContasAPagarPage.validarAusenciaNotificacaoSucesso();
//   });

//   // Testes negativos para exclusão
//   it('Não deve excluir a despesa se a confirmação for cancelada', () => {
//     listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
//     listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');
//     listagemContasAPagarPage.validarModalConfirmacaoExclusao();
//     listagemContasAPagarPage.cancelarOperacaoExclusao();
//     listagemContasAPagarPage.validarAusenciaNotificacaoSucesso();
//   });

//   // Validar opções do dropdown em linhas com status "Pago"
//   it('Deve abrir o dropdown na primeira linha com status "Pago" e validar as opções', () => {
//     listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusPago();
//     listagemContasAPagarPage.validarOpcoesDropdownPago();
//   });

  // // Teste para tentar excluir uma despesa com status "Pago" e esperar um erro
  // it('Deve abrir o dropdown e selecionar a opção "Excluir" na linha com status "Pago" e exibir erro', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusPago();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');
  //   listagemContasAPagarPage.validarModalConfirmacaoExclusao();
  //   listagemContasAPagarPage.confirmarExclusao();
  //   cy.get('.Toastify__toast--warning')
  // });

  it('Deve selecionar o período "Este Mês" e validar que os valores da coluna "Valor Parcela" são diferentes de 0,00', () => {
    // Seleciona o período "Este Mês"
    listagemContasAPagarPage.selecionarPeriodoEsteMes();
    listagemContasAPagarPage.clicarPesquisar();

    // Valida os valores na coluna "Valor Parcela"
    listagemContasAPagarPage.validarValoresNaColunaValorParcela();
});
});
