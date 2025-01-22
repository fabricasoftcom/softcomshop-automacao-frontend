import BalancoLocators from "../../locators/BalancoLocator";

class BalancoPage {

    preencherCabecalho(responsavel) {
        cy.get(BalancoLocators.responsavelInput).click()
        cy.get(".typeahead-list > :nth-child(1) > a").contains(responsavel).click()
    }

    salvarCabecalho() {
        cy.get(BalancoLocators.botaoSalvarCabecalho).click()
    }

    selecionarProduto() {
        cy.get(BalancoLocators.produtoInput).click();
        cy.xpath("//strong[@class='autocomplete-color-primary'][contains(.,'1 prod grade 1 G Amarela')]").click()
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
