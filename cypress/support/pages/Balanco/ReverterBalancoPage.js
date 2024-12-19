import { ReverterBalancoLocator } from "../../locators/ReverterBalancoLocator"

class ReverterBalancoPage {
    acessarPrimeiroBalancoFinalizado () {
        cy.get("table > tbody > tr")
        .filter(':contains("Finalizado")')
        .first()
        .find(".button-tab")
        .click()
    }

    reverterBalanco () {
        cy.get(ReverterBalancoLocator.botaoReverterBalanco).click()
    }

    verificarStatusAtualizado () {
        cy.get(ReverterBalancoLocator.statusBalanco).contains("Aguardando Finalização")
    }

    verificarToastSucesso () {
        cy.get(ReverterBalancoLocator.toastSucesso).contains("Balanço desfeito com Sucesso!")
    }
}

export default new ReverterBalancoPage()