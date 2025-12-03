import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeComplementarPage from '../../support/pages/Venda/NFe/CadastroNfeComplementarPage';

describe('Carta de Correção NFe Complementar', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-complementar', '@carta-correcao'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e gera carta de correção NFe complementar avulsa', () => {
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

    // Emitir Carta de Correção
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
    CadastroNfeComplementarPage.emitirCartaCorrecaoNFe('Teste automatizado - Carta de Correção NFe Complementar Avulsa');
  });
});
