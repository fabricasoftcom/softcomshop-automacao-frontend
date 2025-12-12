const EmpresaListagemLocators = {
  // Botões principais
  btnNovo: '#btn-novo',
  btnExcluirSelecionados: '#btn-excluir-selecionados',
  btnPesquisaToggle: 'a[href="#"]', // Link com ícone de pesquisa (toggle formulário)
  containerFormPesquisa: '.form-pesquisa', // Container do formulário de pesquisa

  // Formulário de pesquisa
  formPesquisa: '#form-empresa',
  inputCnpj: '#cnpj',
  inputNome: '#nome',
  inputFantasia: '#fantasia',
  inputRazaoSocial: '#razao_social',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabelaEmpresas: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',

  // Checkboxes
  checkboxSelecionarTodos: 'input.check_all[name="simplecheck[]"]',
  checkboxItens: 'input[name="simplecheck[]"]:not(.check_all)',

  // Links de edição
  linksEdicao: 'a.button-tab.button-edit.fa.fa-edit',

  // Paginação (se houver)
  paginacao: '.pagination',
  paginacaoPaginas: '.pagination .page-item',
  paginacaoAtiva: '.pagination .page-item.active .page-link',
  paginacaoProxima: '.pagination .page-item a[rel="next"]'
};

export default EmpresaListagemLocators;

