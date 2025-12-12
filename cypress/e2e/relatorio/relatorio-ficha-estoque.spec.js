import RelatorioFichaEstoquePage from "../../support/pages/relatorios/RelatorioFichaEstoquePage";
import RelatorioFichaEstoqueLocators from "../../support/locators/Relatorios/RelatorioFichaEstoqueLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio de Ficha Estoque', { tags: ['@relatorios', '@produtos', '@ficha-estoque', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioFichaEstoquePage.acessarRelatorioFichaEstoque();
    RelatorioFichaEstoquePage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Ficha Estoque', () => {
    RelatorioFichaEstoquePage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Ficha Estoque com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioFichaEstoquePage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFichaEstoqueLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFichaEstoquePage.pesquisar();
    cy.url().should('contain', '/relatorio/ficha-estoque');
    cy.verificarErro500Visual();
  });
});

