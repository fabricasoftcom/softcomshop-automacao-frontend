import CadastroNfeLocators from "../../../locators/Venda/CadastroNfeLocators";

let itensRequestInterceptada = false;
let destinatarioRequestInterceptada = false;

class CadastroNfeBasePage {
  // Métodos comuns para todos os tipos de NFe

  aguardarFormularioPrincipalCarregado(timeout = 30000) {
    cy.get('body', { timeout }).should(($body) => {
      const possuiContainerPadrao = $body.find(CadastroNfeLocators.formularioPadrao).length > 0;
      const possuiFormulario = $body.find(CadastroNfeLocators.formulario).length > 0;
      const possuiCamposPrincipais =
        $body.find(CadastroNfeLocators.camposPrincipais.finalidade).length > 0 &&
        $body.find(CadastroNfeLocators.camposPrincipais.serie).length > 0;

      expect(
        possuiContainerPadrao || possuiFormulario || possuiCamposPrincipais,
        'Formulário principal da NFe disponível',
      ).to.be.true;
    });
  }

  clicarBotaoContinuarRodape() {
    cy.wait(1000);
    cy.get('body')
      .find('button')
      .filter(':visible')
      .filter((_, el) => /continuar/i.test(Cypress.$(el).text().trim()))
      .then(($btns) => {
        expect($btns.length, 'Botão "Continuar" visível na tela').to.be.greaterThan(0);
        const botaoContinuar = $btns.last();
        cy.wrap(botaoContinuar)
          .scrollIntoView()
          .should('not.be.disabled')
          .click({ force: true });
      });
  }

  validarTelaSelecaoItens() {
    cy.url().should('match', /\/nfe2\/\d+\/editar/);

    this.aguardarRequisicaoItensSeNecessario();

    // Aguarda o loading desaparecer
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda o skeleton desaparecer ou ficar invisível
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.skeletonItems).length > 0) {
        cy.get(CadastroNfeLocators.skeletonItems, { timeout: 20000 })
          .should('not.be.visible');
      }
    });

    // Aguarda o painel de itens estar visível - Cypress faz retry automático
    cy.get(CadastroNfeLocators.itens.painel, { timeout: 30000 })
      .should('be.visible');

    // Aguarda o container da tabela estar visível
    cy.get(CadastroNfeLocators.itens.tabelaContainer, { timeout: 30000 })
      .should('be.visible');
  }

  validarTelaPagamentos() {
    const pagamentos = CadastroNfeLocators.pagamentos;

    cy.get(pagamentos.painel, { timeout: 30000 })
      .should('exist')
      .should('be.visible');

    cy.get(pagamentos.titulo)
      .should('exist')
      .invoke('text')
      .should('match', /Pagamentos/i);

    cy.get(pagamentos.botaoNovo).should('exist').and('be.visible');
    cy.get(pagamentos.tabela).should('exist').and('be.visible');

    cy.get(pagamentos.chargesPanel)
      .should('exist')
      .first()
      .within(() => {
        cy.get(pagamentos.formaPagamentoSelect).should('exist');
      });

    cy.get(pagamentos.totalCobrancas).should('exist');
    cy.get(pagamentos.tabelaCobrancas).should('exist');
  }

  abrirModalNovoPagamento() {
    const pagamentos = CadastroNfeLocators.pagamentos;

    cy.get(pagamentos.botaoNovo)
      .should('be.visible')
      .click({ force: true });

    cy.get(pagamentos.modal.container, { timeout: 10000 })
      .should('exist')
      .should('be.visible');

    cy.get(pagamentos.modal.titulo)
      .should('contain.text', 'Novo Pagamento');
  }

  preencherModalPagamento(tipo = '90') {
    const modal = CadastroNfeLocators.pagamentos.modal;

    cy.get(modal.tipoPagamento)
      .should('exist')
      .select(tipo);
  }

  salvarModalPagamento() {
    const modal = CadastroNfeLocators.pagamentos.modal;
    cy.intercept('POST', '**/nfe2/**/pagamentos/salvar').as('salvarPagamento');

    cy.get(modal.btnSalvar)
      .should('be.visible')
      .click({ force: true });

    cy.wait('@salvarPagamento', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200);

    cy.get(modal.container, { timeout: 10000 }).should('not.exist');
  }

  adicionarPagamentoBasico(tipo = '90') {
    this.validarTelaPagamentos();
    this.abrirModalNovoPagamento();
    this.preencherModalPagamento(tipo);
    this.salvarModalPagamento();
    cy.get(CadastroNfeLocators.pagamentos.linhasTabela, { timeout: 10000 })
      .should('exist')
      .and('have.length.at.least', 1);
  }

  validarTelaEmitirNota() {
    cy.get(CadastroNfeLocators.painelEmitirNota, { timeout: 20000 })
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('h3', /Emitir Nota Fiscal Eletronica/i).should('exist');
      });

    cy.get(CadastroNfeLocators.emitirNotaBotao)
      .should('exist')
      .and('be.visible');

    cy.get(CadastroNfeLocators.emitirNotaIcone).should('exist');
  }

  emitirNota() {
    cy.get(CadastroNfeLocators.emitirNotaBotao, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  validarModalSucessoEmissao(acao = 'listagem') {
    const modal = CadastroNfeLocators.modalSucessoEmissao;

    cy.get(modal.container, { timeout: 200000 })
      .should('be.visible');

    cy.get(modal.titulo)
      .should('exist')
      .invoke('text')
      .should('match', /autorizada|emitida/i);

    cy.get(modal.descricao)
      .should('exist')
      .invoke('text')
      .should('match', /emitida com sucesso/i);

    if (acao === 'nova-nota') {
      cy.get(modal.botaoNovaNota).click({ force: true });
    } else {
      cy.get(modal.botaoListagem).click({ force: true });
    }

    cy.get(modal.container, { timeout: 10000 }).should('not.exist');
  }

  aguardarRequisicaoItensSeNecessario() {
    cy.wrap(null).then(() => {
      if (itensRequestInterceptada) {
        return cy
          .wait('@carregarItens', { timeout: 30000 })
          .its('response.statusCode')
          .should('eq', 200)
          .then(() => {
            itensRequestInterceptada = false;
          });
      }

      cy.log('Nenhuma requisição de itens interceptada; seguindo com validações visuais.');
    });
  }

  verificarCamposItem() {
    cy.get(CadastroNfeLocators.itens.produtoAutocomplete, { timeout: 10000 }).should('exist');
    cy.get(CadastroNfeLocators.itens.descricao, { timeout: 10000 }).should('exist');
    cy.get(CadastroNfeLocators.itens.quantidade, { timeout: 10000 }).should('exist');
    cy.get(CadastroNfeLocators.itens.preco, { timeout: 10000 }).should('exist');
  }

  selecionarPrimeiroProdutoDisponivel() {
    cy.get(CadastroNfeLocators.itens.produtoAutocomplete, { timeout: 10000 })
      .should('exist')
      .click({ force: true });

    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.itens.produtoResultado).length === 0) {
        cy.get(CadastroNfeLocators.itens.produtoIcon, { timeout: 10000 })
          .first()
          .click({ force: true });
      }
    });

    cy.get(CadastroNfeLocators.itens.produtoResultado, { timeout: 10000 })
      .filter(':visible')
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get(CadastroNfeLocators.itens.produtoHiddenId, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);
  }

  preencherQuantidadeItem(quantidade) {
    cy.get(CadastroNfeLocators.itens.quantidade, { timeout: 10000 })
      .should('exist')
      .then(($input) => {
        cy.wrap($input)
          .clear()
          .type(quantidade, { delay: 0 });
      });
  }

  preencherPrecoItem(preco) {
    cy.get(CadastroNfeLocators.itens.preco, { timeout: 10000 })
      .should('exist')
      .then(($input) => {
        cy.wrap($input)
          .clear()
          .type(preco, { delay: 0 });
      });
  }

  preencherDescricaoItem(descricao) {
    cy.get(CadastroNfeLocators.itens.descricao, { timeout: 10000 })
      .clear()
      .type(descricao);
  }

  salvarItem() {
    cy.intercept('POST', '**/nfe2/**/itens/salvar').as('salvarItem');
    cy.get('body').then(($body) => {
      if ($body.find(CadastroNfeLocators.itens.btnSalvarItem).length) {
        cy.get(CadastroNfeLocators.itens.btnSalvarItem)
          .filter(':visible')
          .first()
          .scrollIntoView()
          .click({ force: true });
      } else {
        cy.get(CadastroNfeLocators.itens.preco, { timeout: 10000 }).blur();
      }
    });

    cy.wait('@salvarItem', { timeout: 30000 }).its('response.statusCode').should('eq', 200);
  }

  adicionarItem(produto = null, quantidade = '1', preco = null, descricao = null) {
    this.validarTelaSelecaoItens();
    this.verificarCamposItem();
    if (produto) {
      // Se um produto específico foi fornecido, pode ser implementado depois
      this.selecionarPrimeiroProdutoDisponivel();
    } else {
      this.selecionarPrimeiroProdutoDisponivel();
    }
    this.preencherQuantidadeItem(quantidade);

    if (preco) {
      this.preencherPrecoItem(preco);
    } else {
      this.preencherPrecoItem('10');
    }
    if (descricao) {
      this.preencherDescricaoItem(descricao);
    }
    this.salvarItem();
    this.verificarTabelaItens();
    this.verificarItemNaTabela(1);
    this.clicarBotaoContinuarRodape();
  }

  verificarTabelaItens() {
    cy.get(CadastroNfeLocators.itens.tabelaItens, { timeout: 10000 }).should('be.visible');
  }

  verificarItemNaTabela(quantidadeMinima = 1) {
    cy.get(CadastroNfeLocators.itens.linhasTabela, { timeout: 10000 })
      .should('have.length.at.least', quantidadeMinima);
  }

  // Métodos auxiliares comuns
  confirmarAtualizacaoCfopItensSeNecessario({ aguardarVisibilidade = false } = {}) {
    const modalSelector = '.sweet-alert.modal-confirm-destroy';

    if (aguardarVisibilidade) {
      cy.get('body').then(($body) => {
        if ($body.find(`${modalSelector}:visible`).length === 0) {
          cy.get(modalSelector, { timeout: 15000 }).should('be.visible');
        }
      });
    }

    cy.get('body').then(($body) => {
      const modal = $body.find(`${modalSelector}:visible`);

      if (modal.length) {
        cy.wrap(modal)
          .should('be.visible')
          .within(() => {
            cy.contains('h2', 'CFOP dos itens', { matchCase: false }).should('be.visible');
            cy.get('button.confirm').click({ force: true });
          });

        cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 }).should('not.exist');
        cy.wait(600);
      }
    });
  }

  aguardarInstantesAposSweetAlert(delay = 600) {
    cy.get('body').then(($body) => {
      if ($body.find('.sweet-alert.modal-confirm-destroy:visible').length) {
        cy.get('.sweet-alert.modal-confirm-destroy', { timeout: 10000 }).should('not.exist');
      }
    });

    cy.wait(delay);
  }

  tratarModalAvisoSelecaoSeNecessario() {
    const modalSelector = '.sweet-alert.showSweetAlert.visible';

    cy.get('body').then(($body) => {
      const modal = $body.find(`${modalSelector}:visible`);

      if (modal.length) {
        const titulo = modal.find('h2').text().trim();
        const mensagem = modal.find('p').text().trim();

        // Verifica se é o modal de aviso de seleção
        if (/Aviso/i.test(titulo) && /selecionar/i.test(mensagem)) {
          cy.wrap(modal)
            .should('be.visible')
            .within(() => {
              cy.contains('button', 'OK', { matchCase: false })
                .should('be.visible')
                .click({ force: true });
            });

          cy.get(modalSelector, { timeout: 10000 }).should('not.exist');
          cy.wait(600);
        }
      }
    });
  }

  confirmarEmissaoAutomaticaSeNecessario(confirmar = true, options = {}) {
    const { timeout = 10000, delay = 1500, aguardarVisibilidade = false } = options;
    const modalSelector = '.sweet-alert.showSweetAlert.visible';
    const tempoMaximo = aguardarVisibilidade ? timeout : Math.min(timeout, 3000);
    let interagiuComModal = false;

    const esperarModalVisivel = () =>
      new Cypress.Promise((resolve) => {
        const inicio = Date.now();
        const checar = () => {
          const modal = Cypress.$(`${modalSelector}:visible`);

          if (modal.length) {
            resolve(modal);
            return;
          }

          if (Date.now() - inicio >= tempoMaximo) {
            resolve(null);
            return;
          }

          setTimeout(checar, 200);
        };

        checar();
      });

    cy.wait(delay);

    cy.then(() => esperarModalVisivel())
      .then(($modal) => {
        if (!$modal) {
          cy.log('Modal de emissao automatica nao exibido; prosseguindo fluxo.');
          return;
        }

        const titulo = ($modal.find('h2').text() || '').trim();
        if (!/Emiss.o da nota fiscal/i.test(titulo)) {
          cy.log(`Sweet alert ignorado (titulo diferente: ${titulo || 'sem titulo'})`);
          return;
        }

        interagiuComModal = true;

        const textoBotao = confirmar ? /Sim, pode emitir!?/i : /N.?o/i;

        return cy.wrap($modal)
          .should('be.visible')
          .within(() => {
            cy.contains('button', textoBotao)
              .should('be.visible')
              .click({ force: true });
          });
      })
      .then(() => {
        if (interagiuComModal) {
          cy.get(modalSelector, { timeout }).should('not.exist');
          cy.wait(600);
        }
      });
  }

  aguardarRequestDestinatarioSeNecessario() {
    cy.then(() => {
      if (!destinatarioRequestInterceptada) {
        cy.log('Nenhuma requisicao de destinatario foi interceptada; seguindo sem aguardar.');
        return;
      }

      destinatarioRequestInterceptada = false;
      return cy
        .wait('@salvarDestinatario', { timeout: 20000 })
        .its('response.statusCode')
        .should('eq', 200);
    });
  }

  validarDestinatarioJaPreenchido() {
    cy.get(CadastroNfeLocators.destinatario.nome, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);

    cy.get(CadastroNfeLocators.destinatario.nomeHidden, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);

    cy.get(CadastroNfeLocators.destinatario.cpfCnpj, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);
  }

  preencherDestinatario(nome, { validarPreenchido = false, aguardarPosSweetAlert = false } = {}) {
    destinatarioRequestInterceptada = false;
    // Intercepta requisições POST para /nfe2/salvar com ou sem path adicional
    cy.intercept(
      { method: 'POST', url: /.*\/nfe2\/salvar.*/, middleware: true },
      (req) => {
        destinatarioRequestInterceptada = true;
        req.continue();
      },
    ).as('salvarDestinatario');
    itensRequestInterceptada = false;
    cy.intercept(
      { method: 'GET', url: '**/nfe2/**/itens*', middleware: true },
      (req) => {
        itensRequestInterceptada = true;
        req.continue();
      },
    ).as('carregarItens');

    if (aguardarPosSweetAlert) {
      this.aguardarInstantesAposSweetAlert();
    }

    if (validarPreenchido) {
      this.validarDestinatarioJaPreenchido();
    }

    cy.get(CadastroNfeLocators.destinatario.nome)
      .clear()
      .type(nome, { delay: 200 });

    // Aguarda o typeahead aparecer (verifica se existe pelo menos um item)
    cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 10000 })
      .should('exist')
      .then(() => {
        // Depois busca o primeiro item visível e clica
        cy.get(CadastroNfeLocators.typeaheadPrimeiroItem)
          .filter(':visible')
          .first()
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });
      });

    cy.get(CadastroNfeLocators.destinatario.nomeHidden, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);
    cy.get(CadastroNfeLocators.destinatario.cpfCnpj, { timeout: 10000 })
      .invoke('val')
      .should('match', /\S+/);

    // Aguarda a requisição de salvamento do destinatário se foi interceptada
    // Se o destinatário não mudou, a requisição pode não ser disparada
    // Aguarda um pouco para dar tempo da requisição ser disparada
    cy.wait(1000);

    // Tenta aguardar a requisição, mas não falha se ela não acontecer
    cy.then(() => {
      // Verifica se a requisição foi interceptada
      if (destinatarioRequestInterceptada) {
        cy.wait('@salvarDestinatario', { timeout: 15000 })
          .its('response.statusCode')
          .should('eq', 200);
      } else {
        cy.log('Nenhuma requisição de destinatário foi interceptada; o destinatário pode não ter mudado ou já estava salvo');
      }
    });

    this.clicarBotaoContinuarRodape();
  }

  preencherNatureza(cfop, { aguardarSweetAlertCfop = false } = {}) {
    cy.intercept('POST', '**/nfe-nfce/vinculos-fiscais/autocomplete/cfop').as('autocompleteNatureza');
    if (aguardarSweetAlertCfop) {
      cy.intercept({ method: 'POST', url: '**/nfe2/salvar/**', times: 1 }).as('salvarNaturezaCfop');
    }

    cy.get(CadastroNfeLocators.camposPrincipais.naturezaAuto)
      .clear()
      .type(cfop, { delay: 250 });

    cy.wait('@autocompleteNatureza', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

    cy.get(CadastroNfeLocators.typeaheadPrimeiroItem, { timeout: 20000 })
      .filter(':visible')
      .first()
      .should('be.visible')
      .click({ force: true });

    if (aguardarSweetAlertCfop) {
      cy.wait('@salvarNaturezaCfop', { timeout: 30000 })
        .its('response.statusCode')
        .should('eq', 200);
      this.confirmarAtualizacaoCfopItensSeNecessario({ aguardarVisibilidade: true });
    } else {
      this.confirmarAtualizacaoCfopItensSeNecessario();
    }

    cy.get(CadastroNfeLocators.camposPrincipais.naturezaCodigo, { timeout: 10000 }).should(($el) => {
      const val = $el.val() || '';
      expect(val.length).to.be.greaterThan(0);
      expect(val).to.include(cfop);
    });
  }

  aguardarListaVendasCarregar({ exigirResultados = true } = {}) {
    // Aguarda o loading desaparecer se existir
    cy.get('body').then(($body) => {
      if ($body.find('#loading').length > 0) {
        cy.get('#loading', { timeout: 20000 }).should('not.exist');
      }
    });

    // Aguarda a tabela aparecer (se já existir)
    if (exigirResultados) {
      cy.get(CadastroNfeLocators.venda.tabelaResultados, { timeout: 10000 })
        .should('exist')
        .find('tr')
        .filter(':visible')
        .should('have.length.at.least', 1);
    } else {
      // Apenas aguarda o formulário estar presente
      cy.get(CadastroNfeLocators.venda.form, { timeout: 10000 }).should('exist');
    }
  }
}

export default CadastroNfeBasePage;

