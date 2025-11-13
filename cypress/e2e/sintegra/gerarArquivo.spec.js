import GerarArquivoSintegraPage from "../../support/pages/Sintegra/GerarArquivoPage";

describe("Sintegra > Gerar Arquivo", { tags: ["@sintegra", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    GerarArquivoSintegraPage.acessarViaMenu();
  });

  it("Deve gerar o arquivo com inventário e valor informado", () => {
    cy.intercept("POST", "/sintegra/arquivo/consultar").as("gerarArquivo");

    GerarArquivoSintegraPage.preencherPeriodo("01/11/2025 - 30/11/2025");
    GerarArquivoSintegraPage.preencherDataInventario("15/11/2025");
    GerarArquivoSintegraPage.ativarInformarValor();
    GerarArquivoSintegraPage.preencherValorInventario("1.000,00");
    GerarArquivoSintegraPage.gerarArquivo();

    cy.wait("@gerarArquivo").its("response.statusCode").should("eq", 200);
  });
});
