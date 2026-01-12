// DrePage.js
import DreLocators from "../../locators/Financeiro/DreLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";

class DrePage {
  acessarViaMenu() {
    MenulateralFinanceiroPage.acessarDRE();
  }

  validarTelaDre() {
    cy.get(DreLocators.titulo).should('be.visible');
    cy.get(DreLocators.campoPeriodo).should('be.visible');
    cy.get(DreLocators.btnGerarPdf).should('be.visible');

    // Validar seções principais
    cy.get(DreLocators.secaoTotalVendas).should('be.visible');
    cy.get(DreLocators.secaoDespesasReceitas).should('be.visible');
    cy.get(DreLocators.secaoLucroLiquido).should('be.visible');
    cy.get(DreLocators.secaoBalancoPatrimonial).should('be.visible');
    cy.get(DreLocators.secaoContasReceber).should('be.visible');
  }

  validarUrlDre() {
    cy.url().should('include', '/financeiro/dre');
  }

  preencherPeriodo(periodo) {
    cy.get(DreLocators.campoPeriodo).clear().type(periodo);
  }

  clicarGerarPdf() {
    cy.get(DreLocators.btnGerarPdf).click();
  }

  validarDownloadPdf() {
    // Intercepta a requisição de download do PDF
    cy.intercept('GET', '/financeiro/dre/pdf*').as('downloadPdf');
    cy.wait('@downloadPdf').its('response.statusCode').should('eq', 200);
  }

  validarSecaoTotalVendas() {
    cy.get(DreLocators.secaoTotalVendas).should('be.visible');
    // Validar que existe pelo menos uma tabela na página (a estrutura pode variar)
    cy.get('table.table-responsive').should('exist');
  }

  validarSecaoDespesasReceitas() {
    cy.get(DreLocators.secaoDespesasReceitas).should('be.visible');
    cy.get(DreLocators.secaoDespesas).should('be.visible');
    cy.get(DreLocators.secaoReceitas).should('be.visible');
  }

  validarSecaoLucroLiquido() {
    cy.get(DreLocators.secaoLucroLiquido).should('be.visible');
  }

  validarSecaoBalancoPatrimonial() {
    cy.get(DreLocators.secaoBalancoPatrimonial).should('be.visible');
    cy.get(DreLocators.secaoSaldoAtualContas).should('be.visible');
  }

  validarSecaoContasReceber() {
    cy.get(DreLocators.secaoContasReceber).should('be.visible');
    cy.get(DreLocators.secaoVencido).should('be.visible');
    cy.get(DreLocators.secaoAVencer).should('be.visible');
  }
}

export default new DrePage();

