import VinculoFiscalServicoListagemLocators from '../../locators/Servico/VinculoFiscalServicoListagemLocators';

class VinculoFiscalServicoListagemPage {
  visitar() {
    cy.visit(VinculoFiscalServicoListagemLocators.url);
  }

  clicarNovoCadastro() {
    cy.get(VinculoFiscalServicoListagemLocators.btnNovo).first().click();
  }
}

export default new VinculoFiscalServicoListagemPage();

