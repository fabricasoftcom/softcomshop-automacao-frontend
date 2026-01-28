import CadastroNfeNormalBasePage from './CadastroNfeNormalBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalVendaPage extends CadastroNfeNormalBasePage {
  avancarParaCadastroNormalVenda() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.normal).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.venda).click({ force: true });

    // Aguarda o formulário de pesquisa aparecer e todos os elementos ficarem visíveis
    cy.get(CadastroNfeLocators.venda.form, { timeout: 10000 }).should('exist');

    // Aguarda todos os campos do formulário ficarem visíveis
    cy.get(CadastroNfeLocators.venda.campoData, { timeout: 10000 })
      .should('be.visible');
    cy.get(CadastroNfeLocators.venda.campoCliente, { timeout: 10000 })
      .should('be.visible');
    cy.get(CadastroNfeLocators.venda.campoPedido, { timeout: 10000 })
      .should('be.visible');
    cy.get(CadastroNfeLocators.venda.botaoPesquisar, { timeout: 10000 })
      .should('be.visible');

    this.aguardarListaVendasCarregar({ exigirResultados: false });
  }

  pesquisarVenda(cliente = null, pedido = null) {
    if (cliente) {
      cy.get(CadastroNfeLocators.venda.campoCliente).clear().type(cliente, { delay: 200 });
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
      cy.get(CadastroNfeLocators.venda.campoPedido).clear().type(pedido);
    }

    // Clica no botão pesquisar
    cy.get(CadastroNfeLocators.venda.botaoPesquisar).click({ force: true });

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela de resultados aparecer e estar completamente visível
    cy.get(CadastroNfeLocators.venda.tabelaResultados, { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    // Aguarda que existam linhas visíveis na tabela
    cy.get(CadastroNfeLocators.venda.tabelaResultados)
      .find('tr')
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(($linhas) => {
        // Valida que pelo menos uma linha está completamente visível e tem células
        cy.wrap($linhas.first())
          .should('be.visible')
          .within(() => {
            cy.get('td').should('have.length.at.least', 1).should('be.visible');
          });
      });
  }

  selecionarPrimeiraVenda() {
    // Intercepta requisições que podem ser disparadas ao selecionar a venda (opcional)
    cy.intercept('POST', '**/nfe2/**').as('criarNfeVenda');
    cy.intercept('GET', '**/nfe2/**').as('carregarNfeVenda');

    this.selecionarPrimeiraLinhaDaListagem({
      obterLinhasFn: () => this.obterLinhasTabelaVenda(),
    });

    this.validarLinhaVendaSelecionada();

    // Prossegue para o formulário principal
    cy.wait(500);
    this.clicarBotaoContinuarRodape();

    // Aguarda redirecionamento para a tela de edição
    cy.url({ timeout: 30000 }).should('match', /\/nfe2\/\d+\/(editar|novo)/);

    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda o skeleton desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.skeletonForm).length > 0) {
        cy.get(CadastroNfeLocators.skeletonForm, { timeout: 20000 })
          .should('not.be.visible');
      }
    });

    // Valida que o formulário foi carregado após a seleção (com timeout maior)
    this.aguardarFormularioPrincipalCarregado(30000);
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  selecionarVendaClienteDiferenteConsumidor(confirmarEmissao = true) {
    cy.get(CadastroNfeLocators.venda.tabelaVendas)
      .filter((index, tr) => {
        const cliente = Cypress.$(tr).find('td').eq(2).text().trim();
        return cliente !== 'CONSUMIDOR';
      })
      .first()
      .find('input[type="checkbox"]')
      .check({ force: true })
      .should('be.checked');

    this.prosseguirAposSelecao({
      confirmarEmissao,
      aguardarModalEmissao: true,
    });

    if (!confirmarEmissao) {
      this.confirmarAtualizacaoCfopItensSeNecessario({ aguardarVisibilidade: true });

      // Aguarda redirecionamento para a tela de edição
      cy.url({ timeout: 30000 }).should('match', /\/nfe2\/\d+\/(editar|novo)/);

      // Aguarda o loading desaparecer se existir
      cy.get('body').then(($body) => {
        if ($body.find('#loading').length > 0) {
          cy.get('#loading', { timeout: 20000 }).should('not.exist');
        }
      });

      // Aguarda o skeleton desaparecer se existir
      cy.get('body').then(($body) => {
        if ($body.find(CadastroNfeLocators.skeletonForm).length > 0) {
          cy.get(CadastroNfeLocators.skeletonForm, { timeout: 20000 })
            .should('not.be.visible');
        }
      });

      // Valida que o formulário foi carregado após a seleção
      this.aguardarFormularioPrincipalCarregado(30000);
      cy.get(CadastroNfeLocators.formulario).should('exist');
    }
  }

  validarFormularioNormalVenda() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '1');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
  }
}

export default CadastroNfeNormalVendaPage;

