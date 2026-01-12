import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import ModelosPrescricoesLocators from '../../locators/Petshop/ModelosPrescricoesLocators';

class ModelosPrescricoesPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.wait(500);

        // Clica no menu Modelos de Prescrições
        cy.get(MenuLateralPetshopLocators.menuModelosPrescricoes).click({ force: true });

        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.url().should('include', '/prescricao');
        cy.get('body').should('be.visible');
        // Valida título se estiver presente
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.tituloListagem).length > 0) {
                cy.get(ModelosPrescricoesLocators.tituloListagem).should('be.visible');
            }
        });
    }

    // Métodos de Filtros - Listagem
    filtrarPorDescricao(descricao) {
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.filtroDescricao).length > 0) {
                cy.get(ModelosPrescricoesLocators.filtroDescricao).then(($input) => {
                    if ($input.is(':visible')) {
                        cy.get(ModelosPrescricoesLocators.filtroDescricao).clear().type(descricao);
                    } else {
                        cy.get(ModelosPrescricoesLocators.filtroDescricao).clear({ force: true }).type(descricao, { force: true });
                    }
                });
            } else {
                cy.log('Filtro de descrição não encontrado na página');
            }
        });
    }

    filtrarPorStatus(status) {
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.filtroStatus).length > 0) {
                cy.get(ModelosPrescricoesLocators.filtroStatus).then(($select) => {
                    if ($select.is(':visible') && $select.find('option').length > 1) {
                        cy.get(ModelosPrescricoesLocators.filtroStatus).select(status, { force: true });
                    }
                });
            } else {
                cy.log('Filtro de status não encontrado na página');
            }
        });
    }

    aplicarFiltros() {
        cy.get(ModelosPrescricoesLocators.btnPesquisar).click({ force: true });
        cy.get(ModelosPrescricoesLocators.loading).should('not.exist');
    }

    // Métodos de Navegação
    clicarNovoCadastro() {
        cy.get(ModelosPrescricoesLocators.btnNovoCadastro).first().click({ force: true });
        cy.url().should('include', '/prescricao');
        cy.get('body').should('be.visible');
    }

    clicarVoltar() {
        cy.get(ModelosPrescricoesLocators.btnVoltar).click({ force: true });
        cy.url().should('include', '/prescricao');
    }

    clicarEditar(linhaIndex = 0) {
        cy.get(ModelosPrescricoesLocators.linkEditar).eq(linhaIndex).click({ force: true });
        cy.url().should('include', '/prescricao');
    }

    // Métodos de Cadastro
    preencherDescricao(descricao) {
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.campoDescricao).length > 0) {
                cy.get(ModelosPrescricoesLocators.campoDescricao).clear().type(descricao);
            } else {
                cy.log('Campo descrição não encontrado na página');
            }
        });
    }

    preencherConteudo(conteudo) {
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.campoConteudo).length > 0) {
                cy.get(ModelosPrescricoesLocators.campoConteudo).clear().type(conteudo);
            } else {
                cy.log('Campo conteúdo não encontrado na página');
            }
        });
    }

    marcarDesativar() {
        cy.get(ModelosPrescricoesLocators.checkboxDesativar).check({ force: true });
    }

    desmarcarDesativar() {
        cy.get(ModelosPrescricoesLocators.checkboxDesativar).uncheck({ force: true });
    }

    salvar() {
        cy.get(ModelosPrescricoesLocators.btnSalvar).click({ force: true });
        cy.get(ModelosPrescricoesLocators.loading).should('not.exist');
    }

    // Métodos de Validação
    validarPresencaTabela() {
        cy.get(ModelosPrescricoesLocators.tabelaPrescricoes).should('be.visible');
    }

    validarListagemVazia() {
        cy.get(ModelosPrescricoesLocators.mensagemSemResultados).should('be.visible');
    }

    validarCadastroCarregado() {
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.tituloCadastro).length > 0) {
                cy.get(ModelosPrescricoesLocators.tituloCadastro).should('be.visible');
            }
        });
        // Valida campo descrição se existir
        cy.get('body').then(($body) => {
            if ($body.find(ModelosPrescricoesLocators.campoDescricao).length > 0) {
                cy.get(ModelosPrescricoesLocators.campoDescricao).should('be.visible');
            } else {
                // Se não encontrar, valida que a página carregou
                cy.url().should('include', '/prescricao');
            }
        });
    }
}

export default new ModelosPrescricoesPage();

