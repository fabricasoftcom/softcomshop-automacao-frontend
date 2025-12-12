// RelatorioComissaoLocators.js
const RelatorioComissaoLocators = {
    titulo: 'h5:contains("Comissão")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    tipoSelect: '#tipo',
    vendedorAutocomplete: '#auto_vendedor_id',
    periodoInput: '#data',
    abasContainer: 'tablist',
    abaVendedor: 'tab[aria-label*="Vendedor"]',
    abaIndicador: 'tab[aria-label*="Indicador"]',
    abaEntregador: 'tab[aria-label*="Entregador"]',
    abaAtendente: 'tab[aria-label*="Atendente"]',
    abaProduto: 'tab[aria-label*="Produto"]',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    linhaTotal: 'table tbody tr:contains("Total")',
};

export default RelatorioComissaoLocators;

