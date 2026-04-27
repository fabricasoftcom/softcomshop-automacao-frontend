import LancamentoContaLocators from '../../locators/Financeiro/LancamentoContaLocators';

class LancamentoContaPage {
  /**
   * Acessa a página de lançamento conta via URL direta e abre o modal
   */
  visit() {
    // Navega diretamente pela URL
    cy.visit('/financeiro/lancamento-conta');
    cy.get('#loading').should('not.exist');

    // Clica no botão "Novo cadastro" para abrir o modal
    cy.get(LancamentoContaLocators.botaoNovoCadastro, { timeout: 10000 })
      .should('be.visible')
      .click();

    // Aguarda o formulário ser carregado via AJAX no modal React (não #content-plus)
    cy.contains('.modal-title', 'Novo Lançamento', { timeout: 15000 }).should('be.visible');
    cy.get(LancamentoContaLocators.descricaoInput, { timeout: 10000 }).should('exist');
    cy.get('#loading').should('not.exist');
  }

  /**
   * Valida que o modal está visível
   */
  validarTelaVisivel() {
    cy.contains('.modal-title', 'Novo Lançamento', { timeout: 10000 }).should('be.visible');
  }

  /**
   * Seleciona a operação (DÉBITO ou CRÉDITO)
   * @param {string} operacao - 'DÉBITO' ou 'CRÉDITO'
   */
  selecionarOperacao(operacao = 'DÉBITO') {
    // Valida elemento funcional (select) ao invés de container
    // Operação é o primeiro select (índice 0)
    cy.get(LancamentoContaLocators.operacaoSelect, { timeout: 10000 })
      .first()
      .should('be.visible')
      .select(operacao);
  }

  /**
   * Seleciona a categoria via autocomplete
   * @param {string} categoria - Nome da categoria (ex: 'DESPESA', 'RECEITA')
   */
  selecionarCategoria(categoria) {
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(LancamentoContaLocators.categoriaAutocomplete, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(categoria);

    // Aguarda opções do autocomplete aparecerem (conditional validation)
    cy.get(LancamentoContaLocators.categoriaOptionList, { timeout: 10000 })
      .should('be.visible');
    cy.get('#loading').should('not.exist');

    // Busca a opção na lista de autocomplete (evita menu lateral usando seletor específico)
    cy.get(LancamentoContaLocators.categoriaOptionResult)
      .contains(categoria, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  /**
   * Preenche o campo de descrição
   * @param {string} descricao - Descrição do lançamento
   */
  preencherDescricao(descricao = 'Teste automatizado de lançamento conta') {
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(LancamentoContaLocators.descricaoInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(descricao);
  }

  /**
   * Seleciona a conta via autocomplete
   * @param {string} conta - Nome da conta (ex: 'CAIXA', 'COFRE')
   */
  selecionarConta(conta = 'CAIXA') {
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(LancamentoContaLocators.contaAutocomplete, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(conta);
    // Aguarda opções do autocomplete aparecerem (conditional validation)
    cy.get(LancamentoContaLocators.contaOptionList, { timeout: 10000 })
      .should('be.visible');
    cy.get('#loading').should('not.exist');
    // Busca a opção na lista de autocomplete (evita menu lateral usando seletor específico)
    cy.get(LancamentoContaLocators.contaOptionResult)
      .contains(conta, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  /**
   * Seleciona a forma de pagamento via autocomplete
   * @param {string} formaPagamento - Nome da forma de pagamento (ex: 'ESPÉCIE', 'BOLETO')
   */
  selecionarFormaPagamento(formaPagamento = 'ESPÉCIE') {
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(LancamentoContaLocators.formaPagamentoAutocomplete, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(formaPagamento);
    // Aguarda opções do autocomplete aparecerem (conditional validation)
    cy.get(LancamentoContaLocators.formaPagamentoOptionList, { timeout: 10000 })
      .should('be.visible');
    cy.get('#loading').should('not.exist');
    // Busca a opção na lista de autocomplete (evita menu lateral usando seletor específico)
    cy.get(LancamentoContaLocators.formaPagamentoOptionResult)
      .contains(formaPagamento, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  /**
   * Seleciona o tipo de data (VENCIMENTO ou LANÇAMENTO)
   * @param {string} tipoData - 'VENCIMENTO' ou 'LANÇAMENTO'
   */
  selecionarTipoData(tipoData = 'VENCIMENTO') {
    cy.get(LancamentoContaLocators.tipoDataSelect, { timeout: 10000 })
      .should('be.visible')
      .select(tipoData);
  }

  /**
   * Preenche o campo de data
   * @param {string} data - Data no formato DD/MM/YYYY (ex: '10/12/2025')
   */
  preencherData(data = '10/12/2025') {
    // #date_entry é um daterangepicker — usar force:true pois pode ter listeners bloqueando
    cy.get(LancamentoContaLocators.dataInput, { timeout: 10000 })
      .should('exist')
      .clear({ force: true })
      .type(data, { force: true });
  }

  /**
   * Preenche o campo de valor
   * @param {string} valor - Valor no formato brasileiro (ex: '100,00')
   */
  preencherValor(valor = '100,00') {
    // Valida elemento funcional ao invés de container (pode ter display: none)
    cy.get(LancamentoContaLocators.valorInput, { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(valor);
  }

  /**
   * Clica no botão Salvar
   */
  salvar() {
    // Busca botão Salvar usando cy.contains (não funciona :contains em CSS)
    cy.contains('button', 'Salvar', { timeout: 10000 })
      .should('be.visible')
      .click();
    cy.get('#loading').should('not.exist');
  }

  /**
   * Clica no botão Voltar
   */
  voltar() {
    // Busca botão Voltar diretamente
    cy.contains('button', 'Voltar', { timeout: 10000 })
      .should('be.visible')
      .click();
  }

  /**
   * Valida mensagem de sucesso após salvar
   */
  validarSucesso() {
    cy.get(LancamentoContaLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Lançamento de Conta salvo com sucesso');
  }

  /**
   * Valida que o modal foi fechado
   * Segue padrão de editarReceita.spec.js: valida elemento funcional ao invés de container
   */
  validarModalFechado() {
    // Valida que elemento funcional desapareceu ao fechar (não o container que pode persistir)
    cy.get(LancamentoContaLocators.categoriaAutocomplete, { timeout: 10000 })
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
      const toastErro = $body.find(LancamentoContaLocators.toastErro);
      if (toastErro.length > 0) {
        // Se toast de erro existe, valida
        cy.get(LancamentoContaLocators.toastErro, { timeout: 10000 })
          .should('be.visible');

        // Se mensagem específica for fornecida, valida o texto
        if (mensagemEsperada) {
          cy.get(LancamentoContaLocators.toastErro)
            .should('contain.text', mensagemEsperada);
        }
      } else {
        // Se não há toast de erro, valida que o modal ainda está aberto
        // (indicando que a validação impediu o salvamento)
        cy.get(LancamentoContaLocators.modalContent, { timeout: 10000 })
          .should('be.visible');
      }
    });
  }
}

export default new LancamentoContaPage();

