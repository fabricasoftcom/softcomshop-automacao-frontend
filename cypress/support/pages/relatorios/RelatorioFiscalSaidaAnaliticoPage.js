// RelatorioFiscalSaidaAnaliticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalSaidaAnaliticoLocators from "../../locators/Relatorios/RelatorioFiscalSaidaAnaliticoLocators";

class RelatorioFiscalSaidaAnaliticoPage {

    acessarRelatorioFiscalSaidaAnalitico() {
        RelatoriosPage.acessarRelatorioNotasFiscaisSaidaAnalitico();
        cy.url().should('contain', '/relatorio/relatorio-fiscal');
        cy.get('h5', { timeout: 10000 }).should('be.visible');
        cy.get('#loading').should('not.exist');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.filtrosContainer, { timeout: 10000 }).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.titulo, { timeout: 10000 }).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput).should('be.visible');
        // Verifica se o botão pesquisar existe (pode ter ID diferente ou estar em contexto diferente)
        cy.get('body').then(($body) => {
            if ($body.find('#btn-pesquisar').length > 0) {
                cy.get('#btn-pesquisar').should('be.visible');
            } else if ($body.find('button:contains("Pesquisar")').length > 0) {
                cy.contains('button', 'Pesquisar').should('be.visible');
            } else {
                cy.get('button[type="submit"]').should('be.visible');
            }
        });
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.botaoGerarPdf).should('exist');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-fiscal**').as('relatorioFiscalSaidaAnalitico');
        // Tenta encontrar o botão pesquisar com diferentes seletores
        cy.get('body').then(($body) => {
            if ($body.find('#btn-pesquisar').length > 0) {
                cy.get('#btn-pesquisar').click({ force: true });
            } else if ($body.find('button:contains("Pesquisar")').length > 0) {
                cy.contains('button', 'Pesquisar').click({ force: true });
            } else {
                cy.get('button[type="submit"]').first().click({ force: true });
            }
        });
        cy.wait('@relatorioFiscalSaidaAnalitico', { timeout: 30000 }).then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFiscalSaidaAnaliticoPage();

