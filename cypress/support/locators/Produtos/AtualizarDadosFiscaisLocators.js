const AtualizarDadosFiscaisLocators = {
  url: '/produto/atualizar-dados-fiscais',

  // Seleção de Abas/Tipos
  selecaoTipo: {
    radioVinculos: '#radio_toggle_tipo_VINCULOS_FISCAIS',
    radioProduto: '#radio_toggle_tipo_PRODUTO',
    radioServico: '#radio_toggle_tipo_SERVICO'
  },

  // Filtros da Aba Vínculos Fiscais
  filtrosVinculos: {
    descricao: 'input[name="produto_filter"]',
    origem: 'select[name="uf_origem_filter"]',
    destino: 'select[name="uf_destino_filter"]',
    regime: 'select[name="regime_tributario_filter"]',
    documentos: 'select[name="documentos_filter"]'
  },

  // Filtros da Aba Produto
  filtrosProduto: {
    descricao: 'div[id="div-form-filter-produto"]:visible input[name="produto_filter"]', // Contexto específico
    grupo: 'div[id="div-form-filter-produto"]:visible select[id="grupo_id_filter"]',
    tipoItem: 'div[id="div-form-filter-produto"]:visible select[id="tipo_item_filter"]',
    fabricante: 'div[id="div-form-filter-produto"]:visible select[id="fabricante_id_filter"]',
    ncm: 'div[id="div-form-filter-produto"]:visible input[name="ncm_filter"]',
    cest: 'div[id="div-form-filter-produto"]:visible input[name="cest_filter"]'
  },

  // Filtros da Aba Serviço
  filtrosServico: {
    descricao: 'div[id="div-form-filter-servico"]:visible input[name="produto_filter"]', // Contexto específico
    itemListaServico: 'input[name="nfse_codigo_servico_item_id_filter"]',
    codigoTributacao: 'input[name="codigo_tributacao_municipal_filter"]'
  },

  // Campos de Atualização (Passo 3) - Aba Vínculos
  atualizacaoVinculos: {
    container: 'div[id="div-form-update-vinculos-fiscais"]', // Hipótese baseada em padrão, ajustaremos se necessário
    descricao: 'input[name="descricao_update"]', // Hipótese
    // Adicionar outros campos conforme necessário/descoberto
  },

  // Campos de Atualização (Passo 3) - Aba Produto
  atualizacaoProduto: {
    container: 'div[id="div-form-update-produto"]',
    vinculoFiscal: 'input[id="auto_vinculo_fiscal_id"]',
    ncm: 'input[id="auto_ncm"]',
    cest: 'input[id="auto_cest"]',
    origem: 'input[id="auto_origem"]'
  },

  // Campos de Atualização (Passo 3) - Aba Serviço
  atualizacaoServico: {
    container: 'div[id="div-form-update-servico"]',
    vinculoFiscal: 'input[id="auto_servico_vinculo_fiscal_id"]', // Hipótese de ID baseada em padrão
    itemListaServico: 'input[id="auto_nfse_codigo_servico_item_id"]',
    codigoTributacao: 'input[id="codigo_tributacao_municipal"]'
  },

  // Botões de Ação
  botoes: {
    aplicarFiltros: 'button:contains("Aplicar Filtros"):visible',
    limparFiltros: 'button:contains("Limpar Filtros"):visible',
    atualizarDados: 'button:contains("Atualizar Dados"):visible',
    limparDados: 'button:contains("Limpar Dados"):visible'
  },

  // Resultados - Tabela
  tabela: {
    container: 'table',
    linhas: 'tbody tr',
    colunas: 'thead th',
    mensagemQuantidade: 'h5:contains("Quantidade:")',
    // Edição individual na linha
    linkEditar: 'tbody tr td:first-child a[href*="edit-line"]', // Link de edição (ícone ✎)
    linkSalvarLinha: 'tbody tr td:first-child a[href*="/salvar"]', // Botão salvar da linha editada
    linkCancelarLinha: 'tbody tr td:first-child a[href="/"]' // Botão cancelar da linha editada
  },

  // Campos editáveis na linha (quando linha está em modo edição)
  camposEditaveisLinha: {
    // Campos da aba Vínculos Fiscais
    vinculos: {
      cstIbsCbs: 'input[id="auto_ibs_cbs_cst"]',
      classTributaria: 'input[id="auto_ibs_cbs_cclass_trib"]',
      cfop: 'input[id="auto_cfop_nfe_saida"]',
      cstCsosn: 'input[id="auto_cst_csosn"]',
      aliquotaIcms: 'input[id="icms_normal_aliquota"]',
      reducaoIcms: 'input[id="icms_reducao"]',
      mvaIcmsSt: 'input[id="icms_st_mva"]',
      reducaoIcmsSt: 'input[id="icms_st_reducao"]',
      pis: 'input[id="auto_pis_saida"]',
      aliquotaPis: 'input[id="pis_saida_aliquota"]',
      cofins: 'input[id="auto_cofins_saida"]',
      aliquotaCofins: 'input[id="cofins_saida_aliquota"]',
      ipi: 'input[id="auto_ipi_saida"]',
      aliquotaIpi: 'input[id="ipi_saida_aliquota"]'
    },
    // Campos da aba Produto (serão descobertos na exploração)
    produto: {
      // Será preenchido após exploração
    },
    // Campos da aba Serviço (serão descobertos na exploração)
    servico: {
      // Será preenchido após exploração
    }
  }
};

export default AtualizarDadosFiscaisLocators;
