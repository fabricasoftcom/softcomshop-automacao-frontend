import MenuPage from '../../support/pages/Menu/MenuPage';

describe('Validação do Menu Lateral do Softcomshop', () => {
    let menuOptions = []; // Inicializa o array para evitar erros de undefined

    before(() => {
        // Carrega a fixture antes de iniciar os testes
        cy.fixture('menuOptions').then((data) => {
            menuOptions = data;
        });
    });

    // Define os testes dinamicamente após carregar a fixture
    it('Deve validar os menus e submenus', function () {
        cy.wrap(menuOptions).each((option) => {
            if (option.childMenu) {
                cy.log(`Acessando menu: ${option.mainMenu} > ${option.subMenu} > ${option.childMenu}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickNestedSubMenu(option.mainMenu, option.subMenu, option.childMenu);
                MenuPage.validateRoute(option.route);
            } else if (option.subMenu) {
                cy.log(`Acessando menu: ${option.mainMenu} > ${option.subMenu}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.clickSubMenu(option.subMenu);
                MenuPage.validateRoute(option.route);
            } else {
                cy.log(`Acessando menu: ${option.mainMenu}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.validateRoute(option.route);
            }
        });
    });
});
