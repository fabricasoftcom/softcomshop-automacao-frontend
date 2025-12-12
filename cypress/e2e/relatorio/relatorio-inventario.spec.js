import RelatorioInventarioPage from "../../support/pages/relatorios/RelatorioInventarioPage";

describe('Relatorio de Inventario', { tags: ['@relatorios', '@produtos', '@inventario', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioInventarioPage.acessarRelatorioInventario();
    RelatorioInventarioPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Inventario', () => {
    RelatorioInventarioPage.validarElementosBasicos();
  });

  it('Deve permitir gerar o relatorio de Inventario', () => {
    RelatorioInventarioPage.gerarInventario();
    cy.url().should('contain', '/relatorio/inventario');
    cy.verificarErro500Visual();
  });
});

