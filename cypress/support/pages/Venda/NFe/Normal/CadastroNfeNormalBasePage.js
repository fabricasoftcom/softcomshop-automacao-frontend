import CadastroNfeBasePage from '../CadastroNfeBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalBasePage extends CadastroNfeBasePage {
  fecharTutorialSeVisivel() {
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.tour.container).length) {
        cy.get(CadastroNfeLocators.tour.naoMostrarNovamente).click({ force: true });
      }
    });
  }

  marcarCheckboxDaLinha(linha) {
    cy.wrap(linha)
      .scrollIntoView()
      .should('be.visible')
      .then(($linha) => {
        const checkbox = $linha.find('input[type="checkbox"]');
        const radio = $linha.find('input[type="radio"]');

        if (checkbox.length) {
          cy.wrap(checkbox.get(0))
            .should('exist')
            .and('not.be.disabled')
            .check({ force: true })
            .should('be.checked');
          return;
        }

        if (radio.length) {
          cy.wrap(radio.get(0))
            .should('exist')
            .and('not.be.disabled')
            .check({ force: true })
            .should('be.checked');
          return;
        }

        cy.log('Nenhum checkbox/radio encontrado; clicando linha inteira');
        cy.wrap($linha).click({ force: true });
      });
  }

  prosseguirAposSelecao({
    confirmarEmissao = false,
    aguardarModalEmissao = false,
    timeoutConfirmacao = 4500,
    containerContinuar = null,
  } = {}) {
    return cy.get('body').then(($body) => {
      let $context = $body;

      if (containerContinuar) {
        const $container = $body.find(containerContinuar).filter(':visible').first();
        if ($container.length) {
          $context = $container;
        } else {
          cy.log(`Container "${containerContinuar}" nao encontrado visivel; usando body.`);
        }
      }

      const $botoesContinuar = $context
        .find('button')
        .filter(':visible')
        .filter((_, el) => /continuar/i.test((Cypress.$(el).text() || '').trim()));

      if (!$botoesContinuar.length) {
        cy.log('Botao "Continuar" nao encontrado apos selecao; prosseguindo sem clique.');
        return;
      }

      cy.wrap($botoesContinuar.last())
        .scrollIntoView()
        .should('not.be.disabled')
        .click({ force: true });

      // Trata modal de aviso de seleção primeiro (se aparecer)
      this.tratarModalAvisoSelecaoSeNecessario();

      this.confirmarEmissaoAutomaticaSeNecessario(confirmarEmissao, {
        timeout: timeoutConfirmacao,
        aguardarVisibilidade: aguardarModalEmissao,
      });
    });
  }

  obterLinhasTabelaVenda() {
    return cy
      .get(CadastroNfeLocators.venda.tabelaResultados, { timeout: 10000 })
      .find('tr')
      .filter(':visible')
      .filter((_, tr) => {
        const possuiSeletor = Cypress.$(tr).find('input[type="checkbox"], input[type="radio"]').length > 0;
        return possuiSeletor;
      });
  }

  obterLinhasTabelaNfce() {
    return cy
      .get(CadastroNfeLocators.nfce.form, { timeout: 10000 })
      .find('table tbody tr, .table tbody tr')
      .filter(':visible')
      .filter((_, tr) => {
        const possuiSeletor = Cypress.$(tr).find('input[type="checkbox"], input[type="radio"]').length > 0;
        return possuiSeletor;
      });
  }

  obterLinhasTabelaMovimentacao() {
    return cy
      .get(CadastroNfeLocators.movimentacao.tabelaResultados, { timeout: 10000 })
      .find('tr')
      .filter(':visible')
      .filter((_, tr) => {
        const possuiSeletor = Cypress.$(tr).find('input[type="checkbox"], input[type="radio"]').length > 0;
        return possuiSeletor;
      });
  }

  validarLinhaNfceSelecionada() {
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const tabela = $body.find(CadastroNfeLocators.nfce.tabelaResultados);
      expect(tabela.length, 'Tabela de NFCe deve estar presente').to.be.greaterThan(0);

      const checkboxesMarcados = tabela.find('input[type="checkbox"]:checked');
      const radiosMarcados = tabela.find('input[type="radio"]:checked');
      const linhasMarcadas = tabela.find('tr.selected, tr.active, tr.success');

      const totalSelecionados =
        checkboxesMarcados.length + radiosMarcados.length + linhasMarcadas.length;

      expect(
        totalSelecionados,
        'Alguma NFCe precisa estar marcada antes de continuar',
      ).to.be.greaterThan(0);
    });
  }

  validarLinhaMovimentacaoSelecionada() {
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const tabela = $body.find(CadastroNfeLocators.movimentacao.tabelaResultados);
      expect(tabela.length, 'Tabela de movimentações deve estar presente').to.be.greaterThan(0);

      const checkboxesMarcados = tabela.find('input[type="checkbox"]:checked');
      const radiosMarcados = tabela.find('input[type="radio"]:checked');
      const linhasMarcadas = tabela.find('tr.selected, tr.active, tr.success');

      const totalSelecionados =
        checkboxesMarcados.length + radiosMarcados.length + linhasMarcadas.length;

      expect(
        totalSelecionados,
        'Alguma movimentação precisa estar marcada antes de continuar',
      ).to.be.greaterThan(0);
    });
  }

  validarLinhaVendaSelecionada() {
    cy.get('body', { timeout: 10000 }).should(($body) => {
      const tabela = $body.find(CadastroNfeLocators.venda.tabelaResultados);
      expect(tabela.length, 'Tabela de vendas deve estar presente').to.be.greaterThan(0);

      const checkboxesMarcados = tabela.find('input[type="checkbox"]:checked');
      const radiosMarcados = tabela.find('input[type="radio"]:checked');
      const linhasMarcadas = tabela.find('tr.selected, tr.active, tr.success');

      const totalSelecionados =
        checkboxesMarcados.length + radiosMarcados.length + linhasMarcadas.length;

      expect(
        totalSelecionados,
        'Alguma venda precisa estar marcada antes de continuar',
      ).to.be.greaterThan(0);
    });
  }

  selecionarPrimeiraLinhaDaListagem({
    obterLinhasFn,
    colunaCliente = null,
    ignorarConsumidor = false,
  } = {}) {
    const linhas = typeof obterLinhasFn === 'function' ? obterLinhasFn() : obterLinhasFn;

    return linhas
      .filter((index, tr) => {
        if (!ignorarConsumidor || colunaCliente === null) {
          return true;
        }

        const cliente = Cypress.$(tr).find('td').eq(colunaCliente).text().trim().toUpperCase();
        return cliente !== 'CONSUMIDOR';
      })
      .should('have.length.at.least', 1)
      .first()
      .then(($linha) => {
        // Verifica se a linha tem checkbox ou radio antes de tentar marcar
        const checkbox = $linha.find('input[type="checkbox"]');
        const radio = $linha.find('input[type="radio"]');

        if (checkbox.length) {
          cy.wrap(checkbox)
            .first()
            .should('exist')
            .and('not.be.disabled')
            .check({ force: true })
            .should('be.checked');
        } else if (radio.length) {
          cy.wrap(radio)
            .first()
            .should('exist')
            .and('not.be.disabled')
            .check({ force: true })
            .should('be.checked');
        } else {
          cy.log('Nenhum checkbox/radio encontrado; clicando linha inteira');
          cy.wrap($linha).click({ force: true });
        }
      });
  }
}

export default CadastroNfeNormalBasePage;

