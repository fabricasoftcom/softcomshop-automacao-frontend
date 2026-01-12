const FormaPagamentoCadastroLocators = {
  // Modal
  modal: '.modal',
  modalDialog: '.modal-dialog',
  modalContent: '.modal-content',
  modalHeader: '.modal-header',
  modalBody: '.modal-body',
  modalFooter: '.modal-footer',

  // Botões do Modal
  btnFechar: '#btn-modal-plus-close, .modal-header button.close, .modal-header [aria-label="Close"]',
  btnSalvar: '#btn-salvar',
  btnCancelar: 'button[data-dismiss="modal"], .btn-default[data-dismiss="modal"]',

  // Formulário
  formulario: 'form.form-horizontal',

  // Campos obrigatórios
  campoDescricao: '#nome',
  campoTipo: '#tipo',

  // Campos opcionais
  campoAtalhoNumero: '#atalho_numero',
  campoCodigoFormaPagamento: '#auto_codigo_nfce',
  campoAdquirente: '#auto_credenciadora_id',

  // Checkboxes (Switchers) - Inputs ocultos
  checkboxPos: '#switcher_pdv_pos',
  checkboxIntegrarApi: '#switcher_integrar_api',
  checkboxExibirPagamento: '#switcher_exibir_pagamento',
  checkboxPreVenda: '#switcher_pre_venda',
  checkboxSaldoCaixa: '#switcher_saldo_caixa',

  // Toggles visíveis dos Switchers
  togglePos: '#switcher_pdv_pos + .switchery',
  toggleIntegrarApi: '#switcher_integrar_api + .switchery',
  toggleExibirPagamento: '#switcher_exibir_pagamento + .switchery',
  togglePreVenda: '#switcher_pre_venda + .switchery',
  toggleSaldoCaixa: '#switcher_saldo_caixa + .switchery',

  // Opções do select Tipo
  tipoEspecie: 'option[value="ESPECIE"], option:contains("Especie")',
  tipoDuplicata: 'option[value="DUPLICATA"], option:contains("Duplicata")',
  tipoCartao: 'option[value="CARTAO"], option:contains("Cartao")',
  tipoBoleto: 'option[value="BOLETO"], option:contains("Boleto")',
  tipoCheque: 'option[value="CHEQUE"], option:contains("Cheque")',

  // Mensagens e Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',

  // Validações
  campoObrigatorio: '.has-error, .field-error',
  mensagemErro: '.help-block, .error-message',
};

export default FormaPagamentoCadastroLocators;

