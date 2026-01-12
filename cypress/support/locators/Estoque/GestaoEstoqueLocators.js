/**
 * Locators para Gestão de Estoque
 * ADR-0003: Locators separados dos Page Objects
 * ADR-0015: Priorizar IDs quando disponíveis
 */
const GestaoEstoqueLocators = {
  // Título
  titulo: 'h5',

  // Links de navegação
  linkVisaoGeral: '#btn-visao-geral',
  linkListaCompras: '#btn-lista-compra',

  // Formulário de filtros
  selectPeriodoVendas: '#periodo_vendas',
  inputPeriodo: '#data',
  selectStatus: '#status',
  inputPesquisa: '#palavra_chave',
  selectGrupos: '#grupos_lista',
  selectFabricantes: '#fabricantes_lista',
  selectFornecedores: '#fornecedores_lista',

  // Botões
  btnPesquisar: '#pesquisar',

  // Mensagem quando não há filtros
  mensagemVazia: '.text-center', // "Preencha os filtros acima para receber as informações desejadas."

  // Tabela de resultados (quando houver)
  tabela: '.table, table',
  linhasTabela: 'tbody tr',
};

export default GestaoEstoqueLocators;

