// RelatorioExibirEstoqueLocators.js
// Atualizado após reformulação de layout (2026-01-28)
const RelatorioExibirEstoqueLocators = {
    titulo: 'h1.relatorio-title, h5:contains("Exibir Estoque")', // Atualizado: pode ser h1 ou h5
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',
    filtrosContainer: 'form#form-relatorio-exibir-estoque, form', // Atualizado: ID específico se tiver drawer, ou form genérico
    empresaSelect: '#empresa_id',
    produtoAutocomplete: '#auto_produto_empresa_grade_id',
    fabricanteAutocomplete: '#auto_fabricante_id',
    grupoAutocomplete: '#auto_grupo_id',
    fornecedorAutocomplete: '#auto_fornecedor_id',
    condicaoSelect: '#condicao',
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

export default RelatorioExibirEstoqueLocators;

