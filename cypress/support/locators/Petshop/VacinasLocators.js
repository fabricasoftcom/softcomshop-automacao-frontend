const VacinasLocators = {
    // Listagem
    tituloListagem: 'h5:contains("Listagem de Vacinas")',

    // Filtros - Listagem
    filtroVacina: '#auto_vacina_id',
    filtroGrupo: 'select#grupo, select[name="grupo"]',
    filtroStatus: 'select#status, select[name="status"]',

    // Botões - Listagem
    btnPesquisar: '#btn-pesquisa-form',
    btnNovoCadastro: 'a[href*="/vacinas/cadastro"]:contains("Novo Cadastro")',

    // Tabela
    tabelaVacinas: 'table',
    mensagemSemResultados: ':contains("Nenhum resultado foi localizado")',

    // Cadastro
    tituloCadastro: 'h5:contains("Cadastro de Vacinas")',

    // Campos - Cadastro
    campoDescricao: '#descricao',
    campoGrupo: 'select#grupo, select[name="grupo"]',
    checkboxDesativar: '#switcher_desativar',
    checkboxRespeitarIntervalo: '#switcher_respeitar_intervalo',
    selectLaboratorios: '#laboratorio_id',
    campoLaboratorio: 'input[placeholder="Opções"]',
    btnAdicionarLaboratorio: '#auto_plus_button_add_laboratorio',

    // Botões - Cadastro
    btnSalvar: '#adicionar',
    btnVoltar: 'a[href*="/vacinas"]:contains("Voltar")',
    btnNovoCadastroHeader: 'a[href*="/vacinas/cadastro"]:contains("Novo Cadastro")',
    btnExcluir: '#btn-excluir',

    // Elementos gerais
    loading: '#loading-indicator',
    form: 'form'
};

export default VacinasLocators;

