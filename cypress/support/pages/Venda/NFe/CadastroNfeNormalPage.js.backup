import CadastroNfeBasePage from './CadastroNfeBasePage';
import CadastroNfeLocators from '../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalPage extends CadastroNfeBasePage {
  avancarParaCadastroNormalAvulsa() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.normal).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).click({ force: true });
    cy.contains('button', /continuar|pr\u00F3ximo/i).click({ force: true });
    this.aguardarFormularioPrincipalCarregado();
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  validarFormularioNormalAvulsa() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '1');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(campos.dataHoraEmissao).should('exist');
    cy.get(campos.dataHoraSaida).should('exist');
    cy.get(campos.indicadorPresencial).should('exist');
    cy.get(campos.movimentarEstoqueSwitch).should('exist');

    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
    cy.get(CadastroNfeLocators.destinatario.cpfCnpj).should('exist');
  }

  fecharTutorialSeVisivel() {
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.tour.container).length) {
        cy.get(CadastroNfeLocators.tour.naoMostrarNovamente).click({ force: true });
      }
    });
  }

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

  // Seleciona a primeira linha elegível garantindo que tenha checkbox/radio marcado pelo helper
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
    cy.get(CadastroNfeLocators.nfce.botaoPesquisar).click({ force: true });
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

export default new CadastroNfeNormalPage();

