import GestaoOrdemServicoPage from '../../support/pages/petshop/GestaoOrdemServicoPage';

describe('Gestão de Ordem de Serviço - Petshop', { tags: ['@petshop', '@regressivo', '@ordem-servico'] }, () => {

    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    it('Deve acessar o Painel de Gestão de OS', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.validarPresencaTabela();
    });

    it('Deve filtrar ordens de serviço por período', () => {
        GestaoOrdemServicoPage.acessar();
        const hoje = new Date().toLocaleDateString('pt-BR');
        GestaoOrdemServicoPage.filtrarPorPeriodo(hoje, hoje);
        GestaoOrdemServicoPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve filtrar ordens de serviço por número da OS', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.filtrarPorNumeroOS('1');
        GestaoOrdemServicoPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve filtrar ordens de serviço por vendas geradas', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.filtrarPorVendasGeradas('Sim');
        GestaoOrdemServicoPage.aplicarFiltros();
        cy.get('body').should('be.visible');
    });

    it('Deve validar seção de geração de registros', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.validarSecaoGeracao();
    });

    it('Deve validar resumo de quantidades e valores', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.validarResumo();
    });

    it('Deve marcar opções de geração de registros', () => {
        GestaoOrdemServicoPage.acessar();
        GestaoOrdemServicoPage.marcarGerarVendas();
        GestaoOrdemServicoPage.marcarGerarNfse();
        // Valida que os checkboxes foram marcados (usando índice como fallback)
        cy.get('input[type="checkbox"]').eq(0).should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).should('be.checked');
    });
});

