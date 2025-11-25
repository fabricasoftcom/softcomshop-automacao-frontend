import CadastroProducaoPage from '../../support/pages/Producao/CadastroProducaoPage';
import ProducaoPage from '../../support/pages/Producao/ProducaoPage';

describe('Cadastro de Produção', { tags: ['@producao', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit('/');
  });

  it('deve finalizar uma produção com modo de preparo preenchido', () => {
    CadastroProducaoPage.visit();
    const itemInicial = {
      produto: 'Produto',
      quantidade: '5',
      observacao: 'Item de teste',
    };

    CadastroProducaoPage
      .adicionarItem(itemInicial)
      .validarPaginaEdicao()
      .validarTabelaItensVisivel()
      .adicionarProdutoNaTabela('Produto', '2.00', '10.00')
      .preencherModoPreparo('Modo de preparo teste')
      .salvarModoPreparo()
      .salvarProducao()
      .finalizarProducao();
  });

  it('deve localizar produção finalizada na listagem, abrir edição e reverter produção', () => {
    ProducaoPage.visit();
    ProducaoPage.validarTabelaVisivel();
    ProducaoPage.abrirPrimeiraProducaoFinalizada();
    CadastroProducaoPage.reverterProducao();
  });
});
