import BaixarDespesasPage from "../../support/pages/Financeiro/BaixarDespesasPage";

describe('Testes de Baixa de Despesas', { tags: ['@baixar-despesa', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    BaixarDespesasPage.visit();
  });

  it('Deve realizar baixa completa e verificar status "Pago"', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusBaixar();
    BaixarDespesasPage.preencherConta();
    BaixarDespesasPage.preencherFormaPagamento();
    BaixarDespesasPage.verificarCampoValorFinal();

    BaixarDespesasPage.obterValorFinal().then(valorFinal => {
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
      BaixarDespesasPage.preencherValorRecebido(valorFinal);
      BaixarDespesasPage.clicarSalvar();
      BaixarDespesasPage.verificarToastSucesso();
      BaixarDespesasPage.verificarStatusRegistroPago();
    });
  });
  it('Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusPago();
    BaixarDespesasPage.clicarDesfazerBaixa();
    BaixarDespesasPage.confirmarDesfazerBaixa();
    BaixarDespesasPage.fecharModal();
    BaixarDespesasPage.verificarToastSucesso();
  });

  it('Deve realizar baixa parcial (50%) e verificar status "Parcial"', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusBaixar();
    BaixarDespesasPage.preencherConta();
    BaixarDespesasPage.preencherFormaPagamento();

    BaixarDespesasPage.obterValorFinal().then(valorFinal => {
      const valorParcial = (parseFloat(valorFinal.replace('R$', '').replace(',', '.')) * 0.5)
        .toFixed(2)
        .replace('.', ',');
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
      BaixarDespesasPage.preencherValorRecebido(valorParcial);
      BaixarDespesasPage.clicarSalvar();
      cy.get('#loading').should('not.exist');
      BaixarDespesasPage.verificarToastSucesso();
      BaixarDespesasPage.verificarStatusRegistroParcial();
    });
   });
  it('Deve localizar e clicar no botão "PARCIAL" da primeira linha com status PARCIAL', () => {
    // Localiza e clica no botão "PARCIAL"
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusParcial();

    // Preenche o campo "Conta" com "CAIXINHA" ou "CAIXA"
    BaixarDespesasPage.preencherConta();

    // Preenche o campo "Forma de Pagamento" com "ESPÉCIE"
    BaixarDespesasPage.preencherFormaPagamento();

    // Verifica os campos "Valor Pago" e "Valor Pendente"
    BaixarDespesasPage.verificarCamposPagoEPendente();

    // Verifica que o campo "Valor Final" está desabilitado
    BaixarDespesasPage.verificarCampoValorFinal();

    // Captura o valor final e preenche o campo "Valor Recebido"
    BaixarDespesasPage.obterValorFinal().then((valorFinal) => {
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
      BaixarDespesasPage.preencherValorRecebido(valorFinal);

      // Clica no botão "Salvar" para concluir a baixa
      BaixarDespesasPage.clicarSalvar();

      // Verifica o Toast de sucesso
      BaixarDespesasPage.verificarToastSucesso();
    });
  });
  it('Deve desfazer baixa e verificar valor pendente restaurado', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusPago();
    BaixarDespesasPage.capturarValorAntesDeDesfazerBaixa().then(valorOriginal => {
      BaixarDespesasPage.clicarDesfazerBaixa();
      BaixarDespesasPage.confirmarDesfazerBaixa();
      BaixarDespesasPage.verificarValorPendenteAposDesfazerBaixa(valorOriginal);
    });
  });
  it('Deve expandir os detalhes de pagamento e verificar tabela vazia', () => {
    // Localiza e clica no botão "BAIXAR"
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusBaixar();

    // Verifica que a tabela de detalhes está vazia
    BaixarDespesasPage.verificarTabelaDetalhesPagamentoVazia();
  });

});
