// RelatorioFiscalPisCofinsLocators.js
const RelatorioFiscalPisCofinsLocators = {
    titulo: 'h1.relatorio-title, h5:contains("Relatório Fiscal Pis/Cofins"), h5:contains("Pis/Cofins")',
    filtrosContainer: 'form:has(#pesquisar)',
    empresaSelect: 'form:has(#pesquisar) #empresa_id',
    periodoInput: 'form:has(#pesquisar) #data',
    tipoDocumentoSelect: 'form:has(#pesquisar) #tipo',
    statusSelect: 'form:has(#pesquisar) #status',
    botaoPesquisar: 'form:has(#pesquisar) #pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    totalizadorSubtotal: 'tr:contains("Subtotal")',
    totalizadorTotal: 'tr:contains("Total")',
};

export default RelatorioFiscalPisCofinsLocators;
