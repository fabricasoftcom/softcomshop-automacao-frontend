import novoCadastroVinculoFiscalPage from "../../support/pages/VinculoFiscal/NovoCadastroVinculoFiscalPage";

describe('Cadastro de Novo Vínculo Fiscal', () => {

    beforeEach(() => {
        cy.login();
        novoCadastroVinculoFiscalPage.visit();
    });

    it('Deve preencher o formulário de vínculo fiscal e salvar', () => {
        const nomeVinculo = 'Novo Vínculo Fiscal';
        const tipoItem = 'Produto A';

        novoCadastroVinculoFiscalPage.preencherNomeVinculo(nomeVinculo);
        novoCadastroVinculoFiscalPage.selecionarTipoItem(tipoItem);

        novoCadastroVinculoFiscalPage.salvarVinculo();

        // Verificar se a página de sucesso ou algum retorno ocorre após salvar
        cy.url().should('include', '/vinculos-fiscais');
        cy.get('body').should('contain', 'Cadastro realizado com sucesso');
    });

    it('Deve voltar à página de vínculos fiscais', () => {
        novoCadastroVinculoFiscalPage.voltar();
        cy.url().should('include', '/vinculos-fiscais');
    });
});
