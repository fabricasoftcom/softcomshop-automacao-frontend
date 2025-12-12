// RelatorioFiscalPisCofinsPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFiscalPisCofinsLocators from "../../locators/Relatorios/RelatorioFiscalPisCofinsLocators";

class RelatorioFiscalPisCofinsPage {

    acessarRelatorioFiscalPisCofins() {
        RelatoriosPage.acessarRelatorioNotasFiscaisPisCofins();
        cy.url().should('contain', '/relatorio/relatorio-fiscal-pis-cofins');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFiscalPisCofinsLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFiscalPisCofinsLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFiscalPisCofinsLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFiscalPisCofinsLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFiscalPisCofinsLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioFiscalPisCofinsLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFiscalPisCofinsLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/relatorio-fiscal-pis-cofins**').as('relatorioFiscalPisCofins');
        cy.get(RelatorioFiscalPisCofinsLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFiscalPisCofins').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFiscalPisCofinsPage();

