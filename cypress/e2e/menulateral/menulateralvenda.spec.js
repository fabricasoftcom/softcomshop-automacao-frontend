import menulateralvendapage from "../../pages/menulateral/menulateralvendapage";
import loginpage from "../../pages/login/loginpage";
import userpassfactory from "../../factories/userpassfactory";

describe('Acessar opções do menu lateral de Vendas', () =>{
    beforeEach(function () {
        loginpage.acessarUrlFazerlogin(userpassfactory.userfab());
    })

    afterEach(() => {
        cy.wait(10000);
      })

    it('T001- Listagem de Clientes',()=>{
        menulateralvendapage.acessarListagemClientes();
    })
    
    it('T002- Listagem de Orcamento',()=>{
        menulateralvendapage.acessarListagemOrcamento();
    })
    
    it('T003- Listagem de Vendas',()=>{
        menulateralvendapage.acessarListagemVendas();
    })
        
    it('T004- Listagem de NFce',()=>{
        menulateralvendapage.acessarListagemNFCe();
    })
        
    it('T005- Inutilizar NFCe',()=>{
        menulateralvendapage.acessarInutilizarNFCe();
    })
        
    it('T006- Download Xml NFce',()=>{
        menulateralvendapage.acessarDownloadXmlNFCe();
    })
        
    it('T007- Configurações NFce',()=>{
        menulateralvendapage.acessarConfiguracoesNFCe();
    })

    it('T008- Listagem de NFe',()=>{
        menulateralvendapage.acessarListagemNFe();
    })
        
    it('T009- Inutilizar NFe',()=>{
        menulateralvendapage.acessarInutilizarNFe();
    })
        
    it('T010- Download Xml NFe',()=>{
        menulateralvendapage.acessarDownloadXmlNFe();
    })
        
    it('T011- Configurações NFe',()=>{
        menulateralvendapage.acessarConfiguracoesNFe();
    })

    it('T012- PDV Web',()=>{
        menulateralvendapage.acessarPdvWeb();
    })

    it('T013- Pesquisa preço',()=>{
        menulateralvendapage.acessarPesquisaPreco();
    })

    it('T015- Cadastro de novo Orcamento',()=>{
        menulateralvendapage.acessarCadastroNovoOrcamento();
    })

    it('T017- Cadastro de nova Nfe',()=>{
        menulateralvendapage.acessarCadastroNovaNfe();
    })

})