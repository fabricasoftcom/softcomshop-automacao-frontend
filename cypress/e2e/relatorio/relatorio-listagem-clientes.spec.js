import RelatorioListagemClientesPage from "../../support/pages/relatorios/RelatorioListagemClientesPage";
import RelatorioListagemClientesLocators from "../../support/locators/Relatorios/RelatorioListagemClientesLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Listagem dos Clientes', { tags: ['@relatorios', '@clientes', '@listagem-clientes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioListagemClientesPage.acessarRelatorioListagemClientes();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Listagem dos Clientes', () => {
    RelatorioListagemClientesPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Listagem dos Clientes sem filtros', () => {
    RelatorioListagemClientesPage.pesquisar();
    cy.url().should('contain', '/relatorio/dados-clientes');
    cy.verificarErro500Visual();
  });

  it('Deve permitir pesquisar o relatorio de Listagem dos Clientes com filtros basicos', () => {
    const hoje = new Date();
    const umAnoAtras = new Date();
    umAnoAtras.setFullYear(hoje.getFullYear() - 1);
    const dataInicio = formatDateTime(umAnoAtras, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioListagemClientesPage.preencherPeriodoCadastro(dataInicio, dataFim);
    cy.get(RelatorioListagemClientesLocators.periodoCadastroInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioListagemClientesPage.selecionarTipoPessoa('FISICA');
    cy.get(RelatorioListagemClientesLocators.tipoPessoaSelect).should('have.value', 'FISICA');

    RelatorioListagemClientesPage.selecionarUF('PB');
    cy.get(RelatorioListagemClientesLocators.ufSelect).should('have.value', 'PB');

    RelatorioListagemClientesPage.pesquisar();
    cy.url().should('contain', '/relatorio/dados-clientes');
    cy.verificarErro500Visual();
  });
});

