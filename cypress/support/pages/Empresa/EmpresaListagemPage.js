import MenulateralConfiguracoesPage from '../menulateral/MenulateralConfiguracoesPage';
import EmpresaListagemLocators from '../../locators/Empresa/EmpresaListagemLocators';
import EmpresaLocators from '../../locators/Empresa/EmpresaLocators';

class EmpresaListagemPage {
  /**
   * Acessa a tela de listagem de empresas via menu Configurações > Empresa
   */
  acessarTelaListagem() {
    MenulateralConfiguracoesPage.acessarListagemEmpresas();
    cy.get(EmpresaListagemLocators.tabelaEmpresas).should('be.visible');
  }

  /**
   * Acessa o cadastro de nova empresa a partir da listagem
   */
  acessarCadastroNovaEmpresa() {
    this.acessarTelaListagem();
    this.clicarBotaoNovo();
  }

  /**
   * Clica no botão Novo Cadastro
   */
  clicarBotaoNovo() {
    cy.get(EmpresaListagemLocators.btnNovo).should('be.visible').click();
  }

  /**
   * Abre o formulário de pesquisa (toggle)
   */
  abrirFormularioPesquisa() {
    cy.get(EmpresaListagemLocators.containerFormPesquisa).then(($container) => {
      if ($container.is(':visible')) {
        return;
      }
      // Clica no ícone de pesquisa para abrir o formulário
      // O botão está próximo ao título "Listagem"
      cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
      // Aguarda o formulário aparecer
      cy.wait(500); // Pequeno delay para animação
    });
    cy.get(EmpresaListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('be.visible');
    cy.get(EmpresaListagemLocators.formPesquisa).should('be.visible');
  }

  /**
   * Fecha o formulário de pesquisa (toggle)
   */
  fecharFormularioPesquisa() {
    cy.get(EmpresaListagemLocators.containerFormPesquisa).then(($container) => {
      if (!$container.is(':visible')) {
        return;
      }
      // Clica no ícone de pesquisa para fechar o formulário
      // O botão está próximo ao título "Listagem"
      cy.get('h5').contains('Listagem').parent().find('a[href="#"]').first().click();
      // Aguarda o formulário desaparecer
      cy.wait(500); // Pequeno delay para animação
    });
    cy.get(EmpresaListagemLocators.containerFormPesquisa, { timeout: 10000 }).should('not.be.visible');
  }

  /**
   * Limpa todos os campos do formulário de pesquisa
   */
  limparTodosFiltros() {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputCnpj).clear();
    cy.get(EmpresaListagemLocators.inputNome).clear();
    cy.get(EmpresaListagemLocators.inputFantasia).clear();
    cy.get(EmpresaListagemLocators.inputRazaoSocial).clear();
  }

  /**
   * Preenche o filtro de CNPJ
   * @param {string} cnpj - CNPJ para pesquisa
   */
  preencherFiltroCnpj(cnpj) {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputCnpj).clear().type(cnpj);
  }

  /**
   * Preenche o filtro de Nome (Unidade)
   * @param {string} nome - Nome/Unidade para pesquisa
   */
  preencherFiltroNome(nome) {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputNome).clear().type(nome);
  }

  /**
   * Limpa o campo de filtro Nome
   */
  limparFiltroNome() {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputNome).clear();
  }

  /**
   * Preenche o filtro de Fantasia
   * @param {string} fantasia - Fantasia para pesquisa
   */
  preencherFiltroFantasia(fantasia) {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputFantasia).clear().type(fantasia);
  }

  /**
   * Preenche o filtro de Razão Social
   * @param {string} razaoSocial - Razão Social para pesquisa
   */
  preencherFiltroRazaoSocial(razaoSocial) {
    this.abrirFormularioPesquisa();
    cy.get(EmpresaListagemLocators.inputRazaoSocial).clear().type(razaoSocial);
  }

  /**
   * Submete a pesquisa
   */
  submeterPesquisa() {
    cy.intercept('GET', '**/cadastro/empresa**').as('pesquisarEmpresas');
    cy.get(EmpresaListagemLocators.btnPesquisar).click();
    cy.wait('@pesquisarEmpresas');
    cy.get(EmpresaListagemLocators.tabelaEmpresas).should('be.visible');
  }

  /**
   * Pesquisa empresas por nome
   * @param {string} nome - Nome/Unidade para pesquisa
   */
  pesquisarPorNome(nome) {
    this.preencherFiltroNome(nome);
    this.submeterPesquisa();
  }

  /**
   * Valida que o resultado contém o nome pesquisado
   * @param {string} nome - Nome esperado no resultado
   */
  validarResultadoPorNome(nome) {
    cy.contains(`${EmpresaListagemLocators.tabelaEmpresas} tbody tr`, nome, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que o resultado contém o CNPJ pesquisado
   * @param {string} cnpj - CNPJ esperado no resultado
   */
  validarResultadoPorCnpj(cnpj) {
    cy.contains(`${EmpresaListagemLocators.tabelaEmpresas} tbody tr`, cnpj, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que o resultado contém a Fantasia pesquisada
   * @param {string} fantasia - Fantasia esperada no resultado
   */
  validarResultadoPorFantasia(fantasia) {
    cy.contains(`${EmpresaListagemLocators.tabelaEmpresas} tbody tr`, fantasia, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que o resultado contém a Razão Social pesquisada
   * @param {string} razaoSocial - Razão Social esperada no resultado
   */
  validarResultadoPorRazaoSocial(razaoSocial) {
    cy.contains(`${EmpresaListagemLocators.tabelaEmpresas} tbody tr`, razaoSocial, { matchCase: false })
      .should('be.visible');
  }

  /**
   * Valida que a tabela foi carregada com dados
   */
  validarTabelaCarregada() {
    cy.get(EmpresaListagemLocators.linhasTabela)
      .its('length')
      .should('be.greaterThan', 0);
  }

  /**
   * Valida a paginação atual (se existir)
   * @param {string} pagina - Número da página esperada (padrão: '1')
   */
  validarPaginacaoAtual(pagina = '1') {
    cy.get('body').then(($body) => {
      const elemento = $body.find(EmpresaListagemLocators.paginacaoAtiva);
      if (!elemento.length) {
        cy.log('Paginacao nao exibida para a quantidade atual de empresas.');
        return;
      }

      cy.wrap(elemento)
        .should('be.visible')
        .and('have.text', pagina);
    });
  }

  /**
   * Seleciona todas as empresas (checkbox principal)
   */
  selecionarTodasEmpresas() {
    cy.get(EmpresaListagemLocators.checkboxSelecionarTodos)
      .should('exist')
      .check({ force: true });

    cy.get(EmpresaListagemLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('be.checked');
    });
  }

  /**
   * Desmarca todas as empresas
   */
  desmarcarTodasEmpresas() {
    cy.get(EmpresaListagemLocators.checkboxSelecionarTodos)
      .should('exist')
      .uncheck({ force: true });

    cy.get(EmpresaListagemLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  }

  /**
   * Seleciona a primeira empresa da tabela
   */
  selecionarPrimeiraEmpresa() {
    cy.get(EmpresaListagemLocators.checkboxItens).first().check({ force: true });
  }

  /**
   * Tenta excluir sem selecionar nenhuma empresa (deve exibir alerta)
   */
  tentarExcluirSemSelecao() {
    cy.get(EmpresaListagemLocators.btnExcluirSelecionados).first().click();
    cy.contains('Aviso').should('be.visible');
    cy.get('.sweet-alert .confirm').click();
  }

  /**
   * Abre o modal de exclusão de empresas selecionadas
   */
  abrirModalExcluirSelecionados() {
    // Configura intercept antes de abrir o modal (seguindo padrão de atributos)
    cy.intercept('POST', '**/cadastro/empresa/excluir*').as('excluirEmpresa');
    cy.get(EmpresaListagemLocators.btnExcluirSelecionados).first().click();
    cy.get(EmpresaLocators?.modalConfirmDestroy || '.sweet-alert').should('be.visible');
  }

  /**
   * Cancela o modal de exclusão
   */
  cancelarModalExclusao() {
    cy.get(EmpresaLocators?.botaoCancelar || '.sweet-alert .cancel').click({ force: true });
    cy.get(EmpresaLocators?.modalConfirmDestroy || '.sweet-alert').should('not.exist');
  }

  /**
   * Confirma a exclusão de empresas selecionadas
   */
  confirmarExclusao() {
    cy.wait(3000);
    cy.get(EmpresaLocators.modalConfirmDestroy).should('be.visible');
    cy.get(EmpresaLocators.botaoConfirmar).click({ force: true });

    // Aguarda a requisição de exclusão (já configurada em abrirModalExcluirSelecionados)
    cy.wait('@excluirEmpresa', { timeout: 10000 });

    // Aguarda o modal desaparecer e valida sucesso
    cy.get(EmpresaLocators.modalConfirmDestroy).should('not.exist');
    // Aguarda um pouco para garantir que a tabela foi atualizada
    cy.wait(1000);
  }

  /**
   * Valida que uma empresa não existe mais na tabela
   * @param {string} nome - Nome da empresa que não deve aparecer
   */
  validarEmpresaNaoExiste(nome) {
    // Pesquisa novamente para garantir que a tabela está atualizada
    this.pesquisarPorNome(nome);
    // Valida que a empresa não aparece na tabela (usando padrão similar ao de atributos)
    cy.contains('td', nome, { matchCase: false }).should('not.exist');
  }

  /**
   * Abre a edição da primeira empresa da listagem
   */
  abrirEdicaoPrimeiraEmpresa() {
    cy.get(EmpresaListagemLocators.linksEdicao).first().click();
    cy.url().should('match', /\/cadastro\/empresa\/\d+\/editar/);
  }
}

export default new EmpresaListagemPage();

