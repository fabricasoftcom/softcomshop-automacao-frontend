import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/CadastroNfeNormalPage';

describe('Cadastro NFe Normal', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-normal'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('abre formulario de NFe normal avulsa apos continuar', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalAvulsa();
    CadastroNfeNormalPage.validarFormularioNormalAvulsa();
  });

  it('preenche formulario com natureza e destinatario na NFe normal avulsa', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalAvulsa();
    CadastroNfeNormalPage.preencherNatureza('5102');
    CadastroNfeNormalPage.preencherDestinatario('SOFTCOM TECNOLOGIA');
    CadastroNfeNormalPage.validarTelaSelecaoItens();
    CadastroNfeNormalPage.adicionarItem(null, '1');
    CadastroNfeNormalPage.validarTelaPagamentos();
    CadastroNfeNormalPage.adicionarPagamentoBasico();
    CadastroNfeNormalPage.clicarBotaoContinuarRodape();
    CadastroNfeNormalPage.validarTelaEmitirNota();
    CadastroNfeNormalPage.emitirNota();
    CadastroNfeNormalPage.validarModalSucessoEmissao('listagem');
  });

  it('abre formulario de NFe normal venda apos pesquisar e selecionar', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalVenda();
    CadastroNfeNormalPage.pesquisarVenda();
    CadastroNfeNormalPage.selecionarVendaClienteDiferenteConsumidor();
    CadastroNfeNormalPage.validarFormularioNormalVenda();
  });

  it('realiza fluxo completo da NFe normal venda', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalVenda();
    CadastroNfeNormalPage.pesquisarVenda();
    CadastroNfeNormalPage.selecionarVendaClienteDiferenteConsumidor();
    CadastroNfeNormalPage.validarModalSucessoEmissao('listagem');
  });

  it('abre formulario de NFe normal NFCe apos pesquisar e selecionar', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalNfce();
    CadastroNfeNormalPage.pesquisarNfce();
    CadastroNfeNormalPage.selecionarPrimeiraNfce(false);
    CadastroNfeNormalPage.validarFormularioNormalNfce();
  });

  it('realiza fluxo completo da NFe normal NFCe', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalNfce();
    CadastroNfeNormalPage.pesquisarNfce();
    CadastroNfeNormalPage.selecionarPrimeiraNfce();
    CadastroNfeNormalPage.validarModalSucessoEmissao('listagem');
  });

  it('abre formulario de NFe normal movimentacao apos pesquisar e selecionar', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalMovimentacao();
    CadastroNfeNormalPage.pesquisarMovimentacao();
    CadastroNfeNormalPage.selecionarPrimeiraMovimentacao();
    CadastroNfeNormalPage.validarFormularioNormalMovimentacao();
  });

  it('realiza fluxo completo da NFe normal movimentacao', () => {
    CadastroNfeNormalPage.avancarParaCadastroNormalMovimentacao();
    CadastroNfeNormalPage.pesquisarMovimentacao();
    CadastroNfeNormalPage.selecionarPrimeiraMovimentacao();
    CadastroNfeNormalPage.clicarBotaoContinuarRodape();
    CadastroNfeNormalPage.validarTelaSelecaoItens();
    CadastroNfeNormalPage.adicionarItem(null, '1');
    CadastroNfeNormalPage.validarTelaPagamentos();
    CadastroNfeNormalPage.clicarBotaoContinuarRodape();
    CadastroNfeNormalPage.validarTelaEmitirNota();
    CadastroNfeNormalPage.emitirNota();
    CadastroNfeNormalPage.validarModalSucessoEmissao('listagem');
  });
});

