import VinculoConfiguracaoSaidaLocators from "../../locators/VinculoConfiguracaoSaidaLocators";

class VinculoConfiguracaoSaidaPage {
    abrirModalSaidaNFe() {
        // Localiza a linha onde a coluna "Documento" contém "NFE" e clica no botão "Saída"
        cy.contains('table.table-configuracao tbody tr', 'NFE') // Procura a linha com "NFE"
            .within(() => {
                cy.get('a.btn-info') // Seleciona o botão "Saída" dentro da linha
                    .click();
            });
    }
    
    
    

    validarModalAberto() {
        cy.get(VinculoConfiguracaoSaidaLocators.cabecalhoModal)
            .should('contain.text', 'Configuração de Saída');
    }

    preencherFormularioSaida(dadosSaida) {
        // Preencher os campos do formulário utilizando os locators
        cy.get(VinculoConfiguracaoSaidaLocators.campoCfopNfe).clear().type(dadosSaida.cfopNfe)
        cy.get('.typeahead-list > li > a').contains(dadosSaida.cfopNfe).click();

        this.expandirSessaoIcmsSaida();
        cy.get(VinculoConfiguracaoSaidaLocators.campoCstCsosn).clear({ force: true }).type(dadosSaida.cstCsosn);
        cy.get('#div_auto_cst_csosn > .typeahead-container > .typeahead-result > .typeahead-list >> a').contains(dadosSaida.cstCsosn).click({force: true});
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsModalidadeBase).clear().type(dadosSaida.icmsModalidadeBase);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.icmsModalidadeBase).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsAcrescimo).clear().type(dadosSaida.icmsAcrescimo);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsReducao).clear().type(dadosSaida.icmsReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsOrigem).select(dadosSaida.icmsOrigem);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStModalidadeBase).clear().type(dadosSaida.icmsStModalidadeBase);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.icmsStModalidadeBase).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStMva).clear().type(dadosSaida.icmsStMva);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStAliquota).clear().type(dadosSaida.icmsStAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStReducao).clear().type(dadosSaida.icmsStReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsValorPauta).clear().type(dadosSaida.icmsValorPauta);

        this.expandirSessaoPisCofins();
        cy.get(VinculoConfiguracaoSaidaLocators.campoPis).clear().type(dadosSaida.pis);
        cy.get('.typeahead-list >> a').contains(dadosSaida.pis).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoPisAliquota).clear().type(dadosSaida.pisAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofins).clear().type(dadosSaida.cofins);
        cy.get('#div_auto_cofins_saida > .typeahead-container > .typeahead-result > .typeahead-list >> a').contains(dadosSaida.cofins).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofinsAliquota).clear().type(dadosSaida.cofinsAliquota);

        this.expandirSessaoIpi();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIpi).clear().type(dadosSaida.ipi);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.ipi).click();
    }

    salvarFormulario() {
        cy.get(VinculoConfiguracaoSaidaLocators.botaoSalvar).click();
    }

    validarSalvamento() {
        cy.get(VinculoConfiguracaoSaidaLocators.toastSucesso).should('be.visible');
    }
    expandirSessaoIcmsSaida() {
        // Localiza a seção ICMS pelo título e clica no botão de expansão
        cy.get(VinculoConfiguracaoSaidaLocators.icmsSectionTitle)
            .contains('ICMS') // Encontra o título "ICMS"
            .parents('.ibox') // Sobe ao contêiner principal da seção
            .find(VinculoConfiguracaoSaidaLocators.icmsCollapseLink) // Encontra o botão de expansão
            .click();

        // Aguarda a expansão da seção e valida que está visível
        cy.get(VinculoConfiguracaoSaidaLocators.icmsContent)
            .should('be.visible') // Verifica se o conteúdo está visível
            .and('not.have.css', 'display', 'none'); // Valida que não está oculto
    }
    expandirSessaoPisCofins() {
        // Localiza a seção PIS/COFINS pelo título e clica no botão de expansão
        cy.get(VinculoConfiguracaoSaidaLocators.pisCofinsSectionTitle)
            .contains('PIS/COFINS') // Encontra o título "PIS/COFINS"
            .parents('.ibox') // Sobe ao contêiner principal da seção
            .find(VinculoConfiguracaoSaidaLocators.pisCofinsCollapseLink) // Encontra o botão de expansão
            .click();
    
        // Aguarda a expansão da seção e valida que está visível
        cy.get(VinculoConfiguracaoSaidaLocators.pisCofinsContent)
            .should('be.visible') // Verifica se o conteúdo está visível
            .and('not.have.css', 'display', 'none'); // Valida que não está oculto
    }
    expandirSessaoIpi() {
        // Localiza a seção IPI pelo título e clica no botão de expansão
        cy.get(VinculoConfiguracaoSaidaLocators.ipiSectionTitle)
            .contains('IPI') // Encontra o título "IPI"
            .parents('.ibox') // Sobe ao contêiner principal da seção
            .find(VinculoConfiguracaoSaidaLocators.ipiCollapseLink) // Encontra o botão de expansão
            .click();
    
        // Aguarda a expansão da seção e valida que está visível
        cy.get(VinculoConfiguracaoSaidaLocators.ipiContent)
            .should('be.visible') // Verifica se o conteúdo está visível
            .and('not.have.css', 'display', 'none'); // Valida que não está oculto
    }
    abrirModalSaidaNFCe() {
        cy.get(VinculoConfiguracaoSaidaLocators.tabelaConfiguracaoFiscal)
            .filter((index, element) => {
                // Filtra as linhas onde a coluna "Documento" contém "NFCe"
                return Cypress.$(element)
                    .find(VinculoConfiguracaoSaidaLocators.documentoColuna)
                    .text()
                    .trim() === 'NFCe';
            })
            .first() // Seleciona a primeira linha filtrada
            .find(VinculoConfiguracaoSaidaLocators.botaoSaida) // Localiza o botão "Saída" na linha
            .click(); // Realiza o clique
    }
}

export default new VinculoConfiguracaoSaidaPage();
