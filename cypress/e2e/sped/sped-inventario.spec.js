import SpedInventarioPage from "../../support/pages/Sped/SpedInventarioPage";

describe('SPED - Inventário Base', { tags: ['@sped', '@inventario', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // Login Fiscal
    cy.visit('/');
    SpedInventarioPage.acessarViaMenu();
  });

  it('Deve acessar a tela e validar elementos principais', () => {
    SpedInventarioPage.validarAcesso();
    SpedInventarioPage.validarElementos();
  });

  it('Deve preencher a data corretamente', () => {
    const dataTeste = '2026-01-01';
    SpedInventarioPage.preencherData(dataTeste);
    SpedInventarioPage.validarDataPreenchida(dataTeste);
  });

  it('Deve validar o link de download', () => {
    SpedInventarioPage.clicarDownload();
  });

  it('Deve realizar upload de arquivo de inventário', () => {
    const arquivoTeste = 'cypress/fixtures/inventario.xlsx';
    SpedInventarioPage.realizarUpload(arquivoTeste);
    // Como não há feedback visual claro capturado na exploração (toast, mensagem),
    // apenas garantimos que o comando selectFile funciona.
    // Futuramente, adicionar validação de sucesso se houver feedback.
  });
});

