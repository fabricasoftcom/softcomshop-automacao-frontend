const ListagemContasLocators = {
  // Botões Principais
  buscarButton: '.btn.btn-warning.btn-sm i.fa-search', // Botão de busca
  novoCadastroButton: '.btn.btn-warning.btn-sm:contains("Novo cadastro")', // Botão de novo cadastro

  // Tabela de Contas
  tabelaContas: 'table.table', // Tabela principal
  tabelaLinhas: 'table tbody tr', // Linhas da tabela

  // Colunas da Tabela
  colunaNomeConta: 'td:nth-child(1)', // Nome da conta
  colunaAgencia: 'td:nth-child(2)', // Agência
  colunaNumeroConta: 'td:nth-child(3)', // Número da conta
  colunaStatus: 'td:nth-child(4)', // Status

  // Dropdown de Ações
  dropdownAcoes: 'td .dropdown button', // Botão do dropdown de ações
  opcoesDropdown: '.dropdown-menu.show li a', // Opções do dropdown
  opcaoEditar: '.dropdown-menu li a:contains("Editar")', // Opção "Editar"

  // Status da Conta
  statusAtiva: '.badge.label.label-primary:contains("Ativa")', // Status ativo

  // Paginação
  paginacao: '.pagination', // Componente de paginação
  paginaAnterior: '.pagination .page-item[aria-label="« Anterior"]', // Botão de página anterior
  proximaPagina: '.pagination .page-item[aria-label="Próxima »"]', // Botão de próxima página
  paginaAtiva: '.pagination .page-item.active', // Página ativa

  // Página de Cadastro
  paginaCadastroTitulo: 'h5:contains("Conta")', // Título da página de cadastro
};

export default ListagemContasLocators;
