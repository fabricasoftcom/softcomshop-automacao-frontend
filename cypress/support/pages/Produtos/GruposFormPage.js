import GruposFormLocators from "../../locators/Produtos/GruposFormLocators";

class GruposFormPage {
  verificarTitulo() {
    cy.get(GruposFormLocators.titulo).should("contain.text", "Grupo");
  }

  preencherNome(valor) {
    cy.get(GruposFormLocators.nomeInput).clear().type(valor);
  }

  preencherComissao(valor) {
    cy.get(GruposFormLocators.comissaoInput).clear().type(valor);
  }

  ativarSwitch(sw) {
    const selector = sw === "vender" ? GruposFormLocators.switchVender : GruposFormLocators.switchAtivar;
    cy.get(selector).then(($el) => {
      if (!$el.prop("checked")) {
        cy.wrap($el).click({ force: true });
      }
    });
  }

  clicarSalvar() {
    cy.get(GruposFormLocators.btnSalvar).click();
  }
}

export default new GruposFormPage();
