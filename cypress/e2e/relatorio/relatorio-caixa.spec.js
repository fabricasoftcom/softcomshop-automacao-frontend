import RelatorioCaixaPage from "../../support/pages/relatorios/RelatorioCaixaPage";
import RelatorioCaixaLocators from "../../support/locators/RelatorioCaixaLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Caixa', { tags: ['@relatorios', '@caixa', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioCaixaPage.acessarRelatorioCaixa();
    RelatorioCaixaPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Caixa', () => {
    RelatorioCaixaPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Caixa com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioCaixaPage.selecionarTipo('analitico');
    RelatorioCaixaPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioCaixaLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    Cypress._.range(1, 7).forEach((turnoNumero) => {
      RelatorioCaixaPage.preencherTurno(String(turnoNumero));
      RelatorioCaixaPage.pesquisar();
      cy.url().should('contain', '/relatorio/vendas-caixa');
      cy.verificarErro500Visual();
    });
  });

  it('Deve gerar o relatorio de Caixa do tipo sintetico', () => {
    const hoje = new Date();
    const ontem = new Date();
    ontem.setDate(hoje.getDate() - 1);

    const dataInicio = formatDateTime(ontem, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioCaixaPage.selecionarTipo('sintetico');
    cy.get(RelatorioCaixaLocators.tipoSelect).should('have.value', 'sintetico');

    RelatorioCaixaPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioCaixaLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioCaixaPage.pesquisar();
    cy.url().should('contain', '/relatorio/vendas-caixa');
    cy.verificarErro500Visual();
  });

  it('Deve pesquisar o periodo atual sem turno e exibir dados em tela', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioCaixaPage.selecionarTipo('sintetico');
    RelatorioCaixaPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioCaixaLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);
    cy.get(RelatorioCaixaLocators.turnoInput).clear({ force: true }).should('have.value', '');

    RelatorioCaixaPage.pesquisar();
    cy.get(RelatorioCaixaLocators.totalizadoresContainer).should('be.visible');
    cy.get(RelatorioCaixaLocators.totalizadoresContainer)
      .contains(/totaliza.*caixa/i)
      .should('be.visible');
    cy.get(RelatorioCaixaLocators.totalizadoresContainer)
      .find('table')
      .should('have.length.greaterThan', 0);
    cy.verificarErro500Visual();
  });

  it('Deve listar vendas no relatorio analitico sem informar turno', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioCaixaPage.selecionarTipo('analitico');
    cy.get(RelatorioCaixaLocators.tipoSelect).should('have.value', 'analitico');

    RelatorioCaixaPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioCaixaLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);
    cy.get(RelatorioCaixaLocators.turnoInput).clear({ force: true }).should('have.value', '');

    RelatorioCaixaPage.pesquisar();
    cy.get(RelatorioCaixaLocators.tabelaResultados).should('be.visible');
    cy.get(RelatorioCaixaLocators.blocoCabecalhoPedido).should('contain.text', 'Pedido')
      .and('contain.text', 'Vendedor')
      .and('contain.text', 'Cliente');
    cy.get(RelatorioCaixaLocators.linhasTabelaResultados).its('length').should('be.greaterThan', 0);
    cy.get(RelatorioCaixaLocators.tabelaResultados).contains(/Pagamento/i);
    cy.verificarErro500Visual();
  });
});
