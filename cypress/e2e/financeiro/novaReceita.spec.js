import NovaReceitaPage from "../../support/pages/Financeiro/NovaReceitaPage";
import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";
import { faker } from '@faker-js/faker';

describe('Cadastro de Nova Receita', { tags: ['@nova-receita', '@financeiro', '@regressivo'] }, () => {
    const formasPagamento = require('../../fixtures/formasPagamento.json').formasPagamento;
    const categoria = 'RECEITA'

    if(!Array.isArray(formasPagamento)) {
        throw new Error('O arquivo não contém um conteúdo de um JSON válido.');
    }

    formasPagamento.forEach((formaPagamento) => {
        it(`Deve preencher o formulário de Nova Receita com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
            cy.loginArmazenandoSessao()
            cy.visit('/financeiro/contas-a-receber')
            cy.get('h5').contains('Contas a Receber').should('be.visible');
            ListagemContasAReceberPage.abrirNovoCadastro();
            preencherFormulario(categoria, formaPagamento);
        });
    });

    function preencherFormulario(categoria, formaPagamento) {
        const descricaoTeste = `Receita Teste - ${new Date().toLocaleString()} - ${categoria}/${formaPagamento}`;
        NovaReceitaPage.preencherDescricao(descricaoTeste);
        NovaReceitaPage.selecionarCategoria(categoria);
        NovaReceitaPage.selecionarConta();
        NovaReceitaPage.selecionarFormaPagamento(formaPagamento);

        const dataAtual = new Date().toLocaleDateString('pt-BR');
        NovaReceitaPage.selecionarDataCompetencia(dataAtual);
        NovaReceitaPage.selecionarDataVencimento(dataAtual);
        const valorAleatorio = faker.number.float({ min: 1, max: 229, precision: 0.01 }).toFixed(2).replace('.', ',');
        NovaReceitaPage.preencherValor(valorAleatorio);
        NovaReceitaPage.selecionarCliente('{downarrow}{enter}');
        NovaReceitaPage.selecionarTipoDocumento('Padrão');
        NovaReceitaPage.clicarSalvar();
        cy.get('#loading').should('not.exist');
        // Validação de sucesso reativada com padrão do módulo financeiro
        cy.get('.Toastify__toast--success', { timeout: 15000 })
            .should('be.visible')
            .and('contain.text', 'Sucesso');

    }
});
