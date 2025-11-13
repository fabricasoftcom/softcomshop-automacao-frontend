import AtributosFormLocators from "../../locators/Produtos/AtributosFormLocators";

class AtributosFormPage {
  verificarTitulo() {
    cy.get(AtributosFormLocators.lblAtrTitle).should("be.visible");
  }

  preencherDescricao(valor) {
    cy.get(AtributosFormLocators.descricaoInput)
      .clear()
      .type(valor);
  }

  clicarSalvar() {
    cy.get(AtributosFormLocators.btnSalvar).click();
  }

  verificarBotaoVoltar() {
    cy.get(AtributosFormLocators.btnVoltar).should("be.visible");
  }
}

export default new AtributosFormPage();
