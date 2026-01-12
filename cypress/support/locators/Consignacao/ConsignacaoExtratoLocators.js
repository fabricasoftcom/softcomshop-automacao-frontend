const ConsignacaoExtratoLocators = {
  // Título
  titulo: 'h5:contains("Extrato")',

  // Formulário de Pesquisa
  campoPeriodo: '#data',
  campoCliente: '#auto_cliente_id',
  campoClienteHidden: '#cliente_id',
  campoProduto: '#auto_produto_id',
  campoProdutoHidden: '#produto_id',
  campoStatus: '#status',
  btnPesquisar: 'button:contains("Pesquisar")',

  // Tabela e Totalizadores
  tabela: 'table',
  totalGeral: 'h2:contains("Total Geral")',
  totalizadorRequisicoes: 'td:contains("Requisições:")',
  totalizadorDevolucoes: 'td:contains("Devolucões:")',
  totalizadorVendas: 'td:contains("Vendas:")',
  totalizadorSaldo: 'td:contains("Saldo:")'
};

export default ConsignacaoExtratoLocators;

