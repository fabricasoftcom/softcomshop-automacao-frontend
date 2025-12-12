// RelatorioNcmPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioNcmLocators from "../../locators/Relatorios/RelatorioNcmLocators";

class RelatorioNcmPage {

    acessarRelatorioNcm() {
        RelatoriosPage.acessarRelatorioProdutosNCM();
        cy.url().should('contain', '/relatorio/ncm');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioNcmLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioNcmLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioNcmLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioNcmLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioNcmLocators.botaoGerarPdf).should('be.visible');
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/ncm**').as('relatorioNcm');
        cy.get(RelatorioNcmLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioNcm').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioNcmPage();

