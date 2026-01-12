const OrdemFornecimentoCadastroLocators = {
  url: '/ordem-fornecimento/novo',
  fornecedor: '#auto_fornecedor_id',
  telefone: '#telefone',
  dataPrevisao: '#data_previsao_chegada',
  tipoFrete: '#tipo_frete',
  pedidoFornecedor: '#pedido_fornecedor',
  pagamento: '#pagamento',
  observacao: '#observacao',
  itens: {
    produtoInput: 'input[id^="auto_produto_empresa_grade_id_"]',
    quantidadeInput: 'input[id^="quantidade_"]',
    precoInput: 'input[id^="preco_compra_"]',
    subtotal: 'input[id^="subtotal_"]', // Hipótese
    linhas: 'table tbody tr'
  },
  btnSalvar: '.btn-salvar',
  btnVoltar: '#btn-voltar',
  btnSugestaoCompra: '#btn-sugestao-compra'
};

export default OrdemFornecimentoCadastroLocators;

