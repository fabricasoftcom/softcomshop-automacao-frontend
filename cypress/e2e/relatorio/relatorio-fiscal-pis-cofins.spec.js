import RelatorioFiscalPisCofinsPage from "../../support/pages/relatorios/RelatorioFiscalPisCofinsPage";
import RelatorioFiscalPisCofinsLocators from "../../support/locators/Relatorios/RelatorioFiscalPisCofinsLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio Fiscal Pis/Cofins', { tags: ['@relatorios', '@fiscal', '@pis-cofins', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioFiscalPisCofinsPage.acessarRelatorioFiscalPisCofins();
    RelatorioFiscalPisCofinsPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio Fiscal Pis/Cofins', () => {
    RelatorioFiscalPisCofinsPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio Fiscal Pis/Cofins com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFiscalPisCofinsPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFiscalPisCofinsLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFiscalPisCofinsPage.pesquisar();
    cy.url().should('contain', '/relatorio/relatorio-fiscal-pis-cofins');
    cy.verificarErro500Visual();
  });
});

