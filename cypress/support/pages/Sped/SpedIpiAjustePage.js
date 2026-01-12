import SpedIpiAjusteLocators from "../../locators/Sped/SpedIpiAjusteLocators";
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";

class SpedIpiAjustePage {
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedIpiAjuste();
  }

  validarTituloListagem() {
    cy.get(SpedIpiAjusteLocators.tituloListagem).should('be.visible');
  }

  clicarNovoCadastro() {
    cy.get(SpedIpiAjusteLocators.btnNovoCadastro).first().click();
  }

  validarUrlListagem() {
    cy.url().should('include', '/sped/ipi-ajuste-apuracao');
    cy.url().should('not.include', '/novo');
  }

  validarUrlCadastro() {
    cy.url().should('include', '/sped/ipi-ajuste-apuracao/novo');
  }

  validarTituloCadastro() {
    cy.get(SpedIpiAjusteLocators.tituloCadastro).should('be.visible');
  }

  preencherFormulario(dados) {
    if (dados.tipoAjuste) {
      cy.get(SpedIpiAjusteLocators.campoTipoAjuste).select(dados.tipoAjuste);
    }
    if (dados.dataReferencia) {
      cy.get(SpedIpiAjusteLocators.campoDataReferencia).clear().type(dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(SpedIpiAjusteLocators.campoValorAjuste).clear().type(dados.valorAjuste);
    }
    if (dados.codigoAjuste) {
      cy.get(SpedIpiAjusteLocators.campoCodigoAjuste).clear().type(dados.codigoAjuste);
      // Aguardar um pouco para o autocomplete processar
      cy.wait(1000);
      // Tentar selecionar a primeira opção se existir
      cy.get('body').then(($body) => {
        if ($body.find('.typeahead-container .typeahead-suggestion').length > 0) {
          cy.get('.typeahead-container .typeahead-suggestion:first-child').click();
        } else {
          // Se não houver sugestões, apenas pressionar Enter para confirmar
          cy.get(SpedIpiAjusteLocators.campoCodigoAjuste).type('{enter}');
        }
      });
    }
    if (dados.descricaoAjuste) {
      cy.get(SpedIpiAjusteLocators.campoDescricaoAjuste).clear().type(dados.descricaoAjuste);
    }
  }

  validarCamposPreenchidos(dados) {
    if (dados.tipoAjuste) {
      cy.get(SpedIpiAjusteLocators.campoTipoAjuste).should('have.value', dados.tipoAjuste);
    }
    if (dados.dataReferencia) {
      cy.get(SpedIpiAjusteLocators.campoDataReferencia).should('have.value', dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(SpedIpiAjusteLocators.campoValorAjuste).should('have.value', dados.valorAjuste);
    }
    if (dados.descricaoAjuste) {
      cy.get(SpedIpiAjusteLocators.campoDescricaoAjuste).should('have.value', dados.descricaoAjuste);
    }
    return this;
  }

  clicarSalvar() {
    cy.get(SpedIpiAjusteLocators.btnSalvar).click();
    // Após salvar, a página deve redirecionar para a listagem
    cy.wait(2000); // Aguardar redirecionamento
    this.validarUrlListagem();
  }

  clicarVoltar() {
    cy.get(SpedIpiAjusteLocators.btnVoltar).click();
  }

  validarMensagemSucesso() {
    cy.get('#toast-container').should('be.visible').contains('Sucesso');
  }
}

export default new SpedIpiAjustePage();

