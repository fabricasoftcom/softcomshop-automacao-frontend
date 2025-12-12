const DevolucaoConsignacaoLocators = {
  // ========== COMUNS ==========

  loading: '#loading',
  toastSucesso: '.toast-message, .alert-success, .alert, [class*="toast"]',
  toastAlerta: '.toast-message, .alert-danger, .alert',

  // ========== LISTAGEM ==========

  // Botões Principais
  btnPesquisaToggle: 'a[href="#"]:has(i.fa-search), a:contains(""):has(i)', // Botão para abrir/fechar o formulário de pesquisa (ícone de lupa)
  formPesquisa: 'form.form-horizontal', // Formulário de pesquisa (pode estar oculto inicialmente)
  btnNovoCadastro: 'a[href*="/consignacao/devolucao/novo"], #btn-novo, .btn-novo',
  btnExcluirSelecionados: '.delete_all, a:contains("Excluir Selecionados")',

  // Campos de Pesquisa/Filtros
  campoPeriodo: 'input[placeholder*="Período"], input[name*="periodo"]',
  campoClientePesquisa: '#auto_cliente_nome',
  campoVendedorPesquisa: '#auto_funcionario_nome',
  btnPesquisar: '#btn-pesquisar',

  // Tabela de Devoluções
  tabelaDevolucoes: 'table.table-hover, table',
  checkboxTodos: '.check_all',
  linhasTabela: 'tbody tr',
  checkboxLinha: 'input[type="checkbox"]',
  linkEditar: 'a[href*="editar"]',

  // ========== CADASTRO ==========

  // Botões
  btnSalvar: '#btn-salvar',
  btnVoltar: 'a:contains("Voltar")',
  btnExcluir: 'a[href*="/excluir/"]',

  // Campos do Formulário Principal
  campoClienteCadastro: '#auto_cliente_id',
  resultadoCliente: '.typeahead-result .typeahead-list li:first-child a',
  campoVendedor: '#auto_funcionario_id',
  resultadoVendedor: '.typeahead-result .typeahead-list li:first-child a',
  campoObservacoes: '#observacao',

  // ========== SEÇÃO DE PRODUTOS (Edição) ==========

  // Campos de Produto
  campoProduto: 'form:has(h5:contains("Produtos")) input.autocompleter.typeahead',
  campoDevolucao: 'form:has(h5:contains("Produtos")) input[placeholder*="Devolução"]',
  campoVenda: 'form:has(h5:contains("Produtos")) input[placeholder*="Venda"]',
  resultadoProduto: '.typeahead-result .typeahead-list li:first-child a',
  btnAdicionarProduto: 'form:has(h5:contains("Produtos")) button:contains("Adicionar")',

  // Tabela de Itens
  tabelaItens: '.table.table-itens, table',
  linhasTabelaItens: '.table.table-itens tbody tr, tbody tr',
};

export default DevolucaoConsignacaoLocators;

