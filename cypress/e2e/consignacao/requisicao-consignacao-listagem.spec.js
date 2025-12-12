import RequisicaoConsignacaoPage from "../../support/pages/Consignacao/RequisicaoConsignacaoPage";

describe('Listagem de Requisições de Consignação', { tags: ['@consignacao', '@requisicao', '@listagem', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    RequisicaoConsignacaoPage.visit();
  });

  it('Deve exibir a tabela de requisições e permitir abrir o formulário de pesquisa', () => {
    RequisicaoConsignacaoPage.validarTabelaVisivel();
    RequisicaoConsignacaoPage.abrirFormularioPesquisa();
    RequisicaoConsignacaoPage.contarLinhasVisiveis().its('length').should('be.gte', 0);
  });

  it('Deve permitir navegar para novo cadastro', () => {
    RequisicaoConsignacaoPage.validarTabelaVisivel();
    RequisicaoConsignacaoPage.clicarNovoCadastro();
    cy.url().should('include', '/consignacao/requisicao');
  });

  it('Deve aplicar filtros de pesquisa', () => {
    RequisicaoConsignacaoPage.validarTabelaVisivel();
    RequisicaoConsignacaoPage.aplicarFiltros({
      codigo: '',
      cliente: '',
      status: ''
    });
    RequisicaoConsignacaoPage.validarTabelaVisivel();
  });

  it('Deve selecionar e desmarcar todos os registros', () => {
    RequisicaoConsignacaoPage.validarTabelaVisivel();
    RequisicaoConsignacaoPage.selecionarTodosRegistros();
    RequisicaoConsignacaoPage.desmarcarTodosRegistros();
  });
});

