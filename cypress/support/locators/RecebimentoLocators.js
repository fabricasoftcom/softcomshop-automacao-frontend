const RecebimentoLocators = {
    // Modal
    modalTitulo: '.modal-title',
    modalContent: '.modal-content',

    // Dados principais do modal (cabeçalho)
    parcelaInfo: '.col-md-3:contains("Parcela")',
    valorInfo: '.col-md-3:contains("Valor")',
    vencimentoInfo: '.col-md-4:contains("Vencimento")',

    // Campos de formulário
    contaInput: '.modal #conta_id > .soft-select__control',
    formaPagamentoInput: '.modal #forma_pagamento_id > .soft-select__control',
    valorPagoInput: '.col-md-6 input[disabled]',
    valorPendenteInput: '.col-md-6 input[disabled]',
    jurosMultaInput: '#acrescimo',
    descontoInput: '#desconto',
    valorFinalInput: '.col-md-4 input[disabled]',
    dataRecebimentoInput: '#data_pagamento',
    valorRecebidoInput: '#valor',

    // Detalhes do pagamento
    detalhesPagamentoAccordion: '.icon-payment-details',
    detalhesPagamentoTable: '.card-body .table tbody',

    // Botões
    voltarBtn: '.modal .modal-content .btn-default:contains("Voltar")', // Garante que seja o botão "Voltar" do modal
    salvarBtn: '.modal-content .btn-primary', // Garante que seja o botão "Salvar" do modal

    // Autocomplete
    listaAutocompleteConta: '.soft-select__option',  // Lista de resultados
    primeiroResultadoAutocomplete: '.soft-select__option:first-child',  // Primeiro item na lista de autocomplete

    // Autocomplete para Forma de Pagamento
    listaAutocompleteFormaPagamento: '.modal #forma_pagamento_id > .soft-select__control',
    primeiroResultadoAutocompleteFormaPagamento: '.soft-select__option:first-child',

    // Toast de Sucesso
    toastSucesso: '.Toastify__toast--success',  // Classe específica para o Toast de sucesso

// Locators específicos para o modal de Recebimento
detalhesPagamentoTitulo: '.accordion .card-header h5',
detalhesPagamentoBotaoDesfazerBaixa: '.btn-danger.btn-xs', // Botão "Desfazer baixa"
botaoFecharModal: '.btn:contains("Voltar")',  // Botão para fechar o modal de recebimento

// Locators para colunas do cabeçalho da tabela de detalhes de pagamento
tabelaCabecalhoConta: '.table thead th:nth-child(1)',
tabelaCabecalhoPagamento: '.table thead th:nth-child(2)',
tabelaCabecalhoValorPago: '.table thead th:nth-child(3)',
tabelaCabecalhoAcrescimo: '.table thead th:nth-child(4)',
tabelaCabecalhoDesconto: '.table thead th:nth-child(5)',
tabelaCabecalhoData: '.table thead th:nth-child(6)',

  // Locators para a confirmação swal2 do desfazer baixa
  confirmacaoTitulo: '#swal2-title',
  botaoConfirmarDesfazer: '.swal2-confirm',
  botaoCancelarDesfazer: '.swal2-cancel'

};

export default RecebimentoLocators;
