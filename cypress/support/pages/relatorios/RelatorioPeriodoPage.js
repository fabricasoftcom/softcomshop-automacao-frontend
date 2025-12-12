// RelatorioPeriodoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioPeriodoLocators from "../../locators/Relatorios/RelatorioPeriodoLocators";

class RelatorioPeriodoPage {

    acessarRelatorioPeriodo() {
        RelatoriosPage.acessarRelatorioVendasPeriodo();
        cy.url().should('contain', '/relatorio/periodo');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioPeriodoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioPeriodoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioPeriodoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioPeriodoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioPeriodoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioPeriodoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioPeriodoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/periodo**').as('relatorioPeriodo');
        cy.get(RelatorioPeriodoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioPeriodo').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioPeriodoPage();

