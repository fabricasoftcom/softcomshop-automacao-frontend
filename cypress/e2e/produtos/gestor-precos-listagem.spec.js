import { beforeEach } from 'mocha';
import PrecosListagemPage from '../../support/pages/Precos/PrecosListagemPage';
import PrecosCadastroPage from '../../support/pages/Precos/PrecosCadastroPage';

describe('Gestor de Preços - Listagem', { tags: ['@produtos', '@precos', '@regressivo'] }, () => {
    beforeEach(() => {
        cy.loginArmazenandoSessao();
        cy.visit('/');
    });

    describe('Listagem de Preços', () => {
        it('Deve exibir a listagem de preços', () => {
            PrecosListagemPage.acessarListagem();
            PrecosListagemPage.validarTabela();
            PrecosListagemPage.validarColunas();
        });

        it('Deve validar que a tabela contém dados', () => {
            PrecosListagemPage.acessarListagem();
            PrecosListagemPage.validarTabelaComDados();
        });

        it('Deve permitir acessar novo cadastro', () => {
            PrecosListagemPage.acessarListagem();
            PrecosListagemPage.clicarNovoCadastro();
            PrecosCadastroPage.validarFormularioVisivel();
        });
    });
});

