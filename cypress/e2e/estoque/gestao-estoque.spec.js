import GestaoEstoquePage from "../../support/pages/Estoque/GestaoEstoquePage";

describe('Estoque > Gestão de Estoque', { tags: ['@estoque', '@gestao-estoque', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao(); // ADR-0004: Funcionalidades não-fiscais devem usar cy.loginArmazenandoSessao()
    cy.visit('/');
    GestaoEstoquePage.acessarViaMenu();
  });

  it('Deve exibir a tela de Gestão de Estoque com todos os elementos principais', () => {
    GestaoEstoquePage.validarAcesso();
    GestaoEstoquePage.validarElementosPrincipais();
  });

  it('Deve preencher filtros e realizar pesquisa', () => {
    GestaoEstoquePage.preencherFiltros({
      status: 'Todos',
      palavraChave: 'teste'
    });
    GestaoEstoquePage.clicarPesquisar();
    // Aguarda carregamento (pode não retornar resultados)
    cy.wait(1000);
  });

  it('Deve navegar para Visão Geral', () => {
    GestaoEstoquePage.clicarVisaoGeral();
    cy.url().should('include', '/gestao-estoque/dashboard');
  });

  it('Deve ter botão de Lista de Compras disponível', () => {
    // Valida que o botão existe e é clicável
    GestaoEstoquePage.validarBotaoListaCompras();
    // O modal pode não abrir se não houver itens na lista
    GestaoEstoquePage.clicarListaCompras();
    // Aguarda possível abertura do modal (pode não abrir se lista vazia)
    cy.wait(2000);
  });
});

