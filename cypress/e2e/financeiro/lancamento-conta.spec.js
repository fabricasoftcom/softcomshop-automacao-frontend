import LancamentoContaPage from '../../support/pages/Financeiro/LancamentoContaPage';
import { faker } from '@faker-js/faker';

describe('Testes de Lançamento Conta', { tags: ['@lancamento-conta', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    LancamentoContaPage.visit();
  });

  it('Deve realizar lançamento conta completo', () => {
    // Valida que o modal está visível
    LancamentoContaPage.validarTelaVisivel();

    // Operação já vem com DÉBITO selecionado por padrão, não precisa alterar

    // Seleciona categoria
    LancamentoContaPage.selecionarCategoria('DESPESA');

    // Preenche descrição
    const descricaoTeste = `Teste automatizado de lançamento conta - ${new Date().toLocaleString()}`;
    LancamentoContaPage.preencherDescricao(descricaoTeste);

    // Seleciona conta
    LancamentoContaPage.selecionarConta('CAIXA');

    // Seleciona forma de pagamento
    LancamentoContaPage.selecionarFormaPagamento('ESPÉCIE');

    // Tipo data já vem com VENCIMENTO selecionado por padrão, não precisa alterar

    // Preenche data (usa data atual)
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    LancamentoContaPage.preencherData(dataAtual);

    // Preenche valor
    const valorAleatorio = faker.number.float({ min: 1, max: 999, precision: 0.01 }).toFixed(2).replace('.', ',');
    LancamentoContaPage.preencherValor(valorAleatorio);

    // Salva o lançamento
    LancamentoContaPage.salvar();

    // Valida mensagem de sucesso
    LancamentoContaPage.validarSucesso();
  });

  it('Deve validar que a tela está visível ao acessar', () => {
    LancamentoContaPage.validarTelaVisivel();
  });

  it('Deve realizar lançamento conta com operação CRÉDITO', () => {
    // Valida que o modal está visível
    LancamentoContaPage.validarTelaVisivel();

    // Seleciona operação CRÉDITO
    LancamentoContaPage.selecionarOperacao('CRÉDITO');

    // Aguarda um momento para o formulário atualizar após mudança de operação
    cy.get('#loading').should('not.exist');

    // Seleciona categoria (pode ser RECEITA para CRÉDITO)
    LancamentoContaPage.selecionarCategoria('RECEITA');

    // Preenche descrição
    const descricaoTeste = `Teste automatizado CRÉDITO - ${new Date().toLocaleString()}`;
    LancamentoContaPage.preencherDescricao(descricaoTeste);

    // Seleciona conta
    LancamentoContaPage.selecionarConta('CAIXA');

    // Seleciona forma de pagamento
    LancamentoContaPage.selecionarFormaPagamento('ESPÉCIE');

    // Tipo data já vem com VENCIMENTO selecionado por padrão, não precisa alterar

    // Preenche data (usa data atual)
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    LancamentoContaPage.preencherData(dataAtual);

    // Preenche valor
    const valorAleatorio = faker.number.float({ min: 1, max: 999, precision: 0.01 }).toFixed(2).replace('.', ',');
    LancamentoContaPage.preencherValor(valorAleatorio);

    // Salva o lançamento
    LancamentoContaPage.salvar();

    // Valida mensagem de sucesso
    LancamentoContaPage.validarSucesso();
  });

  it('Deve realizar lançamento conta com tipo de data LANÇAMENTO', () => {
    // Valida que o modal está visível
    LancamentoContaPage.validarTelaVisivel();

    // Operação já vem com DÉBITO selecionado por padrão, não precisa alterar

    // Seleciona categoria
    LancamentoContaPage.selecionarCategoria('DESPESA');

    // Preenche descrição
    const descricaoTeste = `Teste automatizado LANÇAMENTO - ${new Date().toLocaleString()}`;
    LancamentoContaPage.preencherDescricao(descricaoTeste);

    // Seleciona conta
    LancamentoContaPage.selecionarConta('CAIXA');

    // Seleciona forma de pagamento
    LancamentoContaPage.selecionarFormaPagamento('ESPÉCIE');

    // Seleciona tipo de data LANÇAMENTO
    LancamentoContaPage.selecionarTipoData('LANÇAMENTO');

    // Preenche data (usa data atual)
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    LancamentoContaPage.preencherData(dataAtual);

    // Preenche valor
    const valorAleatorio = faker.number.float({ min: 1, max: 999, precision: 0.01 }).toFixed(2).replace('.', ',');
    LancamentoContaPage.preencherValor(valorAleatorio);

    // Salva o lançamento
    LancamentoContaPage.salvar();

    // Valida mensagem de sucesso
    LancamentoContaPage.validarSucesso();
  });

  it('Deve cancelar lançamento clicando em Voltar', () => {
    // Valida que o modal está visível
    LancamentoContaPage.validarTelaVisivel();

    // Preenche alguns campos (opcional, apenas para simular preenchimento)
    LancamentoContaPage.preencherDescricao('Teste cancelamento');
    LancamentoContaPage.preencherValor('100,00');

    // Clica em Voltar para cancelar
    LancamentoContaPage.voltar();

    // Valida que o modal foi fechado
    LancamentoContaPage.validarModalFechado();
  });

  it('Deve exibir erro ao tentar salvar sem preencher campos obrigatórios', () => {
    // Valida que o modal está visível
    LancamentoContaPage.validarTelaVisivel();

    // Tenta salvar sem preencher campos obrigatórios
    // (categoria, conta, forma pagamento, descrição, valor são obrigatórios)
    LancamentoContaPage.salvar();

    // Valida mensagem de erro
    LancamentoContaPage.validarErroCamposObrigatorios();
  });
});

