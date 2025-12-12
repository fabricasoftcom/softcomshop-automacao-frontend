import PrecosListagemLocators from "../../locators/Precos/PrecosListagemLocators";
import MenulateralProdutoPage from "../menulateral/MenulateralProdutoPage";

class PrecosListagemPage {
    /**
     * Acessa a página de listagem de preços
     * e valida que a página foi carregada com sucesso.
     */
    acessarListagem() {
        MenulateralProdutoPage.acessarListagemGestorPrecos();
        cy.get('#loading').should('not.exist');
        cy.get(PrecosListagemLocators.tituloListagem).should('be.visible');
        cy.wait(1000); // Aguarda carregamento da tabela
    }

    /**
     * Valida que a tabela de preços está visível.
     */
    validarTabela() {
        cy.get(PrecosListagemLocators.tabelaPrecos).should('be.visible');
    }

    /**
     * Valida que as colunas da tabela estão presentes.
     */
    validarColunas() {
        cy.get(PrecosListagemLocators.colunaCodigo).should('be.visible');
        cy.get(PrecosListagemLocators.colunaDataLancamento).should('be.visible');
        cy.get(PrecosListagemLocators.colunaTipo).should('be.visible');
        cy.get(PrecosListagemLocators.colunaOperacao).should('be.visible');
        cy.get(PrecosListagemLocators.colunaTabelaPreco).should('be.visible');
    }

    /**
     * Clica no botão para abrir o formulário de pesquisa.
     */
    abrirFormularioPesquisa() {
        cy.get(PrecosListagemLocators.btnPesquisa).should('be.visible').click();
        cy.wait(500);
    }

    /**
     * Clica no botão para iniciar um novo cadastro de preço.
     */
    clicarNovoCadastro() {
        cy.get(PrecosListagemLocators.btnNovoCadastro).should('be.visible').click();
        cy.url().should('include', '/produto/gestor-preco/novo');
    }

    /**
     * Seleciona todos os registros da tabela.
     */
    selecionarTodos() {
        cy.get(PrecosListagemLocators.checkboxTodos).check();
    }

    /**
     * Clica no botão para excluir os registros selecionados.
     */
    clicarExcluirSelecionados() {
        cy.get(PrecosListagemLocators.btnExcluirSelecionados).should('be.visible').click();
    }

    /**
     * Valida que a tabela contém pelo menos uma linha.
     */
    validarTabelaComDados() {
        cy.get(PrecosListagemLocators.linhasTabela).should('have.length.at.least', 1);
    }
}

export default new PrecosListagemPage();

