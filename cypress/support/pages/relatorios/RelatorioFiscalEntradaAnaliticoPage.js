// RelatorioFiscalEntradaAnaliticoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalEntradaAnaliticoLocators from "../../locators/Relatorios/RelatorioFiscalEntradaAnaliticoLocators";

class RelatorioFiscalEntradaAnaliticoPage {

    acessarRelatorioFiscalEntradaAnalitico() {
        RelatoriosPage.acessarRelatorioNotasFiscaisEntradaAnalitico();
        cy.url().should('contain', '/relatorio/relatorio-fiscal-entrada');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-fiscal-entrada**').as('relatorioFiscalEntradaAnalitico');
        cy.get(RelatorioFiscalEntradaAnaliticoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFiscalEntradaAnalitico').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFiscalEntradaAnaliticoPage();

