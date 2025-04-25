import NovaReceitaPage from "../../support/pages/Financeiro/NovaReceitaPage";
import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";

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
            cy.get('h5').contains('Receita').should('be.visible');
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
        const valorAleatorio = (Math.random() * 229 + 1).toFixed(2).replace('.', ',');
        NovaReceitaPage.preencherValor(valorAleatorio);
        NovaReceitaPage.selecionarCliente('{downarrow}{enter}');
        NovaReceitaPage.selecionarTipoDocumento('Padrão');
        NovaReceitaPage.clicarSalvar();
        cy.get('#loading').should('not.exist');
        // cy.contains('Sucesso').should('be.visible');

    }
    it('Valida erro ao tentar criar receita com tipo "Duplicata" para cliente "Consumidor"', { tags: ["@teste"] }, () => {
        cy.loginRestoreSession()
        cy.visit('/financeiro/contas-a-receber')
        cy.get('h5').contains('Receita').should('be.visible');
        ListagemContasAReceberPage.abrirNovoCadastro();
        NovaReceitaPage.preencherDescricao('Teste - Receita Duplicata para Consumidor');
        NovaReceitaPage.selecionarCategoria('Receita');
        NovaReceitaPage.selecionarConta('CAIXA');
        NovaReceitaPage.selecionarFormaPagamento('Duplicata');
        NovaReceitaPage.selecionarDataCompetencia('04/11/2024');
        NovaReceitaPage.selecionarDataVencimento('04/11/2024');
        NovaReceitaPage.preencherValor('100,00');
        cy.get('#autocomplete_client')
            .type('Consumidor', { force: true });
        cy.xpath("//li[@class='client_result '][contains(.,'CONSUMIDOR')]").click();
        NovaReceitaPage.selecionarTipoDocumento('Padrão');
        NovaReceitaPage.clicarSalvar();
        cy.xpath("//div[contains(@class,'toast--error')]", { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Forma de pagamento DUPLICATA não permitida para o cliente CONSUMIDOR na categoria RECEITA.');
    });
});
