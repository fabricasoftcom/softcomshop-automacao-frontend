/**
 * Modal "Importar NFe" na listagem de compras (/compra).
 * Paralelo à opção XML (#option-xml); chave de acesso costuma usar #option-chave.
 */
const CompraImportacaoNFeLocators = {
  /** Container do modal de escolha de tipo de importação */
  painelOpcoesImportacao: '.ibox h3:contains("Importação da Nota Fiscal de Compra")',

  /** Cartão/opção "Chave de acesso" (ou equivalente) */
  optionChaveVisual: '#option-chave > .block-view-option, #option-chave .block-view-option',

  /**
   * Campo de chave no passo inicial (antes de #form-importacao).
   * Múltiplos candidatos para ambientes distintos.
   */
  campoChaveNFeConsulta:'.ibox #chave',
};

export default CompraImportacaoNFeLocators;
