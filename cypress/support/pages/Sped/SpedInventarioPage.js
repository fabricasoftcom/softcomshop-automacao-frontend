import SpedInventarioLocators from "../../locators/Sped/SpedInventarioLocators";
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";

class SpedInventarioPage {
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedInventarioBase();
  }

  validarAcesso() {
    cy.get(SpedInventarioLocators.tituloTela).should('be.visible');
    cy.url().should('include', '/sped/inventario');
  }

  validarElementos() {
    cy.get(SpedInventarioLocators.inputData).should('be.visible');
    cy.get(SpedInventarioLocators.btnDownload).should('be.visible');
    cy.get(SpedInventarioLocators.btnUpload).should('be.visible');
  }

  preencherData(data) {
    cy.get(SpedInventarioLocators.inputData).clear().type(data);
  }

  validarDataPreenchida(data) {
    cy.get(SpedInventarioLocators.inputData).should('have.value', data);
    return this;
  }

  clicarDownload() {
    cy.get(SpedInventarioLocators.btnDownload)
      .should('have.attr', 'href')
      .and('include', '/sped/inventario/exportar');
  }

  clicarUpload() {
    cy.get(SpedInventarioLocators.btnUpload).click();
  }

  realizarUpload(caminhoArquivo) {
    // Anexar arquivo ao input hidden
    cy.get(SpedInventarioLocators.inputArquivo).selectFile(caminhoArquivo, { force: true });
  }
}

export default new SpedInventarioPage();

