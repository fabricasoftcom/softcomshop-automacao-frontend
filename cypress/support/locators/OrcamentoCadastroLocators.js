const OrcamentoCadastroLocators = {
  // Status do Orçamento
  statusLabel: '#status-view .status_label',

  // cabeçalho do orçamento
  campoCliente: '#auto_cliente_nome',
  campoClienteResultado: '#div_auto_cliente_nome > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a',
  dropdownCliente: '#auto_icon_cliente_nome',
  campoTelefone: '#input_fone',
  campoEmail: '#email',
  campoResponsavel: '#responsavel',
  campoVendedor: '#auto_funcionario_id',
  campoVendedorResultado: '#div_auto_funcionario_id > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a',
  dropdownVendedor: '#auto_icon_funcionario_id',
  campoObservacoes: '#observacao',
  campoValidade: '#quantidade_dias',
  campoDataValidade: '#data_validade',

  // dados do orçamento
  campoCpfCnpj: '#cpf_cnpj',
  campoCep: '#cep',
  btnBuscarCep: '#busca-cep_cep',
  campoEndereco: '#endereco',
  campoNumero: '#numero',
  campoComplemento: '#complemento',
  campoCidade: '#auto_cidade_id',
  dropdownCidade: '#auto_icon_cidade_id',
  campoBairro: '#bairro',
  campoTipoDebito: '#auto_tipo_debito_id',
  dropdownTipoDebito: '#auto_icon_tipo_debito_id',

  // informações adicionais
  campoDescricaoServico: '#servico_descricao',
  campoPrazoEntrega: '#prazo_entrega',
  campoGarantia: '#garantia',

  // Tabela de Produtos
  tabelaProdutos: '#table-itens',
  campoProduto: '#auto_produto_empresa_grade_id_',
  dropdownProduto: '#auto_icon_produto_empresa_grade_id_',
  campoProdutoResultado: '#div_auto_produto_empresa_grade_id_ > .typeahead-container > .typeahead-result > .typeahead-list > li > a',
  campoQuantidade: '#quantidade_',
  campoPreco: '#preco_',
  campoDesconto: '#desconto_valor_item_',
  campoAcrescimo: '#acrescimo_valor_item_',
  campoSubtotal: '#subtotal_',
  campoProdutoId: '#produto_id_',
  campoPrecoCompra: '#preco_compra_',
  campoPrecoCaixa: '#preco_caixa_',
  campoQuantidadeCaixa: '#quantidade_caixa_',
  // Botões e Ações
  btnAdicionarProduto: '#btn-adicionar-produto',
  btnRemoverProduto: '#btn-remover-produto',
  campoCondicaoPagamento: '#condicao_pagamento',
  btnSalvar: '.btn-primary:contains("Salvar")',
  toastSucesso: '.toast-message'
};

export default OrcamentoCadastroLocators;
