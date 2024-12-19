import MenulateralConfiguracoesLocators from "../../locators/ConfiguracoesLocators";

class MenulateralConfiguracoesPage {

    // Acessa o menu Configurações e clica na opção de submenu especificada
    acessarMenuConfiguracoes(opcao) {
        cy.expandirClicarMenuUmNivel('Configurações', opcao);
    }

    // Ações de navegação para cada submenu

    acessarListagemEmpresas() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemEmpresas);
        cy.url().should('include', '/cadastro/empresa');
    }

    acessarListagemFuncionarios() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemFuncionarios);
        cy.url().should('include', '/cadastro/funcionario');
    }

    acessarListagemUsuarios() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemUsuarios);
    }

    acessarListagemPerfisAcesso() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemPerfisAcesso);
    }

    acessarListagemFormasPagamentos() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemFormasPagamentos);
    }

    acessarListagemCartoes() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.listagemCartoes);
    }

    acessarModulos() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.modulos);
    }

    acessarScheme() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.scheme);
    }

    acessarSincronizacao() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.sincronizacao);
    }

    acessarNotificacoes() {
        this.acessarMenuConfiguracoes(MenulateralConfiguracoesLocators.notificacoes);
    }

    // Acessa a tela de cadastro de nova empresa
    acessarCadastroNovaEmpresa() {
        this.acessarListagemEmpresas();
        cy.get(MenulateralConfiguracoesLocators.btnNovoCadastro).click();
        cy.url().should('include', '/novo');
    }
}

export default new MenulateralConfiguracoesPage();