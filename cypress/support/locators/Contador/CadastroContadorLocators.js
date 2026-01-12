const CadastroContadorLocators = {
  // Título e navegação
  tituloPagina: 'h5',
  btnVoltar: '#btn-voltar',

  // Campos obrigatórios
  inputCpf: '#cpf',
  inputCrc: '#crc',
  inputEmail: '#email',
  inputNome: '#nome',

  // Campos opcionais
  inputCnpj: '#cnpj',
  btnPesquisarCNPJ: '#btn_consulta_receita_cnpj',
  inputFone: '#fone',
  inputFax: '#fax',

  // Campos de endereço
  inputCep: '#cep',
  btnBuscarCep: '#busca-cep_cep',
  inputEndereco: '#endereco',
  inputNumero: '#numero',
  inputComplemento: '#complemento',

  // Autocomplete Bairro
  inputAutoBairro: '#auto_bairro',
  hiddenBairro: '#bairro',
  containerBairro: '#div_auto_bairro',
  listaResultadosBairro: '#div_auto_bairro .typeahead-list li a',

  // Autocomplete Cidade
  inputAutoCidade: '#auto_cidade_id',
  hiddenCidade: '#cidade_id',
  containerCidade: '#div_auto_cidade_id',
  listaResultadosCidade: '#div_auto_cidade_id .typeahead-list li a',

  // Botão Salvar
  btnSalvar: '#btn-salvar',
};

export default CadastroContadorLocators;

