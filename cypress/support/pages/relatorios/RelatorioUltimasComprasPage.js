// RelatorioUltimasComprasPage.js
import RelatoriosPage from "./RelatoriosPage";
import RelatorioUltimasComprasLocators from "../../locators/Relatorios/RelatorioUltimasComprasLocators";

class RelatorioUltimasComprasPage {

    acessarRelatorioUltimasCompras() {
        RelatoriosPage.acessarRelatorioClientesUltimasCompras();
        cy.url().should('contain', '/cliente/relatorio/ultimas-compras');
    }

    validarElementosBasicos() {
        cy.contains('h5', /Relatório de Últimas Compras/i).should('be.visible');
        cy.get(RelatorioUltimasComprasLocators.botaoGerarPdf).should('be.visible');
    }

    validarExibicaoVendas() {
        // Verifica se há pelo menos uma tabela de itens (cada venda tem uma tabela)
        cy.get(RelatorioUltimasComprasLocators.tabelaItens).should('have.length.greaterThan', 0);

        // Verifica se há totalizador
        cy.get(RelatorioUltimasComprasLocators.totalizadorValorCompra).should('be.visible');

        // Verifica se há pelo menos uma linha na tabela
        cy.get(RelatorioUltimasComprasLocators.linhasTabelaItens).should('have.length.greaterThan', 0);
    }

    validarPaginacao() {
        cy.get(RelatorioUltimasComprasLocators.paginacao).should('be.visible');
    }
}

export default new RelatorioUltimasComprasPage();

