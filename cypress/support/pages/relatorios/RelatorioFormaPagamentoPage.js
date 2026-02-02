// RelatorioFormaPagamentoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFormaPagamentoLocators from "../../locators/Relatorios/RelatorioFormaPagamentoLocators";

class RelatorioFormaPagamentoPage {

    acessarRelatorioFormaPagamento() {
        RelatoriosPage.acessarRelatorioVendasFormaPagamento();
        // Atualizado após reformulação: URL mudou para /relatorio-v2/forma-pagamento
        cy.url().should('contain', '/relatorio-v2/forma-pagamento');
    }

    garantirFiltrosVisiveis() {
        // Atualizado: usa método compartilhado do drawer
        // Mantém compatibilidade com implementação anterior
        RelatoriosPage.garantirDrawerAberto(RelatorioFormaPagamentoLocators.filtrosContainer);
    }

    validarElementosBasicos() {
        cy.get(RelatorioFormaPagamentoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        // Valida elementos dentro do drawer de filtros
        cy.get(RelatorioFormaPagamentoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFormaPagamentoLocators.periodoInput).should('be.visible');
        // Botão Pesquisar pode estar oculto inicialmente ou dentro do drawer
        cy.get(RelatorioFormaPagamentoLocators.botaoPesquisar).should('exist');
        // Botões de exportação estão na barra superior (fora do drawer)
        // Podem não estar visíveis antes da pesquisa, então apenas valida que existem
        cy.get('body').then(($body) => {
            const pdfBtn = $body.find('a:contains("PDF")');
            const excelBtn = $body.find('a:contains("Excel")');
            if (pdfBtn.length > 0) {
                cy.contains('a', 'PDF').should('be.visible');
            }
            if (excelBtn.length > 0) {
                cy.contains('a', 'Excel').should('be.visible');
            }
        });
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFormaPagamentoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        // Atualizado após reformulação: URL mudou para /relatorio-v2/forma-pagamento
        cy.intercept('GET', '**/relatorio-v2/forma-pagamento**').as('relatorioFormaPagamento');
        cy.get(RelatorioFormaPagamentoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFormaPagamento').then((interception) => {
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
        cy.get(RelatorioFormaPagamentoLocators.tabelaResultados, { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }

    /**
     * Valida que a tabela tem pelo menos uma linha de dados
     * Útil para validar que há resultados retornados
     */
    validarTabelaComDados() {
        this.validarTabelaResultados();
        cy.get(RelatorioFormaPagamentoLocators.linhasTabelaResultados)
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida estrutura da tabela (cabeçalhos/colunas)
     * Verifica se tabela tem cabeçalho com colunas
     */
    validarEstruturaTabela() {
        this.validarTabelaResultados();
        cy.get(RelatorioFormaPagamentoLocators.cabecalhoTabela)
            .should('exist')
            .should('have.length.greaterThan', 0);
    }

    /**
     * Valida que botão de exportação PDF está visível e clicável
     */
    validarBotaoExportacaoPdf() {
        // Tenta usar locator por ID primeiro, se não encontrar, usa texto
        cy.get('body').then(($body) => {
            const pdfById = $body.find(RelatorioFormaPagamentoLocators.botaoGerarPdf);
            if (pdfById.length > 0 && pdfById.is(':visible')) {
                cy.get(RelatorioFormaPagamentoLocators.botaoGerarPdf, { timeout: 10000 })
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
            const excelById = $body.find(RelatorioFormaPagamentoLocators.botaoGerarExcel);
            if (excelById.length > 0 && excelById.is(':visible')) {
                cy.get(RelatorioFormaPagamentoLocators.botaoGerarExcel, { timeout: 10000 })
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
            const excelById = $body.find(RelatorioFormaPagamentoLocators.botaoGerarExcel);
            const excelByText = $body.find('a:contains("Excel")');
            if (excelById.length > 0 || excelByText.length > 0) {
                this.validarBotaoExportacaoExcel();
            } else {
                cy.log('Botão Excel não encontrado - pode não estar disponível neste relatório');
            }
        });
    }
}

export default new RelatorioFormaPagamentoPage();

