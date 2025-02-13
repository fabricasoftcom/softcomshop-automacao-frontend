import MenuPage from '../../support/pages/Menu/MenuPage';

describe('Validação do Menu Lateral do Softcomshop', { tags: ['@menu-lateral', '@regressivo'] }, () => {
    let menuOptions = [];

    before(() => {
        cy.fixture('menuOptions').then((data) => {
            menuOptions = data;
        });
    });

    it('Deve validar os menus e submenus', function () {
        cy.wrap(menuOptions).each((option) => {
            if (option.childMenu) {
                cy.log(`Acessando menu: ${option.mainMenu.text || option.mainMenu.id} > ${option.subMenu.text || option.subMenu.id || option.subMenu.xpath} > ${option.childMenu.text || option.childMenu.id || option.childMenu.xpath}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickNestedSubMenu(option.mainMenu, option.subMenu, option.childMenu);
                MenuPage.validateRoute(option.route);
            } else if (option.subMenu) {
                cy.log(`Acessando menu: ${option.mainMenu.text || option.mainMenu.id} > ${option.subMenu.text || option.subMenu.id}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.clickSubMenu(option.subMenu);
                MenuPage.validateRoute(option.route);
            } else {
                cy.log(`Acessando menu: ${option.mainMenu.text || option.mainMenu.id}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.validateRoute(option.route);
            }
        });
    });
});
