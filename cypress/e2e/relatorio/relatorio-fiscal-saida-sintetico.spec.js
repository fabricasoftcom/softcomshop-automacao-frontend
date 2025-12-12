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
    cy.get(RelatorioFiscalSaidaSinteticoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFiscalSaidaSinteticoPage.pesquisar();
    cy.url().should('contain', '/relatorio/relatorio-fiscal-sintetico');
    cy.verificarErro500Visual();
  });
});

