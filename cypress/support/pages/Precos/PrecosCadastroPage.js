import PrecosCadastroLocators from "../../locators/Precos/PrecosCadastroLocators";

class PrecosCadastroPage {
    /**
     * Acessa diretamente a página de novo cadastro de preço.
     */
    visit() {
        cy.visit('/produto/gestor-preco/novo');
        cy.get('#loading').should('not.exist');
        cy.get(PrecosCadastroLocators.tituloGestorPrecos).should('be.visible');
        return this;
    }

    /**
     * Valida que o formulário está visível e os campos obrigatórios estão presentes.
     */
    validarFormularioVisivel() {
        cy.get(PrecosCadastroLocators.tituloGestorPrecos).should('be.visible');
        cy.get(PrecosCadastroLocators.secaoFiltroProdutos).should('be.visible');
        cy.get(PrecosCadastroLocators.secaoConfiguracoes).should('be.visible');
        cy.get(PrecosCadastroLocators.selectTipo).should('be.visible');
        cy.get(PrecosCadastroLocators.selectOperacao).should('be.visible');
        cy.get(PrecosCadastroLocators.campoReajuste).should('be.visible');
        cy.get(PrecosCadastroLocators.btnLancarReajuste).should('be.visible');
    }

    /**
     * Seleciona o tipo de filtro.
     * @param {'TODOS' | 'NOTAS DE ENTRADA'} tipo - Tipo de filtro
     */
    selecionarTipo(tipo = 'TODOS') {
        cy.get(PrecosCadastroLocators.selectTipo)
            .should('be.visible')
            .select(tipo);
        return this;
    }

    /**
     * Seleciona um produto usando o autocomplete.
     * Similar ao padrão usado em outros Page Objects.
     * @param {string} termo - Termo para buscar o produto
     */
    selecionarProduto(termo = '') {
        cy.get(PrecosCadastroLocators.campoProduto, { timeout: 10000 })
            .should('exist')
            .click({ force: true })
            .clear({ force: true });

        if (termo) {
            cy.get(PrecosCadastroLocators.campoProduto)
                .type(termo, { delay: 0, force: true });
            // Aguarda debounce do autocomplete
            cy.get(PrecosCadastroLocators.campoProdutoResultado, { timeout: 10000 })
                .should('exist')
                .should('be.visible');
        }

        // Clica no ícone de busca se existir
        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoProdutoIcon).length > 0) {
                cy.get(PrecosCadastroLocators.campoProdutoIcon)
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.get(PrecosCadastroLocators.campoProdutoResultado, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });

        // Seleciona o primeiro resultado da lista
        cy.get(PrecosCadastroLocators.campoProdutoResultado, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .click({ force: true });

        // Aguarda o campo hidden ser preenchido
        cy.get(PrecosCadastroLocators.campoProdutoHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        return this;
    }

    /**
     * Seleciona um grupo usando o autocomplete.
     * @param {string} termo - Termo para buscar o grupo
     */
    selecionarGrupo(termo = '') {
        cy.get(PrecosCadastroLocators.campoGrupo, { timeout: 10000 })
            .should('exist')
            .click({ force: true })
            .clear({ force: true });

        if (termo) {
            cy.get(PrecosCadastroLocators.campoGrupo)
                .type(termo, { delay: 0, force: true });
            cy.get(PrecosCadastroLocators.campoGrupoResultado, { timeout: 10000 })
                .should('exist')
                .should('be.visible');
        }

        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoGrupoIcon).length > 0) {
                cy.get(PrecosCadastroLocators.campoGrupoIcon)
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.get(PrecosCadastroLocators.campoGrupoResultado, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });

        cy.get(PrecosCadastroLocators.campoGrupoResultado, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .click({ force: true });

        cy.get(PrecosCadastroLocators.campoGrupoHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        return this;
    }

    /**
     * Seleciona um fabricante usando o autocomplete.
     * @param {string} termo - Termo para buscar o fabricante
     */
    selecionarFabricante(termo = '') {
        cy.get(PrecosCadastroLocators.campoFabricante, { timeout: 10000 })
            .should('exist')
            .click({ force: true })
            .clear({ force: true });

        if (termo) {
            cy.get(PrecosCadastroLocators.campoFabricante)
                .type(termo, { delay: 0, force: true });
            cy.get(PrecosCadastroLocators.campoFabricanteResultado, { timeout: 10000 })
                .should('exist')
                .should('be.visible');
        }

        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoFabricanteIcon).length > 0) {
                cy.get(PrecosCadastroLocators.campoFabricanteIcon)
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.get(PrecosCadastroLocators.campoFabricanteResultado, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });

        cy.get(PrecosCadastroLocators.campoFabricanteResultado, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .click({ force: true });

        cy.get(PrecosCadastroLocators.campoFabricanteHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        return this;
    }

    /**
     * Seleciona um fornecedor usando o autocomplete.
     * @param {string} termo - Termo para buscar o fornecedor
     */
    selecionarFornecedor(termo = '') {
        cy.get(PrecosCadastroLocators.campoFornecedor, { timeout: 10000 })
            .should('exist')
            .click({ force: true })
            .clear({ force: true });

        if (termo) {
            cy.get(PrecosCadastroLocators.campoFornecedor)
                .type(termo, { delay: 0, force: true });
            cy.get(PrecosCadastroLocators.campoFornecedorResultado, { timeout: 10000 })
                .should('exist')
                .should('be.visible');
        }

        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoFornecedorIcon).length > 0) {
                cy.get(PrecosCadastroLocators.campoFornecedorIcon)
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.get(PrecosCadastroLocators.campoFornecedorResultado, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });

        cy.get(PrecosCadastroLocators.campoFornecedorResultado, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .click({ force: true });

        cy.get(PrecosCadastroLocators.campoFornecedorHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        return this;
    }

    /**
     * Seleciona uma tabela de preço usando o autocomplete.
     * @param {string} termo - Termo para buscar a tabela de preço
     */
    selecionarTabelaPreco(termo = 'PREÇO PADRÃO') {
        cy.get(PrecosCadastroLocators.campoTabelaPreco, { timeout: 10000 })
            .should('exist')
            .click({ force: true })
            .clear({ force: true });

        if (termo) {
            cy.get(PrecosCadastroLocators.campoTabelaPreco)
                .type(termo, { delay: 0, force: true });
            cy.get(PrecosCadastroLocators.campoTabelaPrecoResultado, { timeout: 10000 })
                .should('exist')
                .should('be.visible');
        }

        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoTabelaPrecoIcon).length > 0) {
                cy.get(PrecosCadastroLocators.campoTabelaPrecoIcon)
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.get(PrecosCadastroLocators.campoTabelaPrecoResultado, { timeout: 10000 })
                    .should('exist')
                    .should('be.visible');
            }
        });

        cy.get(PrecosCadastroLocators.campoTabelaPrecoResultado, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .click({ force: true });

        cy.get(PrecosCadastroLocators.campoTabelaPrecoHidden, { timeout: 10000 })
            .invoke('val')
            .should('match', /\S+/);
        return this;
    }

    /**
     * Seleciona a operação.
     * @param {'AJUSTAR PREÇO' | 'FORMAR PREÇO'} operacao - Tipo de operação
     */
    selecionarOperacao(operacao = 'AJUSTAR PREÇO') {
        cy.get(PrecosCadastroLocators.selectOperacao)
            .should('be.visible')
            .select(operacao);
        return this;
    }

    /**
     * Preenche o campo de reajuste percentual.
     * @param {string} valor - Valor do reajuste (ex: '10,00')
     */
    preencherReajuste(valor) {
        // O campo de reajuste pode estar oculto dependendo da operação selecionada
        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.campoReajuste).is(':visible')) {
                cy.get(PrecosCadastroLocators.campoReajuste, { timeout: 10000 })
                    .should('be.visible')
                    .clear()
                    .type(valor);
            }
        });
        return this;
    }

    /**
     * Clica no botão Lançar Reajuste e aguarda o resultado.
     */
    lancarReajuste() {
        cy.get(PrecosCadastroLocators.btnLancarReajuste)
            .should('be.visible')
            .click();
        // Aguarda processamento - valida que o loading desapareceu
        cy.get('#loading').should('not.exist');
        return this;
    }

    /**
     * Valida que o cadastro foi realizado com sucesso.
     * Verifica o toast de sucesso e o redirecionamento para a tela de edição.
     */
    validarSucesso() {
        // Valida toast de sucesso (se aparecer)
        cy.get('body').then(($body) => {
            if ($body.find(PrecosCadastroLocators.toastSucesso).length > 0) {
                cy.get(PrecosCadastroLocators.toastSucesso).should('be.visible');
            }
        });
        // Valida redirecionamento para tela de edição
        cy.url().should('match', /\/produto\/gestor-preco\/\d+\/editar/);
        // Valida título
        cy.get(PrecosCadastroLocators.tituloGestorPrecos)
            .should('be.visible')
            .and('contain', 'Gestor de Preços');
    }

    /**
     * Clica no botão Voltar para retornar à listagem.
     */
    voltar() {
        cy.get(PrecosCadastroLocators.btnVoltar)
            .should('be.visible')
            .click();
        cy.url().should('include', '/produto/gestor-preco');
        cy.url().should('not.include', '/novo');
        cy.url().should('not.include', '/editar');
    }

    /**
     * Preenche o formulário completo com dados fornecidos.
     * @param {Object} dados - Objeto com os dados do reajuste
     * @param {'TODOS' | 'NOTAS DE ENTRADA'} [dados.tipo] - Tipo de filtro
     * @param {string} [dados.produto] - Termo para buscar produto
     * @param {string} [dados.grupo] - Termo para buscar grupo
     * @param {string} [dados.fabricante] - Termo para buscar fabricante
     * @param {string} [dados.fornecedor] - Termo para buscar fornecedor
     * @param {string} [dados.tabelaPreco] - Termo para buscar tabela de preço
     * @param {'AJUSTAR PREÇO' | 'FORMAR PREÇO'} [dados.operacao] - Tipo de operação
     * @param {string} dados.reajuste - Valor do reajuste percentual
     */
    preencherFormularioCompleto(dados) {
        if (dados.tipo) {
            this.selecionarTipo(dados.tipo);
        }
        if (dados.produto) {
            this.selecionarProduto(dados.produto);
        }
        if (dados.grupo) {
            this.selecionarGrupo(dados.grupo);
        }
        if (dados.fabricante) {
            this.selecionarFabricante(dados.fabricante);
        }
        if (dados.fornecedor) {
            this.selecionarFornecedor(dados.fornecedor);
        }
        if (dados.tabelaPreco) {
            this.selecionarTabelaPreco(dados.tabelaPreco);
        }
        if (dados.operacao) {
            this.selecionarOperacao(dados.operacao);
        }
        this.preencherReajuste(dados.reajuste);
        return this;
    }

    /**
     * Valida que a tabela de itens afetados está visível.
     * A tabela aparece após salvar o reajuste.
     */
    validarTabelaReajusteItem() {
        cy.get(PrecosCadastroLocators.tabelaReajusteItem, { timeout: 10000 })
            .should('be.visible');
        cy.get(PrecosCadastroLocators.linhasTabelaReajuste, { timeout: 10000 })
            .should('have.length.at.least', 1);
        return this;
    }
}

export default new PrecosCadastroPage();

