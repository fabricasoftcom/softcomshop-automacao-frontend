const VinculoConfiguracaoSaidaLocators = {
    cabecalhoModal: '.modal-content .modal-header',
    botaoFecharModal: '#btn-modal-plus-close',
    formularioSaida: '#form-vinculos-fiscais-configuracoes',
    campoCfopNfe: '#auto_cfop_nfe_saida',
    dropdownModelo: '#modelo',
    dropdownUfDestino: '#uf_destino',
    dropdownRegimeTributario: '#regime_tributario',
    //botaoSalvar: 'button[type="submit"]',
    botaoSaida: 'table tbody tr:first-child a.btn-info', // Botão "Saída"
    cabecalhoModal: '.modal-header h2', // Cabeçalho do modal
    campoCfopNfe: '#auto_cfop_nfe_saida', // Campo CFOP NFE
    campoCfopNfce: '#auto_cfop_nfce_saida', // Campo CFOP NFCe
    campoCstCsosn: '#auto_cst_csosn', // Campo CST/CSOSN
    campoIcmsModalidadeBase: '#auto_icms_modalidade_base', // Modalidade Base ICMS
    campoIcmsAcrescimo: '#icms_acrescimo', // Acréscimo ICMS
    campoIcmsReducao: '#icms_reducao', // Redução de Base ICMS
    campoIcmsOrigem: '#icms_saida_origem', // Origem do ICMS
    campoIcmsStModalidadeBase: '#auto_icms_st_modalidade_base', // Modalidade Base ST
    campoIcmsStMva: '#icms_st_mva', // MVA
    campoIcmsStAliquota: '#icms_st_aliquota', // Alíquota ST
    campoIcmsStReducao: '#icms_st_reducao', // Redução ST
    campoIcmsValorPauta: '#icms_valor_pauta', // Valor Pauta
    campoIpi: '#auto_ipi_saida', // IPI
    campoPis: '#auto_pis_saida', // PIS
    campoPisAliquota: '#pis_saida_aliquota', // Alíquota PIS
    campoCofins: '#auto_cofins_saida', // COFINS
    campoCofinsAliquota: '#cofins_saida_aliquota', // Alíquota COFINS
    botaoSalvar: '#btn-salvar-configuracao-saida', // Botão Salvar
    toastSucesso: '.toast-message', // Mensagem de sucesso
};

export default VinculoConfiguracaoSaidaLocators;
