import GruposListLocators from "../../locators/Produtos/GruposListLocators";

class GruposListPage {
  abrirFiltro() {
    cy.get(GruposListLocators.btnPesquisar).click();
    cy.get(GruposListLocators.formPesquisa).should("be.visible");
  }

  preencherFiltro(codigo, grupo) {
    if (codigo) {
      cy.get(GruposListLocators.inputCodigo).clear().type(codigo);
    }
    if (grupo) {
      cy.get(GruposListLocators.inputGrupo).clear().type(grupo);
    }
  }

  clicarPesquisar() {
    cy.get(GruposListLocators.btnSubmitPesquisa).click();
  }

  verificarTabelaVisivel() {
    cy.get(GruposListLocators.tableGrupos, { timeout: 15000 }).should("be.visible");
  }

  contarLinhasVisiveis() {
    return cy.get(GruposListLocators.linhasTabela, { timeout: 15000 });
  }

  clicarNovoCadastro() {
    cy.get(GruposListLocators.btnNovo).first().click({ force: true });
  }
}

export default new GruposListPage();
