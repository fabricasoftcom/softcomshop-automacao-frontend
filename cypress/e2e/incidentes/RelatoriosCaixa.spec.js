import RelatorioCaixaPage from '../../support/pages/relatorios/RelatorioCaixaPage';

describe('Incidentes > Relatórios > Caixa > PDF período longo', { tags: ['@incidentes', '@relatorios', '@caixa', '@regressivo'] }, () => {
  it('Deve pesquisar período longo e acionar Gerar PDF sem erro 500/504', { defaultCommandTimeout: 120000 }, () => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioCaixaPage.acessarRelatorioCaixa();
    RelatorioCaixaPage.preencherPesquisarEGerarPdfPeriodoLongo(15);
  });
});
