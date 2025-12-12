// RelatorioFiscalEntradaSinteticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalEntradaSinteticoLocators from "../../locators/Relatorios/RelatorioFiscalEntradaSinteticoLocators";

class RelatorioFiscalEntradaSinteticoPage {

    acessarRelatorioFiscalEntradaSintetico() {
        RelatoriosPage.acessarRelatorioNotasFiscaisEntradaSintetico();
        cy.url().should('contain', '/relatorio/relatorio-fiscal-entrada-sintetico');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFiscalEntradaSinteticoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalEntradaSinteticoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalEntradaSinteticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalEntradaSinteticoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-fiscal-entrada-sintetico**').as('relatorioFiscalEntradaSintetico');
        cy.get(RelatorioFiscalEntradaSinteticoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFiscalEntradaSintetico').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFiscalEntradaSinteticoPage();

