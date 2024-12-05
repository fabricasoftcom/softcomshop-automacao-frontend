import novoCadastroVinculoFiscalLocators from "../../locators/NovoCadastroVinculoFiscalLocators";
import vinculoFiscalListagemPage from "./VinculoFiscalListagemPage";

class NovoCadastroVinculoFiscalPage {
    // Acessa a página de Novo Cadastro de Vínculo Fiscal
    visit() {
        vinculoFiscalListagemPage.visit();
        vinculoFiscalListagemPage.novoCadastro();
    }

    preencherNomeVinculo(nome) {
        cy.get(novoCadastroVinculoFiscalLocators.nomeVinculoInput).type(nome);
    }

    selecionarTipoItem(tipo) {
        cy.get(novoCadastroVinculoFiscalLocators.tipoItemAutocomplete).type(tipo);
        cy.get(novoCadastroVinculoFiscalLocators.tipoItemHiddenInput).should('have.value', tipo);
    }

    salvarVinculo() {
        cy.get(novoCadastroVinculoFiscalLocators.salvarButton).click();
    }

    voltar() {
        cy.get(novoCadastroVinculoFiscalLocators.voltarButton).click();
    }

    novoCadastro() {
        cy.get(novoCadastroVinculoFiscalLocators.novoCadastroButton).click();
    }

    validarForm() {
        cy.get(novoCadastroVinculoFiscalLocators.formVinculos).should('be.visible');
    }
}

export default new NovoCadastroVinculoFiscalPage();
