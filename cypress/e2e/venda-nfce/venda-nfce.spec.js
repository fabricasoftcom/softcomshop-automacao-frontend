import VendaPage from "../../support/pages/Venda/VendaPage";

describe("Realizar venda", { tags: ['@venda-nfce', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.login();
    });

    it("Realizar venda com sucesso", () => {
        VendaPage.acessarPaginaVenda();
        VendaPage.informarVendedor();
        VendaPage.adicionarProduto();
        VendaPage.adicionarPagamento();
        VendaPage.salvarPagamento();
        // VendaPage.gerarNFCe();
        // cy.get('.btn:contains("Nota Fiscal Consumidor")').should('be.visible');
    });
});
