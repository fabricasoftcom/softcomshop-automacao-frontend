import CadastroModelosListagemLocators from '../../locators/Contrato/CadastroModelosListagemLocators';

class CadastroModelosListagemPage {
  visitar() {
    cy.visit(CadastroModelosListagemLocators.url);
  }

  clicarNovoCadastro() {
    cy.get(CadastroModelosListagemLocators.btnNovo).click();
  }
}

export default new CadastroModelosListagemPage();

