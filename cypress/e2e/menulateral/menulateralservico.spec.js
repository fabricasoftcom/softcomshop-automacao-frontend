import menulateralservicopage from "../../support/pages/menulateral/menulateralservicopage";

describe('Acessar opções do menu lateral de Serviços e NFSe', () =>{
    beforeEach(function () {
        cy.login();
    })

    it('T001- Listagem de Clientes', ()=>{
        menulateralservicopage.acessarListagemClientes();
    })
    
    it('T002- Listagem de serviços', ()=>{
        menulateralservicopage.acessarListagemServico();
    })
    
    it('T003- Listagem de NFSe', ()=>{
        menulateralservicopage.acessarListagemNFse();
    })
    
    it('T004- Configurações de NFSe', ()=>{
        menulateralservicopage.acessarConfiguracoesNFSe();
    })
    
    // disponivel apenas quando segmento petshop
    // it('T005- Listagem de ordem de serviço', ()=>{
    //     menulateralservicopage.acessarlistagemOrdemServico();
    // })w
    
    it('T006- Cadastro de novo cliente', ()=>{
        menulateralservicopage.acessarCadastroNovoCliente();
    })
        
    it('T007- Cadastro de nova NFSe', ()=>{
        menulateralservicopage.acessarCadastroNovaNFSe();
    })   
})