import FornecedorLocators from "../../locators/FornecedorLocators"

class FornecedorPage {
    acessarPaginaFornecedor() {
        cy.visit('/cadastro/fornecedor/novo')
    }

    preencherCamposFornecedor(fornecedor) {
        cy.get(FornecedorLocators.novoCadastro).click()
        cy.get(FornecedorLocators.CNPJInput).click().type(fornecedor.CNPJ)
        cy.get(FornecedorLocators.nomeInput).click().type(fornecedor.nome)
        cy.get(FornecedorLocators.razaoSocialInput).click().type(fornecedor.razaoSocial)
    }

    cadastrar() {
        cy.get(FornecedorLocators.btnSalvar).click()
    }

    confirmacaoCadastroFornecedor() {
        cy.contains('Sucesso').should('be.visible')
      }
}

module.exports = new FornecedorPage();
