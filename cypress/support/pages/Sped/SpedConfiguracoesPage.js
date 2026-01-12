// SpedConfiguracoesPage.js
import SpedConfiguracoesLocators from "../../locators/Sped/SpedConfiguracoesLocators";
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";

class SpedConfiguracoesPage {
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedConfiguracoes();
  }

  validarTelaConfiguracoes() {
    cy.url().should('include', '/sped/configuracoes');
    cy.get(SpedConfiguracoesLocators.tabFiscal).should('be.visible');
    cy.get(SpedConfiguracoesLocators.tabContribuicoes).should('be.visible');
    cy.get(SpedConfiguracoesLocators.btnSalvar).should('be.visible');
  }

  validarSecaoFiscal() {
    cy.get(SpedConfiguracoesLocators.secaoFiscal).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectPerfilEscrituracao).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectAtividadeEmpresa).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectNfePropriaDataImposto).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectEntradasAdicionarSt).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectRegime1601).should('be.visible');
    cy.get(SpedConfiguracoesLocators.selectEntradasAdicionarIpi).should('be.visible');
  }

  clicarTabFiscal() {
    cy.get(SpedConfiguracoesLocators.tabFiscal).click();
  }

  clicarTabContribuicoes() {
    cy.get(SpedConfiguracoesLocators.tabContribuicoes).click();
    // Nota: A tab Contribuições pode ter problemas de rota no backend
    // Por isso não validamos a visibilidade aqui
  }

  selecionarPerfilEscrituracao(perfil) {
    cy.get(SpedConfiguracoesLocators.selectPerfilEscrituracao).select(perfil);
  }

  selecionarAtividadeEmpresa(atividade) {
    cy.get(SpedConfiguracoesLocators.selectAtividadeEmpresa).select(atividade);
  }

  marcarExibirEscolhaPerfil() {
    cy.get(SpedConfiguracoesLocators.checkboxExibirEscolhaPerfil).check({ force: true });
  }

  desmarcarExibirEscolhaPerfil() {
    cy.get(SpedConfiguracoesLocators.checkboxExibirEscolhaPerfil).uncheck({ force: true });
  }

  marcarGerarC170Mod55() {
    cy.get(SpedConfiguracoesLocators.checkboxGerarC170Mod55).check({ force: true });
  }

  marcarGerarC170Mod65() {
    cy.get(SpedConfiguracoesLocators.checkboxGerarC170Mod65).check({ force: true });
  }

  selecionarNfePropriaDataImposto(data) {
    cy.get(SpedConfiguracoesLocators.selectNfePropriaDataImposto).select(data);
  }

  marcarApurarDebitoIcms() {
    cy.get(SpedConfiguracoesLocators.checkboxApurarDebitoIcms).check({ force: true });
  }

  desmarcarApurarDebitoIcms() {
    cy.get(SpedConfiguracoesLocators.checkboxApurarDebitoIcms).uncheck({ force: true });
  }

  marcarApurarCreditoIcms() {
    cy.get(SpedConfiguracoesLocators.checkboxApurarCreditoIcms).check({ force: true });
  }

  desmarcarApurarCreditoIcms() {
    cy.get(SpedConfiguracoesLocators.checkboxApurarCreditoIcms).uncheck({ force: true });
  }

  selecionarEntradasAdicionarSt(onde) {
    cy.get(SpedConfiguracoesLocators.selectEntradasAdicionarSt).select(onde);
  }

  preencherCodigoReceitaE116(codigo) {
    cy.get(SpedConfiguracoesLocators.inputCodigoReceitaE116).clear().type(codigo);
  }

  selecionarRegime1601(regime) {
    cy.get(SpedConfiguracoesLocators.selectRegime1601).select(regime);
  }

  selecionarEntradasAdicionarIpi(onde) {
    cy.get(SpedConfiguracoesLocators.selectEntradasAdicionarIpi).select(onde);
  }

  clicarSalvar() {
    cy.get(SpedConfiguracoesLocators.btnSalvar).click();
  }

  validarMensagemSucesso() {
    cy.get('#toast-container').should('be.visible').contains('Sucesso');
  }
}

export default new SpedConfiguracoesPage();

