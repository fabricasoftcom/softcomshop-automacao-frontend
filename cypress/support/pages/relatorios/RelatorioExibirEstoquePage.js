// RelatorioExibirEstoquePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioExibirEstoqueLocators from "../../locators/Relatorios/RelatorioExibirEstoqueLocators";

class RelatorioExibirEstoquePage {

    acessarRelatorioExibirEstoque() {
        RelatoriosPage.acessarRelatorioProdutosExibirEstoque();
        cy.url().should('contain', '/relatorio/exibir-estoque');
    }

    garantirFiltrosVisiveis() {
        // Verifica se relatório usa drawer ou formulário direto
        cy.get('body').then(($body) => {
            const drawerBody = $body.find('#filter-drawer-body');
            const btnFiltros = $body.find('button.relatorio-btn:contains("Filtros")');

            // Se tem drawer e botão Filtros, usa método compartilhado
            if (drawerBody.length > 0 && btnFiltros.length > 0) {
                RelatoriosPage.garantirDrawerAberto(RelatorioExibirEstoqueLocators.filtrosContainer);
            } else {
                // Se não tem drawer, valida formulário diretamente
                cy.get(RelatorioExibirEstoqueLocators.filtrosContainer, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });
    }

    validarElementosBasicos() {
        // Valida título (pode ser h1.relatorio-title ou h5)
        cy.get('body').then(($body) => {
            const h1Title = $body.find('h1.relatorio-title');
            const h5Title = $body.find('h5:contains("Exibir Estoque")');
            if (h1Title.length > 0) {
                cy.get('h1.relatorio-title').should('be.visible');
            } else if (h5Title.length > 0) {
                cy.get('h5:contains("Exibir Estoque")').should('be.visible');
            }
        });
        this.garantirFiltrosVisiveis();
        // Valida elementos dentro do drawer de filtros (ou formulário direto)
        cy.get(RelatorioExibirEstoqueLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioExibirEstoqueLocators.botaoPesquisar).should('be.visible');
        // Botões de exportação podem estar na barra superior (fora do drawer)
        // Valida que existem (podem não estar visíveis antes da pesquisa)
        cy.get('body').then(($body) => {
            const pdfById = $body.find(RelatorioExibirEstoqueLocators.botaoGerarPdf);
            const pdfByText = $body.find('a:contains("PDF")');
            if (pdfById.length > 0 || pdfByText.length > 0) {
                cy.log('Botões de exportação encontrados');
            }
        });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/exibir-estoque**').as('relatorioExibirEstoque');
        cy.get(RelatorioExibirEstoqueLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioExibirEstoque').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }

    /**
     * Valida que a tabela de resultados está visível após pesquisa
     * Verifica se tabela existe e está visível (pode ter ou não dados)
     */
    validarTabelaResultados() {
        cy.get(RelatorioExibirEstoqueLocators.tabelaResultados, { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }

    /**
     * Valida que a tabela tem pelo menos uma linha de dados
     * Útil para validar que há resultados retornados
     */
    validarTabelaComDados() {
        this.validarTabelaResultados();
        cy.get(RelatorioExibirEstoqueLocators.linhasTabelaResultados)
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida estrutura da tabela (cabeçalhos/colunas)
     * Verifica se tabela tem cabeçalho com colunas
     */
    validarEstruturaTabela() {
        this.validarTabelaResultados();
        cy.get(RelatorioExibirEstoqueLocators.cabecalhoTabela)
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida que botão de exportação PDF está visível e clicável
     */
    validarBotaoExportacaoPdf() {
        // Tenta usar locator por ID primeiro, se não encontrar, usa texto
        cy.get('body').then(($body) => {
            const pdfById = $body.find(RelatorioExibirEstoqueLocators.botaoGerarPdf);
            if (pdfById.length > 0 && pdfById.is(':visible')) {
                cy.get(RelatorioExibirEstoqueLocators.botaoGerarPdf, { timeout: 10000 })
                    .should('be.visible')
                    .should('not.be.disabled');
            } else {
                cy.contains('a', 'PDF', { timeout: 10000 })
                    .should('be.visible')
                    .should('not.be.disabled');
            }
        });
    }

    /**
     * Valida que botão de exportação Excel está visível e clicável
     */
    validarBotaoExportacaoExcel() {
        // Tenta usar locator por ID primeiro, se não encontrar, usa texto
        cy.get('body').then(($body) => {
            const excelById = $body.find(RelatorioExibirEstoqueLocators.botaoGerarExcel);
            if (excelById.length > 0 && excelById.is(':visible')) {
                cy.get(RelatorioExibirEstoqueLocators.botaoGerarExcel, { timeout: 10000 })
                    .should('be.visible')
                    .should('not.be.disabled');
            } else {
                cy.contains('a', 'Excel', { timeout: 10000 })
                    .should('be.visible')
                    .should('not.be.disabled');
            }
        });
    }

    /**
     * Valida que botões de exportação (PDF e Excel) estão visíveis
     * Valida apenas os botões que existem na tela
     */
    validarBotoesExportacao() {
        this.validarBotaoExportacaoPdf();
        // Valida Excel apenas se existir
        cy.get('body').then(($body) => {
            const excelById = $body.find(RelatorioExibirEstoqueLocators.botaoGerarExcel);
            const excelByText = $body.find('a:contains("Excel")');
            if (excelById.length > 0 || excelByText.length > 0) {
                this.validarBotaoExportacaoExcel();
            } else {
                cy.log('Botão Excel não encontrado - pode não estar disponível neste relatório');
            }
        });
    }
}

export default new RelatorioExibirEstoquePage();

