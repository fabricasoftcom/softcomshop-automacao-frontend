import VendaNfseLocators from '../../locators/Venda/VendaNfseLocators';

class VendaNfsePage {
  acessarVendaNovo() {
    cy.visit('/vendas/novo');
  }

  /**
   * Fluxo oficial após pagamento: Mais ações -> Gerar nota -> selecionar NFSe no modal.
   */
  gerarNfseViaMaisAcoes() {
    cy.wait(3000)
    // Abre "Mais ações"
    cy.get('body').then(($body) => {
      const btnMaisAcoes = $body.find(VendaNfseLocators.botaoAcoesOuMaisAcoes).filter(':visible').first();
      if (!btnMaisAcoes.length) {
        throw new Error('Botão "Mais ações" não encontrado na tela de venda.');
      }
      cy.wrap(btnMaisAcoes).scrollIntoView().click({ force: true });
    });

    // Clica em "Gerar nota"
    cy.get(VendaNfseLocators.botaoGerarNfsePorTexto)
      .should('be.visible')
      .click({ force: true });

    cy.wait(3000)
    // No modal, seleciona "NFSe"
    cy.get(VendaNfseLocators.sweetAlertBotaoNfse).should('be.visible').click({ force: true });
  }

  /**
   * Alguns fluxos exibem SweetAlert de confirmação. Este método tenta confirmar sem falhar caso não exista.
   */
  confirmarGeracaoSeNecessario() {
    const modalSelector = VendaNfseLocators.sweetAlertContainer;
    const botoesSelector = VendaNfseLocators.sweetAlertBotoes;

    cy.get('body').then(($body) => {
      const modal = $body.find(`${modalSelector}:visible`);
      if (!modal.length) return;

      const texto = modal.text().toLowerCase();
      const pareceConfirmacao =
        texto.includes('emit') ||
        texto.includes('gerar') ||
        texto.includes('nfse') ||
        texto.includes('nota');

      if (!pareceConfirmacao) return;

      // Prioriza botões de confirmação
      cy.wrap(modal)
        .should('be.visible')
        .within(() => {
          cy.get(botoesSelector).then(($btns) => {
            const btns = Cypress._.toArray($btns);
            const confirmar =
              btns.find((b) => /sim|emitir|gerar|confirmar|ok/i.test(Cypress.$(b).text().trim())) ||
              btns[btns.length - 1];
            cy.wrap(confirmar).click({ force: true });
          });
        });

      cy.get(modalSelector, { timeout: 30000 }).should('not.exist');
    });
  }

  /**
   * Valida um feedback visual de sucesso (SweetAlert/toast/modal).
   * Mantém regex amplo para suportar variações do texto.
   */
  validarSucessoGeracaoNfse() {
    const sucessoMatcher = /sucesso|emitid|gerad|autorizad/i;
    const nfseMatcher = /NFSe|NFS-e|Nota.*Servi/i;

    cy.get('body', { timeout: 60000 }).should(($body) => {
      const texto = $body.text();
      expect(
        sucessoMatcher.test(texto) && nfseMatcher.test(texto),
        'feedback visual de sucesso para NFSe (texto contém sucesso + nfse)',
      ).to.be.true;
    });
  }

  emitirNfse() {

    cy.get(VendaNfseLocators.botaoEmitirNfse)
      .should('be.visible')
      .click({ force: true });

    this.validarSucessoEmitirNfse();
  }

  cancelarNfse() {
    cy.wait(10000)
    cy.get(VendaNfseLocators.botaoCancelarNfse, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true });

    cy.get(VendaNfseLocators.botaoConfirmarCancelamentoNfse, { timeout: 30000 })
      .should('be.visible')
      .click({ force: true });

    this.validarSucessoCancelamentoNfse();
  }

  emitirECancelarNfse() {
    this.emitirNfse();
    this.cancelarNfse();
  }

  validarSucessoCancelamentoNfse() {
    cy.wait(15000);
    cy.get('#status_da_nota_cancelada', { timeout: 30000 }).should('contain', 'Cancelada');
  }

  validarSucessoEmitirNfse() {
    cy.wait(15000)
    cy.get('#status_da_nota_autorizada', { timeout: 30000 }).should('contain', 'Autorizada');
  }
}

export default new VendaNfsePage();

