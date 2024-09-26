import VendaPage from "../../support/pages/Venda/VendaPage";

describe("Realizar venda", () => {
    beforeEach(() => {
        cy.login();
    });

    it("Realizar venda com sucesso", () => {
        VendaPage.acessarPaginaVenda();
        VendaPage.informarVendedor();
        VendaPage.adicionarProduto();
        VendaPage.adicionarPagamento();
        VendaPage.salvarPagamento();
        VendaPage.gerarNFCe();
        VendaPage.confirmacaoEmissaoNFCe();
    });
});
