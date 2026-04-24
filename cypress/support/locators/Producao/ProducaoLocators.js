const ProducaoLocators = {
    // Título da página
    tituloListagem: 'h5:contains("Listagem Produção")',
    // Formulário de pesquisa
    formProducao: '#form-producao',
    formPesquisa: '.form-pesquisa',
    // Campos do formulário de listagem
    codigoInput: '#codigo',
    produtoIdHiddenListagem: '#produto_id',
    produtoAutocompleteListagem: '#auto_produto_id',
    produtoIconListagem: '#auto_icon_produto_id',
    produtoContainerListagem: '#div_auto_produto_id',
    produtoResultadoListagem: '#div_auto_produto_id .typeahead-list li a, .typeahead-list li a, .typeahead-result li a',
    dataInputListagem: '#data',
    statusSelect: '#status',
    // Botões
    btnPesquisaToggle: '#btn-pesquisa',
    btnPesquisar: '#pesquisar',
    btnNovoCadastro: '#btn-novo',
    btnModalPlus: '#btn-modal-plus',
    btnModalClose: '#btn-modal-plus-close',
    // Tabela de resultados
    tabelaProducao: 'table.table-hover',
    tabelaLinhas: 'table.table-hover tbody tr',
    mensagemSemResultados: 'td:contains("Nenhum resultado foi localizado")',
    botaoEditarLinha: '.button-tab.button-edit, .button-edit',
    // Modal de filtros
    modalFiltros: '.modal',
    btnLimparFiltros: '.cancelBtn',
    btnAplicarFiltros: '.applyBtn',
    // Loading
    loading: '#loading, .loading, .spinner',
    // ========== TELA DE NOVO CADASTRO ==========
    // Formulário principal
    formNovoCadastro: 'form[action*="/producao/salvar"]',
    formModoPreparo: '#form-modo-preparo',
    // Campos do formulário de novo cadastro
    dataInputCadastro: '#created_at',
    observacaoInput: '#observacao',
    produtoAutocompleteCadastro: '#auto_producao_produto_empresa_grade_id',
    produtoIconCadastro: '#auto_icon_producao_produto_empresa_grade_id',
    produtoResultadoCadastro: '.typeahead-list > :nth-child(1) > a',
    produtoIdHiddenCadastro: '#producao_produto_empresa_grade_id',
    produtoId: '#producao_produto_id',
    quantidadeInput: '#producao_quantidade',
    modoPreparoTextarea: '#modo_preparo',
    // Radio buttons - Tipo de produção
    tipoProducaoDireta: '#tipo_producao_DIRETA',
    tipoProducaoReversa: '#tipo_producao_REVERSA',
    // Status e botões
    statusEmElaboracao: '#status_da_nota_em_elaboracao',
    btnLancarItem: '#btn-lancar-item',
    btnSalvarModoPreparo: '#btn-salvar-modo-preparo',
    btnSalvarModoPreparoAcao: '#form-modo-preparo .add-salvar-modo-preparo, .add-salvar-modo-preparo',
    // Campos hidden
    idHidden: '#id',
    statusHidden: '#status',
    empresaIdHidden: '#empresa_id',

    // ========== TELA APÓS LANÇAR ITEM (EDIÇÃO) ==========
    // Botões de ação
    btnVoltar: '#btn-voltar, a.btn-voltar',
    btnSalvarProducao: '#btn-salvar-producao, button.btn-salvar-producao',
    btnFinalizar: '#btn-finalizar, a.btn-finalizar',
    btnReverter: '#btn-reverter, a.btn-reverter, button.btn-reverter',
    btnImprimir: '#btn-imprimir, a.btn-imprimir',
    btnNovoCadastroEdicao: '#btn-novo, a.btn-novo',
    btnExcluir: '#btn-excluir, a.btn-excluir',

    // Tabela de itens da produção
    tabelaItensProducao: 'table.table-hover.table-form',
    tabelaItensLinhas: 'table.table-hover.table-form tbody tr',
    tituloTabelaItens: 'h5:contains("Informe ou edite os produtos que serão utilizados na produção")',
    // Campos da tabela de itens (IDs dinâmicos com sufixo _)
    produtoAutocompleteTabela: 'input[id^="auto_produto_empresa_grade_id_"]',
    produtoIconTabela: '[id^="auto_icon_produto_empresa_grade_id_"]',
    produtoResultadoTabela: '[id^="div_auto_produto_empresa_grade_id_"] .typeahead-list li a, .typeahead-list li a, .typeahead-result li a',
    quantidadeInputTabela: 'input[id^="quantidade_"]',
    precoInputTabela: 'input[placeholder*="0,00"]',
    subtotalTabela: 'td:contains("Subtotal")',
    btnSalvarItemTabela: 'button[id*="btn-salvar"], button[data-action="save-item"], #btn-salvar-item',

    // Totalizadores
    totalizadorQuantidadeItens: 'h5:contains("Quantidade de Itens")',
    totalizadorVolumeItens: 'h5:contains("Volume dos Itens")',
    totalizadorTotal: 'h5:contains("Total:")',

    // Título da página de edição (flexível - pode ter ou não o número)
    tituloEdicao: 'h5:contains("Informe o tipo de produção, data e produto")'
};
export default ProducaoLocators;
