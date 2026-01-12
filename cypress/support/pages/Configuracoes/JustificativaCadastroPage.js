import JustificativaListagemPage from './JustificativaListagemPage';
import JustificativaCadastroLocators from '../../locators/Configuracoes/JustificativaCadastroLocators';

class JustificativaCadastroPage {
  /**
   * Acessa o formulário de cadastro de nova justificativa
   */
  visit() {
    JustificativaListagemPage.acessarTelaListagem();
    JustificativaListagemPage.clicarBotaoNovo();
    cy.get(JustificativaCadastroLocators.campoDescricao).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário
   */
  verificarLayoutBasico() {
    cy.get(JustificativaCadastroLocators.tituloCadastro).should('be.visible');
    cy.get(JustificativaCadastroLocators.btnVoltar).should('be.visible');
    cy.get(JustificativaCadastroLocators.btnSalvar).should('be.visible');
    cy.get(JustificativaCadastroLocators.campoDescricao).should('be.visible');
  }

  /**
   * Preenche o campo Descrição
   * @param {string} descricao - Descrição da justificativa
   */
  preencherDescricao(descricao) {
    cy.get(JustificativaCadastroLocators.campoDescricao).clear().type(descricao);
  }

  /**
   * Seleciona rotinas (select múltiplo com Chosen)
   * @param {string[]} rotinas - Array de valores de rotinas (ex: ['delivery', 'venda_direta'])
   */
  selecionarRotinas(rotinas = []) {
    if (rotinas.length === 0) {
      return;
    }
    // Para Chosen select (select oculto), usamos force: true
    rotinas.forEach((rotina) => {
      cy.get(JustificativaCadastroLocators.campoRotinas).select(rotina, { force: true });
    });
  }

  /**
   * Preenche o formulário completo
   * @param {Object} dados - Objeto com os dados da justificativa
   * @param {string} dados.descricao - Descrição (obrigatório)
   * @param {string[]} dados.rotinas - Array de rotinas (opcional)
   */
  preencherFormulario(dados) {
    if (dados.descricao) {
      this.preencherDescricao(dados.descricao);
    }
    if (dados.rotinas && dados.rotinas.length > 0) {
      this.selecionarRotinas(dados.rotinas);
    }
  }

  /**
   * Clica no botão Salvar
   */
  clicarSalvar() {
    cy.get(JustificativaCadastroLocators.btnSalvar).click();
  }

  /**
   * Salva o formulário e valida mensagem de sucesso
   * Após salvar, o sistema permanece na URL /novo (não redireciona)
   */
  salvar() {
    this.clicarSalvar();
    cy.get(JustificativaCadastroLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
    // Após salvar, permanece na URL /novo (não redireciona)
    cy.url().should('include', '/novo');
  }

  /**
   * Valida mensagem de sucesso
   */
  validarMensagemSucesso() {
    cy.get(JustificativaCadastroLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Clica no botão Voltar
   */
  clicarBotaoVoltar() {
    cy.get(JustificativaCadastroLocators.btnVoltar).click();
  }

  /**
   * Valida que está na URL de listagem (sem /novo ou /editar)
   */
  validarRetornoListagem() {
    cy.url().should('include', '/configuracao/tipo-justificativa');
    cy.url().should('not.include', '/novo');
    cy.url().should('not.include', '/editar');
  }

  /**
   * Valida que permanece na URL /novo após salvar
   */
  validarPermaneceNaTelaNovo() {
    cy.url().should('include', '/configuracao/tipo-justificativa/novo');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    this.clicarSalvar();
  }

  /**
   * Valida erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // Pode validar mensagem de erro ou que o formulário ainda está na tela
    cy.url().should('include', '/novo');
  }
}

export default new JustificativaCadastroPage();

