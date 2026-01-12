import OrdemFornecimentoCadastroLocators from '../../locators/Compra/OrdemFornecimentoCadastroLocators';

class OrdemFornecimentoCadastroPage {
  visitar() {
    cy.visit(OrdemFornecimentoCadastroLocators.url);
  }

  preencherFornecedor(fornecedor) {
    cy.get(OrdemFornecimentoCadastroLocators.fornecedor).clear().type(fornecedor);
    // Adicionar lógica de seleção do typeahead
    cy.get('.typeahead-list li a', { timeout: 10000 }).should('be.visible').first().click();
    return this;
  }

  preencherTelefone(telefone) {
    cy.get(OrdemFornecimentoCadastroLocators.telefone).type(telefone);
    return this;
  }

  clicarSalvar() {
    cy.get(OrdemFornecimentoCadastroLocators.btnSalvar).first().click(); // Pode ter mais de um (topo/rodapé)
  }
}

export default new OrdemFornecimentoCadastroPage();

