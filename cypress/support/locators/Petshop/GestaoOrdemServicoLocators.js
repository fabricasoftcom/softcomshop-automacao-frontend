const GestaoOrdemServicoLocators = {
    // Título
    titulo: 'h5:contains("Gestão de Ordem de Serviços")',

    // Filtros
    tituloFiltros: 'h5:contains("Filtros")',
    filtroCliente: '#auto_cliente_id',
    filtroNumeroOS: '#os_numero',
    filtroPeriodo: '#data',
    filtroVendasGeradas: '#parcelas',
    filtroNfseGeradas: '#nfse',
    filtroNfseEmitida: '#nfse_emitida',

    // Botões - Filtros
    btnPesquisar: '#pesquisar',

    // Listagem
    tituloListagem: 'h5:contains("Listagem")',
    tabelaOS: 'table',
    mensagemSemResultados: ':contains("Nenhum resultado foi localizado")',

    // Resumo
    quantidadeTotal: ':contains("Quantidade:")',
    quantidadeSelecionados: ':contains("Quantidade Selecionados:")',
    valorTotal: ':contains("Valor Total:")',

    // Geração de Registros
    tituloGeracao: 'h5:contains("Geração, emissão e envio de registros")',
    checkboxGerarVendas: 'input[type="checkbox"]:has(+ label:contains("Gerar Vendas"))',
    checkboxGerarNfse: 'input[type="checkbox"]:has(+ label:contains("Gerar NFSe"))',
    checkboxEmitirNfse: 'input[type="checkbox"]:has(+ label:contains("Emitir NFSe"))',
    btnGerarRegistrosSelecionados: '#btn-gerar-registros-selecionados',

    // Elementos gerais
    loading: '#loading-indicator',
    form: 'form'
};

export default GestaoOrdemServicoLocators;

