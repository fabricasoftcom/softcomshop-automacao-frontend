const EmpresaCadastroLocators = {
  // Botões
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar',
  btnNovo: '#btn-novo',

  // Abas
  containerTabs: '[role="tablist"]',
  abaDadosCadastrais: '[role="tab"]:contains("Dados Cadastrais")',
  abaCertificadoSefaz: '#tab-certificado-sefaz',
  abaEnvioEmails: '[role="tab"]:contains("Envio de Emails")',
  abaDispositivos: '[role="tab"]:contains("Dispositivos")',
  abaLogo: '[role="tab"]:contains("Logo")',
  abaCpfsCnpjsAutorizados: '[role="tab"]:contains("CPFs/CNPJs Autorizados")',
  abaConfiguracoes: '#tab-empresa-configuracoes',
  abaConfiguracaoChaves: '#tab-configuracao-configuracoes',

  // Campos obrigatórios (marcados com *)
  inputCnpj: '#cnpj',
  inputNome: '#nome', // Unidade
  inputFantasia: '#fantasia',
  inputRazaoSocial: '#razao_social',
  selectNomeImpressao: '#nome_impressao', // Impressões

  // Campos opcionais
  inputInscricaoEstadual: '#inscricao_estadual',
  inputInscricaoMunicipal: '#inscricao_municipal',
  inputCep: '#cep',
  inputEndereco: '#endereco',
  inputNumero: '#numero',
  inputComplemento: '#complemento',
  inputBairro: '#auto_bairro',
  inputCidadeUf: '#auto_cidade_id',
  inputDdd: '#ddd',
  inputTelefone: '#telefone',
  inputEmail: '#email',

  // Campos hidden
  hiddenId: '#id',
  hiddenEmpresaEmailId: '#empresa_email_id',
  hiddenNuvemNfeEmpresaId: '#nuvem_nfe_empresa_id',
  hiddenEmpresaId: '#empresa_id',
  hiddenEnderecoId: '#endereco_id',

  // Autocompletes (typeahead)
  bairroAutocomplete: '#auto_bairro',
  bairroLista: '#div_auto_bairro .typeahead-list li a',
  hiddenBairro: '#bairro',
  cidadeAutocomplete: '#auto_cidade_id',
  cidadeLista: '#div_auto_cidade_id .typeahead-list li a',
  hiddenCidade: '#cidade_id',

  // Botões auxiliares
  btnBuscarCep: 'button:contains("Buscar CEP"), a:contains("Buscar CEP")', // Botão para pesquisar CEP
  btnPesquisarReceita: 'a:contains("Clique aqui para pesquisar dados na Receita Federal")', // Link para pesquisar na Receita Federal

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
  linkEditarEmpresa: 'a.button-tab.button-edit.fa.fa-edit'
};

export default EmpresaCadastroLocators;

