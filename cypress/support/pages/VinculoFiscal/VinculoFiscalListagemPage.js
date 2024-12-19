import VinculoFiscalListagemLocators from "../../locators/VinculoFiscalListagemLocators";
import menulateralprodutopage from "../menulateral/menulateralprodutopage";

class VinculoFiscalListagemPage {
    // Acessa a página de listagem de vínculos fiscais
    visit() {
        menulateralprodutopage.acessarListagemVinculosFiscais();
        cy.get('h5:contains("Listagem")').should('be.visible');
    }

    // Realiza uma pesquisa de vínculos fiscais
    pesquisar(codigo, descricao) {
        cy.get(VinculoFiscalListagemLocators.campoCodigo).clear().type(codigo); // Preenche campo código
        cy.get(VinculoFiscalListagemLocators.campoDescricao).clear().type(descricao); // Preenche campo descrição
        cy.get(VinculoFiscalListagemLocators.btnPesquisar).click(); // Clica no botão de pesquisar
    }

    // Clica no botão de "Novo Cadastro"
    novoCadastro() {
        cy.get(VinculoFiscalListagemLocators.btnNovoCadastro).click(); // Clica no botão de novo cadastro
    }

    // Exclui os vínculos fiscais selecionados
    excluirSelecionados() {
        cy.get(VinculoFiscalListagemLocators.btnExcluirSelecionados).click(); // Clica no botão de excluir selecionados
        this.verificarModalVisivel();  // Verifica se o modal de exclusão apareceu
    }

    // Confirma a exclusão dos itens
    confirmarExclusao() {
        cy.get(VinculoFiscalListagemLocators.modalConfirmacao)  // Localizador do modal de confirmação
          .should('be.visible');  // Garante que o modal está visível
        cy.get(VinculoFiscalListagemLocators.botaoConfirmarExclusao).click();  // Clica no botão "Sim, pode excluir!"
    }

    // Verifica se o modal de exclusão está visível
    verificarModalVisivel() {
        cy.get(VinculoFiscalListagemLocators.modalConfirmacao).should('be.visible');  // Modal de confirmação de exclusão
    }

    // Verifica se a tabela está visível
    tabelaVisivel() {
        cy.get(VinculoFiscalListagemLocators.tabelaVinculos).should('be.visible');
    }

    // Verifica se a tabela contém o número esperado de linhas
    tabelaContemLinhas(qtd) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela).should('have.length', qtd);
    }

    // Edita um vínculo fiscal da tabela, fornecendo o índice da linha
    editarLinha(index) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela)
            .eq(index)
            .find(VinculoFiscalListagemLocators.botaoEditar)
            .click(); // Clica no botão de editar da linha
    }
    validarAlerta(){
        cy.get(VinculoFiscalListagemLocators.toastAlert).should('be.visible')
    }
}

export default new VinculoFiscalListagemPage();
