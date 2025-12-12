import ReciboLocators from '../../locators/Financeiro/ReciboLocators';

class ReciboPage {
  visit() {
    cy.visit('/financeiro/recibo');
    cy.get('#loading').should('not.exist');
    cy.get(ReciboLocators.tituloListagem).should('be.visible').and('contain.text', 'Recibos');
  }

  visitNovoCadastro() {
    cy.visit('/financeiro/recibo/novo');
    cy.get('#loading').should('not.exist');
    cy.get(ReciboLocators.tituloFormulario).should('be.visible').and('contain.text', 'Recibo');
  }

  clicarNovoCadastro() {
    cy.get(ReciboLocators.botaoNovoCadastro).first().click();
    cy.get('#loading').should('not.exist');
    cy.get(ReciboLocators.tituloFormulario).should('be.visible');
  }

  preencherCnpj(cnpj) {
    cy.get(ReciboLocators.campoCnpj).clear().type(cnpj);
  }

  clicarConsultaReceita() {
    cy.get(ReciboLocators.botaoConsultaReceita).click();
  }

  preencherRecebemosDe(nome) {
    cy.get(ReciboLocators.campoRecebemosDe).clear().type(nome);
  }

  preencherReferenteA(servico) {
    cy.get(ReciboLocators.campoReferenteA).clear().type(servico);
  }

  preencherValor(valor) {
    cy.get(ReciboLocators.campoValor).clear().type(valor);
  }

  preencherData(data) {
    cy.get(ReciboLocators.campoData).clear().type(data);
  }

  clicarSalvar() {
    cy.get(ReciboLocators.botaoSalvar).click();
    cy.get('#loading').should('not.exist');
  }

  clicarVoltar() {
    cy.get(ReciboLocators.botaoVoltar).click();
    cy.get('#loading').should('not.exist');
  }

  clicarNovoCadastroForm() {
    cy.get(ReciboLocators.botaoNovoCadastroForm).click();
    cy.get('#loading').should('not.exist');
  }

  verificarTituloListagem() {
    cy.get(ReciboLocators.tituloListagem).should('be.visible').and('contain.text', 'Recibos');
  }

  verificarTituloFormulario() {
    cy.get(ReciboLocators.tituloFormulario).should('be.visible').and('contain.text', 'Recibo');
  }

  verificarTabelaVazia() {
    cy.get(ReciboLocators.tabelaVazia).should('contain.text', 'Nenhum resultado foi localizado para a sua busca.');
  }

  verificarCamposFormulario() {
    cy.get(ReciboLocators.campoCnpj).should('be.visible');
    cy.get(ReciboLocators.campoRecebemosDe).should('be.visible');
    cy.get(ReciboLocators.campoReferenteA).should('be.visible');
    cy.get(ReciboLocators.campoValor).should('be.visible');
    cy.get(ReciboLocators.campoData).should('be.visible');
  }
}

export default new ReciboPage();

