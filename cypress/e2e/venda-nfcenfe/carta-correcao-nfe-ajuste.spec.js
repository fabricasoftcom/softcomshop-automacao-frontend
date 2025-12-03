import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeAjustePage from '../../support/pages/Venda/NFe/CadastroNfeAjustePage';

describe('Carta de Correção NFe Ajuste', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-ajuste', '@carta-correcao'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e gera carta de correção NFe ajuste avulsa', () => {
    // Emitir NFe
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

    // Emitir Carta de Correção
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
    CadastroNfeAjustePage.emitirCartaCorrecaoNFe('Teste automatizado - Carta de Correção NFe Ajuste Avulsa');
  });
});
