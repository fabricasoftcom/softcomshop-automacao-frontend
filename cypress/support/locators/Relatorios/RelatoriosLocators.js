// RelatoriosLocators.js
// Atualizado após reformulação de layout (2026-01-27)
// Estrutura mudou de links <a> para cards .catalogo-relatorio-item
const RelatoriosLocators = {
    // Página de relatórios gerais
    paginaRelatoriosGerais: '/softcomtecnologia/relatorios-gerais',
    campoBusca: 'input[placeholder*="Buscar relatório"]',
    containerCatalogo: '.catalogo-relatorios',

    // Locator genérico para cards de relatórios
    cardRelatorio: '.catalogo-relatorio-item',
    nomeRelatorio: '.catalogo-relatorio-name',

    // Vendas
    vendasPeriodo: '.catalogo-relatorio-item[data-href*="/relatorio/periodo"]',
    vendasMaisVendidos: '.catalogo-relatorio-item[data-href*="/relatorio/mais-vendidos"]',
    vendasFormaPagamento: '.catalogo-relatorio-item[data-href*="relatorio-v2/forma-pagamento"]', // URL mudou
    vendasGerenteVendas: '.catalogo-relatorio-item[data-href*="/relatorio/gerente-vendas"]',
    vendasEvolucao: '.catalogo-relatorio-item[data-href*="/relatorio/evolucao"]',
    vendasComissao: '.catalogo-relatorio-item[data-href*="/relatorio/comissao"]',

    // Notas fiscais
    notasFiscaisSaidaAnalitico: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-fiscal"]',
    notasFiscaisSaidaSintetico: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-fiscal-sintetico"]',
    notasFiscaisEntradaSintetico: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-fiscal-entrada-sintetico"]',
    notasFiscaisEntradaAnalitico: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-fiscal-entrada"]',
    notasFiscaisPisCofins: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-fiscal-pis-cofins"]',
    notasFiscaisNFSe: '.catalogo-relatorio-item[data-href*="/relatorio/relatorio-nfse"]',

    // Financeiro
    financeiroCaixa: '.catalogo-relatorio-item[data-href*="relatorio-v2/vendas-caixa"]', // URL mudou
    financeiroContasReceber: '.catalogo-relatorio-item[data-href*="/relatorio/contas-a-receber"]',
    financeiroContasPagar: '.catalogo-relatorio-item[data-href*="/relatorio/contas-a-pagar"]',
    financeiroProjecaoCartoes: '.catalogo-relatorio-item[data-href*="/relatorio/projecao-de-cartoes"]',

    // Produtos
    produtosExibirEstoque: '.catalogo-relatorio-item[data-href*="/relatorio/exibir-estoque"]',
    produtosTabelaPreco: '.catalogo-relatorio-item[data-href*="/relatorio/tabela-preco"]',
    produtosFichaEstoque: '.catalogo-relatorio-item[data-href*="/relatorio/ficha-estoque"]',
    produtosInventario: '.catalogo-relatorio-item[data-href*="/relatorio/inventario"]',
    produtosNCM: '.catalogo-relatorio-item[data-href*="/relatorio/ncm"]',
    produtosMovimentacaoEstoque: '.catalogo-relatorio-item[data-href*="/relatorios/movimentacao-estoque"]',

    // Clientes
    clientesAniversariantes: '.catalogo-relatorio-item[data-href*="/relatorio/aniversariante"]',
    clientesDadosClientes: '.catalogo-relatorio-item[data-href*="/relatorio/dados-clientes"]',
    clientesUltimasCompras: '.catalogo-relatorio-item[data-href*="cliente/relatorio/ultimas-compras"]',
};

export default RelatoriosLocators;
