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

  // Ações de filtro
  filtrarPorPeriodo(periodo = 'TODAY', tipoData = 'VENCIMENTO') {
    cy.get(ListagemContasAPagarLocators.periodoSelect).select(periodo);
    cy.get(ListagemContasAPagarLocators.tipoDataSelect).select(tipoData);
    this.validarFiltroAplicado(periodo, tipoData);
  }

  validarFiltroAplicado(periodo, tipoData) {
    cy.get(ListagemContasAPagarLocators.periodoSelect).should('have.value', periodo);
    cy.get(ListagemContasAPagarLocators.tipoDataSelect).should('have.value', tipoData);
  }

  // Ações na tabela
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

  clicarBaixarSelecionados() {
    cy.get(ListagemContasAPagarLocators.baixarSelecionadosButton).click();
  }

  abrirDropdownAcoesPrimeiraLinha() {
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .first()
      .find(ListagemContasAPagarLocators.dropdownAcoes)
      .click();
  }

  baixarDespesa() {
    this.abrirDropdownAcoesPrimeiraLinha();
    cy.get(ListagemContasAPagarLocators.baixarOpcao).click();
  }

  abrirNovoCadastro() {
    cy.get(ListagemContasAPagarLocators.novoCadastroButton).click();
    cy.get('.modal-title').contains('Nova Despesa').should('be.visible');
  }

  // Validações
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
  
    cy.get('.row .col-md-3 div > small').should(($els) => {
      textosEsperados.forEach((texto, index) => {
        expect($els.eq(index)).to.contain.text(texto);
      });
    });
  }

  verificarNotificacaoSucesso() {
    cy.get(ListagemContasAPagarLocators.notificacaoSucesso);
  }
  confirmarPagamentoComConta(conta) {
    // Aguarda o modal ser exibido
    cy.get(ListagemContasAPagarLocators.modalConfirmacao).should('be.visible');

    // Seleciona a conta no dropdown do modal
    cy.get(ListagemContasAPagarLocators.selectContaBaixa).select(conta);

    // Clica no botão "Sim, pode realizar a baixa!"
    cy.get(ListagemContasAPagarLocators.botaoConfirmarBaixa).click();
  }
   // Método para verificar o modal de sucesso após a baixa
   verificarModalSucessoPagamento() {
    // Verifica se o modal de sucesso é exibido
    cy.get(ListagemContasAPagarLocators.modalSucessoPagamento).should('be.visible');
    cy.get(ListagemContasAPagarLocators.tituloModalSucesso).should('contain.text', 'Parcela(s) baixada(s)!');
    cy.get(ListagemContasAPagarLocators.mensagemModalSucesso).should('contain.text', 'Baixa(s) realizada(s) com sucesso!');

    // Fecha o modal de sucesso clicando no botão "OK"
    cy.get(ListagemContasAPagarLocators.botaoFecharModalSucesso).click({force: true});
  }
  abrirDropdownPrimeiraLinhaComStatusBaixar() {
    // Localiza a primeira linha que possui o status "Baixar" e clica no dropdown
    cy.get(ListagemContasAPagarLocators.linhaTabela)
      .filter(':contains("Baixar")')
      .first()
      .within(() => {
        cy.get(ListagemContasAPagarLocators.dropdownAcoes).click();
      });
  }
  
  validarOpcoesDropdown() {
    const opcoesEsperadas = ['Editar', 'Detalhes do título', 'Cancelar', 'Excluir'];
  
    // Verifica se todas as opções esperadas estão presentes no dropdown aberto
    opcoesEsperadas.forEach(opcao => {
      cy.get(ListagemContasAPagarLocators.opcoesDropdown)
        .should('contain.text', opcao)
        .and('be.visible');
    });
  }
  selecionarOpcaoDropdown(opcao) {
    // Seleciona uma opção dentro do dropdown
    cy.get('.dropdown-menu.show')
      .contains(opcao)
      .click();
  }
  validarModalConfirmacaoCancelamento() {
    cy.get(ListagemContasAPagarLocators.modalTitulo)
      .should('contain.text', 'Deseja realmente cancelar está parcela?');
  }
  
  preencherMotivoCancelamento(motivo) {
    cy.get(ListagemContasAPagarLocators.inputMotivoCancelamento)
      .type(motivo);
  }
  
  confirmarCancelamento() {
    cy.get(ListagemContasAPagarLocators.botaoConfirmarCancelamento)
      .click();
  }
  validarModalConfirmacaoExclusao() {
    cy.get(ListagemContasAPagarLocators.modalTitulo)
      .should('contain.text', 'Você está prestes a excluir um item.');
  }
  
  confirmarExclusao() {
    cy.get(ListagemContasAPagarLocators.botaoConfirmarExclusao).click();
  }
  cancelarOperacao() {
    cy.get(ListagemContasAPagarLocators.botaoVoltarCancelamento).click();
  }
  validarAusenciaNotificacaoSucesso() {
    cy.get(ListagemContasAPagarLocators.notificacaoSucesso).should('not.exist');
  }
  cancelarOperacaoExclusao() {
    cy.get(ListagemContasAPagarLocators.botaoCancelarExclusao).click();
  }
}

export default new ListagemContasAPagarPage();