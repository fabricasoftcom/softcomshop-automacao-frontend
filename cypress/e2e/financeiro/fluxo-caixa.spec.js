import FluxoCaixaPage from "../../support/pages/Financeiro/FluxoCaixaPage";

describe("Financeiro > Fluxo de Caixa", { tags: ["@financeiro", "@fluxo-caixa", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    FluxoCaixaPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Fluxo de Caixa com todos os elementos principais", () => {
    FluxoCaixaPage.validarCarregamentoDaPagina();
    FluxoCaixaPage.validarCardsResumo();
    FluxoCaixaPage.validarTabelaVisivel();
    FluxoCaixaPage.validarUrl();
  });

  it("Deve pesquisar por um período específico e exibir resultados", () => {
    const hoje = new Date();
    const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    const dataInicio = primeiroDiaMes.toLocaleDateString('pt-BR');
    const dataFim = ultimoDiaMes.toLocaleDateString('pt-BR');
    const periodo = `${dataInicio} - ${dataFim}`;

    FluxoCaixaPage.validarCarregamentoDaPagina();
    FluxoCaixaPage.pesquisarPorPeriodo(periodo);

    // Aguarda o carregamento após pesquisa
    FluxoCaixaPage.aguardarCarregamento();
    FluxoCaixaPage.validarTabelaVisivel();
  });

  it("Deve exibir o botão Gerar PDF", () => {
    FluxoCaixaPage.validarCarregamentoDaPagina();
    FluxoCaixaPage.validarBotaoGerarPdf();
    FluxoCaixaPage.validarUrlGerarPdf();
  });
});

