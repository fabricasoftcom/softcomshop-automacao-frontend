// RelatorioEvolucaoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioEvolucaoLocators from "../../locators/Relatorios/RelatorioEvolucaoLocators";

class RelatorioEvolucaoPage {

    acessarRelatorioEvolucao() {
        RelatoriosPage.acessarRelatorioVendasEvolucao();
        cy.url().should('contain', '/relatorio/evolucao');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioEvolucaoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioEvolucaoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioEvolucaoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioEvolucaoLocators.tipoEvolucaoSelect).should('be.visible');
        cy.get(RelatorioEvolucaoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioEvolucaoLocators.botaoGerarPdf).should('be.visible');
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/evolucao**').as('relatorioEvolucao');
        cy.get(RelatorioEvolucaoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioEvolucao').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioEvolucaoPage();

