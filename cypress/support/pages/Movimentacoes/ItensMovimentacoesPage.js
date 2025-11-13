import MovimentacoesItensLocators from "../../locators/Movimentacoes/MovimentacoesItensLocators";

class ItensMovimentacoesPage {
  verificarPainelVisivel() {
    cy.get(MovimentacoesItensLocators.painelItens).should("be.visible");
    cy.get(MovimentacoesItensLocators.formItens).should("be.visible");
  }

  verificarCamposBasicos() {
    cy.get(MovimentacoesItensLocators.produtoAutocomplete).should("be.visible");
    cy.get(MovimentacoesItensLocators.quantidadeInput).should("be.visible");
    cy.get(MovimentacoesItensLocators.precoInput).should("be.visible");
  }

  selecionarPrimeiroProdutoDisponivel() {
    cy.get(MovimentacoesItensLocators.produtoIcon).click({ force: true });
    cy.get(".typeahead-result li:first-child a", { timeout: 10000 }).click({ force: true });
  }

  preencherQuantidade(valor) {
    cy.get(MovimentacoesItensLocators.quantidadeInput)
      .clear()
      .type(valor);
  }

  preencherPreco(valor) {
    cy.get(MovimentacoesItensLocators.precoInput)
      .clear()
      .type(valor);
  }

  verificarTabelaDeItens() {
    cy.get(MovimentacoesItensLocators.tableItens).should("be.visible");
  }

  clicarSalvarItem() {
    cy.get(MovimentacoesItensLocators.btnSalvarItem).click();
  }

  verificarLinhasVisiveis(maiorQue = 0) {
    cy.get(MovimentacoesItensLocators.tableRows).its("length").should("be.gte", maiorQue);
  }

  verificarTotais(itens, volumes, total) {
    cy.get(MovimentacoesItensLocators.totalItens).should("contain.text", itens);
    cy.get(MovimentacoesItensLocators.totalVolumes).should("contain.text", volumes);
    cy.get(MovimentacoesItensLocators.totalGeral).should("contain.text", total);
  }
}

export default new ItensMovimentacoesPage();
