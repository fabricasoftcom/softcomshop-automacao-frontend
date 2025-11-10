import BaixarDespesasLocators from "../../locators/BaixarDespesaLocators";
import ListagemContasAPagarPage from "./ListagemContasAPagarPage";

class BaixarDespesasPage {
  visit() {
    ListagemContasAPagarPage.visit();
  }

  clicarPrimeiraLinhaComStatusBaixar() {
    ListagemContasAPagarPage.clicarBotaoBaixarNaPrimeiraLinha();
    this.verificarTituloModal();
  }
  clicarPrimeiraLinhaComStatusParcial() {
    ListagemContasAPagarPage.clicarBotaoParcialNaPrimeiraLinha();
    this.verificarTituloModal();
  }
  clicarPrimeiraLinhaComStatusPago() {
    ListagemContasAPagarPage.clicarBotaoPagoNaPrimeiraLinha();
    this.verificarTituloModal();
  }

  verificarTituloModal() {
    cy.get(BaixarDespesasLocators.tituloModalPagamento).should('contain', 'Recebimento');
  }

  preencherConta() {
    cy.get(BaixarDespesasLocators.campoConta).type('CAIXA');
    cy.get(BaixarDespesasLocators.resultadoAutocompleteConta).should('be.visible');
    cy.get(BaixarDespesasLocators.resultadoAutocompleteConta).contains('CAIXA').click();
  }

  preencherFormaPagamento() {
    cy.get(BaixarDespesasLocators.campoFormaPagamento).type('ESPÉCIE');
    cy.get(BaixarDespesasLocators.resultadoAutocompleteFormaPagamento).should('be.visible');
    cy.get(BaixarDespesasLocators.resultadoAutocompleteFormaPagamento).contains('ESPÉCIE').click();
  }

  verificarCamposPagoEPendente() {
    // Verifica se os campos de "Valor Pago" e "Valor Pendente" estão desabilitados
    cy.get(BaixarDespesasLocators.valorPagoinput1).should('be.disabled');
    cy.get(BaixarDespesasLocators.valorPendenteInput).should('be.disabled');
  }

  preencherJurosMulta(jurosMulta) {
    cy.get(BaixarDespesasLocators.JurosMulta).clear().type(jurosMulta);
  }

  preencherDesconto(desconto) {
    cy.get(BaixarDespesasLocators.Desconto).clear().type(desconto);
  }

  verificarCampoValorFinal() {
    cy.get(BaixarDespesasLocators.ValorFinal).should('be.disabled');
  }

  obterValorFinal() {
    return cy.get(BaixarDespesasLocators.ValorFinal).invoke('val');
  }

  preencherDataRecebimentoComDataAtual() {
    const dataAtualFormatada = this.obterDataAtualFormatada();
    cy.get(BaixarDespesasLocators.dataRecebimentoInput).clear().type(dataAtualFormatada);
  }

  obterDataAtualFormatada() {
    const dataAtual = new Date();
    return `${String(dataAtual.getDate()).padStart(2, '0')}/${String(dataAtual.getMonth() + 1).padStart(2, '0')}/${dataAtual.getFullYear()}`;
  }

  preencherValorRecebido(valorRecebido) {
    cy.get(BaixarDespesasLocators.ValorRecebido).clear().type(valorRecebido);
  }

  clicarSalvar() {
    cy.get(BaixarDespesasLocators.botaoSalvarPagamento).click();
  }

  verificarToastSucesso() {
    cy.get(BaixarDespesasLocators.toastSucesso).should('be.visible');
  }

  fecharModal() {
    cy.get(BaixarDespesasLocators.botaoVoltar).click();
  }

  verificarStatusRegistroPago() {
    this.fecharModal();
    ListagemContasAPagarPage.verificarNotificacaoSucesso();
  }
  verificarStatusRegistroParcial() {
    // Fecha o modal de pagamento
    this.fecharModal();
    // Navega para a listagem e verifica se o status da primeira linha está como "Parcial"
    ListagemContasAPagarPage.verificarStatusParcial();
  }
  clicarDesfazerBaixa() {
    cy.get(BaixarDespesasLocators.botaoDesfazerBaixa).first().click();
  }

  confirmarDesfazerBaixa() {
    cy.get(BaixarDespesasLocators.confirmacaoTitulo).should('contain', 'Deseja realmente desfazer a baixa?');
    cy.get(BaixarDespesasLocators.botaoConfirmarDesfazer).click();
  }

  verificarValorPendente(valorEsperado) {
    cy.get(BaixarDespesasLocators.valorPendenteInput)
      .invoke('val')
      .should('contain', valorEsperado);
  }
  verificarStatusRegistroAPagar() {
    ListagemContasAPagarPage.verificarStatusBaixar();
  }
  confirmarDesfazerBaixa() {
    cy.get(BaixarDespesasLocators.confirmacaoTitulo)
      .should('contain', 'Deseja realmente cancelar está parcela?');
    cy.get(BaixarDespesasLocators.botaoConfirmarDesfazer).click();
  }
  capturarValorPagoDaLinha() {
    return cy.get(BaixarDespesasLocators.linhaTabela)
      .first() // Seleciona a primeira linha encontrada com status "Pago"
      .find(BaixarDespesasLocators.valorPagoNaLinha)
      .invoke('text')
      .then((valor) => valor.replace('R$', '').trim());
  }
  verificarValorPendenteAposDesfazerBaixa(valorEsperado) {
    cy.get(BaixarDespesasLocators.valorPendenteInput)
      .should('be.visible') // Verifica se o campo está visível antes de capturar o valor
      .invoke('val')
      .then((valorAtual) => {
        const valorFormatado = valorAtual.replace('R$', '').replace(',', '.').trim();
        // Adiciona logs para depuração
        cy.log(`Valor Atual: ${valorFormatado}`);
        cy.log(`Valor Esperado: ${valorEsperado}`);

        // Validação com espera explícita para garantir que o valor correto seja capturado
        cy.wrap(parseFloat(valorFormatado), { timeout: 10000 })
          .should('not.equal', parseFloat(valorEsperado));
      });
  }
  capturarValorAntesDeDesfazerBaixa() {
    return cy.get(BaixarDespesasLocators.valorPendenteInput)
      .invoke('val')
      .then((valor) => {
        return valor.replace('R$', '').replace(',', '.').trim();
      });
  }
  verificarTabelaDetalhesPagamentoVazia() {
    cy.get('.table-responsive tbody tr').should('have.length', 0);

  }

}

export default new BaixarDespesasPage();
