import CadastroNfeLocators from "../../locators/Venda/CadastroNfeLocators";

class CadastroNfePage {
  validarTelaInicial() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tituloPagina)
      .invoke('text')
      .should((texto) => {
        expect(texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).to.include('Nota Fiscal Eletronica');
      });
    cy.url().should('match', /\/nfe2\/novo/);
    cy.get(CadastroNfeLocators.botaoVoltarListagem).should('be.visible');
    cy.get(CadastroNfeLocators.widgetStatus).should('exist');
    cy.get(CadastroNfeLocators.botaoExcluir).should('exist');
  }

  validarPassosETabs() {
    cy.get(CadastroNfeLocators.stepsHeader).should('have.length.at.least', 5);
    cy.get(CadastroNfeLocators.stepFinalidadeAtivo).should('exist');

    cy.get(CadastroNfeLocators.tabsTipoNota.normal).should('exist').and('be.visible');
    cy.get(CadastroNfeLocators.tabsTipoNota.devolucao).should('exist');
    cy.get(CadastroNfeLocators.tabsTipoNota.ajuste).should('exist');
    cy.get(CadastroNfeLocators.tabsTipoNota.complementar).should('exist');
  }

  validarTipoAvulsaPreSelecionado() {
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).should('have.class', 'active');
    cy.get(`${CadastroNfeLocators.radiosTipoNfe.avulsa} input[type="radio"]`).should('be.checked');
    cy.get(CadastroNfeLocators.radiosTipoNfe.venda).should('exist');
    cy.get(CadastroNfeLocators.radiosTipoNfe.nfce).should('exist');
    cy.get(CadastroNfeLocators.radiosTipoNfe.movimentacao).should('exist');
  }

  validarSkeletonsIniciais() {
    cy.get(CadastroNfeLocators.skeletonForm).should('exist');
    cy.get(CadastroNfeLocators.skeletonItems).should('exist');
    cy.get(CadastroNfeLocators.skeletonPayments).should('exist');
    cy.get(CadastroNfeLocators.painelEmitirNota).should('exist');
  }

  fecharTutorialSeVisivel() {
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.tour.container).length) {
        cy.get(CadastroNfeLocators.tour.naoMostrarNovamente).click({ force: true });
      }
    });
  }

  desabilitarTourFinalidadeNormal() {
    const baseKey = 'tour_https://stage-hotfix.softcomshop.com.br_1_finalidade_';
    const chaves = ['normal', 'devolucao', 'ajuste', 'complementar'];
    cy.window().then((win) => {
      chaves.forEach((k) => win.localStorage.setItem(`${baseKey}${k}`, '1'));
      win.localStorage.setItem('tour_https://stage-hotfix.softcomshop.com.br_1_produto_padrao', '1');
    });
  }

  validarAbasFinalidade() {
    const tabs = CadastroNfeLocators.tabsTipoNota;
    const conteudos = CadastroNfeLocators.conteudoTabs;

    Object.keys(tabs).forEach((key) => {
      const tabSelector = tabs[key];
      const contentSelector = conteudos[key];

      cy.get(tabSelector).should('exist').click({ force: true });
      cy.get(contentSelector)
        .should('have.class', 'active')
        .wait(500);
    });
  }

}

export default new CadastroNfePage();

