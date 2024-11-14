import BaixarDespesasPage from "../../support/pages/Financeiro/BaixarDespesasPage";

describe('Testes de Baixar Despesas', () => {
  beforeEach(() => {
    cy.login();
    BaixarDespesasPage.visit();
  });

  it('Deve preencher as informações de pagamento, salvar e verificar status Pago', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusBaixar();
    BaixarDespesasPage.verificarTituloModal();

    // Preenche os campos obrigatórios
    BaixarDespesasPage.preencherConta();
    BaixarDespesasPage.preencherFormaPagamento();
    BaixarDespesasPage.verificarCamposPagoEPendente();
    BaixarDespesasPage.preencherJurosMulta('5,00');
    BaixarDespesasPage.preencherDesconto('2,00');
    BaixarDespesasPage.verificarCampoValorFinal();

    // Captura o valor final e usa no campo "Valor Recebido"
    BaixarDespesasPage.obterValorFinal().then((valorFinal) => {
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
      BaixarDespesasPage.preencherValorRecebido(valorFinal);
      BaixarDespesasPage.clicarSalvar();

      // Verifica o Toast de sucesso
      BaixarDespesasPage.verificarToastSucesso();
    });
  });
  
  it('Deve preencher o recebimento com metade do valor final e verificar status Parcial', () => {
    // Acessar a primeira linha com status "Baixar" e abrir o modal
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusBaixar();
    BaixarDespesasPage.verificarTituloModal();
  
    // Preencher os campos obrigatórios
    BaixarDespesasPage.preencherConta(); // Preenche com "CAIXA"
    BaixarDespesasPage.preencherFormaPagamento(); // Preenche com "ESPÉCIE"
    BaixarDespesasPage.verificarCamposPagoEPendente();
  
    // Preencher juros e desconto
    BaixarDespesasPage.preencherJurosMulta('3,00');
    BaixarDespesasPage.preencherDesconto('1,50');
  
    // Verificar o campo de valor final e obter o valor para calcular a metade
    BaixarDespesasPage.verificarCampoValorFinal();
    BaixarDespesasPage.obterValorFinal().then((valorFinal) => {
      // Remove "R$", substitui vírgula por ponto e calcula 50% do valor final
      const valorMetade = (parseFloat(valorFinal.replace('R$', '').replace(',', '.').trim()) * 0.5)
                            .toFixed(2)
                            .replace('.', ',');
  
      // Preencher a data de recebimento com a data atual
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
  
      // Preencher o valor recebido com metade do valor final
      BaixarDespesasPage.preencherValorRecebido(valorMetade);
  
      // Salvar o pagamento
      BaixarDespesasPage.clicarSalvar();
  
      // Verificar o toast de sucesso
      BaixarDespesasPage.verificarToastSucesso();
  
      // Verificar o status como "Parcial" após fechar o modal
      BaixarDespesasPage.verificarStatusRegistroParcial();
    });
  });
    it('Deve preencher as informações de pagamento em um registro Parcial, salvar e verificar status Pago', () => {
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusParcial();
    BaixarDespesasPage.verificarTituloModal();

    // Preenche os campos obrigatórios
    BaixarDespesasPage.preencherConta();
    BaixarDespesasPage.preencherFormaPagamento();
    BaixarDespesasPage.verificarCamposPagoEPendente();
    BaixarDespesasPage.preencherJurosMulta('5,00');
    BaixarDespesasPage.preencherDesconto('2,00');
    BaixarDespesasPage.verificarCampoValorFinal();

    // Captura o valor final e usa no campo "Valor Recebido"
    BaixarDespesasPage.obterValorFinal().then((valorFinal) => {
      BaixarDespesasPage.preencherDataRecebimentoComDataAtual();
      BaixarDespesasPage.preencherValorRecebido(valorFinal);
      BaixarDespesasPage.clicarSalvar();

      // Verifica o Toast de sucesso
      BaixarDespesasPage.verificarToastSucesso();
    });
  });
  it('Deve desfazer a baixa de um registro com status "Pago" e verificar o valor pendente', () => {
    // Acessa o primeiro registro com status "Pago"
    BaixarDespesasPage.clicarPrimeiraLinhaComStatusPago();
  
    // Captura o valor pendente antes de desfazer a baixa
    BaixarDespesasPage.capturarValorAntesDeDesfazerBaixa().then((valorOriginal) => {
      // Clica no botão "Desfazer baixa"
      BaixarDespesasPage.clicarDesfazerBaixa();
  
      // Confirmar a operação no modal SweetAlert
      BaixarDespesasPage.confirmarDesfazerBaixa();
  
      // Verificar se o valor pendente foi restaurado corretamente após desfazer a baixa
      BaixarDespesasPage.verificarValorPendenteAposDesfazerBaixa(valorOriginal);
      
      // Verificar que o status voltou para "A Pagar"
      BaixarDespesasPage.verificarStatusRegistroAPagar();
    });
  });
  
});
