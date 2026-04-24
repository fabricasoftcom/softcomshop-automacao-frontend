/**
 * Relatório Fiscal Saída Analítico — E2E Cypress.
 *
 * Exploração autônoma (ADR-0016 / architeture.mdc): o Cypress não executa o MCP do Cursor.
 * Antes de alterar locators, rota ou fluxo deste spec, use o servidor MCP **cursor-ide-browser**
 * no Cursor IDE (browser_navigate → browser_snapshot, com sessão autenticada no mesmo baseUrl
 * de cypress.config.js) ou o checklist em docs/referencias/template-exploracao-autonoma.md.
 * Os passos abaixo reproduzem o caminho validado na aplicação (visit direto v2 + drawer).
 */
import RelatorioFiscalSaidaAnaliticoPage from "../../support/pages/relatorios/RelatorioFiscalSaidaAnaliticoPage";
import RelatorioFiscalSaidaAnaliticoLocators from "../../support/locators/Relatorios/RelatorioFiscalSaidaAnaliticoLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio Fiscal Saida Analitico', { tags: ['@relatorios', '@fiscal', '@saida-analitico', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioFiscalSaidaAnaliticoPage.acessarRelatorioFiscalSaidaAnalitico();
    RelatorioFiscalSaidaAnaliticoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Analitico', () => {
    RelatorioFiscalSaidaAnaliticoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio Fiscal Saida Analitico com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFiscalSaidaAnaliticoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput)
      .should('be.visible')
      .and(($el) => {
        expect(String($el.val() || '').trim().length).to.be.greaterThan(0);
      });

    RelatorioFiscalSaidaAnaliticoPage.pesquisar();
    RelatorioFiscalSaidaAnaliticoPage.validarTabelaComDados();
    cy.url().should('contain', '/relatorio-v2/fiscal-saida-analitico');
    cy.url().should('not.include', 'sintetico');
    cy.verificarErro500Visual();
  });
});
