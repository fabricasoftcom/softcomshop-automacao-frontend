import CartaoListagemPage from '../../support/pages/Configuracoes/CartaoListagemPage';

describe('Listagem de cartões', { tags: ['@configuracoes', '@cartao', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    CartaoListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.abrirFormularioPesquisa();
    CartaoListagemPage.validarFormularioPesquisaVisivel();
  });

  it('aplica filtro e valida resultado', () => {
    CartaoListagemPage.abrirFormularioPesquisa();
    CartaoListagemPage.submeterPesquisa();
    CartaoListagemPage.validarTabelaCarregada();
  });

  it('abre o modal de novo cadastro ao clicar no botao Novo Cadastro', () => {
    CartaoListagemPage.validarBotaoNovoCadastroVisivel();
    CartaoListagemPage.clicarBotaoNovo();
    CartaoListagemPage.validarModalAberto();
  });

  it('abre a edicao do primeiro registro da listagem', () => {
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.validarTabelaTemLinhas();
    CartaoListagemPage.abrirEdicaoPrimeiraLinha();
    CartaoListagemPage.validarModalAberto();
  });

  it('seleciona a primeira linha da tabela', () => {
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.selecionarPrimeiraLinha();
    CartaoListagemPage.validarPrimeiraLinhaSelecionada();
  });
});

