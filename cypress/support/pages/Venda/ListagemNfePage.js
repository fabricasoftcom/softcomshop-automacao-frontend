import ListagemNfeLocators from "../../locators/Venda/ListagemNfeLocators";
import MenulateralVendaPage from "../menulateral/MenulateralVendaPage";

class ListagemNfePage {
  visitar() {
    MenulateralVendaPage.acessarListagemNFe();
  }

  validarCarregamento() {
    cy.get(ListagemNfeLocators.tituloPagina)
      .invoke('text')
      .should((texto) => {
        expect(texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).to.include(
          'Listagem Nota Fiscal'
        );
      });
    cy.get(ListagemNfeLocators.tabelaListagem).should('be.visible');
  }

  capturarNumeroESeriePrimeiraLinha() {
    return cy
      .get(`${ListagemNfeLocators.tabelaListagem} tbody tr`)
      .should('have.length.greaterThan', 0)
      .first()
      .then(($row) => {
        const numero = $row.attr('data-numero_nfe') || $row.find('td').eq(2).text().trim();
        const serie = $row.attr('data-serie') || $row.find('td').eq(3).text().trim();

        if (!numero) {
          throw new Error('Nenhuma linha com numero preenchido foi encontrada na listagem');
        }

        return { numero, serie };
      });
  }

  aplicarFiltroNumeroSerie({ numero, serie }) {
    this.abrirFiltroAvancado();
    this.preencherFiltrosBasicos({
      numeroInicial: `${numero}`,
      numeroFinal: `${numero}`,
      serie,
    });
    this.submeterPesquisaAvancada();
  }

  validarResultadoNumeroSerie({ numero, serie }) {
    cy.url().should('include', `numero_nfe_de=${numero}`);
    cy.url().should('include', `numero_nfe_ate=${numero}`);
    // if (serie) {
    //   cy.url().should('include', `serie=${serie}`);
    // }
    cy.get(`${ListagemNfeLocators.tabelaListagem} tbody tr`).first().should(($row) => {
      const textoLinha = $row.text().toUpperCase();
      expect(textoLinha).to.include(`${numero}`.toUpperCase());
      if (serie) {
        expect(textoLinha).to.include(`${serie}`.toUpperCase());
      }
    });
  }

  abrirFiltroAvancado() {
    cy.get(ListagemNfeLocators.botaoPesquisarToggle).click();
    cy.get(ListagemNfeLocators.formPesquisaAvancada).should('be.visible');
  }

  preencherFiltrosBasicos({
    numeroInicial,
    numeroFinal,
    serie,
    status,
    destinatarioNome,
    destinatarioId,
  } = {}) {
    if (numeroInicial) {
      cy.get(ListagemNfeLocators.campoNumeroInicial).clear().type(numeroInicial);
    }

    if (numeroFinal) {
      cy.get(ListagemNfeLocators.campoNumeroFinal).clear().type(numeroFinal);
    }

    if (serie) {
      cy.get(ListagemNfeLocators.selectSerie).then(($select) => {
        const options = Array.from($select.find('option')).map((opt) => ({
          value: opt.value,
          text: opt.textContent.trim(),
        }));
        const alvo = options.find(
          (opt) =>
            opt.value.toLowerCase() === serie.toLowerCase() || opt.text.toLowerCase() === serie.toLowerCase()
        );
        if (alvo) {
          cy.wrap($select).select(alvo.value);
        }
      });
    }

    if (status) {
      cy.get(ListagemNfeLocators.selectStatus).select(status);
    }

    if (destinatarioNome) {
      cy.get(ListagemNfeLocators.campoDestinatarioAutocomplete).clear().type(destinatarioNome);
    }

    if (destinatarioId) {
      cy.get(ListagemNfeLocators.campoDestinatarioHidden).invoke('val', destinatarioId);
    }
  }

  submeterPesquisaAvancada() {
    cy.get(ListagemNfeLocators.botaoPesquisarAvancado)
      .scrollIntoView()
      .click({ force: true });
  }

  selecionarTodosRegistros() {
    cy.get(ListagemNfeLocators.checkboxSelecionarTodos).check({ force: true });
  }

  verificarPrimeiraLinhaSelecionada() {
    cy.get(ListagemNfeLocators.checkboxPrimeiraLinha).should('be.checked');
  }

  clicarExcluirSelecionados() {
    cy.get(ListagemNfeLocators.botaoExcluirSelecionados).click({ force: true });
  }

  validarAlertaSemSelecao() {
    cy.get(ListagemNfeLocators.sweetAlertModal)
      .should('be.visible')
      .and('contain', 'Aviso');
    cy.get(ListagemNfeLocators.sweetAlertBotaoConfirmar).click({ force: true });
  }

  aplicarFiltroDestinatarioESerie({ destinatarioNome, destinatarioId, serie }) {
    this.abrirFiltroAvancado();
    this.preencherFiltrosBasicos({
      destinatarioNome,
      destinatarioId,
      serie,
    });
    this.submeterPesquisaAvancada();
  }

  preencherPeriodo(periodo) {
    cy.get(ListagemNfeLocators.campoPeriodo).clear().type(periodo);
  }

  acionarPesquisaInferior() {
    cy.get(ListagemNfeLocators.botaoPesquisarInferior).scrollIntoView().click({ force: true });
  }

  validarParametrosNaUrl(parametros = {}) {
    Object.entries(parametros).forEach(([chave, valor]) => {
      const encoded = encodeURIComponent(valor).replace(/%20/g, '+');
      cy.url().should('include', `${chave}=${encoded}`);
    });
  }

  _aguardarPaginaPronta() {
    // 1. Aguarda o loading desaparecer (se existir) - abordagem defensiva
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 15000 }).should('not.exist');
      }
    });

    // 2. Aguarda o content-layout no DOM e visível (evita falha quando animated/fadeIn mantém opacity:0 no pai)
    cy.get('#content-layout', { timeout: 20000 }).should('exist').should('be.visible');

    // 3. Valida que a tabela está visível e tem conteúdo
    cy.get(ListagemNfeLocators.tabelaListagem, { timeout: 20000 })
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.get('tbody tr', { timeout: 10000 })
          .should('have.length.greaterThan', 0)
          .first()
          .should('be.visible');
      });
  }

  abrirEdicaoPrimeiraLinha() {
    // Aguarda a página estar completamente pronta
    this._aguardarPaginaPronta();

    // Aguarda o botão estar realmente interagível
    cy.get(ListagemNfeLocators.botaoEditarPrimeiraLinha, { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .should(($btn) => {
        // Valida que o botão não está desabilitado
        expect($btn).to.not.have.attr('disabled');
        // Valida que o botão tem dimensões válidas (não está coberto)
        const rect = $btn[0].getBoundingClientRect();
        expect(rect.width, 'Botão deve ter largura > 0').to.be.greaterThan(0);
        expect(rect.height, 'Botão deve ter altura > 0').to.be.greaterThan(0);
      })
      .first()
      .click({ force: true });
  }

  clicarNovoCadastro() {
    // Aguarda a página estar completamente pronta antes de clicar
    this._aguardarPaginaPronta();

    // Aguarda o botão estar realmente interagível
    cy.get(ListagemNfeLocators.botaoNovoCadastro, { timeout: 15000 })
      .should('exist')
      .should('be.visible')
      .should(($btn) => {
        // Valida que o botão não está desabilitado
        expect($btn).to.not.have.attr('disabled');
        // Valida que o botão tem dimensões válidas (não está coberto)
        const rect = $btn[0].getBoundingClientRect();
        expect(rect.width, 'Botão deve ter largura > 0').to.be.greaterThan(0);
        expect(rect.height, 'Botão deve ter altura > 0').to.be.greaterThan(0);
      })
      .click({ force: true });
  }

  abrirImpressaoPrimeiraLinha() {
    cy.get(ListagemNfeLocators.botaoImprimirPrimeiraLinha)
      .first()
      .as('linkImpressao');

    cy.get('@linkImpressao')
      .invoke('attr', 'href')
      .should('match', /nfe\/emissao\/danfe\/\d+/);

    cy.get('@linkImpressao')
      .invoke('attr', 'target')
      .then((target) => {
        if (target && target.includes('_blank')) {
          cy.log('Impressão abre em nova guia via target=_blank');
          return;
        }

        cy.get('@linkImpressao').invoke('removeAttr', 'target').click();
        cy.location('pathname').should('match', /nfe\/emissao\/danfe\/\d+/);
      });
  }
}

export default new ListagemNfePage();
