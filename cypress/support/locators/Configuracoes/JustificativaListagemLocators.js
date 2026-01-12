const JustificativaListagemLocators = {
  // Título
  tituloListagem: 'h5',

  // Botões do Header
  btnPesquisaToggle: '.ibox-title a[href="#"]',
  btnNovoCadastro: 'a.btn.btn-warning[href*="/tipo-justificativa/novo"]',
  btnExcluirSelecionados: 'a.btn-danger.delete_all',

  // Formulário de Pesquisa (quando visível)
  containerFormPesquisa: '.form-pesquisa',
  formPesquisa: 'form',
  campoPesquisaDescricao: '#descricao',
  campoPesquisaRotinas: '#rotina',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabela: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',
  checkboxLinha: 'td:first-child input[type="checkbox"]',
  checkboxSelecionarTodos: 'thead input[type="checkbox"]',
  linkEditarLinha: 'td:nth-child(2) a',
  colunaCodigo: 'td:nth-child(3)',
  colunaDescricao: 'td:nth-child(4)',
  colunaRotinas: 'td:nth-child(5)',

  // Mensagens e Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',
};

export default JustificativaListagemLocators;

