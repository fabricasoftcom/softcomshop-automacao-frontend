import RelatorioFiscalEntradaSinteticoPage from "../../support/pages/relatorios/RelatorioFiscalEntradaSinteticoPage";
import RelatorioFiscalEntradaSinteticoLocators from "../../support/locators/Relatorios/RelatorioFiscalEntradaSinteticoLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio Fiscal Entrada Sintetico', { tags: ['@relatorios', '@fiscal', '@entrada-sintetico', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioFiscalEntradaSinteticoPage.acessarRelatorioFiscalEntradaSintetico();
    RelatorioFiscalEntradaSinteticoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Sintetico', () => {
    RelatorioFiscalEntradaSinteticoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio Fiscal Entrada Sintetico com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFiscalEntradaSinteticoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFiscalEntradaSinteticoLocators.periodoInput)
      .should('be.visible')
      .and(($el) => {
        expect(String($el.val() || '').trim().length).to.be.greaterThan(0);
      });

    RelatorioFiscalEntradaSinteticoPage.pesquisar();
    cy.url().should('contain', '/relatorio-v2/fiscal-entrada-sintetico');
    cy.verificarErro500Visual();
  });
});
