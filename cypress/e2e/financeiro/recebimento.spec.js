import RecebimentoPage from "../../support/pages/Financeiro/RecebimentoPage";

describe('Testes do Modal de Recebimento', () => {
  beforeEach(() => {
    cy.login();
    RecebimentoPage.visit();
  });

  //   it('Deve verificar os dados principais do modal', () => {
  //     RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
  //     RecebimentoPage.verificarDadosPrincipais();
  //   });
  //   it('Deve preencher todas as informações de pagamento, clicar em voltar e verificar que o status permanece "Baixar"', () => {
  //     RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
  //     // Preenche o campo "Conta" com uma conta válida (ex.: "CAIXA")
  //     RecebimentoPage.preencherConta();

  //     // Preenche o campo "Forma de Pagamento" com uma forma válida (ex.: "ESPÉCIE")
  //     RecebimentoPage.preencherFormaPagamento();

  //     // Verifica os campos "Valor Pago" e "Valor Pendente" para confirmar que estão desabilitados
  //     RecebimentoPage.verificarCamposPagoEPendente();

  //     // Preenche os campos de Juros/Multa e Desconto com valores de teste
  //     RecebimentoPage.preencherJurosMulta('2,00');
  //     RecebimentoPage.preencherDesconto('1,00');

  //     // Verifica o campo "Valor Final" como desabilitado para alterações
  //     RecebimentoPage.verificarCampoValorFinal();

  //     // Captura o valor final e o usa para preencher o campo "Valor Recebido"
  //     RecebimentoPage.obterValorFinal().then((valorFinal) => {
  //       // Preenche a data de recebimento com a data atual
  //       RecebimentoPage.preencherDataRecebimentoComDataAtual();

  //       // Preenche o campo "Valor Recebido" com o valor final para simular o pagamento completo
  //       RecebimentoPage.preencherValorRecebido(valorFinal);

  //       // Clica no botão "Voltar" em vez de salvar, retornando à listagem
  //       RecebimentoPage.clicarVoltar();

  //       // Verifica se o modal foi fechado
  //       cy.get('.modal-content').should('not.exist');

  //       // Valida que o status da linha permanece como "Baixar", indicando que a operação não foi concluída
  //       RecebimentoPage.verificarStatusRegistroBaixar();
  //     });
  //   });
  // it('Deve preencher as informações de pagamento, salvar e verificar status Pago', () => {
  //   RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
  //     RecebimentoPage.preencherConta(); // Preenche com "CAIXA"
  //     RecebimentoPage.preencherFormaPagamento(); // Preenche com "ESPÉCIE"
  //     RecebimentoPage.verificarCamposPagoEPendente();
  //     RecebimentoPage.preencherJurosMulta('2,00');
  //     RecebimentoPage.preencherDesconto('1,00');
  //     RecebimentoPage.verificarCampoValorFinal();

  //     // Captura o valor final e usa esse valor no campo "Valor Recebido"
  //     RecebimentoPage.obterValorFinal().then((valorFinal) => {
  //       RecebimentoPage.preencherDataRecebimentoComDataAtual();
  //       RecebimentoPage.preencherValorRecebido(valorFinal);
  //       RecebimentoPage.clicarSalvar();

  //       // Verifica o Toast de sucesso
  //       RecebimentoPage.verificarToastSucesso();

  //       // Fecha o modal e verifica o status "Pago"
  //       RecebimentoPage.verificarStatusRegistroPago();
  //     });
  //   });
  it('Deve preencher as informações de pagamento com baixa parcial de 20% e salvar', () => {
    RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
    RecebimentoPage.preencherConta();
    RecebimentoPage.preencherFormaPagamento();
    RecebimentoPage.verificarCamposPagoEPendente();
    RecebimentoPage.preencherJurosMulta('2,00');
    RecebimentoPage.preencherDesconto('1,00');
    RecebimentoPage.verificarCampoValorFinal();

    RecebimentoPage.obterValorFinal().then((valorFinal) => {
      // Remove "R$", substitui vírgula por ponto e calcula 20% do valor final
      const valorVintePorcento = (parseFloat(valorFinal.replace('R$', '').replace(',', '.').trim()) * 0.20)
                                  .toFixed(2)
                                  .replace('.', ',');

      RecebimentoPage.preencherDataRecebimentoComDataAtual();
      RecebimentoPage.preencherValorRecebido(valorVintePorcento);
      RecebimentoPage.clicarSalvar();
      RecebimentoPage.verificarToastSucesso();
      RecebimentoPage.verificarStatusRegistroParcial();
    });
  });
  // it('Deve localizar e clicar no botão "PARCIAL" da primeira linha com status PARCIAL', () => {
  //   // Chama o método que localiza e clica no botão "PARCIAL" da primeira linha com status "PARCIAL"
  //   RecebimentoPage.clicarPrimeiraLinhaComStatusParcial();

  //   // Preenche o campo "Conta" com "CAIXINHA" ou "CAIXA"
  //   RecebimentoPage.preencherConta();

  //   // Preenche o campo "Forma de Pagamento" com "ESPÉCIE"
  //   RecebimentoPage.preencherFormaPagamento();

  //   // Verifica os campos "Valor Pago" e "Valor Pendente" para confirmar que estão desabilitados
  //   RecebimentoPage.verificarCamposPagoEPendente();

  //   // Verifica o campo "Valor Final" como desabilitado para alterações
  //   RecebimentoPage.verificarCampoValorFinal();

  //   // Captura o valor final e o usa para preencher o campo "Valor Recebido"
  //   RecebimentoPage.obterValorFinal().then((valorFinal) => {
  //     // Preenche a data de recebimento com a data atual
  //     RecebimentoPage.preencherDataRecebimentoComDataAtual();

  //     // Preenche o campo "Valor Recebido" com o valor final para baixa completa
  //     RecebimentoPage.preencherValorRecebido(valorFinal);

  //     // Clica no botão "Salvar" para finalizar a baixa
  //     RecebimentoPage.clicarSalvar();

  //     // Verifica o Toast de sucesso para confirmação
  //     RecebimentoPage.verificarToastSucesso();
  //   });    
  // });

  //   it('Deve expandir os detalhes de pagamento e verificar tabela vazia', () => {
  //     RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
  //     RecebimentoPage.expandirDetalhesPagamento();
  //     RecebimentoPage.verificarTabelaDetalhesPagamentoVazia();
  //   });

  it('Deve desfazer a baixa de uma parcela, fechar o modal e verificar o status "Baixar"', () => {
    // Chama o método que localiza e clica no botão "PARCIAL" da primeira linha com status "PARCIAL"
    RecebimentoPage.clicarPrimeiraLinhaComStatusParcial();

    // Clica em "Desfazer baixa"
    RecebimentoPage.desfazerBaixa();

    // Verifica a exibição da confirmação e o título correto
    RecebimentoPage.verificarTituloConfirmacaoDesfazerBaixa();

    // Confirma o desfazer da baixa
    RecebimentoPage.confirmarDesfazerBaixa();

    // Fecha o modal de recebimento
    RecebimentoPage.fecharModal();

    // Verifica que o status da parcela é atualizado para "Baixar"
    RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();

    // Verifica o Toast de sucesso
    RecebimentoPage.verificarToastSucesso();
  });

});
