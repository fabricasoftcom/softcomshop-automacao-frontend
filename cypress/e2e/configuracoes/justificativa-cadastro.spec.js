import JustificativaCadastroPage from '../../support/pages/Configuracoes/JustificativaCadastroPage';

describe('Cadastro de justificativa', { tags: ['@configuracoes', '@justificativa', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir os botoes principais do formulario', () => {
    JustificativaCadastroPage.visit();
    JustificativaCadastroPage.verificarLayoutBasico();
  });

  it('deve realizar cadastro completo de justificativa apenas com descricao', () => {
    JustificativaCadastroPage.visit();
    const descricao = `JUSTIFICATIVA_TESTE - ${new Date().toLocaleString()}`;
    JustificativaCadastroPage.preencherFormulario({ descricao });
    JustificativaCadastroPage.salvar();
    JustificativaCadastroPage.validarMensagemSucesso();

    // Após salvar, permanece na URL /novo (não redireciona)
    JustificativaCadastroPage.validarPermaneceNaTelaNovo();
  });

  it('deve realizar cadastro completo de justificativa com descricao e rotinas', () => {
    JustificativaCadastroPage.visit();
    const descricao = `JUSTIFICATIVA_TESTE - ${new Date().toLocaleString()}`;
    const rotinas = ['delivery'];
    JustificativaCadastroPage.preencherFormulario({ descricao, rotinas });
    JustificativaCadastroPage.salvar();
    JustificativaCadastroPage.validarMensagemSucesso();

    // Após salvar, permanece na URL /novo (não redireciona)
    JustificativaCadastroPage.validarPermaneceNaTelaNovo();
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    JustificativaCadastroPage.visit();
    JustificativaCadastroPage.tentarSalvarSemCamposObrigatorios();
    JustificativaCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve retornar para listagem ao clicar em Voltar', () => {
    JustificativaCadastroPage.visit();
    JustificativaCadastroPage.clicarBotaoVoltar();
    JustificativaCadastroPage.validarRetornoListagem();
    cy.url().should('include', '/configuracao/tipo-justificativa');
    cy.url().should('not.include', '/novo');
  });
});

