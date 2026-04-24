// RelatorioFiscalSaidaAnaliticoLocators.js
/** Rota v2 no stage: visit direto (mesmo padrão do fiscal entrada analítico). */
export const RELATORIO_FISCAL_SAIDA_ANALITICO_ROTA = '/relatorio-v2/fiscal-saida-analitico';

const drawerForm = '#filter-drawer-body form#form-relatorio-nota-fiscal';

const RelatorioFiscalSaidaAnaliticoLocators = {
    titulo:
        'h1.relatorio-title, h3:contains("Fiscal Saída Analítico"), h5:contains("Relatório Fiscal Saída Analítico")',
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

export default RelatorioFiscalSaidaAnaliticoLocators;
