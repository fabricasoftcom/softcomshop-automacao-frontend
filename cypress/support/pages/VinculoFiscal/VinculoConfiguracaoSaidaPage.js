import VinculoConfiguracaoSaidaLocators from "../../locators/VinculoConfiguracaoSaidaLocators";

class VinculoConfiguracaoSaidaPage {
    /**
     * Abre o modal de Configuração de Saída para NFe.
     * Localiza a linha com o documento "NFE" e clica no botão "Saída".
     */
    abrirModalSaidaNFe() {
        cy.contains('table.table-configuracao tbody tr', 'NFE') // Procura a linha com "NFE"
            .within(() => {
                cy.get('a.btn-info').click(); // Clica no botão "Saída" dentro da linha
            });
    }

    /**
     * Abre o modal de Configuração de Saída para NFCe.
     * Filtra a tabela e seleciona a primeira linha com "NFCe".
     */
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
            .find(VinculoConfiguracaoSaidaLocators.botaoSaida)
            .click(); // Realiza o clique
    }

    /**
     * Valida se o modal de Configuração de Saída foi aberto corretamente.
     */
    validarModalAberto() {
        cy.get(VinculoConfiguracaoSaidaLocators.cabecalhoModal)
            .should('contain.text', 'Configuração de Saída');
    }

    /**
     * Preenche o formulário de Configuração de Saída com os dados fornecidos.
     * @param {object} dadosSaida - Dados necessários para o preenchimento do formulário.
     */
    preencherFormularioSaida(dadosSaida) {
        // Preencher CFOP NFe
        cy.get(VinculoConfiguracaoSaidaLocators.campoCfopNfe).clear().type(dadosSaida.cfopNfe);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.cfopNfe).click();

        // Expandir seção ICMS e preencher os campos
        this.expandirSessaoIcmsSaida();
        cy.get(VinculoConfiguracaoSaidaLocators.campoCstCsosn).clear({ force: true }).type(dadosSaida.cstCsosn);
        cy.get('#div_auto_cst_csosn > .typeahead-container > .typeahead-result > .typeahead-list >> a')
            .contains(dadosSaida.cstCsosn).click({ force: true });
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsModalidadeBase).clear().type(dadosSaida.icmsModalidadeBase);
        cy.get('#div_auto_icms_modalidade_base > .typeahead-container > .typeahead-result > .typeahead-list').contains(dadosSaida.icmsModalidadeBase).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsAcrescimo).clear().type(dadosSaida.icmsAcrescimo);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsReducao).clear().type(dadosSaida.icmsReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsOrigem).select(dadosSaida.icmsOrigem);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStModalidadeBase).clear().type(dadosSaida.icmsStModalidadeBase);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.icmsStModalidadeBase).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStMva).clear().type(dadosSaida.icmsStMva);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStAliquota).clear().type(dadosSaida.icmsStAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsStReducao).clear().type(dadosSaida.icmsStReducao);
        cy.get(VinculoConfiguracaoSaidaLocators.campoIcmsValorPauta).clear().type(dadosSaida.icmsValorPauta);

        // Expandir seção PIS/COFINS e preencher os campos
        this.expandirSessaoPisCofins();
        cy.get(VinculoConfiguracaoSaidaLocators.campoPis).clear().type(dadosSaida.pis);
        cy.get('.typeahead-list >> a').contains(dadosSaida.pis).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoPisAliquota).clear().type(dadosSaida.pisAliquota);
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofins).clear().type(dadosSaida.cofins);
        cy.get('#div_auto_cofins_saida > .typeahead-container > .typeahead-result > .typeahead-list >> a')
            .contains(dadosSaida.cofins).click();
        cy.get(VinculoConfiguracaoSaidaLocators.campoCofinsAliquota).clear().type(dadosSaida.cofinsAliquota);

        // Expandir seção IPI e preencher o campo
        this.expandirSessaoIpi();
        cy.get(VinculoConfiguracaoSaidaLocators.campoIpi).clear().type(dadosSaida.ipi);
        cy.get('.typeahead-list > li > a').contains(dadosSaida.ipi).click();
    }

    /**
     * Clica no botão "Salvar" para enviar o formulário preenchido.
     */
    salvarFormulario() {
        cy.get(VinculoConfiguracaoSaidaLocators.botaoSalvar).click();
    }

    /**
     * Valida se a mensagem de sucesso foi exibida após o salvamento.
     */
    validarSalvamento() {
        cy.get(VinculoConfiguracaoSaidaLocators.toastSucesso).should('be.visible');
    }

    /**
     * Expande a seção ICMS para visualização e preenchimento dos campos.
     */
    expandirSessaoIcmsSaida() {
        cy.get(VinculoConfiguracaoSaidaLocators.icmsSectionTitle)
            .contains('ICMS').parents('.ibox')
            .find(VinculoConfiguracaoSaidaLocators.icmsCollapseLink).click();
        cy.get(VinculoConfiguracaoSaidaLocators.icmsContent).should('be.visible');
    }

    /**
     * Expande a seção PIS/COFINS para visualização e preenchimento dos campos.
     */
    expandirSessaoPisCofins() {
        cy.get(VinculoConfiguracaoSaidaLocators.pisCofinsSectionTitle)
            .contains('PIS/COFINS').parents('.ibox')
            .find(VinculoConfiguracaoSaidaLocators.pisCofinsCollapseLink).click();
        cy.get(VinculoConfiguracaoSaidaLocators.pisCofinsContent).should('be.visible');
    }

    /**
     * Expande a seção IPI para visualização e preenchimento dos campos.
     */
    expandirSessaoIpi() {
        cy.get(VinculoConfiguracaoSaidaLocators.ipiSectionTitle)
            .contains('IPI').parents('.ibox')
            .find(VinculoConfiguracaoSaidaLocators.ipiCollapseLink).click();
        cy.get(VinculoConfiguracaoSaidaLocators.ipiContent).should('be.visible');
    }
}

export default new VinculoConfiguracaoSaidaPage();
