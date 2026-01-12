import JustificativaListagemLocators from '../../locators/Configuracoes/JustificativaListagemLocators';

class JustificativaListagemPage {
  /**
   * Acessa a tela de listagem de justificativas
   */
  acessarTelaListagem() {
    cy.visit('/configuracao/tipo-justificativa');
    cy.get(JustificativaListagemLocators.tabela).should('be.visible');
  }

  /**
   * Valida que a tabela foi carregada
   */
  validarTabelaCarregada() {
    cy.get(JustificativaListagemLocators.tabela).should('be.visible');
    cy.get(JustificativaListagemLocators.linhasTabela).should('have.length.greaterThan', 0);
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get(JustificativaListagemLocators.containerFormPesquisa).then(($container) => {
      if ($container.is(':visible')) {
        return;
      }
      cy.get(JustificativaListagemLocators.btnPesquisaToggle).first().click();
    });
    cy.get(JustificativaListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Preenche o campo de pesquisa Descrição
   * @param {string} descricao - Descrição para pesquisa
   */
  preencherFiltroDescricao(descricao) {
    this.abrirFormularioPesquisa();
    cy.get(JustificativaListagemLocators.campoPesquisaDescricao).clear().type(descricao);
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.intercept('GET', '**/configuracao/tipo-justificativa**').as('pesquisarJustificativas');
    cy.get(JustificativaListagemLocators.btnPesquisar).click();
    cy.wait('@pesquisarJustificativas');
    cy.get(JustificativaListagemLocators.tabela).should('be.visible');
  }

  /**
   * Pesquisa justificativas por descrição
   * @param {string} descricao - Descrição para pesquisa
   */
  pesquisarPorDescricao(descricao) {
    this.preencherFiltroDescricao(descricao);
    this.submeterPesquisa();
  }

  /**
   * Valida que o resultado contém a descrição pesquisada
   * @param {string} descricao - Descrição esperada no resultado
   */
  validarResultadoPorDescricao(descricao) {
    cy.contains(`${JustificativaListagemLocators.tabela} tbody tr`, descricao, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Clica no botão Novo Cadastro
   */
  clicarBotaoNovo() {
    cy.get(JustificativaListagemLocators.btnNovoCadastro).first().should('be.visible').click();
  }

  /**
   * Seleciona a primeira linha da tabela
   */
  selecionarPrimeiraLinha() {
    cy.get(JustificativaListagemLocators.linhasTabela).first().within(() => {
      cy.get(JustificativaListagemLocators.checkboxLinha).check();
    });
  }

  /**
   * Clica no link de edição da primeira linha
   */
  abrirEdicaoPrimeiraLinha() {
    cy.get(JustificativaListagemLocators.linhasTabela).first().within(() => {
      cy.get(JustificativaListagemLocators.linkEditarLinha).click();
    });
  }

  /**
   * Valida que a justificativa não existe na listagem
   * @param {string} descricao - Descrição da justificativa a validar
   */
  validarJustificativaNaoExiste(descricao) {
    cy.get(JustificativaListagemLocators.tabela).then(($tabela) => {
      const texto = $tabela.text();
      expect(texto).to.not.include(descricao);
    });
  }

  /**
   * Valida que o formulário de pesquisa está visível
   */
  validarFormularioPesquisaVisivel() {
    cy.get(JustificativaListagemLocators.formPesquisa).should('be.visible');
  }
}

export default new JustificativaListagemPage();

