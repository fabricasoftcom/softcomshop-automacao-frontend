import VinculoFiscalPageLocators from "../../locators/VinculoFiscalPageLocators";

class VinculoFiscalPage {
  acessarMenuDetalhesFiscais() {
    cy.get("body").then(($body) => {
      if ($body.find(VinculoFiscalPageLocators.abaDetalhes).length) {
        cy.get(VinculoFiscalPageLocators.abaDetalhes).click();
      }
    });
    cy.contains(VinculoFiscalPageLocators.detalhesFiscaisTitulo, {
      timeout: 20000,
    }).should("be.visible");
  }

  selecionarEmpresaMatriz() {
    cy.get(VinculoFiscalPageLocators.empresaMatriz).click();
    cy.get(VinculoFiscalPageLocators.dropdownVinculoFiscalIcon).should(
      "be.visible"
    );
  }

  selecionarVinculoFiscal() {
    cy.get(VinculoFiscalPageLocators.dropdownVinculoFiscalIcon, {
      timeout: 20000,
    }).should("be.visible");
    cy.get(VinculoFiscalPageLocators.dropdownVinculoFiscalIcon, {
      timeout: 20000,
    }).click();
    cy.get(VinculoFiscalPageLocators.primeiroVinculoFiscal, {
      timeout: 20000,
    })
      .should("be.visible")
      .click();
  }

  preencherNcmECest() {
    this.selecionarPrimeiraOpcaoTypeahead(
      VinculoFiscalPageLocators.ncmIcon,
      VinculoFiscalPageLocators.ncmPrimeiraOpcao
    );
    this.selecionarPrimeiraOpcaoTypeahead(
      VinculoFiscalPageLocators.cestIcon,
      VinculoFiscalPageLocators.cestPrimeiraOpcao
    );
  }

  selecionarPrimeiraOpcaoTypeahead(iconLocator, optionLocator) {
    cy.get(iconLocator, { timeout: 20000 }).click();
    cy.get(optionLocator, { timeout: 20000 }).should("be.visible").first().click();
  }

  salvarVinculoFiscal() {
    cy.get(VinculoFiscalPageLocators.botaoSalvar).click();
  }

  confirmacaoCadastroVinculoFiscal() {
    cy.contains(VinculoFiscalPageLocators.toastSucesso).should("be.visible");
  }
}

export default new VinculoFiscalPage();
