const BaixarDespesaLocators = {
  // Modal de pagamento
  tituloModalPagamento: '.modal-title.h4',

  // Campos de seleção de Conta e Forma de Pagamento
  campoConta: '.modal #conta_id > .soft-select__control',
  listaAutocompleteConta: '.SoftcomAutocompleteResults ul.bank_account_id_results',
  resultadoAutocompleteConta: '.soft-select__option',

  campoFormaPagamento: '.modal #forma_pagamento_id > .soft-select__control',
  listaAutocompleteFormaPagamento: '.SoftcomAutocompleteResults ul.payment_method_id_results',
  resultadoAutocompleteFormaPagamento: '.soft-select__option',

  // Campos de valores
 // Campos de valores usando seletores baseados em rótulos
 valorPagoinput1: '#valor_pago',
 valorPagoInput: '#valor',
 valorPendenteInput: '#valor_pendente',

  JurosMulta: '#acrescimo',
  Desconto: '#desconto',
  ValorFinal: '.col-md-4 input[disabled]',

  // Data de Recebimento
  dataRecebimentoInput: '#data_pagamento',

  // Campo de valor recebido
  ValorRecebido: '#valor',

  // Botões
  botaoSalvarPagamento: 'button.btn-primary:contains("Salvar")',
  botaoVoltar: 'button.btn-default:contains("Voltar")',
  botaoDesfazerBaixa: 'button.btn.btn-danger.btn-xs:contains("Desfazer baixa")',
  linhaTabela: 'table tbody tr',
  valorPagoNaLinha: 'td:nth-child(5)', // Ajuste
  // Modal SweetAlert
  confirmacaoTitulo: '#swal2-title',
  botaoConfirmarDesfazer: 'button.swal2-confirm',
  botaoCancelarDesfazer: 'button.swal2-cancel',
  tabelaDetalhesPagamento: '.modal table',

  // Notificação de sucesso
  toastSucesso: '.Toastify__toast--success'

};

export default BaixarDespesaLocators;
