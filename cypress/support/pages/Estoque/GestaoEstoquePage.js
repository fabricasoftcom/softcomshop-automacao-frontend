import Locators from '../../../support/locators/Estoque/GestaoEstoqueLocators';

/**
 * Page Object para Gestão de Estoque
 * ADR-0002: Page Object Pattern
 * ADR-0003: Locators centralizados
 */
class GestaoEstoquePage {
  /**
   * Acessa a tela de Gestão de Estoque via menu
   */
  static acessarViaMenu() {
    cy.expandirClicarMenuUmNivel('Compras e Estoque', '#gestão_de_estoque');
  }

  /**
   * Valida acesso à tela
   */
  static validarAcesso() {
    cy.url().should('include', '/gestao-estoque');
    cy.contains(Locators.titulo, 'Gestão de Estoque').should('be.visible');
  }

  /**
   * Valida elementos principais da tela
   */
  static validarElementosPrincipais() {
    // Título
    cy.contains(Locators.titulo, 'Gestão de Estoque').should('be.visible');

    // Links de navegação
    cy.get(Locators.linkVisaoGeral).should('be.visible');
    cy.get(Locators.linkListaCompras).should('be.visible');

    // Formulário de filtros
    cy.get(Locators.selectPeriodoVendas).should('be.visible');
    cy.get(Locators.inputPeriodo).should('exist');
    cy.get(Locators.selectStatus).should('be.visible');
    cy.get(Locators.inputPesquisa).should('be.visible');
    cy.get(Locators.selectGrupos).should('exist');
    cy.get(Locators.selectFabricantes).should('exist');
    cy.get(Locators.selectFornecedores).should('exist');

    // Botão Pesquisar
    cy.get(Locators.btnPesquisar).should('be.visible');

    // Mensagem inicial (pode não estar visível se já houver filtros preenchidos)
    cy.get('body').then(($body) => {
      if ($body.find(':contains("Preencha os filtros acima")').length > 0) {
        cy.contains('Preencha os filtros acima').should('be.visible');
      }
    });
  }

  /**
   * Preenche o formulário de pesquisa
   * @param {Object} filtros - Objeto com os filtros a preencher
   */
  static preencherFiltros(filtros = {}) {
    if (filtros.periodoVendas) {
      cy.get(Locators.selectPeriodoVendas).select(filtros.periodoVendas);
    }

    if (filtros.status) {
      cy.get(Locators.selectStatus).select(filtros.status);
    }

    if (filtros.palavraChave) {
      cy.get(Locators.inputPesquisa).clear().type(filtros.palavraChave);
    }
  }

  /**
   * Clica no botão Pesquisar
   */
  static clicarPesquisar() {
    cy.get(Locators.btnPesquisar).click();
  }

  /**
   * Clica no link Visão Geral
   */
  static clicarVisaoGeral() {
    cy.get(Locators.linkVisaoGeral).click();
  }

  /**
   * Clica no link Lista de Compras
   */
  static clicarListaCompras() {
    cy.get(Locators.linkListaCompras).click();
  }

  /**
   * Valida o botão Lista de Compras
   */
  static validarBotaoListaCompras() {
    cy.get(Locators.linkListaCompras).should('be.visible');
    cy.get(Locators.linkListaCompras).should('contain', 'Lista de Compras');
    return this;
  }
}

export default GestaoEstoquePage;

