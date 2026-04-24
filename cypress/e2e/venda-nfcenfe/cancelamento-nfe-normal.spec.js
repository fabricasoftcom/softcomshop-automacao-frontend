import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';

describe('Cancelamento NFe Normal', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-normal', '@cancelamento'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e cancela NFe normal avulsa', () => {
    // Emitir NFe
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

    // Cancelar NFe
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    CadastroNfeNormalPage.aguardarTelaEdicaoNfeCarregada();
    CadastroNfeNormalPage.cancelarNFe('Teste automatizado - Cancelamento NFe Normal Avulsa');
  });
});

