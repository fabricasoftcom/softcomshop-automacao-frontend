// CategoriasLocators.js
const CategoriasLocators = {
  // Página de listagem
  tituloPagina: 'h5:contains("Categorias")',
  botaoVoltar: '.btn-category-voltar',

  // Seções
  secaoReceita: '.pull-left:contains("Categorias de Receita")',
  secaoDespesa: '.pull-left:contains("Categorias de Despesa")',

  // Botões de nova categoria
  botaoNovaCategoriaReceita: 'button.btn-warning:contains("Nova Categoria de Receita")',
  botaoNovaCategoriaDespesa: 'button.btn-warning:contains("Nova Categoria de Despesa")',

  // Filtros de Receita
  filtroReceitaTodas: '#button-revenue-todas',
  filtroReceitaAtivas: '#button-revenue-ativas',
  filtroReceitaInativas: '#button-revenue-inativas',

  // Filtros de Despesa
  filtroDespesaTodas: '#button-cost-todas',
  filtroDespesaAtivas: '#button-cost-ativas',
  filtroDespesaInativas: '#button-cost-inativas',

  // Botões de ação em massa - Receita
  botaoReceitaDesativar: '#button-revenue-desativar',
  botaoReceitaAtivar: '#button-revenue-ativar',

  // Botões de ação em massa - Despesa
  botaoDespesaDesativar: '#button-cost-desativar',
  botaoDespesaAtivar: '#button-cost-ativar',

  // Modal de cadastro
  modal: '.modal.in',
  modalContent: '#content-plus',
  modalTitulo: '#content-plus .modal-header, #content-plus [class*="modal-title"], #content-plus:contains("Nova categoria")',

  // Campos do formulário
  campoDescricao: 'input[placeholder*="Ex."]:visible, input[placeholder*="Receita de Vendas"]:visible, input[placeholder*="Despesa"]:visible',
  campoMostrarDentroDe: '#autocomplete_category',
  campoContaDRE: '#autocomplete_account-Dre',
  checkboxNaoExibirDRE: '#content-plus input[type="checkbox"], #content-plus label:contains("Não Exibir DRE") input',

  // Botões do modal
  botaoSalvar: '.modal button.btn-primary:contains("Salvar")',
  botaoVoltarModal: '.modal button.btn-default:contains("Voltar")',
  botaoVoltarDescricaoOriginal: 'button:contains("Voltar para descrição original")',
  botaoFecharModal: '#btn-modal-plus-close',

  // Mensagens
  mensagemSucesso: '.alert-success, .swal2-popup.swal2-icon-success',
  toastSucesso: '.Toastify__toast--success',

  // Estrutura de categorias (árvore)
  itemCategoria: 'li, div[class*="categoria"]',
  botaoExpandirColapsar: 'button:has(span.fa-chevron-down), button:has(span.fa-chevron-up)',
  botaoEditarItem: 'button:has(span.fa-pencil), button[title*="Editar"]',
  botaoExcluirItem: 'button:has(span.fa-times), button[title*="Excluir"]',
  checkboxItem: 'input[type="checkbox"]',
};

export default CategoriasLocators;

