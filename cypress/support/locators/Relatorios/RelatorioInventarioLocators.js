// RelatorioInventarioLocators.js
const RelatorioInventarioLocators = {
    titulo: 'h5:contains("Inventário")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    periodoAteInput: '#periodo_ate',
    exibirCodigoCheckbox: 'input[type="checkbox"]',
    usoConsumoCheckbox: 'input[type="checkbox"]',
    valorInventarioInput: '#valor_inventario',
    botaoGerarInventario: 'button:contains("Gerar Inventário")',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioInventarioLocators;

