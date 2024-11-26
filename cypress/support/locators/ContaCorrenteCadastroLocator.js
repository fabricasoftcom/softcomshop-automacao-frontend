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
  dataSaldoInicial: '.input-group > #opening_balance_date',
  limiteCredito: '#limitValue',
  observacao: '#div_note > #note',
  
  // Switches
  contaPadraoSwitch: '#div_patternBankAccount .switchery',
  cobrancaBancariaSwitch: '#div_usingBankCollection .switchery',

  // Botões
  botaoProximo: '.btn-primary:contains("Próximo")',
  botaoVoltar: '.btn-default.btn-sm',

  // Mensagens e Confirmações
  mensagemSucesso: 'h2:contains("Configuração da conta finalizada com sucesso!")',
  // Campos de integração bancária
  recipientCode: 'input#recipient_code', // Convênio
  lastOurNumber: 'input#last_our_number', // Último nosso número
  lastDispatch: 'input#last_dispatch', // Último número remessa
  walletCode: 'select#wallet_code', // Modalidade da carteira
  walletVariation: 'input#wallet_variation', // Variação da carteira
  interestCode: 'select#interest_code', // Modalidade de juros
  interestAmount: 'input#interest_amount', // Valor de juros
  fineCode: 'select#fine_code', // Modalidade de multa
  fineAmount: 'input#fine_amount', // Valor da multa
  protestCode: 'select#protest_code', // Modalidade de protesto
  protestDays: 'input#protest_days', // Dias de protesto
  lowCode: 'select#low_code', // Modalidade de baixa
  lowDays: 'input#low_days', // Dias de baixa
  discountCode: 'select#discount_code', // Modalidade de desconto
  discountAmount: 'input#discount_amount', // Valor do desconto
  speciesCode: 'select#species_code', // Modalidade da espécie
  acceptCode: 'select#accept_code', // Código de aceite
  integrationType: 'select#integration_type', // Tipo da integração
  printLayout: 'select#print_layout', // Tipo do layout
  message1: 'input#message_1', // Mensagem 1
  message2: 'input#message_2', // Mensagem 2
  clientId: 'input#client_id', // Client ID
  clientSecret: 'input#client_secret', // Client Secret
  typeKeyPix: 'select#type_key_pix', // Tipo da Chave Pix
  keyPix: 'input#key_pix', // Chave Pix
  companyCode: 'input#company_code',
};

export default ContaCorrenteCadastroLocator;
