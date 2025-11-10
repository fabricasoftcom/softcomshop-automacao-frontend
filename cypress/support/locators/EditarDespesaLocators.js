const EditarDespesaLocators = {
    // Modal e cabeçalho
    modalContent: '.modal-content',
    modalTitle: '.modal-title:contains("Editar Despesa")',
    closeButton: '.modal-header .close',

    // Campos principais
    descricaoInput: '#historico',
    categoriaAutocomplete: ' .modal #categoria_id > .soft-select__control',
    categoriaResults: '#autocomplete_category_list .category_result',

    // Conta bancária
    contaAutocomplete: '.modal-content #autocomplete_bank_account',
    contaResults: '#autocomplete_bank_account_list .bank_account_result',

    // Forma de pagamento
    formaPagamentoAutocomplete: '#autocomplete_payment_method',
    formaPagamentoResults: '#autocomplete_payment_method_list .payment_method_result',

    // Datas
    dataCompetenciaInput: '#termino_vigencia',
    dataVencimentoInput: '#data_termino_vigencia',

    // Valor
    valorInput: '#valor_parcela',

    // Fornecedor
    fornecedorAutocomplete: '#autocomplete_provider',
    fornecedorResults: '#autocomplete_provider_list .provider_result',

    // Tipo de documento
    tipoDocumentoAutocomplete: '#autocomplete_document_type',
    tipoDocumentoResults: '#autocomplete_document_type_list .document_type_result',
    numeroDocumentoInput: '#document_number',

    // Centro de custo
    centroCustoCheckbox: '.div-checkbox .switchery',
    centroCustoTable: '.cost_center_table tbody',

    // Botões no modal
    voltarButton: '.btn-default:contains("Voltar")',
    salvarButton: '.btn-primary:contains("Salvar")',
};
export default EditarDespesaLocators;
