import NfeInutilizarPage from "../../support/pages/Nfe/NfeInutilizarPage";

describe("NF-e > Inutilizar", { tags: ["@nfe", "@inutilizar", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.login(); // ADR-0004: Funcionalidades fiscais (NF-e) devem usar cy.login()
    cy.visit('/');
    NfeInutilizarPage.acessarViaMenu();
  });

  it("Deve exibir a tela de Inutilizar Faixas da NFE", () => {
    NfeInutilizarPage.validarTelaInutilizar();
    cy.contains('h3', 'Adicionar Inutilização de Faixa').should('exist');
  });
});

