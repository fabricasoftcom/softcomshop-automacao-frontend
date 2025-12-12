const RequisicaoConsignacaoLocators = {
  // ========== LISTAGEM ==========

  // Botões Principais
  btnNovoCadastro: 'a[href*="/consignacao/requisicao/novo"], #btn-novo, .btn-novo',
  btnPesquisa: '#btn-pesquisa', // Botão para abrir/toggle formulário de pesquisa
  formPesquisa: '.form-pesquisa', // Formulário de pesquisa

  // Campos de Pesquisa/Filtros
  campoCodigo: '#id',
  campoCliente: '#auto_cliente_nome',
  dropdownCliente: '#auto_icon_cliente_nome',
  campoStatus: '#status',
  btnSubmitPesquisa: '#btn-pesquisar, #pesquisar', // Botão para submeter pesquisa

  // Tabela de Requisições
  tabelaRequisicoes: '.table-requisicao, #table-requisicao, table',
  checkboxTodos: '.check_all',
  linhasTabela: '#table-form-body tr, tbody tr',
  botaoEditar: '.button-edit',

  // Modal de Confirmação
  modalConfirmacao: '.modal-confirm-destroy',
  botaoConfirmarExclusao: '.modal-confirm-destroy .confirm',
  botaoCancelarExclusao: '.modal-confirm-destroy .cancel',

  // Toast e Alertas
  toastSucesso: '.toast-message, .alert-success, .alert, [class*="toast"]',
  toastAlerta: '.toast-message, .alert-danger, .alert',

  // ========== CADASTRO ==========

  // Campos do Formulário Principal
  campoClienteCadastro: '#auto_cliente_id',
  campoVendedor: '#auto_funcionario_id',
  campoObservacoes: '#observacao',

  // Typeahead Results
  resultadoCliente: '.typeahead-result .typeahead-list li:first-child a',
  resultadoVendedor: '.typeahead-result .typeahead-list li:first-child a',

  // Botões do Cadastro
  btnSalvar: '#btn-salvar',
  // Nota: Botões sem ID único, usar cy.contains() no Page Object
  // btnVoltar, btnNovoCadastro, btnCancelarRequisição, btnImprimir

  // ========== SEÇÃO DE PRODUTOS ==========

  // Campos de Produto (sem ID único, usar seletores contextuais no Page Object)
  // Nota: Estes campos aparecem apenas na tela de edição após salvar o cadastro
  // O Page Object deve buscar usando contexto da seção de produtos
  campoProduto: 'input.autocompleter.typeahead',
  // Campos quantidade e preço serão buscados por contexto no Page Object
  // usando xpath ou cy.contains() + .parent().find()
  resultadoProduto: '.typeahead-result .typeahead-list li:first-child a',
  btnAdicionarProduto: '#btn_adicionar_produto',

  // Tabela de Produtos
  tabelaItens: '.table.table-itens',
  linhasTabelaItens: '.table.table-itens tbody tr',

  // Loading
  loading: '#loading'
};

export default RequisicaoConsignacaoLocators;

