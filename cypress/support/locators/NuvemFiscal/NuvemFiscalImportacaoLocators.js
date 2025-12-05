// NuvemFiscalImportacaoLocators.js
const NuvemFiscalImportacaoLocators = {
    // Formulário de Importação
    formImportacao: '#form-importacao',

    // Dados Principais - CFOP/Natureza
    campoCFOP: '#auto_cfop',
    typeaheadDisplay: '.typeahead-display',
    botaoConfirmarNatureza: '#form-importacao > :nth-child(2) > [style="padding: 0; margin: 0"]',

    // Vínculo Fiscal (aplicar para todos)
    iconVinculoFiscal: '#auto_icon_vinculo_fiscal_id_all',
    typeaheadVinculoPrimeiraOpcao: '#div_auto_vinculo_fiscal_id_all > .typeahead-container > .typeahead-result > .typeahead-list > :nth-child(1) > a',
    botaoLancarVinculo: '#btn-lancar',

    // Botão Importar
    botaoImportarXML: '#btn-importar-xml',

    // Modais e Alertas
    modalAlerta: '.sweet-alert',
    botaoOkAlerta: '.sweet-alert .confirm',
    modalSucesso: '.sweet-alert h2',
    modalCarregando: '.sweet-alert h2',

    // Loading
    loading: '#loading',
};

export default NuvemFiscalImportacaoLocators;

