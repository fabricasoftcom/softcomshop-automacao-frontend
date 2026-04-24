/**
 * Relatório Fiscal Saída Sintético — E2E Cypress.
 *
 * Exploração autônoma (ADR-0016 / architeture.mdc): o Cypress não executa o MCP do Cursor.
 * Antes de alterar locators, rota ou fluxo deste spec, use o servidor MCP **cursor-ide-browser**
 * no Cursor IDE (browser_navigate → browser_snapshot, com sessão autenticada no mesmo baseUrl
 * de cypress.config.js) ou o checklist em docs/referencias/template-exploracao-autonoma.md.
 * Os passos abaixo reproduzem o caminho validado na aplicação (visit direto v2 + drawer).
 */
import RelatorioFiscalSaidaSinteticoPage from "../../support/pages/relatorios/RelatorioFiscalSaidaSinteticoPage";
import RelatorioFiscalSaidaSinteticoLocators from "../../support/locators/Relatorios/RelatorioFiscalSaidaSinteticoLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio Fiscal Saida Sintetico', { tags: ['@relatorios', '@fiscal', '@saida-sintetico', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioFiscalSaidaSinteticoPage.acessarRelatorioFiscalSaidaSintetico();
    RelatorioFiscalSaidaSinteticoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Saida Sintetico', () => {
    RelatorioFiscalSaidaSinteticoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio Fiscal Saida Sintetico com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFiscalSaidaSinteticoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput)
      .should('be.visible')
      .and(($el) => {
        expect(String($el.val() || '').trim().length).to.be.greaterThan(0);
      });

    RelatorioFiscalSaidaSinteticoPage.pesquisar();
    RelatorioFiscalSaidaSinteticoPage.validarTabelaComDados();
    cy.url().should('contain', '/relatorio-v2/relatorio-fiscal-sintetico');
    cy.verificarErro500Visual();
  });
});
