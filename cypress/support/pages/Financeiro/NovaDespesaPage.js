import NovaDespesaLocators from "../../locators/NovaDespesaLocators";
import ListagemContasAPagarPage from "./ListagemContasAPagarPage";
import 'cypress-wait-until';

class NovaDespesaPage {
    visit() {
        ListagemContasAPagarPage.visit();
        ListagemContasAPagarPage.abrirNovoCadastro();
    }
    abrirModal(categoria) {
        cy.get(NovaDespesaLocators.modalContent).should('be.visible');
        cy.get(NovaDespesaLocators.modalTitle)
            .invoke('text')
            .then((text) => {
                expect(text.toLowerCase()).to.contain(categoria.toLowerCase());
            });
    }

    preencherDescricao(descricao) {
        cy.get(NovaDespesaLocators.descricaoInput).clear().type(descricao);
    }

    selecionarCategoria(categoria) {
        cy.get(NovaDespesaLocators.categoriaAutocomplete)
            .type(categoria);
        cy.get('.soft-select__option').should('be.visible');
        cy.get('.soft-select__option')
            // .filter((_, el) => el.innerText.trim().toLowerCase() === categoria.toLowerCase())
            .click();
    }

    selecionarConta(conta = 'CAIXA') {
        cy.get(NovaDespesaLocators.contaAutocomplete)
            .type(conta);
        cy.get(NovaDespesaLocators.modalContent)
            .find('.soft-select__option')
            .should('be.visible');
        cy.get('.soft-select__option').first().click();
    }

    selecionarFormaPagamento(forma) {
        cy.get(NovaDespesaLocators.formaPagamentoAutocomplete)
            .type(forma);
        cy.get('.soft-select__option').should('be.visible');
        cy.get('.soft-select__option').first().click();
    }

    selecionarDataCompetencia(data) {
        cy.get(NovaDespesaLocators.dataCompetenciaInput).clear().type(data);
    }

    selecionarDataVencimento(data) {
        cy.get(NovaDespesaLocators.dataVencimentoInput).clear().type(data);
    }

    preencherValor(valor) {
        // Localiza a div que contém o campo de valor e, em seguida, localiza o input dentro dela
        cy.get(NovaDespesaLocators.valorInputDentroDiv)
            .should('be.visible')
            .clear()
            .type(valor, { force: true });
    }
    selecionarFornecedor() {
        cy.get(NovaDespesaLocators.fornecedorAutocomplete).click();
        cy.get('.soft-select__option').first().click();
    }

    selecionarTipoDocumento(tipo) {
        cy.get(NovaDespesaLocators.tipoDocumentoAutocomplete)
            .type(tipo);
        cy.get('.soft-select__option').should('be.visible');
        cy.get('.soft-select__option').first().click();
    }

    preencherNumeroDocumento(numero) {
        cy.get(NovaDespesaLocators.numeroDocumentoInput).clear().type(numero);
    }

    clicarSalvar() {
        cy.get(NovaDespesaLocators.salvarButton).click();
        cy.get('#loading').should('not.exist');
        cy.get('h5', {timeout: 15000}).contains('Contas a Pagar').should('be.visible');
    }

}

export default new NovaDespesaPage();
