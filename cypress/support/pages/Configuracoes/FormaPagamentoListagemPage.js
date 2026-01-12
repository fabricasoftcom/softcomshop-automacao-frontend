import FormaPagamentoListagemLocators from '../../locators/Configuracoes/FormaPagamentoListagemLocators';

class FormaPagamentoListagemPage {
  /**
   * Acessa a tela de listagem de formas de pagamento
   */
  acessarTelaListagem() {
    cy.visit('/configuracao/forma-pagamento');
    cy.get(FormaPagamentoListagemLocators.tabela, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Valida que a tabela foi carregada
   */
  validarTabelaCarregada() {
    cy.get(FormaPagamentoListagemLocators.tabela).should('be.visible');
    cy.get(FormaPagamentoListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get(FormaPagamentoListagemLocators.containerFormPesquisa).then(($container) => {
      if ($container.is(':visible')) {
        return;
      }
      cy.get(FormaPagamentoListagemLocators.btnPesquisaToggle).first().click();
    });
    cy.get(FormaPagamentoListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.get(FormaPagamentoListagemLocators.btnPesquisar).click();
    // Aguarda a tabela ser recarregada
    cy.get(FormaPagamentoListagemLocators.tabela).should('be.visible');
  }

  /**
   * Clica no botão Novo Cadastro
   */
  clicarBotaoNovo() {
    // Busca o botão pelo texto "Novo Cadastro" ou "Novo" e clica
    cy.get(FormaPagamentoListagemLocators.btnNovoCadastro)
      .first()
      .should('be.visible')
      .click();
  }

  /**
   * Seleciona a primeira linha da tabela
   */
  selecionarPrimeiraLinha() {
    cy.get(FormaPagamentoListagemLocators.linhasTabela).first().within(() => {
      cy.get(FormaPagamentoListagemLocators.checkboxLinha).check();
    });
  }

  /**
   * Seleciona todas as linhas da tabela
   */
  selecionarTodasLinhas() {
    cy.get(FormaPagamentoListagemLocators.checkboxSelecionarTodos).check();
  }

  /**
   * Clica no link de edição da primeira linha
   */
  abrirEdicaoPrimeiraLinha() {
    cy.get(FormaPagamentoListagemLocators.linhasTabela).first().within(() => {
      cy.get(FormaPagamentoListagemLocators.linkEditarLinha).click();
    });
    // Aguarda o modal aparecer (pode estar oculto inicialmente, mas deve existir no DOM)
    cy.get(FormaPagamentoListagemLocators.modal, { timeout: 10000 }).should('exist');
  }

  /**
   * Clica no botão Excluir Selecionados
   */
  clicarExcluirSelecionados() {
    cy.get(FormaPagamentoListagemLocators.btnExcluirSelecionados).should('be.visible').click();
  }

  /**
   * Valida que a forma de pagamento não existe na listagem
   * @param {string} nome - Nome da forma de pagamento a validar
   */
  validarFormaPagamentoNaoExiste(nome) {
    cy.get(FormaPagamentoListagemLocators.tabela).then(($tabela) => {
      const texto = $tabela.text();
      expect(texto).to.not.include(nome);
    });
  }

  /**
   * Valida que a forma de pagamento existe na listagem
   * @param {string} nome - Nome da forma de pagamento a validar
   */
  validarFormaPagamentoExiste(nome) {
    cy.contains(`${FormaPagamentoListagemLocators.tabela} tbody tr`, nome, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que o formulário de pesquisa está visível
   */
  validarFormularioPesquisaVisivel() {
    cy.get(FormaPagamentoListagemLocators.formPesquisa).should('be.visible');
  }

  /**
   * Valida que há linhas na tabela
   */
  validarTabelaTemLinhas() {
    cy.get(FormaPagamentoListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Valida que o botão Novo Cadastro está visível
   */
  validarBotaoNovoCadastroVisivel() {
    cy.contains(FormaPagamentoListagemLocators.btnNovoCadastroTexto, /Novo.*Cadastro|Novo/i)
      .should('be.visible');
  }

  /**
   * Valida que o modal foi aberto
   */
  validarModalAberto() {
    cy.get(FormaPagamentoListagemLocators.modal, { timeout: 10000 }).should('exist');
  }

  /**
   * Valida que a primeira linha está selecionada
   */
  validarPrimeiraLinhaSelecionada() {
    cy.get(FormaPagamentoListagemLocators.linhasTabela).first().within(() => {
      cy.get(FormaPagamentoListagemLocators.checkboxLinha).should('be.checked');
    });
  }
}

export default new FormaPagamentoListagemPage();

