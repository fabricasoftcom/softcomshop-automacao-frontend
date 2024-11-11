import ListagemContasAPagarLocators from "../../locators/ListagemContasAPagarLocators";
import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";

class ListagemContasAPagarPage {

  // Navegação para a página
  visit() {
    menulateralfinanceiropage.acessarContasPagar();
    this.verificarCarregamentoDaPagina();
  }

  verificarCarregamentoDaPagina() {
    cy.get('h5').contains('Despesa').should('be.visible');
  }

  // Ações de filtro
  selecionarPeriodo(periodo = 'TODAY') {
    cy.get(ListagemContasAPagarLocators.seletorPeriodo).select(periodo);
  }

  selecionarTipoData(tipo = 'VENCIMENTO') {
    cy.get(ListagemContasAPagarLocators.seletorTipoData).select(tipo);
  }

  buscarConta(conta = 'Todas as contas') {
    cy.get(ListagemContasAPagarLocators.campoBuscaConta).type(conta);
    cy.get(ListagemContasAPagarLocators.botaoBuscarConta).click();
  }

  // Ações na tabela
  selecionarTodasLinhas() {
    cy.get(ListagemContasAPagarLocators.checkboxSelecionarTodos).check();
  }

  desmarcarTodasLinhas() {
    cy.get(ListagemContasAPagarLocators.checkboxSelecionarTodos).uncheck();
  }

  clicarBaixarSelecionados() {
    cy.get(ListagemContasAPagarLocators.baixarSelecionadosBtn).click();
  }

  marcarCheckboxPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .first()
      .find(ListagemContasAPagarLocators.checkboxLinha)
      .check();
  }

  clicarBaixarNaLinha() {
    cy.get(ListagemContasAPagarLocators.botaoBaixar).first().click();
  }

  abrirDropdownAcaoPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.dropdownAcao).first().click();
  }

  selecionarOpcaoExcluir() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAPagarLocators.opcaoExcluir).click();
  }

  verificarNotificacaoSucesso() {
    cy.get(ListagemContasAPagarLocators.notificacaoSucesso).should('be.visible');
  }
  abrirNovoCadastro() {
    cy.get(ListagemContasAPagarLocators.novoCadastroBtn).click();
    // Verificar se a página/modal de cadastro foi carregada corretamente
    cy.get('.modal-title').contains('Nova Despesa').should('be.visible');
  }
}

export default new ListagemContasAPagarPage();
