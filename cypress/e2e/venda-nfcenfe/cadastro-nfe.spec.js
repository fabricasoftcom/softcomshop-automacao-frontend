import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';
import CadastroNfeNormalPage from '../../support/pages/Venda/NFe/Normal';
import CadastroNfeBasePage from '../../support/pages/Venda/NFe/CadastroNfeBasePage';

const cadastroNfeBasePage = new CadastroNfeBasePage();

// describe('Cadastro NFe - Validações Gerais', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-geral'] }, () => {
//   beforeEach(() => {
//     cy.login();
//     cy.visit('/');
//     CadastroNfePage.desabilitarTourFinalidadeNormal();
//     ListagemNfePage.visitar();
//     ListagemNfePage.clicarNovoCadastro();
//   });

//   it('abre tela de novo cadastro com passos e tipo Avulsa pre-selecionados', () => {
//     CadastroNfePage.validarTelaInicial();
//     CadastroNfePage.validarPassosETabs();
//     CadastroNfePage.validarTipoAvulsaPreSelecionado();
//     CadastroNfePage.validarSkeletonsIniciais();
//   });

//   it('permite alternar e exibe conteudos das abas de finalidade', () => {
//     CadastroNfePage.fecharTutorialSeVisivel();
//     CadastroNfePage.validarAbasFinalidade();
//   });
// });

describe('Cadastro NFe - Validações Dropdown Mais Ações', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-geral', '@dropdown-acoes'] }, () => {
  before(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
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

  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    cy.wait(2000);
    ListagemNfePage.abrirEdicaoPrimeiraLinha();
    cy.wait(2000);
  });

  it('valida que todas as opções do dropdown Mais Ações estão visíveis', () => {
    cadastroNfeBasePage.validarOpcoesDropdownMaisAcoes();
  });

  it('valida opção Download XML do dropdown Mais Ações', () => {
    cadastroNfeBasePage.validarDownloadXml();
  });

  it('valida opção Visualizar Danfe do dropdown Mais Ações', () => {
    cadastroNfeBasePage.validarVisualizarDanfe();
  });

  it('valida opção Enviar email do dropdown Mais Ações', () => {
    cadastroNfeBasePage.validarEnviarEmail();
  });

  it('valida opção Clonar NFe do dropdown Mais Ações', () => {
    cadastroNfeBasePage.validarClonarNFe();
  });
});
