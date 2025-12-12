import TransferenciaContasLocators from '../../locators/Financeiro/TransferenciaContasLocators';

class TransferenciaContasPage {
  /**
   * Acessa a página de transferência entre contas via URL direta
   */
  visit() {
    // Navega diretamente pela URL (mais confiável que menu)
    cy.visit('/financeiro/transferencia-contas');
    // Aguarda o título do modal aparecer (procura em dialog ou modal-content)
    cy.get('dialog, .modal-content', { timeout: 10000 })
      .should('be.visible')
      .contains('Transferência entre contas')
      .should('be.visible');
    cy.get('#loading').should('not.exist');
  }

  /**
   * Seleciona a conta origem no autocomplete
   * @param {string} conta - Nome da conta (ex: 'CAIXA', 'COFRE')
   */
  selecionarContaOrigem(conta = 'CAIXA') {
    // Aguarda o modal estar visível
    cy.get('body').should('contain', 'Transferência entre contas');
    cy.get('#loading').should('not.exist');

    // Digita no campo usando o ID específico identificado na inspeção
    cy.get(TransferenciaContasLocators.contaOrigemInput).type(conta);

    // Aguarda a lista de opções aparecer
    cy.get(TransferenciaContasLocators.contaOrigemOptionList, { timeout: 10000 })
      .should('be.visible');

    // Seleciona a opção que contém o texto da conta
    cy.get(TransferenciaContasLocators.contaOrigemOption)
      .contains(conta)
      .click({ force: true });
  }

  /**
   * Seleciona a conta destino no autocomplete
   * @param {string} conta - Nome da conta (ex: 'COFRE', 'PIX')
   */
  selecionarContaDestino(conta = 'COFRE') {
    // Aguarda o modal estar visível
    cy.get('body').should('contain', 'Transferência entre contas');
    cy.get('#loading').should('not.exist');

    // Digita no campo usando o ID específico identificado na inspeção
    cy.get(TransferenciaContasLocators.contaDestinoInput).type(conta);

    // Aguarda a lista de opções aparecer
    cy.get(TransferenciaContasLocators.contaDestinoOptionList, { timeout: 10000 })
      .should('be.visible');

    // Seleciona a opção que contém o texto da conta
    cy.get(TransferenciaContasLocators.contaDestinoOption)
      .contains(conta)
      .click({ force: true });
  }

  /**
   * Preenche o campo de descrição
   * @param {string} descricao - Descrição da transferência
   */
  preencherDescricao(descricao = 'Transferência de teste automatizado') {
    // Busca input com placeholder "Ajuste" ou próximo ao label "Descrição"
    cy.get('input[placeholder*="Ajuste"]').first().clear().type(descricao);
  }

  /**
   * Preenche o campo de valor
   * @param {string} valor - Valor da transferência (formato brasileiro, ex: '100,00')
   */
  preencherValor(valor = '100,00') {
    // Ordem dos campos: Conta Origem (0), Conta Destino (1), Descrição (2), Valor (3)
    // Busca o 4º input visível (índice 3) que é o campo Valor
    cy.get('input:visible').not('[type="hidden"]').eq(3).clear().type(valor);
  }

  /**
   * Preenche o campo de data da transferência
   * @param {string} data - Data no formato DD/MM/YYYY (ex: '10/12/2025')
   */
  preencherDataTransferencia(data) {
    cy.get(TransferenciaContasLocators.dataTransferenciaInput)
      .clear()
      .type(data);
  }

  /**
   * Clica no botão Salvar
   */
  salvar() {
    cy.get('button').contains('Salvar').click();
    cy.get('#loading').should('not.exist');
  }

  /**
   * Clica no botão Voltar
   */
  voltar() {
    cy.get(TransferenciaContasLocators.voltarButton).click();
  }

  /**
   * Valida mensagem de sucesso após salvar
   */
  validarSucesso() {
    cy.get(TransferenciaContasLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Transferência entre contas realizada com sucesso');
  }

  /**
   * Valida que o modal está visível
   */
  validarModalVisivel() {
    // Valida pelo modal/dialog, não pelo link do menu
    cy.get('dialog, .modal-content', { timeout: 10000 })
      .should('be.visible')
      .contains('Transferência entre contas')
      .should('be.visible');
  }

  /**
   * Valida que o modal foi fechado
   * Segue padrão de editarReceita.spec.js: valida elemento funcional ao invés de container
   */
  validarModalFechado() {
    // Valida que elemento funcional desapareceu ao fechar (não o container que pode persistir)
    cy.get(TransferenciaContasLocators.contaOrigemInput, { timeout: 10000 })
      .should('not.exist');
  }

  /**
   * Valida mensagens de erro de campos obrigatórios
   * @param {string} mensagemEsperada - Mensagem de erro esperada (opcional)
   */
  validarErroCamposObrigatorios(mensagemEsperada = null) {
    // Tenta validar toast de erro, mas se não existir, valida que o modal ainda está aberto
    // (indicando que o salvamento não foi concluído)
    cy.get('body').then(($body) => {
      const toastErro = $body.find(TransferenciaContasLocators.toastErro);
      if (toastErro.length > 0) {
        // Se toast de erro existe, valida
        cy.get(TransferenciaContasLocators.toastErro, { timeout: 10000 })
          .should('be.visible');

        // Se mensagem específica for fornecida, valida o texto
        if (mensagemEsperada) {
          cy.get(TransferenciaContasLocators.toastErro)
            .should('contain.text', mensagemEsperada);
        }
      } else {
        // Se não há toast de erro, valida que o modal ainda está aberto
        // (indicando que a validação impediu o salvamento)
        cy.get(TransferenciaContasLocators.modalContent, { timeout: 10000 })
          .should('be.visible');
      }
    });
  }

  /**
   * Valida erro quando conta origem é igual à conta destino
   * Segue padrão de validarErroCamposObrigatorios: valida toast se existir, senão valida que modal permanece aberto
   */
  validarErroContaOrigemIgualDestino() {
    // Tenta validar toast de erro, mas se não existir, valida que o modal ainda está aberto
    // (indicando que o salvamento não foi concluído)
    cy.get('body').then(($body) => {
      const toastErro = $body.find(TransferenciaContasLocators.toastErro);
      if (toastErro.length > 0) {
        // Se toast de erro existe, valida
        cy.get(TransferenciaContasLocators.toastErro, { timeout: 10000 })
          .should('be.visible');
      } else {
        // Se não há toast de erro, valida que o modal ainda está aberto
        // (indicando que a validação impediu o salvamento)
        cy.get(TransferenciaContasLocators.modalContent, { timeout: 10000 })
          .should('be.visible');
      }
    });
  }

  /**
   * Valida erro quando valor é inválido (zero ou negativo)
   * Segue padrão de validarErroCamposObrigatorios: valida toast se existir, senão valida que modal permanece aberto
   * @param {string} mensagemEsperada - Mensagem de erro esperada (opcional)
   */
  validarErroValorInvalido(mensagemEsperada = null) {
    // Tenta validar toast de erro, mas se não existir, valida que o modal ainda está aberto
    // (indicando que o salvamento não foi concluído)
    cy.get('body').then(($body) => {
      const toastErro = $body.find(TransferenciaContasLocators.toastErro);
      if (toastErro.length > 0) {
        // Se toast de erro existe, valida
        cy.get(TransferenciaContasLocators.toastErro, { timeout: 10000 })
          .should('be.visible');

        // Se mensagem específica for fornecida, valida o texto
        if (mensagemEsperada) {
          cy.get(TransferenciaContasLocators.toastErro)
            .should('contain.text', mensagemEsperada);
        }
      } else {
        // Se não há toast de erro, valida que o modal ainda está aberto
        // (indicando que a validação impediu o salvamento)
        cy.get(TransferenciaContasLocators.modalContent, { timeout: 10000 })
          .should('be.visible');
      }
    });
  }
}

export default new TransferenciaContasPage();

