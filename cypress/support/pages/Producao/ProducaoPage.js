import ProducaoLocators from "../../locators/Producao/ProducaoLocators";

class ProducaoPage {
    /**
     * Visita a página de produção após login
     */
    visit() {
        cy.visit('/producao');
        cy.get('#loading').should('not.exist');
        cy.wait(1000);
    }

    /**
     * Valida se está na página de produção
     */
    validarUrlProducao() {
        cy.url().should('include', '/producao');
        return this;
    }

    /**
     * Valida se o título da listagem está visível
     */
    validarTituloListagem() {
        cy.get(ProducaoLocators.tituloListagem).should('be.visible');
        return this;
    }

    /**
     * Abre o formulário de pesquisa (expande o painel)
     */
    abrirFormularioPesquisa() {
        cy.get(ProducaoLocators.formPesquisa).then(($form) => {
            if (!$form.is(':visible')) {
                cy.get(ProducaoLocators.btnPesquisaToggle)
                    .should('be.visible')
                    .click();
                // Aguarda explicitamente o formulário ficar visível após o clique
                cy.get(ProducaoLocators.formPesquisa, { timeout: 5000 }).should('be.visible');
            } else {
                // Se já estiver visível, apenas garante que continua visível
                cy.get(ProducaoLocators.formPesquisa).should('be.visible');
            }
        });
        return this;
    }

    /**
     * Valida se o formulário de pesquisa está visível
     */
    validarFormularioPesquisa() {
        this.abrirFormularioPesquisa();
        cy.get(ProducaoLocators.codigoInput).should('be.visible');
        cy.get(ProducaoLocators.produtoAutocompleteListagem).should('be.visible');
        cy.get(ProducaoLocators.statusSelect).should('be.visible');
        cy.get(ProducaoLocators.dataInputListagem).should('be.visible');
        return this;
    }

    /**
     * Abre o modal de filtros avançados (se existir na tela)
     * NOTA: Na listagem de produção não há modal de filtros avançados,
     * apenas formulário de pesquisa expandido. Este método é mantido para compatibilidade.
     * @deprecated Use abrirFormularioPesquisa() em vez disso
     */
    abrirModalFiltros() {
        cy.get('body').then(($body) => {
            const btnModal = $body.find(ProducaoLocators.btnModalPlus);
            if (btnModal.length > 0 && btnModal.is(':visible')) {
                cy.get(ProducaoLocators.btnModalPlus).should('be.visible').click();
                cy.get(ProducaoLocators.modalFiltros).should('be.visible');
            } else {
                // Se não houver modal, usa o formulário de pesquisa
                this.abrirFormularioPesquisa();
            }
        });
        return this;
    }

    /**
     * Fecha o modal de filtros (se existir na tela)
     * NOTA: Na listagem de produção não há modal de filtros avançados,
     * apenas formulário de pesquisa expandido. Este método é mantido para compatibilidade.
     * @deprecated Use abrirFormularioPesquisa() para fechar o formulário em vez disso
     */
    fecharModalFiltros() {
        cy.get('body').then(($body) => {
            const modal = $body.find(ProducaoLocators.modalFiltros);
            if (modal.length > 0 && modal.is(':visible')) {
                cy.get(ProducaoLocators.btnModalClose).should('be.visible').click();
                cy.get(ProducaoLocators.modalFiltros).should('not.exist');
            } else {
                // Se não houver modal, fecha o formulário de pesquisa se estiver aberto
                const form = $body.find(ProducaoLocators.formPesquisa);
                if (form.is(':visible')) {
                    cy.get(ProducaoLocators.btnPesquisaToggle).click();
                    cy.get(ProducaoLocators.formPesquisa).should('not.be.visible');
                }
            }
        });
        return this;
    }

    /**
     * Preenche o campo de código
     * @param {string} codigo - Código da produção
     */
    preencherCodigo(codigo) {
        this.abrirFormularioPesquisa();
        cy.get(ProducaoLocators.codigoInput).should('be.visible').clear().type(codigo);
        return this;
    }

    /**
     * Preenche o campo de produto via autocomplete
     * @param {string} produto - Nome do produto
     */
    preencherProduto(produto) {
        this.abrirFormularioPesquisa();
        // Clica no campo para expandir autocomplete
        cy.get(ProducaoLocators.produtoAutocompleteListagem, { timeout: 10000 })
            .should('be.visible')
            .click({ force: true })
            .clear();
        if (produto) {
            cy.get(ProducaoLocators.produtoAutocompleteListagem).type(produto, { delay: 0 });
            // Aguarda o debounce do autocomplete (500ms é padrão)
            // O autocomplete pode ou não disparar uma requisição, então apenas aguardamos o tempo padrão
            cy.wait(500);

            // Tenta clicar no ícone de busca se existir para expandir a lista
            cy.get('body').then(($body) => {
                const icon = $body.find(ProducaoLocators.produtoIconListagem);
                if (icon.length > 0 && icon.is(':visible')) {
                    cy.get(ProducaoLocators.produtoIconListagem, { timeout: 5000 })
                        .should('exist')
                        .click({ force: true });
                    cy.wait(500);
                }
            });

            // Tenta selecionar da lista se aparecer, mas não falha se não aparecer
            // (alguns autocompletes na listagem podem funcionar apenas digitando)
            cy.get('body', { timeout: 3000 }).then(($body) => {
                const typeaheadItems = $body.find(ProducaoLocators.produtoResultadoListagem).filter(':visible');

                if (typeaheadItems.length > 0) {
                    cy.get(ProducaoLocators.produtoResultadoListagem, { timeout: 5000 })
                        .should('have.length.at.least', 1)
                        .filter(':visible')
                        .first()
                        .then(($el) => {
                            const texto = $el.text().trim();
                            if (texto &&
                                !texto.includes('Não foram encontrados') &&
                                !texto.includes('Digite algo') &&
                                !texto.includes('Nenhum resultado')) {
                                cy.wrap($el)
                                    .scrollIntoView()
                                    .should('be.visible')
                                    .click({ force: true });

                                // Valida que o campo hidden foi preenchido se existir
                                cy.get('body').then(($body) => {
                                    const hiddenField = $body.find(ProducaoLocators.produtoIdHiddenListagem);
                                    if (hiddenField.length > 0) {
                                        cy.get(ProducaoLocators.produtoIdHiddenListagem, { timeout: 5000 })
                                            .invoke('val')
                                            .should('match', /\S+/);
                                    }
                                });
                            }
                        });
                } else {
                    // Se a lista não aparecer, apenas loga e continua (pode ser que funcione apenas digitando)
                    cy.log('Lista de autocomplete não apareceu, continuando apenas com o texto digitado');
                }
            });
        }

        return this;
    }

    /**
     * Preenche o campo de status
     * @param {string} status - Status da produção ('EM ELABORAÇÃO' ou 'FINALIZADO')
     */
    preencherStatus(status) {
        this.abrirFormularioPesquisa();
        cy.get(ProducaoLocators.statusSelect).should('be.visible').select(status);
        return this;
    }

    /**
     * Preenche o campo de período (daterangepicker)
     * @param {string} dataInicio - Data inicial (DD/MM/YYYY)
     * @param {string} dataFim - Data final (DD/MM/YYYY)
     */
    preencherData(dataInicio, dataFim) {
        this.abrirFormularioPesquisa();
        cy.get(ProducaoLocators.dataInputListagem).should('be.visible').click();
        cy.get(ProducaoLocators.dataInputListagem).clear().type(`${dataInicio} - ${dataFim}`);
        return this;
    }

    /**
     * Clica no botão Pesquisar
     */
    clicarPesquisar() {
        cy.get(ProducaoLocators.btnPesquisar).should('be.visible').click();
        cy.get('#loading').should('not.exist');
        return this;
    }

    /**
     * Realiza uma pesquisa completa
     * @param {Object} filtros - Objeto com os filtros {codigo, produto, status, dataInicio, dataFim}
     */
    pesquisar(filtros = {}) {
        this.abrirFormularioPesquisa();

        if (filtros.codigo) {
            this.preencherCodigo(filtros.codigo);
        }
        if (filtros.produto) {
            this.preencherProduto(filtros.produto);
        }
        if (filtros.status) {
            this.preencherStatus(filtros.status);
        }
        if (filtros.dataInicio && filtros.dataFim) {
            this.preencherData(filtros.dataInicio, filtros.dataFim);
        }
        this.clicarPesquisar();
        return this;
    }

    /**
     * Clica no botão Novo Cadastro
     */
    clicarNovoCadastro() {
        cy.get(ProducaoLocators.btnNovoCadastro).first().should('be.visible').click();
        cy.url().should('include', '/producao/novo');
        return this;
    }

    /**
     * Valida se a tabela está visível
     */
    validarTabelaVisivel() {
        cy.get(ProducaoLocators.tabelaProducao).should('be.visible');
        return this;
    }

    /**
     * Valida se há resultados na tabela
     * @param {number} quantidadeMinima - Quantidade mínima de linhas esperadas
     */
    validarResultadosTabela(quantidadeMinima = 1) {
        cy.get(ProducaoLocators.tabelaLinhas).should('have.length.at.least', quantidadeMinima);
        return this;
    }

    /**
     * Valida se a mensagem "Nenhum resultado" está visível
     */
    validarMensagemSemResultados() {
        cy.get(ProducaoLocators.mensagemSemResultados).should('be.visible');
        return this;
    }

    /**
     * Limpa os filtros do formulário de pesquisa
     */
    limparFiltros() {
        this.abrirFormularioPesquisa();
        cy.get(ProducaoLocators.codigoInput).should('be.visible').clear();
        cy.get(ProducaoLocators.produtoAutocompleteListagem).should('be.visible').clear();
        cy.get(ProducaoLocators.statusSelect).should('be.visible').select('[selecione]');
        cy.get(ProducaoLocators.dataInputListagem).should('be.visible').clear();
        return this;
    }

    /**
     * Aguarda o carregamento da página
     */
    aguardarCarregamento() {
        cy.get(ProducaoLocators.loading).should('not.exist');
        return this;
    }

    /**
     * Localiza a primeira produção finalizada na tabela e abre para edição
     */
    abrirPrimeiraProducaoFinalizada() {
        cy.get(ProducaoLocators.tabelaLinhas)
            .filter(':contains("Finalizado")')
            .first()
            .find(ProducaoLocators.botaoEditarLinha)
            .click();

        cy.url({ timeout: 20000 }).should('include', '/producao/').and('include', '/editar');
        cy.get(ProducaoLocators.loading).should('not.exist');
        cy.wait(1000);
        return this;
    }

    /**
     * Localiza produção finalizada usando filtro de status e abre a primeira para edição
     */
    abrirPrimeiraProducaoFinalizadaComFiltro() {
        this.pesquisar({ status: 'FINALIZADO' });
        cy.get('body').then(($body) => {
            if ($body.find('#loading').length > 0) {
                cy.get('#loading', { timeout: 20000 }).should('not.exist');
            }
        });
        cy.get(ProducaoLocators.tabelaLinhas, { timeout: 20000 })
            .should('have.length.at.least', 1)
            .first()
            .find(ProducaoLocators.botaoEditarLinha)
            .should('be.visible')
            .click();

        cy.url({ timeout: 20000 }).should('include', '/producao/').and('include', '/editar');
        cy.get('body').then(($body) => {
            if ($body.find('#loading').length > 0) {
                cy.get('#loading', { timeout: 20000 }).should('not.exist');
            }
        });
        return this;
    }
}

export default new ProducaoPage();

