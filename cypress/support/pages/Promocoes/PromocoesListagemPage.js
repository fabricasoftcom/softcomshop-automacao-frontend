import PromocoesListagemLocators from "../../locators/Promocoes/PromocoesListagemLocators";
import MenulateralProdutoPage from "../menulateral/MenulateralProdutoPage";

class PromocoesListagemPage {
    /**
     * Acessa a página de listagem de promoções
     * e valida que a página foi carregada com sucesso.
     */
    acessarListagem() {
        MenulateralProdutoPage.acessarListagemGestorPromocoes();
        cy.get(PromocoesListagemLocators.tituloListagem).should('be.visible');
        cy.wait(1000); // Aguarda carregamento da tabela
    }

    /**
     * Valida que a tabela de promoções está visível.
     */
    validarTabela() {
        cy.get(PromocoesListagemLocators.tabelaPromocoes).should('be.visible');
    }

    /**
     * Valida que as colunas da tabela estão presentes.
     */
    validarColunas() {
        cy.get(PromocoesListagemLocators.colunaCodigo).should('be.visible');
        cy.get(PromocoesListagemLocators.colunaDescricao).should('be.visible');
        cy.get(PromocoesListagemLocators.colunaDataInicio).should('be.visible');
        cy.get(PromocoesListagemLocators.colunaDataFim).should('be.visible');
        cy.get(PromocoesListagemLocators.colunaStatus).should('be.visible');
    }

    /**
     * Clica no botão para abrir o formulário de pesquisa.
     */
    abrirFormularioPesquisa() {
        cy.get(PromocoesListagemLocators.btnPesquisa).should('be.visible').click();
        cy.wait(500);
    }

    /**
     * Clica no botão para iniciar um novo cadastro de promoção.
     */
    clicarNovoCadastro() {
        cy.get(PromocoesListagemLocators.btnNovoCadastro).should('be.visible').click();
        cy.url().should('include', '/produto/promocoes/novo');
    }

    /**
     * Ordena a tabela por código (crescente ou decrescente).
     * @param {string} ordem - 'crescente' ou 'decrescente'
     */
    ordenarPorCodigo(ordem = 'crescente') {
        if (ordem === 'crescente') {
            cy.get(PromocoesListagemLocators.linkOrdenarCodigoCrescente).first().click();
        } else {
            cy.get(PromocoesListagemLocators.linkOrdenarCodigoDecrescente).first().click();
        }
        cy.wait(1000); // Aguarda ordenação
    }

    /**
     * Ordena a tabela por descrição (crescente ou decrescente).
     * @param {string} ordem - 'crescente' ou 'decrescente'
     */
    ordenarPorDescricao(ordem = 'crescente') {
        if (ordem === 'crescente') {
            cy.get(PromocoesListagemLocators.linkOrdenarDescricaoCrescente).first().click();
        } else {
            cy.get(PromocoesListagemLocators.linkOrdenarDescricaoDecrescente).first().click();
        }
        cy.wait(1000); // Aguarda ordenação
    }

    /**
     * Seleciona todos os registros da tabela.
     */
    selecionarTodos() {
        cy.get(PromocoesListagemLocators.checkboxTodos).check();
    }

    /**
     * Clica no botão para excluir os registros selecionados.
     */
    clicarExcluirSelecionados() {
        cy.get(PromocoesListagemLocators.btnExcluirSelecionados).should('be.visible').click();
    }

    /**
     * Valida que a tabela contém pelo menos uma linha.
     */
    validarTabelaComDados() {
        cy.get(PromocoesListagemLocators.linhasTabela).should('have.length.at.least', 1);
    }
}

export default new PromocoesListagemPage();

