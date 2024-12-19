// MenulateralVendaPage.js
import MenulateralVendaLocators from "../../locators/MenulateralVendaLocators";

class MenulateralVendaPage {

    // Expande o menu "Vendas e NF-e" e clica em um submenu de um único nível
    acessarMenuVendaUmNivel(submenu) {
        cy.expandirClicarMenuUmNivel('Vendas e NF-e', submenu);
    }

    // Expande o menu "Vendas e NF-e" e clica em um submenu de dois níveis
    acessarMenuVendaDoisNiveis(menu, opcao) {
        cy.expandirClicarMenuDoisNiveis('Vendas e NF-e', menu, opcao);
    }

    // Métodos para acessar cada item do menu "Vendas e NF-e"

    acessarListagemClientes() {
        this.acessarMenuVendaUmNivel(MenulateralVendaLocators.clientes);
    }

    acessarListagemOrcamento() {
        this.acessarMenuVendaUmNivel(MenulateralVendaLocators.orcamento);
    }

    acessarListagemVendas() {
        this.acessarMenuVendaUmNivel(MenulateralVendaLocators.vendas);
    }

    acessarListagemNFCe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfce, MenulateralVendaLocators.nfceListagem);
    }

    acessarInutilizarNFCe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfce, MenulateralVendaLocators.nfceInutilizar);
    }

    acessarDownloadXmlNFCe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfce, MenulateralVendaLocators.nfceDownloadXml);
    }

    acessarConfiguracoesNFCe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfce, MenulateralVendaLocators.nfceConfiguracoes);
    }

    acessarListagemNFe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfe, MenulateralVendaLocators.nfeListagem);
    }

    acessarInutilizarNFe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfe, MenulateralVendaLocators.nfeInutilizar);
    }

    acessarDownloadXmlNFe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfe, MenulateralVendaLocators.nfeDownloadXml);
    }

    acessarConfiguracoesNFe() {
        this.acessarMenuVendaDoisNiveis(MenulateralVendaLocators.nfe, MenulateralVendaLocators.nfeConfiguracoes);
    }

    acessarPdvWeb() {
        this.acessarMenuVendaUmNivel(MenulateralVendaLocators.pdvWeb);
    }

    acessarPesquisaPreco() {
        this.acessarMenuVendaUmNivel(MenulateralVendaLocators.pesquisaPreco);
    }

    // Métodos para acessar o cadastro de novos itens

    acessarCadastroNovoOrcamento() {
        this.acessarListagemOrcamento();
        cy.get(MenulateralVendaLocators.btnNovo).click();
    }

    acessarCadastroNovaNfe() {
        this.acessarListagemNFe();
        cy.get(MenulateralVendaLocators.btnNovo).click();
    }
}

export default new MenulateralVendaPage();
