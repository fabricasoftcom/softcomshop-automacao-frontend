import painelAtendimentoPage from "../../support/pages/painel-atendimento/painelAtendimentoPage";

describe('Testes no Painel de Atendimento', () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao(); // Faz login antes de cada teste
        painelAtendimentoPage.visit(); // Visita a página do painel de atendimento
    });
    describe('Testes de novo atendimento quando Gerar atendimento por serviço = nao', () => {
        it('Deve gerar um novo atendimento', () => {
            painelAtendimentoPage.desmarcarCheckboxGerarAtendimentoServicoSeMarcado();
            painelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            painelAtendimentoPage.desmarcarCheckboxGerarAtendimentoServicoSeMarcado();
            // Clica no primeiro card da coluna Agendado
            painelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            painelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            painelAtendimentoPage.salvarAtendimento();
            painelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            painelAtendimentoPage.clicarAbaOrdemServico();
            painelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });

    });
    describe('Testes de novo atendimento quando Gerar atendimento por serviço = sim', () => {
        it('Deve gerar um novo atendimento', () => {
            painelAtendimentoPage.marcarCheckboxGerarAtendimentoServicoSeDesmarcado();
            painelAtendimentoPage.iniciarNovoAtendimento();
        });
        it('Deve alterar o status para em atendimento e gerar Venda', () => {
            // Clica no primeiro card da coluna Agendado
            painelAtendimentoPage.clicarNoPrimeiroCardAgendado();
            painelAtendimentoPage.selecionarStatus('Em Atendimento');
            // cy.get('.modal #div_status > #status').select('Em Atendimento');
            painelAtendimentoPage.salvarAtendimento();
            painelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
            painelAtendimentoPage.clicarAbaOrdemServico();
            painelAtendimentoPage.gerarVenda();
            cy.wait(4000)
            cy.url().then(url => {
                expect(url).to.include('/vendas');
            });
        });
    });
});
