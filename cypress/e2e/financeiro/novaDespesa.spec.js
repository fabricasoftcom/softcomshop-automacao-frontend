import novaDespesaPage from "../../support/pages/Financeiro/NovaDespesaPage";
import ListagemContasAPagarPage from "../../support/pages/Financeiro/ListagemContasAPagarPage";

describe('Cadastro de Nova Despesa', { tags: ['@nova-despesa', '@financeiro', '@regressivo'] }, () => {
    const formasPagamento = require('../../fixtures/formasPagamento.json').formasPagamento;
    const categoria = 'Despesa'

    if(!Array.isArray(formasPagamento)) {
        throw new Error('O arquivo não contém um conteúdo de um JSON válido.');
    }

    formasPagamento.forEach((formaPagamento) => {
        it(`Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
            cy.loginArmazenandoSessao()
            cy.visit('/financeiro/contas-a-pagar')
            cy.get('h5').contains('Despesa').should('be.visible');
            ListagemContasAPagarPage.abrirNovoCadastro();
            preencherFormulario(categoria, formaPagamento);
        });
    });

    function preencherFormulario(categoria, formaPagamento) {
        const descricaoTeste = `Despesa Teste - ${new Date().toLocaleString()} - ${categoria}/${formaPagamento}`;

        novaDespesaPage.abrirModal(categoria);
        novaDespesaPage.preencherDescricao(descricaoTeste);
        novaDespesaPage.selecionarCategoria(categoria);
        novaDespesaPage.selecionarConta();
        novaDespesaPage.selecionarFormaPagamento(formaPagamento);

        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const valorAleatorio = (Math.random() * 500 + 1).toFixed(2).replace('.', ',');

        novaDespesaPage.selecionarDataCompetencia(dataAtual);
        novaDespesaPage.selecionarDataVencimento(dataAtual);
        novaDespesaPage.preencherValor(valorAleatorio);
        novaDespesaPage.selecionarFornecedor('{downarrow}{enter}');
        novaDespesaPage.selecionarTipoDocumento('PADRÃO');
        novaDespesaPage.preencherNumeroDocumento('98765');

        novaDespesaPage.clicarSalvar();
        cy.get('h5', { timeout: 10000 }).should('be.visible'); // Espera até 10 segundos

    }
});
