import ProdutoPage from "../../support/pages/Produto/ProdutoPage";
import VendaPage from "../../support/pages/Venda/VendaPage";

describe.skip('Cadastro de produtos', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Auto complete Compras e Estoque > Produtos > Produto', () => {
        cy.visit('https://stage-dev.softcomshop.com.br/produto');
        cy.get('#btn-pesquisa').click();
        cy.get('#auto_produto_id').click();
        cy.type('abajur');
        cy.xpath('//*[@id="div_auto_produto_id"]/div/div[2]/ul/li[1]/a').click();
        cy.get('#btn-pesquisa').click();
    });

    it('Auto complete Vendas e NF-e > Vendas > Novo', () => {
        cy.visit('https://stage-dev.softcomshop.com.br/produto');
        VendaPage.informarVendedor();
        cy.get('#auto_icon_produto_empresa_grade_id_').click();
        cy.type('abajur');
        cy.xpath('//*[@id="div_auto_produto_empresa_grade_id_"]/div/div[2]/ul/li[1]/a').click();
        VendaPage.adicionarPagamento();
        VendaPage.gerarNFCe();
    });
});
