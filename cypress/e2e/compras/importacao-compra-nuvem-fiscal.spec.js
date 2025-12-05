import MenulateralProdutoPage from '../../support/pages/menulateral/MenulateralProdutoPage';
import NuvemFiscalListagemPage from '../../support/pages/NuvemFiscal/NuvemFiscalListagemPage';
import NuvemFiscalImportacaoPage from '../../support/pages/NuvemFiscal/NuvemFiscalImportacaoPage';

describe('Importação de Compra pela Nuvem Fiscal', { tags: ['@compras', '@regressivo', '@nuvem-fiscal'] }, () => {
  beforeEach(() => {
    // Ignora erros JavaScript específicos da aplicação que não afetam o teste
    cy.on('uncaught:exception', (err) => {
      // Ignora erros relacionados a .value is not a function que podem ocorrer na página
      if (err.message.includes('value is not a function') ||
          err.message.includes('$(...).value')) {
        return false; // Previne o Cypress de falhar o teste
      }
      // Para outros erros, permite que o Cypress processe normalmente
      return true;
    });
    cy.loginArmazenandoSessao();
    cy.visit('/');
    MenulateralProdutoPage.acessarListagemNuvemFiscal();
  });

  it('Deve importar compra pela Nuvem Fiscal filtrando por Ciência da Operação', () => {
    // Filtra por Ciência da Operação
    NuvemFiscalListagemPage.filtrarPorCienciaOperacao();

    // Verifica que há resultados na tabela
    NuvemFiscalListagemPage.obterLinhasVisiveis()
      .should('have.length.greaterThan', 0);

    // Clica para importar o primeiro item
    NuvemFiscalListagemPage.clicarImportarPrimeiraLinha();

    // Realiza a importação (validação de sucesso é feita dentro do método)
    NuvemFiscalImportacaoPage.importarCompra();
  });
});

