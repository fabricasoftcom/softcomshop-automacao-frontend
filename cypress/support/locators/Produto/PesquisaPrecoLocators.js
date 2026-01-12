/**
 * Locators para Pesquisa Preço
 * ADR-0003: Locators separados dos Page Objects
 * ADR-0015: Priorizar IDs quando disponíveis e usar contexto (modal)
 */
const PesquisaPrecoLocators = {
  // Modal
  modal: '.modal',

  // Campo de busca (dentro do modal)
  campoBusca: '.modal input#produto',

  // Título
  tituloModal: '.modal h2', // "Pesquise o preço do item"
  tituloProdutos: '.modal h5', // Usar cy.contains('.modal h5', 'Produtos')

  // Tabela de produtos
  tabela: '.modal .table.table-hover.venda',
  linhasTabela: '.modal .table.table-hover.venda tbody tr',
  primeiraLinha: '.modal .table.table-hover.venda tbody tr:first-child',

  // Seção de detalhes
  secaoDetalhes: '.modal h5', // Usar cy.contains('.modal h5', 'Detalhes')
  preco: '.modal h1.product-main-price',
  precoPromocao: '.modal h1', // Segundo h1 na seção de detalhes

  // Botão
  botaoVoltar: '.modal .btn.btn-default.pull-right.close-modal',

  // Mensagem informativa
  mensagemNavegacao: '.modal .text-center', // "Navegue nos itens da listagem usando as setas do teclado..."
};

export default PesquisaPrecoLocators;

