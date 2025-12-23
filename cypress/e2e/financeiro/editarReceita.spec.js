import EditarReceitaPage from "../../support/pages/Financeiro/EditarReceitaPage";
import EditarReceitaLocators from "../../support/locators/Financeiro/EditarReceitaLocators";

describe('Edição Completa de Receita', { tags: ['@editar-receita', '@financeiro', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit("/");
        EditarReceitaPage.visit();
    });

    it('Deve realizar uma edição completa e salvar a receita', () => {
        const descricaoTeste = `Receita Teste - ${new Date().toLocaleString()}`;
        EditarReceitaPage.preencherDescricao(descricaoTeste);
        EditarReceitaPage.selecionarCategoria();
        EditarReceitaPage.selecionarConta();
        EditarReceitaPage.selecionarFormaPagamento();
        EditarReceitaPage.preencherDataVencimento();
        EditarReceitaPage.preencherValorAleatorio();
        EditarReceitaPage.selecionarCliente();
        EditarReceitaPage.selecionarTipoDocumento();

        EditarReceitaPage.clicarSalvar();

        // Validação de sucesso e verificação dos dados
        cy.get('.Toastify__toast--success').should('contain', 'Sucesso');
    });

    it('Deve cancelar a edição clicando no botão "Voltar"', () => {
        const descricaoTeste = `Teste Voltar - ${new Date().toLocaleString()}`;
        EditarReceitaPage.preencherDescricao(descricaoTeste);
        EditarReceitaPage.clicarVoltar();
        // Valida que elemento funcional desapareceu ao fechar (não o container que pode persistir)
        cy.get(EditarReceitaLocators.descricaoInput, { timeout: 10000 })
            .should('not.exist');
    });
});
