import ListagemNfeLocators from "../../locators/Venda/ListagemNfeLocators";
import menulateralvendapage from "../menulateral/menulateralvendapage";

class ListagemNfePage {
  visitar() {
    menulateralvendapage.acessarListagemNFe();
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
    const normalizar = (value = '') =>
      value.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return cy
      .get(ListagemNfeLocators.tabelaListagem)
      .should('be.visible')
      .find('tbody tr')
      .should('have.length.greaterThan', 0)
      .then(($rows) => {
        const headers = Cypress.$(ListagemNfeLocators.tabelaListagem)
          .find('th')
          .toArray()
          .map((th) => normalizar(th.innerText));

        const idxNumero = headers.findIndex(
          (h) => h.includes('numero') || h.includes('nf-e') || h.includes('nfe') || h.includes('documento')
        );
        const idxSerie = headers.findIndex((h) => h.includes('serie'));

        const localizar = ($row, chaves = [], idxPreferencial = -1) => {
          const $cells = Cypress.$($row).find('td').toArray();

          if (idxPreferencial > -1 && $cells[idxPreferencial]) {
            const valIdx = $cells[idxPreferencial].innerText.trim();
            if (valIdx) return valIdx;
          }

          const alvo = $cells.find((td) => {
            const meta = normalizar(td.getAttribute('data-label') || td.getAttribute('data-title') || '');
            const texto = normalizar(td.innerText);
            return chaves.some((chave) => meta.includes(chave) || texto.includes(chave));
          });
          return alvo ? alvo.innerText.trim() : '';
        };

        const linhaValida = $rows
          .toArray()
          .map((row) => ({
            numero: localizar(row, ['numero', 'nf-e', 'nfe', 'documento', 'num'], idxNumero),
            serie: localizar(row, ['serie', 'sÃ©rie'], idxSerie),
          }))
          .find(({ numero }) => numero);

        if (!linhaValida) {
          throw new Error('Nenhuma linha com numero preenchido foi encontrada na listagem');
        }

        return {
          numero: linhaValida.numero,
          serie: linhaValida.serie,
        };
      });
  }

  aplicarFiltroNumeroSerie({ numero, serie }) {
    this.abrirFiltroAvancado();
    this.preencherFiltrosBasicos({
      numeroInicial: numero,
      numeroFinal: numero,
      serie,
    });
    this.submeterPesquisaAvancada();
  }

  validarResultadoNumeroSerie({ numero, serie }) {
    cy.url().should('include', `numero_nfe_de=${numero}`);
    cy.url().should('include', `numero_nfe_ate=${numero}`);
    if (serie) {
      cy.url().should('include', `serie=${serie}`);
    }
    cy.get(`${ListagemNfeLocators.tabelaListagem} tbody tr`).first().should(($row) => {
      const textoLinha = $row.text().toUpperCase();
      expect(textoLinha).to.include(numero);
      expect(textoLinha).to.include(serie);
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
            opt.value.toLowerCase() === serie.toLowerCase() ||
            opt.text.toLowerCase() === serie.toLowerCase()
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
}

export default new ListagemNfePage();

