// NovaDespesaLocators.js
const NovaDespesaLocators = {
  // Modal
  modalContent: '.modal-content',
  modalTitle: '.modal-title',

  // Inputs do formulário
  descricaoInput: '#description',
  categoriaAutocomplete: '#autocomplete_category',
  contaAutocomplete: '#autocomplete_bank_account',
  formaPagamentoAutocomplete: '#autocomplete_payment_method',
  dataCompetenciaInput: '#competency_date',
  dataVencimentoInput: '#dueDate',

 // Div que contém o campo de valor
 divValor: '#form-receive > :nth-child(3) > :nth-child(3)',

 // Campo de valor - será localizado dentro de divValor na classe de página
 valorInputDentroDiv: 'input.form-control',  // Localizador para o input dentro da divValor

  fornecedorAutocomplete: '#autocomplete_provider',
  tipoDocumentoAutocomplete: '#autocomplete_document_type',
  numeroDocumentoInput: '#document_number',

  // Botões
  repetirButton: 'a:contains("Repetir")',
  outrasInformacoesButton: 'a:contains("Outras Informações")',
  anexarArquivosButton: 'a:contains("Anexar Arquivos")',
  voltarButton: '.btn-default',
  salvarButton: '.modal .btn-primary',

  // Toasts de sucesso e erro
  notificacaoSucesso: '.Toastify__toast--success',
  notificacaoErro: '.Toastify__toast--error'
};

export default NovaDespesaLocators;
