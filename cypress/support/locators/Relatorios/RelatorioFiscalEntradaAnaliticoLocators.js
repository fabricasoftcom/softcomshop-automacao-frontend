// RelatorioFiscalEntradaAnaliticoLocators.js
/** Rota v2 no stage (após pesquisa a URL permanece em /relatorio-v2/fiscal-entrada-analitico). */
export const RELATORIO_FISCAL_ENTRADA_ANALITICO_ROTA = '/relatorio-v2/fiscal-entrada-analitico';

const RelatorioFiscalEntradaAnaliticoLocators = {
    titulo: 'h1.relatorio-title, h5:contains("Relatório Fiscal Entrada Analítico")',
    filtrosContainer: '#filter-drawer-body form#form-relatorio-nota-fiscal',
    empresaSelect: '#filter-drawer-body #empresa_id',
    periodoInput: '#filter-drawer-body #data',
    serieInput: '#filter-drawer-body input[type="number"]',
    botaoPesquisar: '#filter-drawer-body #pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioFiscalEntradaAnaliticoLocators;

