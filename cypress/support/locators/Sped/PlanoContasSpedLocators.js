// PlanoContasSpedLocators.js
// Locators para a tela de Plano de Contas do SPED
const PlanoContasSpedLocators = {
  // Tela de Listagem
  tituloListagem: 'h5',
  btnNovoCadastro: 'a:contains("Novo Cadastro")',
  btnExcluirSelecionados: 'button:contains("Excluir Selecionados")',

  // Tela de Cadastro - Campos do Formulário
  campoDataInclusao: '#data_inclusao',
  campoNatureza: '#natureza',
  campoTipo: '#tipo',
  campoNivel: '#nivel',
  campoCodigo: '#codigo',
  campoNome: '#descricao',
  campoCodigoReferenciado: '#codigo_referencial',

  // Botões
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar',

  // Formulário
  form: 'form',
};

export default PlanoContasSpedLocators;

