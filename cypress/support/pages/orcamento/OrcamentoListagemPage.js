import OrcamentoListagemLocators from "../../locators/OrcamentoListagemLocators";

class OrcamentoListagemPage {
    visit() {
        cy.visit('/orcamento');
        cy.get('h5').should('contain', 'Listagem');
    }

    pesquisar(codigo, cliente, status) {
        cy.get(OrcamentoListagemLocators.campoCodigo).clear().type(codigo);
        cy.get(OrcamentoListagemLocators.campoCliente).clear().type(cliente);
        cy.get(OrcamentoListagemLocators.campoStatus).select(status);
        cy.get(OrcamentoListagemLocators.btnPesquisar).click();
    }

    novoCadastro() {
        cy.get(OrcamentoListagemLocators.btnNovoCadastro).click();
    }

    selecionarTodosRegistros() {
        cy.get(OrcamentoListagemLocators.checkboxTodos).check();
    }

    cancelarSelecionados() {
        cy.get(OrcamentoListagemLocators.btnCancelarSelecionados).click();
        cy.get(OrcamentoListagemLocators.modalConfirmacao).should('be.visible');
    }

    confirmarCancelamento() {
        cy.get(OrcamentoListagemLocators.botaoConfirmarExclusao).click();
    }

    verificarTabelaVazia() {
        cy.get(OrcamentoListagemLocators.linhasTabela).should('not.exist');
    }

    validarMensagemCancelamento() {
        cy.get(OrcamentoListagemLocators.toastAlerta).should('contain', 'cancelado');
    }

    verificarQuantidadeLinhasTabela(qtd) {
        cy.get(OrcamentoListagemLocators.linhasTabela).should('have.length', qtd);
    }

    verificarLinhaContemTexto(index, texto) {
        cy.get(OrcamentoListagemLocators.linhasTabela).eq(index).should('contain', texto);
    }
}
export default new OrcamentoListagemPage();
