import EditarDespesaPage from "../../support/pages/Financeiro/EditarDespesaPage";

describe.skip('Edição Completa de Despesa', { tags: ['@editar-despesa', '@financeiro', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
        EditarDespesaPage.visit();
    });

    it('Deve editar completamente uma despesa e salvar', () => {
        const descricaoTeste = `Despesa Editada - ${new Date().toLocaleString()}`;
        EditarDespesaPage.preencherDescricao(descricaoTeste);
        EditarDespesaPage.selecionarCategoria();
        // EditarDespesaPage.selecionarConta();
        // EditarDespesaPage.selecionarFormaPagamento();
        EditarDespesaPage.preencherDataVencimento();
        EditarDespesaPage.preencherValorAleatorio();
        EditarDespesaPage.clicarSalvar();

        // Validações de sucesso
        cy.get('.Toastify__toast--success').should('contain', 'Sucesso');
    });
});
