import menulateraltaemordempage from "../../support/pages/menulateral/menulateraltaemordempage";

describe.skip('Acessar opções do menu lateral ta em ordem', () =>{
    beforeEach(function () {
        cy.login();
    })

    it('T001-Ta em ordem', ()=>{
        menulateraltaemordempage.acessarTaEmOrdem();
    })
})
