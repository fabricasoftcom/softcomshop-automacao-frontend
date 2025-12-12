const FuncionarioListagemLocators = {
  // Botões principais
  btnNovo: '#btn-novo',
  btnExcluirSelecionados: '#btn-excluir-selecionados',
  btnPesquisaToggle: 'a[href="#"]', // Link com ícone de pesquisa (toggle formulário)
  containerFormPesquisa: 'form.form-horizontal', // Container do formulário de pesquisa

  // Formulário de pesquisa
  formPesquisa: 'form.form-horizontal',
  inputCodigo: '#id',
  inputNome: '#nome',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabelaFuncionarios: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',

  // Checkboxes
  checkboxSelecionarTodos: 'input.check_all[name="simplecheck[]"]',
  checkboxItens: 'input[name="simplecheck[]"]:not(.check_all)',

  // Links de edição
  linksEdicao: 'a[href*="/editar"]',

  // Paginação (se houver)
  paginacao: '.pagination',
  paginacaoPaginas: '.pagination .page-item',
  paginacaoAtiva: '.pagination .page-item.active .page-link',
  paginacaoProxima: '.pagination .page-item a[rel="next"]'
};

export default FuncionarioListagemLocators;

