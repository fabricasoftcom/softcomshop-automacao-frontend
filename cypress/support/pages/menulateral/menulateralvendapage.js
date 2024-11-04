class menulateralvendapage{
    //acessar listagem de clientes
    acessarListagemClientes(){
        cy.expandirClicarMenuUmNivel('Vendas e NF-e','#clientes');
    }
    //acessar listagem de orçamento
    acessarListagemOrcamento(){
        cy.expandirClicarMenuUmNivel('Vendas e NF-e','#orçamento');
    }
    //acessar listagem de vendas
    acessarListagemVendas(){
        cy.expandirClicarMenuUmNivel('Vendas e NF-e','#vendas');
    }
    //acessar listagem NFCe
    acessarListagemNFCe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nfc-e',':nth-child(1) > #nfc-e');
    }
    //acessar inutilizar NFCe 
    acessarInutilizarNFCe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nfc-e','#inutilizar');
    }
    //acessar download xml NFCe
    acessarDownloadXmlNFCe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nfc-e','#download_xml');
    }
    //acessar configuracoes NFCe
    acessarConfiguracoesNFCe(){
        // cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nfc-e','#configurações');
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nfc-e','a[href*="serie/nfce"]');
    }
    //acessar listagem NFe
    acessarListagemNFe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nf-e','#nota_fiscal');
    }
    //acessar inutilizar NFe 
    acessarInutilizarNFe(){
        //cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nf-e','#inutilizar');
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nf-e','.active > .nav > :nth-child(2) > #inutilizar');
    }
    //acessar download xml NFe
    acessarDownloadXmlNFe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nf-e','.active > .nav > :nth-child(3) > #download_xml');
    }
    //acessar configuracoes NFe
    acessarConfiguracoesNFe(){
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e','#nf-e','.active > .nav > :nth-child(4) > #configurações');
    }
    //acessar o PDV web
    acessarPdvWeb(){
        cy.expandirClicarMenuUmNivel('Vendas e NF-e', '#pdv');
    }
    //acessar Pesquisa preço
    acessarPesquisaPreco(){
        cy.expandirClicarMenuUmNivel('Vendas e NF-e', '#menu_pesquisa_preco');
    }
    //acessar cadastro de novo Orcamento
    acessarCadastroNovoOrcamento(){
        this.acessarListagemOrcamento();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo Nfe
    acessarCadastroNovaNfe(){
        this.acessarListagemNFe();
        cy.get('#btn-novo').click();
    }


}
export default new menulateralvendapage;