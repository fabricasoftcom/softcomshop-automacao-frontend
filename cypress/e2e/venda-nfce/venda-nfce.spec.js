import VendaPage from "../../support/pages/Venda/VendaPage";

describe("Realizar venda", { tags: ['@venda-nfce', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
    });

    it("Realizar venda com sucesso", () => {
        cy.get('.text-muted').click().then(() => {
            cy.get('.dropdown > .dropdown-menu > :contains("SOFTCOM MATRIZ")').click();
        });
        VendaPage.acessarPaginaVenda();
        VendaPage.informarVendedor();
        VendaPage.adicionarProduto();
        VendaPage.adicionarPagamento();
        VendaPage.salvarPagamento();
        cy.wait(4000);
        VendaPage.gerarNFCe();
        cy.wait(4000);
        cy.get('.btn:contains("Nota Fiscal Consumidor")').should('be.visible');
    });
});
