import RelatorioGerenteVendasPage from "../../support/pages/relatorios/RelatorioGerenteVendasPage";
import RelatorioGerenteVendasLocators from "../../support/locators/Relatorios/RelatorioGerenteVendasLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Gerente de Vendas', { tags: ['@relatorios', '@vendas', '@gerente-vendas', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioGerenteVendasPage.acessarRelatorioGerenteVendas();
    RelatorioGerenteVendasPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Gerente de Vendas', () => {
    RelatorioGerenteVendasPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Gerente de Vendas com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioGerenteVendasPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioGerenteVendasLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioGerenteVendasPage.pesquisar();
    cy.url().should('contain', '/relatorio/gerente-vendas');
    cy.verificarErro500Visual();
  });
});

