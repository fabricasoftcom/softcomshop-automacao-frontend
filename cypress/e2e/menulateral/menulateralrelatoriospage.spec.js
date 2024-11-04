import loginpage from "../../pages/login/loginpage";
import menulateralrelatoriospage from "../../pages/menulateral/menulateralrelatoriospage";
import userpassfactory from '../../factories/userpassfactory';

describe('Acessar opções do menu lateral de relatorios', () =>{
    beforeEach(function () {
        loginpage.acessarUrlFazerlogin(userpassfactory.userfab());
    })

    afterEach(() => {
        cy.wait(10000);
      })

    it('T001-Relatorios', ()=>{
        menulateralrelatoriospage.acessarRelatorios();
    })
})
