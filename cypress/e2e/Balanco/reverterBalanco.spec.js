import ReverterBalancoPage from "../../support/pages/Balanco/ReverterBalancoPage";
import menulateralprodutopage from "../../support/pages/menulateral/menulateralprodutopage";

describe("Reverter Balanço", { tags: ["@balanco", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
    })

    it("Deve acessar a tela de balanco e reverter um balanco em andamento", () => {
        menulateralprodutopage.acessarListagemBalanco()

        ReverterBalancoPage.acessarPrimeiroBalancoFinalizado()

        ReverterBalancoPage.reverterBalanco()

        ReverterBalancoPage.verificarStatusAtualizado()

        ReverterBalancoPage.verificarToastSucesso()

    })
})
