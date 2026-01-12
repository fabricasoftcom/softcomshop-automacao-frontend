import NfeConfiguracoesLocators from "../../locators/Nfe/NfeConfiguracoesLocators";
import MenulateralVendaPage from "../menulateral/menulateralvendapage";

class NfeConfiguracoesPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarConfiguracoesNFe();
  }

  validarAcesso() {
    cy.url().should('include', '/serie/nfe');
    cy.get(NfeConfiguracoesLocators.tituloTela).should('be.visible');
  }

  validarSecoes() {
    cy.get(NfeConfiguracoesLocators.secaoAmbiente).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoNomeNotaFiscal).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoNomeDestinatario).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoIcms).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoContingencia).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoExibirPagamento).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoConfiguracaoCfop).should('be.visible');
    cy.get(NfeConfiguracoesLocators.secaoSerieNfe).should('be.visible');
  }

  validarBotoes() {
    cy.get(NfeConfiguracoesLocators.btnNovaSerie).should('be.visible');
    cy.get(NfeConfiguracoesLocators.btnStatusServico).should('be.visible');
  }

  validarTabelas() {
    cy.get(NfeConfiguracoesLocators.tabelaSerie).should('be.visible');
  }
}

export default new NfeConfiguracoesPage();

