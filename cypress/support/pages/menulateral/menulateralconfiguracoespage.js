class menulateralconfiguracoespage{
    //acessar listagem de empresas
    acessarListagemEmpresas(){
        cy.expandirClicarMenuUmNivel('Configurações', '#empresa');
        cy.url().should('include', '/cadastro/empresa');
    }
    //acessar listagem de funcionario
    acessarListagemFuncionarios(){
        cy.expandirClicarMenuUmNivel('Configurações', '#funcionários');
        cy.url().should('include', '/cadastro/funcionario');
    }
    //acessar listagem de usuario
    acessarListagemUsuarios(){
        cy.expandirClicarMenuUmNivel('Configurações', '#usuários');
    }
    //acessar listagem de perfis de acesso
    acessarListagemPerfisAcesso(){
        cy.expandirClicarMenuUmNivel('Configurações', '#perfis_de_acesso');
    }
    //acessar listagem de formas de pagamentos
    acessarListagemFormasPagamentos(){
        cy.expandirClicarMenuUmNivel('Configurações', '#formas_de_pagamentos');
    }
    //acessar listagem de cartões
    acessarListagemCartoes(){
        cy.expandirClicarMenuUmNivel('Configurações', '#cartões');
    }
    //acessar MOdulos
    acessarModulos(){
        cy.expandirClicarMenuUmNivel('Configurações', '#módulos');
    }
    //acessar scheme
    acessarScheme(){
        cy.expandirClicarMenuUmNivel('Configurações', '#scheme');
    }
    //acessar sincronização
    acessarSincronizacao(){
        cy.expandirClicarMenuUmNivel('Configurações', '#sincronização');
    }
    //acessar configurações de etiquetas
    acessarConfiguracoesEtiquetas(){
        cy.expandirClicarMenuUmNivel('Configurações', '#sincronização');
    }
    //atualizar permissões
    //não fiz porque ele executa uma rota de atualização de permissões mas não abre nenhuma tela especifica
    
    //acessar configurações de notificações
    acessarNotificacoes(){
        cy.expandirClicarMenuUmNivel('Configurações', '#notificações');
    }
    //acessar cadastro de nova empresa
    acessarCadastroNovaEmpresa(){
        this.acessarListagemEmpresas();
        cy.get('#btn-novo').click();
        cy.url().should('include','/novo');
    }
    
}

export default new menulateralconfiguracoespage;