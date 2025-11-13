import GerarArquivoPage from "../../support/pages/Sped/GerarArquivoPage";

describe("SPED > Gerar Arquivo", { tags: ["@sped", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    GerarArquivoPage.acessarViaMenu();
  });

  it("Deve gerar o arquivo fiscal com inventário ativado e valor informado", () => {
    cy.intercept("GET", "/sped/arquivo*").as("gerarArquivo");

    GerarArquivoPage.preencherPeriodo("01/10/2025 - 31/10/2025");
    GerarArquivoPage.selecionarTipo("FISCAL");
    GerarArquivoPage.ativarInventarioGerar();
    GerarArquivoPage.ativarInformarValor();
    GerarArquivoPage.preencherValorInventario("1.000,00");
    GerarArquivoPage.selecionarRetificarArquivo(false);

    GerarArquivoPage.gerarArquivo();

    cy.wait("@gerarArquivo").its("response.statusCode").should("eq", 302);
  });
});
