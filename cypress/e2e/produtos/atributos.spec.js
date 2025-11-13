import MenulateralProdutoPage from "../../support/pages/menulateral/menulateralprodutopage";
import AtributosListPage from "../../support/pages/Produtos/AtributosListPage";
import AtributosFormPage from "../../support/pages/Produtos/AtributosFormPage";
import AtributosOpcoesPage from "../../support/pages/Produtos/AtributosOpcoesPage";
import AtributosOpcoesModalPage from "../../support/pages/Produtos/AtributosOpcoesModalPage";

const criarAtributo = (descricao) => {
  cy.intercept("GET", "/produto/atributo/novo").as("abrirNovo");
  AtributosListPage.clicarNovoCadastro();
  cy.wait("@abrirNovo");
  cy.url().should("include", "/produto/atributo/novo");
  cy.intercept("POST", "/produto/atributo/salvar").as("salvarAtributo");
  AtributosFormPage.preencherDescricao(descricao);
  AtributosFormPage.clicarSalvar();
  cy.wait("@salvarAtributo");
  cy.visit("/produto/atributo");
};

describe("Compras e Estoque > Produtos > Atributos", { tags: ["@produtos", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    MenulateralProdutoPage.acessarListagemAtributos();
  });

  it("Deve abrir a listagem de atributos e mostrar o filtro", () => {
    AtributosListPage.abrirFormularioPesquisa();
    AtributosListPage.preencherFiltro("7", "COR");
    AtributosListPage.clicarPesquisar();
    AtributosListPage.verificarTabelaVisivel();
    AtributosListPage.contarLinhasVisiveis().should("have.length.greaterThan", 0);
  });

  it("Deve abrir o novo cadastro de atributo e demonstrar o formulário", () => {
    cy.intercept("GET", "/produto/atributo/novo").as("abrirNovo");
    AtributosListPage.clicarNovoCadastro();
    cy.wait("@abrirNovo");
    cy.url().should("include", "/produto/atributo/novo");
    AtributosFormPage.verificarTitulo();
    AtributosFormPage.verificarBotaoVoltar();

    cy.intercept("POST", "/produto/atributo/salvar").as("salvarAtributo");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    AtributosFormPage.preencherDescricao(`Teste Automatizado - ${timestamp}`);
    AtributosFormPage.clicarSalvar();
    cy.wait("@salvarAtributo");
    AtributosOpcoesPage.verificarPainelVisivel();
    AtributosOpcoesPage.verificarBotaoOpcoes();

    cy.intercept("GET", "/produto/opcoes/*/novo").as("obterOpcao");
    cy.intercept("POST", "/produto/opcoes/*").as("salvarOpcao");
    cy.get("#btn-opcoes").click();
    cy.wait("@obterOpcao");
    AtributosOpcoesModalPage.verificarModalAberto();
    const nomeOpcao = `Opção Automatizada - ${timestamp}`;
    AtributosOpcoesModalPage.preencherNomeOpcao(nomeOpcao);
    AtributosOpcoesModalPage.clicarSalvarModal();
    AtributosOpcoesPage.verificarTabelaOpcoes();
    AtributosOpcoesPage.contarLinhas().should("have.length", 1);
  });

  it("Deve criar e depois excluir um atributo personalizado sem tocar em Cor/Tamanho", () => {
    cy.intercept("GET", "/produto/atributo/novo").as("abrirNovo");
    AtributosListPage.clicarNovoCadastro();
    cy.wait("@abrirNovo");
    cy.url().should("include", "/produto/atributo/novo");

    cy.intercept("POST", "/produto/atributo/salvar").as("salvarAtributo");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const descricao = `Excluir Automatizado - ${timestamp}`;
    AtributosFormPage.preencherDescricao(descricao);
    AtributosFormPage.clicarSalvar();
    cy.wait("@salvarAtributo");

    cy.visit("/produto/atributo");
    cy.contains("td", descricao).parents("tr").within(() => {
      cy.get('input[type="checkbox"]').check({ force: true });
    });

    cy.window().then((win) => {
      cy.stub(win, "swal").callsFake((opts, cb) => cb(true));
    });
    cy.intercept("POST", "/produto/atributo/excluir").as("excluirAtributo");
    cy.get("#btn-excluir-selecionados").click();
    cy.wait("@excluirAtributo");

    cy.contains("td", descricao).should("not.exist");
    cy.contains("td", "COR").should("be.visible");
    cy.contains("td", "TAMANHO").should("be.visible");
  });

  it("Deve excluir em lote atributos personalizados sem tocar em Cor/Tamanho", () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const descricoes = [
      `Lote Automatizado A - ${timestamp}`,
      `Lote Automatizado B - ${timestamp}`,
      `Lote Automatizado C - ${timestamp}`,
      `Lote Automatizado D - ${timestamp}`,
    ];

    descricoes.forEach((descricao) => criarAtributo(descricao));

    descricoes.forEach((descricao) => {
      cy.contains("td", descricao).should("be.visible");
      AtributosListPage.selecionarCheckboxPorDescricao(descricao);
    });

    cy.window().then((win) => {
      cy.stub(win, "swal").callsFake((opts, cb) => cb(true));
    });
    cy.intercept("POST", "/produto/atributo/excluir").as("excluirAtributos");
    cy.get("#btn-excluir-selecionados").click();
    cy.wait("@excluirAtributos");

    descricoes.forEach((descricao) => {
      cy.contains("td", descricao).should("not.exist");
    });

    cy.contains("td", "COR").should("be.visible");
    cy.contains("td", "TAMANHO").should("be.visible");
  });
});
