import VinculoFiscalServicoCadastroLocators from '../../locators/Servico/VinculoFiscalServicoCadastroLocators';

class VinculoFiscalServicoCadastroPage {
  visitar() {
    cy.visit(VinculoFiscalServicoCadastroLocators.url);
  }

  preencherDescricao(descricao) {
    cy.get(VinculoFiscalServicoCadastroLocators.descricao).type(descricao);
    return this;
  }

  clicarSalvar() {
    cy.get(VinculoFiscalServicoCadastroLocators.btnSalvar).click();
  }
}

export default new VinculoFiscalServicoCadastroPage();

