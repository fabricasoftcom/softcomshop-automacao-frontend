const CartaoCadastroLocators = {
  // Modal
  modal: '.modal',
  modalDialog: '.modal-dialog',
  modalContent: '.modal-content',
  modalHeader: '.modal-header',
  modalBody: '.modal-body',
  modalFooter: '.modal-footer',

  // Botões do Modal
  btnFechar: '.modal-header button.close, .modal-header [aria-label="Close"]',
  btnSalvar: '#btn-salvar',
  btnCancelar: 'button[data-dismiss="modal"], .btn-default[data-dismiss="modal"]',

  // Formulário
  formulario: 'form.form-horizontal, subForm',

  // Campos obrigatórios
  campoNomeCartao: '#nome_cartao, #nome, input[name*="nome"]',
  campoAlias: '#alias, input[name*="alias"]',
  campoTaxaAdministrativa: '#taxa_administrativa, #taxa_admin, input[name*="taxa"]',
  campoDia: '#dia, input[name*="dia"], input[type="number"][name*="dia"]',
  campoParcela: '#parcela, input[name*="parcela"], input[type="number"][name*="parcela"]',

  // Campos opcionais
  campoBandeira: '#bandeira, input[name*="bandeira"]',
  campoAdquirente: '#adquirente, input[name*="adquirente"]',
  campoTipo: '#tipo, select[name*="tipo"]',

  // Opções do select Tipo
  tipoCredito: 'option[value="CRÉDITO"], option:contains("CRÉDITO")',
  tipoDebito: 'option[value="DÉBITO"], option:contains("DÉBITO")',

  // Mensagens e Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',

  // Validações
  campoObrigatorio: '.has-error, .field-error',
  mensagemErro: '.help-block, .error-message',
};

export default CartaoCadastroLocators;

