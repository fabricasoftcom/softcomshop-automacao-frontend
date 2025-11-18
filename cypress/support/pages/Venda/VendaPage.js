import cadastroVendaLocators from '../../locators/Venda/CadastroVendaLocators';

class VendaPage {
  selecionarEmpresaPadrao() {
    cy.get('.text-muted').click();
    cy.get('.dropdown > .dropdown-menu').should('be.visible');
    cy.get('.dropdown > .dropdown-menu > :contains("SOFTCOM MATRIZ")')
      .first()
      .click();
  }

  acessarPaginaVenda() {
    cy.visit('/vendas/novo');
    cy.get(cadastroVendaLocators.formPrincipal).should('be.visible');
  }

  informarVendedor() {
    cy.percySnapshot();
    cy.get(cadastroVendaLocators.btnVendedorAutocomplete).click({ force: true });
    cy.get(cadastroVendaLocators.listaVendedorSugestoes)
      .should('have.length.at.least', 1)
      .first()
      .then(($item) => {
        const clickable =
          $item.find('a').length > 0 ? $item.find('a').get(0) : $item.get(0);
        cy.wrap(clickable).click({ force: true });
      });
    cy.get(cadastroVendaLocators.hiddenVendedorId).should('not.have.value', '');
  }

  adicionarObservacao() {
    cy.get('#observacao').type('Venda realizada pela automação');
  }

  adicionarProduto() {
    // cy.get('#auto_icon_produto_empresa_grade_id_').click();
    // cy.xpath("//strong[@class='autocomplete-color-primary'][contains(.,'coca-cola lata 350ml')]").click()
    cy.get('#auto_icon_produto_empresa_grade_id_').click();
    cy.get('#div_auto_produto_empresa_grade_id_ > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a').click();
  }

  adicionarPagamento() {
    cy.get('#btn-gerar-pagamento').should('be.visible')
    cy.get('#btn-gerar-pagamento').click()
    cy.get('#auto_icon_forma_pagamento_id').click()
    this.salvarPagamento();
  }

  salvarPagamento() {
    cy.get('.modal #btn-salvar').click();
  }

  gerarNFCe() {
    cy.wait(6000)
    cy.xpath("//a[contains(@class,'btn-choice btn btn-primary')]").should('be.visible').click();
    cy.xpath("(//a[contains(@id,'gerar-nota-fiscal-consumidor')])[2]")
      .should('be.visible')
      .click();
  }

  gerarNFe() {
    cy.wait(6000)
    cy.xpath("//a[contains(@class,'btn-choice btn btn-primary')]").should('be.visible').click();
    cy.get("p> :nth-child(2) > #gerar-nota-fiscal").click();
    cy.get('.sweet-alert', { timeout: 30000 }).then(($alert) => {
      cy.wait(3999)
      if ($alert.is(':visible')) {
        cy.wrap($alert).contains('button', 'Sim, pode emitir!', { matchCase: false }).click();
      }
    });
  }

  confirmacaoEmissaoNFCe() {
    cy.contains('Nota Fiscal Consumidor', { timeout: 15000 }).should('be.visible').click();
    // cy.url({ timeout: 60000 }).should('match', /\/nfce\/\d+\/visualizar/);
    // cy.get('#status_da_nota_autorizada', { timeout: 30000 }).should('contain', 'Autorizada');
  }

  confirmacaoEmissaoNFe() {
    cy.get('.sweet-alert', { timeout: 60000 })
      .should('be.visible')
      .within(() => {
        cy.contains('h2', 'Sua nota fiscal foi autorizada com sucesso!', { matchCase: false }).should(
          'be.visible'
        );
        cy.contains('p', 'Sua nota fiscal foi emitida com sucesso!', { matchCase: false }).should(
          'be.visible'
        );
      });
  }
  selecionarClienteAlternativo() {
    cy.get(cadastroVendaLocators.hiddenClienteId)
      .invoke('val')
      .then((clienteAtual) => {
        cy.get(cadastroVendaLocators.btnClienteAutocomplete).click({ force: true });
        cy.get(cadastroVendaLocators.listaClienteSugestoes)
          .should('have.length.at.least', 1)
          .then(($items) => {
            const items = Array.from($items);
            const alternative = items.find((item) => {
              const text = Cypress.$(item).text().trim().toUpperCase();
              const value = Cypress.$(item).data('value');
              const isConsumidor = text.includes('CONSUMIDOR');
              const isSameId = clienteAtual && value && value.toString() === clienteAtual.toString();
              return !isConsumidor && !isSameId;
            });
            const targetLi = alternative || items[0];
            const clickable =
              Cypress.$(targetLi).find('a').length > 0
                ? Cypress.$(targetLi).find('a').get(0)
                : targetLi;

            cy.wrap(clickable)
              .click({ force: true })
              .then(() => {
                if (alternative) {
                  cy.get(cadastroVendaLocators.hiddenClienteId).should(($input) => {
                    expect($input.val(), 'cliente alternativo selecionado').not.to.eq(clienteAtual);
                  });
                } else {
                  cy.log('Nenhum cliente alternativo disponivel, mantendo selecao atual.');
                }
              });
          });
      });
  }
}

export default new VendaPage();
