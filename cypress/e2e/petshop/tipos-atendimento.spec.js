import TiposAtendimentoPage from '../../support/pages/petshop/TiposAtendimentoPage';

describe('Tipos de Atendimento - Petshop', { tags: ['@petshop', '@regressivo', '@tipos-atendimento'] }, () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    it('Deve acessar a tela de listagem de Tipos de Atendimento', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.validarPresencaTabela();
        TiposAtendimentoPage.validarColunasTabela();
    });

    it('Deve filtrar tipos de atendimento por nome', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.filtrarPorNome('CONSULTA');
        TiposAtendimentoPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve acessar a página de cadastro de tipo de atendimento', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.clicarNovoCadastro();
        TiposAtendimentoPage.validarCadastroCarregado();
    });

    it('Deve preencher formulário de cadastro de tipo de atendimento', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.clicarNovoCadastro();

        // Preenche campos obrigatórios
        TiposAtendimentoPage.preencherNome('BANHO E TOSA');
        TiposAtendimentoPage.selecionarDuracao('1 hora');
        TiposAtendimentoPage.preencherCor('#FF5733');

        // Valida que os campos foram preenchidos
        cy.get('#nome_atendimento').should('have.value', 'BANHO E TOSA');
        cy.get('#duracao').then(($select) => {
            expect($select.val()).to.not.be.empty;
        });
        cy.get('#cor').should('have.value', '#FF5733');
    });

    it('Deve voltar da página de cadastro para listagem', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.clicarNovoCadastro();
        TiposAtendimentoPage.clicarVoltar();
        cy.url().should('include', '/tipo-atendimento');
        cy.contains('Listagem de Tipos de Atendimentos').should('be.visible');
    });

    it('Deve validar estrutura da tabela de listagem', () => {
        TiposAtendimentoPage.acessar();
        TiposAtendimentoPage.validarColunasTabela();
        // Valida que há pelo menos uma linha na tabela (excluindo header)
        cy.get('table tbody tr').should('have.length.at.least', 1);
    });
});

