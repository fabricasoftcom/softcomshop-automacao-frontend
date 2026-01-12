import DashboardEstoquePage from '../../support/pages/Estoque/DashboardEstoquePage';

describe('Dashboard de Estoque', { tags: ['@estoque', '@dashboard', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    DashboardEstoquePage.visitar();
  });

  it('Deve carregar os cards do dashboard corretamente', () => {
    DashboardEstoquePage.validarCardsVisiveis();
  });
});

