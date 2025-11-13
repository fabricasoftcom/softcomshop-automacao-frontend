import menulateralprodutopage from "../menulateral/menulateralprodutopage";
import ProdutosListLocators from "../../locators/Produtos/ProdutosListLocators";

class ProdutosListPage {
  acessarListagem() {
    menulateralprodutopage.acessarListagemProdutos();
  }
  abrirFormularioPesquisa() {
    cy.get(ProdutosListLocators.btnPesquisar).click();
    cy.get(ProdutosListLocators.formPesquisa).should("be.visible");
  }

  preencherFiltroProduto(nome, id) {
    if (nome) {
      cy.get(ProdutosListLocators.inputProduto)
        .clear({ force: true })
        .type(nome, { force: true });
    }
    if (id) {
      cy.get(ProdutosListLocators.inputProdutoId).invoke("val", id);
    }
  }

  selecionarGrupo(grupo) {
    if (grupo) {
      cy.get(ProdutosListLocators.selectGrupo).select(grupo);
    }
  }

  habilitarFiltroDesativado() {
    cy.get(ProdutosListLocators.switchDesativado).check({ force: true });
  }

  habilitarFiltroCombo() {
    cy.get(ProdutosListLocators.switchCombo).check({ force: true });
  }

  clicarPesquisar() {
    cy.get(ProdutosListLocators.btnSubmitPesquisa).click();
  }

  clicarLimparFiltros() {
    this.abrirFormularioPesquisa();
    cy.get(ProdutosListLocators.btnLimparFiltros).click();
  }

  clicarNovoCadastro() {
    cy.get(ProdutosListLocators.btnNovoCadastro).first().click({ force: true });
  }

  clicarAlterarGrupoSelecionado() {
    cy.get(ProdutosListLocators.btnAlterarGrupo).click();
  }

  clicarExcluirSelecionados() {
    cy.get(ProdutosListLocators.btnExcluirSelecionados).click();
  }

  verificarTabelaVisivel() {
    cy.get(ProdutosListLocators.tabelaProdutos, { timeout: 15000 }).should(
      "be.visible"
    );
  }

  contarProdutosVisiveis() {
    return cy.get(ProdutosListLocators.linhasTabela, { timeout: 15000 });
  }

  clicarEditarProdutoPeloCodigo(codigo) {
    cy.contains(ProdutosListLocators.linhasTabela, codigo)
      .find(ProdutosListLocators.botaoEditarLinha)
      .first()
      .click({ force: true });
  }

  obterPrimeiroProdutoDaTabela() {
    return cy
      .get(ProdutosListLocators.linhasTabela)
      .first()
      .then(($row) => {
        const codigo = $row.find("td:nth-child(3) a").text().trim();
        const descricao = $row.find("td:nth-child(4)").text().trim();
        return { codigo, descricao };
      });
  }

  selecionarCheckboxProdutosPorCodigo(codigo) {
    cy.contains(ProdutosListLocators.linhasTabela, codigo)
      .find("input[type='checkbox']")
      .check({ force: true });
  }

  selecionarTodosCheckboxes() {
    cy.get(ProdutosListLocators.checkboxSelecionarTodos).check({ force: true });
  }

  desmarcarTodosCheckboxes() {
    cy.get(ProdutosListLocators.checkboxSelecionarTodos).click({ force: true });
  }

  selecionarPrimeiroProdutoDaTabela() {
    cy.get(ProdutosListLocators.linhasTabela)
      .first()
      .find("input[type='checkbox']")
      .check({ force: true });
  }

  verificarModalAlterarGrupoVisivel() {
    cy.get(ProdutosListLocators.modalAlterarGrupo).should("be.visible");
    cy.get(ProdutosListLocators.tituloModalAlterarGrupo)
      .should("be.visible")
      .and("contain.text", "Alterar Grupo");
  }

  selecionarGrupoDiferenteNoModal(grupoAtual) {
    return cy.get(ProdutosListLocators.selectGrupoModal).should("be.visible").then(($select) => {
      const $opcoes = $select
        .find("option")
        .not('[value=""]')
        .filter((_, option) => Cypress.$(option).text().trim() !== grupoAtual);

      if ($opcoes.length === 0) {
        throw new Error("Não há opções diferentes disponíveis para seleção.");
      }

      const $opcaoSelecionada = $opcoes.first();
      const valor = $opcaoSelecionada.val();
      const texto = $opcaoSelecionada.text().trim();
      return cy.wrap($select).select(valor, { force: true }).then(() => texto);
    });
  }

  verificarProdutosSelecionadosNoModal() {
    cy.get(ProdutosListLocators.hiddenProdutoSelecionadoIds)
      .invoke("val")
      .should("not.be.empty");
  }

  clicarSalvarGrupoModal() {
    cy.get(ProdutosListLocators.btnSalvarGrupoModal).click({ force: true });
  }
}

export default new ProdutosListPage();
