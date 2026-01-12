import SpedIcmsAjusteLocators from "../../locators/Sped/SpedIcmsAjusteLocators";
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";

class SpedIcmsAjustePage {
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedIcmsAjuste();
  }

  validarTituloListagem() {
    cy.get(SpedIcmsAjusteLocators.tituloListagem).should('be.visible');
  }

  clicarNovoCadastro() {
    cy.get(SpedIcmsAjusteLocators.btnNovoCadastro).first().click();
  }

  validarUrlListagem() {
    cy.url().should('include', '/sped/e111-ajuste-apuracao');
    cy.url().should('not.include', '/novo');
  }

  validarUrlCadastro() {
    cy.url().should('include', '/sped/e111-ajuste-apuracao/novo');
  }

  validarTituloCadastro() {
    cy.get(SpedIcmsAjusteLocators.tituloCadastro).should('be.visible');
  }

  preencherFormulario(dados) {
    if (dados.tipoAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoTipoAjuste).select(dados.tipoAjuste);
    }
    if (dados.dataReferencia) {
      cy.get(SpedIcmsAjusteLocators.campoDataReferencia).clear().type(dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoValorAjuste).clear().type(dados.valorAjuste);
    }
    if (dados.codigoAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoCodigoAjuste).clear().type(dados.codigoAjuste);
      // Aguardar um pouco para o autocomplete processar
      cy.wait(1000);
      // Tentar selecionar a primeira opção se existir
      cy.get('body').then(($body) => {
        if ($body.find('.typeahead-container .typeahead-suggestion').length > 0) {
          cy.get('.typeahead-container .typeahead-suggestion:first-child').click();
        } else {
          // Se não houver sugestões, apenas pressionar Enter para confirmar
          cy.get(SpedIcmsAjusteLocators.campoCodigoAjuste).type('{enter}');
        }
      });
    }
    if (dados.mesReferencia) {
      cy.get(SpedIcmsAjusteLocators.campoMesReferencia).select(dados.mesReferencia);
    }
    if (dados.descricaoAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoDescricaoAjuste).clear().type(dados.descricaoAjuste);
    }
  }

  validarCamposPreenchidos(dados) {
    if (dados.tipoAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoTipoAjuste).should('have.value', dados.tipoAjuste);
    }
    if (dados.dataReferencia) {
      cy.get(SpedIcmsAjusteLocators.campoDataReferencia).should('have.value', dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoValorAjuste).should('have.value', dados.valorAjuste);
    }
    if (dados.mesReferencia) {
      cy.get(SpedIcmsAjusteLocators.campoMesReferencia).should('have.value', dados.mesReferencia);
    }
    if (dados.descricaoAjuste) {
      cy.get(SpedIcmsAjusteLocators.campoDescricaoAjuste).should('have.value', dados.descricaoAjuste);
    }
    return this;
  }

  clicarSalvar() {
    cy.get(SpedIcmsAjusteLocators.btnSalvar).click();
    // Após salvar, a página deve redirecionar para a listagem
    cy.wait(2000); // Aguardar redirecionamento
    this.validarUrlListagem();
  }

  clicarVoltar() {
    cy.get(SpedIcmsAjusteLocators.btnVoltar).click();
  }

  validarMensagemSucesso() {
    cy.get('#toast-container').should('be.visible').contains('Sucesso');
  }
}

export default new SpedIcmsAjustePage();

