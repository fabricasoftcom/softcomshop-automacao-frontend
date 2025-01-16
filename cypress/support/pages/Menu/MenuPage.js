class MenuPage {

    waitForAppReady() {
        cy.get('#loading-indicator', { timeout: 10000 }).should('not.exist');
    }

    // Função genérica para clicar em qualquer seletor, seja CSS ou XPath
    clickMenu(menu) {
        if (menu.id) {
            cy.get(`#${menu.id}`).click();
        } else if (menu.text) {
            cy.contains(menu.text).click();
        } else if (menu.xpath) {
            cy.xpath(menu.xpath).click();
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


// class MenuPage {
//
//     waitForAppReady() {
//         cy.get('#loading-indicator', { timeout: 10000 }).should('not.exist');
//     }
//
//     clickMenu(menu) {
//         if (menu.id) {
//             cy.get(`#${menu.id}`).click({force: true, multiple: true});
//         }
//         else if (menu.text) {
//             cy.contains(menu.text).click({force: true, multiple: true});
//         } else {
//             throw new Error('Nenhum seletor (ID ou Texto) encontrado para o menu.');
//         }
//     }
//
//     clickMainMenu(menu) {
//         this.clickMenu(menu);
//     }
//
//     clickSubMenu(menu) {
//         this.clickMenu(menu);
//     }
//
//     clickNestedSubMenu(menu, subMenu, childMenu) {
//         this.waitForAppReady();
//         this.clickMainMenu(menu);
//         this.clickSubMenu(subMenu);
//         if (childMenu) {
//             this.clickMenu(childMenu);
//         }
//     }
//
//     validateRoute(expectedUrl) {
//         cy.url().should('contain', expectedUrl);
//     }
// }
//
// export default new MenuPage();

// class MenuPage {
//
//     waitForAppReady() {
//         cy.get('#loading-indicator', { timeout: 10000 }).should('not.exist');
//     }
//
//     clickMenu(menu) {
//         // Verifique se é necessário expandir o submenu
//         if (menu.parentSelector) {
//             // Expande o submenu se necessário
//             cy.get(menu.parentSelector)
//                 .should('have.class', 'collapse')
//                 .invoke('removeClass', 'collapse'); // Força a remoção da classe 'collapse'
//
//             // Agora, localize o item com base no ID ou texto
//             cy.get(menu.parentSelector)
//                 .find(`#${menu.id}, span.nav-label:contains("${menu.text}")`)
//                 .should('be.visible')
//                 .click({ force: true, multiple: true });
//         } else if (menu.id) {
//             cy.get(`#${menu.id}`)
//                 .should('be.visible')
//                 .click({ force: true });
//         } else if (menu.text) {
//             cy.contains(menu.text)
//                 .should('be.visible')
//                 .click({ force: true });
//         } else {
//             throw new Error('Nenhum seletor (ID, Texto ou ParentSelector) encontrado para o menu.');
//         }
//     }
//
//     clickMainMenu(menu) {
//         this.clickMenu(menu);
//     }
//
//     clickSubMenu(menu) {
//         this.clickMenu(menu);
//     }
//
//     clickNestedSubMenu(menu, subMenu, childMenu) {
//         this.waitForAppReady();
//         this.clickMainMenu(menu); // Clica no menu principal
//         this.clickSubMenu(subMenu); // Clica no submenu
//
//         // Clica no child menu se fornecido
//         if (childMenu) {
//             this.clickMenu(childMenu);
//         }
//     }
//
//     validateRoute(expectedUrl) {
//         cy.url().should('contain', expectedUrl);
//     }
// }
//
// export default new MenuPage();
