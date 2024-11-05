import RecebimentoPage from "../../support/pages/Financeiro/RecebimentoPage";

describe('Testes do Modal de Recebimento', () => {
  beforeEach(() => {
    cy.login();
    RecebimentoPage.visit();
    RecebimentoPage.verificarTituloModal();
  });

//   it('Deve verificar os dados principais do modal', () => {
//     RecebimentoPage.verificarDadosPrincipais();
//   });

it('Deve preencher as informações de pagamento, salvar e verificar status Pago', () => {
    RecebimentoPage.preencherConta(); // Preenche com "CAIXA"
    RecebimentoPage.preencherFormaPagamento(); // Preenche com "ESPÉCIE"
    RecebimentoPage.verificarCamposPagoEPendente();
    RecebimentoPage.preencherJurosMulta('2,00');
    RecebimentoPage.preencherDesconto('1,00');
    RecebimentoPage.verificarCampoValorFinal();

    // Captura o valor final e usa esse valor no campo "Valor Recebido"
    RecebimentoPage.obterValorFinal().then((valorFinal) => {
      RecebimentoPage.preencherDataRecebimentoComDataAtual();
      RecebimentoPage.preencherValorRecebido(valorFinal);
      RecebimentoPage.clicarSalvar();

      // Verifica o Toast de sucesso
      RecebimentoPage.verificarToastSucesso();

      // Fecha o modal e verifica o status "Pago"
      RecebimentoPage.verificarStatusRegistroPago();
    });
  });
// it('Deve preencher as informações de pagamento com baixa parcial de 20% e salvar', () => {
//     // Preenche os campos obrigatórios no modal
//     RecebimentoPage.preencherConta(); // Conta configurada como "CAIXA"
//     RecebimentoPage.preencherFormaPagamento(); // Forma de pagamento configurada como "ESPÉCIE"
    
//     // Verifica se os campos "Valor Pago" e "Valor Pendente" estão desabilitados
//     RecebimentoPage.verificarCamposPagoEPendente();
    
//     // Preenche os campos de juros e desconto
//     RecebimentoPage.preencherJurosMulta('2,00');
//     RecebimentoPage.preencherDesconto('1,00');
    
//     // Verifica se o campo de valor final está desabilitado
//     RecebimentoPage.verificarCampoValorFinal();

//     // Obtém o valor final e calcula 20% para preencher no campo "Valor Recebido"
//     RecebimentoPage.obterValorFinal().then((valorFinal) => {
//       // Remove qualquer símbolo de vírgula e converte para um valor numérico, depois calcula 20%
//       const valorNumerico = Number(valorFinal.replace(',', '.'));
//       const valorVintePorcento = (valorNumerico * 0.20).toFixed(2).replace('.', ',');

//       // Exibe o valor calculado no log do Cypress
//       cy.log(`Valor calculado para 20% do valor final: ${valorVintePorcento}`);

//       // Preenche a data de recebimento com a data atual
//       RecebimentoPage.preencherDataRecebimentoComDataAtual();
      
//       // Preenche o campo de valor recebido com 20% do valor final
//       RecebimentoPage.preencherValorRecebido(valorVintePorcento);
      
//       // Salva o recebimento e verifica o toast de sucesso
//       RecebimentoPage.clicarSalvar();
//       RecebimentoPage.verificarToastSucesso();

//       // Fecha o modal e verifica se o status do registro está como "Parcial" na listagem
//       RecebimentoPage.verificarStatusRegistroParcial();
//     });
//   });
//   it('Deve expandir os detalhes de pagamento e verificar tabela vazia', () => {
//     RecebimentoPage.expandirDetalhesPagamento();
//     RecebimentoPage.verificarTabelaDetalhesPagamentoVazia();
//   });

//   it('Deve retornar para a tela anterior ao clicar em "Voltar"', () => {
//     RecebimentoPage.clicarVoltar();
//     cy.url().should('not.include', '/modal-recebimento');
//   });
});
