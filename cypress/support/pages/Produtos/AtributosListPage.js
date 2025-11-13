import AtributosListLocators from "../../locators/Produtos/AtributosListLocators";

class AtributosListPage {
  abrirFormularioPesquisa() {
    cy.get(AtributosListLocators.btnPesquisar).click();
    cy.get(AtributosListLocators.formPesquisa).should("be.visible");
  }

  preencherFiltro(codigo, descricao) {
    if (codigo) {
      cy.get(AtributosListLocators.inputCodigo)
        .clear()
        .type(codigo);
    }
    if (descricao) {
      cy.get(AtributosListLocators.inputDescricao)
        .clear()
        .type(descricao);
    }
  }

  clicarPesquisar() {
    cy.get(AtributosListLocators.btnSubmitPesquisa).click();
  }

  verificarTabelaVisivel() {
    cy.get(AtributosListLocators.tabelaAtributos, { timeout: 10000 }).should("be.visible");
  }

  contarLinhasVisiveis() {
    return cy.get(AtributosListLocators.linhasTabela, { timeout: 10000 });
  }

  clicarNovoCadastro() {
    cy.get(AtributosListLocators.btnNovoCadastro).first().click({ force: true });
  }

  selecionarCheckboxPorDescricao(descricao) {
    cy.contains("tr", descricao)
      .find('input[type="checkbox"]')
      .check({ force: true });
  }
}

export default new AtributosListPage();
