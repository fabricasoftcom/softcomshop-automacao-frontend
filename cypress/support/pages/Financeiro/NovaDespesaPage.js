import NovaDespesaLocators from "../../locators/NovaDespesaLocators";
import ListagemContasAPagarPage from "./ListagemContasAPagarPage";
import 'cypress-wait-until';

class NovaDespesaPage {
    visit() {
        ListagemContasAPagarPage.visit();
        ListagemContasAPagarPage.abrirNovoCadastro();
    }
    abrirModal() {
        cy.get(NovaDespesaLocators.modalContent).should('be.visible');
        cy.get(NovaDespesaLocators.modalTitle).should('contain', 'Nova Despesa');
    }

    preencherDescricao(descricao) {
        cy.get(NovaDespesaLocators.descricaoInput).clear().type(descricao);
    }

    selecionarCategoria(categoria) {
        cy.get(NovaDespesaLocators.categoriaAutocomplete)
            .clear()
            .type(categoria);
        cy.get('#autocomplete_category_list').should('be.visible');
        cy.contains('.category_result', categoria).click();
    }

    selecionarConta(conta = 'CAIXA') {
        cy.get(NovaDespesaLocators.modalContent)
            .find(NovaDespesaLocators.contaAutocomplete)
            .clear()
            .type(conta, { force: true });
        cy.get(NovaDespesaLocators.modalContent)
            .find('#autocomplete_bank_account_list')
            .should('be.visible');
        cy.contains('.bank_account_result', conta).click();
    }

    selecionarFormaPagamento(forma) {
        cy.get(NovaDespesaLocators.formaPagamentoAutocomplete)
            .clear()
            .type(forma);
        cy.get('#autocomplete_payment_method_list').should('be.visible');
        cy.contains('.payment_method_result', forma).click();
    }

    selecionarDataCompetencia(data) {
        cy.get(NovaDespesaLocators.dataCompetenciaInput).clear().type(data);
    }

    selecionarDataVencimento(data) {
        cy.get(NovaDespesaLocators.dataVencimentoInput).clear().type(data);
    }

    preencherValor(valor) {
        // Localiza a div que contém o campo de valor e, em seguida, localiza o input dentro dela
        cy.get(NovaDespesaLocators.divValor)
            .find(NovaDespesaLocators.valorInputDentroDiv)
            .should('be.visible')
            .clear()
            .type(valor, { force: true });
    }
    selecionarFornecedor(fornecedor = 'fornecedor 01') {
        cy.get(NovaDespesaLocators.fornecedorAutocomplete)
            .type(fornecedor,{ force: true });
        cy.get('#autocomplete_provider_addon').click();
        cy.wait(5000)
        cy.get('.provider_results > :nth-child(1)').click();
    }

    selecionarTipoDocumento(tipo) {
        cy.get(NovaDespesaLocators.tipoDocumentoAutocomplete)
            .clear()
            .type(tipo);
        cy.get('#autocomplete_document_type_list').should('be.visible');
        cy.contains('.document_type_result', tipo).click();
    }

    preencherNumeroDocumento(numero) {
        cy.get(NovaDespesaLocators.numeroDocumentoInput).clear().type(numero);
    }

    clicarSalvar() {
        cy.get('h5', {timeout: 15000}).contains('Despesa').should('be.visible');
    }


}

export default new NovaDespesaPage();
