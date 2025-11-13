import menulateralvendapage from "../menulateral/menulateralvendapage";
import clienteLocators from "../../locators/ClienteLocators";
import listagemClienteLocators from "../../locators/Cliente/ListagemClienteLocators";

class ListagemClientePage {
  acessarTelaListagem() {
    menulateralvendapage.acessarListagemClientes();
    cy.get(listagemClienteLocators.tabelaClientes).should('be.visible');
  }

  acessarCadastroNovoCliente() {
    this.acessarTelaListagem();
    this.clicarBotaoNovo();
  }

  clicarBotaoNovo() {
    cy.get(listagemClienteLocators.btnNovo).first().should('be.visible').click();
  }

  abrirFormularioPesquisa() {
    cy.get(listagemClienteLocators.formPesquisa).then(($form) => {
      if ($form.is(':visible')) {
        return;
      }

      cy.get(listagemClienteLocators.btnPesquisaToggle).click();
    });

    cy.get(listagemClienteLocators.formPesquisa).should('be.visible');
  }

  preencherFiltroCodigo(codigo) {
    this.abrirFormularioPesquisa();
    cy.get(listagemClienteLocators.inputCodigo).clear().type(codigo);
  }

  preencherFiltroCpfCnpj(valor) {
    this.abrirFormularioPesquisa();
    cy.get(listagemClienteLocators.inputCpfCnpj).clear().type(valor);
  }

  preencherFiltroNome(nome) {
    this.abrirFormularioPesquisa();
    cy.get(listagemClienteLocators.inputNome).clear().type(nome);
  }

  limparFiltroNome() {
    this.abrirFormularioPesquisa();
    cy.get(listagemClienteLocators.inputNome).clear();
  }

  preencherFiltroRazao(razao) {
    this.abrirFormularioPesquisa();
    cy.get(listagemClienteLocators.inputRazaoSocial).clear().type(razao);
  }

  submeterPesquisa() {
    cy.intercept('GET', '**/cadastro/cliente**').as('pesquisarClientes');
    cy.get(listagemClienteLocators.btnPesquisar).click();
    cy.wait('@pesquisarClientes');
    cy.get(listagemClienteLocators.tabelaClientes).should('be.visible');
  }

  pesquisarPorNome(nome) {
    this.preencherFiltroNome(nome);
    this.submeterPesquisa();
  }

  validarResultadoPorNome(nome) {
    cy.contains(`${listagemClienteLocators.tabelaClientes} tbody tr`, nome, { matchCase: false })
      .should('be.visible');
  }

  validarTabelaCarregada() {
    cy.get(listagemClienteLocators.linhasTabela)
      .its('length')
      .should('be.greaterThan', 0);
  }

  validarPaginacaoAtual(pagina = '1') {
    cy.get(listagemClienteLocators.paginacaoAtiva)
      .should('be.visible')
      .and('have.text', pagina);
  }

  selecionarTodosClientes() {
    cy.get(listagemClienteLocators.checkboxSelecionarTodos)
      .should('exist')
      .check({ force: true });

    cy.get(listagemClienteLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('be.checked');
    });
  }

  desmarcarTodosClientes() {
    cy.get(listagemClienteLocators.checkboxSelecionarTodos)
      .should('exist')
      .uncheck({ force: true });

    cy.get(listagemClienteLocators.checkboxItens).each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  }

  selecionarPrimeiroCliente() {
    cy.get(listagemClienteLocators.checkboxItens).first().check({ force: true });
  }

  tentarExcluirSemSelecao() {
    cy.get(listagemClienteLocators.btnExcluirSelecionados).first().click();
    cy.contains('Aviso').should('be.visible');
    cy.get('.sweet-alert .confirm').click();
  }

  abrirModalExcluirSelecionados() {
    cy.get(listagemClienteLocators.btnExcluirSelecionados).first().click();
    cy.get(clienteLocators.modalConfirmDestroy).should('be.visible');
  }

  cancelarModalExclusao() {
    cy.get(clienteLocators.botaoCancelar).click({ force: true });
    cy.get(clienteLocators.modalConfirmDestroy).should('not.exist');
  }
}

export default new ListagemClientePage();
