import ListagemContasAReceberPage from '../../support/pages/Financeiro/ListagemContasAReceberPage';
import ListagemContasAReceberLocators from '../../support/locators/ListagemContasAReceberLocators';

describe('Listagem de Contas a Receber', () => {
  beforeEach(() => {
    cy.login();
    ListagemContasAReceberPage.visit();
  });

  ListagemContasAReceberLocators.periodos.forEach(periodo => {
    it(`Filtrar contas a receber por período: ${periodo.label}`, () => {
      ListagemContasAReceberPage.selecionarPeriodo(periodo.value);

      // Verificação de existência dos elementos de resumo após o filtro
      cy.get(ListagemContasAReceberLocators.vencidasResumo).should('exist');
      cy.get(ListagemContasAReceberLocators.aReceberResumo).should('exist');
      cy.get(ListagemContasAReceberLocators.recebidasResumo).should('exist');
      cy.get(ListagemContasAReceberLocators.totalPeriodoResumo).should('exist');

      // Verificar se não houve mensagens de erro na página
      cy.get('body').should('not.contain.text', 'Erro');
      cy.get('body').should('not.contain.text', 'Nenhum dado encontrado');
    });
  });

  it('Realizar novo cadastro de conta a receber', () => {
    ListagemContasAReceberPage.clicarNovoCadastro();
    // Adicionar ações e validações específicas para o cadastro de nova conta a receber
  });

  it('Marcar todos os lançamentos e realizar pagamento dos selecionados', () => {
    ListagemContasAReceberPage.marcarTodosLancamentos();
    ListagemContasAReceberPage.realizarPagamentoSelecionados();

    // Validação da exibição do popup de erro, caso nenhuma parcela tenha sido selecionada
    cy.get('.swal2-popup').should('be.visible')
      .and('have.class', 'swal2-icon-error')
      .within(() => {
        cy.get('#swal2-title').should('contain.text', 'Nenhuma parcela foi selecionada!');
        cy.get('#swal2-html-container').should(
          'contain.text', 
          'Para realizar a baixa da(s) parcela(s) é necessário selecionar ao menos uma parcela.'
        );
      });
  });
});
