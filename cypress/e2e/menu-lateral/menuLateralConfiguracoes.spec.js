import MenuPage from '../../support/pages/Menu/MenuPage';

describe('Validação do Menu Lateral do Softcomshop', () => {
    let menuOptions;

    before(() => {
        cy.fixture('menuOptions').then((data) => {
            menuOptions = data;
        });
    });

    beforeEach(() => {
        cy.loginRestoreSession();
        cy.visit('/');
    });

    menuOptions.forEach((option) => {
        if (option.childMenu) {
            it(`Deve acessar o menu ${option.mainMenu} > ${option.subMenu} > ${option.childMenu} e validar a rota`, () => {
                cy.log(`Acessando menu: ${option.mainMenu} > ${option.subMenu} > ${option.childMenu}`);
                MenuPage.clickNestedSubMenu(option.mainMenu, option.subMenu, option.childMenu);
                MenuPage.validateRoute(option.route);
            });
        } else {
            it(`Deve acessar o menu ${option.mainMenu} > ${option.subMenu} e validar a rota`, () => {
                cy.log(`Acessando menu: ${option.mainMenu} > ${option.subMenu}`);
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.clickSubMenu(option.subMenu);
                MenuPage.validateRoute(option.route);
            });
        }
    });
});
