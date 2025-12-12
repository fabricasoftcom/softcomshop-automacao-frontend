// PrecosCadastroLocators.js
const PrecosCadastroLocators = {
    // **Títulos e Seções**
    tituloGestorPrecos: 'h5:contains("Gestor de Preços")', // Título principal
    secaoFiltroProdutos: '*:contains("Filtro de Produtos")', // Seção Filtro de Produtos
    secaoConfiguracoes: '*:contains("Configurações")', // Seção Configurações

    // **Seção: Filtro de Produtos**
    // Campo Tipo (select)
    selectTipo: '#tipo', // Select para escolher entre "TODOS" ou "NOTAS DE ENTRADA" (id="tipo")

    // Campo Produto (autocomplete)
    campoProduto: '#auto_produto_id', // Campo de autocomplete do produto (id="auto_produto_id")
    campoProdutoHidden: '#produto_id', // Campo hidden do produto (id="produto_id")
    campoProdutoIcon: '#auto_produto_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoProdutoResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // Campo Grupo (autocomplete)
    campoGrupo: '#auto_grupo_id', // Campo de autocomplete do grupo (id="auto_grupo_id")
    campoGrupoHidden: '#grupo_id', // Campo hidden do grupo (id="grupo_id")
    campoGrupoIcon: '#auto_grupo_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoGrupoResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // Campo Fabricante (autocomplete)
    campoFabricante: '#auto_fabricante_id', // Campo de autocomplete do fabricante (id="auto_fabricante_id")
    campoFabricanteHidden: '#fabricante_id', // Campo hidden do fabricante (id="fabricante_id")
    campoFabricanteIcon: '#auto_fabricante_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoFabricanteResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // Campo Fornecedor (autocomplete)
    campoFornecedor: '#auto_fornecedor_id', // Campo de autocomplete do fornecedor (id="auto_fornecedor_id")
    campoFornecedorHidden: '#fornecedor_id', // Campo hidden do fornecedor (id="fornecedor_id")
    campoFornecedorIcon: '#auto_fornecedor_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoFornecedorResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // **Seção: Configurações**
    // Campo Tabela de Preço (autocomplete)
    campoTabelaPreco: '#auto_tabela_preco_id', // Campo de autocomplete da tabela de preço (id="auto_tabela_preco_id")
    campoTabelaPrecoHidden: '#tabela_preco_id', // Campo hidden da tabela de preço (id="tabela_preco_id")
    campoTabelaPrecoIcon: '#auto_tabela_preco_id ~ div span button, .fa-search', // Ícone de busca do autocomplete
    campoTabelaPrecoResultado: '.typeahead-list li a, .typeahead-result li a, ul.typeahead li a', // Resultados do autocomplete

    // Campo Operação (select)
    selectOperacao: '#operacao', // Select para escolher entre "AJUSTAR PREÇO" ou "FORMAR PREÇO" (id="operacao")

    // Campo Reajuste (%)
    campoReajuste: '#reajuste', // Campo de reajuste percentual (id="reajuste")

    // **Botões**
    btnLancarReajuste: '#aplicar-reajuste', // Botão para lançar o reajuste (id="aplicar-reajuste")
    btnVoltar: '#btn-voltar', // Botão para voltar à listagem
    btnNovoCadastro: '#btn-novo', // Link para novo cadastro

    // **Toast e Mensagens**
    toastSucesso: '.alert-success, .toast-success', // Toast de sucesso
    mensagemSucesso: 'Você adicionou um(a) GestorPreco!', // Texto da mensagem de sucesso (verificar texto exato)

    // **Tabela de Itens Afetados (aparece após salvar)**
    tabelaReajusteItem: 'table.table-hover.table-reajuste-item', // Tabela de itens afetados pelo reajuste
    linhasTabelaReajuste: 'table.table-reajuste-item tbody tr', // Linhas da tabela de itens afetados

    // **Tabelas Adicionais (tela de edição)**
    tabelaImpostoCompra: 'table.table-imposto-compra', // Tabela de impostos de compra
    tabelaImpostoVenda: 'table.table-imposto-venda', // Tabela de impostos de venda
};

export default PrecosCadastroLocators;

