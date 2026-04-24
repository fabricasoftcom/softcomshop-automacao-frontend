// RelatorioFiscalSaidaSinteticoLocators.js
/** Rota v2 no stage (mesmo padrão do Fiscal Entrada Sintético / Saída Analítico). */
export const RELATORIO_FISCAL_SAIDA_SINTETICO_ROTA = '/relatorio-v2/relatorio-fiscal-sintetico';

const drawerForm = '#filter-drawer-body form#form-relatorio-nota-fiscal';

const RelatorioFiscalSaidaSinteticoLocators = {
    titulo:
        'h1.relatorio-title, h5:contains("Relatório Fiscal Sintético"), h5:contains("Relatório Fiscal Saída Sintético")',
    filtrosContainer: drawerForm,
    empresaSelect: '#filter-drawer-body #empresa_id',
    periodoInput: '#filter-drawer-body #data',
    tipoDocumentoSelect: `${drawerForm} #tipo`,
    statusSelect: `${drawerForm} #status`,
    serieInput: '#filter-drawer-body input[type="number"]',
    botaoPesquisar: '#filter-drawer-body #pesquisar, #filter-drawer-body #btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioFiscalSaidaSinteticoLocators;
