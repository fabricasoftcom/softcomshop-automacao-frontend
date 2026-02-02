// RelatoriosDrawerLocators.js
// Locators compartilhados para o drawer de filtros usado em múltiplos relatórios
// Criado: 2026-01-28
// Referência: docs/temp-descobertas-drawer-relatorios.md

const RelatoriosDrawerLocators = {
    // Botão para abrir o drawer de filtros
    // Localizado na barra superior do relatório
    btnFiltros: 'button.relatorio-btn:contains("Filtros")',

    // Container principal do drawer
    // ID único e estável usado para verificar visibilidade
    drawerBody: '#filter-drawer-body',

    // Padrão para formulários dentro do drawer
    // Cada relatório tem seu próprio formulário com ID específico
    // Exemplos:
    // - form#form-relatorio-vendas-periodo
    // - form#form-relatorio-vendas-caixa
    // - form#form-relatorio-vendas-forma-pagamento
    // Padrão: form#form-relatorio-[nome] ou form#form-relatorio-vendas-[nome]

    // Botões de ação dentro do drawer (variam por relatório)
    // Alguns relatórios usam "Pesquisar", outros "Aplicar Filtros"
    btnPesquisar: '#btn-pesquisar', // Usado em Período, Forma Pagamento
    btnAplicarFiltros: 'button:contains("Aplicar Filtros")', // Usado em Caixa

    // Nota: Botão de fechar não identificado (pode não existir ou estar oculto)
    // Drawer fecha automaticamente após aplicar filtros em alguns relatórios
};

export default RelatoriosDrawerLocators;
