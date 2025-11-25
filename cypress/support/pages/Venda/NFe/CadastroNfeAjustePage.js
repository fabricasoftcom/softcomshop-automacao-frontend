import CadastroNfeBasePage from './CadastroNfeBasePage';
import CadastroNfeLocators from '../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeAjustePage extends CadastroNfeBasePage {
  avancarParaCadastroAjusteAvulsa() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.ajuste).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).click({ force: true });
    cy.contains('button', /continuar|pr\u00F3ximo/i).click({ force: true });
    const ajuste = CadastroNfeLocators.ajuste;
    cy.get(ajuste.painelTabs, { timeout: 20000 })
      .should('exist')
      .and('have.class', 'active');
    cy.get(ajuste.form, { timeout: 20000 }).should('exist');
  }

  validarFormularioAjusteAvulsa() {
    const ajuste = CadastroNfeLocators.ajuste;
    cy.get(ajuste.painelTabs).should('exist').and('have.class', 'active');
    cy.get(ajuste.form).should('exist').and('be.visible');
    cy.get(ajuste.numeroAutocomplete).should('exist');
    cy.get(ajuste.numeroHidden).should('exist');
    cy.get(ajuste.chaveAutocomplete).should('exist');
    cy.get(ajuste.chaveHidden).should('exist');
  }

  preencherDadosNotaAjuste() {
    const ajuste = CadastroNfeLocators.ajuste;

    // Selecionar Nota Fiscal - clica no campo para expandir autocomplete
    cy.get(ajuste.numeroAutocomplete, { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    // Clica no ícone de busca para expandir a lista
    cy.get(ajuste.numeroIcone, { timeout: 5000 })
      .should('exist')
      .click({ force: true });
    // Aguarda o typeahead aparecer e seleciona o primeiro resultado válido
    cy.get(`${ajuste.numeroContainer} .typeahead-list li a`, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .then(($el) => {
        const texto = $el.text();
        if (!texto.includes('Não foram encontrados')) {
          cy.wrap($el).click({ force: true });
          // Valida que o campo hidden foi preenchido
          cy.get(ajuste.numeroHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        }
      });

    // Selecionar Chave de Acesso - clica no campo para expandir autocomplete
    cy.get(ajuste.chaveAutocomplete, { timeout: 10000 })
      .should('exist')
      .click({ force: true });
    // Clica no ícone de busca para expandir a lista
    cy.get(ajuste.chaveIcone, { timeout: 5000 })
      .should('exist')
      .click({ force: true });
    // Aguarda o typeahead aparecer e seleciona o primeiro resultado válido
    cy.get(`${ajuste.chaveContainer} .typeahead-list li a`, { timeout: 10000 })
      .should('have.length.at.least', 1)
      .filter(':visible')
      .first()
      .then(($el) => {
        const texto = $el.text();
        if (!texto.includes('Não foram encontrados')) {
          cy.wrap($el).click({ force: true });
          // Valida que o campo hidden foi preenchido
          cy.get(ajuste.chaveHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        }
      });
    // Após selecionar ambos os campos, clica em continuar
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

export default new CadastroNfeAjustePage();
