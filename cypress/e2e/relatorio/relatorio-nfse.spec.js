import RelatorioNfsePage from "../../support/pages/relatorios/RelatorioNfsePage";
import RelatorioNfseLocators from "../../support/locators/Relatorios/RelatorioNfseLocators";

const formatDate = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

describe('Relatorio NFSe', { tags: ['@relatorios', '@fiscal', '@nfse', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/');
    RelatorioNfsePage.acessarRelatorioNfse();
    RelatorioNfsePage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio NFSe', () => {
    RelatorioNfsePage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio NFSe com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDate(hoje);
    const dataFim = formatDate(hoje);

    RelatorioNfsePage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioNfseLocators.periodoInput)
      .should('be.visible')
      .and(($el) => {
        expect(String($el.val() || '').trim().length).to.be.greaterThan(0);
      });

    RelatorioNfsePage.pesquisar();
    cy.url().should('match', /relatorio-nfse/i);
    cy.verificarErro500Visual();
  });
});
