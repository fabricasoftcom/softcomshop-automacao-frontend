import RelatorioExibirEstoquePage from "../../support/pages/relatorios/RelatorioExibirEstoquePage";
import { RELATORIO_EXIBIR_ESTOQUE_ROTA_V2 } from "../../support/locators/Relatorios/RelatorioExibirEstoqueLocators";

describe('Relatorio de Exibir Estoque', { tags: ['@relatorios', '@produtos', '@exibir-estoque', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RelatorioExibirEstoquePage.acessarRelatorioExibirEstoque();
  });

  it('Deve exibir os filtros e acoes disponiveis para o relatorio de Exibir Estoque', () => {
    RelatorioExibirEstoquePage.validarElementosBasicos();
  });

  it('Deve permitir pesquisar o relatorio de Exibir Estoque', () => {
    RelatorioExibirEstoquePage.pesquisar();
    cy.url().should('contain', RELATORIO_EXIBIR_ESTOQUE_ROTA_V2);
    cy.verificarErro500Visual();
  });

  it('Deve exibir tabela de resultados após pesquisa', () => {
    RelatorioExibirEstoquePage.pesquisar();

    // Valida que tabela está visível após pesquisa
    RelatorioExibirEstoquePage.validarTabelaResultados();
    cy.verificarErro500Visual();
  });

  it('Deve exibir estrutura da tabela com colunas após pesquisa', () => {
    RelatorioExibirEstoquePage.pesquisar();

    // Valida estrutura da tabela (cabeçalho com colunas)
    RelatorioExibirEstoquePage.validarEstruturaTabela();
    cy.verificarErro500Visual();
  });

  it('Deve exibir botões de exportação PDF e Excel após pesquisa', () => {
    RelatorioExibirEstoquePage.pesquisar();

    // Valida que botões de exportação estão visíveis e clicáveis
    RelatorioExibirEstoquePage.validarBotoesExportacao();
    cy.verificarErro500Visual();
  });

  it('Deve exibir dados na tabela quando houver resultados', () => {
    RelatorioExibirEstoquePage.pesquisar();

    // Valida que tabela tem dados (pelo menos uma linha)
    // Nota: Este teste pode falhar se não houver dados
    cy.get('body').then(($body) => {
      const linhas = $body.find('table tbody tr');
      if (linhas.length > 0) {
        RelatorioExibirEstoquePage.validarTabelaComDados();
      } else {
        // Se não houver dados, valida mensagem ou tabela vazia
        RelatorioExibirEstoquePage.validarTabelaResultados();
        cy.log('Nenhum dado encontrado para a pesquisa');
      }
    });
    cy.verificarErro500Visual();
  });
});

