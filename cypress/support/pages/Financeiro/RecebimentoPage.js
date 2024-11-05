import RecebimentoLocators from "../../locators/RecebimentoLocators";
import ListagemContasAReceberPage from "./ListagemContasAReceberPage";

class RecebimentoPage {
  visit() {
    ListagemContasAReceberPage.visit();
    ListagemContasAReceberPage.clicarBotaoBaixarPrimeiraLinha();
  }

  verificarTituloModal() {
    cy.get(RecebimentoLocators.modalTitulo).should('contain', 'Recebimento');
  }

  verificarDadosPrincipais() {
    cy.get(RecebimentoLocators.parcelaInfo).should('be.visible');
    cy.get(RecebimentoLocators.valorInfo).should('be.visible');
    cy.get(RecebimentoLocators.vencimentoInfo).should('be.visible');
  }

  preencherConta() {
    // Preenche o campo com "CAIXA" e aguarda o autocomplete
    cy.get(RecebimentoLocators.contaInput).type('CAIXA');

    // Aguarda que a lista de resultados de autocomplete seja exibida
    cy.get(RecebimentoLocators.listaAutocompleteConta).should('be.visible');

    // Seleciona o primeiro resultado na lista de autocomplete
    cy.get(RecebimentoLocators.primeiroResultadoAutocomplete).click();
  }

  preencherFormaPagamento() {
    // Preenche o campo de forma de pagamento com "ESPÉCIE" e seleciona o primeiro resultado do autocomplete
    cy.get(RecebimentoLocators.formaPagamentoInput).type('ESPÉCIE');
    cy.get(RecebimentoLocators.listaAutocompleteFormaPagamento).should('be.visible');
    cy.get(RecebimentoLocators.primeiroResultadoAutocompleteFormaPagamento).click();
  }

  verificarCamposPagoEPendente() {
    cy.get(RecebimentoLocators.valorPagoInput).should('be.disabled');
    cy.get(RecebimentoLocators.valorPendenteInput).should('be.disabled');
  }

  preencherJurosMulta(jurosMulta) {
    cy.get(RecebimentoLocators.jurosMultaInput).clear().type(jurosMulta);
  }

  preencherDesconto(desconto) {
    cy.get(RecebimentoLocators.descontoInput).clear().type(desconto);
  }

  verificarCampoValorFinal() {
    cy.get(RecebimentoLocators.valorFinalInput).should('be.disabled');
  }

  preencherDataRecebimentoComDataAtual() {
    const dataAtualFormatada = this.obterDataAtualFormatada();
    cy.get(RecebimentoLocators.dataRecebimentoInput).clear().type(dataAtualFormatada);
  }

  obterDataAtualFormatada() {
    const dataAtual = new Date();
    return `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;
  }

  preencherValorRecebido(valorRecebido) {
    cy.get(RecebimentoLocators.valorRecebidoInput).clear().type(valorRecebido);
  }

  obterValorFinal() {
    return cy.get(RecebimentoLocators.valorFinalInput).invoke('val');
  }

  expandirDetalhesPagamento() {
    cy.get(RecebimentoLocators.detalhesPagamentoAccordion).click();
  }

  verificarTabelaDetalhesPagamentoVazia() {
    cy.get(RecebimentoLocators.detalhesPagamentoTable).should('be.empty');
  }

  clicarVoltar() {
    cy.get(RecebimentoLocators.voltarBtn).click();
  }

  clicarSalvar() {
    cy.get(RecebimentoLocators.salvarBtn).click();
  }

  verificarToastSucesso() {
    cy.get(RecebimentoLocators.toastSucesso).should('be.visible');
  }
  fecharModal() {
    this.clicarVoltar();
  }

  verificarStatusRegistroPago() {
    this.fecharModal();
    ListagemContasAReceberPage.verificarStatusPago();
  }
    // Verifica se o status do registro está como "Parcial" na listagem após fechar o modal
    verificarStatusRegistroParcial() {
        this.fecharModal();
        ListagemContasAReceberPage.verificarStatusParcial();
      }
}

export default new RecebimentoPage();