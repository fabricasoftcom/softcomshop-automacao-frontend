import RelatorioTabelaPrecoPage from "../../support/pages/relatorios/RelatorioTabelaPrecoPage";

describe('Relatorio de Tabela de Preco', { tags: ['@relatorios', '@produtos', '@tabela-preco', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioTabelaPrecoPage.acessarRelatorioTabelaPreco();
    RelatorioTabelaPrecoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Tabela de Preco', () => {
    RelatorioTabelaPrecoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Tabela de Preco', () => {
    RelatorioTabelaPrecoPage.pesquisar();
    cy.url().should('contain', '/relatorio/tabela-preco');
    cy.verificarErro500Visual();
  });
});

