import CadastroNfeNormalBasePage from './CadastroNfeNormalBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalMovimentacaoPage extends CadastroNfeNormalBasePage {
  avancarParaCadastroNormalMovimentacao() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.normal).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.movimentacao).click({ force: true });
    cy.wait(500); // Aguarda formulário carregar
    cy.get(CadastroNfeLocators.movimentacao.form).should('exist');
  }

  pesquisarMovimentacao(operacao = null, tipo = null) {
    if (operacao) {
      cy.get(CadastroNfeLocators.movimentacao.campoOperacao).select(operacao);
    }
    if (tipo) {
      cy.get(CadastroNfeLocators.movimentacao.campoTipo).clear().type(tipo, { delay: 200 });
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

    // Clica no botão pesquisar
    cy.get(CadastroNfeLocators.movimentacao.botaoPesquisar).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela de resultados aparecer e estar completamente visível
    cy.get(CadastroNfeLocators.movimentacao.tabelaResultados, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Aguarda que existam linhas visíveis na tabela
    cy.get(CadastroNfeLocators.movimentacao.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(($linhas) => {
        // Valida que pelo menos uma linha está completamente visível e tem células
        cy.wrap($linhas.first())
          .should('be.visible')
          .within(() => {
            cy.get('td').should('have.length.at.least', 1).should('be.visible');
            // Valida que a linha tem checkbox para seleção
            cy.get('input[type="checkbox"]').should('exist');
          });
      });
  }

  selecionarPrimeiraMovimentacao(confirmarEmissao = true) {
    this.selecionarPrimeiraLinhaDaListagem({
      obterLinhasFn: () => this.obterLinhasTabelaMovimentacao(),
    });

    this.validarLinhaMovimentacaoSelecionada();

    this.prosseguirAposSelecao({
      confirmarEmissao,
      aguardarModalEmissao: true,
    });

    // if (!confirmarEmissao) {
    //   this.confirmarAtualizacaoCfopItensSeNecessario({ aguardarVisibilidade: true });
    // }
  }

  validarFormularioNormalMovimentacao() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '1');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeNormalMovimentacaoPage;

