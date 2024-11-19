// ListagemContasLocators.js
const ListagemContasLocators = {
    // Botões Principais
    buscarButton: '.btn.btn-warning.btn-sm i.fa-search',
    novoCadastroButton: '.btn.btn-warning.btn-sm:contains("Novo cadastro")',
  
    // Tabela de Contas
    tabelaContas: 'table.table',
    linhaTabela: 'table tbody tr',
  
    // Colunas da Tabela
    colunaNomeConta: 'td:nth-child(1)',
    colunaAgencia: 'td:nth-child(2)',
    colunaNumeroConta: 'td:nth-child(3)',
    colunaStatus: 'td:nth-child(4)',
  
    // Dropdown de Ações
    dropdownAcoes: 'button.dropdown-toggle',
    opcoesDropdown: '.dropdown-menu.show li a',
  
    // Status da Conta
    statusAtiva: '.badge.label.label-primary:contains("Ativa")',
    
    // Paginação
    paginacao: '.pagination',
    paginaAnterior: '.pagination .page-item[aria-label="« Anterior"]',
    proximaPagina: '.pagination .page-item[aria-label="Próxima »"]',
    paginaAtiva: '.pagination .page-item.active',
  };
  
  export default ListagemContasLocators;  