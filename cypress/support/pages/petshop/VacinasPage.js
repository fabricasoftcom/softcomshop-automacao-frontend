import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import VacinasLocators from '../../locators/Petshop/VacinasLocators';

class VacinasPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.wait(500); // Aguarda animação do menu

        // Clica no menu Vacinas
        cy.get(MenuLateralPetshopLocators.menuVacinas).click({ force: true });

        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.url().should('include', '/vacinas');
        cy.get(VacinasLocators.tituloListagem).should('be.visible');
    }

    // Métodos de Filtros - Listagem
    filtrarPorVacina(nomeVacina) {
        cy.get(VacinasLocators.filtroVacina).type(nomeVacina);
        cy.wait(1000); // Aguarda debounce do autocomplete
        cy.get('.typeahead-container .typeahead-result').first().click();
    }

    filtrarPorGrupo(grupo) {
        cy.get(VacinasLocators.filtroGrupo).select(grupo, { force: true });
    }

    filtrarPorStatus(status) {
        cy.get(VacinasLocators.filtroStatus).then(($select) => {
            if ($select.is(':visible') && $select.find('option').length > 1) {
                cy.get(VacinasLocators.filtroStatus).select(status, { force: true });
            }
        });
    }

    aplicarFiltros() {
        cy.get(VacinasLocators.btnPesquisar).click({ force: true });
        cy.get(VacinasLocators.loading).should('not.exist');
    }

    // Métodos de Navegação
    clicarNovoCadastro() {
        cy.get(VacinasLocators.btnNovoCadastro).click({ force: true });
        cy.url().should('include', '/vacinas/cadastro');
        cy.get(VacinasLocators.tituloCadastro).should('be.visible');
    }

    clicarVoltar() {
        cy.get(VacinasLocators.btnVoltar).click({ force: true });
        cy.url().should('include', '/vacinas');
    }

    // Métodos de Cadastro
    preencherDescricao(descricao) {
        cy.get(VacinasLocators.campoDescricao).clear().type(descricao);
    }

    selecionarGrupo(grupo) {
        cy.get(VacinasLocators.campoGrupo).select(grupo, { force: true });
    }

    marcarDesativar() {
        cy.get(VacinasLocators.checkboxDesativar).check({ force: true });
    }

    desmarcarDesativar() {
        cy.get(VacinasLocators.checkboxDesativar).uncheck({ force: true });
    }

    marcarRespeitarIntervalo() {
        cy.get(VacinasLocators.checkboxRespeitarIntervalo).check({ force: true });
    }

    desmarcarRespeitarIntervalo() {
        cy.get(VacinasLocators.checkboxRespeitarIntervalo).uncheck({ force: true });
    }

    adicionarLaboratorio(laboratorio) {
        cy.get(VacinasLocators.campoLaboratorio).type(laboratorio);
        cy.get(VacinasLocators.btnAdicionarLaboratorio).click({ force: true });
    }

    salvar() {
        cy.get(VacinasLocators.btnSalvar).click({ force: true });
        cy.get(VacinasLocators.loading).should('not.exist');
    }

    // Métodos de Validação
    validarListagemVazia() {
        cy.get(VacinasLocators.mensagemSemResultados).should('be.visible');
    }

    validarPresencaTabela() {
        cy.get(VacinasLocators.tabelaVacinas).should('be.visible');
    }

    validarCadastroCarregado() {
        cy.get(VacinasLocators.tituloCadastro).should('be.visible');
        cy.get(VacinasLocators.campoDescricao).should('be.visible');
    }
}

export default new VacinasPage();

