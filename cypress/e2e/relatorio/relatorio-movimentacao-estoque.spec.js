import RelatorioMovimentacaoEstoquePage from "../../support/pages/relatorios/RelatorioMovimentacaoEstoquePage";
import RelatorioMovimentacaoEstoqueLocators from "../../support/locators/Relatorios/RelatorioMovimentacaoEstoqueLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio de Movimentacao de Estoque', { tags: ['@relatorios', '@produtos', '@movimentacao-estoque', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioMovimentacaoEstoquePage.acessarRelatorioMovimentacaoEstoque();
    RelatorioMovimentacaoEstoquePage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Movimentacao de Estoque', () => {
    RelatorioMovimentacaoEstoquePage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Movimentacao de Estoque com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioMovimentacaoEstoquePage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioMovimentacaoEstoqueLocators.dataInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioMovimentacaoEstoquePage.pesquisar();
    cy.url().should('contain', '/relatorios/movimentacao-estoque');
    cy.verificarErro500Visual();
  });
});

