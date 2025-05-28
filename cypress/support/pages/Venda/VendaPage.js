class VendaPage {
    acessarPaginaVenda() {
      cy.visit('/vendas/novo');
    }

    informarVendedor() {
      cy.percySnapshot();
      cy.get('#auto_icon_funcionario_id').click()
      cy.xpath('//*[@id="div_auto_funcionario_id"]/div/div[2]/ul/li[1]/a').click()
    }

    adicionarObservacao() {
      cy.get('#observacao').type('Venda realizada pela automação');
    }

    adicionarProduto() {
      cy.get('#auto_produto_empresa_grade_id_').type('combo');
      cy.xpath('//*[@id="div_auto_produto_empresa_grade_id_"]/div/div[2]/ul/li[1]/a').click();
    }

    adicionarPagamento() {
      cy.get('#btn-gerar-pagamento').should('be.visible')
      cy.get('#btn-gerar-pagamento').click()
      cy.get('#auto_icon_forma_pagamento_id').click()
    }

    salvarPagamento(){
      cy.get('.modal #btn-salvar').click();
    }

    gerarNFCe() {
      cy.xpath("//a[contains(@class,'btn-choice btn btn-primary')]").click()
      cy.xpath("(//a[contains(@id,'gerar-nota-fiscal-consumidor')])[2]").click()
    }

    confirmacaoEmissaoNFCe() {
      cy.contains('Nota Fiscal Consumidor').should('be.visible')
    }
}

module.exports = new VendaPage();
