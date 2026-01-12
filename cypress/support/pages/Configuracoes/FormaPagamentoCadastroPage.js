import FormaPagamentoListagemPage from './FormaPagamentoListagemPage';
import FormaPagamentoCadastroLocators from '../../locators/Configuracoes/FormaPagamentoCadastroLocators';

class FormaPagamentoCadastroPage {
  /**
   * Acessa o formulário de cadastro de nova forma de pagamento
   */
  visit() {
    FormaPagamentoListagemPage.acessarTelaListagem();
    FormaPagamentoListagemPage.clicarBotaoNovo();
    this.aguardarModalVisivel();
  }

  /**
   * Aguarda o modal de cadastro ficar visível
   */
  aguardarModalVisivel() {
    cy.get(FormaPagamentoCadastroLocators.modal, { timeout: 10000 }).should('be.visible');
    cy.get(FormaPagamentoCadastroLocators.campoDescricao, { timeout: 5000 }).should('be.visible');
  }

  /**
   * Verifica o layout básico do formulário
   */
  verificarLayoutBasico() {
    cy.get(FormaPagamentoCadastroLocators.modal).should('be.visible');
    cy.get(FormaPagamentoCadastroLocators.btnFechar).should('be.visible');
    cy.get(FormaPagamentoCadastroLocators.btnSalvar).should('be.visible');
    cy.get(FormaPagamentoCadastroLocators.campoDescricao).should('be.visible');
    cy.get(FormaPagamentoCadastroLocators.campoTipo).should('be.visible');
  }

  /**
   * Preenche o campo Descrição
   * @param {string} descricao - Descrição da forma de pagamento
   */
  preencherDescricao(descricao) {
    cy.get(FormaPagamentoCadastroLocators.campoDescricao).clear().type(descricao);
  }

  /**
   * Seleciona o Tipo
   * @param {string} tipo - Tipo da forma de pagamento (ESPECIE, DUPLICATA, CARTAO, BOLETO, CHEQUE)
   */
  selecionarTipo(tipo) {
    cy.get(FormaPagamentoCadastroLocators.campoTipo).select(tipo);
  }

  /**
   * Preenche o campo Atalho Número
   * @param {number} numero - Número do atalho
   */
  preencherAtalhoNumero(numero) {
    cy.get(FormaPagamentoCadastroLocators.campoAtalhoNumero).clear().type(numero.toString());
  }

  /**
   * Preenche o campo Código da Forma Pagamento
   * @param {string} codigo - Código da forma de pagamento
   */
  preencherCodigoFormaPagamento(codigo) {
    // cy.get(FormaPagamentoCadastroLocators.campoCodigoFormaPagamento).clear().type(codigo);
    cy.get(FormaPagamentoCadastroLocators.campoCodigoFormaPagamento).type(codigo, { delay: 0, force: true });
    cy.get(`.typeahead-list`, { timeout: 10000 })
      .should('exist')
      .should('be.visible')
      .first()
      .click();
  }

  /**
   * Preenche o campo Adquirente
   * @param {string} adquirente - Nome do adquirente
   */
  preencherAdquirente(adquirente) {
    cy.get(FormaPagamentoCadastroLocators.campoAdquirente).then(($input) => {
      if ($input.is(':disabled')) {
        cy.log('Campo Adquirente está desabilitado, pulando preenchimento');
        return;
      }
      cy.wrap($input).clear().type(adquirente);
    });
  }

  /**
   * Marca/desmarca checkbox POS (usando switcher visível)
   * @param {boolean} marcar - true para marcar, false para desmarcar
   */
  marcarPos(marcar = true) {
    cy.get(FormaPagamentoCadastroLocators.togglePos, { timeout: 5000 }).should('be.visible').then(($toggle) => {
      const isChecked = $toggle.hasClass('switchery-on');
      if ((marcar && !isChecked) || (!marcar && isChecked)) {
        cy.wrap($toggle).click();
      }
    });
  }

  /**
   * Marca/desmarca checkbox Integrar API (usando switcher visível)
   * @param {boolean} marcar - true para marcar, false para desmarcar
   */
  marcarIntegrarApi(marcar = true) {
    cy.get(FormaPagamentoCadastroLocators.toggleIntegrarApi, { timeout: 5000 }).should('be.visible').then(($toggle) => {
      const isChecked = $toggle.hasClass('switchery-on');
      if ((marcar && !isChecked) || (!marcar && isChecked)) {
        cy.wrap($toggle).click();
      }
    });
  }

  /**
   * Marca/desmarca checkbox Exibir Pagamento (usando switcher visível)
   * @param {boolean} marcar - true para marcar, false para desmarcar
   */
  marcarExibirPagamento(marcar = true) {
    cy.get(FormaPagamentoCadastroLocators.toggleExibirPagamento, { timeout: 5000 }).should('be.visible').then(($toggle) => {
      const isChecked = $toggle.hasClass('switchery-on');
      if ((marcar && !isChecked) || (!marcar && isChecked)) {
        cy.wrap($toggle).click();
      }
    });
  }

  /**
   * Marca/desmarca checkbox Pré Venda (usando switcher visível)
   * @param {boolean} marcar - true para marcar, false para desmarcar
   */
  marcarPreVenda(marcar = true) {
    cy.get(FormaPagamentoCadastroLocators.togglePreVenda, { timeout: 5000 }).should('be.visible').then(($toggle) => {
      const isChecked = $toggle.hasClass('switchery-on');
      if ((marcar && !isChecked) || (!marcar && isChecked)) {
        cy.wrap($toggle).click();
      }
    });
  }

  /**
   * Marca/desmarca checkbox Saldo Caixa (usando switcher visível)
   * @param {boolean} marcar - true para marcar, false para desmarcar
   */
  marcarSaldoCaixa(marcar = true) {
    cy.get(FormaPagamentoCadastroLocators.toggleSaldoCaixa, { timeout: 5000 }).should('be.visible').then(($toggle) => {
      const isChecked = $toggle.hasClass('switchery-on');
      if ((marcar && !isChecked) || (!marcar && isChecked)) {
        cy.wrap($toggle).click();
      }
    });
  }

  /**
   * Preenche o formulário completo
   * @param {Object} dados - Objeto com os dados da forma de pagamento
   * @param {string} dados.descricao - Descrição (obrigatório)
   * @param {string} dados.tipo - Tipo (obrigatório)
   * @param {number} dados.atalhoNumero - Atalho Número (opcional)
   * @param {string} dados.codigo - Código (opcional)
   * @param {string} dados.adquirente - Adquirente (opcional)
   * @param {boolean} dados.pos - POS (opcional)
   * @param {boolean} dados.integrarApi - Integrar API (opcional)
   * @param {boolean} dados.exibirPagamento - Exibir Pagamento (opcional)
   * @param {boolean} dados.preVenda - Pré Venda (opcional)
   * @param {boolean} dados.saldoCaixa - Saldo Caixa (opcional)
   */
  preencherFormulario(dados) {
    if (dados.descricao) {
      this.preencherDescricao(dados.descricao);
    }
    if (dados.tipo) {
      this.selecionarTipo(dados.tipo);
    }
    if (dados.atalhoNumero !== undefined) {
      this.preencherAtalhoNumero(dados.atalhoNumero);
    }
    if (dados.codigo) {
      this.preencherCodigoFormaPagamento(dados.codigo);
    }
    if (dados.adquirente) {
      this.preencherAdquirente(dados.adquirente);
    }
    if (dados.pos !== undefined) {
      this.marcarPos(dados.pos);
    }
    if (dados.integrarApi !== undefined) {
      this.marcarIntegrarApi(dados.integrarApi);
    }
    if (dados.exibirPagamento !== undefined) {
      this.marcarExibirPagamento(dados.exibirPagamento);
    }
    if (dados.preVenda !== undefined) {
      this.marcarPreVenda(dados.preVenda);
    }
    if (dados.saldoCaixa !== undefined) {
      this.marcarSaldoCaixa(dados.saldoCaixa);
    }
  }

  /**
   * Clica no botão Salvar
   */
  clicarSalvar() {
    cy.get(FormaPagamentoCadastroLocators.btnSalvar).click();
  }

  /**
   * Salva o formulário e valida mensagem de sucesso
   */
  salvar() {
    this.clicarSalvar();
    // Aguarda o modal fechar (pode ficar oculto mas ainda no DOM, então verifica se não está visível)
    cy.get(FormaPagamentoCadastroLocators.modal, { timeout: 10000 }).should('not.be.visible');
    // Valida toast de sucesso se existir (pode não aparecer em alguns casos)
    cy.get('body').then(($body) => {
      if ($body.find(FormaPagamentoCadastroLocators.toastSucesso).length > 0) {
        cy.get(FormaPagamentoCadastroLocators.toastSucesso, { timeout: 10000 })
          .should('be.visible')
          .should('contain', 'Sucesso');
      } else {
        // Se não houver toast, valida que retornou para a listagem
        cy.url().should('include', '/configuracao/forma-pagamento');
      }
    });
  }

  /**
   * Valida mensagem de sucesso
   */
  validarMensagemSucesso() {
    cy.get(FormaPagamentoCadastroLocators.toastSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'Sucesso');
  }

  /**
   * Clica no botão Fechar do modal
   */
  clicarBotaoFechar() {
    cy.get(FormaPagamentoCadastroLocators.btnFechar).click();
    cy.get(FormaPagamentoCadastroLocators.modal, { timeout: 5000 }).should('not.be.visible');
  }

  /**
   * Valida que o modal foi fechado
   */
  validarModalFechado() {
    cy.get(FormaPagamentoCadastroLocators.modal).should('not.be.visible');
  }

  /**
   * Tenta salvar sem preencher campos obrigatórios
   */
  tentarSalvarSemCamposObrigatorios() {
    this.clicarSalvar();
  }

  /**
   * Valida erro de campos obrigatórios
   */
  validarErroCamposObrigatorios() {
    // O modal deve permanecer aberto
    cy.get(FormaPagamentoCadastroLocators.modal).should('be.visible');
    // Pode validar mensagem de erro ou campo com erro
    cy.get(FormaPagamentoCadastroLocators.campoObrigatorio).should('exist');
  }
}

export default new FormaPagamentoCadastroPage();

