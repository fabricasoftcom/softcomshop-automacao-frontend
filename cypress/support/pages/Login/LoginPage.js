import LoginLocators from "../../locators/Login/LoginLocators";

class LoginPage {
    visit() {
      cy.visit('/auth/logout');
      cy.url().should('include', '/auth/login');
      cy.get('body').should('be.visible');
      // cy.visit('/');
    }

    preencherCredenciais(username, password) {
      cy.percySnapshot();
      cy.get(LoginLocators.usernameInput).clear().type(username);
      cy.get(LoginLocators.passwordInput).clear().type(password);
    }

    clicarLogin() {
      cy.get(LoginLocators.loginButton).click();
    }

    mensagemErro() {
      return cy.get(LoginLocators.errorMessage);
    }
  }

export default new LoginPage();
