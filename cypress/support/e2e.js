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

const registerCypressGrep = require('@cypress/grep')
registerCypressGrep()

Cypress.on('uncaught:exception', (err) => {
  // Captura exceções não tratadas que possam ocorrer durante a execução de testes.
  if (err.message.includes('Erro esperado específico')) {
    cy.log(`Exceção ignorada: ${err.message}`);
    return false; // Ignora o erro esperado
  }
  // Ignora erros relacionados a focus em elementos undefined (comum após salvamento de formulários)
  if (err.message.includes('Cannot read properties of undefined') &&
    (err.message.includes('focus') || err.message.includes('Focus'))) {
    cy.log(`Exceção de focus ignorada: ${err.message}`);
    return false; // Ignora o erro de focus
  }
  // Ignora erros relacionados a propriedades de null (comum quando a aplicação tenta definir valores em elementos que ainda não foram renderizados)
  if (err.message.includes('Cannot set properties of null') &&
    err.message.includes('value')) {
    cy.log(`Exceção de propriedade null ignorada: ${err.message}`);
    return false; // Ignora o erro de propriedade null
  }
  // Ignora erros relacionados a leitura de propriedades de null (comum em formulários de funcionário)
  if (err.message.includes('Cannot read properties of null') &&
    (err.message.includes('checked') || err.message.includes('value'))) {
    cy.log(`Exceção de leitura null ignorada: ${err.message}`);
    return false; // Ignora o erro de leitura null
  }
  // Ignora erros relacionados a rotas da aplicação (URIError: Failed to decode param)
  if (err.message.includes('Failed to decode param') ||
      err.message.includes('usuario-perfil') ||
      (err.name === 'URIError' && err.message.includes('decode'))) {
    console.log(`Exceção de rota ignorada: ${err.message}`);
    return false; // Ignora o erro de rota
  }
  // Ignora erros de script cross-origin (comum em algumas aplicações)
  if (err.message.includes('Script error') && err.message.includes('cross origin')) {
    console.log(`Exceção de script cross-origin ignorada: ${err.message}`);
    return false; // Ignora o erro de script cross-origin
  }
  // Para outros erros, permite que o Cypress processe normalmente
  return true;
});

// Variáveis globais para rastrear erros
let testFailed = false;
let errorMessages = [];

// Antes de cada teste
beforeEach(() => {
  testFailed = false; // Reseta o estado de falha
  errorMessages = []; // Reseta as mensagens de erro

  // Intercepta todas as requisições POST que podem resultar em erro 500
  cy.intercept('POST', '/nfe-nfce/vinculos-fiscais/**', (req) => {
    req.on('response', (res) => {
      if (res.statusCode === 500) { // Captura erro 500
        testFailed = true;
        const errorMessage = `Erro 500 detectado na URL: ${res.url}`;
        errorMessages.push(errorMessage);
        cy.log(errorMessage); // Loga no console
      }
    });
  });

  // Captura erro 500 na página HTML
  cy.on('window:load', () => {
    cy.get('body').then(($body) => {
      // Verifica se o conteúdo da página contém a mensagem de erro 500
      if ($body.text().includes('Oops! Parece que algo deu errado.') || $body.find('.code').text().includes('500')) {
        testFailed = true;
        const errorMessage = 'Erro 500 detectado na interface da página (Server Error)';
        errorMessages.push(errorMessage);
        cy.log(errorMessage); // Loga no console
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
