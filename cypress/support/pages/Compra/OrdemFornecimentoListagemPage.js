import OrdemFornecimentoListagemLocators from '../../locators/Compra/OrdemFornecimentoListagemLocators';

class OrdemFornecimentoListagemPage {
  visitar() {
    cy.visit(OrdemFornecimentoListagemLocators.url);
  }

  clicarNovoCadastro() {
    cy.get(OrdemFornecimentoListagemLocators.btnNovo).click();
  }
}

export default new OrdemFornecimentoListagemPage();

