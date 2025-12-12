// RelatorioAniversariantesPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioAniversariantesLocators from "../../locators/Relatorios/RelatorioAniversariantesLocators";

class RelatorioAniversariantesPage {

    acessarRelatorioAniversariantes() {
        RelatoriosPage.acessarRelatorioClientesAniversariantes();
        cy.url().should('contain', '/relatorio/aniversariante');
    }

    validarElementosBasicos() {
        cy.contains('h5', /Aniversariantes/i).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.mesInput).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.cidadeAutocomplete).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioAniversariantesLocators.botaoGerarPdf).should('be.visible');
    }

    preencherMes(mes) {
        cy.get(RelatorioAniversariantesLocators.mesInput)
            .clear({ force: true })
            .type(mes, { force: true });
    }

    preencherCidade(cidade) {
        cy.get(RelatorioAniversariantesLocators.cidadeAutocomplete)
            .clear({ force: true })
            .type(cidade, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/aniversariante**').as('relatorioAniversariantes');
        cy.get(RelatorioAniversariantesLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioAniversariantes').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioAniversariantesPage();

