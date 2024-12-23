import menulateralrelatoriospage from "../../support/pages/menulateral/menulateralrelatoriospage";

describe('Acessar opções do menu lateral de relatorios', () =>{
    beforeEach(function () {
        cy.login();
    })
    it('T001-Relatorios', ()=>{
        menulateralrelatoriospage.acessarRelatorios();
    })
})
