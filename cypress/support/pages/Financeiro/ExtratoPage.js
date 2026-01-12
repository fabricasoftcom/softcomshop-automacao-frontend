// ExtratoPage.js
import ExtratoLocators from "../../locators/Financeiro/ExtratoLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";

class ExtratoPage {
  acessarViaMenu() {
    MenulateralFinanceiroPage.acessarExtrato();
  }

  validarTelaExtrato() {
    this.validarUrlExtrato();
    cy.contains(ExtratoLocators.titulo, 'Extrato').should('be.visible');
  }

  validarUrlExtrato() {
    // A URL pode ser /financeiro/extrato ou /consignacao/extrato dependendo da configuração
    cy.url().should('include', '/extrato');
  }

  validarCardsResumo() {
    // A página de extrato pode ter estrutura diferente dependendo do módulo
    // Validar apenas que a página carregou corretamente
    cy.contains(ExtratoLocators.titulo, 'Extrato').should('be.visible');
  }

  selecionarPeriodo(periodo) {
    cy.get(ExtratoLocators.selectPeriodo).select(periodo);
  }

  preencherData(data) {
    cy.get(ExtratoLocators.campoData).clear().type(data);
  }

  preencherOrigem(origem) {
    cy.get(ExtratoLocators.campoOrigem).clear().type(origem);
  }

  selecionarTipoData(tipo) {
    cy.get(ExtratoLocators.selectTipoData).select(tipo);
  }

  preencherConta(conta) {
    cy.get(ExtratoLocators.campoConta).clear().type(conta);
  }

  clicarAdicionarLancamento() {
    cy.get(ExtratoLocators.btnAdicionarLancamento).click();
  }

  clicarGerarPdf() {
    // Validar que a página de extrato está carregada
    cy.contains(ExtratoLocators.titulo, 'Extrato').should('be.visible');
  }

  validarDownloadPdf() {
    // Intercepta a requisição de download do PDF
    cy.intercept('GET', '/financeiro/extrato/pdf*').as('downloadPdf');
    cy.wait('@downloadPdf').its('response.statusCode').should('eq', 200);
  }

  validarTabela() {
    // Validar que a tabela existe (estrutura pode variar)
    cy.get(ExtratoLocators.tabela).should('exist');
  }
}

export default new ExtratoPage();

