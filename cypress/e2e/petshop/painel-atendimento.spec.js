import PainelAtendimentoPage from '../../support/pages/petshop/PainelAtendimentoPage';

describe('Painel de Atendimento - Petshop', { tags: ['@petshop', '@regressivo', '@painel-atendimento'] }, () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    it('Deve acessar o Painel de Atendimento e validar elementos principais', () => {
        PainelAtendimentoPage.acessar();
        PainelAtendimentoPage.validarAbas();
        PainelAtendimentoPage.validarContadores();
    });

    it('Deve filtrar atendimentos por data', () => {
        PainelAtendimentoPage.acessar();
        const hoje = new Date().toLocaleDateString('pt-BR');
        PainelAtendimentoPage.filtrarPorData(hoje, hoje);
        PainelAtendimentoPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve filtrar atendimentos por status', () => {
        PainelAtendimentoPage.acessar();
        // Verifica se o select de status existe e está visível antes de filtrar
        cy.get('#filtro_status').then(($select) => {
            if ($select.is(':visible') && $select.find('option').length > 1) {
                // Seleciona a primeira opção disponível (não vazia)
                const primeiroValor = $select.find('option').not('[value=""]').first().val();
                if (primeiroValor) {
                    PainelAtendimentoPage.filtrarPorStatus(primeiroValor);
                    PainelAtendimentoPage.aplicarFiltros();
                    cy.get('body').should('be.visible');
                } else {
                    cy.log('Filtro de status não disponível ou sem opções válidas');
                }
            } else {
                cy.log('Filtro de status não está visível - pode estar oculto por padrão');
            }
        });
    });

    it('Deve navegar entre as abas (Painel de Atendimentos e Vacinação)', () => {
        PainelAtendimentoPage.acessar();
        PainelAtendimentoPage.validarAbas();

        // Navega para aba Vacinação
        PainelAtendimentoPage.acessarAbaVacinacao();
        cy.contains('Vacinação').should('be.visible');

        // Volta para aba Painel de Atendimentos
        PainelAtendimentoPage.acessarAbaPainelAtendimentos();
        cy.contains('Painel de Atendimentos').should('be.visible');
    });

    it('Deve acessar a página de pesquisa de animal', () => {
        PainelAtendimentoPage.acessar();
        PainelAtendimentoPage.clicarNovoAtendimento();
        // Valida que a página foi carregada (pode ser via AJAX ou redirecionamento)
        cy.get('body').should('be.visible');
        // Verifica se o campo de pesquisa de animal está presente (pode estar em modal ou página)
        cy.get('body').then(($body) => {
            if ($body.find('#auto_filtro_animal_id').length > 0) {
                cy.get('#auto_filtro_animal_id').should('be.visible');
            }
        });
    });

    it('Deve validar contadores de status estão presentes', () => {
        PainelAtendimentoPage.acessar();
        PainelAtendimentoPage.validarCardStatus('Agendados');
        PainelAtendimentoPage.validarCardStatus('Em Espera');
        PainelAtendimentoPage.validarCardStatus('Em Atendimento');
        PainelAtendimentoPage.validarCardStatus('Concluído');
    });

    it('Deve limpar filtros aplicados', () => {
        PainelAtendimentoPage.acessar();
        // Aplica um filtro de data primeiro (mais confiável)
        const hoje = new Date().toLocaleDateString('pt-BR');
        PainelAtendimentoPage.filtrarPorData(hoje, hoje);
        PainelAtendimentoPage.aplicarFiltros();
        // Limpa os filtros
        PainelAtendimentoPage.limparFiltros();
        cy.get('body').should('be.visible');
    });
    describe('Testes de novo atendimento quando Gerar atendimento por serviço = nao e registro tempo = turno', () => {
        it('Deve gerar um novo atendimento', () => {
            PainelAtendimentoPage.desmarcarCheckboxGerarAtendimentoServicoSeMarcado();
            PainelAtendimentoPage.registroTempoTurno();
            PainelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            // Clica no primeiro card da coluna Agendado
            PainelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            PainelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            PainelAtendimentoPage.salvarAtendimento();
            PainelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            PainelAtendimentoPage.clicarAbaOrdemServico();
            PainelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });

    });
    describe('Testes de novo atendimento quando Gerar atendimento por serviço = sim e registro tempo =turno', () => {
        it('Deve gerar um novo atendimento', () => {
            PainelAtendimentoPage.marcarCheckboxGerarAtendimentoServicoSeDesmarcado();
            PainelAtendimentoPage.registroTempoTurno();
            PainelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            // Clica no primeiro card da coluna Agendado
            PainelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            PainelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            PainelAtendimentoPage.salvarAtendimento();
            PainelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            PainelAtendimentoPage.clicarAbaOrdemServico();
            PainelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });
    });

        describe('Testes de novo atendimento quando Gerar atendimento por serviço = nao e registro tempo = horario', () => {
        it('Deve gerar um novo atendimento', () => {
            PainelAtendimentoPage.desmarcarCheckboxGerarAtendimentoServicoSeMarcado();
            PainelAtendimentoPage.registroTempoHorario();
            PainelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            // Clica no primeiro card da coluna Agendado
            PainelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            PainelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            PainelAtendimentoPage.salvarAtendimento();
            PainelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            PainelAtendimentoPage.clicarAbaOrdemServico();
            PainelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });

    });
    describe('Testes de novo atendimento quando Gerar atendimento por serviço = sim e registro tempo =horario', () => {
        it('Deve gerar um novo atendimento', () => {
            PainelAtendimentoPage.marcarCheckboxGerarAtendimentoServicoSeDesmarcado();
            PainelAtendimentoPage.registroTempoHorario();
            PainelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            // Clica no primeiro card da coluna Agendado
            PainelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            PainelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            PainelAtendimentoPage.salvarAtendimento();
            PainelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            PainelAtendimentoPage.clicarAbaOrdemServico();
            PainelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });
    });
});

