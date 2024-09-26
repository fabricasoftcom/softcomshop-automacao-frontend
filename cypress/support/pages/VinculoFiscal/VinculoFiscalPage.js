class VinculoFiscalPage {
    acessarMenuDetalhesFiscais() {
        cy.get('#tabs-detalhes-fiscais').click()
        cy.contains('Detalhes Fiscais').should('be.visible')
    }

    selecionarEmpresaMatriz() {
        cy.xpath('//*[@id="detalhes-fiscais"]/div/div/div[2]/div/div/div[1]/a').click()
        cy.contains('Informações Fiscais').should('be.visible')
    }

    selecionarVinculoFiscal() {
        cy.get('#auto_icon_vinculo_fiscal_id').click()
        cy.xpath('//*[@id="div_auto_vinculo_fiscal_id"]/div/div[2]/ul/li[1]/a').click()
    }

    salvarVinculoFiscal() {
        cy.get('#btn-salvar').click()
    }

    confirmacaoCadastroVinculoFiscal() {
      cy.contains('Sucesso').should('be.visible')
    }
}

module.exports = new VinculoFiscalPage()
