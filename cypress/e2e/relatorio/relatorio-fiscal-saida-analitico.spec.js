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
    cy.get(RelatorioFiscalSaidaAnaliticoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFiscalSaidaAnaliticoPage.pesquisar();
    cy.url().should('contain', '/relatorio/relatorio-fiscal');
    cy.verificarErro500Visual();
  });
});

