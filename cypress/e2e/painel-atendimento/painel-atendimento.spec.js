import painelAtendimentoPage from "../../support/pages/painel-atendimento/painelAtendimentoPage";
import PainelAtendimentoPage from "../../support/pages/painel-atendimento/painelAtendimentoPage";

describe('Testes no Painel de Atendimento', () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao(); // Faz login antes de cada teste
        PainelAtendimentoPage.visit(); // Visita a página do painel de atendimento
    });

    // it('Deve iniciar um novo atendimento', () => {
    //     PainelAtendimentoPage.iniciarNovoAtendimento();
    //     PainelAtendimentoPage.preencherFormularioNovoAtendimento();
    //     PainelAtendimentoPage.preencherCamposAtendimento();
    // });
    it('Deve altera status para Em andamento e gerar Venda', () => {
        // Clica no primeiro card da coluna Agendado
        PainelAtendimentoPage.clicarNoPrimeiroCardAgendado();
        PainelAtendimentoPage.selecionarStatus('Em Atendimento');
        // cy.get('.modal #div_status > #status').select('Em Atendimento');
        PainelAtendimentoPage.salvarAtendimento();
        painelAtendimentoPage.clicarNoPrimeiroCardDaColunaEmAtendimento();
        painelAtendimentoPage.clicarAbaOrdemServico();
        painelAtendimentoPage.gerarVenda();
    });

    // it('Deve pesquisar atendimentos com filtros', () => {
    //     PainelAtendimentoPage.pesquisarAtendimentos(
    //         '25/04/2025',
    //         'AGENDADO',
    //         'Funcionario Teste',
    //         'Cliente Teste',
    //         'Animal Teste'
    //     );
    //     cy.get(PainelAtendimentoLocators.tabelaAtendimentos)
    //         .should('exist'); // Verifica se a tabela de atendimentos está visível
    // });

    // it('Deve filtrar atendimentos por status', () => {
    //     PainelAtendimentoPage.filtrarStatus('CONCLUIDO'); // Filtra por atendimentos concluídos
    //     cy.get(PainelAtendimentoLocators.painelConcluido)
    //         .find(PainelAtendimentoLocators.tabelaBody)
    //         .children()
    //         .should('have.length.greaterThan', 0); // Verifica se há itens no painel concluído
    // });

    // it('Deve verificar o painel Kanban', () => {
    //     PainelAtendimentoPage.verificarPainelKanban('Agendado', 3); // Verifica se há 3 itens no painel agendado
    // });

    // it('Deve acessar as configurações do painel', () => {
    //     PainelAtendimentoPage.configurarPainel(); // Clica no botão de configurações
    //     cy.url().should('include', '/configuracoes'); // Verifica se a URL inclui '/configuracoes'
    // });
});
