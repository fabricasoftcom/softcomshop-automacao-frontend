const ListagemContasAReceberLocators = {
  // Selectores da página de Listagem de Contas a Receber
  periodoSelect: 'select.form-control', // Seleciona o período
  tipoDataSelect: 'select.form-control:nth-child(2)', // Tipo de data
  statusSelect: 'select.form-control:nth-child(3)', // Status do filtro
  contaBancariaInput: '#autocomplete_bank_account', // Campo de conta bancária
  formaPagamentoInput: '#autocomplete_payment_methods', // Campo de forma de pagamento
  aplicarBtn: '.daterangepicker .applyBtn', // Botão "Aplicar" do modal
  pesquisarBtn: '.btn.btn-warning.btn-sm:contains("Pesquisar")', // Botão "Pesquisar"
  totalizadoresRotulos: '.row .col-md-3 small', // Rótulos dos totalizadores
  totalizadoresValores: '.row .col-md-3 h2', // Valores dos totalizadores
  modalErroBaixar: '.swal2-popup .swal2-error',           // Exemplo de classe para o modal de erro
  modalTituloErroBaixar: '.swal2-title',                  // Título do modal de erro
  novoCadastroBtn: 'button:contains("Novo cadastro")', // Botão "Novo Cadastro"
  baixarSelecionadosBtn: 'button:contains("Baixar selecionados")', // Botão "Baixar Selecionados"



  // Itens do dropdown de ações
  opcaoEditar: '.dropdown-menu .dropdown-item:contains("Editar")',
  opcaoDetalhes: '.dropdown-menu .dropdown-item:contains("Detalhes do título")',
  opcaoCancelar: '.dropdown-menu .dropdown-item:contains("Cancelar")',
  opcaoExcluir: '.dropdown-menu .dropdown-item:contains("Excluir")',

  // Seletores de células específicas na linha
  celulaData: 'td:nth-child(4)', // Data
  celulaCliente: 'td:nth-child(6)', // Cliente
  celulaCategoria: 'td:nth-child(7)', // Categoria
  celulaValor: 'td:nth-child(10)', // Valor

  linhaTabela: '.table tbody tr:first-child', // Seleciona a primeira linha do <tbody>

  // Checkbox na primeira linha
  checkboxPrimeiraLinha: '.table tbody tr:first-child .checkbox input',

  // Botão "Baixar" na linha (fora do dropdown)
  botaoBaixarLinha: '.table tbody tr:first-child button.btn-warning.btn-xs:not(.dropdown-toggle)',

  // Botão de dropdown de ações na linha
  dropdownAcao: '#dropdown-basic',

  // Células para verificar visibilidade dos campos
  celulaDataVencimento: 'td:nth-of-type(2)',
  celulaDescricao: 'td:nth-of-type(3)',
  celulaCliente: 'td:nth-of-type(4)',
  celulaCategoria: 'td:nth-of-type(5)',
  celulaValorParcela: 'td:nth-of-type(6)',
  celulaValorPago: 'td:nth-of-type(7)',
  celulaValorPendente: 'td:nth-of-type(8)',
  celulaStatus: 'td:nth-of-type(9)',

  // Checkbox para selecionar todas as linhas
  checkboxSelecionarTodos: 'input.receive_check_all',

  // Locators específicos para o modal de confirmação ao cancelar
  modalTituloCancelar: '.swal2-title',  // Título do modal de confirmação
  modalCampoMotivo: '#reason',          // Campo de texto para o motivo
  modalBotaoConfirmar: '.swal2-confirm', // Botão "Sim, tenho certeza!"
  modalBotaoCancelar: '.swal2-cancel',  // Botão "Não, deseja voltar!"

    // Locators específicos para o modal de exclusão
    modalTituloExcluir: '.swal2-title',             // Título do modal de exclusão
    modalBotaoConfirmarExcluir: '.swal2-confirm',   // Botão "Excluir" no modal
    modalBotaoCancelarExcluir: '.swal2-cancel' ,     // Botão "Voltar" no modal

    // Locators específicos para o popup de confirmação de baixa
  modalTituloBaixar: '.swal2-title',                        // Título do popup
  dropdownContaBaixa: '#conta_baixa_lote',                  // Dropdown de seleção de conta para baixa
  botaoConfirmarBaixa: '.swal2-confirm',                    // Botão "Sim, pode realizar a baixa!"
  botaoCancelarBaixa: '.swal2-cancel',                      // Botão "Não, desejo cancelar!"

   // Locators para o modal de sucesso após confirmação
   modalTituloSucesso: '.swal2-title',                       // Título do modal de sucesso
   modalMensagemSucesso: '#swal2-html-container' ,           // Mensagem de sucesso no modal


      // Toastify de sucesso (usado para ambas as confirmações)
  notificacaoSucesso: '.Toastify__toast--success',
  // Locator da tabela de listagem
  tabelaCompleta:'.table tbody',
  // Locator para a célula de status da primeira linha
  celulaStatusPrimeiraLinha: '.table tbody tr:first-child td:nth-of-type(9)' // Exemplo de posição para a célula de status
};

export default ListagemContasAReceberLocators;