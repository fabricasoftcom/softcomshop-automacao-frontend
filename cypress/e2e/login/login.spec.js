import LoginPage from "../../support/pages/Login/LoginPage";

describe('Login com credenciais validas', { tags: ['@login', '@regressivo'] }, () => {
  it.only('Login deve ser realizado com sucesso usando credenciais validas', () => {
    LoginPage.visit();
    cy.fixture('users').then((user) => {
      LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
    });

    LoginPage.clicarLogin();
    // cy.get('.cont-grid-empresa > :contains("demais testes")').click();
    cy.url().should('include', '/home');
  })
})

describe('Login com credenciais invalidas', () => {
  it('Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas', () => {

  });
});
