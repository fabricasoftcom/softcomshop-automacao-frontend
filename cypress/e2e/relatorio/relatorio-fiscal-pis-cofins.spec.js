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
    cy.get(RelatorioFiscalPisCofinsLocators.periodoInput)
      .should('be.visible')
      .and(($el) => {
        expect(String($el.val() || '').trim().length).to.be.greaterThan(0);
      });

    RelatorioFiscalPisCofinsPage.pesquisar();
    cy.url().should(
      'satisfy',
      (u) =>
        u.includes('/relatorio-v2/fiscal-pis-cofins') ||
        u.includes('/relatorio/relatorio-fiscal-pis-cofins'),
    );
    cy.verificarErro500Visual();
  });
});
