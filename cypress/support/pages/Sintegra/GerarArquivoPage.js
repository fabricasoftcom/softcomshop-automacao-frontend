import menulateralFiscais from "../menulateral/menulateralfiscalpage";
import SintegraGerarArquivoLocators from "../../locators/Sintegra/SintegraGerarArquivoLocators";

class GerarArquivoSintegraPage {
  acessarViaMenu() {
    menulateralFiscais.acessarSintegraGerarArquivo();
  }

  preencherPeriodo(periodo) {
    cy.get(SintegraGerarArquivoLocators.periodoInput)
      .clear()
      .type(periodo);
  }

  preencherDataInventario(data) {
    cy.get(SintegraGerarArquivoLocators.dataInventarioInput)
      .clear()
      .type(data);
  }

  setToggleState(switchSelector, shouldCheck) {
    cy.get(switchSelector).then(($switch) => {
      const isChecked = $switch.prop("checked");
      if (isChecked !== shouldCheck) {
        cy.wrap($switch)
          .siblings(".switchery")
          .click({ force: true });
      }
    });
  }

  ativarInformarValor() {
    this.setToggleState(SintegraGerarArquivoLocators.switchInformarValor, true);
  }

  desativarInformarValor() {
    this.setToggleState(SintegraGerarArquivoLocators.switchInformarValor, false);
  }

  preencherValorInventario(valor) {
    cy.get(SintegraGerarArquivoLocators.valorInventarioInput)
      .clear()
      .type(valor);
  }

  gerarArquivo() {
    cy.get(SintegraGerarArquivoLocators.botaoGerarArquivo).click();
    cy.get(SintegraGerarArquivoLocators.form).should("exist");
  }
}

export default new GerarArquivoSintegraPage();
