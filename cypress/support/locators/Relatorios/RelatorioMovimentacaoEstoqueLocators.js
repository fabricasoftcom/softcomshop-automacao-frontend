// RelatorioMovimentacaoEstoqueLocators.js
const RelatorioMovimentacaoEstoqueLocators = {
    titulo: 'h5:contains("Movimentação de Estoque")',
    filtrosContainer: 'form',
    empresaSelect: '#div_empresa > #empresa',
    tipoSelect: '#tipo',
    operacaoSelect: '#operacao',
    dataInput: '#data',
    usuarioCaixaAutocomplete: '#auto_usuario_caixa',
    turnoSelect: '#turno',
    exibicaoResumido: 'input[value="resumido"]',
    exibicaoDetalhado: 'input[value="detalhado"]',
    botaoPesquisar: 'a:contains("Pesquisar")',
    botaoNovoCadastro: 'a:contains("Novo Cadastro")',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    totalizadorEntradas: 'strong:contains("Total de Entradas:")',
    totalizadorSaidas: 'strong:contains("Total de Saídas:")',
    totalizadorSaldo: 'strong:contains("Total de Saldo:")',
};

export default RelatorioMovimentacaoEstoqueLocators;

