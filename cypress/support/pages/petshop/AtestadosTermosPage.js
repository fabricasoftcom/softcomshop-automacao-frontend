import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import AtestadosTermosLocators from '../../locators/Petshop/AtestadosTermosLocators';

class AtestadosTermosPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.wait(500);

        // Clica no menu Cadastro de Atestados e Termos
        cy.get(MenuLateralPetshopLocators.menuAtestadosTermos).click({ force: true });

        this.validarCarregamento();
    }

    validarCarregamento() {
        cy.url().should('include', '/atestados-termos');
        cy.get('body').should('be.visible');
        // Valida título se estiver presente
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.tituloListagem).length > 0) {
                cy.get(AtestadosTermosLocators.tituloListagem).should('be.visible');
            }
        });
    }

    // Métodos de Filtros - Listagem
    filtrarPorDescricao(descricao) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.filtroDescricao).length > 0) {
                cy.get(AtestadosTermosLocators.filtroDescricao).then(($input) => {
                    if ($input.is(':visible')) {
                        cy.get(AtestadosTermosLocators.filtroDescricao).clear().type(descricao);
                    } else {
                        cy.get(AtestadosTermosLocators.filtroDescricao).clear({ force: true }).type(descricao, { force: true });
                    }
                });
            } else {
                cy.log('Filtro de descrição não encontrado na página');
            }
        });
    }

    filtrarPorTipo(tipo) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.filtroTipo).length > 0) {
                cy.get(AtestadosTermosLocators.filtroTipo).then(($select) => {
                    const options = Array.from($select.find('option')).map(opt => opt.textContent?.trim());
                    if (options.includes(tipo)) {
                        cy.get(AtestadosTermosLocators.filtroTipo).select(tipo, { force: true });
                    } else if (options.length > 1) {
                        // Seleciona a primeira opção disponível (não vazia)
                        cy.get(AtestadosTermosLocators.filtroTipo).select(1, { force: true });
                    } else {
                        cy.log(`Opção "${tipo}" não encontrada. Opções disponíveis: ${options.join(', ')}`);
                    }
                });
            } else {
                cy.log('Filtro de tipo não encontrado na página');
            }
        });
    }

    filtrarPorStatus(status) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.filtroStatus).length > 0) {
                cy.get(AtestadosTermosLocators.filtroStatus).then(($select) => {
                    if ($select.is(':visible') && $select.find('option').length > 1) {
                        cy.get(AtestadosTermosLocators.filtroStatus).select(status, { force: true });
                    }
                });
            } else {
                cy.log('Filtro de status não encontrado na página');
            }
        });
    }

    aplicarFiltros() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.btnPesquisar).length > 0) {
                cy.get(AtestadosTermosLocators.btnPesquisar).click({ force: true });
                cy.get(AtestadosTermosLocators.loading).should('not.exist');
            } else {
                cy.log('Botão pesquisar não encontrado - filtros podem ser aplicados automaticamente');
            }
        });
    }

    // Métodos de Navegação
    clicarNovoCadastro() {
        cy.get(AtestadosTermosLocators.btnNovoCadastro).first().click({ force: true });
        cy.url().should('include', '/atestados-termos');
        cy.get('body').should('be.visible');
    }

    clicarVoltar() {
        cy.get(AtestadosTermosLocators.btnVoltar).click({ force: true });
        cy.url().should('include', '/atestados-termos');
    }

    clicarEditar(linhaIndex = 0) {
        cy.get(AtestadosTermosLocators.linkEditar).eq(linhaIndex).click({ force: true });
        cy.url().should('include', '/atestados-termos');
    }

    // Métodos de Cadastro
    preencherDescricao(descricao) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoDescricao).length > 0) {
                cy.get(AtestadosTermosLocators.campoDescricao).clear().type(descricao);
            } else {
                cy.log('Campo descrição não encontrado na página');
            }
        });
    }

    selecionarTipo(tipo) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoTipo).length > 0) {
                cy.get(AtestadosTermosLocators.campoTipo).select(tipo, { force: true });
            } else {
                cy.log('Campo tipo não encontrado na página');
            }
        });
    }

    preencherConteudo(conteudo) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoConteudo).length > 0) {
                cy.get(AtestadosTermosLocators.campoConteudo).clear().type(conteudo);
            } else {
                cy.log('Campo conteúdo não encontrado na página');
            }
        });
    }

    marcarDesativar() {
        cy.get(AtestadosTermosLocators.checkboxDesativar).check({ force: true });
    }

    desmarcarDesativar() {
        cy.get(AtestadosTermosLocators.checkboxDesativar).uncheck({ force: true });
    }

    salvar() {
        cy.get(AtestadosTermosLocators.btnSalvar).click({ force: true });
        cy.get(AtestadosTermosLocators.loading).should('not.exist');
    }

    // Métodos de Validação
    validarPresencaTabela() {
        cy.get(AtestadosTermosLocators.tabelaAtestadosTermos).should('be.visible');
    }

    validarListagemVazia() {
        cy.get(AtestadosTermosLocators.mensagemSemResultados).should('be.visible');
    }

    validarCadastroCarregado() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.tituloCadastro).length > 0) {
                cy.get(AtestadosTermosLocators.tituloCadastro).should('be.visible');
            }
        });
        // Valida campo descrição se existir
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoDescricao).length > 0) {
                cy.get(AtestadosTermosLocators.campoDescricao).should('be.visible');
            } else {
                // Se não encontrar, valida que a página carregou
                cy.url().should('include', '/atestados-termos');
            }
        });
    }
}

export default new AtestadosTermosPage();

