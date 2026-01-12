const NfeInutilizarLocators = {
  titulo: 'h5:contains("Inutilizar Faixas da NFE")',
  headingFormulario: 'h3:contains("Adicionar Inutilização de Faixa")',
  selectSerie: 'select[name="serie"]',
  campoNumeroInicial: 'input[name="numero_inicial"]',
  campoNumeroFinal: 'input[name="numero_final"]',
  campoJustificativa: 'textarea[name="justificativa"]',
  btnInutilizar: 'button:contains("Inutilizar")',
  btnPesquisa: 'a[href="#"]:has(i.fa-search)',
  tabela: 'table'
};

export default NfeInutilizarLocators;

