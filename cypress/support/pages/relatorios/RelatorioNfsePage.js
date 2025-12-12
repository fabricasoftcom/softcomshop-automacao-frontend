// RelatorioNfsePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioNfseLocators from "../../locators/Relatorios/RelatorioNfseLocators";

class RelatorioNfsePage {

    acessarRelatorioNfse() {
        RelatoriosPage.acessarRelatorioNotasFiscaisNFSe();
        cy.url().should('contain', '/relatorio/relatorio-nfse');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioNfseLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioNfseLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioNfseLocators.periodoInput).should('be.visible');
        cy.get(RelatorioNfseLocators.statusSelect).should('be.visible');
        cy.get(RelatorioNfseLocators.botaoPesquisar).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioNfseLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-nfse**').as('relatorioNfse');
        cy.get(RelatorioNfseLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioNfse').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioNfsePage();

