import ListagemNfePage from '../../support/pages/Venda/ListagemNfePage';
import CadastroNfePage from '../../support/pages/Venda/CadastroNfePage';

describe('Cadastro NFe - Validações Gerais', { tags: ['@nfe', '@vendas', '@regressivo', '@nfe-geral'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    CadastroNfePage.desabilitarTourFinalidadeNormal();
    ListagemNfePage.visitar();
    ListagemNfePage.clicarNovoCadastro();
  });

  it('abre tela de novo cadastro com passos e tipo Avulsa pre-selecionados', () => {
    CadastroNfePage.validarTelaInicial();
    CadastroNfePage.validarPassosETabs();
    CadastroNfePage.validarTipoAvulsaPreSelecionado();
    CadastroNfePage.validarSkeletonsIniciais();
  });

  it('permite alternar e exibe conteudos das abas de finalidade', () => {
    CadastroNfePage.fecharTutorialSeVisivel();
    CadastroNfePage.validarAbasFinalidade();
  });
});
