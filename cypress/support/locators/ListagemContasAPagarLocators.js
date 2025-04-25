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

  // Colunas da tabela
  colunaDataVencimento: 'td:nth-child(2)',
  colunaDescricao: 'td:nth-child(3)',
  colunaFornecedor: 'td:nth-child(4)',
  colunaCategoria: 'td:nth-child(5)',
  colunaStatus: 'td:nth-child(11)',

  // Ações na tabela
  dropdownAcoes: 'button.dropdown-toggle',
  opcoesDropdown: '.dropdown-menu.show li a',
  excluirOpcao: 'a:contains("Excluir")',
  baixarOpcao: 'button:contains("Baixar")',
  linhaComStatusPago: '.table tbody tr:contains("Pago")',
  botaoBaixar: 'button.btn-xs.btn-warning:contains("Baixar")',
  botaoParcial: 'button.btn-xs.btn-success:contains("Parcial")',
  botaoPago: 'button.btn.btn-xs.btn-primary:contains("Pago")',

  // Totalizadores
  totalizadores: '.row .col-md-3 div > small',

  // Modal SweetAlert (genérico)
  modalConfirmacao: '.swal2-popup',
  modalTitulo: '.swal2-title',
  botaoConfirmarBaixa: 'button.swal2-confirm',
  botaoCancelar: 'button.swal2-cancel',

  // Modal para operações de baixa
  selectContaBaixa: '#conta_baixa_lote',
  botaoConfirmarBaixaLote: '.swal2-confirm',

  // Modal de sucesso após confirmação
  modalSucessoPagamento: '.swal2-popup.swal2-icon-success',
  tituloModalSucesso: '#swal2-title',
  mensagemModalSucesso: '#swal2-html-container',
  botaoFecharModalSucesso: 'button.swal2-confirm',

  // Modal de confirmação de cancelamento
  inputMotivoCancelamento: '#reason',
  botaoConfirmarCancelamento: '.swal2-confirm',
  botaoVoltarCancelamento: '.swal2-cancel',

  // Modal de confirmação de exclusão
  botaoConfirmarExclusao: '.swal2-confirm',
  botaoCancelarExclusao: '.swal2-cancel',
  periodoSelect: '.col-md-2 .form-group select.form-control',

  // Notificações Toastify
  notificacaoSucesso: '.Toastify__toast--success',
  notificacaoErro: '.Toastify__toast--error'
};

export default ListagemContasAPagarLocators;
