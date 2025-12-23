const ListagemContasAReceberLocators = {
  // Filtros e Controles de Pesquisa
  periodoSelect: '#periodo', // Seleciona o período
  tipoDataSelect: 'select.form-control:nth-child(2)', // Tipo de data
  statusSelect: 'select.form-control:nth-child(3)', // Status do filtro
  contaBancariaInput: '#autocomplete_bank_account', // Campo de conta bancária
  formaPagamentoInput: '#autocomplete_payment_methods', // Campo de forma de pagamento
  aplicarBtn: '.daterangepicker .applyBtn', // Botão "Aplicar" do modal
  pesquisarBtn: '#pesquisar', // Botão "Pesquisar"

  // Totalizadores
  totalizadoresRotulos: '.row .col-md-3 small', // Rótulos dos totalizadores
  totalizadoresValores: '.row .col-md-3 h2', // Valores dos totalizadores

  // Botões de Ações na Página Principal
  novoCadastroBtn: 'button:contains("Novo cadastro")', // Botão "Novo Cadastro"
  baixarSelecionadosBtn: 'button:contains("Baixar selecionados")', // Botão "Baixar Selecionados"

  // Tabela de Listagem
  tabelaCompleta: '.ibox-content .table tbody', // Tabela completa
  tabelaVisivel: '#tabela-contas-a-receber, .table tbody', // Tabela visível (com fallback)
  linhaTabela: '.ibox-content .table tbody tr', // Todas as linhas da tabela (usar com filtro manual)
  primeiraLinhaTabela: '.ibox-content .table tbody tr:first-child', // Primeira linha da tabela
  loading: '#loading', // Indicador de carregamento

  // Células da Tabela para Verificação de Conteúdo
  // NOTA: A primeira coluna é o checkbox, então as colunas de dados começam na 2ª
  celulaDataVencimento: 'td:nth-of-type(2)', // 2ª coluna (após checkbox)
  celulaDescricao: 'td:nth-of-type(3)', // 3ª coluna
  celulaCliente: 'td:nth-of-type(4)', // 4ª coluna
  celulaCategoria: 'td:nth-of-type(5)', // 5ª coluna
  celulaValorParcela: 'td:nth-child(9)', // 9ª coluna (usando nth-child pois funciona com tbody > :nth-child(1) > :nth-child(9))
  celulaValorPago: 'td:nth-of-type(10)', // 10ª coluna
  celulaValorPendente: 'td:nth-of-type(11)', // 11ª coluna
  celulaStatus: 'td:nth-of-type(12)', // 12ª coluna (Status) - baseado na navegação autônoma que identificou 13 colunas
  celulaStatusPrimeiraLinha: '.table tbody tr:first-child .btn', // Célula de status na primeira linha

  // Ações na Linha da Tabela
  dropdownAcao: 'td:last-child .dropdown, td .dropdown-toggle', // Botão de dropdown de ações (última coluna ou qualquer dropdown na linha)
  opcaoEditar: '.dropdown-menu .dropdown-item:contains("Editar")',
  opcaoDetalhes: '.dropdown-menu .dropdown-item:contains("Detalhes do título")',
  opcaoCancelar: '.dropdown-menu .dropdown-item:contains("Cancelar")',
  opcaoExcluir: '.dropdown-menu .dropdown-item:contains("Excluir")',

  // Status e Ações Específicas de Baixa
  // NOTA: :has() não é suportado pelo Cypress - usar métodos helpers em vez de locators diretos
  botaoParcialNaLinha: 'button.btn-success:contains("Parcial")', // Botão "Parcial" na linha com status "Parcial"
  botaoParcialIdDinamico: 'button[id^="status-parcial-contas-a-receber-"]', // Botão "Parcial" usando ID dinâmico (se existir)
  botaoBaixarNaLinha: 'button[id^="status-baixar-contas-a-receber-"]', // Botão "Baixar" usando ID dinâmico
  botaoParcialFallback: 'button.btn-success', // Botão "Parcial" fallback (classe btn-success)
  // NOTA: celulaStatus já está definido acima (linha 33), removida duplicação

  // Checkbox de Seleção
  checkboxPrimeiraLinha: '.table tbody tr:first-child .checkbox input', // Checkbox na primeira linha
  checkboxLinha: 'input[type="checkbox"].check_financeiro_parcela', // Checkbox em uma linha específica (corrigido classe)
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
};
export default ListagemContasAReceberLocators;
