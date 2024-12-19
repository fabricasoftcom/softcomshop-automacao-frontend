import contaCadastroLocator from '../../locators/ContaCadastroLocator';
import listagemContasPage from './ListagemContasPage';

class ContaCadastroPage {
  // Método para acessar a página de cadastro a partir da listagem de contas
  visit() {
    listagemContasPage.visit();
    listagemContasPage.clicarNovoCadastro();
    cy.get(contaCadastroLocator.tituloPagina).should('be.visible');
  }

  // Método para selecionar o tipo de conta (reutilizando elementos)
  selecionarTipoConta(tipoConta) {
    switch (tipoConta) {
      case 'Conta Corrente':
        cy.get(contaCadastroLocator.btnContaCorrente).click();
        break;
      case 'Caixinha':
        cy.get(contaCadastroLocator.btnCaixinha).click();
        break;
      case 'Cartão de Crédito':
        cy.get(contaCadastroLocator.btnCartaoCredito).click();
        break;
      case 'Administradora de Cartões':
        cy.get(contaCadastroLocator.btnAdministradoraCartoes).click();
        break;
      case 'Conta Poupança':
        cy.get(contaCadastroLocator.btnContaPoupanca).click();
        break;
      case 'Conta Empréstimo':
        cy.get(contaCadastroLocator.btnContaEmprestimo).click();
        break;
      case 'Softcompay':
        cy.get(contaCadastroLocator.btnSoftcompay).click();
        break;
      case 'Carteira Virtual':
        cy.get(contaCadastroLocator.btnCarteiraVirtual).click();
        break;
      case 'Crediário Carne':
        cy.get(contaCadastroLocator.btnCrediarioCarne).click();
        break;
      default:
        throw new Error(`Tipo de conta "${tipoConta}" não reconhecido.`);
    }
  }

  // Método para voltar à listagem
  voltarParaListagem() {
    cy.get(contaCadastroLocator.btnVoltar).click();
  }
}

export default new ContaCadastroPage();
