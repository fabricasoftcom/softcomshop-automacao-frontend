const LancamentoContaLocators = {
  // Modal/Dialog
  // Descoberta: Modal é div#content-plus com classes modal inmodal in (não é dialog)
  modal: '#content-plus.modal.in, .modal.in',
  modalContent: '#content-plus .modal-content, .modal-content',
  modalTitulo: '.modal-content:contains("Novo Lançamento"), #content-plus:contains("Novo Lançamento")',
  closeButton: '#btn-modal-plus-close, .close, button:contains("×")',

  // Campos do formulário
  // Operação - Select (primeiro select no modal)
  operacaoSelect: '#content-plus select, .modal-content select',
  operacaoOptionDebito: 'option[value*="DÉBITO"], option:contains("DÉBITO")',
  operacaoOptionCredito: 'option[value*="CRÉDITO"], option:contains("CRÉDITO")',

  // Categoria - Autocomplete
  categoriaAutocomplete: 'input[placeholder*="Selecione uma categoria"], input[placeholder*="categoria"], input[placeholder*="Categoria"]',
  categoriaOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  categoriaOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Descrição - Input texto
  descricaoInput: '#content-plus input[placeholder*="Fatura"], #content-plus input[placeholder*="energia"], .modal-content input[placeholder*="Fatura"], .modal-content input[placeholder*="energia"]',

  // Conta - Autocomplete
  contaAutocomplete: 'input[placeholder*="CAIXINHA"], input[placeholder*="caixinha"], input[placeholder*="conta"]',
  contaOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  contaOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Forma de Pagamento - Autocomplete
  formaPagamentoAutocomplete: 'input[placeholder*="Boleto"], input[placeholder*="boleto"], input[placeholder*="Forma"]',
  formaPagamentoOptionList: 'ul:not(.nav) li, .soft-select__option, [role="option"]',
  formaPagamentoOptionResult: 'ul:not(.nav) li, .soft-select__option, [role="option"]',

  // Tipo Data - Select (segundo select no modal)
  tipoDataSelect: '#content-plus select', // Será filtrado pelo índice
  tipoDataOptionVencimento: 'option[value*="VENCIMENTO"], option:contains("VENCIMENTO")',
  tipoDataOptionLancamento: 'option[value*="LANÇAMENTO"], option:contains("LANÇAMENTO")',

  // Data - Input
  dataInput: '#content-plus input[value*="2025"], .modal-content input[value*="2025"], input[type="text"][value*="/"]',

  // Valor - Input
  valorInput: '#content-plus input[value*="0,00"], .modal-content input[value*="0,00"]',

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

