import RelatorioCaixaPage from "../../support/pages/relatorios/RelatorioCaixaPage";
// import RelatorioCaixaLocators from "../../support/locators/Relatorios/RelatorioCaixaLocators";
// import RelatoriosDrawerLocators from "../../support/locators/Relatorios/RelatoriosDrawerLocators";

describe('Relatorio de Caixa', { tags: ['@relatorios', '@caixa', '@regressivo'] }, () => {
  describe('Acesso e Elementos Básicos', () => {

    beforeEach(() => {
      cy.loginArmazenandoSessao();
      cy.visit('/');
    });

    it('Deve acessar via /relatorio-v2 e exibir o drawer com Aplicar Filtros', () => {
      RelatorioCaixaPage.acessarRelatorioCaixa();
      RelatorioCaixaPage.validarElementosBasicos();
    });

    it('Deve acessar via /relatorios-gerais e exibir o painel com Pesquisar', () => {
      RelatorioCaixaPage.acessarRelatorioCaixaViaRelatoriosGerais();
      RelatorioCaixaPage.validarElementosBasicosViaRelatoriosGerais();
    });
  });

  describe('Pesquisa e Validações Focadas (Acesso Direto)', () => {
    beforeEach(() => {
      cy.loginArmazenandoSessao();
      cy.visit('/');
      RelatorioCaixaPage.acessarRelatorioCaixa();
    });

    it('Cenário 1 (Fluxo Principal): Deve pesquisar no modo Sintético (Hoje) e exibir tabela e botões de exportação', () => {
      RelatorioCaixaPage.selecionarPeriodoRapido('hoje');
      RelatorioCaixaPage.selecionarTipo('sintetico');
      RelatorioCaixaPage.pesquisar();

      cy.verificarErro500Visual();
      RelatorioCaixaPage.validarKpisEAcordeonsEFiltrosAtivos();
      RelatorioCaixaPage.validarBotoesExportacao();
    });

    it('Cenário 2 (Filtros Complementares): Deve pesquisar no modo Analítico (Ontem) com filtros extras', () => {
      RelatorioCaixaPage.selecionarPeriodoRapido('ontem');
      RelatorioCaixaPage.selecionarTipo('analitico');
      // RelatorioCaixaPage.preencherTurno('1');
      // RelatorioCaixaPage.preencherVendedor('a');
      RelatorioCaixaPage.pesquisar();

      cy.verificarErro500Visual();
      RelatorioCaixaPage.validarAcordeonVendasPorPedidoDetalhamentoComVendas();
    });

    it('Cenário 3 (Edge Case): Deve pesquisar no modo Consolidado sem turno e exibir totalizadores', () => {
      RelatorioCaixaPage.selecionarPeriodoRapido('hoje');
      RelatorioCaixaPage.selecionarTipo('consolidado');
      RelatorioCaixaPage.limparTurno();
      RelatorioCaixaPage.pesquisar();

      cy.verificarErro500Visual();
      RelatorioCaixaPage.validarAcordeonsConsolidadosFormaPagamentoECartao();
    });
  });
});
