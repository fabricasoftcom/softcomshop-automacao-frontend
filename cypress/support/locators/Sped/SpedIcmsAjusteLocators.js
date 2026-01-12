const SpedIcmsAjusteLocators = {
  // Listagem
  tituloListagem: 'h5:contains("Listagem ICMS Ajustes Apurações")',
  btnPesquisa: 'a[href="#"]:has(i.fa-search)',
  btnNovoCadastro: 'a[href*="/sped/e111-ajuste-apuracao/novo"]',
  btnExcluirSelecionados: 'button:contains("Excluir Selecionados")',
  tabelaListagem: 'table',

  // Cadastro
  tituloCadastro: 'h5:contains("Ajustes Apurações")',
  btnVoltar: 'a.btn-default[href*="/sped/e111-ajuste-apuracao"]:not([href*="/novo"])',

  // Campos do Formulário
  campoTipoAjuste: '#tipo_ajuste',
  campoDataReferencia: '#data_referencia',
  campoValorAjuste: '#valor_ajuste',
  campoCodigoAjuste: '#auto_codigo_ajuste',
  campoCodigoAjusteHidden: '#codigo_ajuste',
  campoMesReferencia: '#mes_referencia',
  campoDescricaoAjuste: '#descricao_ajuste',

  // Botões
  btnSalvar: '#btn-salvar'
};

export default SpedIcmsAjusteLocators;

