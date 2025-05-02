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
    defaultCommandTimeout: 70000,
    specPattern: [
      // "./cypress/e2e/setup/_beforeConfigPadrao.spec.js",
      // debounce-autocomplete
      "./cypress/e2e/debounce-autocomplete/debounce-autocomplete.spec.js",
      // login
      "./cypress/e2e/login/login.spec.js",
      // menu lateral
      "./cypress/e2e/menulateral/menuLateralTeste.spec.js",
      // relatorio
      "./cypress/e2e/relatorio/relatorios.spec.js",
      // compra
      "./cypress/e2e/compras/cadastro-compra.spec.js",
      "./cypress/e2e/compras/cadastro-fornecedor.spec.js",
      // produto
      "./cypress/e2e/cadastro-produto/cadastro-produto.spec.js",
      // vinculo fiscal
      "./cypress/e2e/vinculo-fiscal/novocadastrovinculofiscal.spec.js",
      "./cypress/e2e/vinculo-fiscal/vinculo-fiscal-listagem.spec.js",
      // clientes
      "./cypress/e2e/cadastro-clientes/cadastro-cliente.spec.js",
      // balanco
      "./cypress/e2e/Balanco/balanco.spec.js",
      "./cypress/e2e/Balanco/reverterBalanco.spec.js",
      // orcamento
      "./cypress/e2e/orcamento/orcamento-cadastro.spec.js",
      "./cypress/e2e/orcamento/orcamento-listagem.spec.js",
      // contas a receber
      "./cypress/e2e/financeiro/novaReceita.spec.js",
      "./cypress/e2e/financeiro/editarReceita.spec.js",
      "./cypress/e2e/financeiro/recebimento.spec.js",
      "./cypress/e2e/financeiro/listagem-contas-a-receber.spec.js",
      // contas a pagar
      "./cypress/e2e/financeiro/novaDespesa.spec.js",
      "./cypress/e2e/financeiro/editarDespesa.spec.js",
      "./cypress/e2e/financeiro/baixar-despesa.spec.js",
      "./cypress/e2e/financeiro/listagem-contas-a-pagar.spec.js",
      // conta
      "./cypress/e2e/financeiro/cadastro-conta-corrente.spec.js",
      "./cypress/e2e/financeiro/cadastro-conta.spec.js",
      "./cypress/e2e/financeiro/edicao-conta-corrente.spec.js",
      "./cypress/e2e/financeiro/listagem-conta.spec.js",
      // vendas
      "./cypress/e2e/venda-nfce/venda-nfce.spec.js",
      // petshop
      "./cypress/e2e/painel-atendimento/painel-atendimento.spec.js",
      // "./cypress/e2e/**/*.{feature,cy.js}",
      // "**/*.spec.js"
    ],
    testIsolation: false,
    baseUrl: 'https://stage-hotfix-1.softcomshop.com.br',
    viewportWidth: 1366,
    viewportHeight: 768,
    // retries: {
    //   runMode: 1, // Número de tentativas em modo de execução
    //   openMode: 0 // Número de tentativas em modo interativo
    // }
    experimentalStudio: true,
  },
});
