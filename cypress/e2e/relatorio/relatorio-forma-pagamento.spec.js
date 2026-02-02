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
    // Atualizado após reformulação: URL mudou para /relatorio-v2/forma-pagamento
    cy.url().should('contain', '/relatorio-v2/forma-pagamento');
    cy.verificarErro500Visual();
  });

  it('Deve exibir tabela de resultados após pesquisa com periodo diario', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioFormaPagamentoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioFormaPagamentoPage.pesquisar();

    // Valida que tabela está visível após pesquisa
    RelatorioFormaPagamentoPage.validarTabelaResultados();
    cy.verificarErro500Visual();
  });

  it('Deve exibir estrutura da tabela com colunas após pesquisa', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioFormaPagamentoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioFormaPagamentoPage.pesquisar();

    // Valida estrutura da tabela (cabeçalho com colunas)
    RelatorioFormaPagamentoPage.validarEstruturaTabela();
    cy.verificarErro500Visual();
  });

  it('Deve exibir botões de exportação PDF e Excel após pesquisa', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioFormaPagamentoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioFormaPagamentoPage.pesquisar();

    // Valida que botões de exportação estão visíveis e clicáveis
    RelatorioFormaPagamentoPage.validarBotoesExportacao();
    cy.verificarErro500Visual();
  });

  it('Deve exibir dados na tabela quando houver resultados', () => {
    const hoje = new Date();
    const dataInicio = formatDateTime(hoje, '00:00:00');
    const dataFim = formatDateTime(hoje, '23:59:59');

    RelatorioFormaPagamentoPage.preencherPeriodo(dataInicio, dataFim);
    RelatorioFormaPagamentoPage.pesquisar();

    // Valida que tabela tem dados (pelo menos uma linha)
    // Nota: Este teste pode falhar se não houver dados no período
    cy.get('body').then(($body) => {
      const linhas = $body.find(RelatorioFormaPagamentoLocators.linhasTabelaResultados);
      if (linhas.length > 0) {
        RelatorioFormaPagamentoPage.validarTabelaComDados();
      } else {
        // Se não houver dados, valida mensagem ou tabela vazia
        RelatorioFormaPagamentoPage.validarTabelaResultados();
        cy.log('Nenhum dado encontrado para o período pesquisado');
      }
    });
    cy.verificarErro500Visual();
  });
});

