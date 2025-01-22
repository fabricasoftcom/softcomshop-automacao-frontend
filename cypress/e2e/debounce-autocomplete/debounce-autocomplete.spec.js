import VendaPage from "../../support/pages/Venda/VendaPage";

describe.skip('Testar Debounce no Autocomplete', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Deve contar as requisições de autocomplete', () => {
        cy.intercept('GET', 'https://automacaobilbo.softcomshop.com.br/vendas-itens/autocomplete*').as('autocompleteRequests');

        VendaPage.acessarPaginaVenda();

        cy.get('#auto_produto_empresa_grade_id_')
            .type('frango', { delay: 800 })
            .should('have.value', 'frango');

        cy.wait(1500);

        cy.get('@autocompleteRequests.all').then((requests) => {
            cy.log(`Foram feitas ${requests.length} requisições.`);
            // expect(requests.length).to.be.lessThan(3);
        });
    });
});
