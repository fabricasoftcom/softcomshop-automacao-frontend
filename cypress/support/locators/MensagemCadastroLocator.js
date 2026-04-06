/**
 * Locators da tela de Cadastro de Mensagens (Venda Mais).
 * Validar no DOM real em /configuracao/mensagem e /configuracao/mensagem/novo (ADR-0015).
 */
const MensagemCadastroLocator = {
  // Título / cabeçalho
  tituloCadastro: 'h5',

  // Botões
  btnVoltar: 'a.btn.btn-default[href*="/configuracao/mensagem"]',
  btnSalvar: '#btn-salvar',
  btnExcluir: '#btn-excluir',
  btnNovo: 'a[href*="/configuracao/mensagem/novo"]',

  // Formulário
  formulario: 'form.form-horizontal',

  // Campos (ajustar IDs após exploração da tela)
  campoAssunto: '#assunto',
  campoTitulo: '#titulo',
  campoMensagem: '#mensagem',
  campoCanal: '#canal',
  campoTipo: '#tipo',
  campoAnexo: 'input[type="file"]',

  // Tags (Empresa, Cliente, Datas) - ajustar após exploração
  containerTags: '.tags-container',
  campoTags: '#tags',

  // Datas (validade) - ajustar após exploração
  campoDataValidadeInicio: '#data_validade_inicio',
  campoDataValidadeFim: '#data_validade_fim',

  // Listagem
  tabelaMensagens: 'table tbody tr',
  linkEditar: 'a[href*="/editar"]',

  // Toasts
  toastSucesso: '#toast-container .toast-success',
  toastErro: '#toast-container .toast-error',
};

export default MensagemCadastroLocator;
