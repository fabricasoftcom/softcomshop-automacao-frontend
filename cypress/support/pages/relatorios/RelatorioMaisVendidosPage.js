// RelatorioMaisVendidosPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioMaisVendidosLocators from "../../locators/Relatorios/RelatorioMaisVendidosLocators";

class RelatorioMaisVendidosPage {

    acessarRelatorioMaisVendidos() {
        RelatoriosPage.acessarRelatorioVendasMaisVendidos();
        cy.url().should('contain', '/relatorio/mais-vendidos');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioMaisVendidosLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioMaisVendidosLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioMaisVendidosLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioMaisVendidosLocators.periodoInput).should('be.visible');
        cy.get(RelatorioMaisVendidosLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioMaisVendidosLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioMaisVendidosLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/mais-vendidos**').as('relatorioMaisVendidos');
        cy.get(RelatorioMaisVendidosLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioMaisVendidos').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioMaisVendidosPage();

