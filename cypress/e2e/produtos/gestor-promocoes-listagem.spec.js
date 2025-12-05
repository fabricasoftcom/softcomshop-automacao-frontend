import { beforeEach } from 'mocha';
import PromocoesListagemPage from '../../support/pages/Promocoes/PromocoesListagemPage';
import PromocoesCadastroPage from '../../support/pages/Promocoes/PromocoesCadastroPage';

describe('Gestor de Promoções - Listagem', { tags: ['@produtos', '@promocoes', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    describe('Listagem de Promoções', () => {
        it('Deve exibir a listagem de promoções', () => {
            PromocoesListagemPage.acessarListagem();
            PromocoesListagemPage.validarTabela();
            PromocoesListagemPage.validarColunas();
        });

        it('Deve permitir ordenar por código (crescente)', () => {
            PromocoesListagemPage.acessarListagem();
            PromocoesListagemPage.ordenarPorCodigo('crescente');
            PromocoesListagemPage.validarTabelaComDados();
        });

        it('Deve permitir ordenar por código (decrescente)', () => {
            PromocoesListagemPage.acessarListagem();
            PromocoesListagemPage.ordenarPorCodigo('decrescente');
            PromocoesListagemPage.validarTabelaComDados();
        });

        it('Deve permitir ordenar por descrição (crescente)', () => {
            PromocoesListagemPage.acessarListagem();
            PromocoesListagemPage.ordenarPorDescricao('crescente');
            PromocoesListagemPage.validarTabelaComDados();
        });

        it('Deve permitir acessar novo cadastro', () => {
            PromocoesListagemPage.acessarListagem();
            PromocoesListagemPage.clicarNovoCadastro();
            PromocoesCadastroPage.validarFormularioVisivel();
        });
    });
});

