import VinculoFiscalListagemPage from "../../support/pages/VinculoFiscal/VinculoFiscalListagemPage";

describe('Testes de Listagem de Vínculo Fiscal', { tags: ['@listagem-vinculo-fiscal', '@regressivo'] }, () => {

  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    VinculoFiscalListagemPage.visit();
  });

  it('Deve realizar cadastro de novo vínculo fiscal', () => {
    // Ação: Clicar em "Novo Cadastro"
    VinculoFiscalListagemPage.novoCadastro();

    // Validações: Redirecionamento e visibilidade do título
    cy.url().should('include', '/novo');
    cy.get('h5').should('contain', 'Vínculo Fiscal');
  });

  it.skip('Deve excluir todos os itens selecionados', () => {
    // Seleciona todos os registros da tabela
    VinculoFiscalListagemPage.selecionarTodosRegistros();

    // Ação: Excluir e confirmar a exclusão
    VinculoFiscalListagemPage.excluirSelecionados();
    VinculoFiscalListagemPage.confirmarExclusao();

    // Validações: Alerta de sucesso e tabela vazia
    VinculoFiscalListagemPage.validarAlerta();
    VinculoFiscalListagemPage.verificarTabelaVazia();
  });

  it('Deve editar o primeiro vínculo fiscal da tabela', () => {
    // Ação: Editar a primeira linha da tabela
    VinculoFiscalListagemPage.editarLinha(0);

    // Validações: Redirecionamento e visibilidade do título
    cy.url().should('include', '/editar');
  });
});
