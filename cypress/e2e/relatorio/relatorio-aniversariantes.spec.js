import RelatorioAniversariantesPage from "../../support/pages/relatorios/RelatorioAniversariantesPage";
// import RelatorioAniversariantesLocators from "../../support/locators/Relatorios/RelatorioAniversariantesLocators";

const formatMonth = (date) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  return zeroPad(date.getMonth() + 1);
};

describe('Relatorio de Aniversariantes', { tags: ['@relatorios', '@clientes', '@aniversariantes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioAniversariantesPage.acessarRelatorioAniversariantes();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Aniversariantes', () => {
    RelatorioAniversariantesPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Aniversariantes com mes atual', () => {
    const hoje = new Date();
    const mes = formatMonth(hoje);

    RelatorioAniversariantesPage.preencherMes(mes);
    RelatorioAniversariantesPage.pesquisar();
    cy.url().should('contain', '/relatorio-v2/aniversariante');
    cy.url().should('contain', `data=${mes}`);
    cy.verificarErro500Visual();
  });

  it('Deve permitir pesquisar o relatorio de Aniversariantes sem filtros', () => {
    RelatorioAniversariantesPage.pesquisar();
    cy.url().should('contain', '/relatorio-v2/aniversariante');
    cy.verificarErro500Visual();
  });
});

