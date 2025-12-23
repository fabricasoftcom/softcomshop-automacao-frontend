import ProducaoPage from '../../support/pages/Producao/ProducaoPage';
import ProducaoLocators from '../../support/locators/Producao/ProducaoLocators';

describe('Listagem de Produção', { tags: ['@producao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    ProducaoPage.visit();
  });

  context('Validação inicial da tela', () => {
    it('exibe a tela de listagem com título, formulário de pesquisa e tabela visíveis', () => {
      ProducaoPage.validarUrlProducao()
        .validarTituloListagem()
        .validarFormularioPesquisa()
        .validarTabelaVisivel();
    });

    it('navega para novo cadastro ao clicar no botão', () => {
      ProducaoPage.clicarNovoCadastro();
      cy.url().should('include', '/producao/novo');
    });
  });

  context('Formulário de pesquisa', () => {
    it('abre e fecha o formulário de pesquisa corretamente', () => {
      // Abre o formulário
      ProducaoPage.abrirFormularioPesquisa();
      cy.get(ProducaoLocators.formPesquisa).should('be.visible');
      // Fecha o formulário clicando no botão toggle
      cy.get(ProducaoLocators.btnPesquisaToggle).should('be.visible').click();
      cy.get(ProducaoLocators.formPesquisa).should('not.be.visible');
      cy.wait(1000);
      // Abre novamente para confirmar que funciona
      ProducaoPage.abrirFormularioPesquisa();
      cy.get(ProducaoLocators.formPesquisa).should('be.visible');
    });

    it('limpa todos os campos do formulário de pesquisa', () => {
      ProducaoPage.pesquisar({ codigo: '1' });
      ProducaoPage.limparFiltros();
      cy.get(ProducaoLocators.codigoInput).should('have.value', '');
      cy.get(ProducaoLocators.produtoAutocompleteListagem).should('have.value', '');
      cy.get(ProducaoLocators.statusSelect).should('have.value', '');
      cy.get(ProducaoLocators.dataInputListagem).should('have.value', '');
    });
  });

  context('Pesquisa por filtros', () => {
    it('filtra por código e valida que a requisição foi enviada', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ codigo: '1' });
      cy.wait('@pesquisarProducao').then((interception) => {
        expect(interception.request.url).to.include('codigo=1');
        expect(interception.response.statusCode).to.be.oneOf([200, 302]);
      });
      ProducaoPage.validarTabelaVisivel();
    });

    it('filtra por produto e valida resultados na tabela', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ produto: 'Produto' });

      cy.wait('@pesquisarProducao').then((interception) => {
        expect(interception.response.statusCode).to.be.oneOf([200, 302]);
      });
      ProducaoPage.validarTabelaVisivel()
        .validarResultadosTabela(1);
    });
    it('filtra por status EM ELABORAÇÃO e valida resultados', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ status: 'EM ELABORAÇÃO' });
      cy.wait('@pesquisarProducao').then((interception) => {
        expect(interception.request.url).to.include('status');
        expect(interception.response.statusCode).to.be.oneOf([200, 302]);
      });
      ProducaoPage.validarTabelaVisivel()
        .validarResultadosTabela(1);
    });

    it('filtra por status FINALIZADO e valida resultados', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ status: 'FINALIZADO' });
      cy.wait('@pesquisarProducao').then((interception) => {
        expect(interception.request.url).to.include('status');
        expect(interception.response.statusCode).to.be.oneOf([200, 302]);
      });
      ProducaoPage.validarTabelaVisivel();
    });

    it('filtra por período e valida que o parâmetro foi enviado', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ dataInicio: '01/11/2025', dataFim: '30/11/2025' });
      cy.wait('@pesquisarProducao').then((interception) => {
        expect(interception.request.url).to.include('data');
        expect(interception.response.statusCode).to.be.oneOf([200, 302]);
      });
      ProducaoPage.validarTabelaVisivel();
    });
  });

  context('Cenários sem resultados', () => {
    it('mantém a tabela visível mesmo quando não há resultados para o filtro aplicado', () => {
      cy.intercept('GET', '**/producao**').as('pesquisarProducao');
      ProducaoPage.pesquisar({ codigo: '999999' });
      cy.wait('@pesquisarProducao');
      ProducaoPage.validarTabelaVisivel();
    });
  });
});

