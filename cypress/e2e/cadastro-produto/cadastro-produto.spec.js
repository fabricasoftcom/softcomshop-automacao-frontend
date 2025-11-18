import { generateRandomProduct } from "../../support/factory/generateRandomData";
import ProdutoPage from "../../support/pages/Produto/ProdutoPage";
import VinculoFiscalPage from "../../support/pages/VinculoFiscal/VinculoFiscalPage";
import ProdutosListPage from "../../support/pages/Produtos/ProdutosListPage";
describe('Cadastro de produtos', { tags: ["@cadastro-produto", "@regressivo"] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
    });

    it('cadastra produto com venda desativada e valida o estado apos salvar', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.desabilitarVenda();
        ProdutoPage.cadastrar();
        ProdutoPage.verificarAlertaDadosFiscais();
        ProdutoPage.verificarTelaDadosCadastrais();
        ProdutoPage.verificarVendaDesativada();
    });

    it('edita um produto pela listagem e valida a alteracao', () => {
        const novaObservacao = `Observacao editada ${Date.now()}`;
        ProdutosListPage.acessarListagem();
        ProdutosListPage.verificarTabelaVisivel();

        ProdutosListPage.obterPrimeiroProdutoDaTabela().then(({ codigo }) => {
            ProdutosListPage.clicarEditarProdutoPeloCodigo(codigo);
        });

        cy.location("pathname", { timeout: 40000 }).should(
            "match",
            /\/produto\/\d+\/editar/
        );

        ProdutoPage.atualizarObservacao(novaObservacao);
        ProdutoPage.cadastrar();
        ProdutoPage.cancelarAlertaAtualizacaoGrupo();
        ProdutoPage.verificarTelaDadosCadastrais();
        ProdutoPage.validarObservacao(novaObservacao);
    });

    it('exibe as abas principais do formulario antes de cadastrar', () => {
        ProdutoPage.visit();
        ProdutoPage.verificarAbas();
    });

    it('Realizar cadastro de produto valido informando o vinculo fiscal', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.cadastrar();
        ProdutoPage.verificarAlertaDadosFiscais();
        ProdutoPage.verificarTelaDadosCadastrais();
        VinculoFiscalPage.acessarMenuDetalhesFiscais();

        VinculoFiscalPage.selecionarVinculoFiscal();
        VinculoFiscalPage.preencherNcmECest();
        VinculoFiscalPage.salvarVinculoFiscal();
        VinculoFiscalPage.confirmacaoCadastroVinculoFiscal();
    });

    it('cadastra produto habilitando grade e recusa os dados fiscais', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.habilitarGrade();
        ProdutoPage.cadastrar();
        ProdutoPage.verificarAlertaDadosFiscais();
        ProdutoPage.verificarTelaDadosCadastrais();
        cy.location("pathname", { timeout: 40000 }).should(
            "match",
            /\/produto\/\d+\/editar/
        );
        ProdutoPage.acessarAbaGrade();
        ProdutoPage.verificarGradeSemItens();
        ProdutoPage.montarGrade();
        ProdutoPage.preencherGradeSimplificada(3);
        ProdutoPage.verificarGradeComItens(1);
    });

    it('cadastra produto habilitando combo e valida a aba sem itens', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.habilitarCombo();
        ProdutoPage.cadastrar();
        ProdutoPage.verificarAlertaDadosFiscais();
        ProdutoPage.verificarTelaDadosCadastrais();
        cy.location("pathname", { timeout: 40000 }).should(
            "match",
            /\/produto\/\d+\/editar/
        );
        ProdutoPage.acessarAbaCombo();
        ProdutoPage.verificarComboSemItens();
        ProdutoPage.verificarComboQuantidadeItens(0);
        ProdutoPage.adicionarItemCombo();
        cy.get("@comboItensAdicionados").then(({ gruposSelecionados }) => {
            expect(gruposSelecionados).to.be.greaterThan(0);
            ProdutoPage.verificarComboComItens(1);
            ProdutoPage.verificarComboQuantidadeItens(1);
        });
    });

    it('cadastra e exclui o produto depois de recusar preencher os dados fiscais', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.cadastrar();
        ProdutoPage.verificarAlertaDadosFiscais();
        ProdutoPage.verificarTelaDadosCadastrais();
        ProdutoPage.excluir();
    });
});

