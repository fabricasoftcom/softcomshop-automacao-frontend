import vinculoFiscalListagemPage from "../../support/pages/VinculoFiscal/VinculoFiscalListagemPage";

describe('Testes de Listagem de Vínculo Fiscal', () => {

  beforeEach(() => {
    cy.login();  // Assume que o comando de login já está configurado
    vinculoFiscalListagemPage.visit();  // Visita a página de listagem
  });

//   it('Deve realizar cadastro de novo vínculo fiscal', () => {
//     vinculoFiscalListagemPage.novoCadastro();  // Clica no botão de novo cadastro
//     cy.url().should('include', '/novo');  // Verifica se a URL mudou para a página de cadastro
//     cy.get('h5:contains("Vínculo Fiscal")').should('be.visible');
//   });

// it('Deve excluir todos os itens selecionados', () => {
//     // Seleciona os itens para excluir (assumindo que os checkboxes estão marcados)
//     vinculoFiscalListagemPage.excluirSelecionados();  

//     cy.wait(5000)
//     // Confirma a exclusão
//     vinculoFiscalListagemPage.confirmarExclusao();  
//     vinculoFiscalListagemPage.validarAlerta();

//     // Verifica se a tabela foi atualizada (ou seja, os itens excluídos não estão mais na tabela)
//     vinculoFiscalListagemPage.tabelaVisivel();  // Verifica se a tabela ainda está visível

//     // Após a exclusão, pode ser necessário verificar se os itens foram removidos da tabela
//     vinculoFiscalListagemPage.tabelaContemLinhas(0);  // Verifica se a tabela não contém mais itens (exclusão concluída)
//   });

//   it('Deve editar um vínculo fiscal da tabela', () => {
//     vinculoFiscalListagemPage.editarLinha(0);  // Edita o primeiro vínculo fiscal da tabela
//     cy.url().should('include', '/editar');  // Verifica se a URL mudou para a página de edição
//   });

//   it('Deve verificar a pesquisa de vínculos fiscais', () => {
//     vinculoFiscalListagemPage.pesquisar('3', 'ICMS cobrado anteriormente por Substituição');
//     vinculoFiscalListagemPage.tabelaContemLinhas(1);  // Verifica que a pesquisa retornou 1 item
//   });

});
