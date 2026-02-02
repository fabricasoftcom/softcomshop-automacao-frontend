// RelatorioFormaPagamentoLocators.js
// Atualizado após reformulação de layout (2026-01-27)
const RelatorioFormaPagamentoLocators = {
    titulo: 'h1.relatorio-title', // Atualizado: mudou de h5 para h1.relatorio-title
    filtrosContainer: 'form#form-relatorio-vendas-forma-pagamento', // Atualizado: ID específico do formulário no drawer
    empresaSelect: '#empresa_id',
    vendedorAutocomplete: '#auto_funcionario_id',
    clienteAutocomplete: '#auto_cliente_id',
    statusSelect: '#status',
    nfeNfceFaturadaSelect: '#nfe_nfce_faturada',
    periodoInput: '#data',
    usuarioCaixaAutocomplete: '#auto_usuario_caixa',
    turnoSelect: '#turno',
    botaoPesquisar: '#btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    // Locators para validações após pesquisa
    cabecalhoTabela: 'table thead tr th',
    mensagemSemDados: 'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
    containerResultados: '.ibox-content, .relatorio-content, .resultados',
};

export default RelatorioFormaPagamentoLocators;

