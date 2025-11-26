import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeDevolucaoPage from '../../support/pages/Venda/NFe/CadastroNfeDevolucaoPage';

describe('Cadastro NFe Devolução', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-devolucao'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  // it('realiza fluxo completo da NFe de devolucao avulsa', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoAvulsa();
  //   CadastroNfeDevolucaoPage.validarFormularioDevolucaoAvulsa();
  //   CadastroNfeDevolucaoPage.preencherNatureza('1202');
  //   CadastroNfeDevolucaoPage.preencherDestinatario('SOFTCOM TECNOLOGIA');
  //   CadastroNfeDevolucaoPage.validarTelaSelecaoItens();
  //   CadastroNfeDevolucaoPage.adicionarItem(null, '1');
  //   CadastroNfeDevolucaoPage.validarTelaPagamentos();
  //   CadastroNfeDevolucaoPage.adicionarPagamentoBasico();
  //   CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
  //   CadastroNfeDevolucaoPage.validarTelaEmitirNota();
  //   CadastroNfeDevolucaoPage.emitirNota();
  //   CadastroNfeDevolucaoPage.validarModalSucessoEmissao('listagem');
  // });

  // it('abre formulario de NFe devolucao compra apos pesquisar e selecionar', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.preencherQuantidadeDevolverMetade();
  //   CadastroNfeDevolucaoPage.gerarNotaDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.validarFormularioDevolucaoCompra();
  // });

  // it('realiza fluxo completo da NFe devolucao compra', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.validarModalSelecaoItensDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.preencherQuantidadeDevolverMetade();
  //   CadastroNfeDevolucaoPage.gerarNotaDevolucaoCompra();
  //   CadastroNfeDevolucaoPage.finalizarEmissaoDevolucao();
  // });

  // it('abre formulario de NFe devolucao movimentacao apos pesquisar e selecionar', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoMovimentacao();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoMovimentacao();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoMovimentacao();
  //   CadastroNfeDevolucaoPage.validarFormularioDevolucaoMovimentacao();
  // });

  it('realiza fluxo completo da NFe devolucao movimentacao', () => {
    CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoMovimentacao();
    CadastroNfeDevolucaoPage.pesquisarDevolucaoMovimentacao();
    // Seleciona a primeira movimentação com valor > 0 e clica em Continuar
    CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoMovimentacao();
    // A natureza já vem preenchida automaticamente ao selecionar a movimentação
    // Adiciona uma nota referenciada (obrigatório para devolução)
    CadastroNfeDevolucaoPage.adicionarNotaReferenciada();
    // Intercepta a requisição de itens para aguardar o carregamento completo
    cy.intercept('GET', '**/nfe2/**/itens').as('carregarItens');
    CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
    // Aguarda a requisição de itens ser concluída antes de validar
    cy.wait('@carregarItens', { timeout: 30000 }).its('response.statusCode').should('eq', 200);
    CadastroNfeDevolucaoPage.validarTelaSelecaoItens();
    CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
    // Avança para a tela de pagamentos
    CadastroNfeDevolucaoPage.validarTelaPagamentos();
    // Avança para a tela de finalizar
    CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
    CadastroNfeDevolucaoPage.validarTelaEmitirNota();
    CadastroNfeDevolucaoPage.emitirNota();
    CadastroNfeDevolucaoPage.validarModalSucessoEmissao('listagem');
  });

  // it('abre formulario de NFe devolucao nota fiscal saida apos pesquisar e selecionar', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.validarFormularioDevolucaoNotaFiscalSaida();
  // });

  // it('realiza fluxo completo da NFe devolucao nota fiscal saida', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoNotaFiscalSaida();
  //   CadastroNfeDevolucaoPage.preencherNatureza('1202');
  //   CadastroNfeDevolucaoPage.validarTelaSelecaoItens();
  //   CadastroNfeDevolucaoPage.adicionarItem(null, '1');
  //   CadastroNfeDevolucaoPage.validarTelaPagamentos();
  //   CadastroNfeDevolucaoPage.adicionarPagamentoBasico();
  //   CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
  //   CadastroNfeDevolucaoPage.validarTelaEmitirNota();
  //   CadastroNfeDevolucaoPage.emitirNota();
  //   CadastroNfeDevolucaoPage.validarModalSucessoEmissao('listagem');
  // });

  // it('abre formulario de NFe devolucao trocas apos pesquisar e selecionar', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.validarFormularioDevolucaoTrocas();
  // });

  // it('realiza fluxo completo da NFe devolucao trocas', () => {
  //   CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.pesquisarDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.selecionarPrimeiraDevolucaoTrocas();
  //   CadastroNfeDevolucaoPage.preencherNatureza('1202');
  //   CadastroNfeDevolucaoPage.validarTelaSelecaoItens();
  //   CadastroNfeDevolucaoPage.adicionarItem(null, '1');
  //   CadastroNfeDevolucaoPage.validarTelaPagamentos();
  //   CadastroNfeDevolucaoPage.adicionarPagamentoBasico();
  //   CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
  //   CadastroNfeDevolucaoPage.validarTelaEmitirNota();
  //   CadastroNfeDevolucaoPage.emitirNota();
  //   CadastroNfeDevolucaoPage.validarModalSucessoEmissao('listagem');
  // });
});

