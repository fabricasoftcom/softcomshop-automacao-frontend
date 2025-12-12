import MenulateralConfiguracoesPage from '../menulateral/MenulateralConfiguracoesPage';
import FuncionarioListagemLocators from '../../locators/Funcionario/FuncionarioListagemLocators';
import FuncionarioLocators from '../../locators/Funcionario/FuncionarioLocators';

class FuncionarioListagemPage {
  /**
   * Acessa a tela de listagem de funcionários via menu Configurações > Funcionários
   */
  acessarTelaListagem() {
    MenulateralConfiguracoesPage.acessarListagemFuncionarios();
    cy.get(FuncionarioListagemLocators.tabelaFuncionarios).should('be.visible');
  }

  /**
   * Acessa o cadastro de novo funcionário a partir da listagem
   */
  acessarCadastroNovoFuncionario() {
    this.acessarTelaListagem();
    this.clicarBotaoNovo();
  }

  /**
   * Clica no botão Novo Cadastro
   */
  clicarBotaoNovo() {
    cy.get(FuncionarioListagemLocators.btnNovo).should('be.visible').click();
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get(FuncionarioListagemLocators.formPesquisa).then(($form) => {
      if ($form.is(':visible')) {
        return;
      }
      // Clica no ícone de pesquisa para abrir o formulário
      // O botão está próximo ao título "Listagem"
      cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
      // Aguarda o formulário aparecer
      cy.wait(500); // Pequeno delay para animação
    });
    cy.get(FuncionarioListagemLocators.formPesquisa, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Preenche o filtro de Código
   * @param {string} codigo - Código para pesquisa
   */
  preencherFiltroCodigo(codigo) {
    this.abrirFormularioPesquisa();
    cy.get(FuncionarioListagemLocators.inputCodigo).clear().type(codigo);
  }

  /**
   * Preenche o filtro de Nome
   * @param {string} nome - Nome para pesquisa
   */
  preencherFiltroNome(nome) {
    this.abrirFormularioPesquisa();
    cy.get(FuncionarioListagemLocators.inputNome).clear().type(nome);
  }

  /**
   * Limpa o campo de filtro Nome
   */
  limparFiltroNome() {
    this.abrirFormularioPesquisa();
    cy.get(FuncionarioListagemLocators.inputNome).clear();
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.intercept('GET', '**/cadastro/funcionario**').as('pesquisarFuncionarios');
    cy.get(FuncionarioListagemLocators.btnPesquisar).click();
    cy.wait('@pesquisarFuncionarios');
    cy.get(FuncionarioListagemLocators.tabelaFuncionarios).should('be.visible');
  }

  /**
   * Pesquisa funcionários por nome
   * @param {string} nome - Nome para pesquisa
   */
  pesquisarPorNome(nome) {
    this.preencherFiltroNome(nome);
    this.submeterPesquisa();
  }

  /**
   * Pesquisa funcionários por código
   * @param {string} codigo - Código para pesquisa
   */
  pesquisarPorCodigo(codigo) {
    this.preencherFiltroCodigo(codigo);
    this.submeterPesquisa();
  }

  /**
   * Valida que o resultado contém o nome pesquisado
   * @param {string} nome - Nome esperado no resultado
   */
  validarResultadoPorNome(nome) {
    cy.contains(`${FuncionarioListagemLocators.tabelaFuncionarios} tbody tr`, nome, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que a tabela foi carregada com dados
   */
  validarTabelaCarregada() {
    cy.get(FuncionarioListagemLocators.linhasTabela)
      .its('length')
      .should('be.greaterThan', 0);
  }

  /**
   * Valida a paginação atual (se existir)
   * @param {string} pagina - Número da página esperada (padrão: '1')
   */
  validarPaginacaoAtual(pagina = '1') {
    cy.get('body').then(($body) => {
      const elemento = $body.find(FuncionarioListagemLocators.paginacaoAtiva);
      if (!elemento.length) {
        cy.log('Paginacao nao exibida para a quantidade atual de funcionarios.');
        return;
      }

      cy.wrap(elemento)
        .should('be.visible')
        .and('have.text', pagina);
    });
  }

  /**
   * Seleciona todas as funcionários (checkbox principal)
   */
  selecionarTodosFuncionarios() {
    cy.get(FuncionarioListagemLocators.checkboxSelecionarTodos)
      .should('exist')
      .check({ force: true });

    cy.get(FuncionarioListagemLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('be.checked');
    });
  }

  /**
   * Desmarca todas as funcionários
   */
  desmarcarTodosFuncionarios() {
    cy.get(FuncionarioListagemLocators.checkboxSelecionarTodos)
      .should('exist')
      .uncheck({ force: true });

    cy.get(FuncionarioListagemLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  }

  /**
   * Seleciona o primeiro funcionário da tabela
   */
  selecionarPrimeiroFuncionario() {
    cy.get(FuncionarioListagemLocators.checkboxItens).first().check({ force: true });
  }

  /**
   * Tenta excluir sem selecionar nenhum funcionário (deve exibir alerta)
   */
  tentarExcluirSemSelecao() {
    cy.get(FuncionarioListagemLocators.btnExcluirSelecionados).first().click();
    cy.contains('Aviso').should('be.visible');
    cy.get('.sweet-alert .confirm').click();
  }

  /**
   * Abre o modal de exclusão de funcionários selecionados
   */
  abrirModalExcluirSelecionados() {
    // Configura intercept antes de abrir o modal
    cy.intercept('POST', '**/cadastro/funcionario/excluir*').as('excluirFuncionario');
    cy.get(FuncionarioListagemLocators.btnExcluirSelecionados).first().click();
    cy.get(FuncionarioLocators?.modalConfirmDestroy || '.sweet-alert').should('be.visible');
  }

  /**
   * Cancela o modal de exclusão
   */
  cancelarModalExclusao() {
    cy.get(FuncionarioLocators?.botaoCancelar || '.sweet-alert .cancel').click({ force: true });
    cy.get(FuncionarioLocators?.modalConfirmDestroy || '.sweet-alert').should('not.exist');
  }

  /**
   * Confirma a exclusão de funcionários selecionados
   */
  confirmarExclusao() {
    cy.wait(3000);
    cy.get(FuncionarioLocators.modalConfirmDestroy).should('be.visible');
    cy.get(FuncionarioLocators.botaoConfirmar).click({ force: true });

    // Aguarda a requisição de exclusão (já configurada em abrirModalExcluirSelecionados)
    cy.wait('@excluirFuncionario', { timeout: 10000 });

    // Aguarda o modal desaparecer e valida sucesso
    cy.get(FuncionarioLocators.modalConfirmDestroy).should('not.exist');
    // Aguarda um pouco para garantir que a tabela foi atualizada
    cy.wait(1000);
  }

  /**
   * Valida que um funcionário não existe mais na tabela
   * @param {string} nome - Nome do funcionário que não deve aparecer
   */
  validarFuncionarioNaoExiste(nome) {
    // Pesquisa novamente para garantir que a tabela está atualizada
    this.pesquisarPorNome(nome);
    // Valida que o funcionário não aparece na tabela
    cy.contains('td', nome, { matchCase: false }).should('not.exist');
  }
}

export default new FuncionarioListagemPage();

