import NfceConfiguracoesPage from "../../support/pages/Nfce/NfceConfiguracoesPage";

describe('NFC-e > Configurações', { tags: ['@nfce', '@configuracoes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NFC-e) devem usar cy.login()
    cy.visit('/');
    NfceConfiguracoesPage.acessarViaMenu();
  });

  it('Deve exibir a tela de Configurações da NFC-e com todos os elementos principais', () => {
    NfceConfiguracoesPage.validarAcesso();
    NfceConfiguracoesPage.validarSecoes();
    NfceConfiguracoesPage.validarBotoes();
    NfceConfiguracoesPage.validarTabelas();
  });
});

