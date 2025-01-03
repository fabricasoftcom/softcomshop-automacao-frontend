import MenulateralConfiguracoesLocators from "../../locators/ConfiguracoesLocators";

class MenuPage {
    /**
     * Clica em um item do menu principal pelo texto
     * @param {string} menuText - Texto do menu principal
     */
    clickMainMenu(menuText) {
        cy.get('a[href="#"]').find('span').contains(menuText).click({ force: true });
    }

    /**
     * Clica em uma opção de submenu pelo texto
     * @param {string} subMenuText - Texto do submenu
     */
    clickSubMenu(subMenuText) {
        cy.contains(subMenuText).should('be.visible').click({ force: true });
    }

    /**
     * Expande um submenu antes de clicar
     * @param {string} menuText - Texto do menu principal
     * @param {string} subMenuText - Texto do submenu pai
     * @param {string} childMenuText - Texto do submenu filho
     */
    clickNestedSubMenu(menuText, subMenuText, childMenuText) {
        // menu principal
        this.clickMainMenu(menuText);

        // submenu pai
        this.clickSubMenu(subMenuText);

        // submenu filho
        cy.contains(childMenuText).should('be.visible').click({ force: true });
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
