import EditarDespesaPage from "../../support/pages/Financeiro/EditarDespesaPage";

describe('Edição Completa de Despesa', () => {
    beforeEach(() => {
        cy.login();
        EditarDespesaPage.visit();
    });

    it('Deve editar completamente uma despesa e salvar', () => {
        const descricaoTeste = `Despesa Editada - ${new Date().toLocaleString()}`;
        EditarDespesaPage.preencherDescricao(descricaoTeste);
        EditarDespesaPage.selecionarCategoria();
        //EditarDespesaPage.selecionarConta();
        //EditarDespesaPage.selecionarFormaPagamento();
        EditarDespesaPage.preencherDataVencimento();
        EditarDespesaPage.preencherValorAleatorio();
        EditarDespesaPage.clicarSalvar();

        // Validações de sucesso
        cy.get('.Toastify__toast--success').should('contain', 'Sucesso');
    });

    // it('Deve editar uma despesa e cancelar a edição clicando em voltar', () => {
    //     const descricaoTeste = `Teste Cancelar - ${new Date().toLocaleString()}`;
    //     EditarDespesaPage.preencherDescricao(descricaoTeste);
    //     EditarDespesaPage.clicarVoltar();

    //     // Valida que o modal foi fechado
    //     cy.get(EditarDespesaPage.modalContent).should('not.exist');
    // });
});
