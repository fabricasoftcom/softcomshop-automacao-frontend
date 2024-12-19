import VinculoFiscalListagemLocators from "../../locators/VinculoFiscalListagemLocators";
import menulateralprodutopage from "../menulateral/menulateralprodutopage";

class VinculoFiscalListagemPage {
    /**
     * Acessa a página de listagem de vínculos fiscais
     * e valida que a página foi carregada com sucesso.
     */
    visit() {
        menulateralprodutopage.acessarListagemVinculosFiscais();
        cy.get('h5:contains("Listagem")').should('be.visible'); // Valida o título "Listagem"
    }

    /**
     * Realiza uma pesquisa de vínculos fiscais utilizando código e descrição.
     * @param {string} codigo - Código do vínculo fiscal.
     * @param {string} descricao - Descrição do vínculo fiscal.
     */
    pesquisar(codigo, descricao) {
        cy.get(VinculoFiscalListagemLocators.campoCodigo).clear().type(codigo); // Preenche o campo código
        cy.get(VinculoFiscalListagemLocators.campoDescricao).clear().type(descricao); // Preenche o campo descrição
        cy.get(VinculoFiscalListagemLocators.btnPesquisar).click(); // Clica no botão "Pesquisar"
    }

    /**
     * Clica no botão para iniciar um novo cadastro de vínculo fiscal.
     */
    novoCadastro() {
        cy.get(VinculoFiscalListagemLocators.btnNovoCadastro).click(); // Clica no botão "Novo Cadastro"
    }

    /**
     * Exclui os vínculos fiscais selecionados e verifica se o modal de confirmação é exibido.
     */
    excluirSelecionados() {
        cy.get(VinculoFiscalListagemLocators.btnExcluirSelecionados).click(); // Clica no botão de excluir selecionados
        this.verificarModalVisivel(); // Valida que o modal de confirmação foi exibido
    }

    /**
     * Confirma a exclusão dos vínculos fiscais selecionados.
     */
    confirmarExclusao() {
        cy.get(VinculoFiscalListagemLocators.modalConfirmacao).should('be.visible'); // Garante que o modal está visível
        cy.get(VinculoFiscalListagemLocators.botaoConfirmarExclusao).click(); // Confirma a exclusão
    }

    /**
     * Verifica se o modal de confirmação de exclusão está visível.
     */
    verificarModalVisivel() {
        cy.get(VinculoFiscalListagemLocators.modalConfirmacao).should('be.visible');
    }

    /**
     * Verifica se a tabela de vínculos fiscais está visível.
     */
    tabelaVisivel() {
        cy.get(VinculoFiscalListagemLocators.tabelaVinculos).should('be.visible');
    }

    /**
     * Valida que a tabela contém o número esperado de linhas.
     * @param {number} qtd - Quantidade esperada de linhas.
     */
    tabelaContemLinhas(qtd) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela).should('have.length', qtd);
    }

    /**
     * Edita uma linha específica da tabela de vínculos fiscais.
     * @param {number} index - Índice da linha a ser editada (começa em 0).
     */
    editarLinha(index) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela)
            .eq(index) // Seleciona a linha com base no índice
            .find(VinculoFiscalListagemLocators.botaoEditar) // Localiza o botão de edição
            .click(); // Clica no botão "Editar"
    }

    /**
     * Valida se um alerta (toast) foi exibido na tela.
     */
    validarAlerta() {
        cy.get(VinculoFiscalListagemLocators.toastAlert)
    }

    novoCadastro() {
        cy.get(VinculoFiscalListagemLocators.btnNovoCadastro).click();
      }
    
      pesquisar(codigo, descricao) {
        cy.get(VinculoFiscalListagemLocators.campoCodigo).clear().type(codigo);
        cy.get(VinculoFiscalListagemLocators.campoDescricao).clear().type(descricao);
        cy.get(VinculoFiscalListagemLocators.btnPesquisar).click();
      }
    
      excluirSelecionados() {
        cy.get(VinculoFiscalListagemLocators.btnExcluirSelecionados).click();
      }
    
      confirmarExclusao() {
        cy.get(VinculoFiscalListagemLocators.botaoConfirmarExclusao).click();
      }
    
      validarAlerta() {
        cy.get(VinculoFiscalListagemLocators.toastAlert).should('be.visible');
      }
    
      selecionarTodosRegistros() {
        cy.get(VinculoFiscalListagemLocators.checkboxTodos).check();
      }
    
      editarLinha(index) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela)
          .eq(index)
          .find(VinculoFiscalListagemLocators.botaoEditar)
          .click();
      }
    
      verificarTabelaVazia() {
        cy.get(VinculoFiscalListagemLocators.linhasTabela).should('not.exist');
      }
    
      verificarQuantidadeLinhasTabela(qtd) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela).should('have.length', qtd);
      }
    
      verificarLinhaContemTexto(index, texto) {
        cy.get(VinculoFiscalListagemLocators.linhasTabela)
          .eq(index)
          .should('contain', texto);
      }
}

export default new VinculoFiscalListagemPage();
