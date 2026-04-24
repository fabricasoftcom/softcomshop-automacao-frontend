import ListagemContasAReceberLocators from "../../locators/Financeiro/ListagemContasAReceberLocators";
import MenulateralFinanceiroPage from "../menulateral/MenulateralFinanceiroPage";

class ListagemContasAReceberPage {

  // ====== Navegação e Carregamento da Página ======

  visit() {
    MenulateralFinanceiroPage.acessarListagemContasReceberReceita();
  }

  verificarCarregamentoDaPagina() {
    cy.get(ListagemContasAReceberLocators.loading, { timeout: 5000 }).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 30000 }).should('be.visible');
    cy.get('h5').contains('Contas a Receber').should('be.visible');
  }

  /**
   * Verifica se há linhas na tabela
   * @returns {Cypress.Chainable<boolean>} true se há linhas, false caso contrário
   */
  verificarSeHaLinhasNaTabela() {
    return cy.get(ListagemContasAReceberLocators.tabelaCompleta).then(($tbody) => {
      const linhas = $tbody.find('tr');
      return linhas.length > 0;
    });
  }

  /**
   * Verifica se há linhas na tabela e lança erro se não houver
   * Usado internamente por métodos que dependem de dados
   */
  garantirQueHaLinhasNaTabela() {
    return this.verificarSeHaLinhasNaTabela().then((temLinhas) => {
      if (!temLinhas) {
        cy.log('⚠️ Tabela está vazia - este teste depende de dados');
        throw new Error('Tabela está vazia. Este teste requer dados para executar.');
      }
    });
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
    // Verifica se há linhas na tabela antes de tentar marcar o checkbox
    cy.get(ListagemContasAReceberLocators.tabelaCompleta).then(($tbody) => {
      const linhas = $tbody.find('tr');
      if (linhas.length === 0) {
        cy.log('⚠️ Tabela vazia - teste será pulado');
        throw new Error('Tabela está vazia. Não há linhas para interagir.');
      }
    });
    // Quebra a chain completamente para evitar elementos detached
    // Primeiro encontra a linha e aguarda que esteja estável
    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
    // Aguarda que o checkbox esteja disponível e estável (substitui wait fixo)
    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .find(ListagemContasAReceberLocators.checkboxLinha)
      .should('exist')
      .check({ force: true });
      // Verifica que foi marcado (re-busca novamente)
    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .find(ListagemContasAReceberLocators.checkboxLinha)
      .should('be.checked');
  }

  verificarCamposVisiveisPrimeiraLinha() {
    // Verifica se há linhas na tabela antes de tentar verificar campos
    cy.get(ListagemContasAReceberLocators.tabelaCompleta).then(($tbody) => {
      const linhas = $tbody.find('tr');
      if (linhas.length === 0) {
        cy.log('⚠️ Tabela vazia - teste será pulado');
        throw new Error('Tabela está vazia. Não há linhas para verificar.');
      }
    });

    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .should('exist')
      .within(() => {
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

  /**
   * Verifica se há linhas com status "Parcial" na tabela
   * @returns {Cypress.Chainable<boolean>} true se há linhas com status "Parcial", false caso contrário
   */
  verificarSeHaLinhasComStatusParcial() {
    // Aguarda o loading desaparecer e a tabela estar carregada (igual ao método encontrarLinhaComStatusParcial)
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Tenta primeiro buscar pelo ID (se existir) - mesma abordagem do método de clicar
    return cy.get(ListagemContasAReceberLocators.botaoParcialIdDinamico, { timeout: 5000 })
      .then(() => true, () => {
        // Fallback: busca por botão com classe btn-success e texto "Parcial"
        return cy.get('body').then(($body) => {
          const $botoes = $body.find(ListagemContasAReceberLocators.botaoParcialFallback);
          return Array.from($botoes).some(botao => {
            return Cypress.$(botao).text().trim() === 'Parcial';
          });
        });
      });
  }

  /**
   * Verifica se há linhas com status "Baixar" na tabela
   * @returns {Cypress.Chainable<boolean>} true se há linhas com status "Baixar", false caso contrário
   */
  verificarSeHaLinhasComStatusBaixar() {
    // Aguarda o loading desaparecer e a tabela estar carregada (igual ao método encontrarLinhaComStatusBaixar)
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Verifica se existe algum botão com ID que começa com "status-baixar-contas-a-receber-"
    // Usa a mesma abordagem do método de clicar: busca direta pelo ID usando cy.get()
    return cy.get(ListagemContasAReceberLocators.botaoBaixarNaLinha, { timeout: 5000 })
      .then(() => true, () => false);
  }

  /**
   * Encontra a primeira linha com status "Parcial" usando filtro manual
   * (Cypress não suporta :has() nativamente)
   */
  encontrarLinhaComStatusParcial() {
    // Aguarda o loading desaparecer e a tabela estar carregada
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Tenta primeiro buscar pelo ID (se existir)
    return cy.get(ListagemContasAReceberLocators.botaoParcialIdDinamico, { timeout: 5000 })
      .then(($botao) => {
        // Retorna a linha pai (tr) do botão
        return cy.wrap($botao.first().closest('tr'));
      }, () => {
        // Fallback: busca por botão com classe btn-success e texto "Parcial"
        return cy.get(ListagemContasAReceberLocators.botaoParcialFallback, { timeout: 10000 }).then(($botoes) => {
          const $botaoParcial = Array.from($botoes).find(botao => {
            return Cypress.$(botao).text().trim() === 'Parcial';
          });

          if ($botaoParcial) {
            return cy.wrap(Cypress.$($botaoParcial).closest('tr'));
          }

          throw new Error('Nenhuma linha com status "Parcial" encontrada');
        });
      });
  }

  /**
   * Encontra a primeira linha com status "Baixar" usando filtro manual
   * (Cypress não suporta :has() nativamente)
   */
  encontrarLinhaComStatusBaixar() {
    // Aguarda o loading desaparecer e a tabela estar carregada
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');

    // Aguarda que haja pelo menos uma linha na tabela
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Busca diretamente pelo botão usando o ID que começa com "status-baixar-contas-a-receber-"
    return cy.get(ListagemContasAReceberLocators.botaoBaixarNaLinha, { timeout: 10000 })
      .first()
      .then(($botao) => {
        // Retorna a linha pai (tr) do botão
        return cy.wrap($botao.closest('tr'));
      });
  }

  clicarBotaoParcialNaPrimeiraLinhaComStatusParcial() {
    // Aguarda o loading desaparecer e a tabela estar carregada
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Tenta primeiro buscar pelo ID (se existir)
    cy.get(ListagemContasAReceberLocators.botaoParcialIdDinamico, { timeout: 5000 })
      .first()
      .click({ force: true })
      .then(() => {}, () => {
        // Fallback: busca por botão com classe btn-success e texto "Parcial"
        cy.get(ListagemContasAReceberLocators.botaoParcialFallback, { timeout: 10000 }).then(($botoes) => {
          const $botaoParcial = Array.from($botoes).find(botao => {
            return Cypress.$(botao).text().trim() === 'Parcial';
          });

          if ($botaoParcial) {
            cy.wrap(Cypress.$($botaoParcial)).click({ force: true });
          } else {
            throw new Error('Nenhum botão "Parcial" encontrado');
          }
        });
      });
  }

  clicarBotaoBaixarNaPrimeiraLinhaComStatusBaixar() {
    // Aguarda o loading desaparecer e a tabela estar carregada
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    cy.get(ListagemContasAReceberLocators.tabelaVisivel, { timeout: 15000 }).should('be.visible');
    cy.get(ListagemContasAReceberLocators.linhaTabela, { timeout: 15000 })
      .should('have.length.greaterThan', 0);

    // Busca diretamente pelo botão usando o ID
    cy.get(ListagemContasAReceberLocators.botaoBaixarNaLinha, { timeout: 10000 })
      .first()
      .click({ force: true });
  }

  // ====== Ações de Dropdown nas Linhas ======

  abrirDropdownAcaoPrimeiraLinha() {
    // Verifica se há linhas na tabela antes de tentar abrir o dropdown
    cy.get(ListagemContasAReceberLocators.tabelaCompleta).then(($tbody) => {
      const linhas = $tbody.find('tr');
      if (linhas.length === 0) {
        cy.log('⚠️ Tabela vazia - teste será pulado');
        throw new Error('Tabela está vazia. Não há linhas para interagir.');
      }
    });
    // Quebra a chain completamente para evitar elementos detached do DOM
    // Primeiro encontra a linha e aguarda que esteja estável
    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .should('exist')
      .and('be.visible');
    // Aguarda que o dropdown esteja disponível e estável (substitui wait fixo)
    cy.get(ListagemContasAReceberLocators.primeiraLinhaTabela, { timeout: 10000 })
      .find(ListagemContasAReceberLocators.dropdownAcao)
      .should('exist')
      .and('be.visible')
      .first()
      .click();

    // Aguarda que o menu do dropdown esteja aberto antes de continuar
    cy.get(ListagemContasAReceberLocators.opcaoEditar, { timeout: 5000 })
      .should('be.visible');
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
    // Re-busca cada opção para evitar elementos detached
    cy.get(ListagemContasAReceberLocators.opcaoEditar, { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Editar');
    cy.get(ListagemContasAReceberLocators.opcaoDetalhes, { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Detalhes do título');
    cy.get(ListagemContasAReceberLocators.opcaoCancelar, { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Cancelar');
    cy.get(ListagemContasAReceberLocators.opcaoExcluir, { timeout: 5000 })
      .should('be.visible')
      .and('contain', 'Excluir');
  }

  selecionarOpcaoEditar() {
    this.abrirDropdownAcaoPrimeiraLinha();
    // Re-busca a opção para evitar elemento detached
    cy.get(ListagemContasAReceberLocators.opcaoEditar, { timeout: 5000 })
      .should('be.visible')
      .click();
  }

  selecionarOpcaoDetalhes() {
    this.abrirDropdownAcaoPrimeiraLinha();
    // Re-busca a opção para evitar elemento detached
    cy.get(ListagemContasAReceberLocators.opcaoDetalhes, { timeout: 5000 })
      .should('be.visible')
      .click();
  }

  selecionarOpcaoCancelar() {
    this.abrirDropdownAcaoPrimeiraLinha();
    // Re-busca a opção para evitar elemento detached
    cy.get(ListagemContasAReceberLocators.opcaoCancelar, { timeout: 5000 })
      .should('be.visible')
      .click();
  }

  selecionarOpcaoExcluir() {
    this.abrirDropdownAcaoPrimeiraLinha();
    // Re-busca a opção para evitar elemento detached
    cy.get(ListagemContasAReceberLocators.opcaoExcluir, { timeout: 5000 })
      .should('be.visible')
      .click();
  }

  // ====== Modais e Mensagens de Confirmação ======

  verificarModalErroBaixar() {
    // Valida que o modal de erro existe e está visível
    // Usa validação mais flexível - verifica que o modal existe e contém texto de erro
    cy.get(ListagemContasAReceberLocators.modalErroBaixar, { timeout: 5000 })
      .should('be.visible')
      .then(() => {
        // Verifica que há um título de erro visível
        cy.get(ListagemContasAReceberLocators.modalTituloErroBaixar, { timeout: 2000 })
          .should('be.visible')
          .and('not.be.empty');
      });
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
    cy.get(ListagemContasAReceberLocators.modalBotaoConfirmarExcluir).should('be.visible').click({ force: true });
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
    cy.get(ListagemContasAReceberLocators.pesquisarBtn).click();
  }
  validarValoresNaColunaValorParcela() {
    // Aguarda que o loading desapareça após filtrar
    cy.get(ListagemContasAReceberLocators.loading).should('not.exist');
    // Aguarda que a tabela esteja carregada
    cy.get(ListagemContasAReceberLocators.tabelaCompleta, { timeout: 10000 })
      .should('exist');

    // Valida valores em cada linha da tabela
    cy.get(ListagemContasAReceberLocators.linhaTabela).each(($row, index) => {
      // Busca todas as células da linha
      const $celulas = $row.find('td');

      // Verifica se a linha tem colunas suficientes (esperado 9 ou mais para ter o valor da parcela)
      if ($celulas.length >= 9) {
        // Pega a 9ª célula (índice 8, pois começa em 0) diretamente pelo índice
        const $celula = $celulas.eq(8);
        const valorTexto = $celula.text().trim();

        if (valorTexto) {
            const valor = valorTexto.replace(/\./g, '').replace(',', '.');
            expect(parseFloat(valor)).to.be.greaterThan(0, `Linha ${index}: Valor Parcela deve ser maior que 0,00`);
        }
      } else {
        // Loga apenas se a linha não tiver colunas suficientes, ajudando a identificar se pegou linha errada
        cy.log(`⚠️ Ignorando Linha ${index}: Tem apenas ${$celulas.length} colunas. (Provável linha de controle ou oculta)`);
      }
    });
  }

}

export default new ListagemContasAReceberPage();
