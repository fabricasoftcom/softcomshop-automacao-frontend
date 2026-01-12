import MeuLucroPage from '../../support/pages/Financeiro/MeuLucroPage';

describe('Meu Lucro - Dashboard Financeiro', { tags: ['@financeiro', '@meu-lucro', '@dashboard', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir a tela Meu Lucro corretamente', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarTelaCarregada();
    MeuLucroPage.validarCampoData();
  });

  it('deve exibir todos os elementos principais da tela', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarElementosPrincipais();
  });

  it('deve exibir os botões principais (Configurações e Gerar PDF)', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarBotaoConfiguracoes();
    MeuLucroPage.validarBotaoGerarPdf();
  });

  it('deve exibir as tabs de Lucro Realizado e Lucro Projetado', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarTabLucroRealizado();
    MeuLucroPage.validarTabLucroProjetado();
  });

  it('deve permitir alternar entre as tabs', () => {
    MeuLucroPage.acessarTela();
    // Valida que está na tab Realizado inicialmente
    MeuLucroPage.validarTabRealizadoVisivel();
    // Alterna para Projetado
    MeuLucroPage.clicarTabLucroProjetado();
    MeuLucroPage.validarTabProjetadoVisivel();
    // Retorna para Realizado
    MeuLucroPage.clicarTabLucroRealizado();
    MeuLucroPage.validarTabRealizadoVisivel();
  });

  it('deve exibir a seção de Meta de Lucro', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarSecaoMetaLucro();
    MeuLucroPage.validarCampoMetaLucro();
    MeuLucroPage.validarBotaoEditarMeta();
  });

  it('deve exibir a tabela de Ponto de Equilíbrio', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarTabelaPontoEquilibrio();
    MeuLucroPage.validarTabelaPontoEquilibrioTemDados();
  });

  it('deve exibir a seção de gráfico do Ponto de Equilíbrio', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarSecaoGrafico();
  });

  it('deve abrir e fechar o modal de configurações', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.abrirModalConfiguracoes();
    MeuLucroPage.validarModalConfiguracoesVisivel();
    MeuLucroPage.fecharModalConfiguracoes();
  });

  it('deve exibir todos os campos do modal de configurações', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.abrirModalConfiguracoes();
    MeuLucroPage.validarCamposModalConfiguracoes();
    MeuLucroPage.fecharModalConfiguracoes();
  });

  it('deve validar URL do botão Gerar PDF', () => {
    MeuLucroPage.acessarTela();
    MeuLucroPage.validarUrlGerarPdf();
  });
});

