import MenulateralProdutoPage from "../../support/pages/menulateral/menulateralprodutopage";
import GruposListPage from "../../support/pages/Produtos/GruposListPage";
import GruposFormPage from "../../support/pages/Produtos/GruposFormPage";

describe("Compras e Estoque > Produtos > Grupos", { tags: ["@produtos", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    MenulateralProdutoPage.acessarListagemGrupos();
  });

  const criarGrupo = (nome) => {
    cy.intercept("GET", /\/grupo(-padrao)?\/novo/).as("abrirGrupo");
    GruposListPage.clicarNovoCadastro();
    cy.wait("@abrirGrupo");
    cy.intercept("POST", /\/grupo(-padrao)?\/salvar/).as("salvarGrupo");
    GruposFormPage.preencherNome(nome);
    GruposFormPage.preencherComissao("1,00");
    GruposFormPage.clicarSalvar();
    cy.wait("@salvarGrupo");
    cy.visit("/grupo-padrao");
  };

  it("permite filtrar a listagem de grupos", () => {
    GruposListPage.abrirFiltro();
    GruposListPage.preencherFiltro("7", "Adicionais Combo");
    GruposListPage.clicarPesquisar();
    GruposListPage.verificarTabelaVisivel();
    GruposListPage.contarLinhasVisiveis().should("have.length.greaterThan", 0);
  });

  it("abre o formulário de novo grupo", () => {
    cy.intercept("GET", /\/grupo(-padrao)?\/novo/).as("abrirGrupo");
    GruposListPage.clicarNovoCadastro();
    cy.wait("@abrirGrupo");
    cy.url().should("match", /\/grupo(-padrao)?\/novo$/);
    GruposFormPage.verificarTitulo();

    cy.intercept("POST", /\/grupo(-padrao)?\/salvar/).as("salvarGrupo");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    GruposFormPage.preencherNome(`Grupo Automatizado ${timestamp}`);
    GruposFormPage.preencherComissao("5,00");
    GruposFormPage.clicarSalvar();
    cy.wait("@salvarGrupo");

    cy.visit("/grupo-padrao");
    cy.contains("td", `Grupo Automatizado ${timestamp}`).should("exist");
  });

  it("exclui dois ou mais grupos customizados sem remover os padrões", () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const nomes = [
      `Lote Grupo A ${timestamp}`,
      `Lote Grupo B ${timestamp}`,
    ];

    nomes.forEach((nome) => {
      criarGrupo(nome);
    });

    nomes.forEach((nome) => {
      cy.contains("td", nome).parents("tr").within(() => {
        cy.get('input[type="checkbox"]').check({ force: true });
      });
    });

    cy.window().then((win) => {
      cy.stub(win, "swal").callsFake((opts, cb) => cb(true));
    });

    cy.intercept("POST", "/grupo/excluir").as("excluirGrupos");
    cy.get("#btn-excluir-selecionados").click();
    cy.wait("@excluirGrupos");

    nomes.forEach((nome) => {
      cy.contains("td", nome).should("not.exist");
    });

    cy.contains("td", "Adicionais Combo TOp").should("be.visible");
    cy.contains("td", "Adicional").should("be.visible");
  });
});
