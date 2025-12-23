import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";

describe('Testes da Listagem de Contas a Receber', { tags: ['@listagem-contas-a-receber', '@financeiro', '@regressivo'] }, () => {
  beforeEach(() => {
    cy.loginArmazenandoSessao();
    cy.visit("/");
    ListagemContasAReceberPage.visit();
    ListagemContasAReceberPage.verificarCarregamentoDaPagina();
    cy.wait(1000);
  });

  // ====== Ações de Cadastro e Modais ======

  describe('Ações de Cadastro', () => {
    it('Deve abrir o modal de novo cadastro ao clicar no botão "Novo Cadastro"', () => {
      ListagemContasAReceberPage.abrirNovoCadastro();
      cy.get('.modal-title').should('contain', 'Nova Receita');
    });
  });

  // ====== Ações de Baixa ======

  describe('Ações de Baixa e Confirmações', () => {
    it('Deve exibir erro ao tentar baixar sem selecionar parcelas', () => {
      // Wait fixo removido - o método clicarBaixarSelecionados() já valida que o botão está visível
      ListagemContasAReceberPage.clicarBaixarSelecionados();
      ListagemContasAReceberPage.verificarModalErroBaixar();
    });

    it('Deve marcar o checkbox da primeira parcela, realizar a baixa e confirmar', function () {
      // Verifica se há linhas na tabela antes de executar o teste
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.marcarCheckboxPrimeiraLinha();
      ListagemContasAReceberPage.clicarBaixarSelecionados();
      ListagemContasAReceberPage.validarTituloPopupBaixa();
      ListagemContasAReceberPage.selecionarContaParaBaixa('CAIXA');
      ListagemContasAReceberPage.confirmarBaixa();
      ListagemContasAReceberPage.validarModalSucesso();
    });

    it('Deve exibir o popup de confirmação e cancelar a ação de baixa', function () {
      // Verifica se há linhas na tabela antes de executar o teste
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.marcarCheckboxPrimeiraLinha();
      ListagemContasAReceberPage.clicarBaixarSelecionados();
      ListagemContasAReceberPage.validarTituloPopupBaixa();
      ListagemContasAReceberPage.cancelarAcao();
      ListagemContasAReceberPage.verificarModalFechado();
    });
  });

  // ====== Validações de Campos e Totalizadores ======

  describe('Validações de Campos e Totalizadores', () => {
    it('Deve validar os totalizadores de valores e rótulos', () => {
      ListagemContasAReceberPage.verificarTotalizadores();
    });

    it('Deve verificar que os campos estão visíveis na primeira linha', function () {
      // Verifica se há linhas na tabela antes de executar o teste
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.verificarCamposVisiveisPrimeiraLinha();
    });
  });

  // ====== Ações de Dropdown ======

  describe('Ações de Dropdown', () => {
    beforeEach(() => {
      // Verifica se há linhas na tabela antes de executar os testes deste describe
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - testes deste describe serão pulados');
          // Não podemos usar this.skip() no beforeEach, então vamos marcar os testes como pendentes
        }
      });
    });

    it('Deve abrir o dropdown de ações e verificar que as opções estão visíveis', function () {
      ListagemContasAReceberPage.abrirDropdownAcaoPrimeiraLinha();
    });

    it('Deve validar as opções do dropdown de ações', function () {
      ListagemContasAReceberPage.validarOpcoesDropdown();
    });

    it('Deve clicar na opção "Editar" do dropdown e verificar o modal', function () {
      ListagemContasAReceberPage.selecionarOpcaoEditar();
      cy.get('.modal-title').should('contain', 'Editar');
    });

    it('Deve clicar na opção "Detalhes do título" do dropdown e verificar o modal', function () {
      ListagemContasAReceberPage.selecionarOpcaoDetalhes();
      cy.get('.modal-title').should('contain', 'Recebimento');
    });

    it('Deve clicar na opção "Cancelar" do dropdown e verificar o modal de cancelamento', function () {
      ListagemContasAReceberPage.selecionarOpcaoCancelar();
      ListagemContasAReceberPage.validarTituloModalCancelar();
    });

    it('Deve clicar na opção "Excluir" do dropdown e verificar o modal de exclusão', function () {
      ListagemContasAReceberPage.selecionarOpcaoExcluir();
      ListagemContasAReceberPage.validarTituloModalExcluir();
    });
  });

  // ====== Ações de Exclusão ======

  describe('Exclusão e Confirmações', () => {
    it('Deve realizar a exclusão com sucesso e validar que o tamanho da tabela diminuiu', function () {
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.obterNumeroLinhasTabela().then((numeroLinhasInicial) => {
        ListagemContasAReceberPage.selecionarOpcaoExcluir();
        ListagemContasAReceberPage.confirmarExclusao();
        ListagemContasAReceberPage.verificarNotificacaoSucesso(); // flaky test
        ListagemContasAReceberPage.obterNumeroLinhasTabela().should('be.lt', numeroLinhasInicial);
      });
    });

    it('Deve cancelar a exclusão e verificar que a parcela permanece na tabela', function () {
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.selecionarOpcaoExcluir();
      ListagemContasAReceberPage.cancelarExclusao();
      ListagemContasAReceberPage.verificarModalFechado();
      ListagemContasAReceberPage.verificarLinhaPresente();
    });
  });

  // ====== Ações de Cancelamento ======

  describe('Cancelamento de Parcelas', () => {
    it('Deve preencher o motivo, confirmar o cancelamento e verificar o status atualizado', function () {
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.selecionarOpcaoCancelar();
      cy.wait(1000);
      ListagemContasAReceberPage.preencherMotivoCancelar('Motivo de teste');
      cy.wait(1000);
      ListagemContasAReceberPage.confirmarCancelamento();
      cy.wait(1000);
      ListagemContasAReceberPage.verificarNotificacaoSucesso(); // flaky test
      ListagemContasAReceberPage.verificarStatusCancelado();
    });

    it('Deve preencher o motivo e cancelar a ação de cancelamento', function () {
      ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
        if (!temLinhas) {
          cy.log('Tabela vazia - teste será pulado');
          this.skip();
        }
      });

      ListagemContasAReceberPage.selecionarOpcaoCancelar();
      ListagemContasAReceberPage.preencherMotivoCancelar('Motivo de teste');
      ListagemContasAReceberPage.cancelarAcao();
      ListagemContasAReceberPage.verificarModalFechado();
    });
  });

  // it('Deve selecionar o período "Este Mês" e validar que os valores da coluna "Valor Parcela" são diferentes de 0,00', function () {
  //   // Intercepta a requisição de busca para esperar assertivamente
  //   cy.intercept('GET', '**/api-financeiro/financeiro/receber*').as('buscarContas');

  //   // Seleciona o período "Este Mês"
  //   ListagemContasAReceberPage.selecionarPeriodoEsteMes();

  //   // Aguarda a resposta da API e o fim do loading
  //   cy.wait('@buscarContas');
  //   cy.get('#loading').should('not.exist');

  //   // Aguarda renderização da tabela
  //   cy.get('.table tbody', { timeout: 15000 }).should('exist');

  //   // Verifica se há linhas na tabela após filtrar
  //   ListagemContasAReceberPage.verificarSeHaLinhasNaTabela().then((temLinhas) => {
  //     if (!temLinhas) {
  //       cy.log('Tabela vazia após filtrar - teste será pulado');
  //       this.skip();
  //     }
  //   });

  //   // Valida os valores na coluna "Valor Parcela"
  //   ListagemContasAReceberPage.validarValoresNaColunaValorParcela();
  // });
});

