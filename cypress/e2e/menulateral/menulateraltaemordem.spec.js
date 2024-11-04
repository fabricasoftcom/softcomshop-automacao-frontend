import loginpage from "../../pages/login/loginpage";
import menulateraltaemordempage from "../../pages/menulateral/menulateraltaemordempage";
import userpassfactory from '../../factories/userpassfactory';

describe('Acessar opções do menu lateral ta em ordem', () =>{
    beforeEach(function () {
        loginpage.acessarUrlFazerlogin(userpassfactory.userfab());
    })

    afterEach(() => {
        cy.wait(10000);
      })

    it('T001-Ta em ordem', ()=>{
        menulateraltaemordempage.acessarTaEmOrdem();
    })
})
