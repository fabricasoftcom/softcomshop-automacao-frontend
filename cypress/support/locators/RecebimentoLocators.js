const RecebimentoLocators = {
    // Modal
    modalTitulo: '.modal-title',
    modalContent: '.modal-content',

    // Dados principais do modal
    parcelaInfo: '.col-md-4:contains("Parcela")',
    valorInfo: '.col-md-4:contains("Valor")',
    vencimentoInfo: '.col-md-4:contains("Vencimento")',

    // Campos de formulário
    contaInput: 'input[placeholder="Ex. CAIXINHA"]',
    formaPagamentoInput: 'input[placeholder="Ex. Energia"]',
    valorPagoInput: '.col-md-6 input[disabled]',
    valorPendenteInput: '.col-md-6 input[disabled]',
    jurosMultaInput: 'input[name="fine"]',
    descontoInput: 'input[name="discount"]',
    valorFinalInput: '.col-md-4 input[disabled]',
    dataRecebimentoInput: 'input.daterangepicker-receipt_date',
    valorRecebidoInput: 'input[name="receipt_value"]',

    // Detalhes do pagamento
    detalhesPagamentoAccordion: '.icon-payment-details',
    detalhesPagamentoTable: '.card-body .table tbody',

    // Botões
    voltarBtn: '.modal-content .btn-default:contains("Voltar")', // Garante que seja o botão "Voltar" do modal
    salvarBtn: '.modal-content .btn-primary', // Garante que seja o botão "Salvar" do modal

    // Autocomplete
    listaAutocompleteConta: '#autocomplete_bank_account_id_list',  // Lista de resultados
    primeiroResultadoAutocomplete: '.bank_account_id_results .bank_account_id_result:first-child',  // Primeiro item na lista de autocomplete

    // Autocomplete para Forma de Pagamento
    listaAutocompleteFormaPagamento: '#autocomplete_payment_method_id_list',
    primeiroResultadoAutocompleteFormaPagamento: '.payment_method_id_results .payment_method_id_result:first-child',

    // Toast de Sucesso
    toastSucesso: '.Toastify__toast--success',  // Classe específica para o Toast de sucesso

// Locators específicos para o modal de Recebimento
detalhesPagamentoTitulo: '.accordion .card-header h5',
detalhesPagamentoBotaoDesfazerBaixa: '.btn-danger.btn-xs', // Botão "Desfazer baixa"
botaoFecharModal: 'button.close',  // Botão para fechar o modal de recebimento

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
