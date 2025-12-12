import RelatorioEvolucaoPage from "../../support/pages/relatorios/RelatorioEvolucaoPage";

describe('Relatorio de Evolucao', { tags: ['@relatorios', '@vendas', '@evolucao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioEvolucaoPage.acessarRelatorioEvolucao();
    RelatorioEvolucaoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Evolucao', () => {
    RelatorioEvolucaoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Evolucao', () => {
    RelatorioEvolucaoPage.pesquisar();
    cy.url().should('contain', '/relatorio/evolucao');
    cy.verificarErro500Visual();
  });
});

