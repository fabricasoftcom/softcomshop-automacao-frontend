import RelatorioUltimasComprasPage from "../../support/pages/relatorios/RelatorioUltimasComprasPage";

describe('Relatorio de Ultimas Compras', { tags: ['@relatorios', '@clientes', '@ultimas-compras', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioUltimasComprasPage.acessarRelatorioUltimasCompras();
  });

  it('Deve exibir os elementos basicos do relatorio de Ultimas Compras', () => {
    RelatorioUltimasComprasPage.validarElementosBasicos();
  });

  it('Deve exibir vendas no relatorio de Ultimas Compras', () => {
    RelatorioUltimasComprasPage.validarExibicaoVendas();
    cy.verificarErro500Visual();
  });

  it('Deve exibir paginacao quando houver multiplas paginas', () => {
    RelatorioUltimasComprasPage.validarPaginacao();
    cy.verificarErro500Visual();
  });
});

