import LoginLocators from "../../locators/LoginLocators";


class LoginPage {
    visit() {
      cy.visit('/auth/login');
    }
  
    preencherCredenciais(username, password) {
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
  