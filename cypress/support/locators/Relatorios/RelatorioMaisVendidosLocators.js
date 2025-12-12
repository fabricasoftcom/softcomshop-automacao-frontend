// RelatorioMaisVendidosLocators.js
const RelatorioMaisVendidosLocators = {
    titulo: 'h5:contains("Mais Vendidos")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    periodoInput: '#data',
    dispositivoAutocomplete: '#auto_dispositivo',
    turnoSelect: '#turno',
    origemVendaAutocomplete: '#auto_origem_venda',
    produtoAutocomplete: '#auto_produto_id',
    abasContainer: 'tablist',
    abaClientes: 'tab[aria-label*="Clientes"]',
    abaVendedor: 'tab[aria-label*="Vendedor"]',
    abaIndicador: 'tab[aria-label*="Indicador"]',
    abaTipoCliente: 'tab[aria-label*="Tipo De Cliente"]',
    abaUf: 'tab[aria-label*="Uf"]',
    abaCidade: 'tab[aria-label*="Cidade"]',
    abaBairro: 'tab[aria-label*="Bairro"]',
    abaArea: 'tab[aria-label*="Área"]',
    abaHorarios: 'tab[aria-label*="Horários"]',
    abaProdutos: 'tab[aria-label*="Produtos"]',
    abaCombo: 'tab[aria-label*="Combo"]',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    botaoPersonalizar: 'button:contains("Personalizar")',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioMaisVendidosLocators;

