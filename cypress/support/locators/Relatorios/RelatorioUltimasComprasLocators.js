// RelatorioUltimasComprasLocators.js
const RelatorioUltimasComprasLocators = {
    titulo: 'h5:contains("Relatório de Últimas Compras")',
    botaoGerarPdf: '#gerar-pdf',
    containerVendas: '.container',
    bannersVenda: '[class*="banner"], .banner, div:has(strong:contains("Venda Nº"))',
    tabelaItens: 'table',
    linhasTabelaItens: 'table tbody tr',
    totalizadorValorCompra: 'h5:contains("Valor Compra")',
    paginacao: 'nav ul.pagination',
    linkPaginaAnterior: 'a:contains("Anterior")',
    linkPaginaProxima: 'a:contains("Próxima")',
    linksPaginas: 'nav ul.pagination li a',
};

export default RelatorioUltimasComprasLocators;

