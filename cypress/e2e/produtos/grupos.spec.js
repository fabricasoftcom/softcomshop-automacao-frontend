import MenulateralProdutoPage from "../../support/pages/menulateral/MenulateralProdutoPage";
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
    cy.get('#loading').should('not.exist');
  };

  const buscarGrupoPorNome = (nome) => {
    cy.visit("/grupo-padrao");
    cy.get('#loading').should('not.exist');
    cy.get('body').then(($body) => {
      if (!$body.find('.form-pesquisa:visible').length) {
        cy.get('#btn-pesquisa').click();
        cy.get('.form-pesquisa').should('be.visible');
      }
    });
    cy.get('#auto_nome').clear().type(nome);
    cy.get('#pesquisar').click();
    cy.get('#loading').should('not.exist');
  };

  it("permite filtrar a listagem de grupos", () => {
    GruposListPage.abrirFiltro();
    GruposListPage.preencherFiltro("1", "TAXA DE ENTREGA");
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

    buscarGrupoPorNome(`Grupo Automatizado ${timestamp}`);
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

    buscarGrupoPorNome(timestamp);

    nomes.forEach((nome) => {
      cy.contains("td", nome, { timeout: 20000 }).parents("tr").within(() => {
        cy.get('input[type="checkbox"]').check({ force: true });
      });
    });

    cy.window().then((win) => {
      cy.stub(win, "swal").callsFake((opts, cb) => cb(true));
    });

    cy.intercept("POST", "/grupo/excluir").as("excluirGrupos");
    cy.get("#btn-excluir-selecionados").click();
    cy.get('#loading').should('not.exist');

    cy.get('body').then(($body) => {
      if (!$body.find('.form-pesquisa:visible').length) {
        cy.get('#btn-pesquisa').click();
        cy.get('.form-pesquisa').should('be.visible');
      }
    });
    cy.get('#auto_nome').clear({ force: true });
    cy.get('#pesquisar').click();
    cy.get('#loading').should('not.exist');

    nomes.forEach((nome) => {
      cy.contains("td", nome).should("not.exist");
    });
    GruposListPage.contarLinhasVisiveis().should("have.length.greaterThan", 0);
  });
});
