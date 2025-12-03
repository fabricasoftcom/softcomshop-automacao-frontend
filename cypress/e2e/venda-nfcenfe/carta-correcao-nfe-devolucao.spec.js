import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeDevolucaoPage from '../../support/pages/Venda/NFe/Devolucao';

describe('Carta de Correção NFe Devolução', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-devolucao', '@carta-correcao'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e gera carta de correção NFe devolucao avulsa', () => {
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

    // Emitir Carta de Correção
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
    CadastroNfeDevolucaoPage.emitirCartaCorrecaoNFe('Teste automatizado - Carta de Correção NFe Devolução Avulsa');
  });
});
