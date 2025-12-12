// RelatorioContasPagarPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioContasPagarLocators from "../../locators/Relatorios/RelatorioContasPagarLocators";

class RelatorioContasPagarPage {

    acessarRelatorioContasPagar() {
        RelatoriosPage.acessarRelatorioFinanceiroContasPagar();
        cy.url().should('contain', '/relatorio/contas-a-pagar');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioContasPagarLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioContasPagarLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioContasPagarLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioContasPagarLocators.periodoInput).should('be.visible');
        cy.get(RelatorioContasPagarLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioContasPagarLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioContasPagarLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/contas-a-pagar**').as('relatorioContasPagar');
        cy.get(RelatorioContasPagarLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioContasPagar').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioContasPagarPage();

