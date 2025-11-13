import menulateralFiscais from "../menulateral/menulateralfiscalpage";
import SpedGerarArquivoLocators from "../../locators/Sped/SpedGerarArquivoLocators";

class GerarArquivoPage {
  acessarViaMenu() {
    menulateralFiscais.acessarSpedGerarArquivo();
  }

  preencherPeriodo(periodo) {
    cy.get(SpedGerarArquivoLocators.periodoInput)
      .clear()
      .type(periodo);
  }

  selecionarTipo(tipo) {
    cy.get(SpedGerarArquivoLocators.tipoSelect).select(tipo);
  }

  garantirAjustesVisiveis() {
    cy.get(SpedGerarArquivoLocators.grupoInventario).then(($grupo) => {
      if ($grupo.css('display') === 'none') {
        cy.get(SpedGerarArquivoLocators.mostrarOcultarAjustes).click({ force: true });
      }
    });
  }

  clicarMostrarOcultarAjustes() {
    cy.get(SpedGerarArquivoLocators.mostrarOcultarAjustes).click({ force: true });
  }

  setToggleState(switchSelector, shouldCheck) {
    cy.get(switchSelector).then(($switch) => {
      const isChecked = $switch.prop('checked');
      if (isChecked !== shouldCheck) {
        cy.wrap($switch).siblings('.switchery').click({ force: true });
      }
    });
  }

  ativarInventarioGerar() {
    this.garantirAjustesVisiveis();
    this.setToggleState(SpedGerarArquivoLocators.switchInventarioGerar, true);
  }

  desativarInventarioGerar() {
    this.garantirAjustesVisiveis();
    this.setToggleState(SpedGerarArquivoLocators.switchInventarioGerar, false);
  }

  ativarInformarValor() {
    this.garantirAjustesVisiveis();
    this.setToggleState(SpedGerarArquivoLocators.switchInformarValor, true);
  }

  desativarInformarValor() {
    this.garantirAjustesVisiveis();
    this.setToggleState(SpedGerarArquivoLocators.switchInformarValor, false);
  }

  selecionarRetificarArquivo(ativar = true) {
    this.garantirAjustesVisiveis();
    this.setToggleState(SpedGerarArquivoLocators.switchRetificarArquivo, ativar);
  }

  preencherValorInventario(valor) {
    cy.get(SpedGerarArquivoLocators.valorInventarioInput)
      .clear()
      .type(valor);
  }

  gerarArquivo() {
    cy.get(SpedGerarArquivoLocators.botaoGerarArquivo).click();
    cy.get(SpedGerarArquivoLocators.form).should('exist');
  }
}

export default new GerarArquivoPage();
