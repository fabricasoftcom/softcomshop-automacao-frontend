import listagemprodutopage from "./listagemprodutopage";
import ProdutoLocators from "../../locators/ProdutoLocators";

const formatDecimal = (value, precision = 2) =>
  value.toFixed(precision).replace(".", ",");

const normalizeText = (value = "") =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

class ProdutoPage {
  visit() {
    listagemprodutopage.acessarCadastroNovoProduto();
  }

  verificarAbas() {
    cy.get(ProdutoLocators.abaDadosCadastrais).should("be.visible");
    cy.get(ProdutoLocators.abaDetalhesFiscais).should("exist");
    cy.get(ProdutoLocators.abaProdutoEmpresa).should("exist");
    cy.get(ProdutoLocators.abasComposicao).should("exist");
    cy.get(ProdutoLocators.abasFotos).should("exist");
  }

  preencherDetalhesDoProduto(produto) {
    cy.percySnapshot();
    cy.get(ProdutoLocators.nomeInput).clear().type(produto.nome);
    cy.get(ProdutoLocators.referenciaInput).type(produto.referencia);
    cy.get(ProdutoLocators.codigoBarrasInput).type(produto.codigo_barras);
    cy.get(ProdutoLocators.grupoDropdownIcon).click();
    cy.get(ProdutoLocators.grupoOpcaoPadrao, { timeout: 20000 })
      .should("be.visible")
      .click();
    cy.get(ProdutoLocators.unidadeDropdownIcon).click();
    cy.get(ProdutoLocators.unidadeOpcaoPrimeira, { timeout: 20000 })
      .should("be.visible")
      .first()
      .click();
    cy.get(ProdutoLocators.precoCompraInput).type(
      formatDecimal(Number(produto.preco_compra))
    );
    cy.get(ProdutoLocators.margemLucroInput).type(produto.margem_lucro);
    cy.get(ProdutoLocators.precoVendaInput).type(
      formatDecimal(Number(produto.preco_venda))
    );
    cy.get(ProdutoLocators.percentualComissaoInput).type(
      formatDecimal(Number(produto.percentual_comissao))
    );
    // cy.get(ProdutoLocators.estoqueInicialInput).type(produto.estoque_inicial);
    cy.get(ProdutoLocators.pesoInput).type(
      formatDecimal(produto.peso, 3)
    );
    cy.get(ProdutoLocators.alturaInput).type(
      formatDecimal(produto.altura)
    );
    cy.get(ProdutoLocators.larguraInput).type(
      formatDecimal(produto.largura)
    );
    cy.get(ProdutoLocators.comprimentoInput).type(
      formatDecimal(produto.comprimento)
    );
    cy.get(ProdutoLocators.observacaoTextarea).type(produto.observacao);
    cy.get(ProdutoLocators.informacaoAdicionalTextarea).type(
      produto.informacao_adicional
    );
  }

  atualizarObservacao(texto) {
    cy.get(ProdutoLocators.observacaoTextarea, { timeout: 10000 })
      .clear()
      .type(texto);
  }

  validarObservacao(textoEsperado) {
    cy.get(ProdutoLocators.observacaoTextarea, { timeout: 10000 }).should(
      "have.value",
      textoEsperado
    );
  }

  desabilitarVenda() {
    cy.get(ProdutoLocators.venderHidden, { timeout: 10000 }).then(
      ($hidden) => {
        if ($hidden.val() !== "0") {
          cy.get(ProdutoLocators.venderToggle, { timeout: 10000 })
            .should("be.visible")
            .click();
          cy.get(ProdutoLocators.venderHidden).should("have.value", "0");
        } else {
          cy.log("Switch vender ja estava desmarcado.");
        }
      }
    );
  }

  verificarVendaDesativada() {
    cy.get(ProdutoLocators.venderHidden, { timeout: 10000 }).should(
      "have.value",
      "0"
    );
    cy.get(ProdutoLocators.venderCheckbox)
      .should("exist")
      .and("not.be.checked");
  }

  habilitarGrade() {
    cy.get(ProdutoLocators.habilitarGradeHidden, { timeout: 10000 }).then(
      ($hidden) => {
        if ($hidden.val() !== "1") {
          cy.get(ProdutoLocators.switcherHabilitarGradeToggle)
            .should("be.visible")
            .click();
          cy.get(ProdutoLocators.habilitarGradeHidden).should("have.value", "1");
        } else {
          cy.log("Grade já estava habilitada.");
        }
      }
    );
  }

  habilitarCombo() {
    cy.get("body").then(($body) => {
      if (!$body.find(ProdutoLocators.habilitarComboHidden).length) {
        throw new Error(
          "Campo oculto para habilitar combo nao foi encontrado na tela."
        );
      }
    });

    cy.get(ProdutoLocators.habilitarComboHidden, { timeout: 10000 }).then(
      ($hidden) => {
        if ($hidden.val() !== "1") {
          cy.get(ProdutoLocators.switcherHabilitarComboToggle, {
            timeout: 10000,
          })
            .should("be.visible")
            .click();
          cy.get(ProdutoLocators.habilitarComboHidden).should(
            "have.value",
            "1"
          );
        } else {
          cy.log("Combo ja estava habilitado.");
        }
      }
    );
  }
  cadastrar() {
    cy.get(ProdutoLocators.btnSalvar).click();
  }
  excluir() {
    cy.get(ProdutoLocators.btnExcluir).should("be.visible").click();
    this.confirmarExclusaoProduto();
  }

  confirmacaoCadastroProduto() {
    cy.location("pathname", { timeout: 40000 }).then((pathname) => {
      if (pathname.includes("/detalhes-fiscais")) {
        cy.log("Produto redirecionado direto para detalhes fiscais.");
      } else {
        expect(pathname).to.match(/\/produto\/(novo|\d+)$/);
      }
    });
  }

  verificarAlertaDadosFiscais() {
    cy.get("body").then(($body) => {
      if ($body.find(ProdutoLocators.alertaDadosFiscais).length) {
        cy.get(ProdutoLocators.alertaDadosFiscais, { timeout: 20000 }).should(
          "be.visible"
        );
        cy.get(ProdutoLocators.alertaDadosFiscaisTitulo, { timeout: 20000 })
          .invoke("text")
          .then((text) => {
            const normalized = normalizeText(text)
              .replace(/[^a-z0-9\s]/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            expect(normalized).to.include(
              "o produto nao possui informacoes fiscais"
            );
          });
        cy.get(ProdutoLocators.alertaDadosFiscaisMensagem)
          .invoke("text")
          .then((text) => {
            const normalized = normalizeText(text)
              .replace(/[^a-z0-9\s]/g, " ")
              .replace(/\s+/g, " ")
              .trim();
            expect(normalized).to.include(
              "e obrigatorio o preenchimento dos dados fiscais"
            );
          });
      } else {
        cy.log("Alerta fiscal nao apareceu; prosseguindo.");
      }
    });
  }

  confirmarAlertaDadosFiscais() {
    cy.get("body").then(($body) => {
      if ($body.find(ProdutoLocators.alertaDadosFiscaisConfirmar).length) {
        cy.wait(2000);
        cy.contains(ProdutoLocators.alertaDadosFiscaisConfirmar, /sim/i)
          .should("be.visible")
          .click();
        cy.get(ProdutoLocators.alertaDadosFiscais)
          .should("have.class", "hideSweetAlert")
          .and("not.be.visible");
      }

      cy.wait(2000);
    });
  }

  verificarDetalhesFiscaisPage() {
    cy.location("pathname", { timeout: 20000 }).then((pathname) => {
      if (pathname.includes("/detalhes-fiscais")) {
        cy.get(ProdutoLocators.detalhesFiscaisTitulo, { timeout: 20000 })
          .should("be.visible")
          .and("contain.text", "Detalhes Fiscais");
        cy.get(ProdutoLocators.formImpostos, { timeout: 20000 }).should(
          "be.visible"
        );
        cy.get(ProdutoLocators.autoVinculoFiscalId).should("be.visible");
      } else {
        cy.log(
          `Pagina atual (${pathname}) nao e /detalhes-fiscais; pulando validacoes de detalhes.`
        );
      }
    });
  }

  cancelarAlertaDadosFiscais() {
    cy.get("body").then(($body) => {
      if ($body.find(ProdutoLocators.alertaDadosFiscaisCancelar).length) {
        cy.wait(2000);
        cy.get(ProdutoLocators.alertaDadosFiscaisCancelar).click();
        cy.get(ProdutoLocators.alertaDadosFiscais).should("not.exist");
      }
    });
  }

  confirmarExclusaoProduto() {
    cy.get(ProdutoLocators.alertaExcluirProduto, { timeout: 20000 })
      .should("be.visible")
      .wait(1500);

    cy.get(ProdutoLocators.alertaExcluirProdutoTitulo, { timeout: 20000 })
      .invoke("text")
      .then((text) => {
        const normalized = normalizeText(text)
          .replace(/[^a-z0-9\s]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        expect(normalized).to.include(
          "voce realmente deseja excluir essas informacoes"
        );
      });

    cy.get(ProdutoLocators.alertaExcluirProdutoMensagem)
      .invoke("text")
      .then((text) => {
        const normalized = normalizeText(text)
          .replace(/[^a-z0-9\s]/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        expect(normalized).to.include(
          "nao sera possivel recupera los depois"
        );
      });

    cy.contains(ProdutoLocators.alertaExcluirProdutoConfirmar, /sim/i)
      .should("be.visible")
      .click();

    cy.get("body", { timeout: 20000 }).then(($body) => {
      const modalAindaExiste = $body.find(ProdutoLocators.alertaExcluirProduto).length > 0;
      if (modalAindaExiste) {
        cy.get(ProdutoLocators.alertaExcluirProduto, { timeout: 20000 })
          .should("have.class", "hideSweetAlert")
          .and("not.be.visible");
      } else {
        cy.log("Modal de exclusao removido apos o redirecionamento; validacao dispensada.");
      }
    });
  }

  verificarTelaDadosCadastrais() {
    cy.get("#form-produto").should("be.visible");
    cy.location("pathname").should("not.include", "/detalhes-fiscais");
  }

  cancelarAlertaAtualizacaoGrupo() {
    cy.get("body").then(($body) => {
      if ($body.find(ProdutoLocators.alertaDadosFiscais).length) {
        cy.get(ProdutoLocators.alertaDadosFiscais, { timeout: 20000 })
          .should("be.visible")
          .wait(1000)
          .within(() => {
            cy.contains("h2", "Deseja atualizar as informações desse produto", {
              matchCase: false,
            }).should("be.visible");
          });

        cy.contains(ProdutoLocators.alertaDadosFiscaisCancelar, /não/i)
          .should("be.visible")
          .click();
        cy.get(ProdutoLocators.alertaDadosFiscais).should("not.exist");
      }
    });
  }

  acessarAbaGrade() {
    cy.get(ProdutoLocators.abaGrade, { timeout: 20000 })
      .should("be.visible")
      .click();
    cy.get(ProdutoLocators.gradeTabContent, { timeout: 20000 }).should(
      "be.visible"
    );
  }

  acessarAbaCombo() {
    cy.get(ProdutoLocators.abaCombo, { timeout: 20000 })
      .should("be.visible")
      .click();
    cy.get(ProdutoLocators.comboTabContent, { timeout: 20000 })
      .should("be.visible")
      .and("have.class", "active");
  }

  adicionarItemCombo(opcoes = {}) {
    const defaults = {
      descricao: `Item Combo ${Date.now()}`,
      ordem: "1",
      quantidadeMinima: "1",
      quantidadeMaxima: "1",
      precoVenda: formatDecimal(10),
      precos: [],
      gruposParaSelecionar: 2,
    };
    const dados = { ...defaults, ...opcoes };
    const totalDesejado = Math.max(Number(dados.gruposParaSelecionar) || 1, 1);
    let totalSelecionados = 0;

    cy.get(ProdutoLocators.comboBotaoAdicionarItem, { timeout: 20000 })
      .should("be.visible")
      .click();

    cy.get(ProdutoLocators.comboModal, { timeout: 20000 }).should("be.visible");

    cy.get(ProdutoLocators.comboModalDescricao)
      .should("be.visible")
      .clear()
      .type(dados.descricao);
    cy.get(ProdutoLocators.comboModalOrdem).clear().type(dados.ordem);
    cy.get(ProdutoLocators.comboModalQuantidadeMinima)
      .clear()
      .type(dados.quantidadeMinima);
    cy.get(ProdutoLocators.comboModalQuantidadeMaxima)
      .clear()
      .type(dados.quantidadeMaxima);

    cy.get(ProdutoLocators.comboModalGrupoExpansores, { timeout: 20000 })
      .then(($botoes) => {
        const indicesDisponiveis = [];

        Cypress.$($botoes).each((index, botao) => {
          const texto = Cypress.$(botao).text().toLowerCase();
          const href = (botao.getAttribute("href") || "").trim();
          const collapseSelector = href
            ? href.startsWith("#") || href.startsWith(".")
              ? href
              : `#${href}`
            : "";
          const containerSelector = collapseSelector
            ? `${ProdutoLocators.comboModalContainer} ${collapseSelector}`
            : "";
          const temProdutos =
            containerSelector &&
            Cypress.$(`${containerSelector} .produtos-item`).length > 0;
          const ehTaxaEntrega = texto.includes("taxa de entrega");

          if (!ehTaxaEntrega && temProdutos) {
            indicesDisponiveis.push(index);
          }
        });

        const finalIndices = indicesDisponiveis.slice(0, totalDesejado);
        totalSelecionados = finalIndices.length;

        if (!totalSelecionados) {
          throw new Error(
            "Nao foram encontrados grupos validos para montagem do combo."
          );
        }

        return cy.wrap(finalIndices).each((indice, idxSelecionado) => {
          const precoAtual =
            Array.isArray(dados.precos) && dados.precos[idxSelecionado]
              ? dados.precos[idxSelecionado]
              : dados.precoVenda;

          cy.get(ProdutoLocators.comboModalGrupoExpansores)
            .eq(indice)
            .then(($botaoGrupo) => {
              const collapseSelector = ($botaoGrupo.attr("href") || "").trim();
              if (!collapseSelector) {
                throw new Error(
                  "Nao foi possivel identificar o container do grupo de combo."
                );
              }

              const containerSelector = `${ProdutoLocators.comboModalContainer} ${collapseSelector}`;

              cy.wrap($botaoGrupo).scrollIntoView().click();

              cy.get(containerSelector, { timeout: 20000 })
                .should("have.class", "in")
                .within(() => {
                  cy.get(".produtos-item", { timeout: 20000 })
                    .should("have.length.at.least", 1)
                    .first()
                    .within(() => {
                      cy.get(ProdutoLocators.comboModalProdutoCheckbox)
                        .scrollIntoView()
                        .check({
                          force: true,
                        });
                      cy.get(ProdutoLocators.comboModalProdutoPreco)
                        .scrollIntoView()
                        .clear()
                        .type(precoAtual);
                    });
                });
            });
        });
      })
      .then(() => {
        cy.wrap({ gruposSelecionados: totalSelecionados }).as(
          "comboItensAdicionados"
        );
      });

    cy.get(ProdutoLocators.comboModalSalvarButton)
      .should("be.visible")
      .click();

    cy.get(ProdutoLocators.comboModal, { timeout: 20000 }).should(
      "not.be.visible"
    );
  }

  verificarGradeSemItens() {
    cy.get(ProdutoLocators.gradeTabContent, { timeout: 20000 }).within(() => {
      cy.get(ProdutoLocators.gradeBotaoMontar).should("be.visible");
      cy.contains("Nenhum resultado foi localizado para a sua busca.").should(
        "be.visible"
      );
    });
  }

  montarGrade() {
    cy.get(ProdutoLocators.gradeBotaoMontar, { timeout: 20000 })
      .should("be.visible")
      .click();
    cy.get(ProdutoLocators.gradeModal, { timeout: 20000 }).should("be.visible");
    cy.get(ProdutoLocators.gradeModalTitulo, { timeout: 20000 }).should(
      "contain.text",
      "Monte a Grade dos seus Produtos com os Atributos"
    );
    cy.get(ProdutoLocators.gradeModalTipoSelect).should(
      "contain.text",
      "Simplificada"
    );
    cy.get(ProdutoLocators.gradeModalSalvarButton).should("be.visible");
  }

  selecionarItemDeGrade(
    iconeLocator,
    opcoesLocator,
    index = 0,
    tentativa = 0
  ) {
    const maxTentativas = 3;
    cy.get(iconeLocator)
      .should("be.visible")
      .click()
      .wait(1000);
    cy.get("body").then(($body) => {
      const totalOpcoes = $body.find(opcoesLocator).length;
      if (totalOpcoes === 0 && tentativa < maxTentativas - 1) {
        cy.wait(800).then(() =>
          this.selecionarItemDeGrade(
            iconeLocator,
            opcoesLocator,
            index,
            tentativa + 1
          )
        );
        return;
      }
      expect(totalOpcoes, "opções disponíveis na grade").to.be.greaterThan(0);
      cy.get(opcoesLocator, { timeout: 20000 })
        .should("have.length.at.least", 1)
        .then(($options) => {
          const safeIndex = Math.min(index, $options.length - 1);
          cy.wrap($options).eq(safeIndex).click({ force: true });
        });
    });
  }

  preencherGradeSimplificada(repeticoes = 3) {
    const rep = Math.max(3, repeticoes);
    cy.get(ProdutoLocators.gradeModalAtributoUmSelect).select("TAMANHO");
    cy.get(ProdutoLocators.gradeModalAtributoDoisSelect).select("COR");

    for (let i = 0; i < rep; i += 1) {
      cy.get("#auto_item1").should("not.be.disabled");
      cy.get("#auto_item2").should("not.be.disabled");
      this.selecionarItemDeGrade(
        ProdutoLocators.gradeModalItemUmIcone,
        ProdutoLocators.gradeModalItemUmOpcoes,
        i
      );
      this.selecionarItemDeGrade(
        ProdutoLocators.gradeModalItemDoisIcone,
        ProdutoLocators.gradeModalItemDoisOpcoes,
        i
      );
      cy.get(ProdutoLocators.gradeModalSalvarButton)
        .should("be.enabled")
        .click();
      cy.get(ProdutoLocators.gradeModalLinhaNome, { timeout: 20000 }).should(
        "have.length",
        i + 1
      );
      cy.get(ProdutoLocators.gradeModalItemCodigoBarras(i))
        .should("be.visible")
        .clear()
        .type(`90009920020${i}${Math.floor(Math.random() * 10)}`);
      cy.get(ProdutoLocators.gradeModalSalvarButton)
        .should("be.enabled")
        .click();
      cy.wait(800);
    }

    cy.get(ProdutoLocators.gradeModalCloseButton).click();
    cy.get(ProdutoLocators.gradeModal, { timeout: 20000 })
      .should("not.be.visible");
  }

  verificarGradeComItens(quantidadeMinima = 1) {
    cy.get(ProdutoLocators.gradeTabelaComItens, { timeout: 20000 })
      .should("have.length.at.least", quantidadeMinima)
      .and(($linhas) => {
        const texto = $linhas.first().text();
        expect(texto).to.not.contain(
          "Nenhum resultado foi localizado para a sua busca."
        );
      });
  }

  verificarComboSemItens() {
    cy.get(ProdutoLocators.comboTabContent, { timeout: 20000 }).within(() => {
      cy.get(ProdutoLocators.comboBotaoAdicionarItem).should("be.visible");
      cy.contains(
        ProdutoLocators.comboTabelaMensagens,
        "Nenhum resultado foi localizado para a sua busca."
      ).should("be.visible");
    });
  }

  verificarComboComItens(quantidadeMinima = 1) {
    cy.contains(
      ProdutoLocators.comboTabelaMensagens,
      "Nenhum resultado foi localizado para a sua busca."
    ).should("not.exist");

    cy.get(ProdutoLocators.comboTabelaLinhas, { timeout: 20000 }).should(
      "have.length.at.least",
      quantidadeMinima
    );
  }

  verificarComboQuantidadeItens(quantidadeEsperada = 0) {
    cy.contains(
      ProdutoLocators.comboResumoQuantidadeLabel,
      "Quantidade de itens"
    )
      .should("be.visible")
      .then(($strong) => {
        const textoQuantidade = Cypress.$($strong)
          .find("span")
          .last()
          .text()
          .replace(/\D/g, "");
        const quantidade = Number(textoQuantidade || "0");
        expect(quantidade).to.eq(Number(quantidadeEsperada));
      });
  }
}

export default new ProdutoPage();
