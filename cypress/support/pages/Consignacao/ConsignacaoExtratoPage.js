import ConsignacaoExtratoLocators from "../../locators/Consignacao/ConsignacaoExtratoLocators";

class ConsignacaoExtratoPage {
  acessarViaMenu() {
    // Acessar via menu: Vendas e NF-e > Consignação > Extrato
    cy.expandirClicarMenuDoisNiveis('Vendas e NF-e', '#consignação', '#extrato');
  }

  validarAcesso() {
    cy.url().should('include', '/consignacao/extrato');
    cy.get(ConsignacaoExtratoLocators.titulo).should('be.visible');
  }

  validarFormulario() {
    cy.get(ConsignacaoExtratoLocators.campoPeriodo).should('be.visible');
    cy.get(ConsignacaoExtratoLocators.campoCliente).should('be.visible');
    cy.get(ConsignacaoExtratoLocators.campoProduto).should('be.visible');
    cy.get(ConsignacaoExtratoLocators.campoStatus).should('be.visible');
    cy.get(ConsignacaoExtratoLocators.btnPesquisar).should('be.visible');
  }

  preencherFormulario(dados) {
    if (dados.periodo) {
      cy.get(ConsignacaoExtratoLocators.campoPeriodo).clear().type(dados.periodo);
      // Fechar datepicker se estiver aberto
      cy.get('body').then(($body) => {
        if ($body.find('.daterangepicker').is(':visible')) {
          cy.get('body').type('{esc}');
          cy.wait(500);
        }
      });
    }
    if (dados.cliente) {
      cy.get(ConsignacaoExtratoLocators.campoCliente).clear().type(dados.cliente);
      cy.wait(1000);
      cy.get('body').then(($body) => {
        if ($body.find('.typeahead-container .typeahead-suggestion').length > 0) {
          cy.get('.typeahead-container .typeahead-suggestion:first-child').click();
        }
      });
    }
    if (dados.produto) {
      cy.get(ConsignacaoExtratoLocators.campoProduto).clear().type(dados.produto);
      cy.wait(1000);
      cy.get('body').then(($body) => {
        if ($body.find('.typeahead-container .typeahead-suggestion').length > 0) {
          cy.get('.typeahead-container .typeahead-suggestion:first-child').click();
        }
      });
    }
    if (dados.status) {
      // Garantir que o datepicker está fechado antes de selecionar
      cy.get('body').then(($body) => {
        if ($body.find('.daterangepicker').is(':visible')) {
          cy.get('body').type('{esc}');
          cy.wait(500);
        }
      });
      cy.get(ConsignacaoExtratoLocators.campoStatus).select(dados.status, { force: true });
    }
  }

  validarCamposPreenchidos(dados) {
    if (dados.periodo) {
      cy.get(ConsignacaoExtratoLocators.campoPeriodo).should('have.value', dados.periodo);
    }
    if (dados.status) {
      cy.get(ConsignacaoExtratoLocators.campoStatus).should('have.value', dados.status);
    }
    return this;
  }

  clicarPesquisar() {
    cy.get(ConsignacaoExtratoLocators.btnPesquisar).click();
  }

  validarTotalizadores() {
    cy.get(ConsignacaoExtratoLocators.totalGeral).should('be.visible');
    // Validar que a tabela de totalizadores existe (pode estar vazia)
    cy.get('h2:contains("Total Geral")').should('be.visible');
  }
}

export default new ConsignacaoExtratoPage();

