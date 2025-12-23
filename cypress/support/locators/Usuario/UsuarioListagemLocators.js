const UsuarioListagemLocators = {
  // Botões principais
  btnExcluirSelecionados: '#btn-excluir-selecionados',
  btnPesquisaToggle: 'a[href="#"]', // Link com ícone de pesquisa (toggle formulário)
  containerFormPesquisa: 'form', // Container do formulário de pesquisa

  // Formulário de pesquisa
  formPesquisa: 'form.form-horizontal',
  inputCodigo: '#id',
  inputNome: '#name',
  inputEmail: '#email',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabelaUsuarios: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',

  // Checkboxes
  checkboxSelecionarTodos: 'input[name="simplecheck[]"]',
  checkboxItens: 'input[name="simplecheck[]"]:not(.check_all)',

  // Links de edição
  linksEdicao: 'a[href*="/editar"]',

  // Título
  tituloListagem: 'h5'
};

export default UsuarioListagemLocators;

