import ListagemCategoriasPage from "../../support/pages/Financeiro/ListagemCategoriasPage";

describe('Testes de Listagem de Categorias', { tags: ['@listagem-categorias', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ListagemCategoriasPage.visit();
  });

  it('Deve exibir a página de listagem de categorias corretamente', () => {
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
    ListagemCategoriasPage.verificarSecaoReceitaVisivel();
    ListagemCategoriasPage.verificarSecaoDespesaVisivel();
    ListagemCategoriasPage.verificarBotaoNovaCategoriaReceitaVisivel();
    ListagemCategoriasPage.verificarBotaoNovaCategoriaDespesaVisivel();
  });

  it('Deve clicar no botão de nova categoria de receita', () => {
    cy.get('button.btn-warning:contains("Nova Categoria de Receita")').should('be.visible').click();
    cy.get('#loading').should('not.exist');
  });

  it('Deve clicar no botão de nova categoria de despesa', () => {
    cy.get('button.btn-warning:contains("Nova Categoria de Despesa")').should('be.visible').click();
    cy.get('#loading').should('not.exist');
  });

  it('Deve filtrar categorias de receita por "Todas"', () => {
    ListagemCategoriasPage.filtrarReceitaTodas();
  });

  it('Deve filtrar categorias de receita por "Ativas"', () => {
    ListagemCategoriasPage.filtrarReceitaAtivas();
  });

  it('Deve filtrar categorias de receita por "Inativas"', () => {
    ListagemCategoriasPage.filtrarReceitaInativas();
  });

  it('Deve filtrar categorias de despesa por "Todas"', () => {
    ListagemCategoriasPage.filtrarDespesaTodas();
  });

  it('Deve filtrar categorias de despesa por "Ativas"', () => {
    ListagemCategoriasPage.filtrarDespesaAtivas();
  });

  it('Deve filtrar categorias de despesa por "Inativas"', () => {
    ListagemCategoriasPage.filtrarDespesaInativas();
  });
});

