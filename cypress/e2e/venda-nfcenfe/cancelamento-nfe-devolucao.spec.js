import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeDevolucaoPage from '../../support/pages/Venda/NFe/Devolucao';

describe('Cancelamento NFe Devolução', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-devolucao', '@cancelamento'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e cancela NFe devolucao avulsa', () => {
    // Emitir NFe
    CadastroNfeDevolucaoPage.avancarParaCadastroDevolucaoAvulsa();
    CadastroNfeDevolucaoPage.validarFormularioDevolucaoAvulsa();
    CadastroNfeDevolucaoPage.preencherNatureza('1202');
    CadastroNfeDevolucaoPage.preencherDestinatario('SOFTCOM TECNOLOGIA');
    CadastroNfeDevolucaoPage.validarTelaSelecaoItens();
    CadastroNfeDevolucaoPage.adicionarItem(null, '1');
    CadastroNfeDevolucaoPage.validarTelaPagamentos();
    CadastroNfeDevolucaoPage.adicionarPagamentoBasico();
    CadastroNfeDevolucaoPage.clicarBotaoContinuarRodape();
    CadastroNfeDevolucaoPage.validarTelaEmitirNota();
    CadastroNfeDevolucaoPage.emitirNota();
    CadastroNfeDevolucaoPage.validarModalSucessoEmissao('listagem');

    // Cancelar NFe
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
    CadastroNfeDevolucaoPage.cancelarNFe('Teste automatizado - Cancelamento NFe Devolução Avulsa');
  });
});

