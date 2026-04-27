import NfeDownloadXmlLocators from "../../locators/Nfe/NfeDownloadXmlLocators";
import MenulateralVendaPage from "../menulateral/MenulateralVendaPage";

class NfeDownloadXmlPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarDownloadXmlNFe();
  }

  validarTelaDownloadXml() {
    cy.url().should('include', '/nfe/download-xml');
    cy.get(NfeDownloadXmlLocators.titulo).should('be.visible');
    cy.get(NfeDownloadXmlLocators.campoPeriodo).should('be.visible');
    cy.get(NfeDownloadXmlLocators.campoNumeroNota).should('be.visible');
    cy.get(NfeDownloadXmlLocators.campoChaveAcesso).should('be.visible');
    cy.get(NfeDownloadXmlLocators.btnDownload).should('be.visible');
  }

  preencherPeriodo(periodo) {
    cy.get(NfeDownloadXmlLocators.campoPeriodo).clear().type(periodo);
  }

  preencherNumeroNota(numero) {
    cy.get(NfeDownloadXmlLocators.campoNumeroNota).clear().type(numero);
  }

  preencherChaveAcesso(chave) {
    cy.get(NfeDownloadXmlLocators.campoChaveAcesso).clear().type(chave);
  }

  preencherFormulario(dados) {
    if (dados.periodo) {
      this.preencherPeriodo(dados.periodo);
    }
    if (dados.numeroNota) {
      this.preencherNumeroNota(dados.numeroNota);
    }
    if (dados.chaveAcesso) {
      this.preencherChaveAcesso(dados.chaveAcesso);
    }
  }

  validarCamposPreenchidos(dados) {
    if (dados.periodo) {
      cy.get(NfeDownloadXmlLocators.campoPeriodo).should('have.value', dados.periodo);
    }
    if (dados.numeroNota) {
      cy.get(NfeDownloadXmlLocators.campoNumeroNota).should('have.value', dados.numeroNota);
    }
    if (dados.chaveAcesso) {
      cy.get(NfeDownloadXmlLocators.campoChaveAcesso).should('have.value', dados.chaveAcesso);
    }
    return this;
  }

  clicarDownload() {
    cy.get('body').then(($body) => {
      if ($body.find('.daterangepicker').is(':visible')) {
        cy.get('body').type('{esc}');
        cy.wait(500);
      }
    });
    cy.get(NfeDownloadXmlLocators.btnDownload).click();
  }
}

export default new NfeDownloadXmlPage();

