import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';

describe('Listagem NFe', { tags: ['@nfe', '@vendas', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    ListagemNfePage.visitar();
    ListagemNfePage.validarCarregamento();
  });

  it('aplica filtro avancado por numero e serie dinamicos', () => {
    ListagemNfePage.capturarNumeroESeriePrimeiraLinha().then((dados) => {
      ListagemNfePage.aplicarFiltroNumeroSerie(dados);
      ListagemNfePage.validarResultadoNumeroSerie(dados);
    });
  });

  it('bloqueia exclusao sem selecionar registros', () => {
    ListagemNfePage.clicarExcluirSelecionados();
    ListagemNfePage.validarAlertaSemSelecao();
  });

  it('marca todos os itens ao selecionar o checkbox geral', () => {
    ListagemNfePage.selecionarTodosRegistros();
    ListagemNfePage.verificarPrimeiraLinhaSelecionada();
  });

  it('aplica filtro por destinatario e serie usando autocomplete', () => {
    cy.intercept('GET', '**/nfe**').as('buscarNfe');
    ListagemNfePage.aplicarFiltroDestinatarioESerie({
      destinatarioNome: 'henrique',
      destinatarioId: '79560259000147',
      serie: '301',
    });
    cy.wait('@buscarNfe');
    ListagemNfePage.validarParametrosNaUrl({
      auto_destinatario_nome: 'henrique',
      destinatario_nome: '79560259000147',
      serie: '301',
    });
  });

  it('envia o periodo selecionado ao pesquisar pela barra inferior', () => {
    const periodo = '17/11/2025 - 18/11/2025';
    cy.intercept('GET', '**/nfe**').as('buscarNfePeriodo');
    ListagemNfePage.preencherPeriodo(periodo);
    ListagemNfePage.acionarPesquisaInferior();
    cy.wait('@buscarNfePeriodo');
    ListagemNfePage.validarParametrosNaUrl({ periodo });
  });
});
