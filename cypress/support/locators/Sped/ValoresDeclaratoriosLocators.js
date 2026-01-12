// ValoresDeclaratoriosLocators.js
const ValoresDeclaratoriosLocators = {
  // Listagem
  tituloListagem: 'h5:contains("Listagem Valores Declaratórios")',
  btnNovoCadastro: 'a:contains("Novo Cadastro")',
  btnExcluirSelecionados: 'button:contains("Excluir Selecionados")',
  tabela: 'table',

  // Cadastro
  tituloCadastro: 'h5:contains("Valores Declaratórios")',
  campoDataReferencia: '#data_referencia',
  campoValorAjuste: '#valor_ajuste',
  campoCodigoAjuste: '#auto_codigo_ajuste',
  campoDescricaoAjuste: 'input[name="descricao_ajuste"]',
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar',
};

export default ValoresDeclaratoriosLocators;

