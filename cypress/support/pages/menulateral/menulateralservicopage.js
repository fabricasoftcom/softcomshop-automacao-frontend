// MenulateralServicoPage.js
import MenulateralServicoLocators from "../../locators/MenulateralServicoLocators";

class MenulateralServicoPage {

    // Expande o menu de "Serviços e NFS-e" e clica em um submenu de um único nível
    acessarMenuServicoUmNivel(submenu) {
        cy.expandirClicarMenuUmNivel('Serviços e NFS-e', submenu);
    }

    // Expande o menu de "Serviços e NFS-e" e clica em um submenu de dois níveis
    acessarMenuServicoDoisNiveis(menu, opcao) {
        cy.expandirClicarMenuDoisNiveis('Serviços e NFS-e', menu, opcao);
    }

    // Métodos para acessar cada item do menu "Serviços e NFS-e"

    acessarListagemClientes() {
        this.acessarMenuServicoUmNivel(MenulateralServicoLocators.clientes);
    }

    acessarListagemServico() {
        this.acessarMenuServicoUmNivel(MenulateralServicoLocators.servico);
    }

    acessarListagemVinculoServico() {
        this.acessarMenuServicoUmNivel(MenulateralServicoLocators.vinculosFiscaisServico);
    }

    acessarListagemNFse() {
        this.acessarMenuServicoDoisNiveis(MenulateralServicoLocators.nfsE, MenulateralServicoLocators.nfsEListagem);
    }

    acessarConfiguracoesNFSe() {
        this.acessarMenuServicoDoisNiveis(MenulateralServicoLocators.nfsE, MenulateralServicoLocators.configuracoesNfsE);
    }

    acessarListagemOrdemServico() {
        this.acessarMenuServicoUmNivel(MenulateralServicoLocators.ordemServico);
    }

    // Métodos para acessar o cadastro de novos itens

    acessarCadastroNovoCliente() {
        this.acessarListagemClientes();
        cy.get(MenulateralServicoLocators.btnNovo).click();
    }

    acessarCadastroNovaNFSe() {
        this.acessarListagemNFse();
        cy.get(MenulateralServicoLocators.novoCadastroNFSe).click();
        cy.get(MenulateralServicoLocators.cadastroAvulsa).click({ force: true });
    }

    acessarCadastroNovaOrdemServico() {
        this.acessarListagemOrdemServico();
        cy.get(MenulateralServicoLocators.novoCadastroOrdemServico).click({ force: true });
    }
}

export default new MenulateralServicoPage();
