import JustificativaListagemPage from '../../support/pages/Configuracoes/JustificativaListagemPage';

describe('Listagem de justificativas', { tags: ['@configuracoes', '@justificativa', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    JustificativaListagemPage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    JustificativaListagemPage.validarTabelaCarregada();
    JustificativaListagemPage.abrirFormularioPesquisa();
    JustificativaListagemPage.validarFormularioPesquisaVisivel();
  });

  it('aplica filtro por descricao e valida resultado', () => {
    const descricao = 'DESISTENCIA';
    JustificativaListagemPage.pesquisarPorDescricao(descricao);
    JustificativaListagemPage.validarResultadoPorDescricao(descricao);
  });

  it('navega para novo cadastro ao clicar no botao Novo Cadastro', () => {
    JustificativaListagemPage.clicarBotaoNovo();
    cy.url().should('include', '/configuracao/tipo-justificativa/novo');
  });

  it('abre a edicao do primeiro registro da listagem', () => {
    JustificativaListagemPage.validarTabelaCarregada();
    JustificativaListagemPage.abrirEdicaoPrimeiraLinha();
    cy.url().should('match', /\/configuracao\/tipo-justificativa\/\d+\/editar/);
  });
});

