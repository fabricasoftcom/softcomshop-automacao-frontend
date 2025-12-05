// PromocoesListagemLocators.js
const PromocoesListagemLocators = {
    // **Botões Principais**
    btnPesquisa: '#btn-pesquisa', // Botão para abrir formulário de pesquisa
    btnNovoCadastro: '#btn-novo', // Botão para iniciar um novo cadastro
    btnExcluirSelecionados: '.delete_all', // Botão para excluir promoções selecionadas

    // **Tabela de Promoções**
    tabelaPromocoes: 'table.table-hover', // Tabela principal que lista as promoções
    checkboxTodos: '.check_all', // Checkbox para selecionar todos os itens da tabela
    linhasTabela: 'table.table-hover tbody tr', // Linhas individuais da tabela
    botaoEditar: '.button-tab.button-edit', // Botão de editar na linha correspondente da tabela

    // **Colunas da Tabela**
    colunaCodigo: 'th:contains("Código")', // Cabeçalho da coluna Código
    colunaDescricao: 'th:contains("Promoção Descrição")', // Cabeçalho da coluna Descrição
    colunaDataInicio: 'th:contains("Data inicio")', // Cabeçalho da coluna Data inicio
    colunaDataFim: 'th:contains("Data Fim")', // Cabeçalho da coluna Data Fim
    colunaStatus: 'th:contains("Status")', // Cabeçalho da coluna Status

    // **Ordenação**
    linkOrdenarCodigoCrescente: 'a[href*="order=id"]:not([href*="order=-id"])', // Link para ordenar código crescente
    linkOrdenarCodigoDecrescente: 'a[href*="order=-id"]', // Link para ordenar código decrescente
    linkOrdenarDescricaoCrescente: 'a[href*="order=descricao"]:not([href*="order=-descricao"])', // Link para ordenar descrição crescente
    linkOrdenarDescricaoDecrescente: 'a[href*="order=-descricao"]', // Link para ordenar descrição decrescente

    // **Título**
    tituloListagem: 'h5:contains("Listagem de Promoções")', // Título da página de listagem
};

export default PromocoesListagemLocators;

