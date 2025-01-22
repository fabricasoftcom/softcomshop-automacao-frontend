import ListagemContasAPagarLocators from "../../locators/ListagemContasAPagarLocators";
import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";

class ListagemContasAPagarPage {
  // Navegação para a página
  visit() {
    menulateralfinanceiropage.acessarContasPagar();
    this.verificarCarregamentoDaPagina();
  }

  verificarCarregamentoDaPagina() {
    cy.get('h5').contains('Despesa').should('be.visible');
  }

  // ---------------------- Ações de Filtro ----------------------

  filtrarPorPeriodo(periodo = 'TODAY', tipoData = 'VENCIMENTO') {
    cy.get(ListagemContasAPagarLocators.periodoSelect).select(periodo);
    cy.get(ListagemContasAPagarLocators.tipoDataSelect).select(tipoData);
    this.validarFiltroAplicado(periodo, tipoData);
  }

  validarFiltroAplicado(periodo, tipoData) {
    cy.get(ListagemContasAPagarLocators.periodoSelect).should('have.value', periodo);
    cy.get(ListagemContasAPagarLocators.tipoDataSelect).should('have.value', tipoData);
  }

  // ---------------------- Ações na Tabela ----------------------

  selecionarTodasLinhas() {
    cy.get(ListagemContasAPagarLocators.checkboxTodos).check();
  }

  selecionarPrimeiraLinhaComStatusBaixar() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Baixar")')
      .first()
      .find(ListagemContasAPagarLocators.checkboxLinha)
      .check({ force: true });
  }

  abrirDropdownPrimeiraLinhaComStatusBaixar() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Baixar")')
      .first()
      .find(ListagemContasAPagarLocators.dropdownAcoes)
      .click();
  }

  abrirDropdownPrimeiraLinhaComStatusPago() {
    cy.get(ListagemContasAPagarLocators.linhaComStatusPago)
      .first()
      .find(ListagemContasAPagarLocators.dropdownAcoes)
      .click();
  }

  validarOpcoesDropdown() {
    const opcoesEsperadas = ['Editar', 'Detalhes do título', 'Cancelar', 'Excluir'];
    opcoesEsperadas.forEach(opcao => {
      cy.get(ListagemContasAPagarLocators.opcoesDropdown)
        .should('contain.text', opcao)
        .and('be.visible');
    });
  }

  validarOpcoesDropdownPago() {
    const opcoesEsperadas = ['Editar', 'Detalhes do título', 'Desfazer baixa', 'Cancelar', 'Excluir'];
    opcoesEsperadas.forEach(opcao => {
      cy.get(ListagemContasAPagarLocators.opcoesDropdown)
        .should('contain.text', opcao)
        .and('be.visible');
    });
  }

  selecionarOpcaoDropdown(opcao) {
    cy.get(ListagemContasAPagarLocators.opcoesDropdown)
      .contains(opcao)
      .click();
  }
  abrirNovoCadastro() {
    cy.get(ListagemContasAPagarLocators.novoCadastroButton).click();
    // Verificar se a página/modal de cadastro foi carregada corretamente
    cy.get('.modal-title').contains('Nova Despesa').should('be.visible');
  }

  // ---------------------- Ações de Baixa ----------------------

  clicarBaixarSelecionados() {
    cy.get(ListagemContasAPagarLocators.baixarSelecionadosButton).click();
  }

  confirmarPagamentoComConta(conta) {
    cy.get(ListagemContasAPagarLocators.modalConfirmacao).should('be.visible');
    cy.get(ListagemContasAPagarLocators.selectContaBaixa).select(conta);
    cy.get(ListagemContasAPagarLocators.botaoConfirmarBaixa).click();
  }

  verificarModalSucessoPagamento() {
    cy.get(ListagemContasAPagarLocators.modalSucessoPagamento).should('be.visible');
    cy.get(ListagemContasAPagarLocators.tituloModalSucesso).should('contain.text', 'Parcela(s) baixada(s)!');
    cy.get(ListagemContasAPagarLocators.mensagemModalSucesso).should('contain.text', 'Baixa(s) realizada(s) com sucesso!');
    cy.get(ListagemContasAPagarLocators.botaoFecharModalSucesso).click({ force: true });
  }

  // ---------------------- Ações de Cancelamento ----------------------

  validarModalConfirmacaoCancelamento() {
    cy.get(ListagemContasAPagarLocators.modalTitulo)
      .should('contain.text', 'Deseja realmente cancelar está parcela?');
  }

  preencherMotivoCancelamento(motivo) {
    cy.get(ListagemContasAPagarLocators.inputMotivoCancelamento).type(motivo);
  }

  confirmarCancelamento() {
    cy.get(ListagemContasAPagarLocators.botaoConfirmarCancelamento).click();
  }

  cancelarOperacao() {
    cy.get(ListagemContasAPagarLocators.botaoVoltarCancelamento).click();
  }

  // ---------------------- Ações de Exclusão ----------------------

  validarModalConfirmacaoExclusao() {
    cy.get(ListagemContasAPagarLocators.modalTitulo)
      .should('contain.text', 'Você está prestes a excluir um item.');
  }

  confirmarExclusao() {
    cy.get(ListagemContasAPagarLocators.botaoConfirmarExclusao).click();
  }

  cancelarOperacaoExclusao() {
    cy.get(ListagemContasAPagarLocators.botaoCancelarExclusao).click();
  }

  verificarNotificacaoErro() {
    cy.get(ListagemContasAPagarLocators.notificacaoErro).should('be.visible');
  }

  // ---------------------- Validações ----------------------

  validarTabelaVisivel() {
    cy.get(ListagemContasAPagarLocators.tabela).should('be.visible');
  }

  validarPrimeiraLinhaTabela() {
    cy.get(ListagemContasAPagarLocators.linhaTabela).first().within(() => {
      cy.get(ListagemContasAPagarLocators.colunaDataVencimento).should('be.visible');
      cy.get(ListagemContasAPagarLocators.colunaDescricao).should('be.visible');
      cy.get(ListagemContasAPagarLocators.colunaFornecedor).should('be.visible');
      cy.get(ListagemContasAPagarLocators.colunaCategoria).should('be.visible');
      cy.get(ListagemContasAPagarLocators.colunaStatus).should('be.visible');
    });
  }

  validarTotalizadores() {
    const textosEsperados = ['Vencidas', 'A Pagar', 'Pagas', 'Total do Período'];
    cy.get(ListagemContasAPagarLocators.totalizadores).should(($els) => {
      textosEsperados.forEach((texto, index) => {
        expect($els.eq(index)).to.contain.text(texto);
      });
    });
  }

  verificarNotificacaoSucesso() {
    cy.get(ListagemContasAPagarLocators.notificacaoSucesso).should('be.visible');
  }

  validarAusenciaNotificacaoSucesso() {
    cy.get(ListagemContasAPagarLocators.notificacaoSucesso).should('not.exist');
  }

  // -----------------------novos metodos----------------------------------
  clicarBotaoBaixarNaPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Baixar")')
      .first()
      .within(() => {
        cy.get(ListagemContasAPagarLocators.botaoBaixar).click();
      });
  }
  clicarBotaoParcialNaPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Parcial")')
      .first()
      .within(() => {
        cy.get(ListagemContasAPagarLocators.botaoParcial).click();
      });
  }
  clicarBotaoPagoNaPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Pago")')
      .first()
      .within(() => {
        cy.get(ListagemContasAPagarLocators.botaoPago).click();
      });
  }
  verificarStatusParcial() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .find(ListagemContasAPagarLocators.colunaStatus)
      .filter(':contains("Parcial")')
      .first()
      .should('contain.text', 'Parcial');
  }
  verificarStatusBaixar() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .find(ListagemContasAPagarLocators.colunaStatus)
      .filter(':contains("Baixar")')
      .first()
      .should('contain.text', 'Baixar');
  }
  selecionarPeriodoEsteMes() {
    cy.get(ListagemContasAPagarLocators.periodoSelect).select('MONTH');
    cy.get(ListagemContasAPagarLocators.periodoSelect).should('have.value', 'MONTH');
}
validarValoresNaColunaValorParcela() {
  cy.get('table.table tbody tr').each(($row) => {
      cy.wrap($row)
          .find('td:nth-child(6)') // A sexta coluna corresponde à "Valor Parcela"
          .invoke('text')
          .then((valor) => {
              // Remove espaços extras e converte valor para número
              valor = valor.trim().replace(/\./g, '').replace(',', '.');
              expect(parseFloat(valor)).to.be.greaterThan(0, 'Valor Parcela deve ser maior que 0,00');
          });
  });
}

}

export default new ListagemContasAPagarPage();
