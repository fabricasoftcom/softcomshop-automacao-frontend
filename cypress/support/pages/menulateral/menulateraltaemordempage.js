class MenulateralTaeMordemPage {
    // Acessar o dashboard do ta em ordem
    acessarTaEmOrdem() {
        cy.clicarMenu('Tá em ordem');
    }
}

export default new MenulateralTaeMordemPage();
