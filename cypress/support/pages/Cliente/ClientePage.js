import listagemclientepage from "./listagemclientepage";
import clienteLocators from "../../locators/ClienteLocators";

class ClientePage {
  visit() {
    listagemclientepage.acessarCadastroNovoCliente();
  }

  preencherCamposCliente(cliente) {
    cy.percySnapshot();
    cy.get('#cpf_cnpj')
      .click()
      .type(cliente.cpf);
    cy.get('#nome').type(String(cliente.nome, { parseSpecialCharSequences: false }));
  }

  cadastrar() {
    cy.get('#btn-salvar').click();
    cy.wait(5000);
    cy.get(clienteLocators.botaoConfirmar).click(); // confirmação de cadastro para quando modulo fiscal ativo
  }

  confirmarCamposObrigatorios() {
    cy.get('.sweet-alert .confirm').click();
  }

  confirmacaoCadastroCliente() {
    cy.contains('Sucesso').should('be.visible')
  }
}

module.exports = new ClientePage();
