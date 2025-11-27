import CadastroNfeDevolucaoBasePage from './CadastroNfeDevolucaoBasePage';
import CadastroNfeLocators from '../../../../locators/Venda/CadastroNfeLocators';

class CadastroNfeDevolucaoAvulsaPage extends CadastroNfeDevolucaoBasePage {
  avancarParaCadastroDevolucaoAvulsa() {
    this.fecharTutorialSeVisivel();
    cy.get(CadastroNfeLocators.tabsTipoNota.devolucao).click({ force: true });
    cy.get(CadastroNfeLocators.radiosTipoNfe.avulsa).click({ force: true });
    cy.contains('button', /continuar|próximo/i).click({ force: true });
    this.aguardarFormularioPrincipalCarregado();
    cy.get(CadastroNfeLocators.formulario).should('exist');
  }

  validarFormularioDevolucaoAvulsa() {
    const campos = CadastroNfeLocators.camposPrincipais;
    cy.get(campos.finalidade).should('have.value', '4');
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

export default CadastroNfeDevolucaoAvulsaPage;

