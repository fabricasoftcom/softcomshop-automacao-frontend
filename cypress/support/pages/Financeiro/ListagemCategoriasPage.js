import CategoriasLocators from "../../locators/Financeiro/CategoriasLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";

class ListagemCategoriasPage {
  // Navegação para a página
  visit() {
    MenulateralFinanceiroPage.acessarCategorias();
    this.verificarCarregamentoDaPagina();
  }

  verificarCarregamentoDaPagina() {
    cy.get(CategoriasLocators.tituloPagina).should('be.visible');
  }

  // ---------------------- Ações de Navegação ----------------------

  clicarVoltar() {
    cy.get(CategoriasLocators.botaoVoltar).click();
  }

  // ---------------------- Ações de Nova Categoria ----------------------

  abrirModalNovaCategoriaReceita() {
    cy.get(CategoriasLocators.botaoNovaCategoriaReceita)
      .should('be.visible')
      .click();
    cy.get('#loading').should('not.exist');
    // Aguarda um tempo para o modal começar a renderizar
    cy.wait(1000);
    // Aguarda o campo de descrição aparecer diretamente na página
    cy.get(CategoriasLocators.campoDescricao, { timeout: 15000 })
      .should('exist');
  }

  abrirModalNovaCategoriaDespesa() {
    cy.get(CategoriasLocators.botaoNovaCategoriaDespesa)
      .should('be.visible')
      .click();
    cy.get('#loading').should('not.exist');
    // Aguarda um tempo para o modal começar a renderizar
    cy.wait(1000);
    // Aguarda o campo de descrição aparecer diretamente na página
    cy.get(CategoriasLocators.campoDescricao, { timeout: 15000 })
      .should('exist');
  }

  // ---------------------- Filtros de Receita ----------------------

  filtrarReceitaTodas() {
    cy.get(CategoriasLocators.filtroReceitaTodas).click();
  }

  filtrarReceitaAtivas() {
    cy.get(CategoriasLocators.filtroReceitaAtivas).click();
  }

  filtrarReceitaInativas() {
    cy.get(CategoriasLocators.filtroReceitaInativas).click();
  }

  // ---------------------- Filtros de Despesa ----------------------

  filtrarDespesaTodas() {
    cy.get(CategoriasLocators.filtroDespesaTodas).click();
  }

  filtrarDespesaAtivas() {
    cy.get(CategoriasLocators.filtroDespesaAtivas).click();
  }

  filtrarDespesaInativas() {
    cy.get(CategoriasLocators.filtroDespesaInativas).click();
  }

  // ---------------------- Ações em Massa - Receita ----------------------

  clicarDesativarReceita() {
    cy.get(CategoriasLocators.botaoReceitaDesativar).click();
  }

  clicarAtivarReceita() {
    cy.get(CategoriasLocators.botaoReceitaAtivar).click();
  }

  // ---------------------- Ações em Massa - Despesa ----------------------

  clicarDesativarDespesa() {
    cy.get(CategoriasLocators.botaoDespesaDesativar).click();
  }

  clicarAtivarDespesa() {
    cy.get(CategoriasLocators.botaoDespesaAtivar).click();
  }

  // ---------------------- Validações ----------------------

  verificarSecaoReceitaVisivel() {
    cy.get(CategoriasLocators.secaoReceita).should('be.visible');
  }

  verificarSecaoDespesaVisivel() {
    cy.get(CategoriasLocators.secaoDespesa).should('be.visible');
  }

  verificarBotaoNovaCategoriaReceitaVisivel() {
    cy.get(CategoriasLocators.botaoNovaCategoriaReceita).should('be.visible');
  }

  verificarBotaoNovaCategoriaDespesaVisivel() {
    cy.get(CategoriasLocators.botaoNovaCategoriaDespesa).should('be.visible');
  }
}

export default new ListagemCategoriasPage();

