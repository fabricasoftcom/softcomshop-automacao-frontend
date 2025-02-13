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

 // Função para verificar se um campo está habilitado (ignora campos desabilitados)
 verificarCampoHabilitado(campoLocator) {
  cy.get(campoLocator).then($input => {
    if ($input.prop('disabled') !== true) {  // Verifica se o campo está habilitado
      cy.wrap($input).should('not.be.disabled');
    } else {
      cy.log(`Campo ${campoLocator} está desabilitado, ignorando.`);
    }
  });
}

// Função para preencher os campos de integração bancária
preencherIntegracaoBancaria(dadosIntegracao) {
  // Lista de campos e suas ações
  const camposParaPreencher = [
    { locator: contaCorrenteCadastroLocator.recipientCode, valor: dadosIntegracao.convênio },
    { locator: contaCorrenteCadastroLocator.lastOurNumber, valor: dadosIntegracao.ultimoNossoNumero },
    { locator: contaCorrenteCadastroLocator.lastDispatch, valor: dadosIntegracao.ultimoNumeroRemessa },
    // { locator: contaCorrenteCadastroLocator.walletCode, valor: dadosIntegracao.modalidadeCarteira, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.companyCode, valor: dadosIntegracao.codigoTransmissao},
    { locator: contaCorrenteCadastroLocator.posto, valor: dadosIntegracao.posto},
    { locator: contaCorrenteCadastroLocator.walletVariation, valor: dadosIntegracao.variacaoCarteira },
    // { locator: contaCorrenteCadastroLocator.interestCode, valor: dadosIntegracao.modalidadeJuros, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.interestAmount, valor: dadosIntegracao.valorJuros },
    // { locator: contaCorrenteCadastroLocator.fineCode, valor: dadosIntegracao.modalidadeMulta, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.fineAmount, valor: dadosIntegracao.valorMulta },
    // { locator: contaCorrenteCadastroLocator.protestCode, valor: dadosIntegracao.modalidadeProtesto, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.protestDays, valor: dadosIntegracao.diasProtesto },
    // { locator: contaCorrenteCadastroLocator.lowCode, valor: dadosIntegracao.modalidadeBaixa, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.lowDays, valor: dadosIntegracao.diasBaixa },
    // { locator: contaCorrenteCadastroLocator.discountCode, valor: dadosIntegracao.modalidadeDesconto, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.discountAmount, valor: dadosIntegracao.valorDesconto },
    // { locator: contaCorrenteCadastroLocator.speciesCode, valor: dadosIntegracao.modalidadeEspecie, tipo: 'select' },
   // { locator: contaCorrenteCadastroLocator.acceptCode, valor: dadosIntegracao.codigoAceite, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.integrationType, valor: dadosIntegracao.tipoIntegracao, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.printLayout, valor: dadosIntegracao.tipoLayout, tipo: 'select' },
    { locator: contaCorrenteCadastroLocator.message1, valor: dadosIntegracao.mensagem1 },
    { locator: contaCorrenteCadastroLocator.message2, valor: dadosIntegracao.mensagem2 },
  ];

  // Preencher os campos habilitados
  camposParaPreencher.forEach(({ locator, valor, tipo }) => {
    cy.get(locator).then(($el) => {
      if (!$el.prop('disabled')) {
        if (tipo === 'select') {
          cy.wrap($el).select(valor);
        } else {
          cy.wrap($el).clear().type(valor);
        }
      } else {
        cy.log(`Campo ${locator} está desabilitado, ignorando.`);
      }
    });
  });

  // Campos específicos para integração API
  if (dadosIntegracao.tipoIntegracao === 'api') {
    const camposApi = [
      { locator: contaCorrenteCadastroLocator.clientId, valor: dadosIntegracao.clientId },
      { locator: contaCorrenteCadastroLocator.clientSecret, valor: dadosIntegracao.clientSecret },
      { locator: contaCorrenteCadastroLocator.typeKeyPix, valor: dadosIntegracao.tipoChavePix, tipo: 'select' },
      { locator: contaCorrenteCadastroLocator.keyPix, valor: dadosIntegracao.chavePix },
    ];

    camposApi.forEach(({ locator, valor, tipo }) => {
      cy.get(locator).then(($el) => {
        if (!$el.prop('disabled')) {
          if (tipo === 'select') {
            cy.wrap($el).select(valor);
          } else {
            cy.wrap($el).clear().type(valor);
          }
        } else {
          cy.log(`Campo ${locator} está desabilitado, ignorando.`);
        }
      });
    });
  }
}

  alternarCobrancaBancaria(estado = true) {
    this.alternarSwitch(contaCorrenteCadastroLocator.cobrancaBancariaSwitch, estado);
  }

  alternarSwitch(switchLocator, estado = true) {
    cy.get(switchLocator).then(($switch) => {
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
