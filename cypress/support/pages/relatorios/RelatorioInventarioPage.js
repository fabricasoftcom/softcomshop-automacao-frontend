// RelatorioInventarioPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioInventarioLocators from "../../locators/Relatorios/RelatorioInventarioLocators";

class RelatorioInventarioPage {

    acessarRelatorioInventario() {
        RelatoriosPage.acessarRelatorioProdutosInventario();
        cy.url().should('contain', '/relatorio/inventario');
    }

    garantirFiltrosVisiveis() {
        cy.get(RelatorioInventarioLocators.filtrosContainer).should('be.visible');
    }

    validarElementosBasicos() {
        cy.get(RelatorioInventarioLocators.titulo).should('be.visible');
        this.garantirFiltrosVisiveis();
        cy.get(RelatorioInventarioLocators.empresaSelect).should('be.visible');
        cy.get(RelatorioInventarioLocators.periodoAteInput).should('be.visible');
        cy.get(RelatorioInventarioLocators.botaoGerarInventario).should('be.visible');
        cy.get(RelatorioInventarioLocators.botaoGerarPdf).should('be.visible');
        cy.get(RelatorioInventarioLocators.botaoGerarExcel).should('be.visible');
    }

    gerarInventario() {
        cy.intercept('GET', '**/relatorio/inventario**').as('relatorioInventario');
        cy.get(RelatorioInventarioLocators.botaoGerarInventario).click({ force: true });
        cy.wait('@relatorioInventario').then((interception) => {
            const status = Number(interception?.response?.statusCode);
            if (!Number.isNaN(status)) {
                expect([200, 302]).to.include(status);
            }
        });
    }
}

export default new RelatorioInventarioPage();

