import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";
import ListagemContasAReceberLocators from "../../locators/ListagemContasAReceberLocators";

class ListagemContasAReceberPage {
  visit() {
    menulateralfinanceiropage.acessarListagemContasReceberReceita();
  }

  selecionarPeriodo(periodo) {
    cy.get(ListagemContasAReceberLocators.periodoSelect).select(periodo);
  }

  selecionarDataVencimento(date) {
    cy.get(ListagemContasAReceberLocators.dataVencimentoInput).clear().type(date);
  }

  selecionarStatus(status) {
    cy.get(ListagemContasAReceberLocators.statusSelect).select(status);
  }

  selecionarContaBancaria(conta) {
    cy.get(ListagemContasAReceberLocators.autocompleteConta).type(conta);
    cy.get(ListagemContasAReceberLocators.autocompleteContaAddOn).click();
  }

  selecionarFormaPagamento(forma) {
    cy.get(ListagemContasAReceberLocators.autocompleteFormaPagamento).type(forma);
    cy.get(ListagemContasAReceberLocators.autocompleteFormaPagamentoAddOn).click();
  }

  clicarNovoCadastro() {
    cy.get(ListagemContasAReceberLocators.novoCadastroButton).click();
  }

  realizarPagamentoSelecionados() {
    cy.get(ListagemContasAReceberLocators.realizarPagamentoButton).click();
  }

  marcarTodosLancamentos() {
    cy.get(ListagemContasAReceberLocators.marcarTodosCheckbox).check();
  }

  validarResumo(resumo) {
    cy.get(ListagemContasAReceberLocators.vencidasResumo).should('contain', resumo.vencidas);
    cy.get(ListagemContasAReceberLocators.aReceberResumo).should('contain', resumo.aReceber);
    cy.get(ListagemContasAReceberLocators.recebidasResumo).should('contain', resumo.recebidas);
    cy.get(ListagemContasAReceberLocators.totalPeriodoResumo).should('contain', resumo.total);
  }
}

export default new ListagemContasAReceberPage();