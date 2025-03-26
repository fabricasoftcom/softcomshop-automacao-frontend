import CompraLocators from "../../locators/CompraLocators"

class CompraPage {
    acessarPaginaCompra() {
        cy.visit('/compra')
    }

    importarNfe() {
        cy.get(CompraLocators.importarNFe).click()
    }

    clicarImportacaoXML() {
        cy.xpath(CompraLocators.arquivoXML).click()
    }

    clicarAnexarNFe() {
        cy.get('#file').invoke('show').click({force: true}).attachFile('nfe_importacao.xml');
    }

    clicarImportar() {
        cy.get(CompraLocators.btnImportar).click()
    }

    informarCFOP() {
        cy.get(CompraLocators.selectNatureza).click()
        cy.xpath(CompraLocators.natureza)
    }

    informarVinculoFiscal() {
        cy.get(CompraLocators.selectVinculoFiscal).click()
        cy.xpath(CompraLocators.vinculoFiscal).click()
        cy.get(CompraLocators.btnLancarVinculo).click()
    }

    importarNFe() {
        cy.get(CompraLocators.btnImportarNFe).click()
    }
}

module.exports = new CompraPage();
