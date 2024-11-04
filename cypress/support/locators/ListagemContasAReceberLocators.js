const ListagemContasAReceberLocators = {
    // Locators principais, priorizando IDs e estruturas baseadas em hierarquia onde necessário
    periodoSelect: 'select.form-control[name]:eq(0)', // Seleciona o primeiro <select> com a classe 'form-control' para o período
    dataVencimentoInput: '#date_search',
    statusSelect: 'select.form-control[name]:eq(1)', // Seleciona o segundo <select> com a classe 'form-control' para o status
    autocompleteConta: '#autocomplete_bank_account',
    autocompleteContaAddOn: '#autocomplete_bank_account_addon',
    autocompleteFormaPagamento: '#autocomplete_payment_methods',
    autocompleteFormaPagamentoAddOn: '#autocomplete_payment_methods_addon',
    novoCadastroButton: 'button:contains("Novo cadastro")',
    realizarPagamentoButton: 'button:contains("Baixar selecionados")',
    marcarTodosCheckbox: '#1730466927072', // Id específico para checkbox de seleção de todos
    vencidasResumo: 'div:contains("Vencidas") h2',
    aReceberResumo: 'div:contains("A Receber") h2',
    recebidasResumo: 'div:contains("Recebidas") h2',
    totalPeriodoResumo: 'div:contains("Total do Período") h2',
  
    // Constante de períodos disponíveis para o filtro de período
    periodos: [
      { value: 'TODAY', label: 'Hoje' },
      { value: 'WEEK', label: 'Esta Semana' },
      { value: 'MONTH', label: 'Este Mês' },
      { value: 'SEMESTER', label: 'Este Semestre' },
      { value: 'YEAR', label: 'Este Ano' },
      { value: 'ALL', label: 'Todos' },
      { value: 'CUSTOM', label: 'Personalizado' }
    ]
  };
  
  export default ListagemContasAReceberLocators;
  