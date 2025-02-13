// MenulateralProdutoPage.js
import MenulateralProdutoLocators from "../../locators/MenulateralProdutoLocators";

class MenulateralProdutoPage {

    // Expande o menu e acessa um item de um único nível
    acessarMenuProdutoUmNivel(submenu) {
        cy.expandirClicarMenuUmNivel('Compras e Estoque', submenu);
    }

    // Expande o menu e acessa um item de dois níveis
    acessarMenuProdutoDoisNiveis(menu, opcao) {
        cy.expandirClicarMenuDoisNiveis('Compras e Estoque', menu, opcao);
    }

    // Métodos para acessar cada item do menu de Compras e Estoque

    acessarListagemFornecedores() {
        this.acessarMenuProdutoUmNivel(MenulateralProdutoLocators.fornecedor);
    }

    acessarListagemAtributos() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.atributos);
    }

    acessarListagemVinculosFiscais() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.vinculosFiscais);
    }

    acessarAtualizadosDadosFiscais() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.atualizarDadosFiscais);
    }

    acessarListagemProdutos() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.produto);
    }

    acessarListagemGestorPromocoes() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.gestorPromocoes);
    }

    acessarListagemGestorPrecos() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.produtos, MenulateralProdutoLocators.gestorPrecos);
    }

    acessarListagemNuvemFiscal() {
        this.acessarMenuProdutoUmNivel(MenulateralProdutoLocators.nuvemFiscal);
    }

    acessarListagemOrdemFornecimento() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.gestaoCompras, MenulateralProdutoLocators.ordemFornecimento);
    }

    acessarListagemCompras() {
        this.acessarMenuProdutoDoisNiveis(MenulateralProdutoLocators.gestaoCompras, MenulateralProdutoLocators.compras);
    }

    acessarListagemMovimentacoes() {
        this.acessarMenuProdutoUmNivel(MenulateralProdutoLocators.movimentacoes);
    }

    acessarListagemProducao() {
        this.acessarMenuProdutoUmNivel(MenulateralProdutoLocators.producao);
    }

    acessarListagemBalanco() {
        this.acessarMenuProdutoUmNivel(MenulateralProdutoLocators.balanco);
    }

    // Métodos para acessar o cadastro de novos itens

    acessarCadastroNovoAtributo() {
        this.acessarListagemAtributos();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovoVinculosFiscais() {
        this.acessarListagemVinculosFiscais();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovoGestorPromocoes() {
        this.acessarListagemGestorPromocoes();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovoGestorPrecos() {
        this.acessarListagemGestorPrecos();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovaOrdemFornecimento() {
        this.acessarListagemOrdemFornecimento();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovaCompra() {
        this.acessarListagemCompras();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovaMovimentacoes() {
        this.acessarListagemMovimentacoes();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovaProducao() {
        this.acessarListagemProducao();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }

    acessarCadastroNovoBalanco() {
        this.acessarListagemBalanco();
        cy.get(MenulateralProdutoLocators.btnNovo).click();
    }
}

export default new MenulateralProdutoPage();
