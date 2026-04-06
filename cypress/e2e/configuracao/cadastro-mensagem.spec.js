import MensagemCadastroPage from '../../support/pages/MensagemCadastroPage';

describe('Cadastro de Mensagens', { tags: ['@venda-mais', '@mensagem', '@configuracao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir os elementos principais do formulário de cadastro', () => {
    MensagemCadastroPage.visit();
    MensagemCadastroPage.verificarLayoutBasico();
  });

  it('deve realizar cadastro de mensagem com assunto, título e mensagem', () => {
    MensagemCadastroPage.visit();
    const assunto = `Assunto teste ${Date.now()}`;
    const titulo = `Título teste ${Date.now()}`;
    const mensagem = 'Mensagem de teste para automação.';
    MensagemCadastroPage.preencherFormulario({ assunto, titulo, mensagem });
    MensagemCadastroPage.salvar();
    MensagemCadastroPage.validarMensagemSucesso();
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatórios', () => {
    MensagemCadastroPage.visit();
    MensagemCadastroPage.tentarSalvarSemCamposObrigatorios();
    MensagemCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve retornar para listagem ao clicar em Voltar', () => {
    MensagemCadastroPage.visit();
    MensagemCadastroPage.clicarBotaoVoltar();
    MensagemCadastroPage.validarRetornoListagem();
    cy.url().should('include', '/configuracao/mensagem');
    cy.url().should('not.include', '/novo');
  });
});
