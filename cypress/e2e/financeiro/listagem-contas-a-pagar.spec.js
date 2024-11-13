import listagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";

describe('Testes de Listagem de Contas a Pagar', () => {
  beforeEach(() => {
    cy.login();
    listagemContasAPagarPage.visit();
  });

  // it('Deve validar a exibição da tabela de contas a pagar e linhas da tabela', () => {
  //   listagemContasAPagarPage.validarTabelaVisivel();
  //   listagemContasAPagarPage.validarPrimeiraLinhaTabela();
  // });

  // it('Deve validar a exibição dos totalizadores corretamente', () => {
  //   listagemContasAPagarPage.validarTotalizadores();
  // });

  // it('Deve filtrar despesas por período e tipo de data', () => {
  //   listagemContasAPagarPage.filtrarPorPeriodo('MONTH', 'PAGAMENTO');
  // });

  // it('Deve efetuar pagamento da primeira despesa com status "Baixar"', () => {
  //   // Selecionar a primeira linha com status "Baixar"
  //   listagemContasAPagarPage.selecionarPrimeiraLinhaComStatusBaixar();
  
  //   // Clicar no botão "Baixar Selecionados"
  //   listagemContasAPagarPage.clicarBaixarSelecionados();
  
  //   // Selecionar a conta no modal SweetAlert e confirmar a baixa
  //   listagemContasAPagarPage.confirmarPagamentoComConta('CAIXA');
  
  //   // Validar o modal de sucesso após a confirmação
  //   listagemContasAPagarPage.verificarModalSucessoPagamento();
  // });

  // it('Deve abrir a página de novo cadastro de despesa', () => {
  //   listagemContasAPagarPage.abrirNovoCadastro();
  // });

  // it('Deve selecionar todas as linhas da tabela', () => {
  //   // Seleciona todas as linhas usando o método da classe
  //   listagemContasAPagarPage.selecionarTodasLinhas();
  
  //   // Verifica se o checkbox "Selecionar Todos" está marcado
  //   cy.get('input.receive_check_all').should('be.checked');
  // });
  // it('Deve abrir o dropdown da primeira linha com status "Baixar" e validar as opções', () => {
  //   // Localiza a primeira linha com o status "Baixar"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  
  //   // Verifica se as opções do dropdown são exibidas corretamente
  //   listagemContasAPagarPage.validarOpcoesDropdown();
  // });
  // it('Deve abrir o dropdown e selecionar a opção "Editar"', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Editar');
  //   cy.get('.modal-title').should('contain.text', 'Editar Despesa');
  // });

  // it('Deve abrir o dropdown e selecionar a opção "Detalhes do título"', () => {
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Detalhes do título');
  //   cy.get('.modal-title').should('contain.text', 'Editar Despesa');
  // });

  // it('Deve abrir o dropdown e selecionar a opção "Cancelar"', () => {
  //   // Abrir o dropdown na primeira linha com status "Baixar"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  
  //   // Selecionar a opção "Cancelar"
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Cancelar');
  
  //   // Validar o modal de confirmação
  //   listagemContasAPagarPage.validarModalConfirmacaoCancelamento();
  
  //   // Preencher o motivo e confirmar o cancelamento
  //   listagemContasAPagarPage.preencherMotivoCancelamento('Motivo de teste para cancelamento');
  //   listagemContasAPagarPage.confirmarCancelamento();
  
  //   // Validar a notificação de sucesso
  //   listagemContasAPagarPage.verificarNotificacaoSucesso();
  // });

  // it('Deve abrir o dropdown e selecionar a opção "Excluir"', () => {
  //   // Abrir o dropdown na primeira linha com status "Baixar"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  
  //   // Selecionar a opção "Excluir"
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');
  
  //   // Validar o modal de confirmação de exclusão
  //   listagemContasAPagarPage.validarModalConfirmacaoExclusao();
  
  //   // Confirmar a exclusão
  //   listagemContasAPagarPage.confirmarExclusao();
  
  //   // Validar a notificação de sucesso
  //   listagemContasAPagarPage.verificarNotificacaoSucesso('Exclusão realizada com sucesso!');
  // });
  // it('Não deve cancelar a despesa se a confirmação for cancelada', () => {
  //   // Abrir o dropdown na primeira linha com status "Baixar"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  
  //   // Selecionar a opção "Cancelar"
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Cancelar');
  
  //   // Validar que o modal de confirmação para cancelamento é exibido
  //   listagemContasAPagarPage.validarModalConfirmacaoCancelamento();
  
  //   // Clicar no botão "Não, deseja voltar!" para cancelar a operação
  //   listagemContasAPagarPage.cancelarOperacao();
  //     // Verificar que nenhuma notificação de sucesso é exibida após cancelar
  // listagemContasAPagarPage.validarAusenciaNotificacaoSucesso();
  // });
  // it('Não deve excluir a despesa se a confirmação for cancelada', () => {
  //   // Abrir o dropdown na primeira linha com status "Baixar"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusBaixar();
  
  //   // Selecionar a opção "Excluir"
  //   listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');
  
  //   // Validar que o modal de confirmação para exclusão é exibido
  //   listagemContasAPagarPage.validarModalConfirmacaoExclusao();
  
  //   // Clicar no botão "Voltar" para cancelar a operação
  //   listagemContasAPagarPage.cancelarOperacaoExclusao();
  
  //   // Verificar que nenhuma notificação de sucesso é exibida após cancelar
  //   listagemContasAPagarPage.validarAusenciaNotificacaoSucesso();
  // });
  // it('Deve abrir o dropdown na primeira linha com status "Pago" e validar as opções', () => {
  //   // Abrir o dropdown na primeira linha com status "Pago"
  //   listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusPago();
  
  //   // Validar que as opções corretas são exibidas no dropdown
  //   listagemContasAPagarPage.validarOpcoesDropdownPago();
  // });
  it('Deve abrir o dropdown e selecionar a opção "Excluir" na linha com status "Pago" e exibir erro', () => {
    // Abrir o dropdown na primeira linha com status "Pago"
    listagemContasAPagarPage.abrirDropdownPrimeiraLinhaComStatusPago();

    // Selecionar a opção "Excluir"
    listagemContasAPagarPage.selecionarOpcaoDropdown('Excluir');

    // Validar o modal de confirmação de exclusão
    listagemContasAPagarPage.validarModalConfirmacaoExclusao();

    // Confirmar a exclusão no modal
    listagemContasAPagarPage.confirmarExclusao();

    // Validar a notificação de erro
    listagemContasAPagarPage.verificarNotificacaoErro();
  });

});
