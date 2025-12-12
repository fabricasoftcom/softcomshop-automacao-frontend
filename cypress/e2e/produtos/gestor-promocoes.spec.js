import { beforeEach } from 'mocha';
import { faker } from '@faker-js/faker';
import PromocoesCadastroPage from '../../support/pages/Promocoes/PromocoesCadastroPage';
import PromocoesListagemPage from '../../support/pages/Promocoes/PromocoesListagemPage';

describe('Gestor de Promoções - Cadastro', { tags: ['@produtos', '@promocoes', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    describe('Cadastro de Promoção', () => {
        /**
         * Gera uma data futura formatada para o date range picker
         * @param {number} diasOffset - Número de dias a partir de hoje
         * @returns {string} Data formatada como DD/MM/YYYY HH:mm:ss
         */
        const gerarDataFutura = (diasOffset = 30) => {
            const data = new Date();
            data.setDate(data.getDate() + diasOffset);
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0');
            const ano = data.getFullYear();
            return `${dia}/${mes}/${ano} 00:00:00`;
        };

        it('Deve exibir formulário de novo cadastro', () => {
            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.validarFormularioVisivel();
        });

        it('Deve cadastrar promoção com sucesso', () => {
            // Gera dados aleatórios
            const descricao = `Promoção ${faker.commerce.productName()} - ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1); // 1 dia a partir de hoje
            const dataFim = gerarDataFutura(60); // 60 dias a partir de hoje
            const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
            const horaInicio = '08:00';
            const horaFim = '20:00';

            // Acessa o formulário diretamente
            PromocoesCadastroPage.visit();

            // Preenche o formulário
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: diasSemana,
                horaInicio,
                horaFim
            });

            // Salva e valida
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();
        });

        it('Deve permitir voltar para listagem', () => {
            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.voltar();
            PromocoesListagemPage.validarTabela();
        });

        it('Deve cadastrar promoção com todos os dias da semana', () => {
            const descricao = `Promoção Completa ${faker.commerce.productName()} - ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(90);
            const todosOsDias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

            PromocoesCadastroPage.visit();

            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: todosOsDias,
                horaInicio: '00:00',
                horaFim: '23:59'
            });

            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();
        });

        it('Deve exibir seção de produtos após salvar', () => {
            const descricao = `Promoção Teste Produtos ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(30);

            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: ['segunda'],
                horaInicio: '08:00',
                horaFim: '20:00'
            });
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();

            // Valida que a seção Produtos aparece após salvar
            PromocoesCadastroPage.validarSecaoProdutosVisivel();
        });

        it('Deve adicionar produto à promoção', () => {
            const descricao = `Promoção Teste Adicionar Produto ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(30);

            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: ['segunda'],
                horaInicio: '08:00',
                horaFim: '20:00'
            });
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();

            // Adiciona um produto
            PromocoesCadastroPage.adicionarProdutoCompleto({
                tipo: 'Produto',
                termoBusca: 'produto',
                descontoPercentual: '10,00'
            });

            // Valida que o botão de ativação aparece após adicionar produto
            PromocoesCadastroPage.validarLinkAtivacaoVisivel();
        });

        it('Deve cadastrar promoção completa com produtos e ativar', () => {
            const descricao = `Promoção Completa com Produtos ${faker.commerce.productName()} - ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(60);
            const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: diasSemana,
                horaInicio: '08:00',
                horaFim: '20:00'
            });
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();

            // Adiciona produtos à promoção
            PromocoesCadastroPage.adicionarProdutoCompleto({
                tipo: 'Produto',
                termoBusca: 'produto',
                descontoReais: '5,00'
            });
            // Ativa a promoção
            PromocoesCadastroPage.ativarPromocao();
            PromocoesCadastroPage.validarPromocaoAtiva();
        });

        it('Deve ativar promoção após cadastro completo', () => {
            const descricao = `Promoção Teste Ativação ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(30);

            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: ['segunda', 'terca'],
                horaInicio: '08:00',
                horaFim: '20:00'
            });
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();

            // Adiciona produto
            PromocoesCadastroPage.adicionarProdutoCompleto({
                tipo: 'Produto',
                termoBusca: 'produto',
                descontoPercentual: '10,00'
            });

            // Ativa promoção
            PromocoesCadastroPage.ativarPromocao();
            PromocoesCadastroPage.validarPromocaoAtiva();
        });

        it('Deve permitir desativar promoção ativa', () => {
            const descricao = `Promoção Teste Desativação ${faker.string.alphanumeric(6)}`;
            const dataInicio = gerarDataFutura(1);
            const dataFim = gerarDataFutura(30);

            PromocoesCadastroPage.visit();
            PromocoesCadastroPage.preencherFormularioCompleto({
                descricao,
                dataInicio,
                dataFim,
                dias: ['segunda'],
                horaInicio: '08:00',
                horaFim: '20:00'
            });
            PromocoesCadastroPage.salvar();
            PromocoesCadastroPage.validarSucesso();

            // Adiciona produto
            PromocoesCadastroPage.adicionarProdutoCompleto({
                tipo: 'Produto',
                termoBusca: 'produto',
                descontoPercentual: '10,00'
            });

            // Ativa promoção
            PromocoesCadastroPage.ativarPromocao();
            PromocoesCadastroPage.validarPromocaoAtiva();

            // Desativa promoção
            PromocoesCadastroPage.desativarPromocao();
            PromocoesCadastroPage.validarPromocaoInativa();
        });
    });
});

