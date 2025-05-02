const PainelAtendimentoLocators = {
    // Botões e Ações
    btnNovoAtendimento: '#add-atendimento',
    btnPesquisar: '#btn-pesquisar',
    btnConfigurar: '#btn-configuracoes',

    // Painel Kanban
    painelKanban: '#kanban-content',
    painelAgendado: '[data-id="agendado"]',
    painelEmEspera: '[data-id="em_espera"]',
    painelEmAtendimento: '[data-id="em_atendimento"]',
    painelConcluido: '[data-id="concluido"]',

    cardKanbanAgendado: '[data-id="agendado"] .kanban-item',
    cardKanbanEmAtendimento: '[data-id="em_atendimento"] .kanban-item',

    // Filtros
    filtroDataAtendimento: '#filtro_data_atendimento',
    filtroStatus: '#filtro_status',
    filtroTipoAtendimento: '#filtro_tipo_atendimento_id',
    filtroFuncionario: '#filtro_funcionario_id',
    filtroCliente: '#filtro_cliente_id',
    filtroAnimal: '#animal_id',

    // Campos de Pesquisa
    campoDataAtendimento: '#filtro_data_atendimento',
    campoTipoAtendimento: '#filtro_tipo_atendimento_id',
    campoFuncionario: '#filtro_funcionario_id',
    campoCliente: '#filtro_cliente_id',
    campoAnimal: '#auto_animal_id',

    // Tabela
    tabelaAtendimentos: '#680be40bec772',
    tabelaBody: '#table-form-body',

    btnNovoAtendimento: '#add-atendimento',
    inputBuscaAnimal: '#auto_filtro_animal_id',
    btnAbrirBuscaAnimal: '#auto_icon_filtro_animal_id',
    listaResultadoBuscaAnimal: '.typeahead-list > :nth-child(1) > a',
    // Campos do modal de novo atendimento
    campoTipoAtendimento: '#auto_tipo_atendimento_id',
    btnAbrirTipoAtendimento: '#auto_icon_tipo_atendimento_id',
    listaResultadoTipoAtendimento: '#div_auto_tipo_atendimento_id > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a',

    campoHorario: '#horario',
    campoDuracao: '#duracao',
    campoStatus: '.modal #div_status > #status',
    // atendente/profissional
    campoProfissional: '#auto_funcionario_id',
    btnAbrirProfissional: '#auto_icon_funcionario_id',
    listaResultadoProfissional: '#div_auto_funcionario_id > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1)> a',

    campoData: '#data_atendimento',
    dataHoje: '.datepicker-dropdown > :nth-child(1) > .table-condensed > tfoot > :nth-child(1) > .today',
    campoObservacao: '#observacao',
    btnProximo: '#btn-salvar-proximo-atendimento',
    // Campos do modal de novo atendimento
    campoServicoProduto: '#auto_produto_empresa_grade_id', // Servico/Produto
    btnAbrirservicoProduto: '#auto_icon_produto_empresa_grade_id',
    listaResultadoProduto: '#div_auto_produto_empresa_grade_id > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a > .clear',
    campoQuantidade: '#quantidade', // Quantidade
    botaoAdicionarItem: '#button-add .btn-adicionar-item-os', // Botão de adicionar item
    btnImprimir: '#btn-imprimir-atendimento',

    btnSalvarAtendimento: '#btn-salvar-atendimento',
    abaOrdemServico: '#tab-ordem-servico',
    btnGerarVenda: '#btn-gerar-venda',
    popupConfirmacao: '.sweet-alert.modal-confirm-destroy',
    botaoSimPopupConfirmacao: '.sweet-alert.modal-confirm-destroy .confirm',
    botaoNaoPopupConfirmacao: '.sweet-alert.modal-confirm-destroy .cancel',
    checkboxGerarAtendimentoServico: '#check_gerar_atendimento_servico',
    btnFecharModalAtendimento: '.modal-body > #btn-modal-plus-close',

};

export default PainelAtendimentoLocators;
