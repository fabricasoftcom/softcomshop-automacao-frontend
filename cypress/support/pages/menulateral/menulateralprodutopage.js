class menulateralprodutopage{
    //acessa a listagem de fornecedores
    acessarListagemFornecedores(){
        cy.expandirClicarMenuUmNivel('Compras e Estoque','#fornecedor');
    }
    //acessa a listagem de atributos
    acessarListagemAtributos(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#atributos');
    }
    //acessa a listagem de atributos
    acessarListagemVinculosFiscais(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#vinculos_fiscais');
    }
    //acessa o atualizador de dados Fiscais
    acessarAtualizadosDadosFiscais(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#atualizar_dados_fiscais');
    }
    //Acessa a listagem de Produtos
    acessarListagemProdutos(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#produto');
    }
    //acessar listagem do gestor de promoções
    acessarListagemGestorPromocoes(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#gestor_de_promoções');
    }
    //accessar listagem do gestor de preços 
    acessarListagemGestorPrecos(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#produtos','#gestor_de_preços');
    }
    //accessar listagem Nuvem Fiscal 
    acessarListagemNuvemFiscal(){
        cy.expandirClicarMenuUmNivel('Compras e Estoque','#nuvem_fiscal');
    }
    //accessar listagem Ordem de Fornecimento 
    acessarListagemOrdemFornecimento(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#gestão_de_compras','#ordem_de_fornecimento');
    }
    //accessar listagem de COmpras
    acessarListagemCompras(){
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque','#gestão_de_compras','#compras');
    }
    //accessar listagem movimentações
    acessarListagemMovimentacoes(){
        cy.expandirClicarMenuUmNivel('Compras e Estoque','#movimentações');
    }
    //acessar listagem de produção
    acessarListagemProducao(){
        cy.expandirClicarMenuUmNivel('Compras e Estoque','#produção');
    }
    //acessar listagem de balanços
    acessarListagemBalanco(){
        cy.expandirClicarMenuUmNivel('Compras e Estoque','#balanço');
    }
    //acessar cadastro de novo Atributos
    acessarCadastroNovoAtributo(){
        this.acessarListagemAtributos();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo VinculosFiscais
    acessarCadastroNovoVinculosFiscais(){
        this.acessarListagemVinculosFiscais();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo GestorPromocoes
    acessarCadastroNovoGestorPromocoes(){
        this.acessarListagemGestorPromocoes();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo GestorPrecos
    acessarCadastroNovoGestorPrecos(){
        this.acessarListagemGestorPrecos();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de nova OrdemFornecimento
    acessarCadastroNovaOrdemFornecimento(){
        this.acessarListagemOrdemFornecimento();
        cy.get('#btn-novo').click();
    }
    //acessar cadastro de novo Compra
    acessarCadastroNovaCompra(){
        this.acessarListagemCompras();
        cy.get('#btn-novo').click();
    }
    //acessar o cadastro de nova Movimentacoes
    acessarCadastroNovaMovimentacoes(){
        this.acessarListagemMovimentacoes();
        cy.get('#btn-novo').click();
    }
    //acessar o cadastro de novo Producao
    acessarCadastroNovaProducao(){
        this.acessarListagemProducao();
        cy.get('#btn-novo').click();
    }
    //acessar o cadastro de novo Balanco
    acessarCadastroNovoBalanco(){
        this.acessarListagemBalanco();
        cy.get('#btn-novo').click();
    }

}
export default new menulateralprodutopage;