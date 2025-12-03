import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeComplementarPage from '../../support/pages/Venda/NFe/CadastroNfeComplementarPage';

describe('Cancelamento NFe Complementar', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-complementar', '@cancelamento'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e cancela NFe complementar avulsa', () => {
    // Emitir NFe
    CadastroNfeComplementarPage.avancarParaCadastroComplementarAvulsa();
    CadastroNfeComplementarPage.validarFormularioComplementarAvulsa();
    CadastroNfeComplementarPage.preencherDadosNotaComplementar();
    CadastroNfeComplementarPage.preencherNatureza('5102', { aguardarSweetAlertCfop: true });
    CadastroNfeComplementarPage.preencherDestinatario('SOFTCOM TECNOLOGIA', {
      validarPreenchido: true,
      aguardarPosSweetAlert: true,
    });
    CadastroNfeComplementarPage.validarTelaSelecaoItens();
    CadastroNfeComplementarPage.adicionarItemComplementar();
    CadastroNfeComplementarPage.validarTelaPagamentos();
    CadastroNfeComplementarPage.adicionarPagamentoBasico();
    CadastroNfeComplementarPage.clicarBotaoContinuarRodape();
    CadastroNfeComplementarPage.validarTelaEmitirNota();
    CadastroNfeComplementarPage.emitirNota();
    CadastroNfeComplementarPage.validarModalSucessoEmissao('listagem');

    // Cancelar NFe
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
    CadastroNfeComplementarPage.cancelarNFe('Teste automatizado - Cancelamento NFe Complementar Avulsa');
  });
});

