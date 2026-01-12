import DashboardEstoqueLocators from '../../locators/Estoque/DashboardEstoqueLocators';

class DashboardEstoquePage {
  visitar() {
    cy.visit(DashboardEstoqueLocators.url);
  }

  validarCardsVisiveis() {
    cy.get(DashboardEstoqueLocators.cards.giroEstoque).should('be.visible');
    cy.get(DashboardEstoqueLocators.cards.cobertura).should('be.visible');
    // Adicionar outros cards
  }
}

export default new DashboardEstoquePage();

