const FormaPagamentoListagemLocators = {
  // Título
  tituloListagem: 'h5',

  // Botões do Header
  btnPesquisaToggle: '.ibox-title a[href="#"]',
  btnNovoCadastro: 'a.btn.btn-warning:contains("Novo"), a.btn.btn-warning[href*="novo"]',
  btnNovoCadastroTexto: 'a, button', // Para busca por texto usando cy.contains
  btnEditarTodo: 'a.btn.btn-info, button.btn-info',
  btnExcluirSelecionados: 'a.btn-danger.delete_all',

  // Modal
  modal: '.modal, [role="dialog"]',

  // Formulário de Pesquisa (quando visível)
  containerFormPesquisa: '.form-pesquisa',
  formPesquisa: 'form',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabela: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',
  checkboxLinha: 'td:first-child input[type="checkbox"]',
  checkboxSelecionarTodos: 'thead input[type="checkbox"]',
  linkEditarLinha: 'td:nth-child(2) a',
  colunaCodigo: 'td:nth-child(3)',
  colunaNome: 'td:nth-child(4)',
  colunaTipo: 'td:nth-child(5)',
  colunaPos: 'td:nth-child(6)',
  colunaIntegrarApi: 'td:nth-child(7)',
  colunaExibirPagamento: 'td:nth-child(8)',
  colunaPreVenda: 'td:nth-child(9)',
  colunaSaldoCaixa: 'td:nth-child(10)',
  colunaAtalhoNumero: 'td:nth-child(11)',

  // Mensagens e Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',
};

export default FormaPagamentoListagemLocators;

