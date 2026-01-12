// NfceDownloadXmlPage.js
import NfceDownloadXmlLocators from "../../locators/Nfce/NfceDownloadXmlLocators";
import MenulateralVendaPage from "../menulateral/menulateralvendapage";

class NfceDownloadXmlPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarDownloadXmlNFCe();
  }

  validarTelaDownloadXml() {
    cy.url().should('include', '/nfce/download-xml');
    cy.get(NfceDownloadXmlLocators.titulo).should('be.visible');
    cy.get(NfceDownloadXmlLocators.campoPeriodo).should('be.visible');
    cy.get(NfceDownloadXmlLocators.campoNumeroNota).should('be.visible');
    cy.get(NfceDownloadXmlLocators.campoChaveAcesso).should('be.visible');
    cy.get(NfceDownloadXmlLocators.btnDownload).should('be.visible');
  }

  preencherPeriodo(periodo) {
    cy.get(NfceDownloadXmlLocators.campoPeriodo).clear().type(periodo);
  }

  preencherNumeroNota(numero) {
    cy.get(NfceDownloadXmlLocators.campoNumeroNota).clear().type(numero);
  }

  preencherChaveAcesso(chave) {
    cy.get(NfceDownloadXmlLocators.campoChaveAcesso).clear().type(chave);
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
      cy.get(NfceDownloadXmlLocators.campoPeriodo).should('have.value', dados.periodo);
    }
    if (dados.numeroNota) {
      cy.get(NfceDownloadXmlLocators.campoNumeroNota).should('have.value', dados.numeroNota);
    }
    if (dados.chaveAcesso) {
      cy.get(NfceDownloadXmlLocators.campoChaveAcesso).should('have.value', dados.chaveAcesso);
    }
    return this;
  }

  clicarDownload() {
    // Fechar datepicker se estiver aberto antes de clicar
    cy.get('body').then(($body) => {
      if ($body.find('.daterangepicker').is(':visible')) {
        cy.get('body').type('{esc}');
        cy.wait(500);
      }
    });
    cy.get(NfceDownloadXmlLocators.btnDownload).click();
  }

  validarDownloadXml() {
    // Intercepta a requisição de download do XML
    cy.intercept('GET', '/nfce/download-xml*').as('downloadXml');
    cy.wait('@downloadXml').its('response.statusCode').should('eq', 200);
  }

  validarDownloadXmlCompleto() {
    // Valida que a requisição foi feita e retornou sucesso com conteúdo XML
    cy.wait('@downloadXml').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      // Validar que o conteúdo é um XML
      expect(interception.response.headers['content-type']).to.satisfy((contentType) => {
        return contentType && (
          contentType.includes('xml') ||
          contentType.includes('application/octet-stream') ||
          contentType.includes('text/xml')
        );
      });
    });
  }
}

export default new NfceDownloadXmlPage();

