import Locators from '../../../support/locators/Produto/PesquisaPrecoLocators';
import MenulateralVendaPage from '../menulateral/menulateralvendapage';

/**
 * Page Object para Pesquisa Preço
 * ADR-0002: Page Object Pattern
 * ADR-0003: Locators centralizados
 */
class PesquisaPrecoPage {
  /**
   * Acessa a tela de Pesquisa Preço via menu
   */
  static acessarViaMenu() {
    MenulateralVendaPage.acessarPesquisaPreco();
  }

  /**
   * Valida acesso à tela (modal)
   */
  static validarAcesso() {
    // Modal deve estar visível
    cy.get(Locators.modal).should('be.visible');
    cy.contains(Locators.tituloModal, 'Pesquise o preço do item').should('be.visible');
    cy.contains(Locators.tituloProdutos, 'Produtos').should('be.visible');
  }

  /**
   * Valida elementos principais da tela
   */
  static validarElementosPrincipais() {
    // Modal deve estar visível
    cy.get(Locators.modal).should('be.visible');

    // Campo de busca
    cy.get(Locators.campoBusca).should('be.visible');
    cy.get(Locators.campoBusca).should('have.attr', 'placeholder');

    // Título
    cy.contains(Locators.tituloProdutos, 'Produtos').should('be.visible');

    // Tabela (pode estar parcialmente visível no modal)
    cy.get(Locators.tabela).should('exist');
    cy.get(Locators.linhasTabela).should('have.length.greaterThan', 0);

    // Botão Voltar
    cy.get(Locators.botaoVoltar).should('be.visible');
  }

  /**
   * Preenche o campo de busca
   * @param {string} termo - Termo de busca (código, referência, código de barras ou descrição)
   */
  static preencherBusca(termo) {
    cy.get(Locators.campoBusca).should('be.visible').clear().type(termo);
    // Aguarda resultados (debounce)
    cy.wait(500);
  }

  /**
   * Valida resultados da busca
   * @param {string} termo - Termo buscado
   */
  static validarResultados(termo) {
    cy.get(Locators.linhasTabela).should('have.length.greaterThan', 0);
    // Valida que pelo menos uma linha contém o termo buscado
    cy.get(Locators.linhasTabela).first().should('contain.text', termo);
  }

  /**
   * Seleciona primeira linha da tabela
   */
  static selecionarPrimeiraLinha() {
    cy.get(Locators.primeiraLinha).click();
  }

  /**
   * Valida seção de detalhes
   */
  static validarSecaoDetalhes() {
    cy.contains(Locators.secaoDetalhes, 'Detalhes').should('be.visible');
    cy.get(Locators.preco).should('be.visible');
    // Preço Promoção pode estar vazio, então validamos apenas se existe
    cy.get(Locators.precoPromocao).should('exist');
  }

  /**
   * Clica no botão Voltar
   */
  static clicarVoltar() {
    cy.get(Locators.botaoVoltar).click();
  }
}

export default PesquisaPrecoPage;

