import RelatorioPeriodoPage from "../../support/pages/relatorios/RelatorioPeriodoPage";
import RelatorioPeriodoLocators from "../../support/locators/Relatorios/RelatorioPeriodoLocators";

const formatDateTime = (date, time) => {
  const zeroPad = (value) => String(value).padStart(2, '0');
  const day = zeroPad(date.getDate());
  const month = zeroPad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${time}`;
};

describe('Relatorio de Periodo', { tags: ['@relatorios', '@vendas', '@periodo', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioPeriodoPage.acessarRelatorioPeriodo();
    RelatorioPeriodoPage.garantirFiltrosVisiveis();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Periodo', () => {
    RelatorioPeriodoPage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Periodo com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    cy.get(RelatorioPeriodoLocators.periodoInput).should('have.value', `${dataInicio} - ${dataFim}`);

    RelatorioPeriodoPage.pesquisar();
    cy.url().should('contain', '/relatorio/periodo');
    cy.verificarErro500Visual();
  });

  it('Deve exibir tabela de resultados após pesquisa com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioPeriodoPage.pesquisar();

    // Valida que tabela está visível após pesquisa
    RelatorioPeriodoPage.validarTabelaResultados();
    cy.verificarErro500Visual();
  });

  it('Deve exibir estrutura da tabela com colunas após pesquisa', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioPeriodoPage.pesquisar();

    // Valida estrutura da tabela (cabeçalho com colunas)
    RelatorioPeriodoPage.validarEstruturaTabela();
    cy.verificarErro500Visual();
  });

  it('Deve exibir botões de exportação PDF e Excel após pesquisa', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioPeriodoPage.pesquisar();

    // Valida que botões de exportação estão visíveis e clicáveis
    RelatorioPeriodoPage.validarBotoesExportacao();
    cy.verificarErro500Visual();
  });

  it('Deve exibir dados na tabela quando houver resultados', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioPeriodoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioPeriodoPage.pesquisar();

    // Valida que tabela tem dados (pelo menos uma linha)
    // Nota: Este teste pode falhar se não houver dados no período
    // Considerar tornar condicional ou usar período com dados conhecidos
    cy.get('body').then(($body) => {
      const linhas = $body.find(RelatorioPeriodoLocators.linhasTabelaResultados);
      if (linhas.length > 0) {
        RelatorioPeriodoPage.validarTabelaComDados();
      } else {
        // Se não houver dados, valida mensagem ou tabela vazia
        RelatorioPeriodoPage.validarTabelaResultados();
        cy.log('Nenhum dado encontrado para o período pesquisado');
      }
    });
    cy.verificarErro500Visual();
  });
});

