import ListagemVendasPage from '../../support/pages/Venda/ListagemVendasPage';
import ListagemVendasLocators from '../../support/locators/Venda/ListagemVendasLocators';

describe('Listagem de vendas', { tags: ['@vendas', '@listagem-vendas', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
    ListagemVendasPage.acessarTelaListagem();
  });

  it('exibe a tabela principal e permite abrir o painel de filtros', () => {
    ListagemVendasPage.validarTabelaCarregada();
    ListagemVendasPage.validarPaginacaoAtual('1');
    ListagemVendasPage.abrirFormularioPesquisa();
    cy.get(ListagemVendasLocators.inputPeriodo).should('be.visible');
  });

  it('filtra por codigo e situacao e aguarda o retorno da listagem', () => {
    ListagemVendasPage.capturarPrimeiroCodigoDaTabela().then((codigo) => {
      if (!codigo) {
        cy.log('Nenhuma venda disponivel para testar o filtro por codigo.');
        return;
      }

      ListagemVendasPage.preencherFiltroCodigo(codigo);
      ListagemVendasPage.selecionarSituacao('FATURADA');

      ListagemVendasPage.submeterPesquisa()
        .its('request.url')
        .then((url) => {
          expect(url).to.contain(`id=${codigo}`);
          expect(url).to.contain('situacao=FATURADA');
        });

      ListagemVendasPage.validarCodigoVisivelNaTabela(codigo);
    });
  });

  it('mantem o periodo informado na requisicao da pesquisa', () => {
    const periodo = '01/11/2025 - 14/11/2025';
    const periodoParam = encodeURIComponent(periodo).replace(/%20/g, '+');

    ListagemVendasPage.preencherPeriodo(periodo);
    ListagemVendasPage.submeterPesquisa()
      .its('request.url')
      .should('contain', `periodo=${periodoParam}`);
  });

  it('seleciona e desmarca todos os registros da listagem', () => {
    ListagemVendasPage.selecionarTodosRegistros();
    ListagemVendasPage.desmarcarTodosRegistros();
  });

  it('valida os fluxos de exclusao em massa', () => {
    ListagemVendasPage.tentarExcluirSemSelecao();
    ListagemVendasPage.selecionarVendasNaoFaturadas(2)
      .then((quantidadeSelecionada) => {
        if (!quantidadeSelecionada) {
          cy.log('Nenhuma venda NAO FATURADA disponivel para testar o modal de exclusao.');
          return;
        }

        ListagemVendasPage.abrirModalExcluirSelecionados();
        ListagemVendasPage.confirmarExclusaoPodeExcluir();
      });
  });

  it('abre o dropdown de acoes e exibe a opcao de clonar venda', () => {
    ListagemVendasPage.abrirDropdownPrimeiraLinha().then((abriu) => {
      if (!abriu) {
        cy.log('Nenhuma venda disponivel para validar o dropdown de acoes.');
        return;
      }

      ListagemVendasPage.validarOpcaoClonarVisivel();
    });

    cy.get('body').click(0, 0);
  });
});
