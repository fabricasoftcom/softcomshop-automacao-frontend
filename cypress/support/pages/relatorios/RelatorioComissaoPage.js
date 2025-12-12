// RelatorioComissaoPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioComissaoLocators from "../../locators/Relatorios/RelatorioComissaoLocators";

class RelatorioComissaoPage {

    acessarRelatorioComissao() {
        RelatoriosPage.acessarRelatorioVendasComissao();
        cy.url().should('contain', '/relatorio/comissao');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioComissaoLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioComissaoLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioComissaoLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioComissaoLocators.tipoSelect).should('be.visible');
        cy.get(RelatorioComissaoLocators.periodoInput).should('be.visible');
        cy.get(RelatorioComissaoLocators.botaoPesquisar).should('be.visible');
        cy.get(RelatorioComissaoLocators.botaoGerarPdf).should('be.visible');
    }

    preencherPeriodo(dataInicial, dataFinal) {
        const periodo = `${dataInicial} - ${dataFinal}`;
        cy.get(RelatorioComissaoLocators.periodoInput)
            .clear({ force: true })
            .type(periodo, { force: true });
    }

    pesquisar() {
        cy.intercept('GET', '**/relatorio/comissao**').as('relatorioComissao');
        cy.get(RelatorioComissaoLocators.botaoPesquisar).click({ force: true });
        cy.wait('@relatorioComissao').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioComissaoPage();

