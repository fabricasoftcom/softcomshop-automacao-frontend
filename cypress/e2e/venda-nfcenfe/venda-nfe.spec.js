import VendaPage from '../../support/pages/Venda/VendaPage';

describe('Realizar venda com nfe', { tags: ['@venda-nfe', '@vendas', '@regressivo'] }, () => {
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
    VendaPage.gerarNFe();
    VendaPage.confirmacaoEmissaoNFe();
  });
});
