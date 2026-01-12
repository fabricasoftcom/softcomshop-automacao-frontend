import PesquisaPrecoPage from "../../support/pages/Produto/PesquisaPrecoPage";

describe('Produto > Pesquisa Preço', { tags: ['@produto', '@pesquisa-preco', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    PesquisaPrecoPage.acessarViaMenu();
  });

  it('Deve exibir a tela de Pesquisa Preço com todos os elementos principais', () => {
    PesquisaPrecoPage.validarAcesso();
    PesquisaPrecoPage.validarElementosPrincipais();
  });

  it('Deve realizar busca por código de produto', () => {
    const codigo = '265';

    PesquisaPrecoPage.preencherBusca(codigo);
    PesquisaPrecoPage.validarResultados(codigo);
  });

  it('Deve exibir detalhes ao selecionar um produto', () => {
    PesquisaPrecoPage.selecionarPrimeiraLinha();
    PesquisaPrecoPage.validarSecaoDetalhes();
  });
});

