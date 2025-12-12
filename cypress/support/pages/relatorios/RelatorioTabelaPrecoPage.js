// RelatorioTabelaPrecoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioTabelaPrecoLocators from "../../locators/Relatorios/RelatorioTabelaPrecoLocators";

class RelatorioTabelaPrecoPage {

    acessarRelatorioTabelaPreco() {
        RelatoriosPage.acessarRelatorioProdutosExibirTabelaPreco();
        cy.url().should('contain', '/relatorio/tabela-preco');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioTabelaPrecoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioTabelaPrecoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioTabelaPrecoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioTabelaPrecoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioTabelaPrecoLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioTabelaPrecoLocators.botaoGerarExcel).should('be.visible');
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/tabela-preco**').as('relatorioTabelaPreco');
        cy.get(RelatorioTabelaPrecoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioTabelaPreco').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioTabelaPrecoPage();

