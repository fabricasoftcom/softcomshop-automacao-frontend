const EditarReceitaLocators = {
    // Seletores do modal e cabeçalho
    modalContent: '.modal-content:contains("Editar Receita")',
    closeButton: '.modal-header .close',

    // Seletores do formulário
    descricaoInput: '#historico',

    // Categoria
    categoriaAutocomplete: ' .modal #categoria_id > .soft-select__control',
    categoriaResults: '.category_results .category_result',

    // Conta
    contaAutocomplete: '.modal #conta_id > .soft-select__control',
    contaResults: '#autocomplete_bank_account_list .bank_account_result',

    // Forma de pagamento
    formaPagamentoAutocomplete: '.modal #forma_pagamento_id > .soft-select__control',
    formaPagamentoResults: '.soft-select__option',

    // Datas
    dataCompetenciaInput: '#termino_vigencia',
    dataVencimentoInput: '#data_termino_vigencia',

    // Valor, localizado pelo rótulo "Valor*"
    valorInput: '#valor_parcela',

    // Cliente
    clienteAutocomplete: '.modal #cliente_id > .soft-select__control',
    clienteResults: '.client_results .client_result',

    // Tipo de documento e número
    tipoDocumentoAutocomplete: '.modal #tipo_documento_id > .soft-select__control',
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
