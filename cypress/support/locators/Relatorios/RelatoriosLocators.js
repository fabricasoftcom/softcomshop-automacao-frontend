// RelatoriosLocators.js
// Atualizado após reformulação de layout (2026-01-27)
// Estrutura mudou de links <a> para cards .catalogo-relatorio-item
const cardHref = (hrefPart) =>
    `.catalogo-relatorio-item[data-href*="${hrefPart}"], .catalogo-relatorio-item[data-href-url*="${hrefPart}"]`;

const RelatoriosLocators = {
    // Página de relatórios gerais
    paginaRelatoriosGerais: '/softcomtecnologia/relatorios-gerais',
    campoBusca: 'input[placeholder*="Buscar relatório"]',
    containerCatalogo: '.catalogo-relatorios',
    // Alguns nichos exibem itens dentro de um container colapsado/oculto
    // Ex.: class="catalogo-nicho-items-hidden"
    containerNichoItemsHidden: '.catalogo-nicho-items-hidden',

    // Locator genérico para cards de relatórios
    cardRelatorio: '.catalogo-relatorio-item',
    // Cards dentro do container oculto (quando expandido)
    cardRelatorioNichoItemsHidden: '.catalogo-nicho-items-hidden .catalogo-relatorio-item',
    nomeRelatorio: '.catalogo-relatorio-name',

    // Vendas
    vendasPeriodo: cardHref('/relatorio/periodo'),
    vendasMaisVendidos: cardHref('/relatorio/mais-vendidos'),
    vendasFormaPagamento: cardHref('/relatorio-v2/forma-pagamento'), // URL mudou
    vendasGerenteVendas: cardHref('/relatorio/gerente-vendas'),
    vendasEvolucao: cardHref('/relatorio/evolucao'),
    vendasComissao: cardHref('/relatorio/comissao'),

    // Notas fiscais
    // Observação: após reformulação, vários relatórios fiscais passaram a expor rotas /relatorio-v2/*
    /** Spec E2E usa visit direto `/relatorio-v2/fiscal-saida-analitico` no Page Object (evita hub/modal). */
    notasFiscaisSaidaAnalitico: cardHref('/relatorio-v2/relatorio-fiscal'),
    /** Spec E2E usa visit direto `/relatorio-v2/relatorio-fiscal-sintetico` no Page Object. */
    notasFiscaisSaidaSintetico: cardHref('/relatorio-v2/relatorio-fiscal-sintetico'),
    /** Nicho "Notas Fiscais" pode estar colapsado; spec usa visit direto. */
    notasFiscaisEntradaSintetico: cardHref('/relatorio-v2/fiscal-entrada-sintetico'),
    /** Nicho "Notas Fiscais" pode estar colapsado; spec de entrada analítico usa visit direto. */
    notasFiscaisEntradaAnalitico: cardHref('/relatorio-v2/fiscal-entrada-analitico'),
    /** Nicho "Notas Fiscais" pode estar colapsado; spec usa visit direto. */
    /** data-href no catálogo costuma ser .../relatorio-fiscal-pis-cofins (visit direto pode estourar timeout). */
    notasFiscaisPisCofins: cardHref('/relatorio/relatorio-fiscal-pis-cofins'),
    notasFiscaisNFSe: cardHref('/relatorio-v2/relatorio-nfse'),

    // Financeiro
    financeiroCaixa: cardHref('/relatorio-v2/vendas-caixa'), // URL mudou
    financeiroContasReceber: cardHref('/relatorio/contas-a-receber'),
    financeiroContasPagar: cardHref('/relatorio/contas-a-pagar'),
    financeiroProjecaoCartoes: cardHref('/relatorio/projecao-de-cartoes'),

    // Produtos — Exibir Estoque v2 (rota em /produto/relatorio/)
    produtosExibirEstoque: cardHref('/produto/relatorio/exibir-estoque-v2'),
    produtosTabelaPreco: cardHref('/relatorio/tabela-preco'),
    produtosFichaEstoque: cardHref('/relatorio/ficha-estoque'),
    produtosInventario: cardHref('/relatorio/inventario'),
    produtosNCM: cardHref('/relatorio/ncm'),
    produtosMovimentacaoEstoque: cardHref('/relatorios/movimentacao-estoque'),

    // Clientes
    clientesAniversariantes: cardHref('/relatorio-v2/aniversariante'),
    clientesDadosClientes: cardHref('/relatorio/dados-clientes'),
    clientesUltimasCompras: cardHref('/cliente/relatorio/ultimas-compras'),
    // Diversos (a adicionar)
    diversosAuditoria: cardHref('/relatorio-v2/auditoria'),
    diversosRadarEmpresas: cardHref('/relatorio-v2/radar-empresas'),
    diversosEntregadores: cardHref('/relatorio-v2/entregadores'),
};

export default RelatoriosLocators;
