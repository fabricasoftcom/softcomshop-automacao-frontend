import { beforeEach } from 'mocha';
import { faker } from '@faker-js/faker';
import PrecosCadastroPage from '../../support/pages/Precos/PrecosCadastroPage';
import PrecosListagemPage from '../../support/pages/Precos/PrecosListagemPage';
import PrecosCadastroLocators from '../../support/locators/Precos/PrecosCadastroLocators';

describe('Gestor de Preços - Cadastro', { tags: ['@produtos', '@precos', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    describe('Cadastro de Reajuste de Preço', () => {
        it('Deve exibir formulário de novo cadastro', () => {
            PrecosCadastroPage.visit();
            PrecosCadastroPage.validarFormularioVisivel();
        });

        it('Deve cadastrar reajuste de preço com sucesso', () => {
            // Gera valor de reajuste aleatório
            const reajuste = faker.number.float({ min: 1, max: 50, precision: 0.01 }).toFixed(2).replace('.', ',');

            // Acessa o formulário diretamente
            PrecosCadastroPage.visit();

            // Preenche o formulário
            PrecosCadastroPage.preencherFormularioCompleto({
                tipo: 'TODOS',
                operacao: 'AJUSTAR PREÇO',
                reajuste: reajuste
            });

            // Lança o reajuste e valida
            PrecosCadastroPage.lancarReajuste();
            PrecosCadastroPage.validarSucesso();
        });

        it('Deve permitir voltar para listagem', () => {
            PrecosCadastroPage.visit();
            PrecosCadastroPage.voltar();
            PrecosListagemPage.validarTabela();
        });

        it('Deve cadastrar reajuste com filtro de tipo NOTAS DE ENTRADA', () => {
            const reajuste = faker.number.float({ min: 1, max: 30, precision: 0.01 }).toFixed(2).replace('.', ',');

            PrecosCadastroPage.visit();
            PrecosCadastroPage.preencherFormularioCompleto({
                tipo: 'NOTAS DE ENTRADA',
                operacao: 'AJUSTAR PREÇO',
                reajuste: reajuste
            });

            PrecosCadastroPage.lancarReajuste();
            PrecosCadastroPage.validarSucesso();
        });

        it('Deve cadastrar reajuste com operação FORMAR PREÇO', () => {
            // Nota: Quando a operação é "FORMAR PREÇO", o campo de reajuste fica oculto
            // O sistema não requer reajuste para esta operação
            PrecosCadastroPage.visit();
            PrecosCadastroPage.selecionarTipo('TODOS');
            PrecosCadastroPage.selecionarOperacao('FORMAR PREÇO');

            // Não preenche reajuste pois o campo fica oculto nesta operação
            PrecosCadastroPage.lancarReajuste();
            PrecosCadastroPage.validarSucesso();
        });

        it('Deve exibir tabela de itens afetados após salvar', () => {
            const reajuste = faker.number.float({ min: 1, max: 20, precision: 0.01 }).toFixed(2).replace('.', ',');

            PrecosCadastroPage.visit();
            PrecosCadastroPage.preencherFormularioCompleto({
                tipo: 'TODOS',
                operacao: 'AJUSTAR PREÇO',
                reajuste: reajuste
            });

            PrecosCadastroPage.lancarReajuste();
            PrecosCadastroPage.validarSucesso();

            // Valida que a tabela de itens afetados aparece
            PrecosCadastroPage.validarTabelaReajusteItem();
        });

        it('Deve cadastrar reajuste completo com filtros opcionais', () => {
            const reajuste = faker.number.float({ min: 1, max: 15, precision: 0.01 }).toFixed(2).replace('.', ',');

            PrecosCadastroPage.visit();
            PrecosCadastroPage.selecionarTipo('TODOS');
            // Seleciona produto (pode falhar se não houver produtos, mas tenta)
            cy.get('body').then(($body) => {
                if ($body.find(PrecosCadastroLocators.campoProduto).length > 0) {
                    PrecosCadastroPage.selecionarProduto('produto');
                }
            });
            // Nota: Tabela de preço é opcional e pode não estar disponível no ambiente de teste
            // Por isso, pulamos a seleção de tabela de preço neste teste
            PrecosCadastroPage.selecionarOperacao('AJUSTAR PREÇO');
            PrecosCadastroPage.preencherReajuste(reajuste);

            PrecosCadastroPage.lancarReajuste();
            PrecosCadastroPage.validarSucesso();
        });
    });
});

