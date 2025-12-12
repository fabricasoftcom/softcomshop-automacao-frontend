// RelatorioFiscalSaidaAnaliticoLocators.js
const RelatorioFiscalSaidaAnaliticoLocators = {
    titulo: 'h5:contains("Relatório Fiscal Analítico")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    periodoInput: '#data',
    tipoDocumentoSelect: '#tipo',
    statusSelect: '#status',
    serieInput: 'input[type="number"]',
    botaoPesquisar: '#btn-pesquisar, button:contains("Pesquisar"), button[type="submit"]',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioFiscalSaidaAnaliticoLocators;

