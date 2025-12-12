// RelatorioGerenteVendasLocators.js
const RelatorioGerenteVendasLocators = {
    titulo: 'h5:contains("Gerente de Vendas")',
    filtrosContainer: 'form',
    periodoInput: '#data',
    classificacaoSelect: '#classificacao',
    tipoClienteAutocomplete: '#auto_tipo_cliente_id',
    clienteAutocomplete: '#auto_cliente_id',
    bairroAutocomplete: '#auto_bairro_id',
    ufSelect: '#cidade_uf',
    cidadeAutocomplete: '#auto_cidade_id',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    botaoVendaMais: 'a:contains("Venda Mais")',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    totalizadorQuantidadeClientes: 'h5:contains("Quantidade de Clientes")',
    totalizadorQuantidadeVendas: 'h5:contains("Quantidade de Vendas Total")',
    totalizadorValorTotal: 'h5:contains("Valor Total (R$)")',
};

export default RelatorioGerenteVendasLocators;

