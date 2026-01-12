import NfeDownloadXmlPage from "../../support/pages/Nfe/NfeDownloadXmlPage";

describe("NF-e > Download XML", { tags: ["@nfe", "@download-xml", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NF-e) devem usar cy.login()
    cy.visit('/');
    NfeDownloadXmlPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Download do XML com todos os elementos principais", () => {
    NfeDownloadXmlPage.validarTelaDownloadXml();
  });

  it("Deve preencher o formulário de download", () => {
    const dados = {
      periodo: '01/2026 - 01/2026',
      numeroNota: '1',
    };

    NfeDownloadXmlPage.preencherFormulario(dados);
    NfeDownloadXmlPage.validarCamposPreenchidos(dados);
  });
});

