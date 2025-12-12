const TransferenciaContasLocators = {
  // Modal/Dialog
  modal: '.modal, dialog',
  modalContent: 'dialog, .modal-content',
  modalTitulo: '.modal-title:contains("Transferência entre contas"), dialog:contains("Transferência entre contas")',
  closeButton: '.close, dialog button:contains("×")',

  // Campos do formulário
  // Conta Origem - Autocomplete (SoftcomAutocomplete)
  contaOrigemInput: '#autocomplete_bankAccountOrigin',
  contaOrigemHiddenInput: '#bankAccountOrigin',
  contaOrigemOptionList: 'ul.bankAccountOrigin_results',
  contaOrigemOption: 'li.bankAccountOrigin_result',

  // Conta Destino - Autocomplete (SoftcomAutocomplete)
  contaDestinoInput: '#autocomplete_bankAccountDestination',
  contaDestinoHiddenInput: '#bankAccountDestination',
  contaDestinoOptionList: 'ul.bankAccountDestination_results',
  contaDestinoOption: 'li.bankAccountDestination_result',

  // Descrição (opcional)
  descricaoInput: 'input[placeholder*="Ajuste"], #descricao, #historico',

  // Valor (obrigatório)
  valorInput: '#valor, #valor_transferencia, input[type="text"][value*="0,00"]',

  // Data da Transferência (obrigatório)
  dataTransferenciaInput: '#data_transferencia, #data, input[type="date"], input[value*="2025"]',

  // Botões
  salvarButton: '.btn-primary:contains("Salvar"), button:contains("Salvar")',
  voltarButton: '.btn-default:contains("Voltar"), button:contains("Voltar")',

  // Toast/Mensagens
  toastSucesso: '.Toastify__toast--success',
  mensagemSucesso: '.Toastify__toast--success:contains("Transferência entre contas realizada com sucesso")',
  toastErro: '.Toastify__toast--error, .Toastify__toast--warning',
  notificacaoErro: '.Toastify__toast--error, .Toastify__toast--warning',

  // Loading
  loading: '#loading'
};

export default TransferenciaContasLocators;

