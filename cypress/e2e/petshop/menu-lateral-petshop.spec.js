import MenuPage from '../../support/pages/Menu/MenuPage';
import MenuLateralPetshopLocators from '../../support/locators/Petshop/MenuLateralPetshopLocators';

describe('Validação do Menu Lateral do Petshop', { tags: ['@petshop', '@menu-lateral', '@regressivo'] }, () => {
    let menuOptions = [];

    before(() => {
        cy.fixture('menuOptionsPetshop').then((data) => {
            menuOptions = data;
        });
        cy.loginArmazenandoSessao(); // Login padrão (não fiscal)
        cy.visit("/");
    });

    it('Deve validar os menus e submenus exclusivos do Petshop', function () {
        cy.wrap(menuOptions).each((option) => {
            if (option.childMenu) {
                cy.log(`Acessando menu Petshop: ${option.mainMenu.text || option.mainMenu.id} > ${option.subMenu.text || option.subMenu.id} > ${option.childMenu.text || option.childMenu.id}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickNestedSubMenu(option.mainMenu, option.subMenu, option.childMenu);
                MenuPage.validateRoute(option.route);
                cy.verificarErro500Visual();
            } else if (option.subMenu) {
                cy.log(`Acessando menu Petshop: ${option.mainMenu.text || option.mainMenu.id} > ${option.subMenu.text || option.subMenu.id}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.clickSubMenu(option.subMenu);
                MenuPage.validateRoute(option.route);
                cy.verificarErro500Visual();
            } else {
                // Menu principal sem submenu (ex: Painel de Atendimento)
                cy.log(`Acessando menu Petshop exclusivo: ${option.mainMenu.text || option.mainMenu.id}`);
                cy.loginRestoreSession();
                cy.visit('/');
                MenuPage.clickMainMenu(option.mainMenu);
                MenuPage.validateRoute(option.route);
                cy.verificarErro500Visual();
            }
        });
    });

    it('Deve validar especificamente o Painel de Atendimento (menu principal exclusivo)', function () {
        cy.loginRestoreSession();
        cy.visit('/');

        // Valida que o menu Painel de Atendimento está visível usando o locator correto
        cy.get(MenuLateralPetshopLocators.menuPainelAtendimento).should('be.visible');

        // Clica no menu
        cy.get(MenuLateralPetshopLocators.menuPainelAtendimento).click({ force: true });

        // Valida rota
        cy.url().should('include', '/petshop/painel-de-atendimento');

        // Valida elementos da página
        cy.contains('Painel de Atendimentos').should('be.visible');
    });
});

