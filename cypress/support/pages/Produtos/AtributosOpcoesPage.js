import AtributosOpcoesLocators from "../../locators/Produtos/AtributosOpcoesLocators";

class AtributosOpcoesPage {
  verificarPainelVisivel() {
    cy.get(AtributosOpcoesLocators.painelOpcoes).should("exist");
  }

  verificarBotaoOpcoes() {
    cy.get(AtributosOpcoesLocators.btnOpcoes).should("be.visible");
  }

  verificarTabelaOpcoes() {
    cy.get(AtributosOpcoesLocators.tableOpcoes, { timeout: 15000 }).should("be.visible");
  }

  contarLinhas() {
    return cy.get(AtributosOpcoesLocators.tableLinhas);
  }
}

export default new AtributosOpcoesPage();
