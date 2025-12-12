import RelatorioContasPagarPage from "../../support/pages/relatorios/RelatorioContasPagarPage";
import RelatorioContasPagarLocators from "../../support/locators/Relatorios/RelatorioContasPagarLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio de Contas a Pagar', { tags: ['@relatorios', '@financeiro', '@contas-pagar', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioContasPagarPage.acessarRelatorioContasPagar();
    RelatorioContasPagarPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Pagar', () => {
    RelatorioContasPagarPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Contas a Pagar com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioContasPagarPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioContasPagarLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioContasPagarPage.pesquisar();
    cy.url().should('contain', '/relatorio/contas-a-pagar');
    cy.verificarErro500Visual();
  });
});

