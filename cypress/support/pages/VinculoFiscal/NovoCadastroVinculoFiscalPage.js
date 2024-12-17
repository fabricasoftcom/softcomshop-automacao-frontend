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
    selecionarPrimeiroProduto() {
        // Clica no botão para abrir o dropdown de produtos
        cy.get(NovoCadastroVinculoFiscalLocators.botaoDropdownProduto).click();

        // Aguarda os resultados carregarem e seleciona o primeiro item
        cy.get(NovoCadastroVinculoFiscalLocators.listaResultadosProduto)
            .should('be.visible') // Garante que a lista está visível
            .first() // Seleciona o primeiro item da lista
            .click();

        // Valida se o campo hidden foi preenchido com o ID do produto
        cy.get(NovoCadastroVinculoFiscalLocators.campoHiddenProduto)
            .invoke('val')
            .should('not.be.empty');
    }

    adicionarProduto() {
        // Clica no botão para adicionar o produto selecionado
        cy.get(NovoCadastroVinculoFiscalLocators.botaoAdicionarProduto).click();
    }
}

export default new NovoCadastroVinculoFiscalPage();
