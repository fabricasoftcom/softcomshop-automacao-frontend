// sped-configuracoes.spec.js
import SpedConfiguracoesPage from "../../support/pages/Sped/SpedConfiguracoesPage";

describe("SPED > Configurações", { tags: ["@sped", "@configuracoes", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (SPED) devem usar cy.login()
    cy.visit('/');
    SpedConfiguracoesPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Configurações do SPED com todos os elementos principais", () => {
    SpedConfiguracoesPage.validarTelaConfiguracoes();
    SpedConfiguracoesPage.validarSecaoFiscal();
  });

  it("Deve validar a seção Fiscal com todos os campos", () => {
    SpedConfiguracoesPage.clicarTabFiscal();
    SpedConfiguracoesPage.validarSecaoFiscal();
  });

  it("Deve alterar configurações e salvar", () => {
    // Alterar perfil de escrituração
    SpedConfiguracoesPage.selecionarPerfilEscrituracao('A');

    // Alterar atividade da empresa
    SpedConfiguracoesPage.selecionarAtividadeEmpresa('0');

    // Marcar checkbox
    SpedConfiguracoesPage.marcarExibirEscolhaPerfil();

    // Salvar
    SpedConfiguracoesPage.clicarSalvar();

    // Validar que a página permanece na mesma URL (configurações salvas)
    cy.url().should('include', '/sped/configuracoes');
  });
});

