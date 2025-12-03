import PainelAtendimentoPage from "../../support/pages/painel-atendimento/PainelAtendimentoPage";

describe('Testes no Painel de Atendimento', { tags: ['@painel-atendimento', '@regressivo'] }, () => {
    before(()=>{
        cy.setupSistemaPetshop()
    })
    beforeEach(() => {
        cy.loginArmazenandoSessao(); // Faz login antes de cada teste
        PainelAtendimentoPage.visit(); // Visita a página do painel de atendimento
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
