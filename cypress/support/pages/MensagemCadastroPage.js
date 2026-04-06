import MensagemCadastroLocator from '../locators/MensagemCadastroLocator';

class MensagemCadastroPage {
  /**
   * Acessa o formulário de nova mensagem (Venda Mais)
   */
  visit() {
    cy.visit('/configuracao/mensagem/novo');
    cy.get(MensagemCadastroLocator.campoAssunto).should('be.visible');
  }

  /**
   * Acessa a listagem de mensagens
   */
  visitListagem() {
    cy.visit('/configuracao/mensagem');
    cy.get(MensagemCadastroLocator.tabelaMensagens, { timeout: 10000 }).should('exist');
  }

  /**
   * Verifica o layout básico do formulário
   */
  verificarLayoutBasico() {
    cy.get(MensagemCadastroLocator.tituloCadastro).should('be.visible');
    cy.get(MensagemCadastroLocator.btnVoltar).should('be.visible');
    cy.get(MensagemCadastroLocator.btnSalvar).should('be.visible');
    cy.get(MensagemCadastroLocator.campoAssunto).should('be.visible');
    cy.get(MensagemCadastroLocator.campoTitulo).should('be.visible');
  }

  /**
   * Preenche os campos obrigatórios e opcionais do formulário
   * @param {Object} dados - { assunto, titulo, mensagem?, canal?, tipo? }
   */
  preencherFormulario(dados) {
    if (dados.assunto) {
      cy.get(MensagemCadastroLocator.campoAssunto).clear().type(dados.assunto);
    }
    if (dados.titulo) {
      cy.get(MensagemCadastroLocator.campoTitulo).clear().type(dados.titulo);
    }
    if (dados.mensagem) {
      cy.get(MensagemCadastroLocator.campoMensagem).clear().type(dados.mensagem);
    }
    if (dados.canal) {
      cy.get(MensagemCadastroLocator.campoCanal).select(dados.canal, { force: true });
    }
    if (dados.tipo) {
      cy.get(MensagemCadastroLocator.campoTipo).select(dados.tipo, { force: true });
    }
  }

  /**
   * Clica no botão Salvar
   */
  clicarSalvar() {
    cy.get(MensagemCadastroLocator.btnSalvar).click();
  }

  /**
   * Salva o formulário
   */
  salvar() {
    this.clicarSalvar();
  }

  /**
   * Valida mensagem de sucesso (toast)
   */
  validarMensagemSucesso() {
    cy.get(MensagemCadastroLocator.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    this.clicarSalvar();
  }

  /**
   * Valida que o sistema não prosseguiu (campos obrigatórios não preenchidos):
   * permanece na URL de cadastro e o formulário continua visível.
   */
  validarErroCamposObrigatorios() {
    cy.url().should('include', '/configuracao/mensagem');
    cy.get(MensagemCadastroLocator.campoAssunto).should('be.visible');
  }

  /**
   * Clica no botão Voltar
   */
  clicarBotaoVoltar() {
    cy.get(MensagemCadastroLocator.btnVoltar).click();
  }

  /**
   * Valida retorno à listagem
   */
  validarRetornoListagem() {
    cy.url().should('include', '/configuracao/mensagem');
    cy.url().should('not.include', '/novo');
  }
}

export default new MensagemCadastroPage();
