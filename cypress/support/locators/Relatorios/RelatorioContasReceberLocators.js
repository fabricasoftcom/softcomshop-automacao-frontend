// RelatorioContasReceberLocators.js
const RelatorioContasReceberLocators = {
    titulo: 'h5:contains("Contas a Receber")',
    filtrosContainer: 'form',
    empresaSelect: '#empresa_id',
    clienteAutocomplete: '#auto_cliente_id',
    ufSelect: '#cidade_uf',
    cidadeAutocomplete: '#auto_cidade_id',
    bairroAutocomplete: '#auto_bairro_id',
    statusSelect: '#tipo',
    tipoDataSelect: '#tipo_data',
    periodoInput: '#data',
    formasPagamentoSelect: 'ul.select2-selection__rendered',
    botaoPesquisar: '#btn-pesquisar',
    botaoPersonalizar: 'button:contains("Personalizar")',
    botaoGerarPdf: '#gerar-pdf',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
};

export default RelatorioContasReceberLocators;

