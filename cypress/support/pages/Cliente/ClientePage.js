class ClientePage {
    visit() {
      cy.visit('/cadastro/cliente/novo');
    }
  
    preencherCamposCliente(cliente) {
      cy.get('#cpf_cnpj')
        .click()
        .type(cliente.cpf);
      cy.get('#nome').type(String(cliente.nome, { parseSpecialCharSequences: false }));
    }
  
    cadastrar() {
      cy.get('#btn-salvar').click();
    }

    confirmacaoCadastroCliente() {
      cy.contains('Sucesso').should('be.visible')
    }
}
  
module.exports = new ClientePage();
  