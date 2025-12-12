import RelatorioFormaPagamentoPage from "../../support/pages/relatorios/RelatorioFormaPagamentoPage";
import RelatorioFormaPagamentoLocators from "../../support/locators/Relatorios/RelatorioFormaPagamentoLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Forma Pagamento', { tags: ['@relatorios', '@vendas', '@forma-pagamento', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioFormaPagamentoPage.acessarRelatorioFormaPagamento();
    RelatorioFormaPagamentoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Forma Pagamento', () => {
    RelatorioFormaPagamentoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Forma Pagamento com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioFormaPagamentoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioFormaPagamentoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioFormaPagamentoPage.pesquisar();
    cy.url().should('contain', '/relatorio/forma-pagamento');
    cy.verificarErro500Visual();
  });
});

