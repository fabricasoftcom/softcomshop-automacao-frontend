import CadastroNfeNormalBasePage from './CadastroNfeNormalBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeNormalAvulsaPage extends CadastroNfeNormalBasePage {
  avancarParaCadastroNormalAvulsa() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.normal).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).click({ force: true });
    cy.contains('button', /continuar|próximo/i).click({ force: true });
    this.aguardarFormularioPrincipalCarregado();
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  validarFormularioNormalAvulsa() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '1');
    cy.get(campos.serie).should('exist');
    cy.get(campos.naturezaAuto).should('exist');
    cy.get(campos.dataHoraEmissao).should('exist');
    cy.get(campos.dataHoraSaida).should('exist');
    cy.get(campos.indicadorPresencial).should('exist');
    cy.get(campos.movimentarEstoqueSwitch).should('exist');

    cy.get(CadastroNfeLocators.destinatario.painel).should('exist');
    cy.get(CadastroNfeLocators.destinatario.nome).should('exist');
    cy.get(CadastroNfeLocators.destinatario.cpfCnpj).should('exist');
  }
}

export default CadastroNfeNormalAvulsaPage;

