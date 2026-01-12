const PainelAtendimentoLocators = {
    // Abas
    abaPainelAtendimentos: 'a[href="#painelAtendimentos"]',
    abaVacinacao: 'a[href="#vacinacao"], #tab-vacinacao',

    // Filtros - Aba Painel de Atendimentos
    filtroDataAtendimento: '#filtro_data_atendimento',
    filtroTipoAtendimento: '#auto_filtro_tipo_atendimento_id',
    filtroFuncionario: '#auto_filtro_funcionario_id',
    filtroSetor: '#auto_filtro_setor_id',
    filtroStatus: '#filtro_status',
    filtroCliente: '#auto_filtro_cliente_id',
    filtroAnimal: '#auto_animal_id',

    // Botões - Aba Painel de Atendimentos
    btnBuscar: '#btn-pesquisar',
    btnConfiguracoes: '#btn-configuracoes',
    btnNovoAtendimento: '#add-atendimento, a[href*="pesquisar-animal"]',
    linkPesquisarAnimal: 'a[href*="pesquisar-animal"]',

    // Cards de Status
    cardAgendados: ':contains("Agendados")',
    cardEmEspera: ':contains("Em Espera")',
    cardEmAtendimento: ':contains("Em Atendimento")',
    cardConcluido: ':contains("Concluído")',

    // Filtros - Aba Vacinação
    filtroPesquisa: '#pesquisa',
    filtroVacinaNome: '#vacina_nome',
    filtroDataVacina: '#data',
    filtroStatusVacina: '#status',
    filtroGrupoVacina: '#grupo_',
    filtroVacinas: '#auto_vacinas',

    // Página de Pesquisa de Animal
    campoPesquisaAnimal: '#auto_filtro_animal_id',
    btnAdicionarAnimal: '#btn-adicionar-animal',

    // Elementos gerais
    loading: '#loading-indicator',
    formFiltros: 'form',

    // Configurações do Painel
    btnConfiguracoes: '#btn-configuracoes',
    checkboxGerarAtendimentoServico: '#check_gerar_atendimento_servico',
    selectTipoRegistroTempo: '#tipo_registro_tempo',

    // Modal de Atendimento
    modalAtendimento: '.modal',
    campoStatusModal: '.modal #div_status > #status, .modal #status',
    btnSalvarAtendimento: '#btn-salvar-atendimento',
    btnFecharModalAtendimento: '.modal-body > #btn-modal-plus-close',

    // Cards Kanban
    cardAgendado: '[data-id="agendado"] .kanban-item:first-child',
    cardEmAtendimento: '[data-id="em_atendimento"] .kanban-item:first-child',

    // Aba Ordem de Serviço
    abaOrdemServico: '#tab-ordem-servico',
    btnGerarVenda: '#btn-gerar-venda',
    popupConfirmacao: '.sweet-alert.modal-confirm-destroy',
    botaoSimPopupConfirmacao: '.sweet-alert.modal-confirm-destroy .confirm'
};

export default PainelAtendimentoLocators;

