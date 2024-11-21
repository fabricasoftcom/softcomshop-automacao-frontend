import contaCorrenteCadastroLocator from '../../locators/ContaCorrenteCadastroLocator';
import contaCadastroPage from './ContaCadastroPage';

class ContaCorrenteCadastroPage {
  visit() {
    contaCadastroPage.visit();
    contaCadastroPage.selecionarTipoConta('Conta Corrente');
  }

  validarPassoAtual(nomePasso) {
    cy.get(contaCorrenteCadastroLocator.stepAtivo).should('contain.text', nomePasso);
  }

  preencherBancoPorNome(nomeBanco) {
    cy.get(contaCorrenteCadastroLocator.bancoAutocomplete).clear().type(nomeBanco);
    cy.get(contaCorrenteCadastroLocator.bancoListaResultados).contains(nomeBanco).click();
  }

  preencherFormulario(dadosConta) {
    const {
      descricao,
      agencia,
      agenciaDV,
      conta,
      contaDV,
      saldoInicial,
      dataSaldo,
      limiteCredito,
      observacao,
    } = dadosConta;

    cy.get(contaCorrenteCadastroLocator.descricao).clear().type(descricao);
    cy.get(contaCorrenteCadastroLocator.agencia).clear().type(agencia);
    cy.get(contaCorrenteCadastroLocator.agenciaDV).clear().type(agenciaDV);
    cy.get(contaCorrenteCadastroLocator.contaCorrente).clear().type(conta);
    cy.get(contaCorrenteCadastroLocator.contaDV).clear().type(contaDV);
    cy.get(contaCorrenteCadastroLocator.saldoInicial).clear().type(saldoInicial);
    cy.get(contaCorrenteCadastroLocator.dataSaldoInicial).clear().type(dataSaldo);
    cy.get(contaCorrenteCadastroLocator.limiteCredito).clear().type(limiteCredito);
    cy.get(contaCorrenteCadastroLocator.observacao).clear().type(observacao);
  }

  alternarContaPadrao(estado = true) {
    cy.get(contaCorrenteCadastroLocator.contaPadraoSwitch).then(($switch) => {
      const isChecked = $switch.hasClass('switchery-on');
      if (estado && !isChecked) cy.wrap($switch).click();
      if (!estado && isChecked) cy.wrap($switch).click();
    });
  }

  alternarCobrancaBancaria(estado = true) {
    cy.get(contaCorrenteCadastroLocator.cobrancaBancariaSwitch).then(($switch) => {
      const isChecked = $switch.hasClass('switchery-on');
      if (estado && !isChecked) cy.wrap($switch).click();
      if (!estado && isChecked) cy.wrap($switch).click();
    });
  }

  avancarParaProximoPasso() {
    cy.get(contaCorrenteCadastroLocator.botaoProximo).click();
  }

  verificarMensagemSucesso() {
    cy.get(contaCorrenteCadastroLocator.mensagemSucesso).should('be.visible');
  }
}

export default new ContaCorrenteCadastroPage();
