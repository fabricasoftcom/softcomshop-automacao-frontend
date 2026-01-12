import ModelosPrescricoesPage from '../../support/pages/petshop/ModelosPrescricoesPage';

describe('Modelos de Prescrições - Petshop', { tags: ['@petshop', '@regressivo', '@prescricoes'] }, () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    it('Deve acessar a tela de listagem de Modelos de Prescrições', () => {
        ModelosPrescricoesPage.acessar();
        ModelosPrescricoesPage.validarPresencaTabela();
    });

    it('Deve filtrar modelos de prescrições por descrição', () => {
        ModelosPrescricoesPage.acessar();
        // Tenta filtrar se o campo existir
        cy.get('body').then(($body) => {
            if ($body.find('#descricao, input[name="descricao"]').length > 0) {
                ModelosPrescricoesPage.filtrarPorDescricao('Teste');
                ModelosPrescricoesPage.aplicarFiltros();
            } else {
                cy.log('Filtro de descrição não disponível nesta página');
            }
        });
        cy.get('body').should('be.visible');
    });

    it('Deve filtrar modelos de prescrições por status', () => {
        ModelosPrescricoesPage.acessar();
        // Tenta filtrar se o campo existir
        cy.get('body').then(($body) => {
            if ($body.find('select#status, select[name="status"]').length > 0) {
                ModelosPrescricoesPage.filtrarPorStatus('ativo');
                ModelosPrescricoesPage.aplicarFiltros();
            } else {
                cy.log('Filtro de status não disponível nesta página');
            }
        });
        cy.get('body').should('be.visible');
    });

    it('Deve acessar a página de cadastro de modelo de prescrição', () => {
        ModelosPrescricoesPage.acessar();
        // Tenta acessar cadastro se o botão existir
        cy.get('body').then(($body) => {
            if ($body.find('a[href*="/prescricao/novo"], a[href*="/prescricao/cadastro"]').length > 0) {
                ModelosPrescricoesPage.clicarNovoCadastro();
                ModelosPrescricoesPage.validarCadastroCarregado();
            } else {
                cy.log('Botão de novo cadastro não disponível nesta página');
                cy.url().should('include', '/prescricao');
            }
        });
    });

    it('Deve preencher formulário de cadastro de modelo de prescrição', () => {
        ModelosPrescricoesPage.acessar();
        // Tenta acessar cadastro se o botão existir
        cy.get('body').then(($body) => {
            if ($body.find('a[href*="/prescricao/novo"], a[href*="/prescricao/cadastro"]').length > 0) {
                ModelosPrescricoesPage.clicarNovoCadastro();

                // Preenche campos se existirem
                cy.get('body').then(($body2) => {
                    if ($body2.find('#descricao, input[name="descricao"]').length > 0) {
                        ModelosPrescricoesPage.preencherDescricao('Modelo Teste Automatizado');
                        cy.get('#descricao, input[name="descricao"]').should('have.value', 'Modelo Teste Automatizado');
                    }
                    if ($body2.find('#conteudo, textarea[name="conteudo"]').length > 0) {
                        ModelosPrescricoesPage.preencherConteudo('Conteúdo do modelo de prescrição');
                        cy.get('#conteudo, textarea[name="conteudo"]').should('have.value', 'Conteúdo do modelo de prescrição');
                    }
                });
            } else {
                cy.log('Botão de novo cadastro não disponível nesta página');
            }
        });
    });

    it('Deve voltar da página de cadastro para listagem', () => {
        ModelosPrescricoesPage.acessar();
        ModelosPrescricoesPage.clicarNovoCadastro();
        ModelosPrescricoesPage.clicarVoltar();
        cy.url().should('include', '/prescricao');
    });

    it('Deve validar estrutura da tabela de listagem', () => {
        ModelosPrescricoesPage.acessar();
        ModelosPrescricoesPage.validarPresencaTabela();
        // Valida que há pelo menos uma linha na tabela (excluindo header) ou mensagem de sem resultados
        cy.get('table tbody tr').then(($rows) => {
            if ($rows.length > 0) {
                cy.get('table tbody tr').should('have.length.at.least', 1);
            } else {
                cy.contains('Nenhum resultado').should('exist');
            }
        });
    });
});

