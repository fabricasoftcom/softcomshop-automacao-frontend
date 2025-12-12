import RelatorioComissaoPage from "../../support/pages/relatorios/RelatorioComissaoPage";
import RelatorioComissaoLocators from "../../support/locators/Relatorios/RelatorioComissaoLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Comissao', { tags: ['@relatorios', '@vendas', '@comissao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioComissaoPage.acessarRelatorioComissao();
    RelatorioComissaoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Comissao', () => {
    RelatorioComissaoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Comissao com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioComissaoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioComissaoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioComissaoPage.pesquisar();
    cy.url().should('contain', '/relatorio/comissao');
    cy.verificarErro500Visual();
  });
});

