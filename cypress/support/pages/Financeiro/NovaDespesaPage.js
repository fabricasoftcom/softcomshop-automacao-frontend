import NovaDespesaLocators from "../../locators/Financeiro/NovaDespesaLocators";
import ListagemContasAPagarPage from "./ListagemContasAPagarPage";
import 'cypress-wait-until';

class NovaDespesaPage {
    visit() {
        ListagemContasAPagarPage.visit();
        ListagemContasAPagarPage.abrirNovoCadastro();
    }
    abrirModal(categoria) {
        // Valida elemento funcional ao invés de container (pode ter display: none)
        cy.get(NovaDespesaLocators.descricaoInput, { timeout: 20000 })
            .should('be.visible')
            .and('not.be.disabled');

        // Valida título no body ao invés de container
        cy.get('body', { timeout: 15000 })
            .should('contain.text', categoria);
    }

    preencherDescricao(descricao) {
        cy.get(NovaDespesaLocators.descricaoInput).clear().type(descricao);
    }

    selecionarCategoria(categoria) {
        cy.get(NovaDespesaLocators.categoriaAutocomplete)
            .type(categoria);
        cy.get('.soft-select__option').should('be.visible');
        cy.get('.soft-select__option')
            .first()
            // .filter((_, el) => el.innerText.trim().toLowerCase() === categoria.toLowerCase()) // Validação do componente, em alguns momentos ele precisa filtrar e outros não.
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
        cy.get(NovaDespesaLocators.fornecedorAutocomplete).should('be.visible').click();
        cy.get('.soft-select__option').should('be.visible').first().click();
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
        cy.get('h5', { timeout: 15000 }).contains('Contas a Pagar').should('be.visible');
    }

}

export default new NovaDespesaPage();
