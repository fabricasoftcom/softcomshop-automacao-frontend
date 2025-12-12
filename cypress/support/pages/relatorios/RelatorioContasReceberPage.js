// RelatorioContasReceberPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioContasReceberLocators from "../../locators/Relatorios/RelatorioContasReceberLocators";

class RelatorioContasReceberPage {

    acessarRelatorioContasReceber() {
        RelatoriosPage.acessarRelatorioFinanceiroContasReceber();
        cy.url().should('contain', '/relatorio/contas-a-receber');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioContasReceberLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioContasReceberLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioContasReceberLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioContasReceberLocators.periodoInput).should('be.visible');
        cy.get(RelatorioContasReceberLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioContasReceberLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioContasReceberLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/contas-a-receber**').as('relatorioContasReceber');
        cy.get(RelatorioContasReceberLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioContasReceber').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioContasReceberPage();

