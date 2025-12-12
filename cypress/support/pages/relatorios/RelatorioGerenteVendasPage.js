// RelatorioGerenteVendasPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioGerenteVendasLocators from "../../locators/Relatorios/RelatorioGerenteVendasLocators";

class RelatorioGerenteVendasPage {

    acessarRelatorioGerenteVendas() {
        RelatoriosPage.acessarRelatorioVendasGerenteVendas();
        cy.url().should('contain', '/relatorio/gerente-vendas');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioGerenteVendasLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioGerenteVendasLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioGerenteVendasLocators.periodoInput).should('be.visible');
        cy.get(RelatorioGerenteVendasLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioGerenteVendasLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioGerenteVendasLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/gerente-vendas**').as('relatorioGerenteVendas');
        cy.get(RelatorioGerenteVendasLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioGerenteVendas').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioGerenteVendasPage();

