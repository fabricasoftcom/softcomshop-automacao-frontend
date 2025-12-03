import MenulateralProdutoPage from "../menulateral/MenulateralProdutoPage";

class ListagemProdutoPage {
    // acessar cadastro de novo produto
    acessarCadastroNovoProduto() {
        MenulateralProdutoPage.acessarListagemProdutos();
        cy.get('#btn-novo').click();
    }
}
export default new ListagemProdutoPage();
