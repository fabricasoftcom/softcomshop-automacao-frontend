import LoginPage from "../../support/pages/Login/LoginPage";
import 'allure-cypress';

describe('Login com credenciais validas', () => {
  it('Login deve ser realizado com sucesso usando credenciais validas', () => {
    LoginPage.visit();
    cy.fixture('users').then((user) => {
      LoginPage.preencherCredenciais(user.valid.username, user.valid.password);
    });

    LoginPage.clicarLogin();
    cy.url().should('include', '/home');
  })
})

describe('Login com credenciais invalidas', () => {
  it('Login não deve ser realizado e deve ser apresentado uma mensagem informando que as credenciais são inválidas', () => {

  });
});
