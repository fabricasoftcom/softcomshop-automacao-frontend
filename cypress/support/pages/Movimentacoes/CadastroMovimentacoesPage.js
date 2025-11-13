import MovimentacoesCadastroLocators from "../../locators/Movimentacoes/MovimentacoesCadastroLocators";

class CadastroMovimentacoesPage {
  verificarFormularioVisivel() {
    cy.get(MovimentacoesCadastroLocators.form).should("be.visible");
  }

  verificarCampoDataOperacao() {
    cy.get(MovimentacoesCadastroLocators.dataOperacaoInput).should("be.visible");
  }

  verificarSelectOperacao() {
    cy.get(MovimentacoesCadastroLocators.operacaoSelect).should("be.visible");
  }

  verificarCampoTipoAjuste() {
    cy.get(MovimentacoesCadastroLocators.tipoAjusteInput).should("be.visible");
  }

  verificarBotaoSalvar() {
    cy.get(MovimentacoesCadastroLocators.btnSalvar).should("be.visible");
  }

  verificarOperacaoEsperada(valor) {
    cy.get(MovimentacoesCadastroLocators.operacaoSelect).should("have.value", valor);
  }

  definirOperacao(valor) {
    cy.get(MovimentacoesCadastroLocators.operacaoSelect)
      .invoke("val", valor)
      .trigger("change");
    cy.wait(200);
  }

  setOperacao(valor) {
    cy.get(MovimentacoesCadastroLocators.operacaoSelect).select(valor);
  }

  preencherTipoAjuste(tipo) {
    cy.get(MovimentacoesCadastroLocators.tipoAjusteInput)
      .clear()
      .type(tipo, { force: true })
      .type("{enter}", { force: true });
    cy.get("#tipo_ajuste_id").invoke("val", "1").trigger("change");
    cy.get("#tipo_ajuste_id").should("not.have.value", "");
  }

  preencherObservacao(texto) {
    cy.get(MovimentacoesCadastroLocators.observacaoTextarea).clear().type(texto);
  }

  clicarSalvar() {
    cy.get(MovimentacoesCadastroLocators.btnSalvar).click();
  }

  verificarFormularioExpandido() {
    cy.get("#tabs-produto").should("be.visible");
    cy.get("#btn-clonar").should("be.visible");
    cy.get("#btn-excluir").should("be.visible");
    cy.get("#btn-imprimir").should("be.visible");
    cy.get("#div-itens-list").should("be.visible");
  }
}

export default new CadastroMovimentacoesPage();
