import ServicoCadastroLocators from '../../locators/Servico/ServicoCadastroLocators';

class ServicoCadastroPage {
  visitar() {
    cy.visit(ServicoCadastroLocators.url);
  }

  preencherDescricao(descricao) {
    cy.get(ServicoCadastroLocators.descricao).type(descricao);
    return this;
  }

  preencherReferencia(referencia) {
    cy.get(ServicoCadastroLocators.referencia).type(referencia);
    return this;
  }

  preencherGrupo(grupo) {
    cy.get(ServicoCadastroLocators.grupo.input).clear().type(grupo);
    // Aguarda o container de resultados aparecer e clica no primeiro resultado visível (link dentro da lista)
    cy.get('.typeahead-list li a', { timeout: 10000 }).should('be.visible').first().click();
    return this;
  }

  preencherPreco(preco) {
    cy.get(ServicoCadastroLocators.precoVenda).type(preco, { force: true });
    return this;
  }

  clicarSalvar() {
    cy.get(ServicoCadastroLocators.btnSalvar).click({ force: true });
  }
}

export default new ServicoCadastroPage();

