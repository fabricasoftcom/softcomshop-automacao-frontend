// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'allure-cypress';
import 'cypress-xpath';
import '@percy/cypress';
import '@shelex/cypress-allure-plugin';
// Variáveis globais para rastrear erros
let testFailed = false;
let errorMessages = [];

// Antes de cada teste, intercepta as requisições
beforeEach(() => {
  testFailed = false; // Reseta o estado de falha
  errorMessages = []; // Reseta as mensagens de erro

  // Intercepta todas as requisições para monitorar respostas
  cy.intercept('**', (req) => {
    req.on('response', (res) => {
      if (res.statusCode === 500) {
        testFailed = true; // Marca que o teste falhou
        const errorMessage = `Erro 500 detectado na URL: ${res.url}`;
        errorMessages.push(errorMessage);
        cy.log(errorMessage);
      }
    });
  });
});

// Após cada teste, força o estado de falha se necessário
afterEach(function () {
  if (testFailed) {
    // Marca o teste explicitamente como "falhou"
    const errorDetail = errorMessages.join('\n');
    this.currentTest.state = 'failed';
    this.currentTest.err = new Error(`Erros detectados durante o teste:\n${errorDetail}`);
  }

  // Reseta os rastreadores de erros para o próximo teste
  testFailed = false;
  errorMessages = [];
});
