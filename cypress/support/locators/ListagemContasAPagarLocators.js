const ListagemContasAPagarLocators = {
    // Botões principais
    novoCadastroBtn: 'button:contains("Novo cadastro")',
    baixarSelecionadosBtn: 'button:contains("Baixar selecionados")',
  
    // Filtros
    seletorPeriodo: '#1731327095430',
    seletorTipoData: '#1731327095436',
    campoBuscaConta: '#autocomplete_bank_account',
    botaoBuscarConta: '#autocomplete_bank_account_addon',
    
    // Tabela de despesas
    checkboxSelecionarTodos: '.receive_check_all',
    linhaTabela: 'table tbody tr',
    checkboxLinha: '.receive_check',
    celulaDataVencimento: 'td:nth-child(2)',
    celulaDescricao: 'td:nth-child(3)',
    celulaFornecedor: 'td:nth-child(4)',
    celulaCategoria: 'td:nth-child(5)',
    celulaValorParcela: 'td:nth-child(6)',
    celulaValorPago: 'td:nth-child(7)',
    celulaValorPendente: 'td:nth-child(8)',
    celulaStatus: 'td:nth-child(9)',
    botaoBaixar: 'button:contains("Baixar")',
    
    // Dropdown de ações
    dropdownAcao: '.dropdown-toggle',
    opcaoEditar: '.dropdown-menu a:contains("Editar")',
    opcaoExcluir: '.dropdown-menu a:contains("Excluir")',
  
    // Modal e notificações
    modalConfirmarBaixa: '.modal-content .btn-primary',
    notificacaoSucesso: '.Toastify__toast--success',
    quantidadeLancamentos: 'h6:contains("Quantidade de Lançamentos")',
    quantidadeLancamentosSelecionados: '#installment_selected'
  };
  
  export default ListagemContasAPagarLocators;
  