const ServicoCadastroLocators = {
  url: '/servico/novo',
  titulo: 'h5:contains("Serviço")',
  codigo: '#codigo',
  referencia: '#referencia',
  descricao: '#nome',
  grupo: {
    input: '#auto_grupo_id',
    btnAdicionar: '#auto_plus_grupo_id',
    typeaheadContainer: '.typeahead-container',
    novoItemLink: 'a:contains("(novo)")'
  },
  precoVenda: '#preco_venda',
  comissao: '#percentual_comissao_produto',
  observacao: '#observacao',
  switchDesativado: '#switcher_desativado',
  btnSalvar: '#btn-salvar',
  btnVoltar: '#btn-voltar'
};

export default ServicoCadastroLocators;

