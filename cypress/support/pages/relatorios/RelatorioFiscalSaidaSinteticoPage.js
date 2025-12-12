// RelatorioFiscalSaidaSinteticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalSaidaSinteticoLocators from "../../locators/Relatorios/RelatorioFiscalSaidaSinteticoLocators";

class RelatorioFiscalSaidaSinteticoPage {

    acessarRelatorioFiscalSaidaSintetico() {
        RelatoriosPage.acessarRelatorioNotasFiscaisSaidaSintetico();
        cy.url().should('contain', '/relatorio/relatorio-fiscal-sintetico');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFiscalSaidaSinteticoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalSaidaSinteticoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalSaidaSinteticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-fiscal-sintetico**').as('relatorioFiscalSaidaSintetico');
        cy.get(RelatorioFiscalSaidaSinteticoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFiscalSaidaSintetico').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFiscalSaidaSinteticoPage();

