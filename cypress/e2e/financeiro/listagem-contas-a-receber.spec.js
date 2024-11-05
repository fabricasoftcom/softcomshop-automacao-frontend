import ListagemContasAReceberPage from "../../support/pages/Financeiro/ListagemContasAReceberPage";

describe('Testes da Listagem de Contas a Receber', () => {
  beforeEach(() => {
    cy.login();
    ListagemContasAReceberPage.visit();
    // Aguarda até que o título "Receita" esteja visível na página
    ListagemContasAReceberPage.verificarCarregamentoDaPagina(); // Verifica o carregamento da página
  });

  it('Deve abrir o modal de novo cadastro ao clicar no botão "Novo Cadastro"', () => {
    ListagemContasAReceberPage.abrirNovoCadastro();
    cy.get('.modal-title').should('contain', 'Nova Receita');
  });

  it('Deve exibir erro ao tentar baixar sem selecionar parcelas', () => {
    ListagemContasAReceberPage.clicarBaixarSelecionados();
    ListagemContasAReceberPage.verificarModalErroBaixar();
  });
  it('Deve marcar o checkbox da primeira parcela, clicar em "Baixar Selecionados", selecionar uma conta e confirmar a baixa', () => {
    // Marca o checkbox da primeira parcela
    ListagemContasAReceberPage.marcarPrimeiraParcela();

    // Clica no botão "Baixar Selecionados"
    ListagemContasAReceberPage.clicarBaixarSelecionados();

    // Verifica o título do popup de confirmação de baixa
    ListagemContasAReceberPage.validarTituloPopupBaixa();

    // Seleciona uma conta para a baixa (exemplo: "CAIXA")
    ListagemContasAReceberPage.selecionarContaParaBaixa('CAIXA');

    // Confirma a baixa
    ListagemContasAReceberPage.confirmarBaixa();

    // Valida o modal de sucesso com o título e a mensagem correta
    ListagemContasAReceberPage.validarModalSucesso();
  });

  it('Deve exibir o popup de confirmação e cancelar a ação de baixa', () => {
    // Marca o checkbox da primeira parcela
    ListagemContasAReceberPage.marcarPrimeiraParcela();

    // Clica no botão "Baixar Selecionados"
    ListagemContasAReceberPage.clicarBaixarSelecionados();

    // Verifica o título do popup de confirmação de baixa
    ListagemContasAReceberPage.validarTituloPopupBaixa();

    // Clica no botão de "Cancelar" no popup
    ListagemContasAReceberPage.cancelarBaixa();

    // Verifica que o modal foi fechado
    ListagemContasAReceberPage.verificarModalFechado();
  });

  it('Deve validar os totalizadores de valores e rótulos', () => {
    ListagemContasAReceberPage.verificarTotalizadores();
  });

  it('Deve marcar o checkbox da primeira linha', () => {
    ListagemContasAReceberPage.marcarCheckboxPrimeiraLinha();
  });

  it('Deve clicar no botão "Baixar" da primeira linha', () => {
    ListagemContasAReceberPage.clicarBotaoBaixarPrimeiraLinha();
  });

  it('Deve abrir o dropdown de ações e verificar as opções estão visíveis', () => {
    ListagemContasAReceberPage.abrirDropdownAcaoPrimeiraLinha();
    // Verifica se as opções do dropdown foram exibidas
    cy.get('.dropdown-menu .dropdown-item').should('be.visible');
  });

  it('Deve verificar que os campos estão visíveis na primeira linha', () => {
    ListagemContasAReceberPage.verificarCamposVisiveisPrimeiraLinha();
  });
  it('Deve validar as opções do dropdown de ações', () => {
    // Valida que todas as opções do dropdown estão presentes e visíveis
    ListagemContasAReceberPage.validarOpcoesDropdown();
  });
  it('Deve clicar na opção "Editar" do dropdown e verificar a ação', () => {
    ListagemContasAReceberPage.selecionarOpcaoEditar();
    // Validação esperada após clicar em "Editar"
    cy.get('.modal-title').should('contain', 'Editar'); // Exemplo de verificação de modal de edição
  });

  it('Deve clicar na opção "Detalhes do título" do dropdown e verificar a ação', () => {
    ListagemContasAReceberPage.selecionarOpcaoDetalhes();
    // Validação esperada após clicar em "Detalhes do título"
    cy.get('.modal-title').should('contain', 'Recebimento'); // Exemplo de verificação de modal de detalhes
  });

  it('Deve clicar na opção "Cancelar" do dropdown e verificar a ação', () => {
    ListagemContasAReceberPage.selecionarOpcaoCancelar();
    // Validação esperada após clicar em "Cancelar"
    ListagemContasAReceberPage.validarTituloModalCancelar();
  });

  it('Deve clicar na opção "Excluir" do dropdown e verificar a ação', () => {
    ListagemContasAReceberPage.selecionarOpcaoExcluir();
    ListagemContasAReceberPage.validarTituloModalExcluir();
  });

  it('Deve confirmar a exclusão e verificar a remoção da parcela', () => {
    ListagemContasAReceberPage.selecionarOpcaoExcluir();
    ListagemContasAReceberPage.confirmarExclusao(); // Confirma a exclusão

    // Verifica que uma notificação de sucesso foi exibida
    ListagemContasAReceberPage.verificarNotificacaoSucesso();

    // Verifica que a linha da parcela foi removida da tabela
    ListagemContasAReceberPage.verificarRemocaoDaLinha();
  });

  it('Deve cancelar a exclusão e verificar que a parcela permanece na tabela', () => {
    ListagemContasAReceberPage.selecionarOpcaoExcluir();
    ListagemContasAReceberPage.cancelarExclusao(); // Cancela a exclusão

    // Verifica que o modal foi fechado e a linha da tabela ainda está presente
    ListagemContasAReceberPage.verificarModalFechado();
    ListagemContasAReceberPage.verificarLinhaPresente(); // Verifica que a linha ainda existe
  });

  it('Deve preencher o motivo, confirmar o cancelamento e verificar o status', () => {
    ListagemContasAReceberPage.selecionarOpcaoCancelar();
    ListagemContasAReceberPage.preencherMotivoCancelar('Motivo de teste'); // Preenche o motivo
    ListagemContasAReceberPage.confirmarCancelamento(); // Confirma o cancelamento

    // Verifica que uma notificação de sucesso foi exibida
    ListagemContasAReceberPage.verificarNotificacaoSucesso();

    // Verifica que o status da parcela foi atualizado para "Cancelada"
    ListagemContasAReceberPage.verificarStatusCancelado(); 
  });

  it('Deve preencher o motivo e cancelar a ação de cancelamento', () => {
    ListagemContasAReceberPage.selecionarOpcaoCancelar();
    ListagemContasAReceberPage.preencherMotivoCancelar('Motivo de teste'); // Preenche o motivo
    ListagemContasAReceberPage.cancelarAcao(); // Cancela a ação

    // Verifica que o modal fechou e nenhuma ação foi realizada
    ListagemContasAReceberPage.verificarModalFechado();
  });
});
