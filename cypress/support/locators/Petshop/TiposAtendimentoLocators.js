const TiposAtendimentoLocators = {
    // Listagem
    tituloListagem: 'h5:contains("Listagem de Tipos de Atendimentos")',

    // Filtros - Listagem
    filtroNome: '#nome',

    // Botões - Listagem
    btnPesquisar: '#pesquisar',
    btnNovoCadastro: 'a[href*="/tipo-atendimento/novo"]:contains("Novo Cadastro")',

    // Tabela
    tabelaTiposAtendimento: 'table',
    linkEditar: 'a[href*="/editar"]',
    colunaCodigo: 'th:contains("Código")',
    colunaNome: 'th:contains("Nome")',
    colunaDuracao: 'th:contains("Duração")',
    colunaCor: 'th:contains("Cor")',

    // Cadastro
    tituloCadastro: 'h5:contains("Cadastro de Tipos de atendimento")',

    // Campos - Cadastro
    campoNome: '#nome_atendimento',
    campoDuracao: '#duracao',
    campoCor: '#cor',
    checkboxDesativar: '#switcher_desativar',

    // Botões - Cadastro
    btnSalvar: '#btn-salvar',
    btnVoltar: 'a[href*="/tipo-atendimento"]:contains("Voltar")',
    btnNovoCadastroHeader: '#btn-novo',

    // Elementos gerais
    loading: '#loading-indicator',
    form: 'form'
};

export default TiposAtendimentoLocators;

