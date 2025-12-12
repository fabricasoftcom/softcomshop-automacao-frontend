import RelatorioExibirEstoquePage from "../../support/pages/relatorios/RelatorioExibirEstoquePage";

describe('Relatorio de Exibir Estoque', { tags: ['@relatorios', '@produtos', '@exibir-estoque', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioExibirEstoquePage.acessarRelatorioExibirEstoque();
    RelatorioExibirEstoquePage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Exibir Estoque', () => {
    RelatorioExibirEstoquePage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Exibir Estoque', () => {
    RelatorioExibirEstoquePage.pesquisar();
    cy.url().should('contain', '/relatorio/exibir-estoque');
    cy.verificarErro500Visual();
  });
});

