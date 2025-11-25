import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeComplementarPage from '../../support/pages/Venda/NFe/CadastroNfeComplementarPage';

describe('Cadastro NFe Complementar', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-complementar'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('realiza fluxo completo da NFe complementar avulsa', () => {
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
  });
});

