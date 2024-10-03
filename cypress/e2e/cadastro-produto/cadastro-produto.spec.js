import { generateRandomProduct } from "../../support/factory/generateRandomData";
import ProdutoPage from "../../support/pages/Produto/ProdutoPage";
import VinculoFiscalPage from "../../support/pages/VinculoFiscal/VinculoFiscalPage";
import 'allure-cypress';

describe('Cadastro de produtos', () => {
    beforeEach(() => {
        cy.login();
    })

    it('Realizar cadastro de produto valido informando o vinculo fiscal', () => {
        ProdutoPage.visit();
        const produto = generateRandomProduct();
        ProdutoPage.preencherDetalhesDoProduto(produto);
        ProdutoPage.cadastrar();
        ProdutoPage.confirmacaoCadastroProduto();
        VinculoFiscalPage.acessarMenuDetalhesFiscais();
        VinculoFiscalPage.selecionarEmpresaMatriz();
        VinculoFiscalPage.selecionarVinculoFiscal();
        VinculoFiscalPage.salvarVinculoFiscal();
        VinculoFiscalPage.confirmacaoCadastroVinculoFiscal();
        ProdutoPage.confirmacaoCadastroProduto();
    });
});
