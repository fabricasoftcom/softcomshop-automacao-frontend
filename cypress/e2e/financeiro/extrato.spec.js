// extrato.spec.js
import ExtratoPage from "../../support/pages/Financeiro/ExtratoPage";

describe("Financeiro > Extrato", { tags: ["@financeiro", "@extrato", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    ExtratoPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Extrato com todos os elementos principais", () => {
    ExtratoPage.validarTelaExtrato();
    ExtratoPage.validarUrlExtrato();
  });

  it("Deve exibir os cards de resumo", () => {
    ExtratoPage.validarCardsResumo();
  });

  it("Deve exibir a tabela com todas as colunas", () => {
    ExtratoPage.validarTabela();
  });

  it("Deve exibir o botão Gerar PDF", () => {
    ExtratoPage.clicarGerarPdf();
    // A validação do download do PDF é feita no método clicarGerarPdf
    // que intercepta a requisição e verifica o status code.
  });
});

