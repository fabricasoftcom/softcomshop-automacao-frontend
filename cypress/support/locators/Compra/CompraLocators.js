const CompraLocators = {
    importarNFe: '#btn-importar',
    arquivoXML: '//*[@id="option-xml"]/div/strong',
    btnAnexarNFe: '//*[@id="btn-anexar"]',
    // btnImportar: '#btn-importar',
    btnImportar: '//*[@id="infos"]/a[2]/span',
    btnSalvar: '#btn-salvar',
    selectNatureza: '#auto_icon_nfe_natureza_id',
    naturezaSelect: '#auto_cfop',
    natureza: '//*[@id="form-importacao"]/div[1]/div[2]/table/tbody/tr[2]/td[1]/div/div/div[2]/ul/li/a',
    selectVinculoFiscal: '#auto_icon_vinculo_fiscal_id_all',
    vinculoFiscal: '//*[@id="div_auto_vinculo_fiscal_id_all"]/div/div[2]/ul/li[1]/a',
    btnLancarVinculo: '#btn-lancar',
    btnImportarNFe: '#btn-importar-xml',
    checkboxNFeImportada: 'tr[data-numero_nfe="4382813"]',
    btnExcluirSelecionados: '#btn-excluir-selecionados',
    btnConfirmarExclusao: '/html/body/div[8]/div[7]/div/div',
    // ========== LOCATORS TELA DE IMPORTAÇÃO ==========
    formImportacao: '#form-importacao',
    tabelaItensImportacao: 'table.table-xml-itens tbody tr.customTr',
    // Aplicar grupo para todos os itens
    campoAplicarGrupoTodos: '#auto_grupo_empresa_id_1',
    iconAplicarGrupoTodos: '#auto_icon_grupo_empresa_id_1',
    listaAplicarGrupoTodos: '#div_auto_grupo_empresa_id_1 .typeahead-list li a',
    btnLancarGrupo: '#btn-lancar-grupo',
    // Relacionar produto (na linha do item)
    btnRelacionarProduto: 'input[value="Relacionar Produto"].relacionar, button.relacionar',
    // Adicionar grupo (na linha do item)
    btnAdicionarGrupoItem: 'input[value="Adicionar Grupo"].grupo, button.grupo',
    // Adicionar vínculo para todos os itens
    campoAdicionarVinculoTodos: '#auto_vinculo_fiscal_id_all',
    iconAdicionarVinculoTodos: '#auto_icon_vinculo_fiscal_id_all',
    listaAdicionarVinculoTodos: '#div_auto_vinculo_fiscal_id_all .typeahead-list li a',
    btnLancarVinculoTodos: '#btn-lancar',
    // Adicionar vínculo (na linha do item)
    btnAdicionarVinculoItem: 'input[value="Adicionar Vinculo"].vincular, button.vincular',
    // Alterar CFOP do item (duplo click no span)
    spanCFOPItem: '.cfop-item',
    campoCFOPItem: 'input[name="cfop_item[]"].cfop_item',
    // Lançar categoria para todos os pagamentos
    campoCategoriaTodos: '#auto_categoria_id_1',
    iconCategoriaTodos: '#auto_icon_categoria_id_1',
    listaCategoriaTodos: '#div_auto_categoria_id_1 .typeahead-list li a',
    btnLancarCategoria: '#btn-lancar-categoria',
    // SweetAlert de erro
    sweetAlertModal: '.sweet-alert.showSweetAlert.visible',
    sweetAlertTitulo: '.sweet-alert.showSweetAlert.visible h2',
    sweetAlertMensagem: '.sweet-alert.showSweetAlert.visible p',
    sweetAlertBotaoOk: '.sweet-alert.showSweetAlert.visible button.confirm'
  };

export default CompraLocators;
