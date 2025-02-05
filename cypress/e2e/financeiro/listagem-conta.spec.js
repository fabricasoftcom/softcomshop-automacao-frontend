import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";

describe('Testes de Listagem de Contas', { tags: ['@listagem-conta', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginFinanceiro();
    ListagemContasPage.visit();
  });

it('Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro', () => {
    // Clicar no botão de novo cadastro
    ListagemContasPage.clicarNovoCadastro();

    // Validar que foi redirecionado para a página de cadastro
    ListagemContasPage.verificarPaginaCadastro();
  });
});
