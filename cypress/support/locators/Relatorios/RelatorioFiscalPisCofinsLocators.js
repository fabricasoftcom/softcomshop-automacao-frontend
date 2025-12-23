// RelatorioFiscalPisCofinsLocators.js
const RelatorioFiscalPisCofinsLocators = {
    titulo: 'h5:contains("Relatório Fiscal Pis/Cofins")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    periodoInput: '#data',
    tipoDocumentoSelect: '#tipo',
    statusSelect: '#status',
    botaoPesquisar: '#pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    totalizadorSubtotal: 'tr:contains("Subtotal")',
    totalizadorTotal: 'tr:contains("Total")',
};

export default RelatorioFiscalPisCofinsLocators;

