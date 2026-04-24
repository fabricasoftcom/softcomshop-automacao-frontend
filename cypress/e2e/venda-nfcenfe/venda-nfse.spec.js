import CadastroVendaPage from '../../support/pages/Venda/CadastroVendaPage';
import VendaNfsePage from '../../support/pages/Venda/VendaNfsePage';

describe('Realizar venda com NFSe', { tags: ['@venda-nfse', '@vendas', '@fiscal', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessaoNFSe();
    cy.visit('/');
    CadastroVendaPage.acessarNovoCadastro();
  });

  it('Deve gerar NFSe com sucesso a partir de uma venda com serviço a01', () => {
    CadastroVendaPage.selecionarClientePorNome();
    CadastroVendaPage.selecionarPrimeiroVendedorDisponivel();

    CadastroVendaPage.adicionarProdutoPeloAutocomplete('serviço a01', 0);
    CadastroVendaPage.gerarPagamentoPadrao();

    VendaNfsePage.gerarNfseViaMaisAcoes();
    VendaNfsePage.confirmarGeracaoSeNecessario();
    VendaNfsePage.validarSucessoGeracaoNfse();
    VendaNfsePage.emitirECancelarNfse();
  });
});

