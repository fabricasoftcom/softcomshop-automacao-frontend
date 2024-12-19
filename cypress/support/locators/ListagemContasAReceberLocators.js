const ListagemContasAReceberLocators = {
  // Filtros e Controles de Pesquisa
  periodoSelect: 'select.form-control', // Seleciona o período
  tipoDataSelect: 'select.form-control:nth-child(2)', // Tipo de data
  statusSelect: 'select.form-control:nth-child(3)', // Status do filtro
  contaBancariaInput: '#autocomplete_bank_account', // Campo de conta bancária
  formaPagamentoInput: '#autocomplete_payment_methods', // Campo de forma de pagamento
  aplicarBtn: '.daterangepicker .applyBtn', // Botão "Aplicar" do modal
  pesquisarBtn: '.btn.btn-warning.btn-sm:contains("Pesquisar")', // Botão "Pesquisar"

  // Totalizadores
  totalizadoresRotulos: '.row .col-md-3 small', // Rótulos dos totalizadores
  totalizadoresValores: '.row .col-md-3 h2', // Valores dos totalizadores

  // Botões de Ações na Página Principal
  novoCadastroBtn: 'button:contains("Novo cadastro")', // Botão "Novo Cadastro"
  baixarSelecionadosBtn: 'button:contains("Baixar selecionados")', // Botão "Baixar Selecionados"

  // Tabela de Listagem
  tabelaCompleta: '.table tbody', // Tabela completa
  linhaTabela: '.table tbody tr:first-child', // Primeira linha da tabela

  // Células da Tabela para Verificação de Conteúdo
  celulaDataVencimento: 'td:nth-of-type(2)',
  celulaDescricao: 'td:nth-of-type(3)',
  celulaCliente: 'td:nth-of-type(4)',
  celulaCategoria: 'td:nth-of-type(5)',
  celulaValorParcela: 'td:nth-of-type(6)',
  celulaValorPago: 'td:nth-of-type(7)',
  celulaValorPendente: 'td:nth-of-type(8)',
  celulaStatus: 'td:nth-of-type(9)',
  celulaStatusPrimeiraLinha: '.table tbody tr:first-child td:nth-of-type(9)', // Célula de status na primeira linha

  // Ações na Linha da Tabela
  dropdownAcao: '#dropdown-basic', // Botão de dropdown de ações
  opcaoEditar: '.dropdown-menu .dropdown-item:contains("Editar")',
  opcaoDetalhes: '.dropdown-menu .dropdown-item:contains("Detalhes do título")',
  opcaoCancelar: '.dropdown-menu .dropdown-item:contains("Cancelar")',
  opcaoExcluir: '.dropdown-menu .dropdown-item:contains("Excluir")',

  // Status e Ações Específicas de Baixa
  linhaStatusParcial: '.table tbody tr:has(td:contains("Parcial"))', // Linha com status "Parcial"
  botaoParcialNaLinha: 'button.btn-success:contains("Parcial")', // Botão "Parcial" na linha com status "Parcial"
  linhaStatusBaixar: '.table tbody tr:has(td:contains("Baixar"))', // Linha com status "Baixar"
  botaoBaixarNaLinha: 'button.btn-warning:contains("Baixar")', // Botão "Baixar" na linha com status "Baixar"

  // Checkbox de Seleção
  checkboxPrimeiraLinha: '.table tbody tr:first-child .checkbox input', // Checkbox na primeira linha
  checkboxLinha: 'input[type="checkbox"].receive_check', // Checkbox em uma linha específica
  checkboxSelecionarTodos: 'input.receive_check_all', // Checkbox para selecionar todas as linhas

  // Modais de Erro e Confirmação
  modalErroBaixar: '.swal2-popup .swal2-error', // Modal de erro ao baixar
  modalTituloErroBaixar: '.swal2-title', // Título do modal de erro
  modalTituloCancelar: '#swal2-title', // Título do modal de confirmação ao cancelar
  modalCampoMotivo: '#reason', // Campo de texto para o motivo do cancelamento
  modalBotaoConfirmar: '.swal2-confirm', // Botão "Sim, tenho certeza!" no modal
  modalBotaoCancelar: '.swal2-cancel', // Botão "Não, desejo voltar!" no modal

  // Modal de Exclusão
  modalTituloExcluir: '.swal2-title', // Título do modal de exclusão
  modalBotaoConfirmarExcluir: '.swal2-confirm', // Botão "Excluir" no modal
  modalBotaoCancelarExcluir: '.swal2-cancel', // Botão "Voltar" no modal

  // Modal de Confirmação de Baixa
  modalTituloBaixar: '.swal2-title', // Título do popup de confirmação de baixa
  dropdownContaBaixa: '#conta_baixa_lote', // Dropdown de seleção de conta para baixa
  botaoConfirmarBaixa: '.swal2-confirm', // Botão "Sim, pode realizar a baixa!"
  botaoCancelarBaixa: '.swal2-cancel', // Botão "Não, desejo cancelar!"

  // Modal de Sucesso
  modalTituloSucesso: '.swal2-title', // Título do modal de sucesso
  modalMensagemSucesso: '#swal2-html-container', // Mensagem de sucesso no modal

  // Notificação de Sucesso
  notificacaoSucesso: '.Toastify__toast--success', // Toastify de sucesso

  periodoSelect: '.row > :nth-child(1).col-md-2 .form-group select.form-control',
};
export default ListagemContasAReceberLocators;