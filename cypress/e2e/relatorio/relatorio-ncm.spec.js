import RelatorioNcmPage from "../../support/pages/relatorios/RelatorioNcmPage";

describe('Relatorio de NCM', { tags: ['@relatorios', '@produtos', '@ncm', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioNcmPage.acessarRelatorioNcm();
    RelatorioNcmPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de NCM', () => {
    RelatorioNcmPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de NCM', () => {
    RelatorioNcmPage.pesquisar();
    cy.url().should('contain', '/relatorio/ncm');
    cy.verificarErro500Visual();
  });
});

