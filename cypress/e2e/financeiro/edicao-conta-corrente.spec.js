import ListagemContasPage from "../../support/pages/Financeiro/ListagemContasPage";
import ContaCorrenteEdicaoPage from "../../support/pages/Financeiro/ContaCorrenteEdicaoPage";

describe('Testes de Edição de Conta Corrente', { tags: ['@edicao-conta-corrente', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ListagemContasPage.visit();
  });

  // it('Deve acessar uma conta ativa com nome "Banco" e validar os campos preenchidos', () => {
  //   // Seleciona a primeira conta ativa com "Banco" no nome
  //   ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
  //   cy.get('#loading').should('not.exist');
  //   // Valida os campos na tela de edição
  //   ContaCorrenteEdicaoPage.validarCamposPreenchidos();
  // });

  it('Deve desativar uma conta ativa', () => {
    // Seleciona a primeira conta ativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
    cy.get('#loading').should('not.exist');
    // Desativa a conta
    cy.wait(5000)
    ContaCorrenteEdicaoPage.desativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "desativado"
    cy.get('#div_active .switchery small')
      .invoke('attr', 'style')
      .should('not.include', 'left: 20px'); // Inativo (desligado)
  });
  // it('Deve alterar o último número da remessa, salvar e validar a alteração', () => {
  //     // Seleciona uma conta ativa para edição
  //     ListagemContasPage.selecionarPrimeiraContaBancoAtiva();
  //     cy.get('#loading').should('not.exist');
  //     // Gera um novo número de remessa
  //     const novoNumeroRemessa = '9999';

  //     // Altera o campo "último número da remessa"
  //     ContaCorrenteEdicaoPage.alterarUltimoNumeroRemessa(novoNumeroRemessa);

  //     // Salva as alterações
  //     ContaCorrenteEdicaoPage.salvar();

  //     // Valida a mensagem de sucesso
  //     ContaCorrenteEdicaoPage.validarSucesso();

  //     // Valida que o "último número da remessa" foi alterado
  //     ContaCorrenteEdicaoPage.validarUltimoNumeroRemessa(novoNumeroRemessa);
  // });

  it('Deve ativar uma conta inativa', () => {
    // Seleciona a primeira conta inativa com "Banco" no nome
    ListagemContasPage.selecionarPrimeiraContaBancoInativa();
    cy.get('#loading').should('not.exist');
    // Ativa a conta
    cy.wait(5000)
    ContaCorrenteEdicaoPage.ativarConta();
    ContaCorrenteEdicaoPage.salvar();
    ContaCorrenteEdicaoPage.validarSucesso();

    // Verifica que o switch mudou para a aparência de "ativado"
    cy.get('#div_active > .switchery').should('have.attr', 'style').and('include', 'border-color: rgb(255, 192, 103)');
  });
});
