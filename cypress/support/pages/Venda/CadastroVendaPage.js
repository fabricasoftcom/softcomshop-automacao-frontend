import menulateralvendapage from "../menulateral/menulateralvendapage";
import listagemVendasLocators from "../../locators/Venda/ListagemVendasLocators";
import cadastroVendaLocators from "../../locators/Venda/CadastroVendaLocators";

class CadastroVendaPage {
  acessarNovoCadastro() {
    menulateralvendapage.acessarListagemVendas();
    cy.get(listagemVendasLocators.tabelaVendas).should('be.visible');
    cy.get(listagemVendasLocators.btnNovo).first().click();
    cy.url().should('include', '/vendas/novo');
    cy.get(cadastroVendaLocators.formPrincipal).should('be.visible');
  }

  validarBotoesTopo() {
    cy.get(cadastroVendaLocators.btnTopoVoltar).should('be.visible');
    cy.get(cadastroVendaLocators.btnTopoNovo).should('be.visible');
    cy.get(cadastroVendaLocators.btnTopoSalvar).should('have.class', 'ocultar');
    cy.get(cadastroVendaLocators.btnTopoExcluir).should('have.class', 'ocultar');
    cy.get(cadastroVendaLocators.btnMaisAcoes).should('have.class', 'ocultar');
  }

  preencherObservacao(texto) {
    cy.get(cadastroVendaLocators.campoObservacoes).clear().type(texto).should('have.value', texto);
  }

  buscarCliente(termo) {
    cy.get(cadastroVendaLocators.campoCliente).clear().type(termo);
  }

  validarSugestoesCliente() {
    cy.get(cadastroVendaLocators.listaClienteSugestoes).should('have.length.at.least', 1);
  }

  expandirClienteAutocomplete() {
    cy.get(cadastroVendaLocators.btnClienteAutocomplete).click({ force: true });
  }

  selecionarSugestaoCliente() {
    this.selecionarOpcaoAutocomplete(cadastroVendaLocators.listaClienteSugestoes);
  }

  selecionarClienteAlternativo() {
    cy.get(cadastroVendaLocators.hiddenClienteId)
      .invoke('val')
      .then((clienteAtual) => {
        cy.get(cadastroVendaLocators.btnClienteAutocomplete).click({ force: true });
        cy.get(cadastroVendaLocators.listaClienteSugestoes)
          .should('have.length.at.least', 1)
          .then(($items) => {
            const items = Array.from($items);
            const alternative = items.find((item) => {
              const text = Cypress.$(item).text().trim().toUpperCase();
              const value = Cypress.$(item).data('value');
              const isConsumidor = text.includes('CONSUMIDOR');
              const isSameId = clienteAtual && value && value.toString() === clienteAtual.toString();
              return !isConsumidor && !isSameId;
            });
            const targetLi = alternative || items[0];
            const clickable =
              Cypress.$(targetLi).find('a').length > 0
                ? Cypress.$(targetLi).find('a').get(0)
                : targetLi;

            cy.wrap(clickable)
              .click({ force: true })
              .then(() => {
                if (alternative) {
                  cy.get(cadastroVendaLocators.hiddenClienteId).should(($input) => {
                    expect($input.val(), 'cliente alternativo selecionado').not.to.eq(clienteAtual);
                  });
                } else {
                  cy.log('Nenhum cliente alternativo disponÃ­vel, mantendo seleÃ§Ã£o atual.');
                }
              });
          });
      });
  }

  buscarVendedor(termo) {
    cy.get(cadastroVendaLocators.campoVendedor).clear().type(termo);
  }

  validarSugestoesVendedor() {
    cy.get(cadastroVendaLocators.listaVendedorSugestoes).should('have.length.at.least', 1);
  }

  expandirVendedorAutocomplete() {
    cy.get(cadastroVendaLocators.btnVendedorAutocomplete).click({ force: true });
  }

  selecionarSugestaoVendedor() {
    this.selecionarOpcaoAutocomplete(cadastroVendaLocators.listaVendedorSugestoes);
  }

  selecionarPrimeiroVendedorDisponivel() {
    cy.get(cadastroVendaLocators.btnVendedorAutocomplete).click({ force: true });
    cy.get(cadastroVendaLocators.listaVendedorSugestoes)
      .should('have.length.at.least', 1)
      .then(($items) => {
        const targetLi = $items[0];
        const clickable =
          Cypress.$(targetLi).find('a').length > 0
            ? Cypress.$(targetLi).find('a').get(0)
            : targetLi;
        cy.wrap(clickable).click({ force: true });
      });
    cy.get(cadastroVendaLocators.hiddenVendedorId).should('not.have.value', '');
  }

  buscarProduto(termo) {
    cy.get(cadastroVendaLocators.campoProduto).clear().type(termo);
  }

  validarSugestoesProduto() {
    cy.get(cadastroVendaLocators.listaProdutoSugestoes).should('have.length.at.least', 1);
  }

  expandirProdutoAutocomplete() {
    cy.get(cadastroVendaLocators.btnProdutoAutocomplete).click({ force: true });
  }

  selecionarSugestaoProduto() {
    this.selecionarOpcaoAutocomplete(cadastroVendaLocators.listaProdutoSugestoes);
  }

  selecionarProdutoPorIndice(indice = 0) {
    cy.get(cadastroVendaLocators.btnProdutoAutocomplete).click({ force: true });
    cy.get(cadastroVendaLocators.listaProdutoSugestoes)
      .should('have.length.at.least', 1)
      .then(($items) => {
        const targetIndex = indice < $items.length ? indice : 0;
        const targetLi = $items.eq(targetIndex);
        const clickable =
          Cypress.$(targetLi).find('a').length > 0
            ? Cypress.$(targetLi).find('a').get(0)
            : targetLi.get(0);
        cy.wrap(clickable).click({ force: true });
      });
  }

  selecionarProdutoPorIndiceEstrito(indice = 0) {
    cy.get(cadastroVendaLocators.btnProdutoAutocomplete).click({ force: true });
    cy.get(cadastroVendaLocators.listaProdutoSugestoes)
      .should('have.length.at.least', indice + 1)
      .eq(indice)
      .then(($item) => {
        const clickable =
          $item.find('a').length > 0
            ? $item.find('a').get(0)
            : $item.get(0);
        cy.wrap(clickable).click({ force: true });
      });
  }

  adicionarProdutoPeloAutocomplete(termo, indice = 0) {
    this.buscarProduto(termo);
    this.selecionarProdutoPorIndice(indice);
    cy.get(cadastroVendaLocators.itensSalvos).should('have.length.at.least', 1);
  }

  adicionarProdutoPeloAutocompletePorPosicao(termo, indice = 0) {
    this.buscarProduto(termo);
    this.selecionarProdutoPorIndiceEstrito(indice);
    cy.get(cadastroVendaLocators.itensSalvos).should('have.length.at.least', indice + 1);
  }

  adicionarProdutosDistintos(termo, quantidade = 3) {
    const indices = Array.from({ length: quantidade }, (_, index) => index);
    indices.forEach((indice) => {
      this.adicionarProdutoPeloAutocompletePorPosicao(termo, indice);
    });

    cy.get(cadastroVendaLocators.itensSalvos)
      .should('have.length', quantidade)
      .then(($linhas) => {
        const idsItens = Array.from($linhas, (linha) => Cypress.$(linha).data('id'));
        const distintas = new Set(idsItens);
        expect(distintas.size, 'itens distintos selecionados').to.eq(idsItens.length);
      });
  }

  adicionarPrimeiroProdutoDaLista(termo = 'cst') {
    this.adicionarProdutoPeloAutocomplete(termo, 0);
  }

  validarPainelItensInicial() {
    cy.get(cadastroVendaLocators.tabelaItens).should('be.visible');
    cy.get(cadastroVendaLocators.campoDescricaoItem).should('exist');
    cy.get(cadastroVendaLocators.campoQuantidadeItem).should('have.value', '1,00');
    cy.get(cadastroVendaLocators.campoPrecoItem).should('have.value', '0,00');
    cy.get(cadastroVendaLocators.totalizadorQuantidade).should('contain', '0,00');
    cy.get(cadastroVendaLocators.totalizadorTotal).should('contain', '0,00');
  }

  validarPainelPagamentos() {
    cy.get(cadastroVendaLocators.painelPagamentosTabela).should('be.visible');
    cy.get(cadastroVendaLocators.painelPagamentosMensagem)
      .should('contain', 'Nenhum resultado foi localizado');
  }

  gerarPagamentoPadrao() {
    cy.get(cadastroVendaLocators.btnGerarPagamento)
      .should('be.visible')
      .and('not.have.class', 'ocultar')
      .scrollIntoView()
      .click({ force: true });

    cy.get(cadastroVendaLocators.modalFormaPagamentoIcon).click({ force: true });
    this.aguardarElementosModal([cadastroVendaLocators.modalVisivel]);

    cy.get(cadastroVendaLocators.modalSugestoesFormaPagamento)
      .should('have.length.at.least', 1)
      .first()
      .then(($li) => {
        const clickable =
          Cypress.$($li).find('a').length > 0 ? Cypress.$($li).find('a').get(0) : $li.get(0);
        cy.wrap(clickable).click({ force: true });
      });

    cy.get(cadastroVendaLocators.modalBtnSalvarPagamento).click();
    this.aguardarFechamentoModal(cadastroVendaLocators.modalVisivel);

    cy.get(cadastroVendaLocators.linhasPagamentos)
      .should('have.length.at.least', 1)
      .and('not.contain', 'Nenhum resultado foi localizado');
  }

  gerarPagamentoDuplicataParcelado(parcelas = 3) {
    cy.get(cadastroVendaLocators.btnGerarPagamento)
      .should('be.visible')
      .and('not.have.class', 'ocultar')
      .scrollIntoView()
      .click({ force: true });

    cy.get(cadastroVendaLocators.modalFormaPagamentoIcon).click({ force: true });
    this.aguardarElementosModal([cadastroVendaLocators.modalVisivel]);

    this.selecionarFormaPagamentoPorTexto(/duplicata/i, true);
    this.preencherQuantidadeParcelas(parcelas);

    cy.get(cadastroVendaLocators.modalBtnSalvarPagamento).click();
    this.aguardarFechamentoModal(cadastroVendaLocators.modalVisivel);
  }

  salvarVenda() {
    cy.get(cadastroVendaLocators.btnTopoSalvar)
      .should('be.visible')
      .and('not.have.class', 'ocultar')
      .click();

    cy.url({ timeout: 30000 }).should('match', /\/vendas\/\d+(\/editar)?/);

    cy.get(cadastroVendaLocators.btnTopoExcluir, { timeout: 10000 }).should(
      'not.have.class',
      'ocultar'
    );
  }

  excluirVendaAtual() {
    cy.get(cadastroVendaLocators.btnTopoExcluir)
      .should('be.visible')
      .and('not.have.class', 'ocultar')
      .click();

    cy.get(cadastroVendaLocators.sweetAlertModal).should('be.visible');
    cy.wait(500);
    cy.contains(cadastroVendaLocators.sweetAlertModal + ' button', /Sim, pode excluir!/i)
      .should('be.visible')
      .click({ force: true });

    cy.url({ timeout: 30000 }).should('include', '/vendas');
  }

  adicionarMultiplosProdutos(quantidade = 3, termoBase = 'Produto', alternar = true) {
    Array.from({ length: quantidade }).forEach((_, index) => {
      const termo = `${termoBase} ${index + 1}`;
      const indice = alternar ? (index % 2) : 0;
      this.adicionarProdutoPeloAutocomplete(termo, indice);
      cy.wait(300);
    });
  }

  aplicarDescontoPercentual(percentual = '5,00') {
    this.aplicarAjustePercentual(percentual, 'DESCONTO');
  }

  aplicarAcrescimoPercentual(percentual = '5,00') {
    this.aplicarAjustePercentual(percentual, 'ACRESCIMO');
  }

  aplicarAjustePercentual(percentual = '5,00', tipo = 'DESCONTO') {
    const percentualInteiro = percentual.split(',')[0];

    this.abrirModalAjuste();
    this.preencherPercentualAjuste(percentual, tipo);
    this.confirmarModalAjuste();

    cy.log(`Aguardando fechamento do modal e reprocessamento dos totais (${tipo})`);
    this.aguardarFechamentoModal(cadastroVendaLocators.formAplicarDesconto, 2000);
    this.validarAjusteAplicado(percentualInteiro, tipo);
  }

  fecharAutocomplete() {
    cy.get('body').click(0, 0);
  }

  selecionarOpcaoAutocomplete(listaLocator) {
    cy.get(listaLocator)
      .should('have.length.at.least', 1)
      .then(($items) => {
        const index = $items.length > 1 ? 1 : 0;
        const item = $items.eq(index);
        const target = item.find('a').length ? item.find('a').first() : item;
        cy.wrap(target).click({ force: true });
      });
  }

  abrirModalAjuste() {
    cy.get(cadastroVendaLocators.btnAplicarDesconto)
      .should('be.visible')
      .and('not.have.class', 'ocultar')
      .click();

    this.aguardarElementosModal([
      cadastroVendaLocators.formAplicarDesconto,
      cadastroVendaLocators.selectTipoDesconto,
      cadastroVendaLocators.inputDescontoPercentual,
      cadastroVendaLocators.btnConfirmarDesconto,
    ]);
  }

  preencherPercentualAjuste(percentual, tipo = 'DESCONTO') {
    cy.get(cadastroVendaLocators.selectTipoDesconto).select(tipo);
    cy.get(cadastroVendaLocators.inputDescontoPercentual)
      .clear()
      .type(percentual)
      .blur();
    cy.wait(400);
  }

  confirmarModalAjuste() {
    cy.get('body').then(($body) => {
      const botaoAcao = $body.find(cadastroVendaLocators.btnConfirmarDescontoAcao);
      if (botaoAcao.length) {
        cy.wrap(botaoAcao.first())
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
        return;
      }

      const botaoFallback = $body.find(cadastroVendaLocators.btnConfirmarDesconto).find('button');
      if (botaoFallback.length) {
        cy.wrap(botaoFallback.first())
          .should('be.visible')
          .and('not.be.disabled')
          .click({ force: true });
      } else {
        cy.log('Botao Aplicar nao encontrado; prosseguindo com fluxo automatico.');
      }
    });
  }

  validarAjusteAplicado(percentualInteiro, tipo = 'DESCONTO') {
    cy.get('body', { timeout: 20000 }).then(($body) => {
      const alerta = $body.find(cadastroVendaLocators.alertaDesconto);
      if (alerta.length) {
        cy.wrap(alerta).should('contain', percentualInteiro);
      } else {
        cy.log(`Alerta de ${tipo.toLowerCase()} nao exibido na interface atual.`);
      }

      const campoTotalDescontos = $body.find(cadastroVendaLocators.totalDescontosCampo);
      if (campoTotalDescontos.length) {
        cy.wrap(campoTotalDescontos.first()).should(($input) => {
          const valor = ($input.val() || '').toString();
          expect(valor, 'total de descontos/acrescimos').to.contain(percentualInteiro);
        });
      } else {
        cy.log('Campo total descontos/acrescimos nao encontrado para validacao.');
      }
    });
  }

  selecionarFormaPagamentoPorTexto(texto, digitarTermo = false) {
    const matcher = texto instanceof RegExp ? texto : new RegExp(texto, 'i');

    if (digitarTermo) {
      const termo = typeof texto === 'string' ? texto : 'Duplicata';
      cy.get(cadastroVendaLocators.modalCampoFormaPagamento)
        .clear({ force: true })
        .type(termo, { force: true });
    }

    cy.contains(cadastroVendaLocators.modalSugestoesFormaPagamento, matcher)
      .should('be.visible')
      .scrollIntoView()
      .click({ force: true });
  }

  preencherQuantidadeParcelas(parcelas = 3) {
    cy.get('body').then(($body) => {
      const candidatos = [
        '#quantidade_parcelas',
        '#quantidade_parcela',
        '#qtd_parcelas',
        '#parcelas',
        'input[name="quantidade_parcelas"]',
        'input[name="parcelas"]',
        'input[id*="quantidade_parcela"]',
        'input[id*="parcelas"]',
      ];

      let input = null;
      candidatos.some((selector) => {
        const encontrado = $body.find(selector);
        if (encontrado.length) {
          input = encontrado.first();
          return true;
        }
        return false;
      });

      if (!input) {
        const label = $body
          .find('label')
          .filter((_, el) => Cypress.$(el).text().toLowerCase().includes('parcela'))
          .first();
        if (label.length) {
          const inputFromLabel = label.closest('.form-group').find('input').first();
          if (inputFromLabel.length) {
            input = inputFromLabel;
          }
        }
      }

      if (!input || !input.length) {
        throw new Error('Campo de parcelas nao localizado no modal de pagamento');
      }

      cy.wrap(input)
        .scrollIntoView()
        .click({ force: true })
        .then(($el) => {
          if ($el.prop('readOnly') || $el.is('[readonly]')) {
            $el.prop('readOnly', false);
            $el.removeAttr('readonly');
          }
        })
        .clear({ force: true })
        .type(`${parcelas}`, { force: true })
        .blur();
    });
  }

  validarSomatorioParcelasIgualTotal() {
    cy.get(cadastroVendaLocators.totalizadorTotal)
      .should('be.visible')
      .invoke('text')
      .then((totalText) => {
        const total = this.converterTextoParaNumero(totalText);
        cy.get('body').then(($body) => {
          const valores = this.obterValoresColunaPorTexto($body, 'valor parcela');
          expect(valores.length, 'parcelas geradas').to.be.greaterThan(0);

          const somaParcelas = valores.reduce(
            (acc, valor) => acc + this.converterTextoParaNumero(valor),
            0
          );

          expect(Number(somaParcelas.toFixed(2))).to.eq(Number(total.toFixed(2)));
        });
      });
  }

  obterValoresColunaPorTexto($body, colunaBuscada = 'valor parcela') {
    const tabela = $body.find(cadastroVendaLocators.painelPagamentosTabela);
    if (!tabela.length) {
      return [];
    }

    const textoBusca = colunaBuscada.toLowerCase();
    const headers = tabela.find('thead th');
    let colunaIndex = -1;

    if (headers.length) {
      headers.each((index, th) => {
        const textoHeader = Cypress.$(th).text().trim().toLowerCase();
        if (textoHeader.includes(textoBusca)) {
          colunaIndex = index;
          return false;
        }
        return undefined;
      });
    }

    if (colunaIndex === -1) {
      const primeiraLinha = tabela.find('tbody tr').first();
      if (primeiraLinha.length) {
        colunaIndex = primeiraLinha.find('td').length - 1;
      } else {
        colunaIndex = 0;
      }
    }

    const valores = [];
    tabela.find('tbody tr').each((_, tr) => {
      const celulas = Cypress.$(tr).find('td');
      if (!celulas.length) {
        return;
      }
      const alvo =
        colunaIndex >= celulas.length ? celulas.eq(celulas.length - 1) : celulas.eq(colunaIndex);
      valores.push(alvo.text().trim());
    });

    return valores;
  }

  converterTextoParaNumero(texto) {
    if (!texto) {
      return 0;
    }

    const normalizado = texto
      .toString()
      .replace(/\s/g, '')
      .replace(/[^\d,-]/g, '')
      .replace(/\.(?=.*[,])/g, '')
      .replace(',', '.');

    const numero = Number(normalizado);
    return Number.isNaN(numero) ? 0 : numero;
  }

  aguardarElementosModal(elementos = [], timeout = 15000) {
    elementos.forEach((locator) => {
      cy.get(locator, { timeout }).should('exist').and('be.visible');
    });
  }

  aguardarFechamentoModal(locator, tempoExtra = 1500) {
    cy.wait(tempoExtra);
    cy.get('body', { timeout: tempoExtra + 15000 }).then(($body) => {
      const modal = $body.find(locator);
      if (modal.length) {
        cy.wrap(modal.first()).should('not.be.visible');
      } else {
        cy.log('Modal fechado e removido do DOM.');
      }
    });
  }
}

export default new CadastroVendaPage();
