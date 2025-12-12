// RelatorioFormaPagamentoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioFormaPagamentoLocators from "../../locators/Relatorios/RelatorioFormaPagamentoLocators";

class RelatorioFormaPagamentoPage {

    acessarRelatorioFormaPagamento() {
        RelatoriosPage.acessarRelatorioVendasFormaPagamento();
        cy.url().should('contain', '/relatorio/forma-pagamento');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioFormaPagamentoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioFormaPagamentoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioFormaPagamentoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioFormaPagamentoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioFormaPagamentoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioFormaPagamentoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioFormaPagamentoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/forma-pagamento**').as('relatorioFormaPagamento');
        cy.get(RelatorioFormaPagamentoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioFormaPagamento').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioFormaPagamentoPage();

