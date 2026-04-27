const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  projectId: "s91p5k",
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

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Desativa GPU se estiver sentindo lentidão visual no Chrome
          launchOptions.args.push('--disable-gpu');

          // Força gerenciamento de memória mais agressivo
          launchOptions.args.push('--js-flags=--max-old-space-size=4096');
        }
        return launchOptions;
      });

      return config;
    },
    env: {
      grepFilterSpecs: true
    },
    defaultCommandTimeout: 15000,
    specPattern: [
      "./cypress/e2e/setup/_beforeConfigPadrao.spec.js",
      // debounce-autocomplete (arquivo removido/não existe)
      "./cypress/e2e/debounce-autocomplete/debounce-autocomplete.spec.js",
      // login
      "./cypress/e2e/login/login.spec.js",
      // menu lateral
      "./cypress/e2e/menulateral/menuLateralTeste.spec.js",
      // ta em ordem
      "./cypress/e2e/ta-em-ordem.spec.js",
      // relatorio
      "./cypress/e2e/relatorio/relatorios.spec.js",
      "./cypress/e2e/relatorio/relatorio-caixa.spec.js",
      // relatorios vendas
      "./cypress/e2e/relatorio/relatorio-periodo.spec.js",
      "./cypress/e2e/relatorio/relatorio-mais-vendidos.spec.js",
      "./cypress/e2e/relatorio/relatorio-forma-pagamento.spec.js",
      "./cypress/e2e/relatorio/relatorio-gerente-vendas.spec.js",
      "./cypress/e2e/relatorio/relatorio-evolucao.spec.js",
      "./cypress/e2e/relatorio/relatorio-comissao.spec.js",
      // relatorios fiscal
      "./cypress/e2e/relatorio/relatorio-fiscal-saida-analitico.spec.js",
      "./cypress/e2e/relatorio/relatorio-fiscal-saida-sintetico.spec.js",
      "./cypress/e2e/relatorio/relatorio-fiscal-entrada-analitico.spec.js",
      "./cypress/e2e/relatorio/relatorio-fiscal-entrada-sintetico.spec.js",
      "./cypress/e2e/relatorio/relatorio-fiscal-pis-cofins.spec.js",
      "./cypress/e2e/relatorio/relatorio-nfse.spec.js",
      // relatorios financeiro
      "./cypress/e2e/relatorio/relatorio-contas-receber.spec.js",
      "./cypress/e2e/relatorio/relatorio-contas-pagar.spec.js",
      "./cypress/e2e/relatorio/relatorio-projecao-cartoes.spec.js",
      // relatorios produtos
      "./cypress/e2e/relatorio/relatorio-exibir-estoque.spec.js",
      "./cypress/e2e/relatorio/relatorio-tabela-preco.spec.js",
      "./cypress/e2e/relatorio/relatorio-ficha-estoque.spec.js",
      "./cypress/e2e/relatorio/relatorio-inventario.spec.js",
      "./cypress/e2e/relatorio/relatorio-ncm.spec.js",
      "./cypress/e2e/relatorio/relatorio-movimentacao-estoque.spec.js",
      // relatorios clientes
      "./cypress/e2e/relatorio/relatorio-aniversariantes.spec.js",
      "./cypress/e2e/relatorio/relatorio-listagem-clientes.spec.js",
      "./cypress/e2e/relatorio/relatorio-ultimas-compras.spec.js",
      // compra
      "./cypress/e2e/compras/cadastro-compra-xml.spec.js",
      "./cypress/e2e/compras/cadastro-compra-manual.spec.js",
      "./cypress/e2e/compras/cadastro-fornecedor.spec.js",
      // compras e estoque
      "./cypress/e2e/compras/listagem-movimentacoes.spec.js",
      "./cypress/e2e/compras/cadastro-movimentacoes.spec.js",
      "./cypress/e2e/compras/importacao-compra-nuvem-fiscal.spec.js",
      "./cypress/e2e/compras/ordem-fornecimento.spec.js",
      // incidentes (regressão por bugs corrigidos — ver ai-reports/incidents-analysis.md)
      "./cypress/e2e/incidentes/ComprasEestoqueNuvemFiscal.spec.js",
      "./cypress/e2e/incidentes/ComprasImportarNFe.spec.js",
      "./cypress/e2e/incidentes/ImportacaoNfCompra.spec.js",
      "./cypress/e2e/incidentes/FinanceiroRecebimentoModal.spec.js",
      "./cypress/e2e/incidentes/RelatoriosCaixa.spec.js",
      "./cypress/e2e/incidentes/85857-NFeFCPSTDuplicidade.spec.js",
      // producao
      "./cypress/e2e/producao/producao-listagem.spec.js",
      "./cypress/e2e/producao/cadastro-producao.spec.js",
      // servicos
      "./cypress/e2e/servicos/servico.spec.js",
      "./cypress/e2e/servicos/vinculo-fiscal-servico.spec.js",
      "./cypress/e2e/contratos/cadastro-modelos.spec.js", // Contratos agrupado próximo de serviços
      // produto
      "./cypress/e2e/cadastro-produto/cadastro-produto.spec.js",
      "./cypress/e2e/produtos/atributos.spec.js",
      "./cypress/e2e/produtos/grupos.spec.js",
      "./cypress/e2e/produtos/listagem-produtos.spec.js",
      "./cypress/e2e/produtos/gestor-promocoes-listagem.spec.js",
      "./cypress/e2e/produtos/gestor-promocoes.spec.js",
      "./cypress/e2e/produtos/gestor-precos-listagem.spec.js",
      "./cypress/e2e/produtos/gestor-precos.spec.js",
      "./cypress/e2e/produto/pesquisa-preco.spec.js",
      "./cypress/e2e/produtos/atualizar-dados-fiscais.spec.js",
      // estoque
      "./cypress/e2e/estoque/gestao-estoque.spec.js",
      "./cypress/e2e/estoque/dashboard-estoque.spec.js",
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
      "./cypress/e2e/financeiro/transferencia-contas.spec.js",
      "./cypress/e2e/financeiro/lancamento-conta.spec.js",
      "./cypress/e2e/financeiro/recibo.spec.js",
      "./cypress/e2e/financeiro/meu-lucro.spec.js",
      "./cypress/e2e/financeiro/fluxo-caixa.spec.js",
      "./cypress/e2e/financeiro/dre.spec.js",
      "./cypress/e2e/financeiro/extrato.spec.js",
      // categorias
      "./cypress/e2e/financeiro/listagem-categorias.spec.js",
      "./cypress/e2e/financeiro/cadastro-categoria.spec.js",
      // vendas
      "./cypress/e2e/vendas/cadastro-venda.spec.js",
      "./cypress/e2e/vendas/listagem-vendas.spec.js",
      "./cypress/e2e/venda-nfcenfe/venda-nfce.spec.js",
      "./cypress/e2e/venda-nfcenfe/venda-nfe.spec.js",
      "./cypress/e2e/venda-nfcenfe/venda-nfse.spec.js",
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
      // consignacao
      "./cypress/e2e/consignacao/requisicao-consignacao-listagem.spec.js",
      "./cypress/e2e/consignacao/requisicao-consignacao-cadastro.spec.js",
      "./cypress/e2e/consignacao/devolucao-consignacao-listagem.spec.js",
      "./cypress/e2e/consignacao/devolucao-consignacao-cadastro.spec.js",
      "./cypress/e2e/consignacao/consignacao-extrato.spec.js",
      // sped
      "./cypress/e2e/sped/gerarArquivo.spec.js",
      "./cypress/e2e/sped/plano-contas-sped.spec.js",
      "./cypress/e2e/sped/sped-configuracoes.spec.js",
      "./cypress/e2e/sped/valores-declaratorios.spec.js",
      "./cypress/e2e/sped/sped-inventario.spec.js",
      "./cypress/e2e/sped/sped-icms-ajuste.spec.js",
      "./cypress/e2e/sped/sped-ipi-ajuste.spec.js",
      // nfce
      "./cypress/e2e/nfce/nfce-inutilizar.spec.js",
      "./cypress/e2e/nfce/nfce-download-xml.spec.js",
      "./cypress/e2e/nfce/nfce-configuracoes.spec.js",
      // nfe
      "./cypress/e2e/nfe/nfe-inutilizar.spec.js",
      "./cypress/e2e/nfe/nfe-download-xml.spec.js",
      "./cypress/e2e/nfe/nfe-configuracoes.spec.js",
      // sintegra
      "./cypress/e2e/sintegra/gerarArquivo.spec.js",
      // configuracao (venda mais - mensagem)
      "./cypress/e2e/configuracao/cadastro-mensagem.spec.js",
      // configuracoes
      "./cypress/e2e/configuracoes/empresa-listagem.spec.js",
      "./cypress/e2e/configuracoes/empresa-cadastro.spec.js",
      "./cypress/e2e/configuracoes/funcionario-listagem.spec.js",
      "./cypress/e2e/configuracoes/funcionario-cadastro.spec.js",
      "./cypress/e2e/configuracoes/usuario-listagem.spec.js",
      "./cypress/e2e/configuracoes/usuario-cadastro.spec.js",
      "./cypress/e2e/configuracoes/justificativa-listagem.spec.js",
      "./cypress/e2e/configuracoes/justificativa-cadastro.spec.js",
      "./cypress/e2e/configuracoes/forma-pagamento-listagem.spec.js",
      "./cypress/e2e/configuracoes/forma-pagamento-cadastro.spec.js",
      "./cypress/e2e/configuracoes/cartao-listagem.spec.js",
      "./cypress/e2e/configuracoes/cartao-cadastro.spec.js",
      "./cypress/e2e/configuracoes/sincronizacao.spec.js",
      "./cypress/e2e/configuracoes/perfil-acesso.spec.js",
      "./cypress/e2e/configuracoes/perfil-acesso-cadastro.spec.js",
      "./cypress/e2e/configuracoes/cadastro-contador.spec.js",
      // "./cypress/e2e/**/*.{feature,cy.js}",
      // "**/*.spec.js"
    ],
    testIsolation: true,
    baseUrl: 'https://stage-hotfix-2.softcomshop.com.br',
    // baseUrl: 'https://stage-release-2.softcomshop.com.br',
    // baseUrl: 'https://automacaosoftcomshopaws.meusoftcom.com.br',
    //  baseUrl: 'https://squad-cloud.softcomshop.com.br',
    viewportWidth: 1366,
    viewportHeight: 768,
    experimentalStudio: true,
    video: false,
    numTestsKeptInMemory: 5,
  },
});
