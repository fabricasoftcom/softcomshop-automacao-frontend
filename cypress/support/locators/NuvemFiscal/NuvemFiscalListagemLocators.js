// NuvemFiscalListagemLocators.js
const NuvemFiscalListagemLocators = {
    // Filtros
    campoTipoManifestacao: '#tipo_manifestacao',
    campoStatusImportacao: '#status_importacao, #importada, select[id*="import"], select[id*="status"]',
    botaoPesquisar: '#pesquisar',

    // Tabela
    tabelaListagem: '.ibox-content table',
    linhasTabela: '.ibox-content table tbody tr',
    botaoImportarPrimeiraLinha: '.ibox-content table tbody tr:first-child a[title*="Importar"], .ibox-content table tbody tr:first-child a[title*="importar"]',

    // Link de importação dentro de uma linha
    linkImportarLinha: 'a[href*="import-to-purchase"], a[href*="import"], a[title*="Importar"], a[title*="importar"]',

    // Coluna de status de importação (9ª coluna)
    colunaStatusImportada: 'td .btn.btn-xs.btn-danger, td span.btn-danger', // Status "não importada" (pode ser span ou button)
    colunaStatusImportadaPrimeiraLinha: '.ibox-content table tbody tr:first-child td:nth-child(9) .btn.btn-xs.btn-danger, .ibox-content table tbody tr:first-child td:nth-child(9) span.btn-danger', // Coluna 9 (índice 8) - Status Importada
    colunaStatusImportadaLinha: 'td:nth-child(9) .btn.btn-xs.btn-danger, td:nth-child(9) span.btn-danger', // Para qualquer linha

    // Constantes
    COLUNA_STATUS_IMPORTADA: 9, // Índice da coluna de status (1-based)

    // Loading
    loading: '#loading',

    /** Tour Intro.js pode cobrir filtros na primeira visita */
    introjsOverlay: '.introjs-overlay',
    introjsAvancarOuFechar: '.introjs-skipbutton, .introjs-donebutton, .introjs-nextbutton',
};

export default NuvemFiscalListagemLocators;

