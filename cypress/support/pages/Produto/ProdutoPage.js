class ProdutoPage {
    visit() {
      cy.visit('/produto/novo');
    }
  
    preencherDetalhesDoProduto(produto) {
      cy.get('#nome').type(produto.nome);
      cy.get('#auto_icon_grupo_id').click()
      cy.xpath('//*[@id="div_auto_grupo_id"]/div/div[2]/ul/li[2]/a')
        .should('be.visible')
        .click();
      cy.get('#auto_icon_unidade_medida_id').click()
      cy.xpath('//*[@id="div_auto_unidade_medida_id"]/div/div[2]/ul/li/a')
        .should('be.visible')
        .click();
      cy.get('#preco_compra').type(produto.preco_compra);
      cy.get('#margem_lucro').type(produto.margem_lucro)
      cy.get('#preco_venda').type(produto.preco_venda);
      cy.get('#percentual_comissao_produto').type(produto.percentual_comissao);
    }
  
    cadastrar() {
      cy.get('#btn-salvar').click()
    }

    confirmacaoCadastroProduto() {
      cy.contains('Sucesso').should('be.visible')
    }
}
  
module.exports = new ProdutoPage();
  