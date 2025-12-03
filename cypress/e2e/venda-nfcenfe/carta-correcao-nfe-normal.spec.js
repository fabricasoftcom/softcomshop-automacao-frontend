import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';

describe('Carta de Correção NFe Normal', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-normal', '@carta-correcao'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('emite e gera carta de correção NFe normal avulsa', () => {
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

    // Emitir Carta de Correção
    cy.wait(2000); // Aguarda a listagem carregar
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000); // Aguarda a edição carregar
    CadastroNfeNormalPage.emitirCartaCorrecaoNFe('Teste automatizado - Carta de Correção NFe Normal Avulsa');
  });
});
