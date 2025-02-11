import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";
import ContaCorrenteEdicaoPage from "../../support/pages/Financeiro/ContaCorrenteEdicaoPage";

describe('Testes de Edição de Conta Corrente', { tags: ['@edicao-conta-corrente', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    ListagemContasPage.visit();
  });

  it('Deve acessar uma conta ativa com nome "Banco" e validar os campos preenchidos', () => {
    // Seleciona a primeira conta ativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();

    // Valida os campos na tela de edição
    ContaCorrenteEdicaoPage.validarCamposPreenchidos();
  });

  it('Deve desativar uma conta ativa', () => {
    // Seleciona a primeira conta ativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();

    // Desativa a conta
    ContaCorrenteEdicaoPage.desativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "desativado"
    cy.get('#div_active > .switchery').should('have.attr', 'style').and('include', 'border-color: rgb(223, 223, 223)');
  });
it('Deve alterar o último número da remessa, salvar e validar a alteração', () => {
    // Seleciona uma conta ativa para edição
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();

    // Gera um novo número de remessa
    const novoNumeroRemessa = '9999';

    // Altera o campo "último número da remessa"
    ContaCorrenteEdicaoPage.alterarUltimoNumeroRemessa(novoNumeroRemessa);

    // Salva as alterações
    ContaCorrenteEdicaoPage.salvar();

    // Valida a mensagem de sucesso
    ContaCorrenteEdicaoPage.validarSucesso();

    // Valida que o "último número da remessa" foi alterado
    ContaCorrenteEdicaoPage.validarUltimoNumeroRemessa(novoNumeroRemessa);
});

  it('Deve ativar uma conta inativa', () => {
    // Seleciona a primeira conta inativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoInativa();

    // Ativa a conta
    ContaCorrenteEdicaoPage.ativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "ativado"
    cy.get('#div_active > .switchery').should('have.attr', 'style').and('include', 'border-color: rgb(255, 192, 103)');
  });
});
