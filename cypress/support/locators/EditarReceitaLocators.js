const EditarReceitaLocators = {
    // Seletores do modal e cabeçalho
    modalContent: '.modal-content',
    closeButton: '.modal-header .close',

    // Seletores do formulário
    descricaoInput: '#description',

    // Categoria
    categoriaAutocomplete: '#autocomplete_category',
    categoriaResults: '#autocomplete_category_list .category_result',

    // Conta
    contaAutocomplete: '#autocomplete_bank_account',
    contaResults: '#autocomplete_bank_account_list .bank_account_result',

    // Forma de pagamento
    formaPagamentoAutocomplete: '#autocomplete_payment_method',
    formaPagamentoResults: '#autocomplete_payment_method_list .payment_method_result',

    // Datas
    dataCompetenciaInput: '#competency_date',
    dataVencimentoInput: '#dueDate',

    // Valor, localizado pelo rótulo "Valor*"
    valorInput: '.form-group:has(label:contains("Valor")) .form-control',

    // Cliente
    clienteAutocomplete: '#autocomplete_client',
    clienteResults: '#autocomplete_client_list .client_result',

    // Tipo de documento e número
    tipoDocumentoAutocomplete: '#autocomplete_document_type',
    tipoDocumentoResults: '#autocomplete_document_type_list .document_type_result',
    numeroDocumentoInput: '#document_number',

    // Ações do Modal - incluindo botão Voltar e Salvar específicos do modal
    repetirButton: '.fa-refresh',
    outrasInformacoesButton: '.fa-list-alt',
    anexarArquivosButton: '.fa-paperclip',
    voltarButton: '.btn-default:contains("Voltar")', // Seleciona "Voltar" especificamente no modal
    salvarButton: '.btn-primary:contains("Salvar")', // Seleciona "Salvar" especificamente no modal
};

export default EditarReceitaLocators;
