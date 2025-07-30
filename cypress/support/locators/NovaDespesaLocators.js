// NovaDespesaLocators.js
const NovaDespesaLocators = {
  // Modal
  modalContent: '.modal-content',
  modalTitle: '.modal-title',

  // Inputs do formulário
  descricaoInput: '#historico',
  categoriaAutocomplete: '.modal-content #categoria_id',
  contaAutocomplete: '#conta_id',
  formaPagamentoAutocomplete: '#forma_pagamento_id',
  dataCompetenciaInput: '#termino_vigencia',
  dataVencimentoInput: '#data_termino_vigencia',

 // Div que contém o campo de valor
 divValor: '#form-receive > :nth-child(3) > :nth-child(3)',

 // Campo de valor - será localizado dentro de divValor na classe de página
 valorInputDentroDiv: '#valor_parcela',  // Localizador para o input dentro da divValor

  fornecedorAutocomplete: '#fornecedor_id',
  tipoDocumentoAutocomplete: '#tipo_documento_id',
  numeroDocumentoInput: '#documento',

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
