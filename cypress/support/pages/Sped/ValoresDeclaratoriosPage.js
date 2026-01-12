// ValoresDeclaratoriosPage.js
import ValoresDeclaratoriosLocators from "../../locators/Sped/ValoresDeclaratoriosLocators";
import MenulateralFiscalPage from "../menulateral/MenulateralFiscalPage";

class ValoresDeclaratoriosPage {
  acessarViaMenu() {
    MenulateralFiscalPage.acessarSpedValoresDeclaratorios();
  }

  validarTituloListagem() {
    cy.get(ValoresDeclaratoriosLocators.tituloListagem).should('be.visible');
  }

  clicarNovoCadastro() {
    cy.contains('a', 'Novo Cadastro').click();
  }

  validarUrlListagem() {
    cy.url().should('include', '/sped/valores-declaratorios');
    cy.url().should('not.include', '/novo');
  }

  validarUrlCadastro() {
    cy.url().should('include', '/sped/valores-declaratorios/novo');
  }

  validarTituloCadastro() {
    cy.get(ValoresDeclaratoriosLocators.tituloCadastro).should('be.visible');
  }

  preencherFormulario(dados) {
    if (dados.dataReferencia) {
      cy.get(ValoresDeclaratoriosLocators.campoDataReferencia).clear().type(dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(ValoresDeclaratoriosLocators.campoValorAjuste).clear().type(dados.valorAjuste);
    }
    if (dados.codigoAjuste) {
      cy.get(ValoresDeclaratoriosLocators.campoCodigoAjuste).clear().type(dados.codigoAjuste);
      // Aguardar um pouco para o autocomplete processar
      cy.wait(1000);
      // Tentar selecionar a primeira opção se existir, senão apenas digitar
      cy.get('body').then(($body) => {
        if ($body.find('.typeahead-container .typeahead-suggestion').length > 0) {
          cy.get('.typeahead-container .typeahead-suggestion:first-child').click();
        } else {
          // Se não houver sugestões, apenas pressionar Enter para confirmar
          cy.get(ValoresDeclaratoriosLocators.campoCodigoAjuste).type('{enter}');
        }
      });
    }
    if (dados.descricaoAjuste) {
      // Campo de descrição é opcional, tentar encontrar pelo label
      cy.contains('dt', 'Descrição Ajuste').parent('dl').find('input').clear().type(dados.descricaoAjuste);
    }
  }

  validarCamposPreenchidos(dados) {
    if (dados.dataReferencia) {
      cy.get(ValoresDeclaratoriosLocators.campoDataReferencia).should('have.value', dados.dataReferencia);
    }
    if (dados.valorAjuste) {
      cy.get(ValoresDeclaratoriosLocators.campoValorAjuste).should('have.value', dados.valorAjuste);
    }
    return this;
  }

  clicarSalvar() {
    cy.contains('button', 'Salvar').click();
    // Após salvar, a página deve redirecionar para a listagem
    cy.wait(2000); // Aguardar redirecionamento
    this.validarUrlListagem();
  }

  clicarVoltar() {
    cy.get(ValoresDeclaratoriosLocators.btnVoltar).click();
  }

  validarMensagemSucesso() {
    cy.get('#toast-container').should('be.visible').contains('Sucesso');
  }
}

export default new ValoresDeclaratoriosPage();

