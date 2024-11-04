class menulateralservico{
    //acessar listagem de clientes
    acessarListagemClientes(){
        cy.expandirClicarMenuUmNivel('Serviços e NFS-e','#clientes');
    }
    //acessar listgem de servicos
    acessarListagemServico(){
        cy.expandirClicarMenuUmNivel('Serviços e NFS-e','#serviço');
    }
    //acessar listagem de vinculo fiscais de servico
    acessarListagemVinculoServico(){
        cy.expandirClicarMenuUmNivel('Serviços e NFS-e', '#vinculos_fiscais_de_serviço');
    }
    //acessar listagem NFSe
    acessarListagemNFse(){
        cy.expandirClicarMenuDoisNiveis('Serviços e NFS-e', '#nfs-e', '.active > .nav > :nth-child(1) > #nfs-e');
    }
    //acessar configurações NFSe
    acessarConfiguracoesNFSe(){
        cy.expandirClicarMenuDoisNiveis('Serviços e NFS-e', '#nfs-e', 'a[href*="serie/nfse"]');
    }
    //acessar Ordem de serviço
    acessarlistagemOrdemServico(){
        cy.expandirClicarMenuUmNivel('Serviços e NFS-e', '#ordem_de_serviço');
    }
    //acessar cadastro de novo Cliente
    acessarCadastroNovoCliente(){
        this.acessarListagemClientes();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo NFSe
    acessarCadastroNovaNFSe(){
        this.acessarListagemNFse();
        cy.get('span').contains('Novo Cadastro').click();
        cy.get('a[href*="/nfse/cadastro-avulsa"]').contains('Avulsa').click({force: true});
    }
    //acessar cadastro de nova Ordem de servico
    acessarCadastroNovaOrdemServico(){
        this.acessarlistagemOrdemServico();
        cy.get('a[href*="ordem-servico/novo"]').contains('Novo Cadastro').click({force:true});
    }
}
export default new menulateralservico;