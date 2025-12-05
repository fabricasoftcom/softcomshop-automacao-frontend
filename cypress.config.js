const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      require('@cypress/grep/src/plugin')(config)

      // Task para listar arquivos XML da pasta comprasxml
      on('task', {
        listarXMLs({ usarApenasSemFaturas = false } = {}) {
          const basePath = path.join(__dirname, 'cypress', 'fixtures', 'comprasxml');
          const xmlPath = usarApenasSemFaturas
            ? path.join(basePath, 'xmlSemFaturas')
            : basePath;

          try {
            const arquivos = fs.readdirSync(xmlPath);
            const xmls = arquivos.filter(arquivo => arquivo.endsWith('.xml'));
            return xmls;
          } catch (error) {
            log('Erro ao listar XMLs:', error);
            return [];
          }
        }
      });

      return config;
    },
    env: {
      grepFilterSpecs: true
    },
    defaultCommandTimeout: 50000,
    specPattern: [
      "./cypress/e2e/setup/_beforeConfigPadrao.spec.js",
      // debounce-autocomplete (arquivo removido/não existe)
      // "./cypress/e2e/debounce-autocomplete/debounce-autocomplete.spec.js",
      // login
      "./cypress/e2e/login/login.spec.js",
      // menu lateral
      "./cypress/e2e/menulateral/menuLateralTeste.spec.js",
      // relatorio
      "./cypress/e2e/relatorio/relatorios.spec.js",
      "./cypress/e2e/relatorio/relatorio-caixa.spec.js",
      // compra
      "./cypress/e2e/compras/cadastro-compra-xml.spec.js",
      "./cypress/e2e/compras/cadastro-compra-manual.spec.js",
      "./cypress/e2e/compras/cadastro-fornecedor.spec.js",
      // compras e estoque
      "./cypress/e2e/compras/listagem-movimentacoes.spec.js",
      "./cypress/e2e/compras/cadastro-movimentacoes.spec.js",
      "./cypress/e2e/compras/importacao-compra-nuvem-fiscal.spec.js",
      // producao
      "./cypress/e2e/producao/producao-listagem.spec.js",
      "./cypress/e2e/producao/cadastro-producao.spec.js",
      // produto
      "./cypress/e2e/cadastro-produto/cadastro-produto.spec.js",
      "./cypress/e2e/produtos/atributos.spec.js",
      "./cypress/e2e/produtos/grupos.spec.js",
      "./cypress/e2e/produtos/listagem-produtos.spec.js",
      "./cypress/e2e/produtos/gestor-promocoes-listagem.spec.js",
      "./cypress/e2e/produtos/gestor-promocoes.spec.js",
      // vinculo fiscal
      "./cypress/e2e/vinculo-fiscal/novocadastrovinculofiscal.spec.js",
      "./cypress/e2e/vinculo-fiscal/vinculo-fiscal-listagem.spec.js",
      // clientes
      "./cypress/e2e/cadastro-clientes/cadastro-cliente.spec.js",
      "./cypress/e2e/cadastro-clientes/listagem-clientes.spec.js",
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
      "./cypress/e2e/vendas/cadastro-venda.spec.js",
      "./cypress/e2e/vendas/listagem-vendas.spec.js",
      "./cypress/e2e/venda-nfcenfe/venda-nfce.spec.js",
      "./cypress/e2e/venda-nfcenfe/venda-nfe.spec.js",
      "./cypress/e2e/venda-nfcenfe/cadastro-nfe.spec.js",
      "./cypress/e2e/venda-nfcenfe/cadastro-nfe-normal.spec.js",
      "./cypress/e2e/venda-nfcenfe/cadastro-nfe-devolucao.spec.js",
      "./cypress/e2e/venda-nfcenfe/cadastro-nfe-ajuste.spec.js",
      "./cypress/e2e/venda-nfcenfe/cadastro-nfe-complementar.spec.js",
      "./cypress/e2e/venda-nfcenfe/cancelamento-nfe-normal.spec.js",
      "./cypress/e2e/venda-nfcenfe/cancelamento-nfe-devolucao.spec.js",
      "./cypress/e2e/venda-nfcenfe/cancelamento-nfe-ajuste.spec.js",
      "./cypress/e2e/venda-nfcenfe/cancelamento-nfe-complementar.spec.js",
      "./cypress/e2e/venda-nfcenfe/carta-correcao-nfe-normal.spec.js",
      "./cypress/e2e/venda-nfcenfe/carta-correcao-nfe-devolucao.spec.js",
      "./cypress/e2e/venda-nfcenfe/carta-correcao-nfe-ajuste.spec.js",
      "./cypress/e2e/venda-nfcenfe/carta-correcao-nfe-complementar.spec.js",
      "./cypress/e2e/venda-nfcenfe/listagem-nfe.spec.js",
      // sped
      "./cypress/e2e/sped/gerarArquivo.spec.js",
      // sintegra
      "./cypress/e2e/sintegra/gerarArquivo.spec.js",
      // petshop
      // "./cypress/e2e/painel-atendimento/painel-atendimento.spec.js",
      // "./cypress/e2e/**/*.{feature,cy.js}",
      // "**/*.spec.js"
    ],
    testIsolation: false,
    baseUrl: 'https://stage-hotfix.softcomshop.com.br',
    // baseUrl: 'https://automacaosoftcomshopaws.meusoftcom.com.br',
    //  baseUrl: 'https://squad-cloud.softcomshop.com.br',
    viewportWidth: 1366,
    viewportHeight: 768,

    experimentalStudio: true,
  },
});
