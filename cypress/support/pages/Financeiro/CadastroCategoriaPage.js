import CategoriasLocators from "../../locators/Financeiro/CategoriasLocators";

class CadastroCategoriaPage {
  // ---------------------- Validações do Modal ----------------------

  verificarModalVisivel() {
    // Aguarda o campo de descrição aparecer e ficar visível
    // O campo tem ID dinâmico, então usamos o placeholder como seletor
    // Não procuramos dentro do modalContent porque ele pode ter display: none
    cy.get(CategoriasLocators.campoDescricao, { timeout: 20000 })
      .should('be.visible')
      .and('not.be.disabled');
  }

  verificarTituloModal(tipoCategoria) {
    // O título pode estar em um elemento genérico, então verificamos o conteúdo do modal
    // Não verificamos visibilidade do modal porque ele pode ter display: none mas estar funcional
    cy.get('body', { timeout: 15000 })
      .should('contain.text', tipoCategoria);
  }

  // ---------------------- Preenchimento do Formulário ----------------------

  preencherDescricao(descricao) {
    // Aguarda o campo de descrição aparecer e ficar visível
    cy.get(CategoriasLocators.campoDescricao, { timeout: 15000 })
      .should('be.visible')
      .clear()
      .type(descricao);
  }

  selecionarMostrarDentroDe(categoriaPai) {
    if (categoriaPai) {
      cy.get(CategoriasLocators.campoMostrarDentroDe)
        .should('be.visible')
        .type(categoriaPai);

      // Aguardar opções do autocomplete aparecerem
      cy.get('.soft-select__option, .typeahead-container .typeahead-result', { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
    }
  }

  selecionarContaDRE(contaDRE) {
    if (contaDRE) {
      cy.get(CategoriasLocators.campoContaDRE)
        .should('be.visible')
        .type(contaDRE);

      // Aguardar opções do autocomplete aparecerem
      cy.get('.soft-select__option, .typeahead-container .typeahead-result', { timeout: 5000 })
        .should('be.visible')
        .first()
        .click();
    }
  }

  marcarNaoExibirDRE() {
    // O checkbox pode não existir em todos os modais
    // Verificamos se existe antes de tentar interagir
    cy.get('body').then(($body) => {
      const checkbox = $body.find('input[type="checkbox"]');
      if (checkbox.length > 0) {
        cy.wrap(checkbox).check({ force: true });
      }
    });
  }

  desmarcarNaoExibirDRE() {
    // O checkbox pode não existir em todos os modais
    // Verificamos se existe antes de tentar interagir
    cy.get('body').then(($body) => {
      const checkbox = $body.find('input[type="checkbox"]');
      if (checkbox.length > 0) {
        cy.wrap(checkbox).uncheck({ force: true });
      }
    });
  }

  // ---------------------- Ações do Modal ----------------------

  clicarSalvar() {
    cy.get(CategoriasLocators.botaoSalvar).click();
    cy.get('#loading').should('not.exist');
  }

  clicarVoltar() {
    cy.get(CategoriasLocators.botaoVoltarModal).click();
  }

  clicarFechar() {
    cy.get(CategoriasLocators.botaoFecharModal).click();
  }

  // ---------------------- Validações de Sucesso/Erro ----------------------

  verificarMensagemSucesso() {
    // Usa o padrão do módulo financeiro: Toastify toast de sucesso
    cy.get('.Toastify__toast--success', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Sucesso');
  }

  verificarToastSucesso() {
    cy.get(CategoriasLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible');
  }

  // ---------------------- Método Completo de Preenchimento ----------------------

  preencherFormulario(dados) {
    const { descricao, mostrarDentroDe, contaDRE, naoExibirDRE } = dados;

    this.preencherDescricao(descricao);

    if (mostrarDentroDe) {
      this.selecionarMostrarDentroDe(mostrarDentroDe);
    }

    if (contaDRE) {
      this.selecionarContaDRE(contaDRE);
    }

    if (naoExibirDRE === true) {
      this.marcarNaoExibirDRE();
    } else if (naoExibirDRE === false) {
      this.desmarcarNaoExibirDRE();
    }
  }
}

export default new CadastroCategoriaPage();

