import NfeInutilizarLocators from "../../locators/Nfe/NfeInutilizarLocators";
import MenulateralVendaPage from "../menulateral/menulateralvendapage";

class NfeInutilizarPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarInutilizarNFe();
  }

  validarTelaInutilizar() {
    cy.url().should('include', '/nfe/inutilizar');
    cy.get(NfeInutilizarLocators.titulo).should('be.visible');
  }

  expandirFormulario() {
    cy.contains('h3', 'Adicionar Inutilização de Faixa').click();
    cy.get(NfeInutilizarLocators.selectSerie).should('be.visible');
  }

  validarFormulario() {
    cy.get(NfeInutilizarLocators.selectSerie).should('be.visible');
    cy.get(NfeInutilizarLocators.campoNumeroInicial).should('be.visible');
    cy.get(NfeInutilizarLocators.campoNumeroFinal).should('be.visible');
    cy.get(NfeInutilizarLocators.campoJustificativa).should('be.visible');
    cy.get(NfeInutilizarLocators.btnInutilizar).should('be.visible');
  }
}

export default new NfeInutilizarPage();

