class HomePage {
    verificaHomePage() {
        cy.contains('Início').should('be.visible')
    }
}

export default new HomePage();
