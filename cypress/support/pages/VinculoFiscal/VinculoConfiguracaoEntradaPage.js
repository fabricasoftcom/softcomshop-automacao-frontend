import VinculoConfiguracaoEntradaLocators from '../../locators/VinculoConfiguracaoEntradaLocators';

class VinculoConfiguracaoEntradaPage {
    /**
     * Abre o modal de Configuração de Entrada na primeira linha da tabela
     * e valida que o modal foi aberto com sucesso.
     */
    abrirModalEntrada() {
        cy.get('table.table-configuracao tbody tr:first-child')
            .find('a.btn-success') // Localiza o botão "Entrada" na primeira linha
            .click();
        cy.get(VinculoConfiguracaoEntradaLocators.modalContent).should('be.visible'); // Valida abertura do modal
    }

    /**
     * Valida se o modal de Configuração de Entrada está visível
     * e contém o título correto.
     */
    validarModalAberto() {
        cy.get(VinculoConfiguracaoEntradaLocators.modalHeader)
            .should('contain.text', 'Configuração de Entrada'); // Valida o título do modal
    }

    /**
     * Preenche o formulário de Configuração de Entrada com os dados fornecidos.
     * @param {object} dados - Dados para preenchimento (cfop, pis, pisAliquota, cofins, cofinsAliquota, ipi)
     */
    preencherFormularioEntrada(dados) {
        // Preencher o CFOP com autocomplete
        cy.get(VinculoConfiguracaoEntradaLocators.cfopInput).clear().type(dados.cfop);
        cy.get('.typeahead-list > li > a').contains(dados.cfop).click();

        // Expandir a seção PIS/COFINS e preencher os campos
        this.expandirSessaoPisCofins();
        cy.get(VinculoConfiguracaoEntradaLocators.pisInput).clear().type(dados.pis);
        cy.get('.typeahead-list').should('be.visible'); // Valida a lista de autocomplete
        cy.get('.typeahead-list > :nth-child(1) > a').contains(dados.pis).click();
        cy.get(VinculoConfiguracaoEntradaLocators.pisAliquotaInput).clear().type(dados.pisAliquota);

        cy.get(VinculoConfiguracaoEntradaLocators.cofinsInput).clear().type(dados.cofins);
        cy.get('.typeahead-list').should('be.visible'); // Valida lista de autocomplete
        cy.get('#div_auto_cofins_entrada > .typeahead-container > .typeahead-result > .typeahead-list > li > a')
            .contains(dados.cofins)
            .click({ force: true });
        cy.get(VinculoConfiguracaoEntradaLocators.cofinsAliquotaInput).clear().type(dados.cofinsAliquota);

        // Expandir a seção IPI e preencher o campo
        this.expandirSessaoIpi();
        cy.get(VinculoConfiguracaoEntradaLocators.ipiInput).clear().type(dados.ipi);
        cy.get('#div_auto_ipi_entrada > .typeahead-container > .typeahead-result > .typeahead-list > li > a')
            .contains(dados.ipi)
            .click();
    }

    /**
     * Clica no botão "Salvar" para enviar o formulário preenchido.
     */
    salvarFormulario() {
        cy.get(VinculoConfiguracaoEntradaLocators.salvarButton).click();
    }

    /**
     * Valida se a notificação de sucesso foi exibida após o salvamento.
     */
    validarSalvamento() {
        cy.get(VinculoConfiguracaoEntradaLocators.toastSucesso)
            .should('be.visible'); // Valida a notificação de sucesso
    }

    /**
     * Expande a seção PIS/COFINS para que os campos fiquem visíveis.
     * Valida se a expansão ocorreu com sucesso.
     */
    expandirSessaoPisCofins() {
        cy.get(VinculoConfiguracaoEntradaLocators.expandirPisCofinsButton).click();
        cy.get('.ibox-content').should('not.have.css', 'display', 'none'); // Valida se a seção foi expandida
    }

    /**
     * Expande a seção IPI para que os campos fiquem visíveis.
     * Valida se a expansão ocorreu com sucesso.
     */
    expandirSessaoIpi() {
        cy.get(VinculoConfiguracaoEntradaLocators.expandirIpiButton).click();
        cy.get('.ibox-content:has(label[for="auto_ipi_entrada"])').should('not.have.css', 'display', 'none');
    }
}

export default new VinculoConfiguracaoEntradaPage();
