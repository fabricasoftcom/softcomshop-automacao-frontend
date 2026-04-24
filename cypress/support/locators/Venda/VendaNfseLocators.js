const VendaNfseLocators = {
  // Botões/ações (entrada principal é via "Mais ações")
  botaoAcoesOuMaisAcoes: '#btn-mais-acoes > .btn',
  botaoGerarNfsePorId: '[id*="nfse"], [data-testid*="nfse"], [data-cy*="nfse"]',
  botaoGerarNfsePorTexto: '#btn-mais-acoes > .dropdown-menu .btn-choice:contains("Gerar Nota")',

  // SweetAlert / modais genéricos
  sweetAlertContainer: '.sweet-alert',
  sweetAlertTitulo: '.sweet-alert h2',
  sweetAlertTexto: '.sweet-alert p',
  sweetAlertBotoes: '.sweet-alert button',
  sweetAlertBotaoNfse: '.sweet-alert #gerar-nota-fiscal-servico',
  modalBootstrapVisivel: '.modal.in, .modal.show',

  // Tela de NFse
  botaoEmitirNfse: '#emitir-nfse',
  botaoCancelarNfse: '#btn-cancelar-nfse',
  botaoConfirmarCancelamentoNfse: '#btn-nfse-cancelamento-confirmar',
};

export default VendaNfseLocators;

