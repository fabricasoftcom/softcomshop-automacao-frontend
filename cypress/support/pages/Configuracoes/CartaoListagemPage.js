import CartaoListagemLocators from '../../locators/Configuracoes/CartaoListagemLocators';

class CartaoListagemPage {
  /**
   * Acessa a tela de listagem de cartões
   */
  acessarTelaListagem() {
    cy.visit('/cartao');
    cy.get(CartaoListagemLocators.tabela, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Valida que a tabela foi carregada
   */
  validarTabelaCarregada() {
    cy.get(CartaoListagemLocators.tabela).should('be.visible');
    cy.get(CartaoListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get(CartaoListagemLocators.containerFormPesquisa).then(($container) => {
      if ($container.is(':visible')) {
        return;
      }
      cy.get(CartaoListagemLocators.btnPesquisaToggle).first().click();
    });
    cy.get(CartaoListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Preenche o campo de pesquisa Nome
   * @param {string} nome - Nome para pesquisa
   */
  preencherFiltroNome(nome) {
    this.abrirFormularioPesquisa();
    cy.get(CartaoListagemLocators.campoPesquisaNome).clear().type(nome);
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.get(CartaoListagemLocators.btnPesquisar).click();
    // Aguarda a tabela ser recarregada
    cy.get(CartaoListagemLocators.tabela).should('be.visible');
  }

  /**
   * Clica no botão Novo Cadastro
   */
  clicarBotaoNovo() {
    // Busca o botão dentro da área da listagem (ibox-title) para evitar clicar em outros botões
    cy.get('.ibox-title').within(() => {
      cy.contains('a, button', /Novo.*Cadastro/i)
        .should('be.visible')
        .click();
    });
  }

  /**
   * Seleciona a primeira linha da tabela
   */
  selecionarPrimeiraLinha() {
    cy.get(CartaoListagemLocators.linhasTabela).first().within(() => {
      cy.get(CartaoListagemLocators.checkboxLinha).check();
    });
  }

  /**
   * Seleciona todas as linhas da tabela
   */
  selecionarTodasLinhas() {
    cy.get(CartaoListagemLocators.checkboxSelecionarTodos).check();
  }

  /**
   * Clica no link de edição da primeira linha
   */
  abrirEdicaoPrimeiraLinha() {
    cy.get(CartaoListagemLocators.linhasTabela).first().within(() => {
      cy.get(CartaoListagemLocators.linkEditarLinha).click();
    });
    // Aguarda o modal aparecer (pode estar oculto inicialmente, mas deve existir no DOM)
    cy.get(CartaoListagemLocators.modal, { timeout: 10000 }).should('exist');
  }

  /**
   * Clica no botão Excluir Selecionados
   */
  clicarExcluirSelecionados() {
    cy.get(CartaoListagemLocators.btnExcluirSelecionados).should('be.visible').click();
  }

  /**
   * Valida que o cartão não existe na listagem
   * @param {string} nome - Nome do cartão a validar
   */
  validarCartaoNaoExiste(nome) {
    cy.get(CartaoListagemLocators.tabela).then(($tabela) => {
      const texto = $tabela.text();
      expect(texto).to.not.include(nome);
    });
  }

  /**
   * Valida que o cartão existe na listagem
   * @param {string} nome - Nome do cartão a validar
   */
  validarCartaoExiste(nome) {
    // Aguarda a tabela estar visível e recarregada
    cy.get(CartaoListagemLocators.tabela, { timeout: 10000 }).should('be.visible');
    // Busca o cartão na tabela
    cy.contains(`${CartaoListagemLocators.tabela} tbody tr`, nome, { matchCase: false, timeout: 10000 })
      .should('be.visible');
  }

  /**
   * Valida que o formulário de pesquisa está visível
   */
  validarFormularioPesquisaVisivel() {
    cy.get(CartaoListagemLocators.formPesquisa).should('be.visible');
  }

  /**
   * Valida que há linhas na tabela
   */
  validarTabelaTemLinhas() {
    cy.get(CartaoListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Valida que o botão Novo Cadastro está visível
   */
  validarBotaoNovoCadastroVisivel() {
    // Busca o botão dentro da área da listagem (ibox-title) para evitar validar outros botões
    cy.get('.ibox-title').within(() => {
      cy.contains('a, button', /Novo.*Cadastro/i)
        .should('be.visible');
    });
  }

  /**
   * Valida que o modal foi aberto
   */
  validarModalAberto() {
    cy.get(CartaoListagemLocators.modal, { timeout: 10000 }).should('exist');
  }

  /**
   * Valida que a primeira linha está selecionada
   */
  validarPrimeiraLinhaSelecionada() {
    cy.get(CartaoListagemLocators.linhasTabela).first().within(() => {
      cy.get(CartaoListagemLocators.checkboxLinha).should('be.checked');
    });
  }
}

export default new CartaoListagemPage();

