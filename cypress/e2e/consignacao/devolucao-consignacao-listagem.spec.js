import DevolucaoConsignacaoPage from '../../support/pages/Consignacao/DevolucaoConsignacaoPage';

describe('Listagem de Devoluções/Vendas de Consignação', { tags: ['@consignacao', '@devolucao', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    DevolucaoConsignacaoPage.visit();
  });

  it('Deve exibir a tabela de devoluções e permitir abrir o formulário de pesquisa', () => {
    DevolucaoConsignacaoPage.validarTabelaVisivel();
    DevolucaoConsignacaoPage.abrirFormularioPesquisa();
    DevolucaoConsignacaoPage.contarLinhasVisiveis().its('length').should('be.gte', 0);
  });

  it('Deve permitir navegar para novo cadastro', () => {
    DevolucaoConsignacaoPage.validarTabelaVisivel();
    DevolucaoConsignacaoPage.clicarNovoCadastro();
    cy.url().should('include', '/consignacao/devolucao/novo');
  });

  it('Deve aplicar filtros de pesquisa', () => {
    DevolucaoConsignacaoPage.validarTabelaVisivel();
    DevolucaoConsignacaoPage.aplicarFiltros({
      periodo: '',
      cliente: '',
      vendedor: ''
    });
    DevolucaoConsignacaoPage.validarTabelaVisivel();
  });

  it('Deve selecionar e desmarcar todos os registros', () => {
    DevolucaoConsignacaoPage.validarTabelaVisivel();
    DevolucaoConsignacaoPage.selecionarTodosRegistros();
    DevolucaoConsignacaoPage.validarTodosRegistrosSelecionados();
    DevolucaoConsignacaoPage.desmarcarTodosRegistros();
    DevolucaoConsignacaoPage.validarNenhumRegistroSelecionado();
  });
});

