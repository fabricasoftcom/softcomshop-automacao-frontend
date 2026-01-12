import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import TiposAtendimentoLocators from '../../locators/Petshop/TiposAtendimentoLocators';

class TiposAtendimentoPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.wait(500);

        // Clica no menu Tipos de Atendimento
        cy.get(MenuLateralPetshopLocators.menuTiposAtendimento).click({ force: true });

        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.url().should('include', '/tipo-atendimento');
        // Aguarda carregamento da página
        cy.get('body').should('be.visible');
        // Valida título se estiver presente
        cy.get('body').then(($body) => {
            if ($body.find(TiposAtendimentoLocators.tituloListagem).length > 0) {
                cy.get(TiposAtendimentoLocators.tituloListagem).should('be.visible');
            }
        });
    }

    // Métodos de Filtros - Listagem
    filtrarPorNome(nome) {
        // O filtro pode estar oculto, então usa force se necessário
        cy.get(TiposAtendimentoLocators.filtroNome).then(($input) => {
            if ($input.is(':visible')) {
                cy.get(TiposAtendimentoLocators.filtroNome).clear().type(nome);
            } else {
                // Se estiver oculto, tenta expandir ou usar force
                cy.get(TiposAtendimentoLocators.filtroNome).clear({ force: true }).type(nome, { force: true });
            }
        });
    }

    aplicarFiltros() {
        cy.get(TiposAtendimentoLocators.btnPesquisar).click({ force: true });
        cy.get(TiposAtendimentoLocators.loading).should('not.exist');
    }

    // Métodos de Navegação
    clicarNovoCadastro() {
        cy.get(TiposAtendimentoLocators.btnNovoCadastro).first().click({ force: true });
        cy.url().should('include', '/tipo-atendimento/novo');
        cy.get(TiposAtendimentoLocators.tituloCadastro).should('be.visible');
    }

    clicarVoltar() {
        cy.get(TiposAtendimentoLocators.btnVoltar).click({ force: true });
        cy.url().should('include', '/tipo-atendimento');
    }

    clicarEditar(linhaIndex = 0) {
        cy.get(TiposAtendimentoLocators.linkEditar).eq(linhaIndex).click({ force: true });
        cy.url().should('include', '/editar');
    }

    // Métodos de Cadastro
    preencherNome(nome) {
        cy.get(TiposAtendimentoLocators.campoNome).clear().type(nome);
    }

    selecionarDuracao(duracao) {
        cy.get(TiposAtendimentoLocators.campoDuracao).select(duracao, { force: true });
    }

    preencherCor(cor) {
        cy.get(TiposAtendimentoLocators.campoCor).clear().type(cor);
    }

    marcarDesativar() {
        cy.get(TiposAtendimentoLocators.checkboxDesativar).check({ force: true });
    }

    desmarcarDesativar() {
        cy.get(TiposAtendimentoLocators.checkboxDesativar).uncheck({ force: true });
    }

    salvar() {
        cy.get(TiposAtendimentoLocators.btnSalvar).click({ force: true });
        cy.get(TiposAtendimentoLocators.loading).should('not.exist');
    }

    // Métodos de Validação
    validarPresencaTabela() {
        cy.get(TiposAtendimentoLocators.tabelaTiposAtendimento).should('be.visible');
    }

    validarColunasTabela() {
        cy.get(TiposAtendimentoLocators.colunaCodigo).should('be.visible');
        cy.get(TiposAtendimentoLocators.colunaNome).should('be.visible');
        cy.get(TiposAtendimentoLocators.colunaDuracao).should('be.visible');
        cy.get(TiposAtendimentoLocators.colunaCor).should('be.visible');
    }

    validarCadastroCarregado() {
        cy.get(TiposAtendimentoLocators.tituloCadastro).should('be.visible');
        cy.get(TiposAtendimentoLocators.campoNome).should('be.visible');
    }

    validarLinhaNaTabela(nome) {
        cy.get(TiposAtendimentoLocators.tabelaTiposAtendimento).should('contain', nome);
    }
}

export default new TiposAtendimentoPage();

