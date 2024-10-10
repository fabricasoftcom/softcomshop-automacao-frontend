const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
    defaultCommandTimeout: 25000,
    specPattern: '**/*.spec.js',
    baseUrl: 'https://automacaobilbo.softcomshop.com.br',
  },
});
