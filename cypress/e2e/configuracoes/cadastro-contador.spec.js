import CadastroContadorPage from '../../support/pages/Contador/CadastroContadorPage';
import CadastroContadorLocators from '../../support/locators/Contador/CadastroContadorLocators';
import { faker } from '@faker-js/faker';
import { cpf } from 'cpf-cnpj-validator';

const generateValidCPF = () => {
  return cpf.generate();
};

const generateRandomContador = () => {
  return {
    cpf: generateValidCPF(),
    crc: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
    email: faker.internet.email(),
    nome: faker.person.fullName(),
    fone: faker.phone.number('###########'),
    fax: faker.phone.number('###########'),
    cep: faker.location.zipCode('#####-###'),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 9999 }).toString(),
    complemento: faker.location.secondaryAddress(),
    bairro: 'CENTRO',
    cidade: 'SAO PAULO - SP',
  };
};

describe('Cadastro de contador', { tags: ['@configuracoes', '@contador', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir os botoes principais do formulario', () => {
    CadastroContadorPage.visit();
    CadastroContadorPage.verificarLayoutBasico();
  });

  it('deve realizar cadastro completo de contador com todos os campos', () => {
    CadastroContadorPage.visit();
    const contador = generateRandomContador();
    CadastroContadorPage.preencherFormulario(contador);
    CadastroContadorPage.salvar();
    CadastroContadorPage.validarMensagemSucesso();
  });

  it('deve realizar cadastro completo de contador apenas com campos obrigatorios', () => {
    CadastroContadorPage.visit();
    const contador = {
      cpf: generateValidCPF(),
      crc: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
      email: faker.internet.email(),
      nome: faker.person.fullName(),
    };
    CadastroContadorPage.preencherFormulario(contador);
    CadastroContadorPage.salvar();
    CadastroContadorPage.validarMensagemSucesso();
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    CadastroContadorPage.visit();
    CadastroContadorPage.tentarSalvarSemCamposObrigatorios();
    CadastroContadorPage.validarErroCamposObrigatorios();
  });

  it('deve retornar para home ao clicar em Voltar', () => {
    CadastroContadorPage.visit();
    CadastroContadorPage.clicarBotaoVoltar();
    CadastroContadorPage.validarRetornoHome();
  });

  it('deve validar autocomplete de bairro', () => {
    CadastroContadorPage.visit();
    CadastroContadorPage.selecionarBairro('CENTRO');
    cy.get(CadastroContadorLocators.hiddenBairro)
      .invoke('val')
      .should('not.be.empty');
  });

  it('deve validar autocomplete de cidade', () => {
    CadastroContadorPage.visit();
    CadastroContadorPage.selecionarCidade('SAO PAULO - SP');
    cy.get(CadastroContadorLocators.hiddenCidade)
      .invoke('val')
      .should('not.be.empty');
  });
});

