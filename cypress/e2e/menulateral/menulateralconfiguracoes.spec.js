import loginpage from "../../pages/login/loginpage";
import userpassfactory from "../../factories/userpassfactory";
import menulateralconfiguracoespage from "../../pages/menulateral/menulateralconfiguracoespage";

describe('Acessar opções do menu lateral Configurações', () =>{
    beforeEach(function () {
        loginpage.acessarUrlFazerlogin(userpassfactory.userfab());
    })

    afterEach(() => {
        cy.wait(10000);
      })

    it('T001- Listagem de Empresas', ()=>{
        menulateralconfiguracoespage.acessarListagemEmpresas();
    })
    it('T002- Listagem Funcionarios', ()=>{
        menulateralconfiguracoespage.acessarListagemFuncionarios();
    })
    it('T003- Listagem Usuarios', ()=>{
        menulateralconfiguracoespage.acessarListagemUsuarios();
    })
    it('T004- Listagem Perfis de Acesso', ()=>{
        menulateralconfiguracoespage.acessarListagemPerfisAcesso();
    })
    it('T005- Listagem Formas de pagamento', ()=>{
        menulateralconfiguracoespage.acessarListagemFormasPagamentos();
    })
    it('T006- Listagem de Cartões', ()=>{
        menulateralconfiguracoespage.acessarListagemCartoes();
    })
    it('T007- Modulos', ()=>{
        menulateralconfiguracoespage.acessarModulos();
    })
    it('T008- Scheme', ()=>{
        menulateralconfiguracoespage.acessarScheme();
    })
    it('T009- Sincronização', ()=>{
        menulateralconfiguracoespage.acessarSincronizacao();
    })
    it('T010- Configurações de Estiquetas', ()=>{
        menulateralconfiguracoespage.acessarConfiguracoesEtiquetas();
    })
    it('T011- Notificações', ()=>{
        menulateralconfiguracoespage.acessarNotificacoes();
    })
    
    
    
    
    
})