// TaEmOrdemLocators.js
const TaEmOrdemLocators = {
    // Container principal
    contentLayout: '#content-layout',

    // Título da página
    titulo: 'h5',

    // Campo de data/mês
    campoDataMes: '#ta-em-ordem-period',

    // Comboboxes (filtros)
    comboboxVendasHoje: '#vendas-hoje',
    comboboxTicketMedio: '#ticket-medio',
    comboboxRankingProdutos: '#ranking-produtos',

    // Cards de informações (totalizadores)
    containerTotalizadores: '.ta-em-ordem-panel',
    totalizadorBox: '.totalizer-box',

    // Tabela de ranking
    tabelaRanking: 'table.products-ranking-table',
    tabelaThead: 'table.products-ranking-table thead',
    tabelaTbody: 'table.products-ranking-table tbody',
    linhasTabela: 'table.products-ranking-table tbody tr',

    // Links de ação rápida
    linkNovaVenda: 'a[href*="/vendas/novo"]',
    linkNovaCompra: 'a[href*="/compra/novo"]',
    linkEmitirNfe: 'a[href*="/nfe2/novo"]',
    linkCadastrarCliente: 'a[href*="/cadastro/cliente/novo"]',

    // Seções de gráficos (identificação por texto/contexto)
    secaoVendasHorario: '*:contains("Vendas por horário")',
    secaoVendasDiaSemana: '*:contains("Vendas por dia da semana")',
    secaoFormaPagamento: '*:contains("Forma de pagamento")',
    secaoEvolucaoReceita: '*:contains("Evolução Receita")',
    secaoVendasDiaMes: '*:contains("VENDAS POR DIA DO MÊS")',
    secaoOrigemVenda: '*:contains("Origem da venda")',
};

export default TaEmOrdemLocators;

