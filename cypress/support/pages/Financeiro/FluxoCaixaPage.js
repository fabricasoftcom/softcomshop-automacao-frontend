// FluxoCaixaPage.js
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";
import FluxoCaixaLocators from "../../locators/Financeiro/FluxoCaixaLocators";

class FluxoCaixaPage {
  // Navegação
  acessarViaMenu() {
    MenulateralFinanceiroPage.acessarFluxo();
  }

  visit() {
    cy.visit('/financeiro/fluxo');
  }

  // Preenchimento do Formulário
  preencherPeriodo(periodo) {
    cy.get(FluxoCaixaLocators.campoPeriodo)
      .clear()
      .type(periodo);
  }

  // Ações
  clicarPesquisar() {
    cy.get(FluxoCaixaLocators.btnPesquisar).click();
  }

  clicarGerarPdf() {
    cy.get(FluxoCaixaLocators.btnGerarPdf).click();
  }

  pesquisarPorPeriodo(periodo) {
    this.preencherPeriodo(periodo);
    this.clicarPesquisar();
  }

  // Validações
  validarTitulo() {
    cy.get(FluxoCaixaLocators.titulo)
      .should('be.visible')
      .contains('Fluxo de Caixa');
  }

  validarCarregamentoDaPagina() {
    cy.get(FluxoCaixaLocators.loading, { timeout: 10000 }).should('not.exist');
    this.validarTitulo();
  }

  aguardarCarregamento(timeout = 10000) {
    cy.get(FluxoCaixaLocators.loading, { timeout }).should('not.exist');
    return this;
  }

  validarBotaoGerarPdf() {
    cy.get(FluxoCaixaLocators.btnGerarPdf).should('be.visible');
    return this;
  }

  validarUrlGerarPdf() {
    cy.get(FluxoCaixaLocators.btnGerarPdf)
      .should('have.attr', 'href')
      .and('include', '/financeiro/fluxo/pdf');
    return this;
  }

  validarCardsResumo() {
    cy.contains('h3', 'Saldo anterior').should('be.visible');
    cy.contains('h3', 'A receber').should('be.visible');
    cy.contains('h3', 'A pagar').should('be.visible');
    cy.contains('h3', 'Saldo projetado').should('be.visible');
  }

  validarTabelaVisivel() {
    cy.get(FluxoCaixaLocators.tabela, { timeout: 10000 }).should('be.visible');
    cy.get(FluxoCaixaLocators.tabelaHeader).should('be.visible');
  }

  validarUrl() {
    cy.url().should('include', '/financeiro/fluxo');
  }

  // Obter valores dos cards
  obterValorSaldoAnterior() {
    return cy.contains('h3', 'Saldo anterior').parent().find('table tbody tr td').invoke('text');
  }

  obterValorAReceber() {
    return cy.contains('h3', 'A receber').parent().find('table tbody tr td').invoke('text');
  }

  obterValorAPagar() {
    return cy.contains('h3', 'A pagar').parent().find('table tbody tr td').invoke('text');
  }

  obterValorSaldoProjetado() {
    return cy.contains('h3', 'Saldo projetado').parent().find('table tbody tr td').invoke('text');
  }
}

export default new FluxoCaixaPage();

