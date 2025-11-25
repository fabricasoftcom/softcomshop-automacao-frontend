import CadastroNfeBasePage from './CadastroNfeBasePage';
import CadastroNfeLocators from '../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeComplementarPage extends CadastroNfeBasePage {
  avancarParaCadastroComplementarAvulsa() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.complementar).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).click({ force: true });
    cy.contains('button', /continuar|pr\u00F3ximo/i).click({ force: true });
    const complementar = CadastroNfeLocators.complementar;
    cy.get(complementar.painelTabs, { timeout: 20000 })
      .should('exist')
      .and('have.class', 'active');
    cy.get(complementar.form, { timeout: 20000 }).should('exist');
  }

  validarFormularioComplementarAvulsa() {
    const complementar = CadastroNfeLocators.complementar;
    cy.get(complementar.painelTabs).should('exist').and('have.class', 'active');
    cy.get(complementar.form).should('exist').and('be.visible');
    cy.get(complementar.numeroAutocomplete).should('exist');
    cy.get(complementar.numeroHidden).should('exist');
    cy.get(complementar.chaveAutocomplete).should('exist');
    cy.get(complementar.chaveHidden).should('exist');
  }

  preencherDadosNotaComplementar() {
    const complementar = CadastroNfeLocators.complementar;

    // Selecionar Nota Fiscal - clica no campo para expandir autocomplete
    cy.get(complementar.numeroAutocomplete, { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    // Clica no ícone de busca para expandir a lista
    cy.get(complementar.numeroIcone, { timeout: 5000 })
      .should('exist')
      .click({ force: true });
    // Aguarda o typeahead aparecer e seleciona o primeiro resultado válido
    cy.get(`${complementar.numeroContainer} .typeahead-list li a`, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .then(($el) => {
        const texto = $el.text();
        if (!texto.includes('Não foram encontrados')) {
          cy.wrap($el).click({ force: true });
          // Valida que o campo hidden foi preenchido
          cy.get(complementar.numeroHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        }
      });

    // Selecionar Chave de Acesso - clica no campo para expandir autocomplete
    cy.get(complementar.chaveAutocomplete, { timeout: 10000 })
      .should('exist')
      .click({ force: true });

    // Clica no ícone de busca para expandir a lista
    cy.get(complementar.chaveIcone, { timeout: 5000 })
      .should('exist')
      .click({ force: true });

    // Aguarda o typeahead aparecer e seleciona o primeiro resultado válido
    cy.get(`${complementar.chaveContainer} .typeahead-list li a`, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .then(($el) => {
        const texto = $el.text();
        if (!texto.includes('Não foram encontrados')) {
          cy.wrap($el).click({ force: true });

          // Valida que o campo hidden foi preenchido
          cy.get(complementar.chaveHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        }
      });

    // Após selecionar ambos os campos, clica em continuar
    this.clicarBotaoContinuarRodape();
  }

  adicionarItemComplementar(produto = null) {
    // Para NFe complementar, quantidade e valores devem ficar zerados
    this.validarTelaSelecaoItens();
    this.verificarCamposItem();

    if (produto) {
      this.selecionarPrimeiroProdutoDisponivel();
    } else {
      this.selecionarPrimeiroProdutoDisponivel();
    }

    // Força quantidade a zero
    this.preencherQuantidadeItem('0');

    // Força preço a zero
    this.preencherPrecoItem('0');

    this.salvarItem();
    this.verificarTabelaItens();
    this.verificarItemNaTabela(1);
    this.clicarBotaoContinuarRodape();
  }

  fecharTutorialSeVisivel() {
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.tour.container).length) {
        cy.get(CadastroNfeLocators.tour.naoMostrarNovamente).click({ force: true });
      }
    });
  }
}

export default new CadastroNfeComplementarPage();

