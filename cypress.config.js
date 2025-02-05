const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      require('@cypress/grep/src/plugin')(config)
      return config;
    },
    env: {
      grepFilterSpecs: true
    },
    defaultCommandTimeout: 25000,
    specPattern:[
       "./cypress/e2e/setup/_beforeConfigPadrao.spec.js",
       "./cypress/e2e/financeiro/novaReceita.spec.js",
       "./cypress/e2e/financeiro/novaDespesa.spec.js",
      // "./cypress/e2e/**/*.{feature,cy.js}",
      "**/*.spec.js"
    ],
    testIsolation: false,
    baseUrl: 'https://stage-hotfix-3.softcomshop.com.br',
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: {
      runMode: 1, // Número de tentativas em modo de execução
      openMode: 0 // Número de tentativas em modo interativo
    }
  },
});
