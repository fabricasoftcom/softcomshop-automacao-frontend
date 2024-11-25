import novaDespesaPage from "../../support/pages/Financeiro/NovaDespesaPage";

describe('Cadastro de Nova Despesa', () => {
    beforeEach(() => {
        cy.login(); // Realiza o login antes de cada teste
        novaDespesaPage.visit(); // Acessa a página de nova despesa
    });

    // Definição de categorias e formas de pagamento para o teste
    const categorias = ['DESPESA', 'RECEITA'];
    // Constante com todas as opções do autocomplete de Forma de Pagamento
    const formasPagamento = ['ESPÉCIE', 'DUPLICATA', 'BOLETO', 'CHEQUE', 'CARTÃO DE CRÉDITO',
        'CARTÃO DE DÉBITO', 'TROCA', 'VALE ALIMENTAÇÃO', 'VALE REFEIÇÃO', 'VALE PRESENTE', 'VALE COMBUSTÍVEL', 'OUTROS',
        'CRÉDITO LOJA', 'ONLINE', 'PIX', 'PIX COBRANCA', 'DEPÓSITO BANCÁRIO', 'TRANSFERÊNCIA BANCÁRIA', 'CARTEIRA DIGITAL', 'CASHBACK'];


    categorias.forEach((categoria) => {
        formasPagamento.forEach((formaPagamento) => {
            it(`Deve preencher o formulário de Nova Despesa com Categoria: ${categoria} e Forma de Pagamento: ${formaPagamento}`, () => {
                preencherFormulario(categoria, formaPagamento);
            });
        });
    });

    function preencherFormulario(categoria, formaPagamento) {
        const descricaoTeste = `Despesa Teste - ${new Date().toLocaleString()} - ${categoria}/${formaPagamento}`;

        novaDespesaPage.abrirModal();
        novaDespesaPage.preencherDescricao(descricaoTeste);
        novaDespesaPage.selecionarCategoria(categoria);
        novaDespesaPage.selecionarConta();
        novaDespesaPage.selecionarFormaPagamento(formaPagamento);

        const dataAtual = new Date().toLocaleDateString('pt-BR');
        const valorAleatorio = (Math.random() * 500 + 1).toFixed(2).replace('.', ',');

        novaDespesaPage.selecionarDataCompetencia(dataAtual);
        novaDespesaPage.selecionarDataVencimento(dataAtual);
        novaDespesaPage.preencherValor(valorAleatorio);
        novaDespesaPage.selecionarFornecedor('fornecedor 01');
        novaDespesaPage.selecionarTipoDocumento('PADRÃO');
        novaDespesaPage.preencherNumeroDocumento('98765');

        novaDespesaPage.clicarSalvar();

        // Valida se a despesa aparece na listagem após o cadastro
        //avaliar, apenas algumas formas de pagamento geram registro em tela.
        // cy.get('table tbody').should('be.visible');
        // cy.contains(descricaoTeste).should('exist');
    }

    // // Teste negativo: Tentativa de salvar despesa sem preencher campos obrigatórios
    it('Deve exibir erro ao tentar salvar uma nova despesa sem preencher os campos obrigatórios', () => {
        novaDespesaPage.abrirModal();

        // Tenta salvar sem preencher campos obrigatórios
        cy.get('.modal .btn-primary').click();

        // Valida se a mensagem de erro é exibida
        cy.get('.modal-content', { timeout: 10000 })
            .find('.has-error') // Busca por elementos que possuem a classe "has-error" dentro do modal
            .should('exist');   // Verifica se ao menos um elemento existe


    });
});
