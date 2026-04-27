import LoginPage from "../../support/pages/Login/LoginPage";

describe('Login com credenciais validas', { tags: ['@login', '@regressivo'] }, () => {
  it('Login deve ser realizado com sucesso usando credenciais validas', () => {
    LoginPage.visit();
    LoginPage.preencherCredenciais(Cypress.env('username'), Cypress.env('password'));
    LoginPage.clicarLogin();
    // cy.get('.cont-grid-empresa > :contains("demais testes")').click();
    cy.url().then((url) => {
      expect(url.includes('/home') || url.includes('/acesso-rapido')).to.be.true;
    });
  })
})

describe('Login com credenciais invalidas', () => {
  it('Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas', () => {

  });
});
