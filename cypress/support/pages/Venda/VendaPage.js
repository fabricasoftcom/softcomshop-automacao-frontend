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
      cy.get('#auto_icon_produto_empresa_grade_id_').click();
      cy.xpath("//strong[@class='autocomplete-color-primary'][contains(.,'coca-cola lata 350ml')]").click()

    }

    adicionarPagamento() {
      cy.get('#btn-gerar-pagamento').should('be.visible')
      cy.get('#btn-gerar-pagamento').click()
      cy.get('#auto_icon_forma_pagamento_id').click()
      cy.xpath('//*[@id="div_auto_forma_pagamento_id"]/div/div[2]/ul/li[4]/a').click()
      cy.get('#auto_icon_cartao_credito_id').click()
      cy.xpath('//*[@id="div_auto_cartao_credito_id"]/div/div[2]/ul/li[2]/a').click()
    }

    salvarPagamento() {
      cy.xpath("//button[@type='submit'][contains(.,'Salvar')]").click()
    }

    gerarNFCe() {
      cy.xpath("//a[contains(@class,'btn-choice btn btn-primary')]").click()
      cy.xpath("(//a[contains(@id,'gerar-nota-fiscal-consumidor')])[2]").click()
    }

    confirmacaoEmissaoNFCe() {
      cy.contains('Nota sincronizada').should('be.visible')
    }
}
  
module.exports = new VendaPage();
  