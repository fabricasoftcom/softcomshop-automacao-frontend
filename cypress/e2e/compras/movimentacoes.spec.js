import MenulateralProdutoPage from "../../support/pages/menulateral/menulateralprodutopage";
import ListagemMovimentacoesPage from "../../support/pages/Movimentacoes/ListagemMovimentacoesPage";
import CadastroMovimentacoesPage from "../../support/pages/Movimentacoes/CadastroMovimentacoesPage";
import ItensMovimentacoesPage from "../../support/pages/Movimentacoes/ItensMovimentacoesPage";

describe("Compras e Estoque > Movimentações", { tags: ["@compras", "@regressivo"] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    MenulateralProdutoPage.acessarListagemMovimentacoes();
  });

  it("Deve filtrar movimentações por operação", () => {
    cy.intercept("GET", "/movimentacao*").as("pesquisarMovimentacao");

    ListagemMovimentacoesPage.clicarPesquisa();
    ListagemMovimentacoesPage.preencherOperacao("ENTRADA");
    ListagemMovimentacoesPage.clicarPesquisar();
    cy.wait("@pesquisarMovimentacao").its("response.statusCode").should("eq", 200);

    ListagemMovimentacoesPage.verificarTabelaVisivel();
    ListagemMovimentacoesPage.obterLinhasVisiveis().should("have.length.greaterThan", 0);
  });

  it("Deve abrir o formulário de novo cadastro de movimentação para operação Entrada", () => {
    MenulateralProdutoPage.acessarCadastroNovaMovimentacoes();
    cy.url().should("include", "/movimentacao/novo");

    CadastroMovimentacoesPage.verificarFormularioVisivel();
    CadastroMovimentacoesPage.verificarCampoDataOperacao();
    CadastroMovimentacoesPage.verificarSelectOperacao();
    CadastroMovimentacoesPage.verificarCampoTipoAjuste();
    CadastroMovimentacoesPage.verificarBotaoSalvar();
    CadastroMovimentacoesPage.definirOperacao("ENTRADA");
    CadastroMovimentacoesPage.verificarOperacaoEsperada("ENTRADA");
    CadastroMovimentacoesPage.preencherObservacao("Teste de movimentação");

    CadastroMovimentacoesPage.clicarSalvar();
    CadastroMovimentacoesPage.verificarFormularioExpandido();
    ItensMovimentacoesPage.verificarPainelVisivel();
    ItensMovimentacoesPage.verificarCamposBasicos();
    ItensMovimentacoesPage.selecionarPrimeiroProdutoDisponivel();
    ItensMovimentacoesPage.preencherQuantidade("2,00");
    ItensMovimentacoesPage.preencherPreco("10,00");
    ItensMovimentacoesPage.clicarSalvarItem();
    ItensMovimentacoesPage.verificarTabelaDeItens();
    ItensMovimentacoesPage.verificarLinhasVisiveis(1);
    ItensMovimentacoesPage.verificarTotais("1", "2,00", "20,00");
  });

  it("Deve abrir o formulário de novo cadastro de movimentação para operação Saída", () => {
    MenulateralProdutoPage.acessarCadastroNovaMovimentacoes();
    cy.url().should("include", "/movimentacao/novo");

    CadastroMovimentacoesPage.verificarFormularioVisivel();
    CadastroMovimentacoesPage.verificarCampoDataOperacao();
    CadastroMovimentacoesPage.verificarSelectOperacao();
    CadastroMovimentacoesPage.verificarCampoTipoAjuste();
    CadastroMovimentacoesPage.verificarBotaoSalvar();
    CadastroMovimentacoesPage.definirOperacao("SAIDA");
    CadastroMovimentacoesPage.verificarOperacaoEsperada("SAIDA");
    CadastroMovimentacoesPage.preencherObservacao("Teste de movimentação - saída");

    CadastroMovimentacoesPage.clicarSalvar();
    CadastroMovimentacoesPage.verificarFormularioExpandido();
    ItensMovimentacoesPage.verificarPainelVisivel();
    ItensMovimentacoesPage.verificarCamposBasicos();
    ItensMovimentacoesPage.selecionarPrimeiroProdutoDisponivel();
    ItensMovimentacoesPage.preencherQuantidade("1,00");
    ItensMovimentacoesPage.preencherPreco("5,00");
    ItensMovimentacoesPage.clicarSalvarItem();
    ItensMovimentacoesPage.verificarTabelaDeItens();
    ItensMovimentacoesPage.verificarLinhasVisiveis(1);
    ItensMovimentacoesPage.verificarTotais("1", "1,00", "5,00");
  });
});
