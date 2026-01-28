import FormaPagamentoCadastroPage from '../../support/pages/Configuracoes/FormaPagamentoCadastroPage';
import FormaPagamentoListagemPage from '../../support/pages/Configuracoes/FormaPagamentoListagemPage';
const { faker } = require('@faker-js/faker');

describe('Cadastro de forma de pagamento', { tags: ['@configuracoes', '@forma-pagamento', '@cadastro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    FormaPagamentoCadastroPage.visit();
  });

  it('deve exibir os botoes principais do formulario', () => {
    FormaPagamentoCadastroPage.verificarLayoutBasico();
  });

  it('deve realizar cadastro completo de forma de pagamento apenas com campos obrigatorios', () => {
    const dataHoraAtual = obterDataHoraAtual();
    const descricao = `FORMA_PAG_TESTE_${dataHoraAtual}`;
    FormaPagamentoCadastroPage.preencherFormulario({
      descricao,
      tipo: 'ESPECIE',
      codigo:'01 - Dinheiro'
    });
    FormaPagamentoCadastroPage.salvar();

    // Validar que retornou para a listagem
    FormaPagamentoListagemPage.validarTabelaCarregada();
    FormaPagamentoListagemPage.validarFormaPagamentoExiste(descricao);
  });

  it('deve realizar cadastro completo de forma de pagamento com todos os campos', () => {
    const dataHoraAtual = obterDataHoraAtual();
    const descricao = `FORMA_PAG_COMPLETA_${dataHoraAtual}`;
    FormaPagamentoCadastroPage.preencherFormulario({
      descricao,
      tipo: 'DUPLICATA',
      atalhoNumero: faker.number.int({ min: 1, max: 99 }),
      codigo: '99 - Outros',
      adquirente: faker.company.name(),
      pos: true,
      integrarApi: true,
      exibirPagamento: true,
      preVenda: false,
      saldoCaixa: true
    });
    FormaPagamentoCadastroPage.salvar();

    // Validar que retornou para a listagem
    FormaPagamentoListagemPage.validarTabelaCarregada();
    FormaPagamentoListagemPage.validarFormaPagamentoExiste(descricao);
  });

  it('deve exibir erro ao tentar salvar sem preencher campos obrigatorios', () => {
    FormaPagamentoCadastroPage.tentarSalvarSemCamposObrigatorios();
    FormaPagamentoCadastroPage.validarErroCamposObrigatorios();
  });

  it('deve fechar o modal ao clicar no botao Fechar', () => {
    FormaPagamentoCadastroPage.clicarBotaoFechar();
    FormaPagamentoCadastroPage.validarModalFechado();
  });

  it('deve realizar cadastro com tipo CARTAO', () => {
    const dataHoraAtual = obterDataHoraAtual();
    const descricao = `CARTAO_TESTE_${dataHoraAtual}`;
    FormaPagamentoCadastroPage.preencherFormulario({
      descricao,
      tipo: 'CARTAO',
      codigo:'03 - Cartão Crédito',
      integrarApi: true
    });
    FormaPagamentoCadastroPage.salvar();
    FormaPagamentoListagemPage.validarFormaPagamentoExiste(descricao);
  });

  it('deve realizar cadastro com tipo BOLETO', () => {
    const dataHoraAtual = obterDataHoraAtual();
    const descricao = `BOLETO_TESTE_${dataHoraAtual}`;
    FormaPagamentoCadastroPage.preencherFormulario({
      descricao,
      tipo: 'BOLETO',
      codigo:'99 - Outros',
    });
    FormaPagamentoCadastroPage.salvar();
    FormaPagamentoListagemPage.validarFormaPagamentoExiste(descricao);
  });
  function obterDataHoraAtual() {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  }
});

