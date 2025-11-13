import MovimentacoesListLocators from "../../locators/Movimentacoes/MovimentacoesListLocators";

class ListagemMovimentacoesPage {
  preencherOperacao(operacao) {
    cy.get(MovimentacoesListLocators.operacaoSelect).select(operacao);
  }

  clicarPesquisar() {
    cy.get(MovimentacoesListLocators.btnPesquisar).click();
  }

    clicarPesquisa() {
    cy.get(MovimentacoesListLocators.btnPesquisa).click();
  }

  verificarTabelaVisivel() {
    cy.get(MovimentacoesListLocators.tabelaMovimentacoes).should("be.visible");
  }

  obterLinhasVisiveis() {
    return cy.get(MovimentacoesListLocators.linhasTabela);
  }
}

export default new ListagemMovimentacoesPage();
