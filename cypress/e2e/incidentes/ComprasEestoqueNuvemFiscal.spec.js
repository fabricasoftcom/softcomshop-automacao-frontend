import MenulateralProdutoPage from '../../support/pages/menulateral/MenulateralProdutoPage';
import NuvemFiscalListagemPage from '../../support/pages/NuvemFiscal/NuvemFiscalListagemPage';

describe('Incidentes > Compras e Estoque > Nuvem Fiscal', { tags: ['@incidentes', '@compras', '@nuvem-fiscal', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('value is not a function') || err.message.includes('$(...).value')) {
        return false;
      }
      return true;
    });
    cy.loginArmazenandoSessao();
    cy.visit('/');
    MenulateralProdutoPage.acessarListagemNuvemFiscal();
  });

  it('Deve acessar a listagem e pesquisar sem falha crítica de infraestrutura (host/500)', () => {
    cy.intercept({ url: /azurewebsites\.net|nuvemfiscal/i }, (req) => {
      req.on('response', (res) => {
        expect(res.statusCode, `${req.method} ${req.url}`).to.be.lessThan(500);
      });
    });
    NuvemFiscalListagemPage.filtrarPorCienciaOperacao();
    NuvemFiscalListagemPage.validarAcessoEPesquisaSemFalhaCritica();
  });
});
