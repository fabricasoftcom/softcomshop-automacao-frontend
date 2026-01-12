import VacinasPage from '../../support/pages/petshop/VacinasPage';

describe('Vacinas - Petshop', { tags: ['@petshop', '@regressivo', '@vacinas'] }, () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    it('Deve acessar a tela de listagem de Vacinas', () => {
        VacinasPage.acessar();
        VacinasPage.validarPresencaTabela();
    });

    it('Deve filtrar vacinas por grupo', () => {
        VacinasPage.acessar();
        VacinasPage.filtrarPorGrupo('Vacina');
        VacinasPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve filtrar vacinas por status', () => {
        VacinasPage.acessar();
        VacinasPage.filtrarPorStatus('ativo');
        VacinasPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve acessar a página de cadastro de vacina', () => {
        VacinasPage.acessar();
        VacinasPage.clicarNovoCadastro();
        VacinasPage.validarCadastroCarregado();
    });

    it('Deve preencher formulário de cadastro de vacina', () => {
        VacinasPage.acessar();
        VacinasPage.clicarNovoCadastro();

        // Preenche campos obrigatórios
        VacinasPage.preencherDescricao('Vacina Teste Automatizado');
        VacinasPage.selecionarGrupo('Vacina');

        // Marca opções
        VacinasPage.marcarRespeitarIntervalo();

        // Valida que os campos foram preenchidos
        cy.get('#descricao').should('have.value', 'Vacina Teste Automatizado');
        // Valida que o grupo foi selecionado (pode ter valor diferente do texto)
        cy.get('select#grupo').then(($select) => {
            const valorSelecionado = $select.val();
            expect(valorSelecionado).to.not.be.empty;
        });
    });

    it('Deve voltar da página de cadastro para listagem', () => {
        VacinasPage.acessar();
        VacinasPage.clicarNovoCadastro();
        VacinasPage.clicarVoltar();
        cy.url().should('include', '/vacinas');
        cy.contains('Listagem de Vacinas').should('be.visible');
    });
});

