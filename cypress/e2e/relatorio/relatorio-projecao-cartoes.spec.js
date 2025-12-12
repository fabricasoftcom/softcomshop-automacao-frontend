import RelatorioProjecaoCartoesPage from "../../support/pages/relatorios/RelatorioProjecaoCartoesPage";
import RelatorioProjecaoCartoesLocators from "../../support/locators/Relatorios/RelatorioProjecaoCartoesLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio de Projecao de Cartoes', { tags: ['@relatorios', '@financeiro', '@projecao-cartoes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioProjecaoCartoesPage.acessarRelatorioProjecaoCartoes();
    RelatorioProjecaoCartoesPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Projecao de Cartoes', () => {
    RelatorioProjecaoCartoesPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Projecao de Cartoes com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioProjecaoCartoesPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioProjecaoCartoesLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioProjecaoCartoesPage.pesquisar();
    cy.url().should('contain', '/relatorio/projecao-de-cartoes');
    cy.verificarErro500Visual();
  });
});

