// RelatorioMovimentacaoEstoquePage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioMovimentacaoEstoqueLocators from "../../locators/Relatorios/RelatorioMovimentacaoEstoqueLocators";

class RelatorioMovimentacaoEstoquePage {

    acessarRelatorioMovimentacaoEstoque() {
        RelatoriosPage.acessarRelatorioProdutosMovimentacaoEstoque();
        cy.url().should('contain', '/relatorios/movimentacao-estoque');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioMovimentacaoEstoqueLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioMovimentacaoEstoqueLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioMovimentacaoEstoqueLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioMovimentacaoEstoqueLocators.dataInput).should('be.visible');
        cy.get(RelatorioMovimentacaoEstoqueLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioMovimentacaoEstoqueLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioMovimentacaoEstoqueLocators.botaoGerarExcel).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioMovimentacaoEstoqueLocators.dataInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorios/movimentacao-estoque**').as('relatorioMovimentacaoEstoque');
        cy.get(RelatorioMovimentacaoEstoqueLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioMovimentacaoEstoque').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioMovimentacaoEstoquePage();

