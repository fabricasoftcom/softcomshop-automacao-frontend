import loginpage from "../../pages/login/loginpage";
import userpassfactory from "../../factories/userpassfactory";
import menulateralfinanceiropage from "../../pages/menulateral/menulateralfinanceiropage";

describe('Acessar opções do menu lateral de Financeiro', () =>{
    beforeEach(function () {
        loginpage.acessarUrlFazerlogin(userpassfactory.userfab());
    })

    afterEach(() => {
        cy.wait(10000);
      })

    it('T001- Listagem de contas', ()=>{
        menulateralfinanceiropage.acessarListagemContas();
    })
    it('T002- Transferencia Contas', ()=>{
        menulateralfinanceiropage.acessarTransferenciaContas();
    })
    it('T003- Lançamento Conta', ()=>{
        menulateralfinanceiropage.acessarLancamentoConta();
    })
    it('T004- Contas a pagar', ()=>{
        menulateralfinanceiropage.acessarContasPagar();
    })
    it('T005- Contas a receber receita', ()=>{
        menulateralfinanceiropage.acessarContasReceberReceita();
    })
    it('T006- Contas a receber Remessa', ()=>{
        menulateralfinanceiropage.acessarContasReceberRemessa();
    })
    it('T007- Contas a receber retorno', ()=>{
        menulateralfinanceiropage.acessarContasReceberRetorno();
    })
    it('T008- Categorias', ()=>{
        menulateralfinanceiropage.acessarCategorias();
    })
    it('T009- Fluxo', ()=>{
        menulateralfinanceiropage.acessarFluxo();
    })
    it('T010- DRE', ()=>{
        menulateralfinanceiropage.acessarDRE();
    })
    it('T011- Extrato', ()=>{
        menulateralfinanceiropage.acessarExtrato();
    })
    it('T012- Painel PIX', ()=>{
        menulateralfinanceiropage.acessarPainelPix();
    })
    it('T013- Estorno PIX', ()=>{
        menulateralfinanceiropage.acessarEstornoPix();
    })
    it('T014- Cadastro de nova conta', ()=>{
        menulateralfinanceiropage.acessarCadastrNovaConta();
    })
    it('T015- Cadastro de novo Contas a Pagar', ()=>{
        menulateralfinanceiropage.acessarCadastroNovoContasPagar();
    })
    it('T016- Cadastro de novo contas a receber receita', ()=>{
        menulateralfinanceiropage.aacessarCadastroNovoContasReceberReceita();
    })
    it('T017- Cadastro de nova categoria', ()=>{
        menulateralfinanceiropage.acessarCadastroNovaCategoria();
    })
    
})