import NfeConfiguracoesPage from "../../support/pages/Nfe/NfeConfiguracoesPage";

describe('NF-e > Configurações', { tags: ['@nfe', '@configuracoes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NF-e) devem usar cy.login()
    cy.visit('/');
    NfeConfiguracoesPage.acessarViaMenu();
  });

  it('Deve exibir a tela de Configurações da NF-e com todos os elementos principais', () => {
    NfeConfiguracoesPage.validarAcesso();
    NfeConfiguracoesPage.validarSecoes();
    NfeConfiguracoesPage.validarBotoes();
    NfeConfiguracoesPage.validarTabelas();
  });
});

