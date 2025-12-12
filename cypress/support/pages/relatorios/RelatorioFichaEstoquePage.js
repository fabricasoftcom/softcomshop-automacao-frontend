// RelatorioFichaEstoquePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFichaEstoqueLocators from "../../locators/Relatorios/RelatorioFichaEstoqueLocators";

class RelatorioFichaEstoquePage {

    acessarRelatorioFichaEstoque() {
        RelatoriosPage.acessarRelatorioProdutosFichaEstoque();
        cy.url().should('contain', '/relatorio/ficha-estoque');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFichaEstoqueLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFichaEstoqueLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFichaEstoqueLocators.produtoAutocomplete).should('be.visible');
        cy.get(RelatorioFichaEstoqueLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFichaEstoqueLocators.botaoPesquisar).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFichaEstoqueLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/ficha-estoque**').as('relatorioFichaEstoque');
        cy.get(RelatorioFichaEstoqueLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFichaEstoque').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFichaEstoquePage();

