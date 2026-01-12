import CartaoCadastroPage from '../../support/pages/Configuracoes/CartaoCadastroPage';
import CartaoListagemPage from '../../support/pages/Configuracoes/CartaoListagemPage';
const { faker } = require('@faker-js/faker');

describe('Cadastro de cartão', { tags: ['@configuracoes', '@cartao', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve exibir os botoes principais do formulario', () => {
    CartaoCadastroPage.visit();
    CartaoCadastroPage.verificarLayoutBasico();
  });

  it('deve realizar cadastro completo de cartao apenas com campos obrigatorios', () => {
    CartaoCadastroPage.visit();
    const nome = `CARTAO_TESTE_${faker.string.alphanumeric(8).toUpperCase()}`;
    const alias = `ALIAS_${faker.string.alphanumeric(6).toUpperCase()}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      alias,
      taxaAdministrativa: faker.number.float({ min: 1, max: 10, precision: 0.01 }),
      dia: faker.number.int({ min: 1, max: 31 }),
      parcela: faker.number.int({ min: 1, max: 12 })
    });
    CartaoCadastroPage.salvar();

    // Validar que retornou para a listagem
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.validarCartaoExiste(nome);
  });

  it('deve realizar cadastro completo de cartao com todos os campos', () => {
    CartaoCadastroPage.visit();
    const nome = `CARTAO_COMPLETO_${faker.string.alphanumeric(8).toUpperCase()}`;
    const alias = `ALIAS_${faker.string.alphanumeric(6).toUpperCase()}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      alias,
      taxaAdministrativa: faker.number.float({ min: 1, max: 10, precision: 0.01 }),
      dia: faker.number.int({ min: 1, max: 31 }),
      parcela: faker.number.int({ min: 1, max: 12 }),
      tipo: 'CRÉDITO'
    });
    CartaoCadastroPage.salvar();

    // Validar que retornou para a listagem
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.validarCartaoExiste(nome);
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    CartaoCadastroPage.visit();
    CartaoCadastroPage.tentarSalvarSemCamposObrigatorios();
    CartaoCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve fechar o modal ao clicar no botao Fechar', () => {
    CartaoCadastroPage.visit();
    CartaoCadastroPage.clicarBotaoFechar();
    CartaoCadastroPage.validarModalFechado();
  });

  it('deve realizar cadastro com tipo CRÉDITO', () => {
    CartaoCadastroPage.visit();
    const nome = `CARTAO_CREDITO_${faker.string.alphanumeric(8).toUpperCase()}`;
    const alias = `ALIAS_${faker.string.alphanumeric(6).toUpperCase()}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      alias,
      taxaAdministrativa: 5.5,
      dia: 15,
      parcela: 6,
      tipo: 'CRÉDITO'
    });
    CartaoCadastroPage.salvar();
    CartaoListagemPage.validarCartaoExiste(nome);
  });

  it('deve realizar cadastro com tipo DÉBITO', () => {
    CartaoCadastroPage.visit();
    const nome = `CARTAO_DEBITO_${faker.string.alphanumeric(8).toUpperCase()}`;
    const alias = `ALIAS_${faker.string.alphanumeric(6).toUpperCase()}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      alias,
      taxaAdministrativa: 2.5,
      dia: 10,
      parcela: 1,
      tipo: 'DÉBITO'
    });
    CartaoCadastroPage.salvar();
    CartaoListagemPage.validarCartaoExiste(nome);
  });
});

