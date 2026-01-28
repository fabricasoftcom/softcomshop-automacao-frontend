import CartaoCadastroPage from '../../support/pages/Configuracoes/CartaoCadastroPage';
import CartaoListagemPage from '../../support/pages/Configuracoes/CartaoListagemPage';
import CartaoListagemLocators from '../../support/locators/Configuracoes/CartaoListagemLocators';
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
    const dataHoraAtual = obterDataHoraAtual();
    const nome = `CARTAO_TESTE_${dataHoraAtual}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      // alias,
      taxaAdministrativa: faker.number.float({ min: 1, max: 2, precision: 0.01 }).toFixed(2),
      dia: faker.number.int({ min: 1, max: 31 }),
      parcela: faker.number.int({ min: 1, max: 99 })
    });
    CartaoCadastroPage.salvar();

    // Validar que retornou para a listagem
    CartaoListagemPage.validarTabelaCarregada();
    CartaoListagemPage.validarCartaoExiste(nome);
  });

  it('deve realizar cadastro completo de cartao com todos os campos', () => {
    CartaoCadastroPage.visit();
    const dataHoraAtual = obterDataHoraAtual();
    const nome = `CARTAO_COMPLETO_${dataHoraAtual}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      // alias,
      taxaAdministrativa: faker.number.float({ min: 1, max: 2, precision: 0.01 }).toFixed(2),
      dia: faker.number.int({ min: 1, max: 31 }),
      parcela: faker.number.int({ min: 1, max: 99 }),
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
    const dataHoraAtual = obterDataHoraAtual();
    const nome = `CARTAO_CREDITO_${dataHoraAtual}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      // alias,
      taxaAdministrativa: 5.5,
      dia: 15,
      parcela: faker.number.int({ min: 1, max: 99 }),
      tipo: 'CRÉDITO'
    });
    CartaoCadastroPage.salvar();
    CartaoListagemPage.validarCartaoExiste(nome);
  });

  it('deve realizar cadastro com tipo DÉBITO', () => {
    CartaoCadastroPage.visit();
    const dataHoraAtual = obterDataHoraAtual();
    const nome = `CARTAO_DEBITO_${dataHoraAtual}`;
    CartaoCadastroPage.preencherFormulario({
      nome,
      // alias,
      taxaAdministrativa: 2.5,
      dia: 10,
      parcela: faker.number.int({ min: 1, max: 99 }),
      tipo: 'DÉBITO'
    });
    CartaoCadastroPage.salvar();
    CartaoListagemPage.validarCartaoExiste(nome);
  });
  it('deve excluir todos os cartoes que comecam com CARTAO pela listagem (Excluir selecionados)', () => {
    CartaoListagemPage.acessarTelaListagem();
    CartaoListagemPage.validarTabelaCarregada();

    // Garantir que existe ao menos um cartão CARTAO* (nome na coluna 3, escopo .ibox-content)
    cy.get(CartaoListagemLocators.linhasTabelaListagem).then(($rows) => {
      const qtd = $rows.filter((i, el) => {
        const nome = Cypress.$(el).find(CartaoListagemLocators.colunaDescricao).text().trim();
        return nome.toUpperCase().startsWith('CARTAO');
      }).length;
      expect(qtd, 'Deve existir ao menos um cartão com nome começando em CARTAO').to.be.greaterThan(0);
    });

    CartaoListagemPage.selecionarLinhasQueComecamCom('CARTAO');
    CartaoListagemPage.clicarExcluirSelecionados();
    cy.wait(500);
    CartaoListagemPage.confirmarExclusaoModal();

    CartaoCadastroPage.validarMensagemSucesso();

  });

  function obterDataHoraAtual() {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  }

});

