import menulateralvendapage from "../menulateral/menulateralvendapage";

class listagemclientepage{
    // acessar cadastro de novo Cliente
    acessarCadastroNovoCliente(){
        menulateralvendapage.acessarListagemClientes();
        cy.get('#btn-novo').click();
    }
}
export default new listagemclientepage;
