import NovoCadastroVinculoFiscalLocators from "../../locators/NovoCadastroVinculoFiscalLocators";
import VinculoFiscalListagemPage from "./VinculoFiscalListagemPage";

class NovoCadastroVinculoFiscalPage {
    /**
     * Navega até a página de Novo Cadastro de Vínculo Fiscal
     */
    visit() {
        VinculoFiscalListagemPage.visit();
        VinculoFiscalListagemPage.novoCadastro();
    }

    /**
     * Preenche o campo "Nome do Vínculo" no formulário
     * @param {string} nome - Nome do vínculo fiscal a ser inserido
     */
    preencherNomeVinculo(nome) {
        cy.get(NovoCadastroVinculoFiscalLocators.nomeVinculoInput).type(nome);
    }

    /**
     * Seleciona o tipo de item utilizando autocomplete
     * @param {string} tipo - Tipo de item a ser selecionado
     */
    selecionarTipoItem(tipo) {
        cy.get(NovoCadastroVinculoFiscalLocators.tipoItemAutocomplete).type(tipo);
        cy.get(NovoCadastroVinculoFiscalLocators.resultadoTipoItem).contains(tipo).click();
    }

    /**
     * Clica no botão "Salvar" para salvar o vínculo fiscal
     */
    salvarVinculo() {
        cy.get(NovoCadastroVinculoFiscalLocators.salvarButton).click();
    }

    /**
     * Clica no botão "Voltar" para retornar à listagem de vínculos fiscais
     */
    voltar() {
        cy.get(NovoCadastroVinculoFiscalLocators.voltarButton).click();
    }

    /**
     * Verifica se o formulário de vínculo fiscal está visível
     */
    verificarFormularioVisivel() {
        cy.get(NovoCadastroVinculoFiscalLocators.formVinculos).should('be.visible');
    }

    /**
     * Verifica se a notificação de sucesso está visível
     */
    verificarToastSucesso() {
        cy.get(NovoCadastroVinculoFiscalLocators.notificacaoSucesso).should('be.visible');
    }

    /**
     * Valida se o título do vínculo criado contém o nome correto
     * @param {string} nomeVinculo - Nome do vínculo fiscal criado
     */
    verificarTituloVinculoCriado(nomeVinculo) {
        cy.get(NovoCadastroVinculoFiscalLocators.tituloVinculoCriado).should('contain.text', nomeVinculo);
    }

    /**
     * Verifica se o botão "Voltar" está visível e com o atributo correto
     */
    verificarBotaoVoltar() {
        cy.get(NovoCadastroVinculoFiscalLocators.voltarButton)
            .should('be.visible')
            .and('have.attr', 'href')
            .and('include', '/vinculos-fiscais');
    }

    /**
     * Valida se a tabela de configurações possui pelo menos uma linha
     */
    verificarTabelaConfiguracoes() {
        cy.get(NovoCadastroVinculoFiscalLocators.tabelaConfiguracoes)
            .find('tbody tr')
            .should('have.length.greaterThan', 0);
    }

    /**
     * Seleciona o primeiro produto da lista de resultados
     */
    selecionarPrimeiroProduto() {
        // Abre o dropdown de produtos
        cy.get(NovoCadastroVinculoFiscalLocators.botaoDropdownProduto).click();

        // Aguarda e seleciona o primeiro item da lista de resultados
        cy.get(NovoCadastroVinculoFiscalLocators.listaResultadosProduto)
            .should('be.visible')
            .first()
            .click();

        // Valida se o campo hidden foi preenchido com o ID do produto
        cy.get(NovoCadastroVinculoFiscalLocators.campoHiddenProduto)
            .invoke('val')
            .should('not.be.empty');
    }

    /**
     * Clica no botão "Adicionar Produto" para incluir o produto selecionado
     */
    adicionarProduto() {
        cy.get(NovoCadastroVinculoFiscalLocators.botaoAdicionarProduto).click();
    }
}

export default new NovoCadastroVinculoFiscalPage();
