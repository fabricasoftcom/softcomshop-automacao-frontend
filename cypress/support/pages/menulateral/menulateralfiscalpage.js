// MenulateralFiscalPage.js
import MenulateralFiscalLocators from "../../locators/MenulateralFiscalLocators";

class MenulateralFiscalPage {

    // Expande o menu Fiscal e clica nas opções de submenu especificadas
    expandirClicarMenuFiscal(submenu, opcaoClick) {
        cy.get(MenulateralFiscalLocators.menuFiscal).click({ force: true });
        cy.get(submenu).click({ force: true });
        cy.get(opcaoClick).click({ force: true });
    }

    // Métodos para acessar cada item do menu fiscal

    acessarSpedContador() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedContador);
    }

    acessarSpedConfiguracoes() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedConfiguracoes);
    }

    acessarSpedGerarArquivo() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedGerarArquivo);
    }

    acessarSpedValoresDeclaratorios() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedValoresDeclaratorios);
    }

    acessarSpedInventarioBase() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedInventarioBase);
    }

    acessarSpedIcmsAjuste() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedIcmsAjuste);
    }

    acessarSpedIpiAjuste() {
        this.expandirClicarMenuFiscal(MenulateralFiscalLocators.sped, MenulateralFiscalLocators.spedIpiAjuste);
    }

    acessarSintegraGerarArquivo() {
    cy.get(MenulateralFiscalLocators.menuFiscal).click({ force: true });
    cy.get(MenulateralFiscalLocators.sintegra).click({ force: true });
    cy.xpath(MenulateralFiscalLocators.sintegraGerarArquivoXPath, { timeout: 10000 }).click({ force: true });
    }

    acessarImportadorNFce() {
        // Acesso direto ao importador NFce sem submenu adicional
        cy.get(MenulateralFiscalLocators.menuFiscal).click({ force: true });
        cy.get(MenulateralFiscalLocators.importarNFce).click({ force: true });
    }
}

export default new MenulateralFiscalPage();
