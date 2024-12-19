// MenulateralFinanceiroPage.js
import MenulateralFinanceiroLocators from "../../locators/MenulateralFinanceiroLocators";

class MenulateralFinanceiroPage {

    // Acessa o menu Financeiro e clica na opção de submenu especificada
    acessarMenuFinanceiro(opcao) {
        cy.expandirClicarMenuUmNivel('Financeiro', opcao);
    }

    // Acessa o menu Financeiro com dois subníveis e clica na opção desejada
    acessarMenuFinanceiroDoisNiveis(menu, subMenu) {
        cy.expandirClicarMenuDoisNiveis('Financeiro', menu, subMenu);
    }

    // Métodos para cada item do menu

    acessarListagemContas() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.listagemContas);
    }

    acessarTransferenciaContas() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.transferenciaContas);
    }

    acessarLancamentoConta() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.lancamentoConta);
    }

    acessarContasPagar() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.contasPagar);
    }

    acessarListagemContasReceberReceita() {
        this.acessarMenuFinanceiroDoisNiveis(MenulateralFinanceiroLocators.contasReceber, MenulateralFinanceiroLocators.receita);
    }

    acessarContasReceberRemessa() {
        this.acessarMenuFinanceiroDoisNiveis(MenulateralFinanceiroLocators.contasReceber, MenulateralFinanceiroLocators.exportarRemessa);
    }

    acessarContasReceberRetorno() {
        this.acessarMenuFinanceiroDoisNiveis(MenulateralFinanceiroLocators.contasReceber, MenulateralFinanceiroLocators.receberRetorno);
    }

    acessarCategorias() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.categorias);
    }

    acessarFluxo() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.fluxo);
    }

    acessarDRE() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.dre);
    }

    acessarExtrato() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.extrato);
    }

    acessarPainelPix() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.painelPix);
    }

    acessarEstornoPix() {
        this.acessarMenuFinanceiro(MenulateralFinanceiroLocators.estornoPix);
    }

    // Métodos para cadastro de novas entidades

    acessarCadastroNovaConta() {
        this.acessarListagemContas();
        cy.get(MenulateralFinanceiroLocators.novaConta).click({ force: true });
        cy.get(MenulateralFinanceiroLocators.novaContaCorrente).click({ force: true });
    }

    acessarCadastroNovoContasPagar() {
        this.acessarContasPagar();
        cy.get(MenulateralFinanceiroLocators.btnNovoCadastro).contains('Novo cadastro').click();
    }

    acessarCadastroNovaCategoria() {
        this.acessarCategorias();
        cy.get(MenulateralFinanceiroLocators.novaCategoriaReceita).click();
        cy.get(MenulateralFinanceiroLocators.voltarCategoria).click();
        cy.get(MenulateralFinanceiroLocators.novaCategoriaDespesa).click();
    }

}

export default new MenulateralFinanceiroPage();