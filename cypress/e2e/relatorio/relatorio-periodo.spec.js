import RelatorioPeriodoPage from "../../support/pages/relatorios/RelatorioPeriodoPage";
import RelatorioPeriodoLocators from "../../support/locators/Relatorios/RelatorioPeriodoLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Periodo', { tags: ['@relatorios', '@vendas', '@periodo', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioPeriodoPage.acessarRelatorioPeriodo();
    RelatorioPeriodoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Periodo', () => {
    RelatorioPeriodoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Periodo com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioPeriodoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioPeriodoPage.pesquisar();
    cy.url().should('contain', '/relatorio/periodo');
    cy.verificarErro500Visual();
  });
});

