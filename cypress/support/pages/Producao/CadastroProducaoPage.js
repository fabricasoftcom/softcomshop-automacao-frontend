import ProducaoLocators from '../../locators/Producao/ProducaoLocators';

class CadastroProducaoPage {
  visit() {
    cy.visit('/producao/novo');
    cy.get('#loading').should('not.exist');
    cy.wait(1000);
  }

  preencherProduto() {
    cy.get(ProducaoLocators.produtoAutocompleteCadastro, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true })
      .clear();

    // if (produto) {
    //   cy.get(ProducaoLocators.produtoAutocompleteCadastro).type(produto, { delay: 0 });
    // }

    cy.wait(500);
    cy.get(ProducaoLocators.produtoIconCadastro).first().click({ force: true });

    cy.get(ProducaoLocators.produtoResultadoCadastro, { timeout: 10000 }).first().click({ force: true });

    cy.get(ProducaoLocators.produtoIdHiddenCadastro, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);

    return this;
  }

  preencherQuantidade(quantidade) {
    cy.get(ProducaoLocators.quantidadeInput).should('be.visible').clear().type(quantidade.toString());
    return this;
  }

  preencherObservacao(observacao) {
    cy.get(ProducaoLocators.observacaoInput).should('be.visible').clear().type(observacao);
    return this;
  }

  preencherFormularioCompleto(dados) {
    if (dados.produto) {
      this.preencherProduto(dados.produto);
    }
    if (dados.quantidade) {
      this.preencherQuantidade(dados.quantidade);
    }
    if (dados.observacao) {
      this.preencherObservacao(dados.observacao);
    }
    return this;
  }

  clicarLancarItem() {
    cy.intercept('POST', '**/producao/*/lancar-itens').as('lancarItens');
    cy.get(ProducaoLocators.btnLancarItem).should('be.visible').click();
    cy.wait('@lancarItens', { timeout: 15000 });
    cy.get('#loading').should('not.exist');
    return this;
  }

  adicionarItem(item) {
    this.preencherFormularioCompleto(item);
    cy.get(ProducaoLocators.produtoIdHiddenCadastro, { timeout: 10000 }).should('not.have.value', '');
    this.clicarLancarItem();
    cy.url({ timeout: 20000 }).should('include', '/producao/').and('include', '/editar');
    cy.get(ProducaoLocators.loading).should('not.exist');
    return this;
  }

  validarPaginaEdicao() {
    cy.url().should('include', '/producao/').and('include', '/editar');
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);
    cy.get(ProducaoLocators.tabelaItensProducao, { timeout: 10000 }).should('be.visible');
    return this;
  }

  validarTabelaItensVisivel() {
    cy.get(ProducaoLocators.tituloTabelaItens).should('be.visible');
    cy.get(ProducaoLocators.tabelaItensProducao).should('be.visible');
    return this;
  }

  adicionarProdutoNaTabela(produto, quantidade = '2.00', preco = '10.00') {
    cy.intercept('POST', '**/producao-itens/salvar').as('salvarItemTabela');

    cy.get(ProducaoLocators.produtoAutocompleteTabela)
      .first()
      .should('be.visible')
      .click({ force: true })
      .clear();

    if (produto) {
      cy.get(ProducaoLocators.produtoAutocompleteTabela).first().type(produto, { delay: 0 });
      cy.wait(500);
    }

    cy.get(ProducaoLocators.produtoIconTabela).first().click({ force: true });

    cy.get('body').then(($body) => {
      if ($body.find('.typeahead-list li a').length === 0) {
        cy.wait(1000);
      }
    });

    cy.get('.typeahead-list li a, .typeahead-result li a', { timeout: 10000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get(ProducaoLocators.quantidadeInputTabela)
      .first()
      .should('be.visible')
      .clear()
      .type(quantidade.toString());

    cy.get(ProducaoLocators.precoInputTabela)
      .first()
      .should('be.visible')
      .clear()
      .type(preco.toString());

    cy.get(ProducaoLocators.btnSalvarItemTabela)
      .filter(':visible')
      .first()
      .click({ force: true });
    cy.wait('@salvarItemTabela', { timeout: 15000 });
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);
    cy.get(ProducaoLocators.tabelaItensLinhas).should('have.length.at.least', 1);

    return this;
  }

  preencherModoPreparo(modoPreparo) {
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);

    cy.get(ProducaoLocators.modoPreparoTextarea, { timeout: 10000 })
      .should('be.visible')
      .scrollIntoView();

    cy.get(ProducaoLocators.modoPreparoTextarea).then(($textarea) => {
      const valorAtual = ($textarea.val() || '').toString().trim();
      let textoFinal = modoPreparo;

      if (valorAtual === modoPreparo.trim()) {
        textoFinal = `${modoPreparo} ${Date.now()}`;
      }

      cy.get(ProducaoLocators.modoPreparoTextarea).clear();
      cy.get(ProducaoLocators.modoPreparoTextarea).type(textoFinal);
      cy.get(ProducaoLocators.modoPreparoTextarea).blur();
    });

    cy.wait(300);
    return this;
  }

  salvarModoPreparo() {
    cy.get(ProducaoLocators.btnSalvarModoPreparo, { timeout: 10000 }).should('exist').scrollIntoView();
    cy.get(ProducaoLocators.btnSalvarModoPreparoAcao, { timeout: 10000 }).first().click({ force: true });
    cy.get('#loading').should('not.exist');
    return this;
  }

  salvarProducao() {
    cy.intercept('POST', '**/producao/salvar').as('salvarProducao');
    cy.get(ProducaoLocators.btnSalvarProducao).first().should('be.visible').click();
    cy.wait('@salvarProducao', { timeout: 15000 }).then((interception) => {
      if (interception?.response?.statusCode) {
        const statusCode = interception.response.statusCode;
        expect([200, 302]).to.include(statusCode);
      }
    });
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);
    return this;
  }

  finalizarProducao() {
    cy.intercept('GET', '**/producao/*/finalizar').as('finalizarProducao');
    cy.get(ProducaoLocators.btnFinalizar).first().should('be.visible').click();

    cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 })
      .should('be.visible')
      .wait(800);

    cy.get('.sweet-alert.modal-confirm-destroy .confirm')
      .should('be.visible')
      .click({ force: true });

    cy.wait('@finalizarProducao', { timeout: 15000 }).then((interception) => {
      if (interception?.response?.statusCode) {
        const statusCode = interception.response.statusCode;
        expect([200, 302]).to.include(statusCode);
      }
    });

    cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 }).should('not.exist');
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);
    return this;
  }

  reverterProducao() {
    cy.intercept('GET', '**/producao/*/reverter').as('reverterProducao');
    cy.get(ProducaoLocators.btnReverter).first().should('be.visible').click();

    cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 })
      .should('be.visible')
      .wait(800);

    cy.get('.sweet-alert.modal-confirm-destroy .confirm')
      .should('be.visible')
      .click({ force: true });

    cy.wait('@reverterProducao', { timeout: 15000 }).then((interception) => {
      if (interception?.response?.statusCode) {
        const statusCode = interception.response.statusCode;
        expect([200, 302]).to.include(statusCode);
      }
    });

    cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 }).should('not.exist');
    cy.get(ProducaoLocators.loading).should('not.exist');
    cy.wait(1000);
    return this;
  }
}

export default new CadastroProducaoPage();
