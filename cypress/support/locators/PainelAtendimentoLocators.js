const PainelAtendimentoLocators = {
    campoDataAtendimento: '#filtro_data_atendimento',
    iconeData: '#div_filtro_data_atendimento .btn-daterangepicker',
    campoTipoAtendimento: '#auto_filtro_tipo_atendimento_id',
    campoFuncionario: '#auto_filtro_funcionario_id',
    campoStatus: '#filtro_status',
    campoCliente: '#auto_filtro_cliente_id',
    campoAnimal: '#auto_animal_id',
    botaoPesquisar: '#btn-pesquisar',
    botaoConfiguracoes: '#btn-configuracoes',

    kanbanAgendado: '[data-id="agendado"]',
    kanbanEmEspera: '[data-id="em_espera"]',
    kanbanEmAtendimento: '[data-id="em_atendimento"]',
    kanbanConcluido: '[data-id="concluido"]',

    cardKanban: '.kanban-item',
    botaoAdicionarAtendimento: '#add-atendimento',

    abaPainelAtendimentos: '[href="#painelAtendimentos"]',
    abaVacinacao: '[href="#vacinacao"]',
};

export default PainelAtendimentoLocators;
