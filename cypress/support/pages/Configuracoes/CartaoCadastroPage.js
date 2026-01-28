import CartaoListagemPage from './CartaoListagemPage';
import CartaoCadastroLocators from '../../locators/Configuracoes/CartaoCadastroLocators';

class CartaoCadastroPage {
  /**
   * Acessa o formulário de cadastro de novo cartão
   */
  visit() {
    CartaoListagemPage.acessarTelaListagem();
    CartaoListagemPage.clicarBotaoNovo();
    this.aguardarModalVisivel();
  }

  /**
   * Aguarda o modal de cadastro ficar visível
   */
  aguardarModalVisivel() {
    cy.get(CartaoCadastroLocators.modal, { timeout: 10000 }).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário
   */
  verificarLayoutBasico() {
    cy.get(CartaoCadastroLocators.modal).should('be.visible');
    cy.get(CartaoCadastroLocators.btnFechar).should('be.visible');
    cy.get(CartaoCadastroLocators.btnSalvar).should('be.visible');
  }

  /**
   * Preenche o campo Nome do Cartão
   * @param {string} nome - Nome do cartão
   */
  preencherNomeCartao(nome) {
    // Busca o campo dentro do modal - primeiro input text visível
    cy.get(CartaoCadastroLocators.modal).within(() => {
      cy.get('input[type="text"]').first().should('be.visible').clear().type(nome);
    });
  }

  /**
   * Preenche o campo Alias
   * @param {string} alias - Alias do cartão
   */
  preencherAlias() {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      // Busca o segundo input text visível (após o nome)
      // cy.get('input[type="text"]').eq(1).should('be.visible').clear().type(alias);
      cy.get('#auto_icon_alias_cartao').click();
      cy.get('.typeahead-list > li > a').first().click();
    });
  }

  /**
   * Preenche o campo Taxa Administrativa
   * @param {number} taxa - Taxa administrativa em porcentagem
   */
  preencherTaxaAdministrativa(taxa) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      // Busca input que aceita números (taxa)
      cy.get('#taxa_admin').should('be.visible').clear().type(taxa.toString());
    });
  }

  /**
   * Preenche o campo Dia
   * @param {number} dia - Dia do recebimento
   */
  preencherDia(dia) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      // Busca o primeiro input type="number" visível
      cy.get('input[type="number"]').first().should('be.visible').clear().type(dia.toString());
    });
  }

  /**
   * Preenche o campo Parcela
   * @param {number} parcela - Número de parcelas
   */
  preencherParcela(parcela) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      // Busca o segundo input type="number" visível
      cy.get('input[type="number"]').eq(1).should('be.visible').clear().type(parcela.toString());
    });
  }

  /**
   * Preenche o campo Bandeira (autocomplete/typeahead)
   * @param {string} bandeira - Nome da bandeira
   */
  preencherBandeira(bandeira) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      cy.get('input[placeholder*="Bandeira"], input[placeholder*="bandeira"]')
        .first()
        .clear()
        .type(bandeira);
      // Aguarda opções aparecerem e seleciona a primeira
      cy.wait(500);
      cy.get('input[placeholder*="Bandeira"], input[placeholder*="bandeira"]')
        .first()
        .type('{downarrow}{enter}');
    });
  }

  /**
   * Preenche o campo Adquirente (autocomplete/typeahead)
   * @param {string} adquirente - Nome do adquirente
   */
  preencherAdquirente(adquirente) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      cy.get('input[placeholder*="Adquirente"], input[placeholder*="adquirente"]')
        .first()
        .clear()
        .type(adquirente);
      // Aguarda opções aparecerem e seleciona a primeira
      cy.wait(500);
      cy.get('input[placeholder*="Adquirente"], input[placeholder*="adquirente"]')
        .first()
        .type('{downarrow}{enter}');
    });
  }

  /**
   * Seleciona o Tipo
   * @param {string} tipo - Tipo do cartão (CRÉDITO ou DÉBITO)
   */
  selecionarTipo(tipo) {
    cy.get(CartaoCadastroLocators.modal).within(() => {
      cy.get('select[name*="tipo"], select').select(tipo);
    });
  }

  /**
   * Preenche o formulário completo
   * @param {Object} dados - Objeto com os dados do cartão
   * @param {string} dados.nome - Nome do cartão (obrigatório)
   * @param {string} dados.alias - Alias (obrigatório)
   * @param {number} dados.taxaAdministrativa - Taxa administrativa (obrigatório)
   * @param {number} dados.dia - Dia (obrigatório)
   * @param {number} dados.parcela - Parcela (obrigatório)
   * @param {string} dados.bandeira - Bandeira (opcional)
   * @param {string} dados.adquirente - Adquirente (opcional)
   * @param {string} dados.tipo - Tipo CRÉDITO ou DÉBITO (opcional)
   */
  preencherFormulario(dados) {
    if (dados.nome) {
      this.preencherNomeCartao(dados.nome);
    }
    if (dados.alias = 'rede') {
      this.preencherAlias(dados.alias);

    }
    if (dados.taxaAdministrativa !== undefined) {
      this.preencherTaxaAdministrativa(dados.taxaAdministrativa);
    }
    if (dados.dia !== undefined) {
      this.preencherDia(dados.dia);
    }
    if (dados.parcela !== undefined) {
      this.preencherParcela(dados.parcela);
    }
    if (dados.bandeira) {
      this.preencherBandeira(dados.bandeira);
    }
    if (dados.adquirente) {
      this.preencherAdquirente(dados.adquirente);
    }
    if (dados.tipo) {
      this.selecionarTipo(dados.tipo);
    }
  }

  /**
   * Clica no botão Salvar
   */
  clicarSalvar() {
    cy.get(CartaoCadastroLocators.btnSalvar).click();
  }

  /**
   * Salva o formulário e valida mensagem de sucesso
   */
  salvar() {
    this.clicarSalvar();
    // Aguarda o modal fechar (não estar visível)
    cy.get(CartaoCadastroLocators.modal, { timeout: 10000 }).should('not.be.visible');
    cy.get(CartaoCadastroLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Valida mensagem de sucesso
   */
  validarMensagemSucesso() {
    cy.get(CartaoCadastroLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Clica no botão Fechar do modal
   */
  clicarBotaoFechar() {
    cy.get(CartaoCadastroLocators.btnFechar).click();
    cy.get(CartaoCadastroLocators.modal, { timeout: 5000 }).should('not.be.visible');
  }

  /**
   * Valida que o modal foi fechado
   */
  validarModalFechado() {
    cy.get(CartaoCadastroLocators.modal).should('not.be.visible');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    this.clicarSalvar();
  }

  /**
   * Valida erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // O modal deve permanecer aberto
    cy.get(CartaoCadastroLocators.modal).should('exist');
    // Pode validar mensagem de erro ou campo com erro
    cy.get(CartaoCadastroLocators.campoObrigatorio).should('exist');
  }
}

export default new CartaoCadastroPage();

