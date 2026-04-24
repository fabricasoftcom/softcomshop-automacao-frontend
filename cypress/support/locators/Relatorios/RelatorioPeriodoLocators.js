// RelatorioPeriodoLocators.js
// UI shell: /relatorio/periodo | Conteúdo: XHR /relatorio-v2/vendas-periodo/* (2026-04)
/** Rota estável: acesso direto evita card ausente/colapsado no hub de relatórios. */
export const RELATORIO_PERIODO_ROTA = '/relatorio/periodo';

/** Só ajax-table (quando a URL da aplicação bate exatamente neste path). */
export const RELATORIO_PERIODO_AJAX_TABLE_PATTERN = '**/relatorio-v2/vendas-periodo/ajax-table**';

/**
 * Qualquer GET do bloco v2 (ajax-filters, ajax-table, ajax-kpis, ajax-summary).
 * Usar em waits após chips — a ordem dos XHR pode não ser ajax-table primeiro.
 */
export const RELATORIO_PERIODO_V2_GET_PATTERN = '**/relatorio-v2/vendas-periodo/**';

const RelatorioPeriodoLocators = {
    titulo: 'h1.relatorio-title',

    // UI v2 — toolbar (evitar colisão com drawer global "Pesquisa Preços")
    drawerPesquisaPrecoShell: '#pesquisa-preco-drawer',
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',

    // Legado — drawer + form (ainda usado se existir no DOM)
    filtrosContainer: 'form#form-relatorio-vendas-periodo',
    drawerBody: '#filter-drawer-body',

    // Filtros (form legado / fragmento ajax-filters)
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

    periodoInput: '#data',

    botaoCalendarioPeriodo: '.btn-daterangepicker[data-label="data"]',
    datePickerContainer: '.daterangepicker',
    datePickerAplicar: 'button:contains("Aplicar"), .daterangepicker .applyBtn',
    datePickerLimpar: 'button:contains("Limpar")',
    datePickerCancelar: 'button:contains("Cancelar")',

    botaoPesquisar: '#btn-pesquisar',

    botaoGerarPdf: 'a.relatorio-btn-danger:contains("PDF"), a:contains("PDF")',
    botaoGerarExcel: 'a.relatorio-btn-success:contains("Excel"), a:contains("Excel")',
    botaoPersonalizar: 'button:contains("Personalizar")',

    /** Uso legado; preferir RelatorioPeriodoPage.tabelaListagemVendas() na UI v2. */
    tabelaResultados: 'table',
    linhasTabelaResultados: 'tbody tr',
    cabecalhoTabela: 'thead tr th',

    mensagemSemDados:
        'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
    containerResultados: '.ibox-content, .relatorio-content, .resultados',
};

export default RelatorioPeriodoLocators;
