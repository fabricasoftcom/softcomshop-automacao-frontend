// nfce-inutilizar.spec.js
import NfceInutilizarPage from "../../support/pages/Nfce/NfceInutilizarPage";

describe("NFC-e > Inutilizar", { tags: ["@nfce", "@inutilizar", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NFC-e) devem usar cy.login()
    cy.visit('/');
    NfceInutilizarPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Inutilizar Faixas da NFCE", () => {
    NfceInutilizarPage.validarTelaInutilizar();
    // Validar que o heading do formulário existe (mesmo que o formulário esteja oculto)
    cy.contains('h3', 'Adicionar Inutilização de Faixa').should('exist');
  });
});

