// RelatorioProjecaoCartoesPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioProjecaoCartoesLocators from "../../locators/Relatorios/RelatorioProjecaoCartoesLocators";

class RelatorioProjecaoCartoesPage {

    acessarRelatorioProjecaoCartoes() {
        RelatoriosPage.acessarRelatorioFinanceiroProjecaoCartoes();
        cy.url().should('contain', '/relatorio/projecao-de-cartoes');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioProjecaoCartoesLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioProjecaoCartoesLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioProjecaoCartoesLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioProjecaoCartoesLocators.periodoInput).should('be.visible');
        cy.get(RelatorioProjecaoCartoesLocators.botaoPesquisar).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioProjecaoCartoesLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/projecao-de-cartoes**').as('relatorioProjecaoCartoes');
        cy.get(RelatorioProjecaoCartoesLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioProjecaoCartoes').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioProjecaoCartoesPage();

