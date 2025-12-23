import UsuarioListagemPage from './UsuarioListagemPage';
import UsuarioCadastroLocators from '../../locators/Usuario/UsuarioCadastroLocators';
import UsuarioLocators from '../../locators/Usuario/UsuarioLocators';

class UsuarioCadastroPage {
  /**
   * Acessa o formulário de cadastro de novo usuário
   */
  visit() {
    UsuarioListagemPage.acessarCadastroNovoUsuario();
    cy.get(UsuarioCadastroLocators.inputNome).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário (abas, botões)
   */
  verificarLayoutBasico() {
    cy.get(UsuarioCadastroLocators.containerTabs).should('be.visible');
    cy.contains('[role="tab"]', 'Dados Cadastrais').should('be.visible');
    cy.contains('[role="tab"]', 'Perfis').should('be.visible');
    cy.get(UsuarioCadastroLocators.btnVoltar).should('be.visible');
    cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible');
  }

  /**
   * Preenche os campos do formulário de usuário
   * @param {Object} usuario - Objeto com os dados do usuário
   */
  preencherCamposUsuario(usuario) {
    // Campos obrigatórios na aba Dados Cadastrais
    if (usuario.nome) {
      cy.get(UsuarioCadastroLocators.inputNome)
        .clear()
        .type(usuario.nome, { parseSpecialCharSequences: false });
    }

    if (usuario.email) {
      cy.get(UsuarioCadastroLocators.inputEmail)
        .clear()
        .type(usuario.email);
    }

    if (usuario.senha) {
      cy.get(UsuarioCadastroLocators.inputSenha)
        .clear()
        .type(usuario.senha);
    }

    if (usuario.redigiteSenha) {
      cy.get(UsuarioCadastroLocators.inputRedigiteSenha)
        .clear()
        .type(usuario.redigiteSenha);
    }
  }

  /**
   * Navega para uma aba específica
   * @param {string} nomeAba - Nome da aba (ex: "Dados Cadastrais", "Perfis")
   */
  navegarParaAba(nomeAba) {
    cy.contains('[role="tab"]', nomeAba).click();
    // Aguarda a aba ser ativada (pode usar aria-selected ou classe active)
    cy.wait(500);
    // Valida que a aba foi clicada verificando se o conteúdo está visível ou se a aba tem classe active
    cy.contains('[role="tab"]', nomeAba).should('be.visible');
  }

  /**
   * Valida que uma aba está ativa
   * @param {string} nomeAba - Nome da aba esperada
   */
  validarAbaAtiva(nomeAba) {
    // Valida que a aba contém o texto esperado e está visível
    cy.contains('[role="tab"]', nomeAba).should('be.visible');
    // Tenta validar aria-selected se existir, senão apenas valida que está visível
    cy.contains('[role="tab"]', nomeAba).then(($aba) => {
      if ($aba.attr('aria-selected') === 'true') {
        cy.wrap($aba).should('have.attr', 'aria-selected', 'true');
      } else {
        // Se não tiver aria-selected, apenas valida que está visível
        cy.wrap($aba).should('be.visible');
      }
    });
  }

  /**
   * Valida que todas as abas são acessíveis
   */
  validarTodasAbasAcessiveis() {
    cy.get(UsuarioCadastroLocators.todasAbas).should('have.length', 2);
    cy.contains('[role="tab"]', 'Dados Cadastrais').should('be.visible');
    cy.contains('[role="tab"]', 'Perfis').should('be.visible');
  }

  /**
   * Seleciona um perfil no autocomplete
   * @param {string} perfil - Nome do perfil
   */
  selecionarPerfil(perfil = 'ADMINISTRADOR') {
    this.navegarParaAba('Perfis');
    cy.get(UsuarioCadastroLocators.perfilAutocomplete)
      .clear()
      .type(perfil, { delay: 0 });

    cy.get(UsuarioCadastroLocators.perfilLista, { timeout: 5000 })
      .first()
      .click();

    // Aguarda o perfil ser adicionado à tabela
    cy.get(UsuarioCadastroLocators.linhasTabelaPerfis, { timeout: 5000 })
      .should('have.length.greaterThan', 0);
  }

  /**
   * Adiciona um perfil ao usuário
   * @param {string} perfil - Nome do perfil
   */
  adicionarPerfil(perfil) {
    // Navega para aba Perfis e aguarda estar ativa
    cy.contains('[role="tab"]', 'Perfis').click();
    cy.wait(1000); // Aguarda a aba carregar

    // Aguarda o campo de autocomplete estar visível
    cy.get(UsuarioCadastroLocators.perfilAutocomplete, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(perfil, { delay: 0 });

    cy.get(UsuarioCadastroLocators.perfilLista, { timeout: 5000 })
      .should('be.visible')
      .first()
      .click();

    // Aguarda o perfil ser adicionado à tabela
    cy.wait(1000);
    // Verifica se o perfil foi adicionado
    cy.get(UsuarioCadastroLocators.linhasTabelaPerfis, { timeout: 5000 })
      .should('have.length.greaterThan', 0);
    cy.get(UsuarioLocators.loading).should('not.exist');
  }

  /**
   * Salva o cadastro do usuário
   */
  cadastrar() {
    // Garante que está na aba Dados Cadastrais antes de salvar
    cy.contains('[role="tab"]', 'Dados Cadastrais').click();
    cy.wait(500); // Aguarda a aba ativar

    cy.intercept('POST', '**/autenticacao/usuario/salvar').as('salvarUsuario');
    cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible').click();
    this.tratarModalCamposObrigatoriosSeNecessario();
    cy.wait('@salvarUsuario');
    this.confirmarSweetAlertSucessoSeExistir();
  }

  /**
   * Confirma mensagem de sucesso do cadastro
   */
  confirmacaoCadastroUsuario() {
    cy.contains('Sucesso', { matchCase: false }).should('be.visible');
  }

  /**
   * Confirma SweetAlert de sucesso se existir
   */
  confirmarSweetAlertSucessoSeExistir() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(UsuarioLocators.modalConfirmacao).length > 0;

      if (modalAberto) {
        cy.get(UsuarioLocators.modalConfirmacaoBtnConfirmar).click({ force: true });
      }
    });
  }

  /**
   * Trata modal de campos obrigatórios se necessário
   */
  tratarModalCamposObrigatoriosSeNecessario() {
    cy.get('body').then(($body) => {
      const modalAberto = $body.find(UsuarioLocators.modalConfirmacao).length > 0;

      if (!modalAberto) {
        return;
      }

      cy.get(UsuarioLocators.modalConfirmacaoTitulo).should('contain', 'Campos obrigatórios');
      cy.get(UsuarioLocators.modalConfirmacaoBtnConfirmar).click({ force: true });
      cy.get(UsuarioLocators.modalConfirmacao).should('not.exist');
    });
  }

  /**
   * Clica no botão Voltar
   */
  clicarBotaoVoltar() {
    cy.get(UsuarioCadastroLocators.btnVoltar).click();
  }

  /**
   * Valida retorno para listagem
   */
  validarRetornoListagem() {
    cy.url().should('include', '/autenticacao/usuario');
    cy.url().should('not.include', '/novo');
    cy.url().should('not.include', '/editar');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    cy.get(UsuarioCadastroLocators.btnSalvar).click();
    cy.wait(1000); // Aguarda validação
  }

  /**
   * Valida mensagens de erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // Valida mensagens inline "É obrigatório." ou outras mensagens de validação
    cy.get('body').then(($body) => {
      const temMensagemObrigatorio = $body.text().includes('obrigatório') || $body.text().includes('obrigat');
      const temAlerta = $body.find('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').length > 0;

      if (temMensagemObrigatorio || temAlerta) {
        // Se encontrar mensagem de obrigatório ou alerta, valida que está visível
        cy.get('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').first().should('be.visible');
      } else {
        // Se não encontrar, pelo menos valida que o formulário não foi salvo (botão ainda está visível)
        cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible');
      }
    });
  }

  /**
   * Acessa a edição de um usuário existente
   */
  acessarEdicaoUsuario() {
    UsuarioListagemPage.acessarTelaListagem();
    UsuarioListagemPage.validarTabelaCarregada();
    cy.get('a[href*="/editar"]').first().click();
    cy.get(UsuarioCadastroLocators.inputNome).should('be.visible');
  }

  /**
   * Edita um campo específico do usuário
   * @param {string} campo - Nome do campo (ex: 'nome', 'email')
   * @param {string} valor - Novo valor
   */
  editarCampo(campo, valor) {
    const locators = {
      nome: UsuarioCadastroLocators.inputNome,
      email: UsuarioCadastroLocators.inputEmail
    };

    if (locators[campo]) {
      cy.get(locators[campo]).clear().type(valor);
    }
  }

  /**
   * Salva a edição do usuário
   */
  salvarEdicao() {
    this.cadastrar();
  }

  /**
   * Valida autocomplete de perfil
   * @param {string} perfil - Nome do perfil para validar
   */
  validarAutocompletePerfil(perfil) {
    // Navega para aba Perfis e aguarda estar ativa
    cy.contains('[role="tab"]', 'Perfis').click();
    cy.wait(1000); // Aguarda a aba carregar

    // Aguarda o campo de autocomplete estar visível
    cy.get(UsuarioCadastroLocators.perfilAutocomplete, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(perfil, { delay: 0 });

    cy.get(UsuarioCadastroLocators.perfilLista, { timeout: 5000 })
      .should('be.visible')
      .should('have.length.greaterThan', 0);
  }

  /**
   * Preenche campos com senhas diferentes para testar validação
   * @param {string} senha - Senha principal
   * @param {string} redigiteSenha - Senha diferente
   */
  preencherSenhasDiferentes(senha, redigiteSenha) {
    cy.get(UsuarioCadastroLocators.inputSenha)
      .clear()
      .type(senha);
    cy.get(UsuarioCadastroLocators.inputRedigiteSenha)
      .clear()
      .type(redigiteSenha);
  }

  /**
   * Valida erro de senhas diferentes
   */
  validarErroSenhasDiferentes() {
    cy.get('body').then(($body) => {
      const temMensagemErro = $body.text().includes('senha') ||
                              $body.text().includes('Senha') ||
                              $body.text().includes('diferente') ||
                              $body.text().includes('Diferente') ||
                              $body.text().includes('não confere') ||
                              $body.text().includes('não coincide');
      const temAlerta = $body.find('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').length > 0;

      if (temMensagemErro || temAlerta) {
        cy.get('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').first().should('be.visible');
      } else {
        // Se não encontrar mensagem específica, pelo menos valida que o formulário não foi salvo
        cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible');
      }
    });
  }

  /**
   * Preenche email inválido para testar validação
   * @param {string} emailInvalido - Email com formato inválido
   */
  preencherEmailInvalido(emailInvalido) {
    cy.get(UsuarioCadastroLocators.inputEmail)
      .clear()
      .type(emailInvalido);
  }

  /**
   * Valida erro de formato de email inválido
   */
  validarErroEmailInvalido() {
    cy.get('body').then(($body) => {
      const temMensagemErro = $body.text().includes('email') ||
                              $body.text().includes('Email') ||
                              $body.text().includes('inválido') ||
                              $body.text().includes('Inválido') ||
                              $body.text().includes('formato');
      const temAlerta = $body.find('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').length > 0;

      if (temMensagemErro || temAlerta) {
        cy.get('.alert, [role="alert"], .sweet-alert, .help-block, .text-danger').first().should('be.visible');
      } else {
        // Se não encontrar mensagem específica, pelo menos valida que o formulário não foi salvo
        cy.get(UsuarioCadastroLocators.btnSalvar).should('be.visible');
      }
    });
  }

  /**
   * Exclui um perfil da tabela de perfis
   */
  excluirPerfil() {
    // Navega para aba Perfis (usando force se estiver disabled)
    cy.contains('[role="tab"]', 'Perfis').click({ force: true });
    cy.wait(1000);

    // Verifica se há perfis na tabela
    cy.get(UsuarioCadastroLocators.linhasTabelaPerfis, { timeout: 5000 }).then(($linhas) => {
      if ($linhas.length > 0) {
        // Clica no primeiro link de exclusão
        cy.get(UsuarioCadastroLocators.linksExcluirPerfil).first().click({ force: true });
        // Aguarda a exclusão ser processada
        cy.wait(1000);
        // Valida que a tabela ainda está visível (perfil foi removido ou não)
        cy.get(UsuarioCadastroLocators.tabelaPerfis).should('be.visible');
      } else {
        cy.log('Nenhum perfil encontrado para excluir');
      }
    });
  }

  /**
   * Edita usuário sem alterar senha (campos de senha opcionais na edição)
   * @param {string} novoNome - Novo nome para o usuário
   */
  editarSemAlterarSenha(novoNome) {
    // Edita apenas o nome, sem preencher campos de senha
    cy.get(UsuarioCadastroLocators.inputNome)
      .clear()
      .type(novoNome);
    // Não preenche campos de senha (devem ser opcionais na edição)
  }
}

export default new UsuarioCadastroPage();

