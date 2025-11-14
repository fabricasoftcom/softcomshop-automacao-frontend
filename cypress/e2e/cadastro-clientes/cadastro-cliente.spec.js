import ClientePage from '../../support/pages/Cliente/ClientePage';
import CadastroClienteLocators from '../../support/locators/Cliente/CadastroClienteLocators';
import { generateRandomCustomer, generateRandomContact } from '../../support/factory/generateRandomData';

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

  it('deve realizar cadastro de cliente pessoa juridica', () => {
    ClientePage.visit();
    const cliente = generateRandomCustomer('JURIDICA');
    ClientePage.preencherCamposCliente(cliente);
    ClientePage.cadastrar();
    ClientePage.confirmacaoCadastroCliente();
  });

  it('deve salvar cliente com endereco completo e acessar aba Outros Enderecos', () => {
    ClientePage.visit();
    const cliente = generateRandomCustomer();
    ClientePage.preencherCamposCliente(cliente);
    ClientePage.configurarInterceptRedirecionamentoCliente();
    ClientePage.cadastrar();
    ClientePage.aguardarRedirecionamentoCliente();
    ClientePage.abrirAbaOutrosEnderecos();
    ClientePage.validarOutrosEnderecosSemResultados();
    ClientePage.abrirModalNovoEndereco();
    ClientePage.preencherModalEndereco({
      tipo: 'ENTREGA',
      cep: cliente.cep,
      numero: cliente.numero,
      endereco: cliente.endereco,
      cidade: cliente.cidade,
      bairro: cliente.bairro,
      complemento: cliente.complemento
    });
    ClientePage.salvarModalEndereco();
    ClientePage.validarEnderecoListado();
  });

  it('deve salvar cliente e acessar aba Contato/Notificacoes', () => {
    ClientePage.visit();
    const cliente = generateRandomCustomer();
    ClientePage.preencherCamposCliente(cliente);
    ClientePage.configurarInterceptRedirecionamentoCliente();
    ClientePage.cadastrar();
    ClientePage.aguardarRedirecionamentoCliente();
    ClientePage.abrirAbaContatoNotificacoes();
    ClientePage.validarContatoNotificacoesSemRegistro();
    ClientePage.abrirModalContato();
    const contato = generateRandomContact();
    ClientePage.preencherModalContato(contato);
    ClientePage.salvarModalContato();
    ClientePage.validarContatoListado();
  });
});
