import listagemclientepage from "./listagemclientepage";
import clienteLocators from "../../locators/ClienteLocators";
import cadastroClienteLocators from "../../locators/Cliente/CadastroClienteLocators";

class ClientePage {
  visit() {
    listagemclientepage.acessarCadastroNovoCliente();
    cy.get(cadastroClienteLocators.formPessoaFisica).should('be.visible');
  }

  verificarLayoutBasico() {
    cy.get(cadastroClienteLocators.containerTabs).should('be.visible');
    cy.get(cadastroClienteLocators.abaDadosCadastrais).should('be.visible');
    cy.get(cadastroClienteLocators.abasExtras).should('have.length.greaterThan', 0);
    cy.get(cadastroClienteLocators.btnVoltar).should('be.visible');
    cy.get(cadastroClienteLocators.btnNovo).should('be.visible');
  }

  preencherCamposCliente(cliente) {
    cy.percySnapshot('cadastro-cliente-dados-cadastrais');

    cy.get(cadastroClienteLocators.selectPessoa).select(cliente.pessoa || 'FISICA');

    cy.get(cadastroClienteLocators.inputCpfCnpj)
      .clear()
      .click()
      .type(cliente.cpf, { log: false });

    cy.get(cadastroClienteLocators.inputNome)
      .clear()
      .type(cliente.nome, { parseSpecialCharSequences: false });

    if (cliente.inscricaoEstadual) {
      cy.get(cadastroClienteLocators.inputInscricaoEstadual).clear().type(cliente.inscricaoEstadual);
    }

    if (cliente.rg) {
      cy.get(cadastroClienteLocators.inputRg).clear().type(cliente.rg);
    }

    if (cliente.cep) {
      cy.get(cadastroClienteLocators.inputCep).clear().type(cliente.cep);
    }

    if (cliente.endereco) {
      cy.get(cadastroClienteLocators.inputEndereco).clear().type(cliente.endereco);
    }

    if (cliente.numero) {
      cy.get(cadastroClienteLocators.inputNumero).clear().type(`${cliente.numero}`);
    }

    if (cliente.complemento) {
      cy.get(cadastroClienteLocators.inputComplemento).clear().type(cliente.complemento);
    }

    if (cliente.observacao) {
      cy.get(cadastroClienteLocators.textareaObservacao).type(cliente.observacao);
    }
  }

  alternarSwitchesEstado() {
    this.toggleSwitch(
      cadastroClienteLocators.switchBloqueadoToggle,
      cadastroClienteLocators.switchBloqueadoCheckbox
    );
    this.toggleSwitch(
      cadastroClienteLocators.switchDesativadoToggle,
      cadastroClienteLocators.switchDesativadoCheckbox
    );
  }

  toggleSwitch(toggleSelector, checkboxSelector) {
    cy.get(toggleSelector).click({ force: true });
    cy.get(checkboxSelector).should('be.checked');

    cy.get(toggleSelector).click({ force: true });
    cy.get(checkboxSelector).should('not.be.checked');
  }

  cadastrar() {
    cy.intercept('POST', '**/cadastro/cliente/salvar').as('salvarCliente');
    cy.get(cadastroClienteLocators.btnSalvar).click();
    cy.wait('@salvarCliente');
    cy.get(clienteLocators.botaoConfirmar).click({ force: true });
  }

  confirmarCamposObrigatorios() {
    cy.get('.sweet-alert .confirm').click();
  }

  confirmacaoCadastroCliente() {
    cy.contains('Sucesso', { matchCase: false }).should('be.visible');
  }
}

module.exports = new ClientePage();
