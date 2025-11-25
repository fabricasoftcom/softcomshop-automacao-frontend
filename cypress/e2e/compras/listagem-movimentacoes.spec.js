import MenulateralProdutoPage from '../../support/pages/menulateral/menulateralprodutopage';
import ListagemMovimentacoesPage from '../../support/pages/Movimentacoes/ListagemMovimentacoesPage';

describe('Listagem de Movimentações', { tags: ['@compras', '@regressivo', '@listagem-movimentacoes'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    MenulateralProdutoPage.acessarListagemMovimentacoes();
  });

  it('Deve filtrar movimentações por operação', () => {
    cy.intercept('GET', '/movimentacao*').as('pesquisarMovimentacao');

    ListagemMovimentacoesPage.clicarPesquisa();
    ListagemMovimentacoesPage.preencherOperacao('ENTRADA');
    ListagemMovimentacoesPage.clicarPesquisar();
    cy.wait('@pesquisarMovimentacao').its('response.statusCode').should('eq', 200);

    ListagemMovimentacoesPage.verificarTabelaVisivel();
    ListagemMovimentacoesPage.obterLinhasVisiveis().should('have.length.greaterThan', 0);
  });
});

