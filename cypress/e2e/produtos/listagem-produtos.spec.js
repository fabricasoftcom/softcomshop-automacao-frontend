import ProdutosListPage from "../../support/pages/Produtos/ProdutosListPage";
import ProdutosListLocators from "../../support/locators/Produtos/ProdutosListLocators";

describe("Listagem de produtos", { tags: ["@produtos", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ProdutosListPage.acessarListagem();
    ProdutosListPage.verificarTabelaVisivel();
  });

  it("exibe a listagem e permite abrir os filtros", () => {
    ProdutosListPage.abrirFormularioPesquisa();
    ProdutosListPage.contarProdutosVisiveis().its("length").should("be.gt", 0);
  });

  it("aplica filtros de grupo e switches e limpa os campos", () => {
    ProdutosListPage.abrirFormularioPesquisa();

    ProdutosListPage.selecionarGrupo("SELECIONE");
    ProdutosListPage.habilitarFiltroDesativado();
    ProdutosListPage.habilitarFiltroCombo();
    ProdutosListPage.clicarPesquisar();

    ProdutosListPage.clicarLimparFiltros();

    cy.get(ProdutosListLocators.selectGrupo).should("have.value", "");
    cy.get(ProdutosListLocators.switchDesativado).should("not.be.checked");
    cy.get(ProdutosListLocators.switchCombo).should("not.be.checked");
  });

  it("seleciona e limpa todos os checkboxes da tabela", () => {
    ProdutosListPage.selecionarTodosCheckboxes();
    cy.get(`${ProdutosListLocators.linhasTabela} input[type="checkbox"]`).should(
      "be.checked"
    );

    ProdutosListPage.desmarcarTodosCheckboxes();
    cy.get(`${ProdutosListLocators.linhasTabela} input[type="checkbox"]`).should(
      "not.be.checked"
    );
  });

  it("abre o modal Alterar Grupo ao selecionar um produto", () => {
    ProdutosListPage.selecionarPrimeiroProdutoDaTabela();
    ProdutosListPage.clicarAlterarGrupoSelecionado();
    ProdutosListPage.verificarModalAlterarGrupoVisivel();

    ProdutosListPage.verificarProdutosSelecionadosNoModal();
    cy.get(ProdutosListLocators.selectGrupoModal)
      .find("option")
      .not('[value=""]')
      .first()
      .invoke("text")
      .should("not.be.empty");
  });

  it("envia a alteração em massa usando o modal Alterar Grupo", () => {
    let codigoProduto;
    let grupoAtual;
    let novoGrupo;

    cy.get(ProdutosListLocators.linhasTabela)
      .first()
      .then(($row) => {
        codigoProduto = $row.find("td:nth-child(3) a").text().trim();
        grupoAtual = $row.find("td:nth-child(8)").text().trim();
      });

    ProdutosListPage.selecionarPrimeiroProdutoDaTabela();
    ProdutosListPage.clicarAlterarGrupoSelecionado();
    ProdutosListPage.selecionarGrupoDiferenteNoModal(grupoAtual).then((texto) => {
      novoGrupo = texto;
      ProdutosListPage.clicarSalvarGrupoModal();

      cy.get(ProdutosListLocators.modalAlterarGrupo).should("not.be.visible");

      cy.reload();
      ProdutosListPage.verificarTabelaVisivel();

      cy.contains(ProdutosListLocators.linhasTabela, codigoProduto)
        .find("td:nth-child(8)")
        .invoke("text")
        .then((textoGrupo) => {
          expect(textoGrupo.trim()).to.eq(novoGrupo);
        });
    });
  });
});
