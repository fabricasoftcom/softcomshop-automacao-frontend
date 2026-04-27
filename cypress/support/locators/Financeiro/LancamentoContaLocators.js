const LancamentoContaLocators = {
  // Modal/Dialog
  modal: '#content-plus.modal.in, .modal.in',
  modalContent: '#content-plus .modal-content, .modal-content',
  modalTitulo: '.modal-content:contains("Novo Lançamento"), #content-plus:contains("Novo Lançamento")',
  closeButton: '#btn-modal-plus-close, .close, button:contains("×")',

  // Campos do formulário
  operacaoSelect: '#operation',
  operacaoOptionDebito: 'option[value*="DÉBITO"], option:contains("DÉBITO")',
  operacaoOptionCredito: 'option[value*="CRÉDITO"], option:contains("CRÉDITO")',

  // Categoria - Autocomplete
  categoriaAutocomplete: '#autocomplete_category_id',
  categoriaOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  categoriaOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Descrição - Input texto
  descricaoInput: '#description',

  // Conta - Autocomplete
  contaAutocomplete: '#autocomplete_bank_account_id',
  contaOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  contaOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Forma de Pagamento - Autocomplete
  formaPagamentoAutocomplete: '#autocomplete_payment_method_id',
  formaPagamentoOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  formaPagamentoOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Tipo Data - Select
  tipoDataSelect: '#type_date',
  tipoDataOptionVencimento: 'option[value*="VENCIMENTO"], option:contains("VENCIMENTO")',
  tipoDataOptionLancamento: 'option[value*="LANÇAMENTO"], option:contains("LANÇAMENTO")',

  // Data - daterangepicker input (não é um input de texto simples)
  dataInput: '#date_entry',

  // Valor - Input
  valorInput: '#value',

  // Botões
  salvarButton: '#content-plus button:contains("Salvar"), .modal-content button:contains("Salvar")',
  voltarButton: '#content-plus button:contains("Voltar"), .modal-content button:contains("Voltar")',

  // Toast/Mensagens
  toastSucesso: '.Toastify__toast--success',
  mensagemSucesso: '.Toastify__toast--success:contains("Lançamento de Conta salvo com sucesso")',
  toastErro: '.Toastify__toast--error',
  notificacaoErro: '.Toastify__toast--error',

  // Loading
  loading: '#loading',

  // Listagem
  botaoNovoCadastro: 'button:contains("Novo cadastro")',
  tituloPagina: 'h5:contains("Lançamento Conta")'
};

export default LancamentoContaLocators;
