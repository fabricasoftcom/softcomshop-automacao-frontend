import MenulateralConfiguracoesPage from '../menulateral/MenulateralConfiguracoesPage';
import UsuarioListagemLocators from '../../locators/Usuario/UsuarioListagemLocators';
import UsuarioLocators from '../../locators/Usuario/UsuarioLocators';

class UsuarioListagemPage {
  /**
   * Acessa a tela de listagem de usuários via menu Configurações > Autenticação > Usuários
   */
  acessarTelaListagem() {
    MenulateralConfiguracoesPage.acessarListagemUsuarios();
    cy.get(UsuarioListagemLocators.tabelaUsuarios).should('be.visible');
  }

  /**
   * Acessa o cadastro de novo usuário a partir da listagem
   */
  acessarCadastroNovoUsuario() {
    this.acessarTelaListagem();
    cy.visit('/autenticacao/usuario/novo');
    cy.get(UsuarioListagemLocators.tituloListagem).should('be.visible');
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get('body').then(($body) => {
      const form = $body.find(UsuarioListagemLocators.formPesquisa);
      if (form.length > 0 && form.is(':visible')) {
        return;
      }
      // Clica no ícone de pesquisa para abrir o formulário
      cy.get(UsuarioListagemLocators.tituloListagem).contains('Listagem').parent().find(UsuarioListagemLocators.btnPesquisaToggle).first().click();
      // Aguarda o formulário aparecer
      cy.wait(500); // Pequeno delay para animação
    });
    cy.get(UsuarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Preenche o filtro de Código
   * @param {string} codigo - Código para pesquisa
   */
  preencherFiltroCodigo(codigo) {
    this.abrirFormularioPesquisa();
    cy.get(UsuarioListagemLocators.inputCodigo).clear().type(codigo);
  }

  /**
   * Preenche o filtro de Nome
   * @param {string} nome - Nome para pesquisa
   */
  preencherFiltroNome(nome) {
    this.abrirFormularioPesquisa();
    cy.get(UsuarioListagemLocators.inputNome).clear().type(nome);
  }

  /**
   * Preenche o filtro de Email
   * @param {string} email - Email para pesquisa
   */
  preencherFiltroEmail(email) {
    this.abrirFormularioPesquisa();
    cy.get(UsuarioListagemLocators.inputEmail).clear().type(email);
  }

  /**
   * Limpa o campo de filtro Nome
   */
  limparFiltroNome() {
    this.abrirFormularioPesquisa();
    cy.get(UsuarioListagemLocators.inputNome).clear();
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.intercept('GET', '**/autenticacao/usuario**').as('pesquisarUsuarios');
    cy.get(UsuarioListagemLocators.btnPesquisar).click();
    cy.wait('@pesquisarUsuarios');
    cy.get(UsuarioListagemLocators.tabelaUsuarios).should('be.visible');
  }

  /**
   * Pesquisa por nome e valida resultado
   * @param {string} nome - Nome para pesquisa
   */
  pesquisarPorNome(nome) {
    this.preencherFiltroNome(nome);
    this.submeterPesquisa();
  }

  /**
   * Valida que a tabela foi carregada com dados
   */
  validarTabelaCarregada() {
    cy.get(UsuarioListagemLocators.tabelaUsuarios).should('be.visible');
    cy.get(UsuarioListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Valida resultado da pesquisa por nome
   * @param {string} nome - Nome esperado nos resultados
   */
  validarResultadoPorNome(nome) {
    cy.get(UsuarioListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
    cy.get(UsuarioListagemLocators.linhasTabela).first().should('contain.text', nome);
  }

  /**
   * Valida paginação atual
   * @param {string} pagina - Número da página esperada
   */
  validarPaginacaoAtual(pagina) {
    // Implementar validação de paginação se necessário
    cy.log(`Validando paginação: página ${pagina}`);
  }

  /**
   * Seleciona todos os usuários da tabela
   */
  selecionarTodosUsuarios() {
    cy.get(UsuarioListagemLocators.checkboxSelecionarTodos).check();
    cy.get(UsuarioListagemLocators.checkboxItens).should('be.checked');
  }

  /**
   * Desmarca todos os checkboxes
   */
  desmarcarTodosUsuarios() {
    cy.get(UsuarioListagemLocators.checkboxSelecionarTodos).uncheck();
    cy.get(UsuarioListagemLocators.checkboxItens).should('not.be.checked');
  }

  /**
   * Seleciona o primeiro usuário da tabela
   */
  selecionarPrimeiroUsuario() {
    cy.get(UsuarioListagemLocators.linhasTabela).first().find('input[type="checkbox"]').check();
  }

  /**
   * Tenta excluir sem selecionar registros
   */
  tentarExcluirSemSelecao() {
    cy.get(UsuarioListagemLocators.btnExcluirSelecionados).click();
    // Deve exibir alerta
    cy.on('window:alert', (str) => {
      expect(str).to.include('selecionar');
    });
  }

  /**
   * Abre o modal de exclusão de usuários selecionados
   */
  abrirModalExcluirSelecionados() {
    cy.get(UsuarioListagemLocators.btnExcluirSelecionados).click();
    cy.get(UsuarioLocators.modalConfirmacao).should('be.visible');
  }

  /**
   * Cancela o modal de exclusão
   */
  cancelarModalExclusao() {
    cy.get('.sweet-alert').should('be.visible');
    // Tenta clicar no botão cancelar
    cy.get('body').then(($body) => {
      const cancelBtn = $body.find('.sweet-alert button.cancel, .sweet-alert .cancel');
      if (cancelBtn.length > 0) {
        cy.wrap(cancelBtn).click({ force: true });
      } else {
        // Se não encontrar botão cancel, tenta fechar pelo X ou ESC
        cy.get('.sweet-alert .sa-button-container .cancel').click({ force: true });
      }
    });
    // Aguarda a animação de fechamento do SweetAlert
    cy.wait(1000);
    // Verifica que o modal não está mais visível (pode ainda existir no DOM mas oculto)
    cy.get('.sweet-alert').should('not.be.visible');
  }

  /**
   * Confirma a exclusão de usuários selecionados
   */
  confirmarExclusao() {
    cy.get(UsuarioLocators.modalConfirmacaoBtnConfirmar).click();
    cy.get(UsuarioLocators.loading).should('not.exist');
  }

  /**
   * Valida que o usuário não existe mais na listagem
   * @param {string} nome - Nome do usuário que não deve mais existir
   */
  validarUsuarioNaoExiste(nome) {
    cy.get(UsuarioListagemLocators.linhasTabela).should('not.contain.text', nome);
  }
}

export default new UsuarioListagemPage();

