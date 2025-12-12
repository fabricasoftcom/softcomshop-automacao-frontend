const FuncionarioCadastroLocators = {
  // Botões
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar',
  btnNovo: '#btn-novo',

  // Abas
  containerTabs: '[role="tablist"]',
  abaDadosCadastrais: '[role="tab"]:contains("Dados Cadastrais")',
  abaUsuario: '[role="tab"]:contains("Usuário")',

  // Campos obrigatórios (marcados com *)
  inputNome: '#nome',
  inputFuncao: '#auto_funcao_id',
  hiddenFuncaoId: '#funcao_id',

  // Campos opcionais
  inputSetor: '#auto_setor_id',
  hiddenSetorId: '#setor_id',
  inputCpf: '#cpf',
  inputRg: '#rg',
  inputDataAdmissao: '#data_admissao',
  inputDataDemissao: '#data_demissao',
  inputCep: '#cep',
  inputEndereco: '#endereco',
  inputNumero: '#numero',
  inputComplemento: '#complemento',
  inputBairro: '#auto_bairro',
  hiddenBairro: '#bairro',
  inputCidade: '#auto_cidade_id',
  hiddenCidadeId: '#cidade_id',
  inputDesconto: '#desconto_percentual',
  inputComissao: '#comissao',
  switcherSupervisor: '#switcher_supervisor',
  hiddenSupervisor: '#supervisor',
  inputNumeroCartaoSupervisor: '#numero_cartao_supervisor',
  textareaObservacao: '#observacao',
  switcherDesativado: '#switcher_desativado',
  hiddenDesativado: '#desativado',

  // Campos hidden
  hiddenId: '#id',
  hiddenEmpresaId: '#empresa_id',
  hiddenEnderecoId: '#endereco_id',

  // Autocompletes (typeahead)
  funcaoAutocomplete: '#auto_funcao_id',
  funcaoLista: '#div_auto_funcao_id .typeahead-list li a',
  setorAutocomplete: '#auto_setor_id',
  setorLista: '#div_auto_setor_id .typeahead-list li a',
  bairroAutocomplete: '#auto_bairro',
  bairroLista: '#div_auto_bairro .typeahead-list li a',
  cidadeAutocomplete: '#auto_cidade_id',
  cidadeLista: '#div_auto_cidade_id .typeahead-list li a',

  // Botões auxiliares
  btnBuscarCep: 'button:contains("Buscar CEP"), a:contains("Buscar CEP")', // Botão para pesquisar CEP

  // Mensagens e toasts
  toastSucesso: '.toast-success, .alert-success',
  toastErro: '.toast-error, .alert-danger',
  mensagemSucesso: '.sweet-alert h2:contains("Sucesso")',

  // Validações de campos obrigatórios
  mensagemErroObrigatorio: 'text=É obrigatório.', // Usar cy.contains() para buscar
  alertaAviso: '.alert',
  alertaAvisoTitulo: '.alert strong, .alert .alert-title',
  alertaAvisoMensagem: '.alert p, .alert .alert-message',
  alertaAvisoFechar: '.alert button[aria-label="close"], .alert .close',

  // Abas (seletores mais específicos)
  todasAbas: '[role="tab"]',
  abaAtiva: '[role="tab"][aria-selected="true"]',

  // Links de edição na listagem (usar locator da listagem)
  linkEditarFuncionario: 'a[href*="/editar"]'
};

export default FuncionarioCadastroLocators;

