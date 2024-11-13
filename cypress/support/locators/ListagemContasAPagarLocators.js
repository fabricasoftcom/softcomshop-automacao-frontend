const ListagemContasAPagarLocators = {
  // Botões principais
  novoCadastroButton: '.btn-warning.btn-sm:contains("Novo cadastro")',
  baixarSelecionadosButton: '.btn-success.btn-sm:contains("Baixar selecionados")',
  buscarButton: '.btn-warning i.fa-search',

  // Filtros (usando seletores não dinâmicos)
  periodoSelect: '.col-md-2 .form-group select.form-control', // Filtro de período (coluna 1)
  tipoDataSelect: '.col-md-2:nth-of-type(3) select.form-control', // Filtro de tipo de data (coluna 3)
  contaBancariaAutocomplete: 'input[name="autocomplete_bank_account"]',
  dataSearchInput: 'input.daterangepicker-date_search',
  calendarioButton: '.btn-daterangepicker-date_search',

  // Tabela de despesas
  tabela: 'table.table',
  linhaTabela: 'table tbody tr',
  checkboxTodos: 'input.receive_check_all',
  checkboxLinha: 'input.receive_check',
  colunaDataVencimento: 'td:nth-child(2)',
  colunaDescricao: 'td:nth-child(3)',
  colunaFornecedor: 'td:nth-child(4)',
  colunaCategoria: 'td:nth-child(5)',
  colunaStatus: 'td:nth-child(9)',

  modalExclusao: '.swal2-popup',
  botaoConfirmarExcluir: '.swal2-confirm',
  
  linhaComStatusPago: '.table tbody tr:contains("Pago")',
  // Ações na tabela
  dropdownAcoes: 'button.dropdown-toggle',
  baixarOpcao: 'button:contains("Baixar")',
  excluirOpcao: 'a:contains("Excluir")',
    opcoesDropdown: '.dropdown-menu.show li a',

  // Totalizadores
  totalizadores: '.row .col-md-3 div > small',

    // Modal SweetAlert
    modalConfirmacao: '.swal2-popup',
    selectContaBaixa: '#conta_baixa_lote',
    botaoConfirmarBaixa: 'button.swal2-confirm',
      // Modal de sucesso após confirmação
  modalSucessoPagamento: '.swal2-popup.swal2-icon-success',
  tituloModalSucesso: '#swal2-title',
  mensagemModalSucesso: '#swal2-html-container',
  botaoFecharModalSucesso: 'button.swal2-confirm',
    // Modal de confirmação para cancelar
    modalTitulo: '.swal2-title',
    inputMotivoCancelamento: '#reason',
    botaoConfirmarCancelamento: '.swal2-confirm',
    botaoVoltarCancelamento: '.swal2-cancel',
    notificacaoSucesso: '.Toastify__toast--success',
      // Modal de confirmação de exclusão
  modalTitulo: '.swal2-title',
  botaoConfirmarExclusao: '.swal2-confirm',
  botaoCancelarExclusao: '.swal2-cancel',

  // Notificações
  notificacaoSucesso: '.Toastify__toast--success',
  notificacaoErro: '.Toastify__toast--error'
};

export default ListagemContasAPagarLocators;
