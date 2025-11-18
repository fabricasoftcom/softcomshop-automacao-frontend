import VendaPage from '../../support/pages/Venda/VendaPage';

describe('Realizar venda', { tags: ['@venda-nfce', '@vendas', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
   // VendaPage.selecionarEmpresaPadrao();
    VendaPage.acessarPaginaVenda();
  });

  it('Realizar venda com sucesso', () => {
    VendaPage.selecionarClienteAlternativo();
    VendaPage.informarVendedor();
    VendaPage.adicionarProduto();
    VendaPage.adicionarPagamento();
    VendaPage.gerarNFCe();
    VendaPage.confirmacaoEmissaoNFCe();
  });
});
