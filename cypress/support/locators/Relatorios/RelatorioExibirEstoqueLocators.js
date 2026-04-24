// RelatorioExibirEstoqueLocators.js
// Atualizado após reformulação de layout (2026-01-28)
/** Rota v2 no módulo produto (URL retornada pelo drawer/catálogo em stage) */
export const RELATORIO_EXIBIR_ESTOQUE_ROTA_V2 = '/produto/relatorio/exibir-estoque-v2';

const RelatorioExibirEstoqueLocators = {
    titulo: 'h1.relatorio-title, h5:contains("Exibir Estoque")', // Atualizado: pode ser h1 ou h5
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',
    // Relatório v2: filtros no drawer (mesmo padrão de forma-pagamento / caixa)
    filtrosContainer:
        '#filter-drawer-body form#form-relatorio-exibir-estoque, #filter-drawer-body form#form-relatorio-v2-exibir-estoque',
    /** Escopo ao drawer: evita outro #btn-pesquisar na página (display:none) */
    empresaSelect: '#filter-drawer-body #empresa_id',
    produtoAutocomplete: '#filter-drawer-body #auto_produto_empresa_grade_id',
    fabricanteAutocomplete: '#filter-drawer-body #auto_fabricante_id',
    grupoAutocomplete: '#filter-drawer-body #auto_grupo_id',
    fornecedorAutocomplete: '#filter-drawer-body #auto_fornecedor_id',
    condicaoSelect: '#filter-drawer-body #condicao',
    botaoPesquisar: '#filter-drawer-body #btn-pesquisar',
    botaoGerarPdf: '#gerar-pdf',
    botaoGerarExcel: '#gerar-excel',
    tabelaResultados: 'table',
    linhasTabelaResultados: 'table tbody tr',
    // Locators para validações após pesquisa
    cabecalhoTabela: 'table thead tr th',
    mensagemSemDados: 'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
    containerResultados: '.ibox-content, .relatorio-content, .resultados',
};

export default RelatorioExibirEstoqueLocators;

