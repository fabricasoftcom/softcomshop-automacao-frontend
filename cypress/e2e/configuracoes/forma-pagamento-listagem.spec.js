import FormaPagamentoListagemPage from '../../support/pages/Configuracoes/FormaPagamentoListagemPage';

describe('Listagem de formas de pagamento', { tags: ['@configuracoes', '@forma-pagamento', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    FormaPagamentoListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    FormaPagamentoListagemPage.validarTabelaCarregada();
    FormaPagamentoListagemPage.abrirFormularioPesquisa();
    FormaPagamentoListagemPage.validarFormularioPesquisaVisivel();
  });

  it('aplica filtro e valida resultado', () => {
    FormaPagamentoListagemPage.abrirFormularioPesquisa();
    FormaPagamentoListagemPage.submeterPesquisa();
    FormaPagamentoListagemPage.validarTabelaCarregada();
  });

  it('abre o modal de novo cadastro ao clicar no botao Novo Cadastro', () => {
    FormaPagamentoListagemPage.validarBotaoNovoCadastroVisivel();
    FormaPagamentoListagemPage.clicarBotaoNovo();
    FormaPagamentoListagemPage.validarModalAberto();
  });

  it('abre a edicao do primeiro registro da listagem', () => {
    FormaPagamentoListagemPage.validarTabelaCarregada();
    FormaPagamentoListagemPage.validarTabelaTemLinhas();
    FormaPagamentoListagemPage.abrirEdicaoPrimeiraLinha();
    FormaPagamentoListagemPage.validarModalAberto();
  });

  it('seleciona a primeira linha da tabela', () => {
    FormaPagamentoListagemPage.validarTabelaCarregada();
    FormaPagamentoListagemPage.selecionarPrimeiraLinha();
    FormaPagamentoListagemPage.validarPrimeiraLinhaSelecionada();
  });
});

