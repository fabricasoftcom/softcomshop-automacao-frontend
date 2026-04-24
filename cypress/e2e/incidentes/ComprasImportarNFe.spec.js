import CompraPage from '../../support/pages/Compra/CompraPage';

/** Chave documentada em ai-reports/incidents-analysis.md (regressão erro 500 na consulta). */
const CHAVE_NFE_INCIDENTE = '25260100778553000170550010003112081690824107';

describe('Incidentes > Compras > Importar NFe por chave', { tags: ['@incidentes', '@compras', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    CompraPage.acessarPaginaCompra();
  });

  it('Deve importar NFe pela chave de acesso sem erro 500 na interface', () => {
    CompraPage.importarNFePorChaveAcesso(CHAVE_NFE_INCIDENTE);
    cy.verificarErro500Visual();
  });
});
