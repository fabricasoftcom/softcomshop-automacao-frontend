import RelatorioMaisVendidosPage from "../../support/pages/relatorios/RelatorioMaisVendidosPage";
import RelatorioMaisVendidosLocators from "../../support/locators/Relatorios/RelatorioMaisVendidosLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Mais Vendidos', { tags: ['@relatorios', '@vendas', '@mais-vendidos', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioMaisVendidosPage.acessarRelatorioMaisVendidos();
    RelatorioMaisVendidosPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Mais Vendidos', () => {
    RelatorioMaisVendidosPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Mais Vendidos com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioMaisVendidosPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioMaisVendidosLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioMaisVendidosPage.pesquisar();
    cy.url().should('contain', '/relatorio/mais-vendidos');
    cy.verificarErro500Visual();
  });
});

