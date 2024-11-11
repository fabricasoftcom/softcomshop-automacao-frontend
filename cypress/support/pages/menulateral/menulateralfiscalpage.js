class menutlateralfiscalpage{
    //Acessar o menu lateral 'fiscal'
    expandirClicarMenuFIscal(submenu,opcaoClick){
        cy.get('#side-menu > :nth-child(7) > :nth-child(1)').click({ force: true });
        cy.get(submenu).click({ force: true });
        cy.get(opcaoClick).click({ force: true });
    };
    
    //acessar sped contador
    acessarSpedContador(){
        this.expandirClicarMenuFIscal('#sped','#contador');
    }
    //acessar sped configurações
    acessarSpedConfiguracoes(){
        this.expandirClicarMenuFIscal('#sped','.active > .nav > :nth-child(2) > #configurações');
    }
    //acessar sped Gerar arquivo
    acessarSpedGerarArquivo(){
        this.expandirClicarMenuFIscal('#sped','#gerar_arquivo');
    }
    //acessar sped Valores Declaratorios
    acessarSpedValoresDeclaratorios(){
        this.expandirClicarMenuFIscal('#sped','#valores_declaratórios');
    }
    //acessar sped inventario base
    acessarSpedInventarioBase(){
        this.expandirClicarMenuFIscal('#sped','#inventário_base');
    }
    //acessar sped icms ajuste
    acessarSpedIcmsAjuste(){
        this.expandirClicarMenuFIscal('#sped','#icms_ajuste_apuração');
    }
    //acessar sped Ipi Ajuste
    acessarSpedIpiAjuste(){
        this.expandirClicarMenuFIscal('#sped','#ipi_ajuste_apuração');
    }
    //acessar Sintegra gerar arquivo
    acessarSintegraGerarArquivo(){
        this.expandirClicarMenuFIscal('#sintegra','#gerar_arquivo');
    }
    //acessar importador NFce
    acessarImportadorNFce(){
        //cy.expandirClicarMenuUmNivel('#importar_nfce');
        cy.get('#side-menu > :nth-child(7) > :nth-child(1)').click({ force: true });
        cy.get('#importar_nfce').click({ force: true });
    }

}
export default new menutlateralfiscalpage;