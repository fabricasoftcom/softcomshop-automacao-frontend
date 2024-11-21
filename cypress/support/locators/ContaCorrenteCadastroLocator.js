const ContaCorrenteCadastroLocator = {
  stepAtivo: '.step-options .step-option.active',
  
  // Inputs e Autocompletes
  bancoAutocomplete: '#autocomplete_bank_id',
  bancoListaResultados: '.bank_id_result',
  descricao: 'input[id="description"]', // Atualizado
  agencia: 'input[id="bank_agency"]',
  agenciaDV: 'input[id="bank_agency_dv"]',
  contaCorrente: 'input[id="bank_account_number"]',
  contaDV: 'input[id="bank_account_dv"]',
  saldoInicial: '#openingBalance',
  dataSaldoInicial: '#opening_balance_date',
  limiteCredito: '#limitValue',
  observacao: '#note',
  
  // Switches
  contaPadraoSwitch: '#div_patternBankAccount .switchery',
  cobrancaBancariaSwitch: '#div_usingBankCollection .switchery',

  // Botões
  botaoProximo: '.btn-primary.btn-sm',
  botaoVoltar: '.btn-default.btn-sm',

  // Mensagens e Confirmações
  mensagemSucesso: 'h2:contains("Configuração da conta finalizada com sucesso!")',
};

export default ContaCorrenteCadastroLocator;
