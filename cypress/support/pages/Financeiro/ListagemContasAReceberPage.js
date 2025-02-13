import ListagemContasAReceberLocators from "../../locators/ListagemContasAReceberLocators";
import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";

class ListagemContasAReceberPage {

  // ====== Navegação e Carregamento da Página ======

  visit() {
    menulateralfinanceiropage.acessarListagemContasReceberReceita();
  }

  verificarCarregamentoDaPagina() {
    cy.get('h5').contains('Receita').should('be.visible');
  }

  // ====== Ações de Cadastro e Filtros ======

  abrirNovoCadastro() {
    cy.get(ListagemContasAReceberLocators.novoCadastroBtn).click();
    cy.get('.modal-title').contains('Nova Receita').should('be.visible');
  }

  verificarTotalizadores() {
    cy.get(ListagemContasAReceberLocators.totalizadoresRotulos).should('be.visible');
    cy.get(ListagemContasAReceberLocators.totalizadoresValores).should('be.visible');
  }

  selecionarTodasLinhas() {
    cy.get(ListagemContasAReceberLocators.checkboxSelecionarTodos).check();
  }

  desmarcarTodasLinhas() {
    cy.get(ListagemContasAReceberLocators.checkboxSelecionarTodos).uncheck();
  }

  // ====== Manipulação de Linhas na Tabela ======

  marcarCheckboxPrimeiraLinha() {
    cy.get(ListagemContasAReceberLocators.checkboxPrimeiraLinha)
      .check({ force: true })
      .should('be.checked');
  }

  verificarCamposVisiveisPrimeiraLinha() {
    cy.get(ListagemContasAReceberLocators.linhaTabela).within(() => {
      cy.get(ListagemContasAReceberLocators.celulaDataVencimento).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaDescricao).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaCliente).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaCategoria).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaValorParcela).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaValorPago).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaValorPendente).should('be.visible');
      cy.get(ListagemContasAReceberLocators.celulaStatus).should('be.visible');
    });
  }

  selecionarLinhaPorValor(valor) {
    cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
      if ($linha.text().includes(valor)) {
        cy.wrap($linha).find(ListagemContasAReceberLocators.checkboxLinha).check();
      }
    });
  }

  selecionarLinhaPorValorEVerificarCheckbox(valor) {
    cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
      if ($linha.text().includes(valor)) {
        const checkbox = cy.wrap($linha).find(ListagemContasAReceberLocators.checkboxLinha);
        checkbox.check().should('be.checked');
      }
    });
  }

  // ====== Ações de Baixa e Botões ======

  clicarBaixarSelecionados() {
    cy.get(ListagemContasAReceberLocators.baixarSelecionadosBtn).should('be.visible').click();
  }

  clicarBotaoBaixarPrimeiraLinha() {
    cy.get(ListagemContasAReceberLocators.botaoBaixarNaLinha).should('be.visible').click();
  }

  clicarBotaoParcialNaPrimeiraLinhaComStatusParcial() {
    cy.get(ListagemContasAReceberLocators.linhaStatusParcial)
      .first()
      .find(ListagemContasAReceberLocators.botaoParcialNaLinha)
      .click({ force: true });
  }

  clicarBotaoBaixarNaPrimeiraLinhaComStatusBaixar() {
    cy.get(ListagemContasAReceberLocators.linhaStatusBaixar)
      .first()
      .find(ListagemContasAReceberLocators.botaoBaixarNaLinha)
      .click({ force: true });
  }

  // ====== Ações de Dropdown nas Linhas ======

  abrirDropdownAcaoPrimeiraLinha() {
    cy.get(ListagemContasAReceberLocators.dropdownAcao).should('be.visible').click();
  }

  abrirDropdownAcaoNaLinha(valor) {
    cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
      if ($linha.text().includes(valor)) {
        cy.wrap($linha).find(ListagemContasAReceberLocators.dropdownAcao).click();
      }
    });
  }

  validarOpcoesDropdown() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAReceberLocators.opcaoEditar).should('be.visible').and('contain', 'Editar');
    cy.get(ListagemContasAReceberLocators.opcaoDetalhes).should('be.visible').and('contain', 'Detalhes do título');
    cy.get(ListagemContasAReceberLocators.opcaoCancelar).should('be.visible').and('contain', 'Cancelar');
    cy.get(ListagemContasAReceberLocators.opcaoExcluir).should('be.visible').and('contain', 'Excluir');
  }

  selecionarOpcaoEditar() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAReceberLocators.opcaoEditar).click();
  }

  selecionarOpcaoDetalhes() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAReceberLocators.opcaoDetalhes).click();
  }

  selecionarOpcaoCancelar() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAReceberLocators.opcaoCancelar).click();
  }

  selecionarOpcaoExcluir() {
    this.abrirDropdownAcaoPrimeiraLinha();
    cy.get(ListagemContasAReceberLocators.opcaoExcluir).click();
  }

  // ====== Modais e Mensagens de Confirmação ======

  verificarModalErroBaixar() {
    cy.get(ListagemContasAReceberLocators.modalTituloErroBaixar)
      .should('contain', 'Nenhuma parcela foi selecionada!')
      .and('be.visible');
  }

  validarTituloPopupBaixa() {
    cy.get(ListagemContasAReceberLocators.modalTituloBaixar)
      .should('contain', 'Você está prestes a realizar a baixa de 1 parcela.');
  }

  validarModalSucesso() {
    cy.get(ListagemContasAReceberLocators.modalTituloSucesso).should('contain', 'Parcela(s) baixada(s)!');
    cy.get(ListagemContasAReceberLocators.modalMensagemSucesso).should('contain', 'Baixa(s) realizada(s) com sucesso!');
  }

  verificarModalFechado() {
    cy.get(ListagemContasAReceberLocators.modalTituloBaixar).should('not.exist');
  }
    // Seleciona uma opção no dropdown de conta para a baixa
  selecionarContaParaBaixa(conta) {
    cy.get(ListagemContasAReceberLocators.dropdownContaBaixa)
      .select(conta); // Seleciona a conta especificada
  }

  // ====== Ações de Confirmação e Cancelamento ======

  validarTituloModalCancelar() {
    cy.get(ListagemContasAReceberLocators.modalTituloCancelar)
      .should('contain', 'Deseja realmente cancelar está parcela?');
  }

  preencherMotivoCancelar(motivo) {
    cy.get(ListagemContasAReceberLocators.modalCampoMotivo).type(motivo);
  }

  confirmarCancelamento() {
    cy.get(ListagemContasAReceberLocators.modalBotaoConfirmar).click();
  }

  cancelarAcao() {
    cy.get(ListagemContasAReceberLocators.modalBotaoCancelar).click();
  }

  validarTituloModalExcluir() {
    cy.get(ListagemContasAReceberLocators.modalTituloExcluir)
      .should('contain', 'Você está prestes a excluir um item.');
  }

  confirmarExclusao() {
    cy.get(ListagemContasAReceberLocators.modalBotaoConfirmarExcluir).click();
  }

  cancelarExclusao() {
    cy.get(ListagemContasAReceberLocators.modalBotaoCancelarExcluir).click();
  }
    // Clica no botão de confirmação "Sim, pode realizar a baixa!"
  confirmarBaixa() {
    cy.get(ListagemContasAReceberLocators.botaoConfirmarBaixa).click();
  }

  // ====== Verificações de Status e Notificações ======

  verificarNotificacaoSucesso() {
    cy.get(ListagemContasAReceberLocators.notificacaoSucesso).should('be.visible');
  }

  verificarStatusCancelado() {
    cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain', 'Cancelada');
  }

  verificarStatusBaixado() {
    cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain', 'Baixada');
  }

  verificarStatusPago() {
    cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Pago');
  }

  verificarStatusParcial() {
    cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Parcial');
  }

  verificarStatusBaixar() {
    cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Baixar');
  }

  verificarLinhaPresente() {
    cy.get(ListagemContasAReceberLocators.linhaTabela).should('exist');
  }

  verificarRemocaoDaLinha() {
    cy.get(ListagemContasAReceberLocators.linhaTabela).should('not.exist');
  }

  obterNumeroLinhasTabela() {
    return cy.get(`${ListagemContasAReceberLocators.tabelaCompleta} tr`).its('length');
  }
  selecionarPeriodoEsteMes() {
    cy.get(ListagemContasAReceberLocators.periodoSelect).select('MONTH');
    cy.get(ListagemContasAReceberLocators.periodoSelect).should('have.value', 'MONTH');
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

export default new ListagemContasAReceberPage();
