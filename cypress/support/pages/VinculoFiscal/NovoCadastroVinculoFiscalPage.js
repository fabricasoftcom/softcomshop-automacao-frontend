import NovoCadastroVinculoFiscalLocators from "../../locators/NovoCadastroVinculoFiscalLocators";
import VinculoFiscalListagemPage from "./VinculoFiscalListagemPage";

class NovoCadastroVinculoFiscalPage {
    visit() {
        VinculoFiscalListagemPage.visit();
        VinculoFiscalListagemPage.novoCadastro();
    }

    preencherNomeVinculo(nome) {
        cy.get(NovoCadastroVinculoFiscalLocators.nomeVinculoInput).type(nome);
    }

    selecionarTipoItem(tipo) {
        cy.get(NovoCadastroVinculoFiscalLocators.tipoItemAutocomplete).type(tipo);
        cy.get(NovoCadastroVinculoFiscalLocators.resultadoTipoItem).contains(tipo).click();
    }

    salvarVinculo() {
        cy.get(NovoCadastroVinculoFiscalLocators.salvarButton).click();
    }

    voltar() {
        cy.get(NovoCadastroVinculoFiscalLocators.voltarButton).click();
    }

    verificarFormularioVisivel() {
        cy.get(NovoCadastroVinculoFiscalLocators.formVinculos).should('be.visible');
    }

    verificarToastSucesso() {
        cy.get(NovoCadastroVinculoFiscalLocators.notificacaoSucesso).should('be.visible');
    }

    verificarTituloVinculoCriado(nomeVinculo) {
        cy.get(NovoCadastroVinculoFiscalLocators.tituloVinculoCriado).should('contain.text', nomeVinculo);
    }

    verificarBotaoVoltar() {
        cy.get(NovoCadastroVinculoFiscalLocators.voltarButton)
            .should('be.visible')
            .and('have.attr', 'href')
            .and('include', '/vinculos-fiscais');
    }

    verificarTabelaConfiguracoes() {
        cy.get(NovoCadastroVinculoFiscalLocators.tabelaConfiguracoes)
            .find('tbody tr')
            .should('have.length.greaterThan', 0);
    }
}

export default new NovoCadastroVinculoFiscalPage();
