import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeAjustePage from '../../support/pages/Venda/NFe/CadastroNfeAjustePage';

describe('Cadastro NFe Ajuste', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-ajuste'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('realiza fluxo completo da NFe de ajuste avulsa', () => {
    CadastroNfeAjustePage.avancarParaCadastroAjusteAvulsa();
    CadastroNfeAjustePage.validarFormularioAjusteAvulsa();
    CadastroNfeAjustePage.preencherDadosNotaAjuste();
    CadastroNfeAjustePage.preencherNatureza('5102', { aguardarSweetAlertCfop: true });
    CadastroNfeAjustePage.preencherDestinatario('SOFTCOM TECNOLOGIA', {
      validarPreenchido: true,
      aguardarPosSweetAlert: true,
    });
    CadastroNfeAjustePage.validarTelaSelecaoItens();
    CadastroNfeAjustePage.adicionarItem(null, '1');
    CadastroNfeAjustePage.validarTelaPagamentos();
    CadastroNfeAjustePage.adicionarPagamentoBasico();
    CadastroNfeAjustePage.clicarBotaoContinuarRodape();
    CadastroNfeAjustePage.validarTelaEmitirNota();
    CadastroNfeAjustePage.emitirNota();
    CadastroNfeAjustePage.validarModalSucessoEmissao('listagem');
  });
});

