class menulateralfinanceiropage{
    //acessar listagem de contas
    acessarListagemContas(){
        cy.expandirClicarMenuUmNivel('Financeiro','#contas');
    }
    //acessar transferencia de contas
    acessarTransferenciaContas(){
        cy.expandirClicarMenuUmNivel('Financeiro','#transferência_entre_contas');
    }
    //acessar Lançamento Conta
    acessarLancamentoConta(){
        cy.expandirClicarMenuUmNivel('Financeiro', '#lançamento_conta');
    }
    //acessar Contas a pagar
    acessarContasPagar(){
        cy.expandirClicarMenuUmNivel('Financeiro', '#contas_a_pagar');
    }
    //acessar contas a receber receita
    acessarListagemContasReceberReceita(){
        cy.expandirClicarMenuDoisNiveis('Financeiro','#contas_a_receber', '#receita');
    }
    //acessar contas a receber Exportar Remessa
    acessarContasReceberRemessa(){
        cy.expandirClicarMenuDoisNiveis('Financeiro','#contas_a_receber', '#exportar_remessa');
    }
    //acessar contas a receber - Receber retorno
    acessarContasReceberRetorno(){
        cy.expandirClicarMenuDoisNiveis('Financeiro','#contas_a_receber', '#receber_retorno');
    }
    //acessar Categorias
    acessarCategorias(){
        cy.expandirClicarMenuUmNivel('Financeiro','#categorias');
    }
    //acessar FLuxo
    acessarFluxo(){
        cy.expandirClicarMenuUmNivel('Financeiro','#fluxo');
    }
    //acessar DRE
    acessarDRE(){
        cy.expandirClicarMenuUmNivel('Financeiro','#dre');
    }
    //acessar Extrato
    acessarExtrato(){
        cy.expandirClicarMenuUmNivel('Financeiro','#extrato');
    }
    //acessar painel PIX
    acessarPainelPix(){
        cy.expandirClicarMenuUmNivel('Financeiro','#painel_pix');
    }
    //acessar estorno PIX
    acessarEstornoPix(){
        cy.expandirClicarMenuUmNivel('Financeiro', '#estorno_pix');
    }
    //acessar cadastro de nova conta (corrente)
    acessarCadastrNovaConta(){
        this.acessarListagemContas();
        cy.get('a[href*="/integracao-bancaria/conta/novo"]').click({force:true});
        cy.get('a[href*="/integracao-bancaria/conta/novo/conta-corrente"]').click({force:true});
    }
    //acessar cadastro de novo contas a pagar
    acessarCadastroNovoContasPagar(){
        this.acessarContasPagar();
        cy.get('button[class="btn btn-warning btn-sm"]').contains('Novo cadastro').click();
    }
    //acessar cadastro de nova categoria
    acessarCadastroNovaCategoria(){
        this.acessarCategorias();
        cy.get('button[class="btn btn-warning "]').contains('Nova Categoria de Receita').click();
        cy.get('button[class="btn btn-default "]').contains('Voltar').click();
        cy.get('button[class="btn btn-warning "]').contains('Nova Categoria de Despesa').click();
   
    }

}
export default new menulateralfinanceiropage;