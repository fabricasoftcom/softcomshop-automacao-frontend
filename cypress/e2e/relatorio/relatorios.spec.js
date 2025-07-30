import relatoriospage from "../../support/pages/relatorios/relatoriospage";

describe('Acessar relatorios: ', { tags: ['@relatorios', '@regressivo'] }, () => {

  Cypress.on('uncaught:exception', () => {
    return false;
  });

  let relatoriosList = [];

  before(() => {
    cy.fixture('relatorios').then((data) => {
      relatoriosList = data;
    });
  });

  it('Deve validar os relatorios', () => {
    cy.wrap(relatoriosList).each((option) => {
      cy.log(`Acessando relatorio: ${option.relatorioName}`);
      cy.loginArmazenandoSessao();
      cy.visit('/softcomtecnologia/relatorios-gerais')
      cy.xpath(option.relatorioElement)
        .should('exist')
        .should('be.visible')
        .click()
      relatoriospage.validateRoute(option.relatorioURL);
      cy.verificarErro500Visual();
    });
  });
});
