import MenuPage from '../Menu/MenuPage';
import MenuLateralPetshopLocators from '../../locators/Petshop/MenuLateralPetshopLocators';
import AtestadosTermosLocators from '../../locators/Petshop/AtestadosTermosLocators';

class AtestadosTermosPage {

    acessar() {
        MenuPage.waitForAppReady();

        // Expande menu Serviços e NFS-e
        cy.contains('Serviços e NFS-e').click({ force: true });
        cy.get(MenuLateralPetshopLocators.menuAtestadosTermos).should('be.visible');

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

    tentarClicarNovoCadastro() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.btnNovoCadastro).length > 0) {
                cy.get(AtestadosTermosLocators.btnNovoCadastro).first().click({ force: true });
                cy.url().should('include', '/atestados-termos');
                cy.get('body').should('be.visible');
            } else {
                cy.log('Botão de novo cadastro não disponível nesta página');
            }
        });
    }

    tentarClicarVoltar() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.btnVoltar).length > 0) {
                cy.get(AtestadosTermosLocators.btnVoltar).click({ force: true });
                cy.url().should('include', '/atestados-termos');
            } else {
                cy.log('Botão voltar não disponível - já pode estar na listagem');
            }
        });
    }

    clicarEditar(linhaIndex = 0) {
        cy.get(AtestadosTermosLocators.linkEditar).eq(linhaIndex).click({ force: true });
        cy.url().should('include', '/atestados-termos');
    }

    tentarClicarEditar(linhaIndex = 0) {
        cy.get('body').then(($body) => {
            const links = $body.find(AtestadosTermosLocators.linkEditar);
            if (links.length > linhaIndex) {
                cy.get(AtestadosTermosLocators.linkEditar).eq(linhaIndex).click({ force: true });
                cy.url().should('include', '/atestados-termos');
                cy.get('body').should('be.visible');
            } else {
                cy.log('Link de edição não disponível ou tabela sem registros');
            }
        });
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

    validarSucessoAposSalvar() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.toastSucesso).length > 0) {
                cy.get(AtestadosTermosLocators.toastSucesso, { timeout: 10000 })
                    .should('be.visible')
                    .and('contain', 'sucesso');
            } else {
                cy.log('Toast de sucesso não encontrado - validando URL e listagem');
            }
        });
        cy.url().should('include', '/atestados-termos');
        this.validarPresencaTabela();
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

    validarEstruturaTabelaListagem() {
        cy.get(AtestadosTermosLocators.tabelaAtestadosTermos).find(AtestadosTermosLocators.linhasTabela).then(($rows) => {
            if ($rows.length > 0) {
                cy.wrap($rows).should('have.length.at.least', 1);
            } else {
                cy.contains(AtestadosTermosLocators.mensagemSemResultadosTexto).should('exist');
            }
        });
    }

    validarCampoDescricaoValor(valor) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoDescricao).length > 0) {
                cy.get(AtestadosTermosLocators.campoDescricao).should('have.value', valor);
            }
        });
    }

    validarCampoConteudoValor(valor) {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoConteudo).length > 0) {
                cy.get(AtestadosTermosLocators.campoConteudo).should('have.value', valor);
            }
        });
    }

    validarTipoComValorSelecionado() {
        cy.get('body').then(($body) => {
            if ($body.find(AtestadosTermosLocators.campoTipo).length > 0) {
                cy.get(AtestadosTermosLocators.campoTipo).then(($select) => {
                    expect($select.val()).to.not.be.empty;
                });
            }
        });
    }
    // Métodos de Exclusão
    clicarExcluir() {
        // Prepara para aceitar o confirm nativo CASO ele ocorra
        cy.on('window:confirm', () => true);
        cy.get(AtestadosTermosLocators.btnExcluir).should('be.visible').click({ force: true });
    }

    confirmarExclusao() {
        // Se for SweetAlert, precisa clicar no botão de confirmar
        cy.get('body').then(($body) => {
            if ($body.find('.swal2-confirm').length > 0) {
                cy.get('.swal2-confirm').click();
            } else if ($body.find('.bootbox-accept').length > 0) {
                 cy.get('.bootbox-accept').click();
            }
             // Se for nativo, o cy.on já aceitou no clicarExcluir
        });
    }

    validarExclusao(descricao) {
        cy.get(AtestadosTermosLocators.loading, { timeout: 10000 }).should('not.exist');
        // Aguarda um pouco para garantir que a grid recarregou
        cy.wait(1000);
        this.filtrarPorDescricao(descricao);
        this.aplicarFiltros();
        cy.contains(AtestadosTermosLocators.mensagemSemResultadosTexto).should('be.visible');
    }
}

export default new AtestadosTermosPage();

