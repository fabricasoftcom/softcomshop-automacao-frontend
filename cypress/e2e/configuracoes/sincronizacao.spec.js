import SincronizacaoPage from '../../support/pages/Configuracoes/SincronizacaoPage';

describe('Sincronização - Responsável Técnico', { tags: ['@configuracoes', '@sincronizacao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir a tela de sincronização corretamente', () => {
    SincronizacaoPage.acessarTelaSincronizacao();
    SincronizacaoPage.validarPerguntaExibida();
    SincronizacaoPage.validarInformacoesSincronizacao();
    SincronizacaoPage.validarBotaoSincronizar();
  });

  it('deve permitir clicar no botão de sincronizar dados', () => {
    SincronizacaoPage.acessarTelaSincronizacao();
    SincronizacaoPage.validarBotaoSincronizar();
    SincronizacaoPage.clicarSincronizar();
    SincronizacaoPage.validarSincronizacaoIniciada();
  });

  it('deve validar que as informações de última e próxima sincronização são exibidas', () => {
    SincronizacaoPage.acessarTelaSincronizacao();
    SincronizacaoPage.validarInformacoesSincronizacao();
    SincronizacaoPage.validarFormatoDatasSincronizacao();
  });
});

