const ModelosPrescricoesLocators = {
    // Listagem
    tituloListagem: 'h5:contains("Listagem"), h5:contains("Modelos"), h5:contains("Prescrições")',

    // Filtros - Listagem
    filtroDescricao: '#descricao, input[name="descricao"]',
    filtroStatus: 'select#status, select[name="status"]',

    // Botões - Listagem
    btnPesquisar: '#pesquisar, #btn-pesquisar, button:contains("Pesquisar")',
    btnNovoCadastro: 'a[href*="/prescricao/novo"], a[href*="/prescricao/cadastro"]:contains("Novo Cadastro")',

    // Tabela
    tabelaPrescricoes: 'table',
    linkEditar: 'a[href*="/editar"], a[href*="/prescricao"]',
    mensagemSemResultados: ':contains("Nenhum resultado")',

    // Cadastro
    tituloCadastro: 'h5:contains("Cadastro"), h5:contains("Modelo"), h5:contains("Prescrição")',

    // Campos - Cadastro
    campoDescricao: '#descricao, input[name="descricao"]',
    campoConteudo: '#conteudo, textarea[name="conteudo"]',
    checkboxDesativar: '#switcher_desativar, input[type="checkbox"][name*="desativar"]',

    // Botões - Cadastro
    btnSalvar: '#btn-salvar, #adicionar, button:contains("Salvar")',
    btnVoltar: 'a[href*="/prescricao"]:contains("Voltar")',
    btnNovoCadastroHeader: 'a[href*="/prescricao/novo"]:contains("Novo Cadastro")',

    // Elementos gerais
    loading: '#loading-indicator',
    form: 'form'
};

export default ModelosPrescricoesLocators;

