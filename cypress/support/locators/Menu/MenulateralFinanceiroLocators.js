// MenulateralFinanceiroLocators.js
const MenulateralFinanceiroLocators = {
    listagemContas: '#contas',
    transferenciaContas: '#transferência_entre_contas',
    lancamentoConta: '#lançamento_conta',
    contasPagar: '#contas_a_pagar',
    contasReceber: '#contas_a_receber',
    receita: '#receita',
    exportarRemessa: '#exportar_remessa',
    receberRetorno: '#receber_retorno',
    categorias: '#categorias',
    fluxo: '#fluxo',
    dre: '#dre',
    extrato: '#extrato',
    painelPix: '#painel_pix',
    estornoPix: '#estorno_pix',
    btnNovoCadastro: 'button.btn-warning.btn-sm', // Botão de novo cadastro em "Contas a Pagar"
    novaCategoriaReceita: 'button.btn-warning:contains("Nova Categoria de Receita")',
    novaCategoriaDespesa: 'button.btn-warning:contains("Nova Categoria de Despesa")',
    voltarCategoria: 'button.btn-default:contains("Voltar")',
    novaConta: 'a[href*="/integracao-bancaria/conta/novo"]',
    novaContaCorrente: 'a[href*="/integracao-bancaria/conta/novo/conta-corrente"]',
};

export default MenulateralFinanceiroLocators;
