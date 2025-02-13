const BaixarDespesaLocators = {
  // Modal de pagamento
  tituloModalPagamento: '.modal-title.h4',

  // Campos de seleção de Conta e Forma de Pagamento
  campoConta: 'input[placeholder="Ex. CAIXINHA"]',
  listaAutocompleteConta: '.SoftcomAutocompleteResults ul.bank_account_id_results',
  resultadoAutocompleteConta: '.SoftcomAutocompleteResults ul.bank_account_id_results li',

  campoFormaPagamento: 'input[placeholder="Ex. Energia"]',
  listaAutocompleteFormaPagamento: '.SoftcomAutocompleteResults ul.payment_method_id_results',
  resultadoAutocompleteFormaPagamento: '.payment_method_id_result',

  // Campos de valores
 // Campos de valores usando seletores baseados em rótulos
 valorPagoInput: 'div.form-group:has(label:contains("Valor Pago")) input[disabled]',
 valorPendenteInput: 'div.form-group:has(label:contains("Valor Pendente")) input[disabled]',

  JurosMulta: '#fine',
  Desconto: '#discount',
  ValorFinal: 'div.form-group:has(label:contains("Valor Final")) input[disabled]',

  // Data de Recebimento
  dataRecebimentoInput: '.daterangepicker-receipt_date',

  // Campo de valor recebido
  ValorRecebido: '#receipt_value',

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
