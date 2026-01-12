import NfceConfiguracoesLocators from "../../locators/Nfce/NfceConfiguracoesLocators";
import MenulateralVendaPage from "../menulateral/menulateralvendapage";

class NfceConfiguracoesPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarConfiguracoesNFCe();
  }

  validarAcesso() {
    cy.url().should('include', '/serie/nfce');
    cy.get(NfceConfiguracoesLocators.tituloTela).should('be.visible');
  }

  validarSecoes() {
    cy.get(NfceConfiguracoesLocators.secaoAmbiente).should('be.visible');
    cy.get(NfceConfiguracoesLocators.secaoEmissaoCpfCnpj).should('be.visible');
    cy.get(NfceConfiguracoesLocators.secaoContingencia).should('be.visible');
    cy.get(NfceConfiguracoesLocators.secaoSerieNfce).should('be.visible');
    cy.get(NfceConfiguracoesLocators.secaoCsc).should('be.visible');
  }

  validarBotoes() {
    cy.get(NfceConfiguracoesLocators.btnNovaSerie).should('be.visible');
    cy.get(NfceConfiguracoesLocators.btnNovoCsc).should('be.visible');
    cy.get(NfceConfiguracoesLocators.btnStatusServico).should('be.visible');
  }

  validarTabelas() {
    cy.get(NfceConfiguracoesLocators.tabelaSerie).should('be.visible');
    cy.get(NfceConfiguracoesLocators.tabelaCsc).should('be.visible');
  }
}

export default new NfceConfiguracoesPage();

