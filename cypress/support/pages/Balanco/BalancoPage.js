import BalancoLocators from "../../locators/BalancoLocator";

class BalancoPage {

    preencherCabecalho() {
        cy.get(BalancoLocators.responsavelInput).click()
        cy.get('.typeahead-list>> a:contains("VENDEDOR")').click();
    }

    salvarCabecalho() {
        cy.get(BalancoLocators.botaoSalvarCabecalho).click()
    }

    selecionarProduto() {
        cy.get(BalancoLocators.produtoInput).click();
        cy.xpath("//a[contains(@data-index,'0')]").click()
    }

    salvarBalanco() {
        cy.get(BalancoLocators.botaoSalvarBalanco).click()
    }

    finalizarBalanco() {
        cy.get(BalancoLocators.botaoFinalizarBalanco).click()
    }

    verificarStatusFinalizado () {
        cy.get(BalancoLocators.statusFinalizado).contains("Finalizado")
    }

    verificarToastSucesso (){
        cy.get(BalancoLocators.toastSucesso).contains("Balanço finalizado com Sucesso!")
    }
}

export default new BalancoPage()
