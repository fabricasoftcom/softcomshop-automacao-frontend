class MenuPage {

    waitForAppReady() {
        cy.get('#loading-indicator', { timeout: 10000 }).should('not.exist');
    }

    // Função genérica para clicar em qualquer seletor, seja CSS ou XPath
    clickMenu(menu) {
        if (menu.id) {
            cy.get(`#${menu.id}`).click({ force: true });
        } else if (menu.text) {
            cy.contains(menu.text).click({ force: true });
        } else if (menu.xpath) {
            cy.xpath(menu.xpath).click({ force: true });
        } else {
            throw new Error('Nenhum seletor (ID, Texto ou XPath) encontrado para o menu.');
        }
    }

    clickMainMenu(menu) {
        this.clickMenu(menu);
    }

    clickSubMenu(menu) {
        this.clickMenu(menu);
    }

    clickNestedSubMenu(menu, subMenu, childMenu) {
        this.waitForAppReady();
        this.clickMainMenu(menu);
        this.clickSubMenu(subMenu);

        if (childMenu) {
            this.clickMenu(childMenu);
        }
    }

    validateRoute(expectedUrl) {
        cy.url().should('contain', expectedUrl);
    }
}

export default new MenuPage();