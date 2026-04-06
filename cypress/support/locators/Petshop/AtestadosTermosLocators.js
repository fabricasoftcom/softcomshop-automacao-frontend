const AtestadosTermosLocators = {
    // Listagem
    tituloListagem: 'h5:contains("Listagem"), h5:contains("Atestados"), h5:contains("Termos")',

    // Filtros - Listagem
    filtroDescricao: '#descricao, input[name="descricao"]',
    filtroTipo: 'select#tipo, select[name="tipo"]',
    filtroStatus: 'select#status, select[name="status"]',

    // Botões - Listagem
    btnPesquisar: '#pesquisar, #btn-pesquisar, button:contains("Pesquisar")',
    btnNovoCadastro: 'a[href*="/atestados-termos/novo"], a[href*="/atestados-termos/cadastro"]:contains("Novo Cadastro")',

    // Tabela
    tabelaAtestadosTermos: 'table',
    linhasTabela: 'tbody tr',
    linkEditar: 'a[href*="/editar"], a[href*="/atestados-termos"]',
    mensagemSemResultados: ':contains("Nenhum resultado")',
    mensagemSemResultadosTexto: 'Nenhum resultado',

    // Cadastro
    tituloCadastro: 'h5:contains("Cadastro"), h5:contains("Atestado"), h5:contains("Termo")',

    // Campos - Cadastro
    campoDescricao: '#descricao, input[name="descricao"]',
    campoTipo: 'select#tipo, select[name="tipo"]',
    campoConteudo: '#conteudo, textarea[name="conteudo"]',
    checkboxDesativar: '#switcher_desativar, input[type="checkbox"][name*="desativar"]',

    // Botões - Cadastro
    btnSalvar: '#btn-salvar, #adicionar, button:contains("Salvar")',
    btnVoltar: 'a[href*="/atestados-termos"]:contains("Voltar")',
    btnNovoCadastroHeader: 'a[href*="/atestados-termos/novo"]:contains("Novo Cadastro")',

    // Feedback pós-salvar (toast/alert - ajustar seletor conforme aplicação)
    toastSucesso: '.Toastify__toast--success, .alert-success, .toast-success',

    // Botão Excluir
    btnExcluir: '#btn-excluir, button:contains("Excluir"), a:contains("Excluir"), .btn-danger',

    // Elementos gerais
    loading: '#loading-indicator',
    form: 'form'
};

export default AtestadosTermosLocators;

