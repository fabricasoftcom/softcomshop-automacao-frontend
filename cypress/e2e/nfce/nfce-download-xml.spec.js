// nfce-download-xml.spec.js
import NfceDownloadXmlPage from "../../support/pages/Nfce/NfceDownloadXmlPage";

describe("NFC-e > Download XML", { tags: ["@nfce", "@download-xml", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NFC-e) devem usar cy.login()
    cy.visit('/');
    NfceDownloadXmlPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Download do XML com todos os elementos principais", () => {
    NfceDownloadXmlPage.validarTelaDownloadXml();
  });

  it("Deve preencher o formulário de download", () => {
    const dados = {
      periodo: '01/2026 - 01/2026',
      numeroNota: '1',
    };

    NfceDownloadXmlPage.preencherFormulario(dados);
    NfceDownloadXmlPage.validarCamposPreenchidos(dados);
  });

  it("Deve fazer download do XML definindo período dos últimos 30 dias", () => {
    // Calcular período dos últimos 30 dias
    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    const periodoInicio = formatarPeriodo(trintaDiasAtras);
    const periodoFim = formatarPeriodo(hoje);
    const periodo = `${periodoInicio} - ${periodoFim}`;

    // Preencher período
    NfceDownloadXmlPage.preencherPeriodo(periodo);

    // Aguardar um pouco para o datepicker processar
    cy.wait(1000);

    // Fechar datepicker se estiver aberto
    cy.get('body').then(($body) => {
      if ($body.find('.daterangepicker').is(':visible')) {
        cy.get('body').type('{esc}');
        cy.wait(500);
      }
    });

    // Clicar em download e aguardar o download
    NfceDownloadXmlPage.clicarDownload();

    // Validar que o arquivo foi baixado
    // O Cypress automaticamente aguarda o download completar
    cy.readFile('cypress/downloads/xml-nfce.zip', { timeout: 15000 }).should('exist');

    // Validar que o arquivo tem conteúdo (não está vazio)
    cy.readFile('cypress/downloads/xml-nfce.zip').then((fileContent) => {
      expect(fileContent).to.not.be.empty;
      // Validar que é um arquivo ZIP (verifica os primeiros bytes)
      // ZIP files começam com "PK" (50 4B em hex)
      const firstBytes = Buffer.from(fileContent).slice(0, 2).toString();
      expect(firstBytes).to.include('PK');
    });
  });

  // Função auxiliar para formatar data como MM/YYYY
  function formatarPeriodo(data) {
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${mes}/${ano}`;
  }
});

