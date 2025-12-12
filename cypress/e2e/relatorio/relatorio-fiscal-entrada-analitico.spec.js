import RelatorioFiscalEntradaAnaliticoPage from "../../support/pages/relatorios/RelatorioFiscalEntradaAnaliticoPage";
import RelatorioFiscalEntradaAnaliticoLocators from "../../support/locators/Relatorios/RelatorioFiscalEntradaAnaliticoLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio Fiscal Entrada Analitico', { tags: ['@relatorios', '@fiscal', '@entrada-analitico', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioFiscalEntradaAnaliticoPage.acessarRelatorioFiscalEntradaAnalitico();
    RelatorioFiscalEntradaAnaliticoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Entrada Analitico', () => {
    RelatorioFiscalEntradaAnaliticoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio Fiscal Entrada Analitico com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFiscalEntradaAnaliticoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFiscalEntradaAnaliticoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFiscalEntradaAnaliticoPage.pesquisar();
    cy.url().should('contain', '/relatorio/relatorio-fiscal-entrada');
    cy.verificarErro500Visual();
  });
});

