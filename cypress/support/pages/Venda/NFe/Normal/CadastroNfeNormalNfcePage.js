import CadastroNfeNormalBasePage from './CadastroNfeNormalBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalNfcePage extends CadastroNfeNormalBasePage {
  avancarParaCadastroNormalNfce() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.normal).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.nfce).click({ force: true });
    cy.wait(500); // Aguarda formulário carregar
    cy.get(CadastroNfeLocators.nfce.form).should('exist');
  }

  pesquisarNfce(cliente = null, pedido = null) {
    if (cliente) {
      cy.get(CadastroNfeLocators.nfce.campoCliente).clear().type(cliente, { delay: 200 });
      cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
        .should('exist')
        .then(() => {
          cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
            .filter(':visible')
            .first()
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
        });
    }
    if (pedido) {
      cy.get(CadastroNfeLocators.nfce.campoPedido).clear().type(pedido);
    }
    cy.get(CadastroNfeLocators.nfce.form, { timeout: 10000 })
      .should('exist')
      .first()
      .within(() => {
        cy.get(CadastroNfeLocators.nfce.botaoPesquisar, { timeout: 10000 })
          .should('be.visible')
          .click({ force: true });
      });
    // Aguarda a tabela de resultados aparecer e ter pelo menos uma linha
    cy.get(CadastroNfeLocators.nfce.tabelaResultados, { timeout: 10000 })
      .should('exist')
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1);
  }

  selecionarPrimeiraNfce(confirmarEmissao = true) {
    this.selecionarPrimeiraLinhaDaListagem({
      obterLinhasFn: () => this.obterLinhasTabelaNfce(),
      colunaCliente: 3,
      ignorarConsumidor: true,
    });

    this.validarLinhaNfceSelecionada();

    this.prosseguirAposSelecao({
      confirmarEmissao,
      aguardarModalEmissao: true,
    });

    // if (!confirmarEmissao) {
    //   this.confirmarAtualizacaoCfopItensSeNecessario({ aguardarVisibilidade: true });
    // }
  }

  validarFormularioNormalNfce() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '1');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeNormalNfcePage;

