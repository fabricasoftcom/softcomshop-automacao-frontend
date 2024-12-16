import ReverterBalancoPage from "../../support/pages/Balanco/ReverterBalancoPage";
import menulateralprodutopage from "../../support/pages/menulateral/menulateralprodutopage";

describe("Deletar Balanço  ",() => {
    beforeEach(() => {
        cy.login();
    })


    it("Deve acessar a tela de balanco e excluir um registro", () => {
        menulateralprodutopage.acessarListagemBalanco()

        ReverterBalancoPage.acessarPrimeiroBalancoFinalizado()

        ReverterBalancoPage.reverterBalanco()
        
        ReverterBalancoPage.verificarStatusAtualizado()

        ReverterBalancoPage.verificarToastSucesso()
    

    })
})