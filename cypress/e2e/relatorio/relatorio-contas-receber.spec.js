import RelatorioContasReceberPage from "../../support/pages/relatorios/RelatorioContasReceberPage";
import RelatorioContasReceberLocators from "../../support/locators/Relatorios/RelatorioContasReceberLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio de Contas a Receber', { tags: ['@relatorios', '@financeiro', '@contas-receber', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioContasReceberPage.acessarRelatorioContasReceber();
    RelatorioContasReceberPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Contas a Receber', () => {
    RelatorioContasReceberPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Contas a Receber com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioContasReceberPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioContasReceberLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioContasReceberPage.pesquisar();
    cy.url().should('contain', '/relatorio/contas-a-receber');
    cy.verificarErro500Visual();
  });
});

