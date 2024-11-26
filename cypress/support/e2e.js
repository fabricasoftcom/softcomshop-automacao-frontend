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

Cypress.on('uncaught:exception', (err) => {
  // Loga exceções específicas para depuração
  if (err.message.includes('Erro esperado específico')) {
    cy.log(`Exceção ignorada: ${err.message}`);
    return false; // Ignora o erro esperado
  }

  // Para outros erros, deixa o Cypress processar normalmente
  return true;
});

// Variáveis globais para rastrear erros
let testFailed = false;
let errorMessages = [];

// Antes de cada teste
beforeEach(() => {
  testFailed = false; // Reseta o estado de falha
  errorMessages = []; // Reseta as mensagens de erro

  // Intercepta requisições para monitorar falhas
  cy.intercept({ method: 'POST', url: '/api/**' }, (req) => {
    req.on('response', (res) => {
      if (res.statusCode >= 400) { // Captura erros 4xx e 5xx
        testFailed = true;
        const errorMessage = `Erro ${res.statusCode} detectado na URL: ${res.url}`;
        errorMessages.push(errorMessage);
        cy.log(errorMessage);
      }
    });
  });
});

// Após cada teste
afterEach(function () {
  if (testFailed) {
    // Lança erro detalhado para forçar falha no teste
    throw new Error(`Erros detectados durante o teste:\n${errorMessages.join('\n')}`);
  }
});
