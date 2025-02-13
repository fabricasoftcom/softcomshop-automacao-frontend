import OrcamentoListagemPage from "../../support/pages/Orcamento/OrcamentoListagemPage";

describe('Testes de Listagem de Orçamento', () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        OrcamentoListagemPage.visit();
    });

    it('Deve realizar cadastro de novo orçamento', () => {
        OrcamentoListagemPage.novoCadastro();
        cy.url().should('include', '/orcamento/novo');
    });
});
