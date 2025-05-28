import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";

describe.skip('Testes de Listagem de Contas', { tags: ['@listagem-conta', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ListagemContasPage.visit();
  });

it.skip('Deve clicar no botão de novo cadastro e redirecionar para a página de cadastro', () => {
    // Clicar no botão de novo cadastro
    ListagemContasPage.clicarNovoCadastro();

    // Validar que foi redirecionado para a página de cadastro
    ListagemContasPage.verificarPaginaCadastro();
  });
});
