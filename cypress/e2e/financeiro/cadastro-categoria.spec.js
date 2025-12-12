import ListagemCategoriasPage from "../../support/pages/Financeiro/ListagemCategoriasPage";
import CadastroCategoriaPage from "../../support/pages/Financeiro/CadastroCategoriaPage";
import CategoriasLocators from "../../support/locators/CategoriasLocators";

describe('Cadastro de Categorias', { tags: ['@cadastro-categoria', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ListagemCategoriasPage.visit();
  });

  it('Deve cadastrar uma nova categoria de receita com descrição apenas', () => {
    const descricao = `Receita Teste Automatizado - ${obterDataHoraAtual()}`;

    ListagemCategoriasPage.abrirModalNovaCategoriaReceita();
    CadastroCategoriaPage.verificarModalVisivel();
    CadastroCategoriaPage.verificarTituloModal('Nova categoria de Receita');

    CadastroCategoriaPage.preencherDescricao(descricao);
    CadastroCategoriaPage.clicarSalvar();

    CadastroCategoriaPage.verificarMensagemSucesso();
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
  });

  it('Deve cadastrar uma nova categoria de despesa com descrição apenas', () => {
    const descricao = `Despesa Teste Automatizado - ${obterDataHoraAtual()}`;

    ListagemCategoriasPage.abrirModalNovaCategoriaDespesa();
    CadastroCategoriaPage.verificarModalVisivel();
    CadastroCategoriaPage.verificarTituloModal('Nova categoria de Despesa');

    CadastroCategoriaPage.preencherDescricao(descricao);
    CadastroCategoriaPage.clicarSalvar();

    CadastroCategoriaPage.verificarMensagemSucesso();
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
  });

  it('Deve cadastrar uma nova categoria de receita com todos os campos', () => {
    const descricao = `Receita Completa Teste - ${obterDataHoraAtual()}`;
    const dados = {
      descricao: descricao,
      mostrarDentroDe: null, // Pode ser preenchido se necessário
      contaDRE: null, // Pode ser preenchido se necessário
      naoExibirDRE: false
    };

    ListagemCategoriasPage.abrirModalNovaCategoriaReceita();
    CadastroCategoriaPage.verificarModalVisivel();

    CadastroCategoriaPage.preencherFormulario(dados);
    CadastroCategoriaPage.clicarSalvar();

    CadastroCategoriaPage.verificarMensagemSucesso();
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
  });

  it('Deve cadastrar uma nova categoria de despesa com checkbox "Não Exibir DRE" marcado', () => {
    const descricao = `Despesa Sem DRE Teste - ${obterDataHoraAtual()}`;
    const dados = {
      descricao: descricao,
      mostrarDentroDe: null,
      contaDRE: null,
      naoExibirDRE: true
    };

    ListagemCategoriasPage.abrirModalNovaCategoriaDespesa();
    CadastroCategoriaPage.verificarModalVisivel();

    CadastroCategoriaPage.preencherFormulario(dados);
    CadastroCategoriaPage.clicarSalvar();

    CadastroCategoriaPage.verificarMensagemSucesso();
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
  });

  it('Deve cancelar o cadastro clicando em Voltar', () => {
    ListagemCategoriasPage.abrirModalNovaCategoriaReceita();
    CadastroCategoriaPage.verificarModalVisivel();

    CadastroCategoriaPage.clicarVoltar();

    // Modal deve ser fechado - verificamos se o campo de descrição não está mais visível
    cy.get(CategoriasLocators.campoDescricao, { timeout: 10000 }).should('not.exist');
    ListagemCategoriasPage.verificarCarregamentoDaPagina();
  });

  // Função auxiliar para obter data e hora formatadas
  function obterDataHoraAtual() {
    const now = new Date();
    const data = now.toLocaleDateString('pt-BR');
    const hora = now.toLocaleTimeString('pt-BR');
    return `${data} ${hora}`;
  }
});

