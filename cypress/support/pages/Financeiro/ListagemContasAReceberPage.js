// import ListagemContasAReceberLocators from "../../locators/ListagemContasAReceberLocators";
// import menulateralfinanceiropage from "../menulateral/menulateralfinanceiropage";

// class ListagemContasAReceberPage {
//   // Acessa a página de Listagem de Contas a Receber
//   visit() {
//     menulateralfinanceiropage.acessarListagemContasReceberReceita();
//   }
//   verificarCarregamentoDaPagina() {
//     cy.get('h5').contains('Receita').should('be.visible');
//   }
//   // Abre o modal de novo cadastro
//   abrirNovoCadastro() {
//     cy.get(ListagemContasAReceberLocators.novoCadastroBtn).click();
//   }

//   verificarTotalizadores() {
//     // Verifica se os rótulos e valores dos totalizadores estão visíveis
//     cy.get(ListagemContasAReceberLocators.totalizadoresRotulos).should('be.visible'); // Verifica a visibilidade dos rótulos
//     cy.get(ListagemContasAReceberLocators.totalizadoresValores).should('be.visible'); // Verifica a visibilidade dos valores
//   }

//   // Marca o checkbox da primeira linha e verifica se está selecionado, forçando o clique para evitar bloqueio
//   marcarCheckboxPrimeiraLinha() {
//     cy.get(ListagemContasAReceberLocators.checkboxPrimeiraLinha)
//       .check({ force: true }) // Adiciona { force: true } para garantir o clique no checkbox
//       .should('be.checked');
//   }

//   // Clica no botão "Baixar" da primeira linha (fora do dropdown) após verificar sua visibilidade
//   clicarBotaoBaixarPrimeiraLinha() {
//     cy.get(ListagemContasAReceberLocators.botaoBaixarLinha)
//       .should('be.visible')  // Aguarda a visibilidade do botão
//       .click();
//   }

//   // Abre o dropdown de ações e verifica se as opções estão visíveis
//   abrirDropdownAcaoPrimeiraLinha() {
//     cy.get(ListagemContasAReceberLocators.dropdownAcao)
//       .should('be.visible')
//       .click();

//     // Verifica que as opções do dropdown estão visíveis após o clique
//     cy.get('.dropdown-menu .dropdown-item').should('be.visible');
//   }

//   // Verifica se todas as células essenciais estão presentes e visíveis na primeira linha
//   verificarCamposVisiveisPrimeiraLinha() {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).within(() => {
//       cy.get(ListagemContasAReceberLocators.celulaDataVencimento).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaDescricao).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaCliente).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaCategoria).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaValorParcela).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaValorPago).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaValorPendente).should('be.visible');
//       cy.get(ListagemContasAReceberLocators.celulaStatus).should('be.visible');
//     });
//   }
//   // Clica para baixar contas selecionadas
//   clicarBaixarSelecionados() {
//     cy.get(ListagemContasAReceberLocators.baixarSelecionadosBtn).click();
//   }

//   // Verifica o modal de erro ao tentar baixar sem selecionar
//   verificarModalErroBaixar() {
//     cy.get(ListagemContasAReceberLocators.modalTituloErroBaixar)
//       .should('contain', 'Nenhuma parcela foi selecionada!')
//       .and('be.visible');
//   }

//   // Seleciona a linha que contém um valor específico e marca o checkbox
//   selecionarLinhaPorValor(valor) {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
//       if ($linha.text().includes(valor)) {
//         cy.wrap($linha).find(ListagemContasAReceberLocators.checkboxLinha).check();
//       }
//     });
//   }
//   // Seleciona a linha e marca o checkbox, verificando se foi selecionado
//   selecionarLinhaPorValorEVerificarCheckbox(valor) {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
//       if ($linha.text().includes(valor)) {
//         const checkbox = cy.wrap($linha).find(ListagemContasAReceberLocators.checkboxLinha);
//         checkbox.check();
//         checkbox.should('be.checked');
//       }
//     });
//   }

//   // Clica no botão "Baixar" em uma linha específica
//   clicarBaixarNaLinha(valor) {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
//       if ($linha.text().includes(valor)) {
//         cy.wrap($linha).find(ListagemContasAReceberLocators.botaoBaixar).click();
//       }
//     });
//   }

//   // Abre o dropdown de ações de uma linha específica
//   abrirDropdownAcaoNaLinha(valor) {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).each(($linha) => {
//       if ($linha.text().includes(valor)) {
//         cy.wrap($linha).find(ListagemContasAReceberLocators.dropdownAcao).click();
//       }
//     });
//   }
//   // Valida a presença e visibilidade de todas as opções do dropdown
//   validarOpcoesDropdown() {
//     // Abre o dropdown
//     this.abrirDropdownAcaoPrimeiraLinha();

//     // Verifica a presença de cada opção do dropdown
//     cy.get(ListagemContasAReceberLocators.opcaoEditar).should('be.visible').and('contain', 'Editar');
//     cy.get(ListagemContasAReceberLocators.opcaoDetalhes).should('be.visible').and('contain', 'Detalhes do título');
//     cy.get(ListagemContasAReceberLocators.opcaoCancelar).should('be.visible').and('contain', 'Cancelar');
//     cy.get(ListagemContasAReceberLocators.opcaoExcluir).should('be.visible').and('contain', 'Excluir');
//   }
//   // Seleciona a opção "Editar" no dropdown
//   selecionarOpcaoEditar() {
//     this.abrirDropdownAcaoPrimeiraLinha();
//     cy.get(ListagemContasAReceberLocators.opcaoEditar).click();
//   }

//   // Seleciona a opção "Detalhes do título" no dropdown
//   selecionarOpcaoDetalhes() {
//     this.abrirDropdownAcaoPrimeiraLinha();
//     cy.get(ListagemContasAReceberLocators.opcaoDetalhes).click();
//   }

//   // Seleciona a opção "Cancelar" no dropdown
//   selecionarOpcaoCancelar() {
//     this.abrirDropdownAcaoPrimeiraLinha();
//     cy.get(ListagemContasAReceberLocators.opcaoCancelar).click();
//   }

//   // Seleciona a opção "Excluir" no dropdown
//   selecionarOpcaoExcluir() {
//     this.abrirDropdownAcaoPrimeiraLinha();
//     cy.get(ListagemContasAReceberLocators.opcaoExcluir).click();
//   }
//   selecionarTodasLinhas() {
//     cy.get(ListagemContasAReceberLocators.checkboxSelecionarTodos).check();
//   }

//   // Valida o título do modal de confirmação de cancelamento
//   validarTituloModalCancelar() {
//     cy.get(ListagemContasAReceberLocators.modalTituloCancelar)
//       .should('contain', 'Deseja realmente cancelar está parcela?');
//   }

//   // Valida que o título do modal de confirmação de cancelamento é exibido corretamente
//   validarTituloModalCancelar() {
//     cy.get(ListagemContasAReceberLocators.modalTituloCancelar)
//       .should('contain', 'Deseja realmente cancelar está parcela?');
//   }

//   // Preenche o campo de motivo no modal de cancelamento com o texto fornecido
//   preencherMotivoCancelar(motivo) {
//     cy.get(ListagemContasAReceberLocators.modalCampoMotivo).type(motivo);
//   }

//   // Clica no botão "Sim, tenho certeza!" para confirmar o cancelamento
//   confirmarCancelamento() {
//     cy.get(ListagemContasAReceberLocators.modalBotaoConfirmar).click();
//   }

//   // Clica no botão "Não, deseja voltar!" para cancelar a ação de cancelamento
//   cancelarAcao() {
//     cy.get(ListagemContasAReceberLocators.modalBotaoCancelar).click();
//   }

//   // Verifica se uma notificação de sucesso foi exibida na tela
//   verificarNotificacaoSucesso() {
//     cy.get(ListagemContasAReceberLocators.notificacaoSucesso).should('be.visible');
//   }

//   // Valida que o status da parcela foi atualizado para "Cancelada" na primeira linha da tabela
//   verificarStatusCancelado() {
//     cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha)
//       .should('contain', 'Cancelada');
//   }

//   // Verifica se o modal de confirmação de cancelamento foi fechado
//   verificarModalFechado() {
//     cy.get(ListagemContasAReceberLocators.modalTituloCancelar).should('not.exist');
//   }

//   // Valida o título do modal de exclusão
//   validarTituloModalExcluir() {
//     cy.get(ListagemContasAReceberLocators.modalTituloExcluir)
//       .should('contain', 'Você está prestes a excluir um item.');
//   }

//   // Clica no botão "Excluir" no modal de confirmação
//   confirmarExclusao() {
//     cy.get(ListagemContasAReceberLocators.modalBotaoConfirmarExcluir).click();
//   }

//   // Clica no botão "Voltar" no modal de confirmação para cancelar a exclusão
//   cancelarExclusao() {
//     cy.get(ListagemContasAReceberLocators.modalBotaoCancelarExcluir).click();
//   }

//   // Verifica que a linha da parcela foi removida da tabela após a exclusão
//   verificarRemocaoDaLinha() {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).should('not.exist');
//   }
//   // Verifica que o modal foi fechado corretamente (título não está presente)
//   verificarModalFechado() {
//     cy.get(ListagemContasAReceberLocators.modalTituloExcluir).should('not.exist');
//   }

//   // Verifica que a linha da tabela ainda está presente após cancelar a exclusão
//   verificarLinhaPresente() {
//     cy.get(ListagemContasAReceberLocators.linhaTabela).should('exist');
//   }
//   // Verifica que o status da primeira parcela foi atualizado para "Baixada"
//   verificarStatusBaixado() {
//     cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha)
//       .should('contain', 'Baixada');
//   }
//   marcarPrimeiraParcela() {
//     cy.get(ListagemContasAReceberLocators.checkboxPrimeiraLinha)
//       .check({ force: true })
//       .should('be.checked');
//   }

//   clicarBaixarSelecionados() {
//     cy.get(ListagemContasAReceberLocators.baixarSelecionadosBtn)
//       .should('be.visible')
//       .click();
//   }

//   // Verifica o título do popup de confirmação de baixa
//   validarTituloPopupBaixa() {
//     cy.get(ListagemContasAReceberLocators.modalTituloBaixar)
//       .should('contain', 'Você está prestes a realizar a baixa de 1 parcela.');
//   }

//   // Seleciona uma opção no dropdown de conta para a baixa
//   selecionarContaParaBaixa(conta) {
//     cy.get(ListagemContasAReceberLocators.dropdownContaBaixa)
//       .select(conta); // Seleciona a conta especificada
//   }

//   // Clica no botão de confirmação "Sim, pode realizar a baixa!"
//   confirmarBaixa() {
//     cy.get(ListagemContasAReceberLocators.botaoConfirmarBaixa).click();
//   }

//   // Clica no botão de cancelamento "Não, desejo cancelar!"
//   cancelarBaixa() {
//     cy.get(ListagemContasAReceberLocators.botaoCancelarBaixa).click();
//   }
//   //Valida a exibição do modal de sucesso para o baixar selecionados
//   validarModalSucesso() {
//     cy.get(ListagemContasAReceberLocators.modalTituloSucesso)
//       .should('contain', 'Parcela(s) baixada(s)!');

//     cy.get(ListagemContasAReceberLocators.modalMensagemSucesso)
//       .should('contain', 'Baixa(s) realizada(s) com sucesso!');
//   }
//   // Verifica que o modaltitulobaixar foi fechado corretamente após cancelar a ação
//   verificarModalFechado() {
//     cy.get(ListagemContasAReceberLocators.modalTituloBaixar).should('not.exist');
//   }
//   // Método para obter o número total de linhas na tabela
//   obterNumeroLinhasTabela() {
//     return cy.get(`${ListagemContasAReceberLocators.tabelaCompleta} tr`).its('length');
//   }
//   verificarStatusPago() {
//     // Verifica se a célula de status na primeira linha contém o texto "Pago"
//     cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Pago');
//   }
//   // Verifica se a célula de status na primeira linha contém o texto "parcial"
//   verificarStatusParcial() {
//     cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Parcial');
//   }
//   verificarStatusBaixar() {
//     cy.get(ListagemContasAReceberLocators.celulaStatusPrimeiraLinha).should('contain.text', 'Baixar');
//   }
//   desmarcarTodasLinhas() {
//     cy.get(ListagemContasAReceberLocators.checkboxSelecionarTodos).uncheck();
//   }
//   clicarBotaoParcialNaPrimeiraLinhaComStatusParcial() {
//     cy.get(ListagemContasAReceberLocators.linhaStatusParcial)
//       .first()
//       .find(ListagemContasAReceberLocators.botaoParcialNaLinha)
//       .click({ force: true }); // Força o clique, ignorando sobreposição de outros elementos
//   }
//   clicarBotaoBaixarNaPrimeiraLinhaComStatusBaixar() {
//     cy.get(ListagemContasAReceberLocators.linhaStatusBaixar)
//       .first()
//       .find(ListagemContasAReceberLocators.botaoBaixarNaLinha)
//       .click({ force: true }); // Força o clique, ignorando sobreposição de outros elementos
//   }
  
// }

// export default new ListagemContasAReceberPage();
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

}

export default new ListagemContasAReceberPage();