const NovaReceitaLocators = {
  // Modal e botões de controle
  modalContent: '.modal-content',
  closeButton: '.close',
  salvarButton: '.btn-primary',  // Botão "Salvar"
  voltarButton: '.btn-default',  // Botão "Voltar"

  // Campos do formulário dentro da div "modal-content"
  descricaoInput: '#historico',

  // Categoria Autocomplete e sua lista de resultados
  categoriaAutocomplete: '.modal-content #categoria_id',
  categoriaOptionList: '#autocomplete_category_list', // Contêiner de resultados
  categoriaOptionResult: '.category_results .category_result', // Opções de categoria na lista

  // Conta Autocomplete e sua lista de resultados
  contaAutocomplete: '#conta_id',  // Localizador específico com placeholder
  contaOptionList: '#autocomplete_bank_account_list', // Contêiner de resultados para contas
  contaOptionResult: '.soft-select__option', // Opções de conta na lista

  // Forma de Pagamento Autocomplete e sua lista de resultados
  formaPagamentoAutocomplete: '#forma_pagamento_id',
  formaPagamentoOptionList: '#autocomplete_payment_method_list', // Contêiner de resultados
  formaPagamentoOptionResult: '.payment_method_results .payment_method_result', // Opções de forma de pagamento na lista

  // Campos de data
  dataCompetenciaInput: '#termino_vigencia',
  dataVencimentoInput: '#data_termino_vigencia',

  // Campo de valor - Localiza a label "Valor*" e preenche o input dentro da mesma div
  valorInput: '#valor_parcela',

  // Cliente Autocomplete e sua lista de resultados
  clienteAutocomplete: '#cliente_id',
  clienteOptionList: '#autocomplete_client_list', // Contêiner de resultados
  clienteOptionResult: '.client_results .client_result', // Opções de cliente na lista

  // Tipo de documento Autocomplete e sua lista de resultados
  tipoDocumentoAutocomplete: '#tipo_documento_id',
  tipoDocumentoOptionList: '#autocomplete_document_type_list', // Contêiner de resultados
  tipoDocumentoOptionResult: '.document_type_results .document_type_result', // Opções de tipo de documento na lista

  // Número do documento
  numeroDocumentoInput: '#documento',

  // Botões adicionais dentro do modal
  repetirButton: '.fa-refresh',  // Botão "Repetir"
  outrasInformacoesButton: '.fa-list-alt',  // Botão "Outras Informações"
  anexarArquivosButton: '.fa-paperclip'  // Botão "Anexar Arquivos"
};

export default NovaReceitaLocators;
