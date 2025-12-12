const ReciboLocators = {
  // Título da página
  tituloListagem: 'h5',
  tituloFormulario: 'h5',

  // Listagem
  tabela: '.table.table-hover',
  tabelaVazia: '.table tbody tr td',
  linhasTabela: '.table tbody tr',

  // Botões da listagem
  botaoNovoCadastro: 'a.btn.btn-warning[href*="/recibo/novo"]',
  botaoExcluirSelecionados: 'a.btn.btn-danger.delete_all_forma[href*="/recibo/excluir"]',

  // Formulário - Campos
  campoCnpj: '#cnpj',
  botaoConsultaReceita: '#btn_consulta_receita_cnpj',
  campoRecebemosDe: '#nome',
  campoReferenteA: '#servico_realizado',
  campoValor: '#valor',
  campoData: '#data_recibo',

  // Formulário - Botões
  botaoVoltar: '#btn-voltar',
  botaoNovoCadastroForm: '#btn-novo',
  botaoSalvar: '#btn-salvar',

  // Formulário - Container
  formulario: 'form.form-horizontal'
};

export default ReciboLocators;

