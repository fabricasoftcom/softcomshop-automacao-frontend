class HomePage {
    verificaHomePage() {
        cy.contains('Início').should('be.visible')
        cy.percySnapshot();
    }
}

export default new HomePage();
