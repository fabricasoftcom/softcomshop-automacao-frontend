import MenulateralConfiguracoesLocators from "../../locators/ConfiguracoesLocators";

class MenuPage {
    /**
     * Aguarda a aplicação estabilizar (pode ser ajustado com um seletor que indica o carregamento)
     */
    waitForAppReady() {
        cy.get('#loading-indicator', { timeout: 10000 }).should('not.exist'); // Exemplo de seletor de loading
    }

    /**
     * Clica em um item do menu principal pelo texto, adaptando-se para menus com ou sem submenus
     * @param {string} menuText - Texto do menu principal
     */
    clickMainMenu(menuText) {
        cy.get('a[href="#"]')
            .find('span')
            .contains(menuText)
            .then(($menu) => {
                if ($menu.closest('li').hasClass('has-submenu')) {
                    // Menu com submenus
                    cy.wrap($menu).click({ force: true });
                } else {
                    // Menu sem submenus, navegação direta
                    cy.wrap($menu).click();
                }
            });
    }

    /**
     * Clica em uma opção de submenu pelo texto
     * @param {string} subMenuText - Texto do submenu
     */
    clickSubMenu(subMenuText) {
        cy.contains(subMenuText)
            .should('be.visible') // Garante visibilidade
            .click(); // Clique sem forçar
    }

    /**
     * Expande um submenu antes de clicar
     * @param {string} menuText - Texto do menu principal
     * @param {string} subMenuText - Texto do submenu pai
     * @param {string} childMenuText - Texto do submenu filho
     */
    clickNestedSubMenu(menuText, subMenuText, childMenuText) {
        // Aguarda aplicação pronta
        this.waitForAppReady();

        // Menu principal
        this.clickMainMenu(menuText);

        // Submenu pai
        this.clickSubMenu(subMenuText);

        // Submenu filho
        cy.contains(childMenuText)
            .should('be.visible') // Garante visibilidade
            .click(); // Clique no submenu filho
    }

    /**
     * Valida a rota atual
     * @param {string} expectedUrl - URL esperada
     */
    validateRoute(expectedUrl) {
        cy.url().should('contain', expectedUrl);
    }
}

export default new MenuPage();
