import VinculoConfiguracaoEntradaLocators from '../../locators/VinculoConfiguracaoEntradaLocators';

class VinculoConfiguracaoEntradaPage {
    abrirModalEntrada() {
        cy.get('table.table-configuracao tbody tr:first-child')
            .find('a.btn-success')
            .click();
        cy.get(VinculoConfiguracaoEntradaLocators.modalContent).should('be.visible');
    }

    validarModalAberto() {
        cy.get(VinculoConfiguracaoEntradaLocators.modalHeader).should('contain.text', 'Configuração de Entrada');
    }

    preencherFormularioEntrada(dados) {
        cy.get(VinculoConfiguracaoEntradaLocators.cfopInput).clear().type(dados.cfop);
        cy.get('.typeahead-list > li > a').contains(dados.cfop).click();
        this.expandirSessaoPisCofins();
        cy.get(VinculoConfiguracaoEntradaLocators.pisInput).clear().type(dados.pis);
        cy.get('.typeahead-list').should('be.visible');
        cy.get('.typeahead-list > :nth-child(1) > a').contains(dados.pis).click();
        cy.get(VinculoConfiguracaoEntradaLocators.pisAliquotaInput).clear().type(dados.pisAliquota);
        cy.get(VinculoConfiguracaoEntradaLocators.cofinsInput).clear().type(dados.cofins);
        cy.get('.typeahead-list').should('be.visible');
        cy.get('#div_auto_cofins_entrada > .typeahead-container > .typeahead-result > .typeahead-list > li > a').contains(dados.cofins).click({force: true});
        cy.get(VinculoConfiguracaoEntradaLocators.cofinsAliquotaInput).clear().type(dados.cofinsAliquota);
        this.expandirSessaoIpi();
        cy.get(VinculoConfiguracaoEntradaLocators.ipiInput).clear().type(dados.ipi);
        cy.get('#div_auto_ipi_entrada > .typeahead-container > .typeahead-result > .typeahead-list > li > a').contains(dados.ipi).click();
    }

    salvarFormulario() {
        cy.get(VinculoConfiguracaoEntradaLocators.salvarButton).click();
    }

    validarSalvamento() {
        cy.get(VinculoConfiguracaoEntradaLocators.toastSucesso).should('be.visible');
    }

    expandirSessaoPisCofins() {
        cy.get(VinculoConfiguracaoEntradaLocators.expandirPisCofinsButton).click();
        cy.get('.ibox-content').should('not.have.css', 'display', 'none'); // Valida se expandiu
    }
    expandirSessaoIpi() {
        cy.get(VinculoConfiguracaoEntradaLocators.expandirIpiButton).click();
        cy.get('.ibox-content:has(label[for="auto_ipi_entrada"])').should('not.have.css', 'display', 'none');
    }
}

export default new VinculoConfiguracaoEntradaPage();
