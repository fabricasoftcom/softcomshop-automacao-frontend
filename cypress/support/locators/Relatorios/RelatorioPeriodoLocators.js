// RelatorioPeriodoLocators.js
// Atualizado após reformulação de layout (2026-01-27)
// Atualizado com date picker (2026-01-28)
const RelatorioPeriodoLocators = {
    titulo: 'h1.relatorio-title', // Atualizado: agora é h1 com classe relatorio-title
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',
    filtrosContainer: 'form#form-relatorio-vendas-periodo', // Atualizado: ID específico do formulário

    // Filtros
    empresaSelect: '#empresa_id',
    dispositivoAutocomplete: '#auto_api_device_id',
    vendedorAutocomplete: '#auto_funcionario_id',
    indicadorAutocomplete: '#auto_indicador_id',
    clienteAutocomplete: '#auto_cliente_id',
    tipoSelect: '#tipo',
    situacaoSelect: '#situacao',
    origemVendaAutocomplete: '#auto_origem_venda',
    usuarioCaixaAutocomplete: '#auto_usuario_caixa',
    turnoSelect: '#turno',
    tagsClassificacao: 'ul.select2-selection__rendered',

    // Campo de período (data)
    periodoInput: '#data', // Campo de input (pode ser usado com type() ou date picker)

    // Date Range Picker (Bootstrap DateRangePicker)
    // Botão que abre o date picker
    botaoCalendarioPeriodo: '.btn-daterangepicker[data-label="data"]',
    // Container do date picker quando aberto
    datePickerContainer: '.daterangepicker',
    // Botões de ação do date picker
    datePickerAplicar: 'button:contains("Aplicar"), .daterangepicker .applyBtn',
    datePickerLimpar: 'button:contains("Limpar")', // Se existir
    datePickerCancelar: 'button:contains("Cancelar")', // Se existir

    // Botões de ação
    botaoPesquisar: '#btn-pesquisar',
    // Atualizado após reformulação: botões de exportação mudaram de estrutura
    botaoGerarPdf: 'a.relatorio-btn-danger:contains("PDF"), a:contains("PDF")',
    botaoGerarExcel: 'a.relatorio-btn-success:contains("Excel"), a:contains("Excel")',
    botaoPersonalizar: 'button:contains("Personalizar")',

    // Resultados
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    // Cabeçalho da tabela (para validar colunas)
    cabecalhoTabela: 'table thead tr th',
    // Mensagens (sem dados, etc.)
    mensagemSemDados: 'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
    // Container de resultados (se existir)
    containerResultados: '.ibox-content, .relatorio-content, .resultados',
};

export default RelatorioPeriodoLocators;

