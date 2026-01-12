import TaEmOrdemPage from '../../support/pages/TaEmOrdem/TaEmOrdemPage';

describe('Tá em ordem - Dashboard', { tags: ['@dashboard', '@ta-em-ordem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir a tela Tá em ordem corretamente', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarTelaCarregada();
    TaEmOrdemPage.validarCampoDataMes();
  });

  it('deve exibir todos os comboboxes de filtro', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarComboboxVendasHoje();
    TaEmOrdemPage.validarComboboxTicketMedio();
    TaEmOrdemPage.validarComboboxRankingProdutos();
  });

  it('deve validar que os comboboxes possuem opções disponíveis', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarComboboxesTemOpcoes();
  });

  it('deve exibir os cards de informações (totalizadores)', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarTotalizadoresVisiveis();
  });

  it('deve exibir a tabela de ranking de produtos', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarTabelaRanking();
    TaEmOrdemPage.validarTabelaRankingTemDados();
  });

  it('deve exibir todos os links de ação rápida', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarLinksAcaoRapida();
  });

  it('deve exibir todas as seções de gráficos', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarSecoesGraficos();
  });

  it('deve validar URLs dos links de ação rápida', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarNavegacaoLinksAcaoRapida();
  });

  it('deve validar estrutura da tabela de ranking (colunas)', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarTabelaRanking();
    TaEmOrdemPage.validarEstruturaTabelaRanking();
  });

  it('deve validar que os totalizadores exibem valores', () => {
    TaEmOrdemPage.acessarTela();
    TaEmOrdemPage.validarTotalizadoresVisiveis();
    TaEmOrdemPage.validarTotalizadoresTemValores();
  });

  it('deve validar alteração do filtro de ranking e atualização da tabela', () => {
    TaEmOrdemPage.acessarTela();

    // Valida que o combobox está habilitado
    TaEmOrdemPage.validarComboboxRankingHabilitado();

    // Altera para MARGEM DE LUCRO e valida
    TaEmOrdemPage.alterarRankingEValidarTabela('RANKING DE PRODUTOS - MARGEM DE LUCRO');

    // Retorna para VALOR VENDA e valida
    TaEmOrdemPage.alterarRankingEValidarTabela('RANKING DE PRODUTOS - VALOR VENDA');
  });
});

