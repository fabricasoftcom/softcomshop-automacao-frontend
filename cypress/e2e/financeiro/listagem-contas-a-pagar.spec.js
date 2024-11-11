import ListagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";

describe('Testes de Listagem de Despesas', () => {

  beforeEach(() => {
    cy.login();
    ListagemContasAPagarPage.visit();
  });

  // it('Deve filtrar despesas por período e tipo de data', () => {
  //   ListagemContasAPagarPage.selecionarPeriodo('MONTH');
  //   ListagemContasAPagarPage.selecionarTipoData('PAGAMENTO');
  // });

  // it('Deve selecionar todas as linhas e baixar as selecionadas', () => {
  //   ListagemContasAPagarPage.selecionarTodasLinhas();
  //   ListagemContasAPagarPage.clicarBaixarSelecionados();
  //   ListagemContasAPagarPage.verificarNotificacaoSucesso();
  // });

  // it('Deve excluir uma despesa através do dropdown de ações', () => {
  //   ListagemContasAPagarPage.marcarCheckboxPrimeiraLinha();
  //   ListagemContasAPagarPage.selecionarOpcaoExcluir();
  //   ListagemContasAPagarPage.verificarNotificacaoSucesso();
  // });
    // Novo teste para clicar em "Novo cadastro"
    it('Deve abrir a página de novo cadastro de despesa', () => {
        ListagemContasAPagarPage.abrirNovoCadastro();
      });

});
