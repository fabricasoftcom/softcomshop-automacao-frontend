const UsuarioCadastroLocators = {
  // Botões
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar',
  btnExcluir: '#btn-excluir',

  // Abas
  containerTabs: '[role="tablist"]',
  abaDadosCadastrais: '[role="tab"]:contains("Dados Cadastrais"), [role="tab"]:first-child',
  abaPerfis: '[role="tab"]:contains("Perfis"), [role="tab"]:last-child',

  // Campos obrigatórios (marcados com *)
  inputNome: '#name',
  inputEmail: '#email',
  inputSenha: '#password',
  inputRedigiteSenha: '#re_password',

  // Aba Perfis
  campoPerfilAutocomplete: '#auto_role_id',
  tabelaPerfis: 'table.table-hover',
  linhasTabelaPerfis: 'table.table-hover tbody tr',
  linksExcluirPerfil: 'table.table-hover tbody a[href*="excluir"]',

  // Autocomplete de Perfil (typeahead)
  perfilAutocomplete: '#auto_role_id',
  perfilLista: '#div_auto_role_id .typeahead-list li a',

  // Mensagens e toasts
  toastSucesso: '.toast-success, .alert-success',
  toastErro: '.toast-error, .alert-danger',
  mensagemSucesso: '.sweet-alert h2:contains("Sucesso")',

  // Validações de campos obrigatórios
  mensagemErroObrigatorio: 'text=É obrigatório.',
  alertaAviso: '.alert',
  alertaAvisoTitulo: '.alert strong, .alert .alert-title',
  alertaAvisoMensagem: '.alert p, .alert .alert-message',
  alertaAvisoFechar: '.alert button[aria-label="close"], .alert .close',

  // Abas (seletores mais específicos)
  todasAbas: '[role="tab"]',
  abaAtiva: '[role="tab"][aria-selected="true"]',

  // Título
  tituloFormulario: 'h5'
};

export default UsuarioCadastroLocators;

