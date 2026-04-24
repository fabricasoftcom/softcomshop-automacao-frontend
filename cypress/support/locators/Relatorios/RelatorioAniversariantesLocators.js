// RelatorioAniversariantesLocators.js
const RelatorioAniversariantesLocators = {
    container: '#relatorio-aniversariante-v2',

    tituloRelatorio: '#relatorio-aniversariante-v2 h1:contains("Relatório de Aniversariantes")',

    // Ações no header do relatório (layout v2)
    btnFiltros: '#relatorio-aniversariante-v2 button:contains("Filtros")',
    linkPdf: '#relatorio-aniversariante-v2 a:contains("PDF")',
    btnLimparTodos: '#relatorio-aniversariante-v2 button:contains("Limpar todos")',

    // Drawer de filtros (layout v2)
    drawerTitulo: 'h3:contains("Filtros")',
    mesInput: '#data',
    btnDatepickerMes: '#div_data .btn-datepicker',
    datepickerMonth: '.datepicker.datepicker-dropdown .datepicker-months .month',
    cidadeAutocomplete: '#div_auto_cidade_id #auto_cidade_id',
    cidadeHiddenId: '#div_auto_cidade_id #cidade_id',
    cidadeDropdownIcon: '#div_auto_cidade_id #auto_icon_cidade_id',
    btnLimparDrawer: 'button:contains("Limpar")',
    btnAplicarFiltros: '#aplicar-filter-drawer',

    // Listagem
    tituloListagem: '#relatorio-aniversariante-v2 h2:contains("Listagem de Aniversariantes")',
    tabelaResultados: '#relatorio-aniversariante-v2 table',
    linhasTabelaResultados: '#relatorio-aniversariante-v2 table tbody tr',
};

export default RelatorioAniversariantesLocators;

