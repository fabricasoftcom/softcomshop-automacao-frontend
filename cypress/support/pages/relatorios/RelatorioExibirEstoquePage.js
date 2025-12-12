// RelatorioExibirEstoquePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioExibirEstoqueLocators from "../../locators/Relatorios/RelatorioExibirEstoqueLocators";

class RelatorioExibirEstoquePage {

    acessarRelatorioExibirEstoque() {
        RelatoriosPage.acessarRelatorioProdutosExibirEstoque();
        cy.url().should('contain', '/relatorio/exibir-estoque');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioExibirEstoqueLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioExibirEstoqueLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioExibirEstoqueLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioExibirEstoqueLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioExibirEstoqueLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioExibirEstoqueLocators.botaoGerarExcel).should('be.visible');
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/exibir-estoque**').as('relatorioExibirEstoque');
        cy.get(RelatorioExibirEstoqueLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioExibirEstoque').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioExibirEstoquePage();

