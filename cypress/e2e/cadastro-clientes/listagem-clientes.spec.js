import ListagemClientePage from '../../support/pages/Cliente/listagemclientepage';
import ListagemClienteLocators from '../../support/locators/Cliente/ListagemClienteLocators';

describe('Listagem de clientes', { tags: ['@listagem-clientes', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    ListagemClientePage.acessarTelaListagem();
  });

  it('exibe a listagem e permite abrir o formulario de filtros', () => {
    ListagemClientePage.validarTabelaCarregada();
    ListagemClientePage.validarPaginacaoAtual('1');
    ListagemClientePage.abrirFormularioPesquisa();
    cy.get(ListagemClienteLocators.formPesquisa).should('be.visible');
  });

  it('aplica filtro por nome e limpa o campo apos a pesquisa', () => {
    const nomeCliente = 'Ayrton Senna';
    ListagemClientePage.pesquisarPorNome(nomeCliente);
    ListagemClientePage.validarResultadoPorNome(nomeCliente);

    ListagemClientePage.limparFiltroNome();
    cy.get(ListagemClienteLocators.inputNome).should('have.value', '');
  });

  it('seleciona e limpa todos os checkboxes da tabela', () => {
    ListagemClientePage.selecionarTodosClientes();
    ListagemClientePage.desmarcarTodosClientes();
  });

  it('alerta quando tentar excluir sem selecionar registros', () => {
    ListagemClientePage.tentarExcluirSemSelecao();
  });

  it('abre o modal de exclusao ao selecionar registros e cancela a acao', () => {
    ListagemClientePage.selecionarPrimeiroCliente();
    ListagemClientePage.abrirModalExcluirSelecionados();
    ListagemClientePage.cancelarModalExclusao();
  });
});
