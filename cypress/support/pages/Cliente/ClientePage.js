import listagemclientepage from "./listagemclientepage";

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
  }

  confirmarCamposObrigatorios() {
    cy.get('.confirm').click();
  }

  confirmacaoCadastroCliente() {
    cy.contains('Sucesso').should('be.visible')
  }
}

module.exports = new ClientePage();
