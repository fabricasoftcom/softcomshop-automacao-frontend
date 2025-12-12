// PrecosListagemLocators.js
const PrecosListagemLocators = {
    // **Botões Principais**
    btnPesquisa: '#btn-pesquisa', // Botão para abrir formulário de pesquisa
    btnNovoCadastro: '#btn-novo', // Botão para iniciar um novo cadastro
    btnExcluirSelecionados: '#btn-excluir-selecionados', // Botão para excluir preços selecionados

    // **Tabela de Preços**
    tabelaPrecos: 'table.table-hover.table-gestor-preco', // Tabela principal que lista os preços
    checkboxTodos: '.check_all', // Checkbox para selecionar todos os itens da tabela
    linhasTabela: 'table.table-hover.table-gestor-preco tbody tr', // Linhas individuais da tabela
    botaoEditar: '.button-tab.button-edit', // Botão de editar na linha correspondente da tabela

    // **Colunas da Tabela**
    colunaCodigo: 'th:contains("Código")', // Cabeçalho da coluna Código
    colunaDataLancamento: 'th:contains("Data do Lançamento")', // Cabeçalho da coluna Data do Lançamento
    colunaTipo: 'th:contains("Tipo")', // Cabeçalho da coluna Tipo
    colunaOperacao: 'th:contains("Operação")', // Cabeçalho da coluna Operação
    colunaTabelaPreco: 'th:contains("Tabela de Preço")', // Cabeçalho da coluna Tabela de Preço

    // **Ordenação** (se aplicável - verificar se existe na aplicação)
    linkOrdenarCodigoCrescente: 'a[href*="order=id"]:not([href*="order=-id"])', // Link para ordenar código crescente
    linkOrdenarCodigoDecrescente: 'a[href*="order=-id"]', // Link para ordenar código decrescente
    linkOrdenarDataCrescente: 'a[href*="order=data"]:not([href*="order=-data"])', // Link para ordenar data crescente
    linkOrdenarDataDecrescente: 'a[href*="order=-data"]', // Link para ordenar data decrescente

    // **Título**
    tituloListagem: 'h5:contains("Listagem")', // Título da página de listagem
};

export default PrecosListagemLocators;

