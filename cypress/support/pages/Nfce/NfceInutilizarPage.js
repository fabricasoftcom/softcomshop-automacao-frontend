// NfceInutilizarPage.js
import NfceInutilizarLocators from "../../locators/Nfce/NfceInutilizarLocators";
import MenulateralVendaPage from "../menulateral/menulateralvendapage";

class NfceInutilizarPage {
  acessarViaMenu() {
    MenulateralVendaPage.acessarInutilizarNFCe();
  }

  validarTelaInutilizar() {
    cy.url().should('include', '/nfce/inutilizar');
    cy.get(NfceInutilizarLocators.titulo).should('be.visible');
  }

  expandirFormulario() {
    // Clicar no heading "Adicionar Inutilização de Faixa" para expandir o formulário
    cy.contains('h3', 'Adicionar Inutilização de Faixa').click();
    // Aguardar o formulário aparecer
    cy.get(NfceInutilizarLocators.selectSerie).should('be.visible');
  }

  validarFormulario() {
    cy.get(NfceInutilizarLocators.selectSerie).should('be.visible');
    cy.get(NfceInutilizarLocators.campoNumeroInicial).should('be.visible');
    cy.get(NfceInutilizarLocators.campoNumeroFinal).should('be.visible');
    cy.get(NfceInutilizarLocators.campoJustificativa).should('be.visible');
    cy.get(NfceInutilizarLocators.btnInutilizar).should('be.visible');
  }

  selecionarSerie(serie) {
    cy.get(NfceInutilizarLocators.selectSerie).select(serie);
  }

  preencherNumeroInicial(numero) {
    cy.get(NfceInutilizarLocators.campoNumeroInicial).clear().type(numero);
  }

  preencherNumeroFinal(numero) {
    cy.get(NfceInutilizarLocators.campoNumeroFinal).clear().type(numero);
  }

  preencherJustificativa(justificativa) {
    cy.get(NfceInutilizarLocators.campoJustificativa).clear().type(justificativa);
  }

  preencherFormulario(dados) {
    if (dados.serie) {
      this.selecionarSerie(dados.serie);
    }
    if (dados.numeroInicial) {
      this.preencherNumeroInicial(dados.numeroInicial);
    }
    if (dados.numeroFinal) {
      this.preencherNumeroFinal(dados.numeroFinal);
    }
    if (dados.justificativa) {
      this.preencherJustificativa(dados.justificativa);
    }
  }

  clicarInutilizar() {
    cy.get(NfceInutilizarLocators.btnInutilizar).click();
  }

  validarMensagemSucesso() {
    cy.get('#toast-container').should('be.visible').contains('Sucesso');
  }
}

export default new NfceInutilizarPage();

