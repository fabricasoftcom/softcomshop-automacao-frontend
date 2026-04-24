// RelatorioCaixaLocators.js
// Atualizado após reformulação de layout (2026-01-27)
const RelatorioCaixaLocators = {
    titulo: 'h1.relatorio-title', // Atualizado: mudou de h5 para h1.relatorio-title
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',
    filtrosContainer: 'form#form-relatorio-vendas-caixa', // Atualizado: ID específico do formulário no drawer
    botaoToggleFiltros: '#btn-pesquisa', // Mantido para compatibilidade, mas pode não ser mais usado
    // Tipo de relatório (na UI atual é um grupo de botões, não um select)
    // Escopado ao form do drawer para evitar colisões em outros relatórios
    tipoBotaoSintetico: 'form#form-relatorio-vendas-caixa button:contains("Sintético")',
    tipoBotaoAnalitico: 'form#form-relatorio-vendas-caixa button:contains("Analítico")',
    tipoBotaoConsolidado: 'form#form-relatorio-vendas-caixa button:contains("Consolidado")',
    empresaSelect: '#empresa_id',
    vendedorAutocomplete: '#auto_vendedor_id',
    dispositivoAutocomplete: '#auto_dispositivo',
    usuarioCaixaAutocomplete: '#auto_usuario_caixa',
    // Typeahead (primeira opção) - com contexto por campo
    vendedorPrimeiraOpcao: '#div_auto_vendedor_id .typeahead-list li a, #div_auto_vendedor_id .typeahead-result li a',
    dispositivoPrimeiraOpcao: '#div_auto_dispositivo .typeahead-list li a, #div_auto_dispositivo .typeahead-result li a',
    usuarioCaixaPrimeiraOpcao: '#div_auto_usuario_caixa .typeahead-list li a, #div_auto_usuario_caixa .typeahead-result li a',
    turnoInput: '#turno',
    periodoInput: '#data',
    // Período rápido (Hoje / Ontem / Personalizado) — escopo ao form do Caixa
    periodoBotaoHoje: 'form#form-relatorio-vendas-caixa button:contains("Hoje")',
    periodoBotaoOntem: 'form#form-relatorio-vendas-caixa button:contains("Ontem")',
    periodoBotaoPersonalizado: 'form#form-relatorio-vendas-caixa button:contains("Personalizado")',
    botaoCalendarioPeriodo: '.btn-daterangepicker[data-label="data"]',
    // Ações do drawer
    botaoPesquisarRelatoriosGerais: '#relatorio-filters-drawer .relatorio-filters-drawer-actions button:contains("Pesquisar")',
    /** Evita múltiplos matches (há mais de um "Aplicar Filtros" na árvore em alguns relatórios). */
    botaoAplicarFiltrosNoFormCaixa: '#filter-drawer > .relatorio-filters-drawer > .relatorio-filters-drawer-content > .relatorio-filters-drawer-actions button:contains("Aplicar Filtros")',
    botaoAplicarFiltros: 'button:contains("Aplicar Filtros")',
    botaoLimparDrawer: 'button:contains("Limpar")',
    botaoGerarPdf: 'a:contains("Gerar PDF"), button:contains("Gerar PDF")',
    botaoImprimir80mm: 'a:contains("Imprimir 80mm"), button:contains("Imprimir 80mm")',
    tabelaResultados: '.table-caixa',
    linhasTabelaResultados: '.table-caixa tbody tr',
    tabelaMovimentacao: '.table-movimentacao-caixa',
    linhasTabelaMovimentacao: '.table-movimentacao-caixa tbody tr',
    totalizadoresContainer: '.totalizadores',
    blocoCabecalhoPedido: '.table-header',
    acordeonSecao: '.collapse-section',
    acordeonTitulo: 'h3.collapse-section-title',
    // Locators para validações após pesquisa
    cabecalhoTabela: '.table-caixa thead tr th',
    mensagemSemDados: 'td:contains("Nenhum"), td:contains("sem resultado"), .alert, .no-results',
};

export default RelatorioCaixaLocators;
