const NovaReceitaLocators = {
  modalContent: '.modal-content',
  closeButton: '.close',
  salvarButton: 'button:contains("Salvar")',
  voltarButton: 'button:contains("Voltar")',
  
  descricaoInput: '#description',
  dataCompetenciaInput: '#competency_date',
  dataVencimentoInput: '#dueDate',
  valorInput: 'input[name="1730681017146"]',
  numeroDocumentoInput: '#document_number',

  // Autocomplete e opções
  categoriaAutocomplete: '#autocomplete_category',
  categoriaOption: '.category_results > :nth-child(1)',

  contaAutocomplete: '#autocomplete_bank_account',
  contaOption: '.bank_account_results > :nth-child(1)',

  formaPagamentoAutocomplete: '#autocomplete_payment_method',
  formaPagamentoOption: '.payment_method_results > :nth-child(1)',

  clienteAutocomplete: '#autocomplete_client',
  clienteOption: '.client_results > :nth-child(1)',

  tipoDocumentoAutocomplete: '#autocomplete_document_type',
  tipoDocumentoOption: '.document_type_results > :nth-child(1)',

  repetirButton: '.fa-refresh',
  outrasInformacoesButton: '.fa-list-alt',
  anexarArquivosButton: '.fa-paperclip'
};

export default NovaReceitaLocators;
