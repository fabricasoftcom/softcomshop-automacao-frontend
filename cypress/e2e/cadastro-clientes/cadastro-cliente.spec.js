import ClientePage from '../../support/pages/Cliente/ClientePage';
import CadastroClienteLocators from '../../support/locators/Cliente/CadastroClienteLocators';
import { generateRandomCustomer } from '../../support/factory/generateRandomData';

describe('Cadastro de cliente', { tags: ['@cadastro-cliente', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir as abas e botoes principais do formulario', () => {
    ClientePage.visit();
    ClientePage.verificarLayoutBasico();
    cy.get(CadastroClienteLocators.formPessoaFisica).within(() => {
      cy.get(CadastroClienteLocators.selectPessoa).should('have.value', 'FISICA');
      cy.get(CadastroClienteLocators.btnSalvar).should('be.visible');
    });
  });

  it('deve alternar os switches de bloqueado e desativado', () => {
    ClientePage.visit();
    ClientePage.alternarSwitchesEstado();
  });

  it('Realizar cadastro de cliente', () => {
    ClientePage.visit();
    const cliente = generateRandomCustomer();
    ClientePage.preencherCamposCliente(cliente);
    ClientePage.cadastrar();
    ClientePage.confirmacaoCadastroCliente();
  });
});
