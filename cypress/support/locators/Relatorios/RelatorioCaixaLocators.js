// RelatorioCaixaLocators.js
// Atualizado após reformulação de layout (2026-01-27)
const RelatorioCaixaLocators = {
    titulo: 'h1.relatorio-title', // Atualizado: mudou de h5 para h1.relatorio-title
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',
    filtrosContainer: 'form#form-relatorio-vendas-caixa', // Atualizado: ID específico do formulário no drawer
    botaoToggleFiltros: '#btn-pesquisa', // Mantido para compatibilidade, mas pode não ser mais usado
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
    // Locators para validações após pesquisa
    cabecalhoTabela: '.table-caixa thead tr th',
    mensagemSemDados: 'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
};

export default RelatorioCaixaLocators;
