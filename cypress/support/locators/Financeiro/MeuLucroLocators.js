// MeuLucroLocators.js
const MeuLucroLocators = {
    // Container principal
    contentLayout: '#content-layout',

    // Título da página
    titulo: 'h5',

    // Botões principais
    btnConfiguracoes: '#btn-config',
    btnGerarPdf: '#gerar-pdf',
    btnEditarMeta: '#btn-editar',

    // Campo de data/período
    campoData: '#date_text',

    // Tabs
    tabLucroRealizado: 'a:contains("MEU LUCRO REALIZADO")',
    tabLucroProjetado: 'a:contains("MEU LUCRO PROJETADO")',
    boxRelatorioRealizado: '#box-relatorio-realizado',
    boxRelatorioProjetado: '#box-relatorio-projetado',

    // Seção Meta de Lucro
    secaoMetaLucro: 'h4:contains("META DE LUCRO")',
    campoMetaLucro: 'input[disabled]',
    valorMetaVenda: '*:contains("Quanto você tem que vender para atingir sua meta de lucro:")',

    // Tabela de Ponto de Equilíbrio
    tabelaPontoEquilibrio: 'table.table-bordered',
    theadTabela: 'table.table-bordered thead',
    tbodyTabela: 'table.table-bordered tbody',
    linhasTabela: 'table.table-bordered tbody tr',

    // Gráfico
    secaoGrafico: 'h4:contains("GRÁFICO DO PONTO DE EQUILÍBRIO")',

    // Modal de Configurações
    modalConfiguracoes: '.modal',
    modalTitulo: '.modal h2',
    btnFecharModal: '.modal .close',
    btnCancelar: '#btn-cancelar',
    btnSalvar: '#btn-salvar',

    // Campos do modal - Informações básicas
    campoLucroPretendido: '#config_lucro_pretendido',
    campoSaldoCaixa: '#config_saldo_caixa',
    campoQuantidadeFuncionarios: '#config_quantidade_funcionario',
    campoTamanhoEstrutura: '#config_tamanho_estrutura',

    // Campos do modal - Despesas fixas
    campoFolhaPagamento: '#config_despesa_fixa_folha_pagamento',
    campoProLabore: '#config_despesa_fixa_pro_labore',
    campoAluguel: '#config_despesa_fixa_aluguel',
    campoOutrasDespesasFixas: '#config_despesa_fixa_outras',

    // Campos do modal - Despesas variáveis
    campoImposto: '#config_despesa_variavel_imposto',
    campoTaxaAntecipacao: '#config_despesa_variavel_taxa_antecipacao',
    campoComissao: '#config_despesa_variavel_comissao',
    campoOutrasDespesasVariaveis: '#config_despesa_variavel_outras_despesas',
    campoMargemLucroBruto: '#config_despesa_variavel_margem_lucro_bruto',
    campoCMV: '#config_despesa_variavel_custo_mercadoria_vendida',

    // Campos do modal - Categorias
    campoCategoriaReceita: '#auto_config_categoria_receita_id',
    campoCategoriaDespesa: '#auto_config_categoria_despesa_id',
};

export default MeuLucroLocators;

