// RelatorioCaixaLocators.js
const RelatorioCaixaLocators = {
    titulo: 'h5:contains("Relat\u00f3rio de Caixa")',
    filtrosContainer: '.form-pesquisa',
    botaoToggleFiltros: '#btn-pesquisa',
    tipoSelect: '#tipo',
    empresaSelect: '#empresa_id',
    vendedorAutocomplete: '#auto_vendedor_id',
    dispositivoAutocomplete: '#auto_dispositivo',
    usuarioCaixaAutocomplete: '#auto_usuario_caixa',
    turnoInput: '#turno',
    periodoInput: '#data',
    botaoCalendarioPeriodo: '.btn-daterangepicker[data-label="data"]',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoImprimir80mm: '#btn-imprimir-bolete',
    tabelaResultados: '.table-caixa',
    linhasTabelaResultados: '.table-caixa tbody tr',
    tabelaMovimentacao: '.table-movimentacao-caixa',
    linhasTabelaMovimentacao: '.table-movimentacao-caixa tbody tr',
    totalizadoresContainer: '.totalizadores',
    blocoCabecalhoPedido: '.table-header',
};

export default RelatorioCaixaLocators;
