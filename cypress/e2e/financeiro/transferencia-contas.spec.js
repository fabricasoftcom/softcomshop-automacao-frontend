import TransferenciaContasPage from '../../support/pages/Financeiro/TransferenciaContasPage';

describe('Testes de Transferência Entre Contas', { tags: ['@transferencia-contas', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessaoCobranca();
    cy.visit('/');
    TransferenciaContasPage.visit();
  });

  it('Deve realizar transferência completa entre contas', () => {
    // Preenche conta origem
    TransferenciaContasPage.selecionarContaOrigem('CAIXA');

    // Preenche conta destino
    TransferenciaContasPage.selecionarContaDestino('COFRE');

    // Preenche descrição
    TransferenciaContasPage.preencherDescricao('Transferência de teste automatizado');

    // Preenche valor
    TransferenciaContasPage.preencherValor('100,00');

    // Salva a transferência
    TransferenciaContasPage.salvar();

    // Valida mensagem de sucesso
    TransferenciaContasPage.validarSucesso();
  });

  it('Deve validar que o modal está visível ao acessar a página', () => {
    TransferenciaContasPage.validarModalVisivel();
  });

  it('Deve exibir erro ao tentar salvar sem preencher campos obrigatórios', () => {
    // Valida que o modal está visível
    TransferenciaContasPage.validarModalVisivel();

    // Tenta salvar sem preencher campos obrigatórios
    // (conta origem, conta destino, valor são obrigatórios)
    TransferenciaContasPage.salvar();

    // Valida mensagem de erro
    TransferenciaContasPage.validarErroCamposObrigatorios();
  });

  it('Deve exibir erro ao tentar transferir de uma conta para ela mesma', () => {
    // Seleciona mesma conta para origem e destino
    TransferenciaContasPage.selecionarContaOrigem('CAIXA');
    TransferenciaContasPage.selecionarContaDestino('CAIXA');

    // Preenche outros campos obrigatórios
    TransferenciaContasPage.preencherDescricao('Teste de validação');
    TransferenciaContasPage.preencherValor('100,00');

    // Tenta salvar
    TransferenciaContasPage.salvar();

    // Valida mensagem de erro
    TransferenciaContasPage.validarErroContaOrigemIgualDestino();
  });

  it('Deve cancelar a operação ao clicar no botão Voltar', () => {
    // Preenche todos os campos
    TransferenciaContasPage.selecionarContaOrigem('CAIXA');
    TransferenciaContasPage.selecionarContaDestino('COFRE');
    TransferenciaContasPage.preencherDescricao('Teste de cancelamento');
    TransferenciaContasPage.preencherValor('100,00');

    // Clica em Voltar
    TransferenciaContasPage.voltar();

    // Valida que modal foi fechado
    TransferenciaContasPage.validarModalFechado();

    // Valida que não há toast de sucesso
    cy.get('body').then(($body) => {
      if ($body.find('.Toastify__toast--success').length > 0) {
        cy.get('.Toastify__toast--success').should('not.exist');
      }
    });
  });

  it('Deve exibir erro ao tentar transferir valor zero', () => {
    // Preenche contas origem e destino
    TransferenciaContasPage.selecionarContaOrigem('CAIXA');
    TransferenciaContasPage.selecionarContaDestino('COFRE');

    // Preenche descrição
    TransferenciaContasPage.preencherDescricao('Teste de valor zero');

    // Preenche valor zero
    TransferenciaContasPage.preencherValor('0,00');

    // Tenta salvar
    TransferenciaContasPage.salvar();

    // Valida mensagem de erro
    TransferenciaContasPage.validarErroValorInvalido();
  });
});

