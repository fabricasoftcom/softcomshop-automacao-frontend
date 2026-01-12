const CartaoListagemLocators = {
  // Título
  tituloListagem: 'h5',

  // Botões do Header
  btnPesquisaToggle: '.ibox-title a[href="#"]',
  btnNovoCadastro: 'a.btn.btn-warning[href*="novo"], .ibox-title a.btn.btn-warning',
  btnNovoCadastroTexto: 'a, button', // Para busca por texto usando cy.contains
  btnExcluirSelecionados: 'a.btn-danger.delete_all',

  // Modal
  modal: '.modal, [role="dialog"]',

  // Formulário de Pesquisa (quando visível)
  containerFormPesquisa: '.form-pesquisa',
  formPesquisa: 'form',
  campoPesquisaNome: '#nome, input[name*="nome"]',
  campoPesquisaBandeira: '#bandeira, input[name*="bandeira"]',
  campoPesquisaAdquirente: '#adquirente, input[name*="adquirente"]',
  campoPesquisaAlias: '#alias, input[name*="alias"]',
  btnPesquisar: '#pesquisar',

  // Tabela
  tabela: 'table.table-hover',
  linhasTabela: 'table.table-hover tbody tr',
  checkboxLinha: 'td:first-child input[type="checkbox"]',
  checkboxSelecionarTodos: 'thead input[type="checkbox"]',
  linkEditarLinha: 'td:nth-child(2) a',
  colunaDescricao: 'td:nth-child(3)',
  colunaAlias: 'td:nth-child(4)',
  colunaAdquirente: 'td:nth-child(5)',
  colunaDia: 'td:nth-child(6)',
  colunaTaxaAdmin: 'td:nth-child(7)',
  colunaParcela: 'td:nth-child(8)',
  colunaBandeira: 'td:nth-child(9)',

  // Mensagens e Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',
};

export default CartaoListagemLocators;

