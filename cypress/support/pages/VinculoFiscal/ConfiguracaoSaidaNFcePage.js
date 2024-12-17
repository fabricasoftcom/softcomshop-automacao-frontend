import ConfiguracaoSaidaNFceLocators from '../../locators/ConfiguracaoSaidaNFceLocators';

class ConfiguracaoSaidaNFcePage {
    validarModalAberto() {
        cy.get(ConfiguracaoSaidaNFceLocators.cabecalhoModal)
            .should('contain.text', 'Configuração de Saída');
    }

    preencherCampos(dadosSaida) {
        // Preencher CFOP NFCe
        cy.get(ConfiguracaoSaidaNFceLocators.campoCfopNfce).clear().type(dadosSaida.cfopNfce);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.cfopNfce).click();
    
        // Expandir a seção ICMS e preencher os campos relacionados
        this.expandirSessaoIcmsSaida();
        cy.get(ConfiguracaoSaidaNFceLocators.campoCstCsosn).clear({ force: true }).type(dadosSaida.cstCsosn);
        cy.get('#div_auto_cst_csosn .typeahead-list >> a').contains(dadosSaida.cstCsosn).click({ force: true });
        cy.get(ConfiguracaoSaidaNFceLocators.campoIcmsModalidadeBase).clear().type(dadosSaida.icmsModalidadeBase);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.icmsModalidadeBase).click();
    
        // Expandir a seção PIS/COFINS e preencher os campos relacionados
        this.expandirSessaoPisCofins();
        cy.get(ConfiguracaoSaidaNFceLocators.campoPis).clear().type(dadosSaida.pis);
        cy.get('.typeahead-list >> a').contains(dadosSaida.pis).click();
        cy.get(ConfiguracaoSaidaNFceLocators.campoPisAliquota).clear().type(dadosSaida.pisAliquota);
        cy.get(ConfiguracaoSaidaNFceLocators.campoCofins).clear().type(dadosSaida.cofins);
        cy.get('#div_auto_cofins_saida .typeahead-list >> a').contains(dadosSaida.cofins).click();
        cy.get(ConfiguracaoSaidaNFceLocators.campoCofinsAliquota).clear().type(dadosSaida.cofinsAliquota);
    }
    
    

    salvarConfiguracao() {
        cy.get(ConfiguracaoSaidaNFceLocators.botaoSalvar).click();
    }

    validarSucesso() {
        cy.get(ConfiguracaoSaidaNFceLocators.toastSucesso).should('be.visible');
    }
    expandirSessaoIcmsSaida() {
        cy.get('h5').contains('ICMS').parents('.ibox').find('.collapse-link').click();
    }
    
    expandirSessaoPisCofins() {
        cy.get('h5').contains('PIS/COFINS').parents('.ibox').find('.collapse-link').click();
    }
    
    expandirSessaoIpi() {
        cy.get('h5').contains('IPI').parents('.ibox').find('.collapse-link').click();
    }
    
}

export default new ConfiguracaoSaidaNFcePage();
