import contaCadastroPage from "../../support/pages/Financeiro/ContaCadastroPage";

describe('Cadastro de Contas', () => {
  beforeEach(() => {
    // Acessa a página de cadastro antes de cada teste
    cy.login();
    contaCadastroPage.visit();
  });

  it('Deve selecionar a Conta Corrente', () => {
    contaCadastroPage.selecionarTipoConta('Conta Corrente');
    cy.url().should('include', '/conta-corrente');
  });

  it('Deve selecionar a Caixinha', () => {
    contaCadastroPage.selecionarTipoConta('Caixinha');
    cy.url().should('include', '/caixinha');
  });

  it('Deve retornar à listagem ao clicar em Voltar', () => {
    contaCadastroPage.voltarParaListagem();
    cy.url().should('include', '/integracao-bancaria/conta');
  });
});