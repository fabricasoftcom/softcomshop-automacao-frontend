const VinculoConfiguracaoSaidaLocators = {
    // **Modal de Configuração de Saída**
    cabecalhoModal: '.modal-header h2', // Título do modal de Configuração de Saída
    botaoFecharModal: '#btn-modal-plus-close', // Botão de fechar o modal
    formularioSaida: '#form-vinculos-fiscais-configuracoes', // Formulário de Saída
    botaoSalvar: '.modal #btn-salvar', // Botão Salvar
    toastSucesso: '.toast-message', // Mensagem de sucesso após salvar

    // **Campos Principais do Formulário**
    campoCfopNfe: '#auto_cfop_nfe_saida', // Campo CFOP NFe
    campoCfopNfce: '#auto_cfop_nfce_saida', // Campo CFOP NFCe
    campoCstCsosn: '#auto_cst_csosn', // Campo CST/CSOSN
    dropdownModelo: '#modelo', // Dropdown do Modelo
    dropdownUfDestino: '#uf_destino', // Dropdown UF Destino
    dropdownRegimeTributario: '#regime_tributario', // Dropdown Regime Tributário

    // **Campos ICMS**
    campoIcmsModalidadeBase: '#auto_icms_modalidade_base', // Modalidade Base ICMS
    campoIcmsAcrescimo: '#icms_acrescimo', // Acréscimo ICMS
    campoIcmsReducao: '#icms_reducao', // Redução de Base ICMS
    campoIcmsOrigem: '#icms_saida_origem', // Origem do ICMS
    campoIcmsStModalidadeBase: '#auto_icms_st_modalidade_base', // Modalidade Base ST
    campoIcmsStMva: '#icms_st_mva', // MVA ST
    campoIcmsStAliquota: '#icms_st_aliquota', // Alíquota ST
    campoIcmsStReducao: '#icms_st_reducao', // Redução Base ST
    campoIcmsValorPauta: '#icms_valor_pauta', // Valor Pauta ICMS

    // **Campos PIS/COFINS**
    campoPis: '#auto_pis_saida', // Campo PIS
    campoPisAliquota: '#pis_saida_aliquota', // Alíquota PIS
    campoCofins: '#auto_cofins_saida', // Campo COFINS
    campoCofinsAliquota: '#cofins_saida_aliquota', // Alíquota COFINS

    // **Campos IPI**
    campoIpi: '#auto_ipi_saida', // Campo IPI Situação
    ipiAliquotaInput: '#ipi_saida_aliquota', // Campo Alíquota IPI
    ipiEnquadramentoInput: '#ipi_saida_enquadramento', // Campo Enquadramento IPI

    // **Seções Expansíveis**
    icmsSectionTitle: '.ibox-title h5', // Título da seção ICMS
    icmsCollapseLink: '.ibox-tools .collapse-link', // Botão para expandir/recolher ICMS
    icmsContent: '.ibox-content', // Conteúdo da seção ICMS

    pisCofinsSectionTitle: '.ibox-title h5', // Título da seção PIS/COFINS
    pisCofinsCollapseLink: '.ibox-tools .collapse-link', // Botão para expandir/recolher PIS/COFINS
    pisCofinsContent: '.ibox-content', // Conteúdo da seção PIS/COFINS

    ipiSectionTitle: '.ibox-title h5', // Título da seção IPI
    ipiCollapseLink: '.ibox-tools .collapse-link', // Botão para expandir/recolher IPI
    ipiContent: '.ibox-content', // Conteúdo da seção IPI

    // **Tabela de Configurações Fiscais**
    tabelaConfiguracaoFiscal: 'table.table-configuracao tbody tr', // Linhas da tabela
    documentoColuna: 'td:nth-child(5)', // Coluna "Documento" (e.g., NFe, NFCe)
    botaoSaida: 'a.btn-info', // Botão "Saída" na linha da tabela

    // **Outros**
    documentoColunaNFe: 'thead > tr > :nth-child(5)', // Cabeçalho da coluna de documento
};

export default VinculoConfiguracaoSaidaLocators;
