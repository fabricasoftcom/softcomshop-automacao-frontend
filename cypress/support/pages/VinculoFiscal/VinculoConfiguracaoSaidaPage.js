import VinculoConfiguracaoSaidaLocators from "../../locators/VinculoConfiguracaoSaidaLocators";

class VinculoConfiguracaoSaidaPage {
    abrirModalSaida() {
        // Clique no botão "Saída" da primeira linha da tabela
        cy.get(VinculoConfiguracaoSaidaLocators.botaoSaida).click();
    }

    validarModalAberto() {
        cy.get(VinculoConfiguracaoSaidaLocators.cabecalhoModal)
            .should('contain.text', 'Configuração de Saída');
    }

    preencherFormularioSaida(dadosSaida) {
        // Preencher os campos do formulário utilizando os locators
        cy.get(VinculoConfiguracaoSaidaLocators.campoCfopNfe).clear().type(dadosSaida.cfopNfe).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoCfopNfce).clear().type(dadosSaida.cfopNfce).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoCstCsosn).clear({force: true}).type(dadosSaida.cstCsosn).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsModalidadeBase).clear().type(dadosSaida.icmsModalidadeBase).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsAcrescimo).clear().type(dadosSaida.icmsAcrescimo);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsReducao).clear().type(dadosSaida.icmsReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsOrigem).select(dadosSaida.icmsOrigem);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStModalidadeBase).clear().type(dadosSaida.icmsStModalidadeBase).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStMva).clear().type(dadosSaida.icmsStMva);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStAliquota).clear().type(dadosSaida.icmsStAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStReducao).clear().type(dadosSaida.icmsStReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsValorPauta).clear().type(dadosSaida.icmsValorPauta);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIpi).clear().type(dadosSaida.ipi).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoPis).clear().type(dadosSaida.pis).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoPisAliquota).clear().type(dadosSaida.pisAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofins).clear().type(dadosSaida.cofins).type('{downarrow}{enter}');
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofinsAliquota).clear().type(dadosSaida.cofinsAliquota);
    }

    salvarFormulario() {
        cy.get(VinculoConfiguracaoSaidaLocators.botaoSalvar).click();
    }

    validarSalvamento() {
        cy.get(VinculoConfiguracaoSaidaLocators.toastSucesso).should('be.visible');
    }
}

export default new VinculoConfiguracaoSaidaPage();
