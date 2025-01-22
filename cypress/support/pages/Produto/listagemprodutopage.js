import menulateralprodutopage from "../menulateral/menulateralprodutopage";

class listagemprodutopage{
    // acessar cadastro de novo produto
    acessarCadastroNovoProduto(){
        menulateralprodutopage.acessarListagemProdutos();
        cy.get('#btn-novo').click();
    }
}
export default new listagemprodutopage;
