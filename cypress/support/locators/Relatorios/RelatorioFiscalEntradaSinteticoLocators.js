// RelatorioFiscalEntradaSinteticoLocators.js
/** Rota v2 no stage (mesmo padrão do Fiscal Entrada Analítico). */
export const RELATORIO_FISCAL_ENTRADA_SINTETICO_ROTA = '/relatorio-v2/fiscal-entrada-sintetico';

const RelatorioFiscalEntradaSinteticoLocators = {
    titulo: 'h1.relatorio-title, h5:contains("Relatório Fiscal Entrada Sintético")',
    filtrosContainer: '#filter-drawer-body form#form-relatorio-nota-fiscal',
    empresaSelect: '#filter-drawer-body #empresa_id',
    periodoInput: '#filter-drawer-body #data',
    serieInput: '#filter-drawer-body input[type="number"]',
    botaoPesquisar: '#filter-drawer-body #pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioFiscalEntradaSinteticoLocators;
