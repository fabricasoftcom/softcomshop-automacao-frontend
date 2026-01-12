// dre.spec.js
import DrePage from "../../support/pages/Financeiro/DrePage";

describe("Financeiro > DRE", { tags: ["@financeiro", "@dre", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    DrePage.acessarViaMenu();
  });

  it("Deve exibir a tela de DRE com todos os elementos principais", () => {
    DrePage.validarTelaDre();
    DrePage.validarUrlDre();
  });

  it("Deve exibir todas as seções do DRE", () => {
    DrePage.validarSecaoTotalVendas();
    DrePage.validarSecaoDespesasReceitas();
    DrePage.validarSecaoLucroLiquido();
    DrePage.validarSecaoBalancoPatrimonial();
    DrePage.validarSecaoContasReceber();
  });

  it("Deve exibir o botão Gerar PDF", () => {
    DrePage.clicarGerarPdf();
    // A validação do download do PDF é feita no método clicarGerarPdf
    // que intercepta a requisição e verifica o status code.
  });
});

