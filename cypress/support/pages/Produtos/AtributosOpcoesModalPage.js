import AtributosOpcoesModalLocators from "../../locators/Produtos/AtributosOpcoesModalLocators";

class AtributosOpcoesModalPage {
  verificarModalAberto() {
    cy.get(AtributosOpcoesModalLocators.modal).should("be.visible");
    cy.get(AtributosOpcoesModalLocators.titulo).should("contain.text", "Adicione uma Opção");
  }

  preencherNomeOpcao(nome) {
    cy.get(AtributosOpcoesModalLocators.inputNome).clear().type(nome);
  }

  clicarSalvarModal() {
    cy.get(AtributosOpcoesModalLocators.btnSalvar).click();
  }
}

export default new AtributosOpcoesModalPage();
