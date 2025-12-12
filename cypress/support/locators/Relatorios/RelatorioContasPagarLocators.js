// RelatorioContasPagarLocators.js
const RelatorioContasPagarLocators = {
    titulo: 'h5:contains("Contas a Pagar")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    fornecedorAutocomplete: '#auto_fornecedor_id',
    ufSelect: '#cidade_uf',
    cidadeAutocomplete: '#auto_cidade_id',
    bairroAutocomplete: '#auto_bairro_id',
    statusSelect: '#tipo',
    tipoDataSelect: '#tipo_data',
    periodoInput: '#data',
    formasPagamentoSelect: 'ul.select2-selection__rendered',
    documentoInput: '#documento',
    categoriaAutocomplete: '#auto_categoria',
    exibirDespesasCaixaCheckbox: 'input[type="checkbox"]',
    botaoPesquisar: '#btn-pesquisar',
    botaoPersonalizar: 'button:contains("Personalizar")',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioContasPagarLocators;

