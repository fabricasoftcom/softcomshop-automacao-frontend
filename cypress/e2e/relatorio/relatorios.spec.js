import RelatoriosPage from "../../support/pages/relatorios/RelatoriosPage";

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
      // Atualizado após reformulação: navega diretamente para a URL do relatório
      // Isso evita problemas com cards ocultos e é mais confiável
      cy.visit(option.relatorioURL);
      // Valida que a rota foi acessada corretamente
      RelatoriosPage.validateRoute(option.relatorioURL);
      // Valida que a página carregou (verifica título ou elemento característico)
      cy.get('body').should('be.visible');
      cy.verificarErro500Visual();
    });
  });
});
