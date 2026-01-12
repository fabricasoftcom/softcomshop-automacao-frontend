// FluxoCaixaLocators.js
// Locators para a tela de Fluxo de Caixa
const FluxoCaixaLocators = {
  // Título
  titulo: 'h5',

  // Formulário de Pesquisa
  campoPeriodo: '#data',
  btnPesquisar: '#btn-pesquisar',
  form: 'form',

  // Botão Gerar PDF
  btnGerarPdf: '#gerar-pdf',

  // Cards de Resumo (usar cy.contains() no Page Object)
  cardHeading: 'h3',

  // Tabela Principal
  tabela: 'table',
  tabelaHeader: 'table thead',
  tabelaBody: 'table tbody',
  linhasTabela: 'table tbody tr',

  // Loading
  loading: '#loading',
};

export default FluxoCaixaLocators;

