import VinculoConfiguracaoSaidaLocators from "../../locators/VinculoConfiguracaoSaidaLocators";

class VinculoConfiguracaoSaidaPage {
    abrirModalSaida() {
        // Clique no botão "Saída" da primeira linha da tabela
        cy.get('table tbody tr:first-child a.btn-info').click();
    }

    validarCabecalhoModal() {
        cy.get(VinculoConfiguracaoSaidaLocators.cabecalhoModal)
            .should('contain.text', 'Configuração de Saída');
    }

    selecionarModelo(modelo) {
        cy.get(VinculoConfiguracaoSaidaLocators.dropdownModelo).select(modelo);
    }

    selecionarUfDestino(uf) {
        cy.get(VinculoConfiguracaoSaidaLocators.dropdownUfDestino).select(uf);
    }

    selecionarRegimeTributario(regime) {
        cy.get(VinculoConfiguracaoSaidaLocators.dropdownRegimeTributario).select(regime);
    }

    preencherCfopNfe(cfop) {
        cy.get(VinculoConfiguracaoSaidaLocators.campoCfopNfe).clear().type(cfop);
    }

    salvarFormulario() {
        cy.get(VinculoConfiguracaoSaidaLocators.botaoSalvar).click();
    }

    fecharModal() {
        cy.get(VinculoConfiguracaoSaidaLocators.botaoFecharModal).click();
    }
}

export default new VinculoConfiguracaoSaidaPage();
