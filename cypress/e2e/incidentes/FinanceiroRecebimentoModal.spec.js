import RecebimentoPage from '../../support/pages/Financeiro/RecebimentoPage';
import ListagemContasAReceberPage from '../../support/pages/Financeiro/ListagemContasAReceberPage';

describe('Incidentes > Modal de Recebimento > Calendário', { tags: ['@incidentes', '@financeiro', '@recebimento', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RecebimentoPage.visit();
  });

  it('Deve abrir o datepicker da data de recebimento acima do modal', function () {
    ListagemContasAReceberPage.verificarSeHaLinhasComStatusBaixar().then(function (temLinhas) {
      if (!temLinhas) {
        cy.log('Sem linhas com status Baixar — teste ignorado');
        this.skip();
      }
    });

    RecebimentoPage.clicarPrimeiraLinhaComStatusBaixar();
    cy.get('#loading').should('not.exist');
    RecebimentoPage.abrirCalendarioCampoDataPagamento();
    RecebimentoPage.validarDatepickerDataPagamentoAcimaDoModal();
  });
});
