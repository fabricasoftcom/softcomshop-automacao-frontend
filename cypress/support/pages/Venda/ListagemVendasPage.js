import menulateralvendapage from "../menulateral/menulateralvendapage";
import listagemVendasLocators from "../../locators/Venda/ListagemVendasLocators";
import clienteLocators from "../../locators/ClienteLocators";

class ListagemVendasPage {
  acessarTelaListagem() {
    menulateralvendapage.acessarListagemVendas();
    cy.get(listagemVendasLocators.tabelaVendas).should('be.visible');
  }

  validarTabelaCarregada() {
    cy.get(listagemVendasLocators.tabelaVendas).should('be.visible');
    cy.get(listagemVendasLocators.linhasTabela).then(($linhas) => {
      cy.log(`Vendas exibidas: ${$linhas.length}`);
    });
  }

  validarPaginacaoAtual(pagina = '1') {
    cy.get('body').then(($body) => {
      const elemento = $body.find(listagemVendasLocators.paginacaoAtual);
      if (!elemento.length) {
        cy.log('Paginacao nao exibida para a quantidade atual de vendas.');
        return;
      }

      cy.wrap(elemento)
        .should('be.visible')
        .and('have.text', pagina);
    });
  }

  obterQuantidadeDeRegistros() {
    return cy.get(listagemVendasLocators.linhasTabela).then(($linhas) => $linhas.length);
  }

  abrirFormularioPesquisa() {
    cy.get(listagemVendasLocators.formPesquisa).then(($form) => {
      if ($form.is(':visible')) {
        return;
      }

      cy.get(listagemVendasLocators.btnPesquisaToggle).click();
    });

    cy.get(listagemVendasLocators.formPesquisa).should('be.visible');
  }

  preencherPeriodo(periodo) {
    this.abrirFormularioPesquisa();
    cy.get(listagemVendasLocators.inputPeriodo).clear().type(periodo);
  }

  preencherFiltroCodigo(codigo) {
    this.abrirFormularioPesquisa();
    cy.get(listagemVendasLocators.inputCodigo).clear().type(codigo);
  }

  selecionarSituacao(valor) {
    this.abrirFormularioPesquisa();
    cy.get(listagemVendasLocators.selectSituacao).select(valor);
  }

  selecionarTipoDocumento(valor) {
    this.abrirFormularioPesquisa();
    cy.get(listagemVendasLocators.selectNfeNfce).select(valor);
  }

  prepararInterceptacaoListagem() {
    cy.intercept('GET', '**/vendas**').as('buscarVendas');
  }

  submeterPesquisa() {
    this.prepararInterceptacaoListagem();
    cy.get(listagemVendasLocators.btnPesquisar).click();
    const espera = cy.wait('@buscarVendas');
    cy.get(listagemVendasLocators.tabelaVendas).should('be.visible');
    return espera;
  }

  selecionarTodosRegistros() {
    cy.get(listagemVendasLocators.checkboxSelecionarTodos).check({ force: true });
    cy.get(listagemVendasLocators.checkboxLinhas).each(($checkbox) => {
      cy.wrap($checkbox).should('be.checked');
    });
  }

  desmarcarTodosRegistros() {
    cy.get(listagemVendasLocators.checkboxSelecionarTodos).uncheck({ force: true });
    cy.get(listagemVendasLocators.checkboxLinhas).each(($checkbox) => {
      cy.wrap($checkbox).should('not.be.checked');
    });
  }

  tentarExcluirSemSelecao() {
    cy.get(listagemVendasLocators.btnExcluirSelecionados).first().click();
    cy.contains('Aviso').should('be.visible');
    cy.get('.sweet-alert .confirm').click();
  }

  abrirModalExcluirSelecionados() {
    cy.get(listagemVendasLocators.btnExcluirSelecionados).first().click();
    cy.get(clienteLocators.modalConfirmDestroy).should('be.visible');
  }

  cancelarModalExclusao() {
    cy.get(clienteLocators.botaoCancelar).click({ force: true });
    cy.get(clienteLocators.modalConfirmDestroy).should('not.exist');
  }

  confirmarExclusaoPodeExcluir() {
    cy.get(clienteLocators.modalConfirmDestroy).within(() => {
      cy.contains('button', /pode excluir/i).should('be.visible').click();
    });
    cy.get(clienteLocators.modalConfirmDestroy).should('not.exist');
  }

  validarOpcaoClonarVisivel() {
    cy.get(listagemVendasLocators.dropdownOpcoesClonar).first().should('be.visible');
  }

  capturarPrimeiroCodigoDaTabela() {
    return cy.get(listagemVendasLocators.linhasTabela).then(($linhas) => {
      if (!$linhas.length) {
        cy.log('Nenhuma venda disponivel para capturar codigo.');
        return null;
      }

      // Coluna 2 (index 2) corresponde ao codigo apos checkbox e icone de edicao.
      const codigo = $linhas.first().find('td').eq(2).text().trim();
      return codigo || null;
    });
  }

  validarCodigoVisivelNaTabela(codigo) {
    cy.get(listagemVendasLocators.tabelaVendas).then(($tabela) => {
      const celula = $tabela.find('td').filter((_, el) => Cypress.$(el).text().trim().includes(codigo)).first();

      if (!celula.length) {
        cy.log(`Codigo ${codigo} nao encontrado na listagem apos filtro.`);
        return;
      }

      cy.wrap(celula).should('be.visible');
    });
  }

  selecionarPrimeiraVenda() {
    return this.obterQuantidadeDeRegistros().then((quantidade) => {
      if (!quantidade) {
        cy.log('Nenhuma venda disponivel para selecao.');
        return cy.wrap(false);
      }

      return cy
        .get(listagemVendasLocators.checkboxLinhas)
        .first()
        .check({ force: true })
        .then(() => true);
    });
  }

  selecionarVendasNaoFaturadas(maximo = 2) {
    const limite = Math.max(0, maximo);
    if (!limite) {
      return cy.wrap(0);
    }

    return cy.get(listagemVendasLocators.linhasTabela).then(($linhas) => {
      if (!$linhas.length) {
        cy.log('Nenhuma venda disponivel na tabela.');
        return cy.wrap(0);
      }

      const linhas = Cypress._.toArray($linhas);
      let selecionadas = 0;
      const documentoColunaIndex = listagemVendasLocators.documentoFiscalColunaIndex ?? 7;
      const statusColunaIndex = listagemVendasLocators.statusColunaIndex ?? 8;

      const normalizar = (texto) =>
        texto
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase();

      const selecionarLinha = (index) => {
        if (index >= linhas.length || selecionadas >= limite) {
          return cy.wrap(selecionadas);
        }

        const linha = linhas[index];
        const documentoTexto = Cypress.$(linha).find('td').eq(documentoColunaIndex).text().trim();
        const statusTexto = Cypress.$(linha).find('td').eq(statusColunaIndex).text().trim();
        const linhaPossuiStatusNaoFaturada =
          normalizar(documentoTexto).includes('NAO FATURADA') ||
          normalizar(statusTexto).includes('NAO FATURADA');

        if (linhaPossuiStatusNaoFaturada) {
          return cy
            .wrap(linha)
            .find("input[name='simplecheck[]']")
            .check({ force: true })
            .then(() => {
              selecionadas += 1;
              return selecionarLinha(index + 1);
            });
        }

        return selecionarLinha(index + 1);
      };

      return selecionarLinha(0).then((quantidadeSelecionada) => {
        if (!quantidadeSelecionada) {
          cy.log('Nenhuma venda com status NAO FATURADA encontrada.');
        }

        return quantidadeSelecionada;
      });
    });
  }

  abrirDropdownPrimeiraLinha() {
    return this.obterQuantidadeDeRegistros().then((quantidade) => {
      if (!quantidade) {
        cy.log('Nenhuma venda disponivel para abrir dropdown.');
        return cy.wrap(false);
      }

      return cy
        .get(listagemVendasLocators.dropdownAcoesPrimeiraLinha)
        .click()
        .then(() => cy.get(listagemVendasLocators.dropdownContainerAnexadoAoBody).should('be.visible'))
        .then(() => true);
    });
  }
}

export default new ListagemVendasPage();
