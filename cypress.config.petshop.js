const { defineConfig } = require("cypress");
const configPadrao = require('./cypress.config.js');

module.exports = defineConfig({
  e2e: {
    // Herda configurações base do padrão (exceto specPattern)
    baseUrl: 'https://automacaopetshop.meusoftcom.com.br',
    defaultCommandTimeout: configPadrao.e2e.defaultCommandTimeout,
    viewportWidth: configPadrao.e2e.viewportWidth,
    viewportHeight: configPadrao.e2e.viewportHeight,
    testIsolation: configPadrao.e2e.testIsolation,
    experimentalStudio: configPadrao.e2e.experimentalStudio,
    video: configPadrao.e2e.video,
    numTestsKeptInMemory: configPadrao.e2e.numTestsKeptInMemory,

    // Isola execução apenas para a pasta petshop
    specPattern: 'cypress/e2e/petshop/**/*.spec.js',

    setupNodeEvents(on, config) {
      // Reutiliza os plugins e tasks já configurados
      return configPadrao.e2e.setupNodeEvents(on, config);
    },

    // Adiciona variável de ambiente de segmento
    env: {
      ...(configPadrao.e2e.env || {}),
      segmento: 'petshop',
      tags: '@petshop'
    }
  },
});

